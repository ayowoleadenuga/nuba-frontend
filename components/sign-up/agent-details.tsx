"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateFormData } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { CreateAccountState } from "@/types";
import { agentDetailsSchema } from "@/utils/validator";

const AgentDetailsForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.signup.formData);
  const [errors, setErrors] = React.useState<{
    [key in keyof CreateAccountState]?: string;
  }>({});
  const [agreement, setAgreement] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = agentDetailsSchema.safeParse({
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
      sortCode: formData.sortCode,
    });

    const errorMessages: { [key: string]: string } = {};

    if (!result.success) {
      result.error.errors.forEach(err => {
        errorMessages[err.path[0]] = err.message;
      });
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    setErrors({});
    console.log("clicked to move to tenancy agreement");
    // dispatch(resetSignup());
    dispatch(nextStep());
  };

  return (
    <form onSubmit={handleContinue} className="h-full ">
      <p className="text-[24px] md:text-[28px] font-[600] text-center mb-10 ">
        Agent/ Landlord Details
      </p>
      <NubaInput
        containerClass={"w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Account Name"
        name="accountName"
        value={formData?.accountName}
        onChange={handleChange}
      />

      {errors.accountName && (
        <p className="text-red-500 text-start text-[12px]">
          {errors.accountName}
        </p>
      )}

      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Account Number"
        name="accountNumber"
        value={formData?.accountNumber}
        onChange={handleChange}
      />
      {errors.accountNumber && (
        <p className="text-red-500 text-[12px]">{errors.accountNumber}</p>
      )}

      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Sort Code"
        name="sortCode"
        value={formData?.sortCode}
        onChange={handleChange}
      />
      {errors.sortCode && (
        <p className="text-red-500 text-[12px]">{errors.sortCode}</p>
      )}

      <Button
        disabled={!agreement}
        type="submit"
        className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7"
      >
        Continue
      </Button>
      <span className="font-[700] text-[12px] text- mt-5 flex items-center gap-2 w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] ">
        <input
          type="checkbox"
          className="w-4 h-4 accent-black "
          checked={agreement}
          onChange={() => setAgreement(!agreement)}
        />
        Please confirm that the information above is correct and that all the
        details match.
      </span>
    </form>
  );
};
export default AgentDetailsForm;
