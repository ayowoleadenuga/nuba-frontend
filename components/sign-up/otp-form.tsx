"use client";
import { VerifyBadge } from "@/assets/svg/verify-badge";
import { Button } from "@/components/ui/button";
import { nextStep, updateFormData } from "@/redux/features/authSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const OtpForm = () => {
  const dispatch = useDispatch();
  const handlePin = (value: string) => {
    dispatch(updateFormData({ otp: value }));
  };
  const [code, setCode] = useState<string>("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (code.length === 6) {
      handlePin(code);
    }
  }, [code]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (index < inputRefs.current.length - 1 && value !== "") {
      inputRefs.current[index + 1]?.focus();
    }

    setCode(prevCode => {
      const newCode = prevCode.split("");
      newCode[index] = value;
      return newCode.slice(0, 6).join("");
    });
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = code.split("");
    for (let i = 0; i < pastedData.length; i++) {
      if (index + i < inputRefs.current.length) {
        newCode[index + i] = pastedData[i];
      }
    }
    setCode(newCode.join("").slice(0, 6));
    handlePin(newCode.join("").slice(0, 6));
  };
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-[50%] lg:w-[35%] ">
      <VerifyBadge />
      <p className="text-center text-[24px] md:text-[28px] font-[600] my-10 ">
        Enter the code sent to your email addrress
      </p>
      <div className="flex flex-col space-y-2 ">
        <div className="flex space-x-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              placeholder="-"
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              className="w-12 h-12 border outline-[#CCCCCC] rounded-lg text-center"
              value={code[index] || ""}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => {
                if (e.key === "Backspace" && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
              onPaste={e => handlePaste(e, index)}
            />
          ))}
        </div>
        {/* <p className="text-red-500 text-[10px] leading-tight text-start">
          {error}
        </p> */}
      </div>
      <Button
        onClick={() => dispatch(nextStep())}
        disabled={code.length !== 6}
        className="px-[80px] mt-[50px] font-[500] text-[14px] "
      >
        SUBMIT
      </Button>
      <p className="text-center text-gray-400 text-[12px] font-[500] mt-5 ">
        Didn’t receive the code?{" "}
        <button className="text-black font-[700] cursor-pointer">
          Resend code
        </button>
      </p>
    </div>
  );
};

export default OtpForm;
