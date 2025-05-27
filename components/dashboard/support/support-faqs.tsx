"use client";
import MinusIcon from "@/assets/svg/minus-icon";
import { OptionsIcon } from "@/assets/svg/options-icon";
import PlusIcon from "@/assets/svg/plus-icon";
import { PointsIcon } from "@/assets/svg/points-icon";
import { faqs } from "@/components/homepage/constants";
import React, { useState } from "react";

const SupportFaqs = () => {
  const [faqQuestions, setFaqQuestions] = useState(faqs);
  return (
    <div className="mt-10 w-full md:w-[70%] xl:w-[50%] ">
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
            className=" cursor-pointer border-b border-b-[#D9D9D9]"
            key={index}
          >
            <div className="my-4 flex justify-between items-start w-full">
              <h3 className="text-[14px] font-[600] text-[#1B1E21] w-[80%] ">
                {faq.question}
              </h3>
              <div className="bg-black flex items-center justify-center w-5 h-5 rounded-full w">
                {faq.expand ? (
                  <MinusIcon width={10} />
                ) : (
                  <PlusIcon width={10} />
                )}
              </div>
            </div>
            {faq.expand && (
              <div>
                {faq.answer.split("\n").map((paragraph, index) => (
                  <div key={index} className="mb-2">
                    {paragraph.includes(":") ? (
                      <>
                        <p className="text-[#4B525A] text-[12px] ">
                          {paragraph.split(":")[0].trim()}:
                        </p>
                        <ul className="list-disc pl-5 ">
                          {paragraph
                            .split(":")[1]
                            ?.split(".")
                            .filter(item => item.trim() !== "") // Avoid empty items
                            .map((item, i) => (
                              <li
                                key={i}
                                className="text-[#4B525A] text-[12px]"
                              >
                                {item.trim()}
                              </li>
                            ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-[#4B525A] text-[12px]">{paragraph}</p>
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

export default SupportFaqs;
