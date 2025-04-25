"use client";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { PointIcon } from "@/assets/svg/point-icon";
import SupportFaqs from "@/components/dashboard/support/support-faqs";
import { Button } from "@/components/ui/button";
import { IconButton } from "@mui/material";
import React, { useRef } from "react";
import NubaInput from "@/components/ui/nuba-input";

const SupportClient = () => {
  const handleSubmit = () => {};
  const form = useRef<HTMLFormElement | null>(null);
  return (
    <div className="w-full">
      <div className="py-2 border-b border-b-[#D9D9D9] w-full flex items-center justify-between ">
        <p className="text-[20px] font-[600] ">Support Center</p>
        <div className="flex items-center gap-4 ">
          <div>
            <div className="flex items-center">
              <PointIcon />
              <p className="font-[700] text-[#CF931D]  ">302.56 pts</p>
            </div>
            <p className="text-[11px] text-[#999B9E] ">Member since ‘25</p>
          </div>
          <IconButton>
            <OptionsIcon />
          </IconButton>
        </div>
      </div>
      <div className="w-[50%] ">
        <div className="w-full flex items-center justify-between mt-10 gap-2">
          <input
            className="w-[80%] h-[44px] px-4 border border-border rounded-[10px] outline-none text-[14px] "
            placeholder="Search Frequently Asked Questions"
          />
          <Button className="w-[20%] ">Search</Button>
        </div>
      </div>
      <SupportFaqs />
      <div className="w-[50%] my-10 ">
        <div className="w-full border-b border-b-[#E2E8F0] pb-1 ">
          <p className="font-[600] text-[12px] text-[#2A4152] ">
            Still need help?
          </p>
          <p className="text-[10px] bo ">
            Fill out the form below and our team will get back to you.
          </p>
        </div>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="w-full border-b border-b-[#E2E8F0] pb-6 "
        >
          <div className="w-[70%] ">
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Full Name"
              placeholder=""
              name="full_name"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              // value={fullName}
              // onChange={e => handleChange("fullName", e.target.value)}
            />
            {/* {errors.fullName && (
            <p className="text-red-500 text-[12px]">{errors.fullName}</p>
          )} */}

            <NubaInput
              containerClass={"w-full mt-6"}
              label="Email"
              placeholder=""
              name="email"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              // value={email}
              // onChange={e => handleChange("email", e.target.value)}
            />
            {/* {errors.email && (
            <p className="text-red-500 text-[12px]">{errors.email}</p>
          )} */}
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Describe your issue"
              placeholder=""
              name="message"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              // value={message}
              // onChange={e => handleChange("message", e.target.value)}
            />
            {/* {errors.message && (
            <p className="text-red-500 text-[12px]">{errors.message}</p>
          )} */}
          </div>
        </form>
        <div className="w-full flex items-center justify-center mt-4">
          <Button
            // disabled={pending}
            type="submit"
            // className={cn(
            //   pending ? "bg-gray-300" : "bg-black",
            //   "w-full text-white h-[54px] mt-[50px] rounded-[4px] text-[14px] font-[700] "
            // )}
          >
            Submit
            {/* {pending ? "SUBMITTING..." : "SUBMIT"} */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportClient;
