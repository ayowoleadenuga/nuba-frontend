import GetInTouch from "./get-in-touch";
import Navbar from "@/components/layout/navbar";
import React from "react";

const ContactUsClient = () => {
  return (
    <div className="w-full bg-black text-white   ">
      <div className="px-6 md:px-[60px] lg:px-[120px] ">
        <Navbar hasBg />
        <div className="w-full h-[60vh]">
          <p className="text-[40px] md:text-[60px] xl:text-[96px] font-[600] pt-[150px] md:pt-[56px] text-center md:text-start ">
            We are here to answer questions.
          </p>
        </div>
      </div>
      <GetInTouch />
    </div>
  );
};

export default ContactUsClient;
