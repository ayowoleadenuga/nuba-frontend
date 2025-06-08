"use client";
import React, { FC } from "react";
import SupportFaqsContainer from "./support-faqs-container";
import { SupportFaqsProps } from "@/types";

const SupportFaqs: FC<SupportFaqsProps> = ({
  faqQuestions,
  setFaqQuestions,
}) => {
  return (
    <div className="mt-10 w-full md:w-[70%] xl:w-[50%]">
      <SupportFaqsContainer
        faqQuestions={faqQuestions}
        setFaqQuestions={setFaqQuestions}
      />
    </div>
  );
};

export default SupportFaqs;
