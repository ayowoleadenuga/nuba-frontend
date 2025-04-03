"use client";
import MinusIcon from "@/assets/svg/minus-icon";
import PlusIcon from "@/assets/svg/plus-icon";
import { faqs } from "@/components/homepage/constants";
import React, { useState } from "react";

const Faqs = () => {
  const [faqQuestions, setFaqQuestions] = useState(faqs);

  return (
    <div className="min-h-[100vh] px-6 md:px-[60px] lg:px-[120px] py-[60px]">
      <p className="text-center text-[32px] md:text-[40px] lg:text-[48px] font-[600] mb-[56px]">
        Frequently asked questions
      </p>
      {faqQuestions.map((faq, index) => {
        return (
          <div
            onClick={() => {
              setFaqQuestions(prev =>
                prev.map((item, i) => ({
                  ...item,
                  expand: i === index ? !item.expand : false,
                }))
              );
            }}
            className="p-0 md:p-3 lg:p-10 cursor-pointer border-b border-b-[#D9D9D9]"
            key={index}
          >
            <div className="my-4 flex justify-between items-start w-full">
              <h3 className="text-lg md:text-[30px] font-[600] text-[#1B1E21] w-[80%] ">
                {faq.question}
              </h3>
              <div className="bg-black flex items-center justify-center w-[30px] h-[30px] rounded-full w">
                {faq.expand ? <MinusIcon /> : <PlusIcon />}
              </div>
            </div>
            {faq.expand && (
              <div>
                {faq.answer.split("\n").map((paragraph, index) => (
                  <div key={index} className="mb-2">
                    {paragraph.includes(":") ? (
                      <>
                        <p className="text-[#4B525A] text-[18px] font-semibold">
                          {paragraph.split(":")[0].trim()}:
                        </p>
                        <ul className="list-disc pl-5">
                          {paragraph
                            .split(":")[1]
                            ?.split(".")
                            .filter(item => item.trim() !== "") // Avoid empty items
                            .map((item, i) => (
                              <li
                                key={i}
                                className="text-[#4B525A] text-[18px]"
                              >
                                {item.trim()}
                              </li>
                            ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-[#4B525A] text-[18px]">{paragraph}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Faqs;
