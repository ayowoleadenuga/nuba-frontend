import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { ErrorLogo } from "@/assets/svg/error-logo";
import { SuccessIcon } from "@/assets/svg/success-icon";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

const PaymentResponse = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center flex-col text-center gap-5 mt-10">
      <SuccessIcon />
      {/* <ErrorLogo /> */}
      <p className="text-[24px] font-[500] text-[#46642D] ">
        Your payment has been submitted
      </p>
      {/* <p className="text-[18px] md:text-[24px] font-[500] text-[#FF3D00] ">
        Your payment could not be processed
      </p> */}
      <p className="font-[500] text-[12px] md:text-[16px] text-center w-full md:w-[70%] lg:w-[50%] ">
        {/* We couldn’t complete your rent payment. This may be due to an issue with
        your payment method. */}
        Kindly note that payment processing may take between 24 and 48 hours.
      </p>
      <button
        onClick={() => router.push("/transactions")}
        className="flex items-center gap-1 underline"
      >
        View payment details <ArrowRightIcon />
      </button>
      {/* <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-1 underline"
      >
        Retry Payment <ArrowRightIcon />
      </button> */}
      {/* <div className="flex items-center gap-10 justify-center">
        <button
          onClick={() => router.push("/transactions")}
          className="flex items-center gap-1 underline"
        >
          Retry Payment <ArrowRightIcon />
        </button>
        <button
          onClick={() => router.push("/transactions")}
          className="flex items-center gap-1 underline"
        >
          Change Payment Method <ArrowRightIcon />
        </button>
      </div> */}
    </div>
  );
};

export default PaymentResponse;
