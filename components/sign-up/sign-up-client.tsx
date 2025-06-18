"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import CreateAccountForm from "@/components/sign-up/create-account-form";
import OtpForm from "@/components/sign-up/otp-form";
import { RootState } from "@/redux/store";
import { nextStep, prevStep, SignUpStep } from "@/redux/features/authSlice";
import TenancyDetailsForm from "@/components/sign-up/tenancy-details-form";
import TenancyAgreementUpload from "@/components/sign-up/tenancy-agreement-upload";
import AgentDetailsForm from "@/components/sign-up/agent-details";
import NewPaymentForm from "@/components/sign-up/new-payment-method";
import { Button } from "@/components/ui/button";
import NewPaymentMethodRyft from "@/components/sign-up/new-payment-method-ryft";

const SignUpClient = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.signup.currentStep
  );

  const renderStep = () => {
    switch (currentStep) {
      case SignUpStep.CREATE_ACCOUNT:
        return <CreateAccountForm />;
      case SignUpStep.OTP:
        return <OtpForm />;
      case SignUpStep.TENANCY_DETAILS:
        return <TenancyDetailsForm />;
      case SignUpStep.TENANCY_AGREEMENT:
        return <TenancyAgreementUpload />;
      case SignUpStep.AGENT_DETAILS:
        return <AgentDetailsForm />;
      case SignUpStep.NEW_PAYMENT_METHOD:
        return <NewPaymentMethodRyft />;
      default:
        return <CreateAccountForm />;
    }
  };

  return (
    <div className="h-full pb-10">
      <div className="overflow-y-auto h-[calc(100%-548px)] flex items-center justify-center">
        {renderStep()}
      </div>
      {/* <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => dispatch(prevStep())}
          disabled={currentStep === SignUpStep.CREATE_ACCOUNT}
        >
          Previous
        </button>
        <Button
          className=""
          onClick={() => dispatch(nextStep())}
          disabled={currentStep === SignUpStep.NEW_PAYMENT_METHOD}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default SignUpClient;
