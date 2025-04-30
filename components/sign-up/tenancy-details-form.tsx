"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  SignUpStep,
  updateFormData,
} from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { CreateAccountState } from "@/types";
import { tenancyDetailsSchema } from "@/utils/validator";
import { countries } from "@/components/sign-up/constants";

const TenancyDetailsForm = () => {
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
    const result = tenancyDetailsSchema.safeParse({
      country: formData.country,
      startDate,
      endDate,
      rentFrequency: formData.rentFrequency,
      monthlyRentAmt: formData.monthlyRentAmt,
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
    dispatch(setStep(SignUpStep.TENANCY_AGREEMENT));
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <form onSubmit={handleContinue} className="h-full ">
      <p className="text-[28px] font-[600] text-center mb-10 ">
        Tenancy Details
      </p>
      <NubaInput
        containerClass={"w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Country"
        name="country"
        value={formData?.country}
        dropdown
        dropdownItems={["United Kingdom"]}
        onChange={handleChange}
      />

      {errors.country && (
        <p className="text-red-500 text-start text-[12px]">{errors.country}</p>
      )}

      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0 cursor-pointer"
        label="Start Date"
        readOnly
        dropdownIcon
        setSelectedDate={setStartDate}
        name="startDate"
        onChange={() => {
          setErrors({ startDate: "" });
        }}
        value={startDate ? startDate.toLocaleDateString() : ""}
      />
      {errors.startDate && (
        <p className="text-red-500 text-[12px]">{errors.startDate}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0 cursor-pointer"
        label="End Date"
        readOnly
        dropdownIcon
        setSelectedDate={setEndDate}
        name="endDate"
        onChange={() => {
          setErrors({ endDate: "" });
        }}
        value={endDate ? endDate.toLocaleDateString() : ""}
      />
      {errors.endDate && (
        <p className="text-red-500 text-[12px]">{errors.endDate}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Rent Frequency"
        name="rentFrequency"
        value={formData?.rentFrequency}
        onChange={handleChange}
      />
      {errors.rentFrequency && (
        <p className="text-red-500 text-[12px]">{errors.rentFrequency}</p>
      )}

      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Monthly Rent Amount"
        name="monthlyRentAmt"
        value={formData?.monthlyRentAmt}
        onChange={handleChange}
      />
      {errors.monthlyRentAmt && (
        <p className="text-red-500 text-[12px]">{errors.monthlyRentAmt}</p>
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
        Please confirm that the amount here matches the actual rent amount on
        the tenancy agreement, payment wont go through otherwise
      </span>
    </form>
  );
};
export default TenancyDetailsForm;
