import HomeIcon from "@/assets/svg/home-icon";
import Navbar from "@/components/layout/navbar";
import { GetStartedButton } from "@/components/ui/get-started-button";
import React from "react";

const Home = () => {
  return (
    <div className="px-6 md:px-[60px] lg:px-[120px]  text-white relative w-full h-full ">
      <Navbar />
      <div className=" w-[calc(100%-48px)] md:w-[70%] lg:w-[60%] xl:w-[50%] absolute mt-[50%] bottom-[20%] md:bottom-[30%] text-center md:text-start ">
        <h2 className="text-[40px] md:text-[60px] lg:text-[80px] lg:leading-[70px] font-[600]  ">
          Rewards from your rent.
        </h2>
        <p className="text-[24px] w-full md:w-[75%] lg:w-[55%] xl:w-[64%] mt-8 font-[500] leading-[110%] ">
          Pay with your card—Visa, Mastercard, American Express and earn
          benefits every time you pay rent.
        </p>
        <GetStartedButton className=" font-[700]  text-[14px] md:text-[16px] rounded-[36px] h-[56px] md:h-10 px-7 mt-9" />
      </div>
      <div className="hidden lg:flex items-end justify-center w-full h-full ">
        <div className="border-[#999B9E] border-[3px] border-b-0 w-[400px] h-[60vh] rounded-t-[24px] flex flex-col items-center justify-center ">
          <p className="font-[500] text-[20px] ">Rent </p>
          <p className="mt-2 font-[700] text-[32px] ">£1,500</p>
          <button className="mt-5 bg-white text-black font-[500] text-[14px] md:block hidden cursor-pointer px-5 rounded-[36px] h-9 ">
            Manage Payments
          </button>
          <div className="bg-white w-[90%] h-[80px] rounded-[24px] mt-[90px] p-5 flex items-start justify-between ">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#88BB6C] rounded-full flex items-center justify-center ">
                <HomeIcon />
              </div>
              <div>
                <p className="font-[500] text-black ">Rent Paid</p>
                <p className="text-[#999B9E] text-[12px] ">Today, 14:22</p>
              </div>
            </div>
            <p className="font-[500] text-black ">£1,500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
