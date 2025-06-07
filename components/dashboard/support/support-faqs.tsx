"use client";
import React, { useState } from "react";
import SupportFaqsContainer from "./support-faqs-container";
import { supportFaqs } from "./constants";

const SupportFaqs = () => {
  const [faqQuestions, setFaqQuestions] = useState(supportFaqs);

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
