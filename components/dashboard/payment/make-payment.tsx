"use client";
import React, { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ammex from "@/assets/svg/amex-card.svg";
import { AddIcon } from "@/assets/svg/add-icon";
import { Mastercard } from "@/assets/svg/mastercard";
import Image from "next/image";
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

interface MakePaymentProps {
  setMakePayment: React.Dispatch<
    React.SetStateAction<"" | "start" | "complete">
  >;
}
const MakePayment: React.FC<MakePaymentProps> = ({ setMakePayment }) => {
  const dispatch = useDispatch();
  const [isOn, setIsOn] = useState(false);
  const { cardName, cardNo, cvv } = useSelector(
    (state: RootState) => state.payment.newPaymentMethod
  );

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
    setErrors(prevErrors => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = paymentSchema.safeParse({
      cardName,
      cvv,
      cardNo,
    });
    const errorMessages: { [key: string]: string } = {};

    if (!result.success) {
      result.error.errors.forEach(err => {
        errorMessages[err.path[0]] = err.message;
      });
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    setErrors({});
    dispatch(resetNewPaymentForm());
  };

  return (
    <div className="flex md:flex-row flex-col items-start justify-between gap-10 ">
      <div className="border border-border rounded-[12px] p-3 w-full md:w-[60%] xl:w-[47%]  ">
        <p className="font-[600] text-[14px] mb-1 ">Payment Method</p>
        <Accordion type="single" collapsible className=" ">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center justify-between gap-2 relative bg-[#F1F1F1] px-3 ">
              <p className="font-[500] text-[14px] ">American Express</p>
              <div className="absolute right-8 top-4 flex items-center gap-2">
                <Image src={ammex} alt="card" />
                <p>4308</p>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Mastercard />
                  <div>
                    <p className="font-[500] text-[14px] ">
                      Mastercard ending in 8480
                    </p>
                    <p className="font-[300] text-[12px] ">Expiry 04/2026</p>
                  </div>
                </div>
                <span className="bg-[#27AE60] border-[#474747] border rounded-full w-4 h-4 "></span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className=" ">
          <AccordionItem value="item-1">
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
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  label="Card holder Name (as it appears on the card)"
                  placeholder=""
                  value={cardName}
                  name="cardName"
                  onChange={handleChange}
                />
                {errors.cardName && (
                  <p className="text-red-500 text-[12px]">{errors.cardName}</p>
                )}
                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  label="Card Number"
                  placeholder=""
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={cardNo}
                  name="cardNo"
                  onChange={handleChange}
                />
                {errors.cardNo && (
                  <p className="text-red-500 text-[12px]">{errors.cardNo}</p>
                )}
                <NubaInput
                  containerClass={"w-full mt-6"}
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  label="CVV/CVC Code (3 digits on back, 4 for Amex)"
                  placeholder=""
                  value={cvv}
                  name="cvv"
                  onChange={handleChange}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-[12px]">{errors.cvv}</p>
                )}

                <button
                  type="submit"
                  className={cn(
                    "w-full text-white h-[54px] mt-[50px] rounded-[4px] text-[14px] font-[700] bg-black "
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
          <p className="text-[14px] font-[600] ">£1,223.87</p>
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
            Pay £1,223.87
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
