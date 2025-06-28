"use client";
import RyftPayment from "@/components/dashboard/payment/ryft-payment"; // Using your wrapper
import { Loader } from "@/components/ui/loader";
import { env } from "@/env";
import { useInitiatePaymentQuery } from "@/redux/features/paymentsApiSlice";
import { nubaApis } from "@/services/api-services";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Ryft = () => {
  const router = useRouter();

  const {
    data: clientSecretData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useInitiatePaymentQuery();

  const clientSecret = clientSecretData?.data?.token;

  useEffect(() => {
    const handleInitiatePayment = async () => {
      await nubaApis.createPaymentMethod.handleInitiatePay(refetch);
    };
    handleInitiatePayment();
  }, [refetch]);

  const handleSuccess = () => {
    toast.success("New Payment Method Created");
    router.push("/payment?ryft=new-card-added");
  };

  const handleFailed = () => {
    toast.error("Payment Method Creation Failed");
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-[calc(100vh-100px)]">
          <Loader />
        </div>
      )}

      {isError && (
        <div className="bg-white p-6 rounded-xl text-center w-full max-w-md">
          <p className="text-[24px] md:text-[28px] text-red-500 font-[600]">
            Error generating client secret
          </p>
        </div>
      )}

      {clientSecret && (
        <div className="bg-white p-6 rounded-xl text-center w-full max-w-md">
          <p className="text-[24px] md:text-[28px] font-[600] mb-10">
            Add Payment Method
          </p>
          <RyftPayment
            addPayment={true}
            clientSecret={clientSecret}
            buttonText="Save Card"
          />
        </div>
      )}
    </div>
  );
};

export default Ryft;
