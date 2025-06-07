"use client";
import React, { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddIcon } from "@/assets/svg/add-icon";
import ToggleSwitch from "@/components/ui/toggle-switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import NubaInput from "@/components/ui/nuba-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  paymentSliceType,
  resetNewPaymentForm,
  updatePaymentMethod,
} from "@/redux/features/paymentSlice";
import { paymentSchema } from "@/utils/validator";
import {
  useCreatePaymentMethodMutation,
  useGetPaymentMethodsQuery,
} from "@/redux/features/paymentsApiSlice";
import PaymentAccordionItem from "../settings/payment-accordion-item";
import { nubaApis } from "@/services/api-services";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";
interface MakePaymentProps {
  setMakePayment: React.Dispatch<
    React.SetStateAction<"" | "start" | "complete">
  >;
}
const MakePayment: React.FC<MakePaymentProps> = ({ setMakePayment }) => {
  const [createPaymentMethodMutation] = useCreatePaymentMethodMutation();
  const dispatch = useDispatch();
  const [isOn, setIsOn] = useState(false);
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null);

  const { data: paymentMethods } = useGetPaymentMethodsQuery();

  const { data: rents } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    firstRentId ?? skipToken
  );
  const rentDetail = rentDetails?.data;

  const {
    country,
    postcode,
    city,
    address,
    address_2,
    state,
    cardName,
    cardNumber,
    cvc,
    mmYY,
  } = useSelector((state: RootState) => state.payment.newPaymentMethod);

  const [errors, setErrors] = useState<{
    [key in keyof paymentSliceType["newPaymentMethod"]]?: string;
  }>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatePaymentMethod({
        [e.target.name as keyof paymentSliceType["newPaymentMethod"]]:
          e.target.value,
      } as paymentSliceType["newPaymentMethod"])
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      country,
      postcode,
      city,
      address,
      address_2,
      state,
      cardName,
      cardNumber,
      cvc,
      mmYY,
    };

    const result = paymentSchema.safeParse(payload);

    const errorMessages: { [key: string]: string } = {};

    if (!result.success) {
      result.error.errors.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    setErrors({});

    await nubaApis.createPaymentMethod.handleCreatePaymentMethod(
      payload,
      createPaymentMethodMutation
    );

    dispatch(resetNewPaymentForm());
  };

  return (
    <div className="flex md:flex-row flex-col items-start justify-between gap-10 ">
      <div className="border border-border rounded-[12px] p-3 w-full md:w-[60%] xl:w-[47%]  ">
        <p className="font-[600] text-[14px] mb-1 ">Payment Method</p>
        <Accordion type="single" collapsible className="mt-6">
          {paymentMethods?.data?.map((method, index: number) => (
            <PaymentAccordionItem
              key={method.id}
              method={method}
              index={index}
              isActive={method.id === activeMethodId}
              onSelect={() => setActiveMethodId(method.id)}
            />
          ))}
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-0 ">
            <AccordionTrigger
              dropdownVisible={false}
              className="flex items-center justify-between gap-2 relative bg-[#F1F1F1] px-3 "
            >
              <div className="bg-[#F1F1F1]  px-3 mt-2">
                <div className="text-[12px] font-[600] flex items-center gap-2 ">
                  <AddIcon /> Add payment method
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <form onSubmit={handleSubmit} ref={formRef} className="w-full ">
                <NubaInput
                  containerClass={"w-full mt-2"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="Card holder Name (as it appears on the card)"
                  value={cardName}
                  name="cardName"
                  onChange={handleChange}
                />
                {errors.cardName && (
                  <p className="text-red-500 text-[12px]">{errors.cardName}</p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="Card Number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={cardNumber}
                  name="cardNumber"
                  onChange={handleChange}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-[12px]">
                    {errors.cardNumber}
                  </p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="CVV/CVC Code (3 digits on back, 4 for Amex)"
                  value={cvc}
                  name="cvc"
                  onChange={handleChange}
                />
                {errors.cvc && (
                  <p className="text-red-500 text-[12px]">{errors.cvc}</p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="Expiration Date (MM/YY)"
                  placeholder="MM/YY"
                  value={mmYY}
                  name="mmYY"
                  onChange={handleChange}
                />
                {errors.mmYY && (
                  <p className="text-red-500 text-[12px]">{errors.mmYY}</p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="Country"
                  value={country}
                  name="country"
                  onChange={handleChange}
                />
                {errors.country && (
                  <p className="text-red-500 text-[12px]">{errors.country}</p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="State / Province"
                  value={state}
                  name="state"
                  onChange={handleChange}
                />
                {errors.state && (
                  <p className="text-red-500 text-[12px]">{errors.state}</p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="City"
                  value={city}
                  name="city"
                  onChange={handleChange}
                />
                {errors.city && (
                  <p className="text-red-500 text-[12px]">{errors.city}</p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="Postcode / ZIP"
                  value={postcode}
                  name="postcode"
                  onChange={handleChange}
                />
                {errors.postcode && (
                  <p className="text-red-500 text-[12px]">{errors.postcode}</p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="Address Line 1"
                  value={address}
                  name="address"
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-red-500 text-[12px]">{errors.address}</p>
                )}

                <NubaInput
                  containerClass={"w-full mt-6 mb-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]"
                  label="Address Line 2 (optional)"
                  value={address_2}
                  name="address_2"
                  onChange={handleChange}
                />
                {errors.address_2 && (
                  <p className="text-red-500 text-[12px]">{errors.address_2}</p>
                )}

                <button
                  type="submit"
                  className={cn(
                    "w-full text-white h-[54px] mt-[30px] rounded-[4px] text-[14px] font-[700] bg-black"
                  )}
                >
                  Add
                </button>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full md:w-[60%] xl:w-[47%] ">
        <div className="bg-white border border-border px-4 py-6 flex items-center justify-between rounded-[4px] ">
          <p className="text-[14px] font-[500] ">Payment amount</p>
          <p className="text-[14px] font-[600] ">£{rentDetail?.monthlyPrice}</p>
        </div>
        <div className="bg-white border border-border px-4 py-6 rounded-[4px] mt-1 ">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-[500] ">
              Save up to £156.12 on this payment
            </p>
            {/* <ArrowRightIcon /> */}
          </div>
          <div className="flex items-center justify-between pt-5">
            <p className="text-[12px]  ">Pay with points to reduce paymment</p>
            <ToggleSwitch isOn={isOn} setIsOn={setIsOn} />
          </div>
        </div>
        <div className="bg-white border border-border px-4 py-6  mt-1 ">
          <Button onClick={() => setMakePayment("complete")} className="w-full">
            Pay £{rentDetail?.monthlyPrice}
          </Button>
          <p className="text-[10px] mt-2 ">
            Submitting this page will charge your card and cannot be undone
          </p>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
