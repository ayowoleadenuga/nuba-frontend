"use client";
import { Checkk } from "@/assets/svg/checkk";
import { Note } from "@/assets/svg/note";
import { Button } from "@/components/ui/button";
import {
  useKycVerificationMutation,
  useLazyValidateKYCQuery,
  useValidateKYCQuery,
} from "@/redux/features/kycApiSlice";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import { nubaApis } from "@/services/api-services";
import React, { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { PendingIcon } from "@/assets/svg/pending-icon";
import { ErrorLogo } from "@/assets/svg/error-logo";
import { kycStatusResponse } from "@/types";

const KycVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationStatus = searchParams.get("verificationStatus");

  const [showFailedModal, setShowFailedModal] = useState(false);

  const {
    data: userProfileDetails,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
    refetch: refetchUserProfile,
  } = useGetUserProfileQuery();

  const userProfile = userProfileDetails?.data;

  const [kycVerification, { isLoading: verificationLoading }] =
    useKycVerificationMutation();

  const [
    triggerValidateKYC,
    {
      data: kycResponse,
      isLoading: kycResponseLoading,
      isError: kycValidationFailed,
    },
  ] = useLazyValidateKYCQuery();

  const handleVerifyUser = async () => {
    try {
      const response = await nubaApis.kyc.handleVerify(kycVerification);
      if (response?.data?.sessionUrl && response?.data?.sessionId) {
        localStorage.setItem("kyc_session_id", response.data.sessionId);
        window.location.href = response.data.sessionUrl;
      }
    } catch (error) {
      console.error("KYC verification failed:", error);
    }
  };

  const handleValidateKYCStatus = async () => {
    const sessionId = localStorage.getItem("kyc_session_id") ?? "";
    if (!sessionId) return;
    const res = await nubaApis.kyc.handleValidateKYCStatus(
      sessionId,
      triggerValidateKYC
    );
    localStorage.removeItem("kyc_session_id");

    // if (res?.data?.status === "created") {
    //   // Show pending modal
    // } else {
    //   setShowFailedModal(true);
    // }
  };
  useEffect(() => {
    const handleValidateKYCStatus2 = async () => {
      const res = await nubaApis.kyc.handleValidateKYCStatus(
        "",
        triggerValidateKYC
      );
    };
    handleValidateKYCStatus2();
  }, []);

  useEffect(() => {
    if (userProfile?.isKycVerified) {
      toast.success("Your KYC has been verified");
      router.push("/dashboard");
    }
  }, [userProfile]);

  useEffect(() => {
    if (kycValidationFailed) {
      setShowFailedModal(true);
    }
  }, [kycValidationFailed]);

  useEffect(() => {
    if (verificationStatus === "complete") {
      handleValidateKYCStatus();
    }
  }, [verificationStatus]);

  const isDisabled =
    verificationLoading ||
    isUserProfileLoading ||
    isUserProfileError ||
    userProfile?.isKycVerified ||
    kycResponseLoading;

  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center text-[#0B2233]">
      <Note />

      <p className="font-[600] text-[18px] md:text-[28px] text-center w-[90%] md:w-[60%]">
        Just a quick ID check!
        <br /> We verify your identity to protect your payments.
      </p>

      <div className="mt-6">
        {[
          "Protect your payment",
          "Ensure regulatory compliance",
          "Takes less than 2 minutes",
        ].map((text, idx) => (
          <div key={idx} className="flex items-center gap-3 mt-2">
            <Checkk />
            <p className="text-[20px] font-[500]">{text}</p>
          </div>
        ))}
      </div>

      <Button
        onClick={handleVerifyUser}
        disabled={isDisabled}
        className="uppercase mt-10"
      >
        {verificationLoading
          ? "Verifying..."
          : kycResponseLoading
          ? "Checking Verification Status"
          : "Start kyc process"}
      </Button>

      {kycResponse?.data?.status === "created" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl text-center w-[90%] max-w-md shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4">
              Verification Pending!
            </h2>
            <div className="mb-4">
              <PendingIcon width={50} height={50} />
            </div>
            <p className="mb-6">
              We are currently processing your verification. We will get back to
              you on the status.
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

      {/* FAILED MODAL */}
      {(kycValidationFailed || showFailedModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl text-center w-[90%] max-w-md shadow-lg relative">
            <button
              onClick={() => setShowFailedModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <p className="w-5 h-5 font-bold">X</p>
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Verification Statuc Check Failed!
            </h2>
            <div className="mb-4">
              <ErrorLogo />
            </div>
            <p className="mb-6">Your identity verification failed.</p>
            <Button
              onClick={handleVerifyUser}
              disabled={isDisabled}
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

export default KycVerification;
