import Image from "next/image";
import React from "react";
import payment from "@/assets/jpg/payment-method.jpg";
import bgImage from "@/assets/jpg/seamless-payout-bg.jpg";

const FeaturesExtended = () => {
  return (
    <section className="p-6 md:p-10 lg:p-[86px] bg-white text-black w-full  ">
      <article className="p-2 md:p-10 lg:p-[80px] flex flex-col md:flex-row items-center justify-between w-full gap-10 ">
        <div className="w-full md:w-[50%] ">
          <p className="text-[35px]  xl:text-[53px] font-[700] md:leading-[100%] ">
            Diverse payment options
          </p>
          <p className=" mt-4 ">
            With our variety of payment options, you can choose the method that
            best suits your needs. American Express Visa Mastercard
          </p>
          <ul className="list-disc font-[600] p-10 ">
            <li>American Express</li>
            <li>Visa</li>
            <li>Mastercard</li>
          </ul>
        </div>
        <div className="w-full md:w-[50%] ">
          <Image src={payment} alt="payment-method" />
        </div>
      </article>
      <article className="p-2 md:p-10 xl:p-[80px] mt-[100px] flex  flex-col-reverse md:flex-row items-center justify-between w-full gap-10 ">
        <div className="cardBgImage w-full md:w-[50%] p-5 xl:p-[52px] h-[200px] md:h-[350px] rounded-[40px] ">
          <div className="flex items-center justify-between">
            <Image
              height={46}
              width={94}
              src="/assets/nuba-logo.svg"
              alt="Nkeji-Logo"
            />
            <p className="text-[24px] font-[600] text-white ">VIRTUAL</p>
          </div>
        </div>
        <div className="w-full md:w-[50%] ">
          <p className="text-[32px] md:text-[40px] xl:text-[53px] font-[700] leading-[100%] ">
            Benefits of using nuba
          </p>
          <p className="font-[700] text-[24px] ">Credit Milestone Rewards </p>
          <p>
            Turn your rent payments into savings! Earn points for each friend
            you refer who pays rent through our platform.
          </p>
          <ul className="list-disc pl-10 pb-4 pt-0 ">
            <li>Milestone 1 → 30% Off your rent</li>
            <li> Milestone 2 → 60% Off your rent</li>
            <li>Milestone 3 → 100% Off your rent</li>
          </ul>
          <p>
            Redeem at any milestone, or keep saving for a bigger discount. Once
            redeemed, your points reset, and you start earning again. Keep
            referring and keep saving!
          </p>
        </div>
      </article>
      <article
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "contain",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          // height: "40vh",
        }}
        className="h-[50vh] md:h-[80vh] mt-[50px] md:mt-[100px] w-full md:flex items-center  hidden  "
      >
        <div className="w-full md:w-[58%] xl:w-[50%] rounded-[16px] p-3 md:p-0 ">
          <p className="text-[40px] md:text-[53px] font-[700] ">
            Seamless Payouts
          </p>
          <p className="text-[20px] font-[700]  ">
            No more waiting! With Nuba’s Seamless Payouts feature, rent payments
            are processed instantly, ensuring your agent gets paid without
            delays.
          </p>
        </div>
      </article>
      <article className=" mt-4 w-full pb-[100px] items-center md:hidden  ">
        <div className="w-full md:w-[58%] xl:w-[50%] rounded-[16px] p-3 md:p-0 ">
          <p className="text-[32px] md:text-[53px] font-[700] ">
            Seamless Payouts
          </p>
          <p className="text-[12px]   ">
            No more waiting! With Nuba’s Seamless Payouts feature, rent payments
            are processed instantly, ensuring your agent gets paid without
            delays.
          </p>
        </div>
        <Image src={bgImage} alt="seamless" />
      </article>
    </section>
  );
};

export default FeaturesExtended;
