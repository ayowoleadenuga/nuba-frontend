import { Boost } from "@/assets/svg/boost";
import { EarnedPoints } from "@/assets/svg/earned-points";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { Redeem } from "@/assets/svg/redeem";
import { RefreshIcon } from "@/assets/svg/refresh-icon";
import AutopayOff from "@/components/dashboard/payment/autopay-off";
import AutopayOn from "@/components/dashboard/payment/autopay-on";
import EarnedCard from "@/components/dashboard/payment/earned-card";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="py-6 ">
      <div className="flex items-center justify-between">
        <p className="font-[600] text-[12px] ">
          Greenwood Apartments || 123 Main Street, London
        </p>
        <div className="flex items-center">
          <p className="text-[12px] font-[500] ">Payment History</p>
          <button>
            <OptionsIcon />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-4">
        <div className="cardStyle bg-white h-fit  ">
          <div className="flex items-center justify-between">
            <p className="font-[600] text-[14px] ">Charges</p>
            <div className="flex items-center gap-1">
              <p className="text-[10px] text-[#474747] ">
                As of March 01, 1:07 PM
              </p>
              <button>
                <RefreshIcon />
              </button>
            </div>
          </div>
          <div className="mt-5 border-b border-b-[#D9D9D9] pb-4 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-[600] ">Residential Rent</p>
                <p className="text-[#474747] text-[10px] ">01/05/2025</p>
              </div>
              <p className="font-[500] text-[14px] text-[#474747] ">
                £1,200.00
              </p>
            </div>
          </div>
          <div className="mt-5 border-b border-b-[#D9D9D9] pb-4 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-[600] ">Fee</p>
                <p className="text-[#474747] text-[10px] ">01/05/2025</p>
              </div>
              <p className="font-[500] text-[14px] text-[#474747] ">£23.88</p>
            </div>
          </div>
          <div className="mt-5 ">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-[600] ">Total</p>
              <p className="font-[500] text-[14px] text-[#474747] ">
                £1,223.88
              </p>
            </div>
          </div>
        </div>
        {/* <AutopayOn /> */}
        <AutopayOff />
      </div>
      <p className="text-[18px] font-[500] mt-10 mb-4 ">
        Your rewards & benefits on Nuba
      </p>
      <div className="flex items-center gap-10">
        <EarnedCard
          earned="You’ve earned"
          point="30,265"
          title="on paid referrals"
          description="Terms apply to earn points"
          action="Explore rewards"
          Icon={EarnedPoints}
          handleClick={() => {}}
        />
        <EarnedCard
          title="Redeem points for a percentage of your rent credit paid"
          description="Use your points to get a substancial amount off your next payment"
          action="Redeem points"
          Icon={Redeem}
          handleClick={() => {}}
        />
        <EarnedCard
          title="Boost your credit with rent reporting"
          description="Build your credit history with free rent reporting of the three major credit bureaus."
          action="Enable rent reporting (soon)"
          Icon={Boost}
          handleClick={() => {}}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
