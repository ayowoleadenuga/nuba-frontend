import RyftPayment from "@/components/dashboard/payment/ryft-payment";
import { Loader } from "@/components/ui/loader";
import { env } from "@/env";
import { updateUserOnboardingStatus } from "@/redux/features/authSlice";
import { useInitiatePaymentQuery } from "@/redux/features/paymentsApiSlice";
import { nubaApis } from "@/services/api-services";
import RyftPaymentForm from "@/services/ryft/ryft-payment-form";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RyftPaymentComponent } from "ryft-react";
import { toast } from "sonner";

const NewPaymentMethodRyft = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    data: clientSecretData,
    isLoading,
    isSuccess,
    refetch,
    isError,
  } = useInitiatePaymentQuery();

  useEffect(() => {
    const handleMakePayment = async () => {
      await nubaApis.createPaymentMethod.handleInitiatePay(refetch);
      console.log("clent secret data is", clientSecretData);
      if (isSuccess) {
        console.log("clent secret data is", clientSecretData);
        // window.location.href === data?.data?.authorizationUrl;
        // dispatch(setMakePayment("complete"));
      }
    };
    handleMakePayment();
  }, []);

  const handleSuccess = () => {
    toast.success("New Payment Method Created");
    dispatch(
      updateUserOnboardingStatus({
        isOnboarded: clientSecretData?.message === "success",
      })
    );
    router.push("/dashboard");
  };

  const handleFailed = () => {
    toast.error("Payment Method Creation Failed");
    dispatch(
      updateUserOnboardingStatus({
        isOnboarded: clientSecretData?.message === "success",
      })
    );
  };
  return (
    <div>
      {isSuccess && (
        <div className="bg-white p-6 rounded-xl text-center w-full max-w-md  relative">
          <p className="text-[24px] md:text-[28px] font-[600] text-center mb-10 ">
            New Payment Method
          </p>
          <RyftPaymentComponent
            publicKey={env.NEXT_PUBLIC_RYFT_PUBLIC_KEY}
            clientSecret={clientSecretData?.data?.token as string}
            buttonText="Save Card"
            onPaymentSuccess={handleSuccess}
            onPaymentError={handleFailed}
            googlePay={{
              merchantIdentifier: "your_merchant_id",
              merchantName: "Your Business",
              merchantCountryCode: "US",
            }}
            applePay={{
              merchantName: "Your Business Name",
              merchantCountryCode: "US",
            }}
            fieldCollection={{
              billingAddress: {
                display: "minimum", // "full", "minimum", or "none"
              },
            }}
          />
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center w-full h-[calc(100vh-100px)]  ">
          <Loader />
        </div>
      )}
      {isError && (
        <div className="bg-white p-6 rounded-xl text-center w-full max-w-md  relative">
          <p className="text-[24px] md:text-[28px] text-red-500 font-[600] text-center mb-10 ">
            Error generating client secret
          </p>
        </div>
      )}
    </div>
  );
};

export default NewPaymentMethodRyft;
