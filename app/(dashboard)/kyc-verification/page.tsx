"use client";
import { Checkk } from "@/assets/svg/checkk";
import { Note } from "@/assets/svg/note";
import { Button } from "@/components/ui/button";
import {
  useKycVerificationMutation,
  useLazyValidateKYCQuery,
} from "@/redux/features/kycApiSlice";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import { nubaApis } from "@/services/api-services";
import React, { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { SuccessIcon } from "@/assets/svg/success-icon";
import { useSearchParams } from "next/navigation";
import { ErrorLogo } from "@/assets/svg/error-logo";

const kycVerification = () => {
  const [
    kycVerification,
    {
      isLoading: verificationLoading,
      isSuccess,
      data: kycVerificationResponse,
    },
  ] = useKycVerificationMutation();

  const {
    data: userProfileDetails,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
    refetch: refetchUserProfile,
  } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  useEffect(() => {
    refetchUserProfile();
  }, []);

  const searchParams = useSearchParams();
  const verificationId = searchParams.get("verificationStatus");

  const [
    triggerValidateKYC,
    { data: kycResponse, isLoading: kycResponseLoading },
  ] = useLazyValidateKYCQuery();

  useEffect(() => {
    const handleValidateKYCStatus = async (kycId: string) => {
      await nubaApis.kyc.handleValidateKYCStatus(
        kycVerificationResponse?.data?.session_id ?? "",
        triggerValidateKYC
      );
    };

    if (
      verificationId === "complete" &&
      kycVerificationResponse?.data?.session_id
    ) {
      handleValidateKYCStatus(kycVerificationResponse?.data?.session_id);
    }
  }, [verificationId]);

  const handleVerifyUser = async () => {
    try {
      const response = await nubaApis.kyc.handleVerify(kycVerification);
      console.log("kyc res", response);
      if (response?.data?.sessionUrl) {
        window.location.href = response.data.sessionUrl;
      }
    } catch (error) {
      console.error("KYC verification failed:", error);
    }
  };
  const router = useRouter();
  const [showFailedModal, setShowFailedModal] = useState(false);
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center text-[#0B2233] ">
      <Note />

      <p className="font-[600] text-[18px] md:text-[28px] text-center w-[90%] md:w-[60%] ">
        Just a quick ID check!
        <br /> We verify your identity to protect your payments and meet UK
        regulations.
        <br />
      </p>
      <div className=" mt-6">
        <div className="flex items-center gap-3 mt-2">
          <Checkk />
          <p className="text-[20px] font-[500] ">Protect your payment.</p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <Checkk />
          <p className="text-[20px] font-[500] ">
            Ensure regulatory compliance.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Checkk />
          <p className="text-[20px] font-[500] "> Takes less than 2 minutes.</p>
        </div>
      </div>
      <Button
        onClick={handleVerifyUser}
        disabled={
          verificationLoading ||
          isUserProfileLoading ||
          isUserProfileError ||
          userProfile?.isKycVerified ||
          kycResponseLoading
        }
        className="uppercase mt-10 "
      >
        {" "}
        {verificationLoading ? "Verifying..." : "Start kyc process"}
      </Button>
      {(userProfile?.isKycVerified ||
        kycResponse?.data?.status === "verified") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl text-center w-[90%] max-w-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Verification Successful!
            </h2>
            <div className="flex items-center justify-center w-full mb-4">
              <SuccessIcon />
            </div>
            <p className="mb-6">
              Your identity has been verified. You can now access your
              dashboard.
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}
      {(kycResponse?.data?.status === "not-verified" || showFailedModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl text-center w-[90%] max-w-md shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowFailedModal(false)}
            >
              <p className="w-5 h-5 font-[700] ">X</p>
            </button>

            <h2 className="text-2xl font-semibold mb-4">
              Verification Failed!
            </h2>
            <div className="flex items-center justify-center w-full mb-4">
              <ErrorLogo />
            </div>
            <p className="mb-6">Your identity verification failed.</p>
            <Button
              disabled={
                verificationLoading ||
                isUserProfileLoading ||
                isUserProfileError ||
                userProfile?.isKycVerified ||
                kycResponseLoading
              }
              onClick={handleVerifyUser}
              className="w-full"
            >
              Retry
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default kycVerification;
