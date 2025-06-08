import React, { useEffect } from "react";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { ErrorLogo } from "@/assets/svg/error-logo";
import { cn } from "@/utils";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import check from "@/assets/gif/check.gif";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSearchParams } from "next/navigation";
import { useValidatePaymentMutation } from "@/redux/features/paymentsApiSlice";
import { nubaApis } from "@/services/api-services";

const PaymentResponse = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [validatePayment, { data, isLoading, isError }] =
    useValidatePaymentMutation();

  useEffect(() => {
    const handleValidatePayment = async (paymentOrderId: string) => {
      await nubaApis.createPaymentMethod.handleValidatePayment(
        paymentOrderId,
        validatePayment
      );
    };
    if (orderId) {
      handleValidatePayment(orderId);
    }
  }, [orderId]);

  return (
    <div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center flex-col text-center gap-5 mt-10 mb-[153px] animate-pulse ">
          <div className="w-[100px] h-10 animate-pulse "> </div>
          <button className="w-[300px] h-10 rounded-md animate-pulse "></button>
        </div>
      ) : isError ? (
        <div className="w-full flex items-center justify-center flex-col text-center gap-5 mt-10 mb-[153px] ">
          <ErrorLogo />
          <p className="text-[24px] font-[500] text-[#FF3D00] ">
            An error occurred while processing your payment
          </p>
          <p className="font-[500] text-[12px] md:text-[16px] text-center w-full md:w-[70%] lg:w-[50%] ">
            Please try again later or contact support if the issue persists.
          </p>
          {/* <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1 underline"
          >
            Retry Payment <ArrowRightIcon />
          </button> */}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center flex-col text-center gap-5 mt-10 mb-[153px] ">
          {data?.data?.token !== "" ? (
            <Image src={check} alt="success" />
          ) : (
            <ErrorLogo />
          )}

          <p
            className={cn(
              "text-[24px] font-[500]  ",
              data?.data?.token !== "" ? "text-[#46642D]" : "text-[#FF3D00] "
            )}
          >
            {data?.data?.token !== ""
              ? "Your payment has been submitted"
              : " Your payment could not be processed"}
          </p>
          <p className="font-[500] text-[12px] md:text-[16px] text-center w-full md:w-[70%] lg:w-[50%] ">
            {data?.data?.token !== ""
              ? "  Kindly note that payment processing may take between 24 and 48 hours."
              : "  We couldn’t complete your rent payment. This may be due to an issue with your payment method."}
          </p>
          {data?.data?.token !== "" ? (
            <button
              onClick={() => router.push("/transactions/1")}
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
      )}
    </div>
  );
};

export default PaymentResponse;
