import { RevolutioniseListType } from "@/types";
import React from "react";

interface PaymentCardProp {
  item: RevolutioniseListType;
}
const PaymentCard: React.FC<PaymentCardProp> = ({ item }) => {
  return (
    <div
      style={{ height: item.height, backgroundImage: `url(${item.bgUrl})` }}
      className={`w-full xl:w-[30%] bg-cover bg-no-repeat rounded-[12px] relative `}
    >
      <div className=" flex flex-col  h-full items-center justify-center  ">
        <p className="font-[500] text-[11px] text-white ">{item.type} </p>
        <p className="mt-2 font-[700] text-[19px] text-white ">{item.price}</p>
        <button className="mt-2 bg-white text-black font-[500] text-[14px] w-fit cursor-pointer px-4 rounded-[36px] h-[29px] ">
          {item.button}
        </button>
        <div className="bg-white absolute bottom-4 w-[90%] h-[55px] rounded-[16px]  flex items-center px-3 justify-between ">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: item.color }}
              className="w-7 h-7 rounded-full flex items-center justify-center "
            >
              <item.icon />
            </div>
            <div>
              <p className="font-[500] text-black text-[12px] ">{item.type}</p>
              <p className="text-[#999B9E] text-[8px] ">Today, 14:22</p>
            </div>
          </div>
          <p className="font-[500] text-black ">{item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
