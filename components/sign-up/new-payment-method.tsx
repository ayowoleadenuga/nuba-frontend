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
import { newPaymentSchema } from "@/utils/validator";
import { useRouter } from "next/navigation";

const NewPaymentForm = () => {
  const router = useRouter();
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
    const result = newPaymentSchema.safeParse({
      cardInfo: formData.cardInfo,
      monthYear: formData.monthYear,
      cvv: formData.cvv,
      newAccountNumber: formData.newAccountNumber,
      newCountry: formData.newCountry,
      postalCode: formData.postalCode,
      address1: formData.address1,
      address2: formData.address2,
      newCity: formData.newCity,
      state: formData.state,
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
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleContinue} className="h-full ">
      <p className="text-[24px] md:text-[28px] font-[600] text-center mb-10 ">
        New Payment Method
      </p>
      <div className="flex w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] items-center justify-between gap-2">
        <NubaInput
          containerClass="w-[160px] md:w-[230px] lg:w-[300px] xl:w-[380px]"
          inputClass="rounded-[8px] bg-[#f2f6f9] border-b-0"
          label="Card Info"
          name="cardInfo"
          value={formData?.cardInfo}
          onChange={handleChange}
        />
        <NubaInput
          containerClass="w-[60px] md:w-[70px] lg:w-[80px] xl:w-[85px]"
          inputClass="rounded-[8px] bg-[#f2f6f9] border-b-0"
          label="MM/YY"
          name="monthYear"
          value={formData?.monthYear}
          onChange={handleChange}
        />
        <NubaInput
          containerClass="w-[60px] md:w-[70px] lg:w-[80px] xl:w-[85px]"
          inputClass="rounded-[8px] bg-[#f2f6f9] border-b-0"
          label="CVV"
          name="cvv"
          type="number"
          pattern="[0-9]*"
          value={formData?.cvv}
          onChange={handleChange}
        />
      </div>

      {errors.cardInfo && (
        <p className="text-red-500 text-[12px]">{errors.cardInfo}</p>
      )}
      {errors.monthYear && (
        <p className="text-red-500 text-[12px]">{errors.monthYear}</p>
      )}
      {errors.cvv && <p className="text-red-500 text-[12px]">{errors.cvv}</p>}
      <p className="font-[500] text-[12px] mt-5 ">
        By authorising your card you consent to your details being stored
        securely for future payments
      </p>
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Account Number"
        name="newAccountNumber"
        value={formData?.newAccountNumber}
        onChange={handleChange}
      />
      {errors.newAccountNumber && (
        <p className="text-red-500 text-[12px]">{errors.newAccountNumber}</p>
      )}

      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0 m"
        label="Country"
        name="newCountry"
        value={formData?.newCountry}
        dropdown
        dropdownItems={["United Kingdom"]}
        onChange={handleChange}
      />

      {errors.newCountry && (
        <p className="text-red-500 text-start text-[12px]">
          {errors.newCountry}
        </p>
      )}
      <NubaInput
        containerClass={"w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7"}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Postal/Zipcode"
        name="postalCode"
        value={formData?.postalCode}
        onChange={handleChange}
      />

      {errors.postalCode && (
        <p className="text-red-500 text-start text-[12px]">
          {errors.postalCode}
        </p>
      )}

      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Adderess Line 1"
        name="address1"
        value={formData?.address1}
        onChange={handleChange}
      />
      {errors.address1 && (
        <p className="text-red-500 text-[12px]">{errors.address1}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Adderess Line 2"
        name="address2"
        value={formData?.address2}
        onChange={handleChange}
      />
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="City"
        name="newCity"
        value={formData?.newCity}
        onChange={handleChange}
      />
      {errors.newCity && (
        <p className="text-red-500 text-[12px]">{errors.newCity}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="State / Province / Region"
        name="state"
        value={formData?.state}
        onChange={handleChange}
      />
      {errors.state && (
        <p className="text-red-500 text-[12px]">{errors.state}</p>
      )}
      <p className="font-[500] text-[12px] mt-5 ">
        Once payment methods are added No charges will be taken.
      </p>
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
export default NewPaymentForm;
