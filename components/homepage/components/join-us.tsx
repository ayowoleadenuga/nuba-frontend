"use client";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

const JoinUs = () => {
  const router = useRouter();
  return (
    <div className="bg-black text-white text-start md:text-center h-[65vh] px-6 md:px-[60px] lg:px-[120px]  py-[60px] flex justify-center items-center">
      <div className="w-full md:w-[75%] lg::w-[67%] flex flex-col gap-2 md:justify-between items-start md:items-center h-full">
        <p className="text-[32px] md:text-[40px] lg:text-[48px] font-[700]">
          Join the only loyalty program that rewards you for paying rent.
        </p>
        <p className="text-[12px] md:text-[20px] font-[500] ">
          Start earning the most valuable points on rent today.
        </p>
        <button
          onClick={() => router.push("/contact-us")}
          className="mt-5 bg-white text-black font-[500] text-[20px] cursor-pointer px-[56px] rounded-[36px] h-[56px] "
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default JoinUs;
