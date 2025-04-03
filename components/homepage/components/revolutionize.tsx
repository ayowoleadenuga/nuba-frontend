import React from "react";
import PaymentCard from "@/components/homepage/components/payment-card";
import bg from "../../../assets/jpg/benefits-bg.jpg";
import { revolutioniseList } from "@/components/homepage/constants";
import { RevolutioniseListType } from "@/types";
const Revolutionize = () => {
  return (
    <div className="min-h-[100vh] flex items-center flex-col py-10 text-center px-6 md:px-[60px] lg:px-[120px] ">
      <p className="font-[600] text-[32px] md:text-[48px]  ">
        Revolutionise rent payments
      </p>
      <p className="w-full md:w-[80%] ">
        Its time to get rewarded for your biggest monthly expense. By paying
        your rent with a credit card, you can gain points and rewards from your
        chosen card provider.
      </p>
      <button className=" text-white bg-black font-[700]  cursor-pointer rounded-[36px] h-[53px] px-6 mt-9 ">
        Pay your rent
      </button>
      <div className="mt-10 flex justify-center flex-wrap w-full gap-4  items-center w-[80%] ">
        {revolutioniseList.map((item: RevolutioniseListType, index: number) => {
          return <PaymentCard key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Revolutionize;
