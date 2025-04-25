"use client";
import React, { useState } from "react";
import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import { CheckedIcon } from "@/assets/svg/ckecked-icon";
import MinusIcon from "@/assets/svg/minus-icon";
import PlusIcon from "@/assets/svg/plus-icon";
import { faqs } from "@/components/homepage/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ReferralsRight = () => {
  const [faqQuestions, setFaqQuestions] = useState(faqs);
  return (
    <div className="w-[49%]  ">
      <div className="bg-white p-5">
        <div className="w-full flex items-center justify-between ">
          <p className="text-[12px] font-[600] ">Referral history</p>

          <button className="bg-[#F1F1F1] flex items-center gap-1 h-[28px] px-[6px] text-[8px] font-[600] text-[#2A4152] ">
            This Month
            <ArrowDownIcon />
          </button>
        </div>
        <div className="rounded-[4px] border border-[#d9d9d9] mt-10 ">
          <p className="border-b border-b-[#d9d9d9] text-[11px] p-4 text-right">
            March 20, 2025
          </p>
          <div className="flex items-start justify-between p-5">
            <div className="flex items-center gap-1">
              <CheckedIcon />
              <div>
                <p className="text-[12px] font-[600] ">John Doe</p>
                <p className="text-[10px] text-grayText ">Referral reward</p>
              </div>
            </div>
            <p className="text-[14px] font-[500] ">125 points</p>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-white p-5">
        <p className="text-[12px] font-[600] border-b border-b-border pb-5 ">
          Frequently Asked Questions
        </p>
        {faqQuestions.map((faq, index) => {
          return (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={faq.answer}>
                <AccordionTrigger className="font-[600] ">
                  {faq.question}{" "}
                </AccordionTrigger>
                <AccordionContent>{faq.answer} </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ReferralsRight;
