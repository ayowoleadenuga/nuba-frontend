"use client";
import React, { useState } from "react";
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
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import ToggleSwitch from "@/components/ui/toggle-switch";
import { Button } from "@/components/ui/button";

interface MakePaymentProps {
  setMakePayment: React.Dispatch<
    React.SetStateAction<"" | "start" | "complete">
  >;
}
const MakePayment: React.FC<MakePaymentProps> = ({ setMakePayment }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex items-start justify-between ">
      <div className="border border-border rounded-[12px] p-3 w-[47%]  ">
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
        <div className="bg-[#F1F1F1] py-6 px-3 mt-2">
          <button className="text-[12px] font-[600] flex items-center gap-2 ">
            <AddIcon /> Add payment method
          </button>
        </div>
      </div>
      <div className="w-[47%] ">
        <div className="bg-white border border-border px-4 py-6 flex items-center justify-between rounded-[4px] ">
          <p className="text-[14px] font-[500] ">Payment amount</p>
          <p className="text-[14px] font-[600] ">£1,223.87</p>
        </div>
        <div className="bg-white border border-border px-4 py-6 rounded-[4px] mt-1 ">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-[500] ">
              Save up to £156.12 on this payment
            </p>
            <ArrowRightIcon />
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
