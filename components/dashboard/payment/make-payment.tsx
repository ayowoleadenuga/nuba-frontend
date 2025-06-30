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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  paymentSliceType,
  resetNewPaymentForm,
  setMakePayment,
  setPaymentId,
  setRentPaymentStatus,
} from "@/redux/features/paymentSlice";
import { paymentSchema } from "@/utils/validator";
import {
  useCreatePaymentMethodMutation,
  useGetDiscountQuery,
  useGetPaymentMethodsQuery,
  useInitiatePaymentQuery,
  useMakePaymentMutation,
  useSetDefaultPaymentMethodMutation,
} from "@/redux/features/paymentsApiSlice";
import PaymentAccordionItem from "../settings/payment-accordion-item";
import { nubaApis } from "@/services/api-services";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import empty from "@/assets/gif/empty.gif";
import RyftPayment from "@/components/dashboard/payment/ryft-payment";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { useGetUserTransactionFeeQuery } from "@/redux/features/transactionsApiSlice";

export interface MakePaymentProps {
  paymentId: string | undefined;
  clientSecret: string | undefined;
  initiatePaymentLoading?: boolean;
  initiatePaymentError?: boolean;
  handleInitiateRyft: () => void;
}
const MakePayment: React.FC<MakePaymentProps> = ({
  paymentId,
  clientSecret,
  initiatePaymentLoading,
  initiatePaymentError,
  handleInitiateRyft,
}) => {
  const [createPaymentMethodMutation] = useCreatePaymentMethodMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOn, setIsOn] = useState<boolean>(false);
  // const [saveCardDetails, setSaveCardDetails] = useState<boolean>(false);
  const [showPaymentOptionModal, setShowPaymentOptionModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    "default" | "new"
  >("default");
  // const [activeMethodId, setActiveMethodId] = useState<string | null>(null);
  const { data: paymentMethods, refetch: refreshPaymentMethods } =
    useGetPaymentMethodsQuery();

  const { data: rents } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    firstRentId ?? skipToken
  );
  const rentDetail = rentDetails?.data;

  const [
    makePayment,
    { data, isLoading: makingPaymentLoading, isSuccess: makepaymentSuccess },
  ] = useMakePaymentMutation();
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
  const [addPayment, setAddPayment] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    [key in keyof paymentSliceType["newPaymentMethod"]]?: string;
  }>({});

  const { data: discount, isLoading: discountLoading } = useGetDiscountQuery();
  const { data: userProfileDetails } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;
  const nextMilestone = () => {
    const milestone = userProfile?.statistics.mileStone;

    if (milestone !== undefined) {
      if (milestone < 30) {
        return 30;
      } else if (milestone < 60) {
        return 60;
      } else {
        return 100;
      }
    }

    return 0;
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
      result.error.errors.forEach(err => {
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

  const handleMakePayment = async () => {
    if (paymentId) {
      try {
        const response = await nubaApis.createPaymentMethod.handlePay(
          makePayment,
          paymentId,
          {
            usePoints: isOn,
            callbackUrl: "https://www.nubarewards.com/payment",
            milestone: nextMilestone(),
          }
        );
        console.log("the make payment response is", response);

        // response.status === "success"
        if (response.message === "Payment Successfull") {
          toast.success("Payment successful");
          setShowPaymentOptionModal(false);
          dispatch(setMakePayment("complete"));
          dispatch(setRentPaymentStatus("success"));
          dispatch(setPaymentId(response?.data?.reference));
          console.log("payment id is", response);
          // dispatch(setMakePayment("ryft"));
        }
      } catch (error) {
        toast.error("Payment failed");
        dispatch(setMakePayment("complete"));
        dispatch(setRentPaymentStatus("error"));
        console.error("Payment error:", error);
      }
    }
  };
  const {
    data: transactionFee,
    refetch: refetchTransactionFee,
    isFetching: isFetchingFee,
    isSuccess: isFeeSuccess,
  } = useGetUserTransactionFeeQuery();

  console.log("fee is", transactionFee, "isfetchin fee is", isFetchingFee);

  // const handleContinuePayment = () => {
  //   if (selectedPaymentOption === "default") {
  //     handleMakePayment();
  //   } else {
  //     router.push("/ryft");
  //     // handleInitiateRyft();
  //     // dispatch(setMakePayment("ryft"));
  //   }
  // };

  const [setDefaultPaymentMethodMutation] =
    useSetDefaultPaymentMethodMutation();

  const handleSelectPaymentMethod = async (id: string) => {
    await nubaApis.setDefaultPaymentMethod.handleSetDefaultPaymentMethod(
      id,
      setDefaultPaymentMethodMutation
    );
    refreshPaymentMethods();
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
              // isActive={method.id === activeMethodId}
              onSelect={() => handleSelectPaymentMethod(method.id)}
            />
          ))}
          {paymentMethods?.data?.length === 0 && (
            <div className="flex items-center justify-center w-full py-3">
              <Image src={empty} alt="empty" className="w-10 h-10 " />
            </div>
          )}
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-0 ">
            <AccordionTrigger
              onClick={() => setAddPayment(true)}
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
              {initiatePaymentLoading && (
                <p className="text-[14px]   ">Loading...</p>
              )}
              {initiatePaymentError && (
                <p className="text-red-500 text-[14px]  ">
                  Error generating client secret.
                </p>
              )}
              {clientSecret && !initiatePaymentLoading && (
                <RyftPayment
                  addPayment={addPayment}
                  clientSecret={clientSecret}
                  buttonText="Add Card"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full md:w-[60%] xl:w-[47%] ">
        <div className="bg-white border border-border px-4 py-6 flex items-center justify-between rounded-[4px] ">
          <p className="text-[14px] font-[500] ">Payment amount</p>
          <p className="text-[14px] font-[600] ">
            £
            {rentDetail &&
              rentDetail?.monthlyPrice?.toLocaleString() +
                transactionFee?.data?.fee}
          </p>
        </div>
        <div className="bg-white border border-border px-4 py-6 rounded-[4px] mt-1 ">
          <div className="flex items-center justify-between">
            {discountLoading ? (
              "Loading..."
            ) : (
              <p className="text-[14px] font-[500] ">
                Save up to £{discount?.data?.discount} on this payment
              </p>
            )}
          </div>
          <div className="flex items-center justify-between pt-5">
            <p className="text-[12px]  ">Pay with points to reduce paymment</p>
            <ToggleSwitch
              isOn={isOn}
              setIsOn={setIsOn}
              discount={userProfile?.statistics?.mileStone}
            />
          </div>
        </div>
        <div className="bg-white border border-border px-4 py-6  mt-1 ">
          <Button
            disabled={makingPaymentLoading || discountLoading || isFetchingFee}
            onClick={handleMakePayment}
            // onClick={() => setShowPaymentOptionModal(true)}
            className="w-full"
          >
            {makingPaymentLoading
              ? "Processing"
              : ` Pay £
            ${
              isOn &&
              rentDetail?.monthlyPrice &&
              discount?.data?.discount &&
              isFeeSuccess
                ? (
                    rentDetail?.monthlyPrice +
                    transactionFee?.data?.fee -
                    discount?.data?.discount
                  ).toLocaleString()
                : (rentDetail?.monthlyPrice ?? 0).toLocaleString() +
                  transactionFee?.data?.fee
            }`}
          </Button>
          <p className="text-[12px] mt-2 ">
            Submitting this page will charge your default card and cannot be
            undone
          </p>
        </div>
      </div>

      {showPaymentOptionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setShowPaymentOptionModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 w-8 h-8 hover:bg-gray-100 rounded-full"
              onClick={() => setShowPaymentOptionModal(false)}
              aria-label="Close"
            >
              <p className="font-[700] text-[10px] ">X</p>
            </button>
            <h2 className=" font-semibold mb-4">
              Please Select option to pay with
            </h2>
            <div className="mb-4 text-[14px] ">
              <label className=" cursor-pointer flex items-center mb-2">
                <input
                  type="radio"
                  name="paymentOption"
                  value="default"
                  checked={selectedPaymentOption === "default"}
                  onChange={() => setSelectedPaymentOption("default")}
                  className="mr-2 accent-black"
                />
                Default Card
              </label>
              <label className=" cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="paymentOption"
                  value="new"
                  checked={selectedPaymentOption === "new"}
                  onChange={() => setSelectedPaymentOption("new")}
                  className="mr-2 accent-black  "
                />
                Use a new card
              </label>
            </div>
            <Button
              disabled={makingPaymentLoading}
              className="w-full"
              // onClick={handleContinuePayment}
            >
              {makingPaymentLoading || initiatePaymentLoading
                ? "Processing"
                : ` Continue
           `}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakePayment;
