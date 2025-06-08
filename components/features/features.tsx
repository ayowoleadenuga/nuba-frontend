import React from "react";
import features from "@/assets/jpg/benefits-bg.jpg";
import HomeIcon from "@/assets/svg/home-icon";

const Features = () => {
  return (
    <div className="overflow-hidden h-[100vh] relative  ">
      <p className="text-[40px] md:text-[60px] xl:text-[85px] font-[600] pt-[90px] md:pt-[70px] xl:pt-[64px] md:text-start text-center  ">
        Benefit from your rent payments.
      </p>
      <div className="absolute bottom-[-50px] w-full left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6 ">
          <p className="font-[500] text-[24px] hidden md:block ">
            Earn from using Nuba
          </p>
          <div className="border-[#999B9E] border-[3px] border-b-0 w-[100%] md:w-[400px] p-3  h-[60vh] rounded-t-[24px] flex flex-col items-center justify-center overflow-hidden">
            <div
              style={{
                backgroundImage: `url(${features.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="rounded-[12px] h-full flex flex-col items-center justify-center w-full "
            >
              <p className="font-[500] text-[20px] ">Rent </p>
              <p className="mt-2 font-[700] text-[32px] ">£1,500</p>
              <button className="mt-5 bg-white text-black font-[500] text-[14px] md:block hidden cursor-pointer px-5 rounded-[36px] h-9 ">
                Manage Payments
              </button>
              <div className="bg-white w-[90%] h-[80px] rounded-[24px] mt-3 p-5 flex items-start justify-between ">
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
          <p className="font-[500] text-[24px] hidden md:block ">
            Pay Rent the Right way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
