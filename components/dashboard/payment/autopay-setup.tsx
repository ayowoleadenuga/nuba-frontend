import React from "react";
import { ArrowLeftIcon } from "@/assets/svg/arrow-left";
import ammexCard from "@/assets/svg/amex-card.svg";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mastercard } from "@/assets/svg/mastercard";

interface AutoPayProps {
  setTab: React.Dispatch<
    React.SetStateAction<"" | "autopay-setup" | "include-points">
  >;
}

const AutopaySetup: React.FC<AutoPayProps> = ({ setTab }) => {
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
    <div className="w-full md:w-[60%] xl:w-[40%] ">
      <button
        onClick={() => setTab("")}
        className="text-[12px] font-[600] my-5 flex items-center gap-2"
      >
        <ArrowLeftIcon /> Set up Autopay
      </button>
      <div className="rounded-lg shadow-md p-4 bg-white">
        <div className="mb-4">
          <Accordion type="single" collapsible className=" ">
            <AccordionItem value="item-1">
              <AccordionTrigger
                dropdownVisible={false}
                className="flex items-center "
              >
                <div className="flex items-center justify-between w-full">
                  <p className="text-[14px] font-[600] ">Payment Method</p>
                  <div className="h-[30px] px-3 bg-[#ececec] rounded-[4px] flex items-center justify-center gap-1 text-[10px] font-[500] ">
                    Change
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className=" cursor-pointer flex items-center justify-between py-4">
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
          <div className="flex items-center justify-between mt-8 border-b border-boder pb-5">
            <div>
              <p className="font-[600] text-[12px] ">American Express</p>
              <p className="text-[10px] text-red-500">
                Fee applies <span className="text-orange-500">ⓘ</span>
              </p>
            </div>
            <div className="flex items-center">
              <Image
                src={ammexCard}
                alt="AmericanExpress"
                className="h-6 mr-2"
              />
              <p className="text-sm text-gray-700">..4308</p>
            </div>
          </div>
        </div>
        <div className="pb-4 border-b border-border flex items-center justify-between">
          <p className=" text-[12px] font-[600]">Payment date</p>
          <div className="flex items-center ">
            <select className="mt-1 cursor-pointer w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-[12px] ">
              {dayOptions.map(day => (
                <option className="text-[10px] md:text-[12px] " key={day}>
                  {day}
                </option>
              ))}
            </select>
            <p className="ml-2 text-[12px] font-[600] ">of the month</p>
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-[14px] font-[600] mt-3">Payment Amount</p>
          <div className="py-4 border-b border-border flex items-center justify-between">
            <p className=" text-[12px] font-[600]">Full balance due</p>
            <div className="flex items-center ">
              <select className="mt-1 cursor-pointer w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-[12px] ">
                {dayOptions.map(day => (
                  <option className="text-[10px] md:text-[12px] " key={day}>
                    {day}
                  </option>
                ))}
              </select>
              <p className="ml-2 text-[12px] font-[600] ">of the month</p>
            </div>
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
