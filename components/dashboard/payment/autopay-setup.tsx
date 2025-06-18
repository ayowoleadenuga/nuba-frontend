import React, { useState } from "react";
import { ArrowLeftIcon } from "@/assets/svg/arrow-left";
import Image from "next/image";
import {
  useGetDiscountQuery,
  useGetPaymentMethodsQuery,
  useInitiatePaymentQuery,
  useToggleAutoPayMutation,
} from "@/redux/features/paymentsApiSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaymentAccordionItem from "../settings/payment-accordion-item";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { formatDate } from "@/utils";
import paymentCard from "@/assets/png/payment-card.png";
import { nubaApis } from "@/services/api-services";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import { AddIcon } from "@/assets/svg/add-icon";
import RyftPayment from "@/components/dashboard/payment/ryft-payment";

interface AutoPayProps {
  setTab: React.Dispatch<
    React.SetStateAction<"" | "autopay-setup" | "include-points">
  >;
}

const AutopaySetup: React.FC<AutoPayProps> = ({ setTab }) => {
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null);
  const [showAllMethods, setShowAllMethods] = useState(false);

  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const { data: rents, isLoading: isRentsLoading } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    firstRentId ?? skipToken
  );
  const rentDetail = rentDetails?.data;
  const selectedMethod =
    paymentMethods?.data?.find(method => method.id === activeMethodId) ||
    paymentMethods?.data?.[0];

  const {
    data: userProfileDetails,
    isLoading: userProfileLoading,
    refetch,
  } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const [toggleAutoPay, { isLoading: togglingAutopay }] =
    useToggleAutoPayMutation();
  const [addPayment, setAddPayment] = useState<boolean>(false);

  const {
    data: clientSecretData,
    isLoading: initiatePaymentLoading,
    isSuccess: initatePaymentSuccess,
    isError: initiatePaymentError,
  } = useInitiatePaymentQuery();

  const handleToggleAutopay = async () => {
    if (userProfile) {
      await nubaApis.createPaymentMethod.handleToggleAutopay(
        toggleAutoPay,
        userProfile?.autopay
      );
      refetch();
    }
  };

  return (
    <div className="w-full md:w-[80%] xl:w-[40%] min-h-[70vh]">
      <button
        onClick={() => setTab("")}
        className="text-[12px] font-[600] my-5 flex items-center gap-2"
      >
        <ArrowLeftIcon /> Set up Autopay
      </button>
      <div className="rounded-lg shadow-md p-4 bg-white">
        <div className="mb-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-0 ">
              <AccordionTrigger
                onClick={() => setAddPayment(true)}
                dropdownVisible={false}
                className="flex items-center justify-between gap-2 relative "
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <p className="text-[14px] font-[600]">Payment Method</p>
                  <button
                    onClick={() => setShowAllMethods(prev => !prev)}
                    className="h-[30px] px-3 bg-[#ececec] rounded-[4px] text-[10px] font-[500]"
                  >
                    Change
                  </button>
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
                {clientSecretData?.data?.token && !initiatePaymentLoading && (
                  <RyftPayment
                    addPayment={addPayment}
                    clientSecret={clientSecretData?.data?.token}
                    buttonText="Add Payment Method"
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {!showAllMethods && selectedMethod && (
            <div className="flex items-center justify-between mt-2 border-b border-boder pb-5">
              <div>
                <p className="font-[600] text-[12px]">
                  {selectedMethod.cardName}
                </p>
                <p className="text-[10px] text-red-500">
                  Fee applies <span className="text-orange-500">ⓘ</span>
                </p>
              </div>
              <div className="flex items-center">
                <Image src={paymentCard} alt="card" className="w-7 h-5 " />
                <p className="text-sm text-gray-700">
                  {selectedMethod.lastDigits}
                </p>
              </div>
            </div>
          )}

          {showAllMethods && (
            <Accordion type="single" collapsible className="space-y-2 mt-2">
              {paymentMethods?.data?.map((method, index) => (
                <PaymentAccordionItem
                  key={method.id}
                  method={method}
                  index={index}
                  isActive={method.id === activeMethodId}
                  onSelect={() => {
                    setActiveMethodId(method.id);
                    setShowAllMethods(false);
                  }}
                />
              ))}
            </Accordion>
          )}
        </div>

        <div className="pb-4 border-b border-border flex items-center justify-between">
          <p className="text-[12px] font-[600]">Payment date</p>
          <p className="ml-2 text-[12px] font-[600]">
            {isRentsLoading
              ? "Loading..."
              : rentDetail?.dueDate
              ? formatDate(rentDetail.dueDate)
              : "—"}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-sm font-semibold mt-3">
            <p>Payment Amount</p>
            <span>£{rentDetail?.monthlyPrice?.toLocaleString()}</span>
          </div>
        </div>

        <button
          disabled={userProfileLoading || togglingAutopay}
          onClick={handleToggleAutopay}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        >
          {togglingAutopay
            ? "Toggling..."
            : userProfile?.autopay
            ? "Turn off Autopay"
            : "Turn on Autopay"}
        </button>
      </div>
    </div>
  );
};

export default AutopaySetup;
