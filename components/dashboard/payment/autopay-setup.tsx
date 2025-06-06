import React, { useState } from "react";
import { ArrowLeftIcon } from "@/assets/svg/arrow-left";
import ammexCard from "@/assets/svg/amex-card.svg";
import Image from "next/image";
import { useGetPaymentMethodsQuery } from "@/redux/features/paymentsApiSlice";
import { Accordion } from "@/components/ui/accordion";
import PaymentAccordionItem from "../settings/payment-accordion-item";

interface AutoPayProps {
  setTab: React.Dispatch<
    React.SetStateAction<"" | "autopay-setup" | "include-points">
  >;
}

const AutopaySetup: React.FC<AutoPayProps> = ({ setTab }) => {
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null);
  const [showAllMethods, setShowAllMethods] = useState(false);

  const { data: paymentMethods } = useGetPaymentMethodsQuery();

  const selectedMethod =
    paymentMethods?.data?.find((method) => method.id === activeMethodId) ||
    paymentMethods?.data?.[0];

  const dayOptions = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    return `${day}${suffix}`;
  });

  return (
    <div className="w-full md:w-[60%] xl:w-[40%] min-h-[70vh]">
      <button
        onClick={() => setTab("")}
        className="text-[12px] font-[600] my-5 flex items-center gap-2"
      >
        <ArrowLeftIcon /> Set up Autopay
      </button>
      <div className="rounded-lg shadow-md p-4 bg-white">
        <div className="mb-4">
          <div className="flex items-center justify-between w-full mb-2">
            <p className="text-[14px] font-[600]">Payment Method</p>
            <button
              onClick={() => setShowAllMethods((prev) => !prev)}
              className="h-[30px] px-3 bg-[#ececec] rounded-[4px] text-[10px] font-[500]"
            >
              Change
            </button>
          </div>

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
                <Image
                  src={ammexCard}
                  alt="Selected Card"
                  className="h-6 mr-2"
                />
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
          <div className="flex items-center">
            <select className="mt-1 cursor-pointer w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-[12px]">
              {dayOptions.map((day) => (
                <option className="text-[10px] md:text-[12px]" key={day}>
                  {day}
                </option>
              ))}
            </select>
            <p className="ml-2 text-[12px] font-[600]">of the month</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-sm font-semibold mt-3">
            <p>Payment Amount</p>
            <span>£1,223.88</span>
          </div>
        </div>

        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
          Turn off autopay
        </button>
      </div>
    </div>
  );
};

export default AutopaySetup;
