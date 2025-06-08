"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  SignUpStep,
  updateFormData,
  resetSignup,
} from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { CreateAccountState, sigUpPayload } from "@/types";
import { signUpFormSchema } from "@/utils/validator";
import { GoogleIcon } from "@/assets/svg/google-icon";
import {
  useGetGoogleLoginUrlQuery,
  useLazyGetGoogleLoginUrlQuery,
  useRegisterUserMutation,
} from "@/redux/features/authApiSlice";
import { nubaApis } from "@/services/api-services";
import { toast } from "sonner";

const CreateAccountForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.signup.formData);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [errors, setErrors] = React.useState<{
    [key in keyof CreateAccountState]?: string;
  }>({});

  const user = useSelector((state: RootState) => state.signup.user);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const onSubmit = async (formData: sigUpPayload) => {
    await nubaApis.auth.handleRegister(formData, registerUser, dispatch);
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = signUpFormSchema.safeParse({
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      phoneNumber: formData?.phoneNumber.toString(),
      dateOfBirth: selectedDate,
      email: formData?.email,
      homeAddress: formData?.homeAddress,
      city: formData?.city,
      postCode: formData?.postCode,
      password: formData?.password,
      confirmPassword: formData?.confirmPassword,
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
    const payload: sigUpPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phoneNumber,
      address1: formData.homeAddress,
      address2: formData.homeAddress2,
      city: formData.city,
      postcode: formData.postCode,
      dateOfBirth: selectedDate?.toISOString() || "",
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };

    await onSubmit(payload);
    // dispatch(resetSignup());
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [triggerGoogleLoginUrl] = useLazyGetGoogleLoginUrlQuery();

  const handleGoogleLogin = async () => {
    await nubaApis.getGoogleLoginUrl.handleGetGoogleLoginUrl(
      triggerGoogleLoginUrl
    );
  };

  return (
    <form onSubmit={handleContinue} className="h-full">
      <p className="text-[24px] md:text-[30px] lg:text-[48px] font-[700] text-center mb-10 ">
        Create Account
      </p>
      <NubaInput
        containerClass={"w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="First Name"
        name="firstName"
        value={formData?.firstName}
        onChange={handleChange}
      />
      {errors.firstName && (
        <p className="text-red-500 text-[12px]">{errors.firstName}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Last Name"
        name="lastName"
        value={formData?.lastName}
        onChange={handleChange}
      />
      {errors.lastName && (
        <p className="text-red-500 text-[12px]">{errors.lastName}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0 cursor-pointer"
        label="Date of Birth"
        readOnly
        dropdownIcon
        setSelectedDate={setSelectedDate}
        name="dateOfBirth"
        onChange={() => {
          setErrors({ dateOfBirth: "" });
        }}
        value={selectedDate ? selectedDate.toLocaleDateString() : ""}
      />
      {errors.dateOfBirth && (
        <p className="text-red-500 text-[12px]">{errors.dateOfBirth}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleChange}
      />
      {errors.email && (
        <p className="text-red-500 text-[12px]">{errors.email}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        value={formData?.phoneNumber}
        onChange={handleChange}
      />
      {errors.phoneNumber && (
        <p className="text-red-500 text-[12px]">{errors.phoneNumber}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Home Address"
        name="homeAddress"
        value={formData?.homeAddress}
        onChange={handleChange}
      />
      {errors.homeAddress && (
        <p className="text-red-500 text-[12px]">{errors.homeAddress}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Home Addres II"
        name="homeAddress2"
        value={formData?.homeAddress2}
        onChange={handleChange}
      />
      {errors.homeAddress2 && (
        <p className="text-red-500 text-[12px]">{errors.homeAddress2}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="City"
        name="city"
        value={formData?.city}
        onChange={handleChange}
      />
      {errors.city && <p className="text-red-500 text-[12px]">{errors.city}</p>}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Post Code"
        name="postCode"
        value={formData?.postCode}
        onChange={handleChange}
      />
      {errors.postCode && (
        <p className="text-red-500 text-[12px]">{errors.postCode}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Password"
        type="password"
        name="password"
        value={formData?.password}
        onChange={handleChange}
      />
      {errors.password && (
        <p className="text-red-500 text-[12px]">{errors.password}</p>
      )}
      <NubaInput
        containerClass={
          "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
        }
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData?.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-[12px]">{errors.confirmPassword}</p>
      )}
      <Button disabled={isLoading} type="submit" className="w-full mt-7">
        {isLoading ? "Creating account..." : "Continue"}
      </Button>
      <p className="font-[700] text-[12px] text-center mt-5 ">
        By continuing, you agree to our Terms & Conditions.{" "}
      </p>
      <p className="text-[#004790] text-[14px] font-[700] text-center ">OR</p>
      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full mt-2 text-[#004790] text-[14px] font-[700] bg-[#e5ecf3] "
      >
        <GoogleIcon />
        Sign Up with Google
      </Button>
    </form>
  );
};
export default CreateAccountForm;
