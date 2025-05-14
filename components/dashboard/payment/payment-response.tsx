import React from "react";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { ErrorLogo } from "@/assets/svg/error-logo";
import { cn } from "@/utils";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import check from "@/assets/gif/check.gif";

interface PaymentResponseInterface {
  paymentSuccessful: boolean;
}
const PaymentResponse: React.FC<PaymentResponseInterface> = ({
  paymentSuccessful,
}) => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full flex items-center justify-center flex-col text-center gap-5 mt-10 mb-[153px] ">
        {paymentSuccessful ? (
          <Image src={check} alt="success" />
        ) : (
          <ErrorLogo />
        )}

        <p
          className={cn(
            "text-[24px] font-[500]  ",
            paymentSuccessful ? "text-[#46642D]" : "text-[#FF3D00] "
          )}
        >
          {paymentSuccessful
            ? "Your payment has been submitted"
            : " Your payment could not be processed"}
        </p>
        <p className="font-[500] text-[12px] md:text-[16px] text-center w-full md:w-[70%] lg:w-[50%] ">
          {paymentSuccessful
            ? "  Kindly note that payment processing may take between 24 and 48 hours."
            : "  We couldn’t complete your rent payment. This may be due to an issue with your payment method."}
        </p>
        {paymentSuccessful ? (
          <button
            onClick={() => router.push("/transactions")}
            className="flex items-center gap-1 underline"
          >
            View payment details <ArrowRightIcon />
          </button>
        ) : (
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1 underline"
          >
            Retry Payment <ArrowRightIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentResponse;
