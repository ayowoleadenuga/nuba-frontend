"use client";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import {
  useLoginMutation,
  useResendOTPMutation,
} from "@/redux/features/authApiSlice";
import { nubaApis } from "@/services/api-services";
import { FormLoginValue, loginPayload } from "@/types";
import { loginFormSchema } from "@/utils/validator";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/redux/store";

const LoginClient = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation();
  const [resendOTP, { isLoading: ResendOTPLoading }] = useResendOTPMutation();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState<{
    [key in keyof FormLoginValue]?: string;
  }>({});

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
    setErrors(prevErrors => ({
      ...prevErrors,
      [event.target.name]: "",
    }));
  };

  const handleResendOTP = async () => {
    const payload = { email: loginDetails.email };
    await nubaApis.auth.handleResendOTP(payload, resendOTP);
  };

  const successRoute = () => router.push(redirectTo);
  const errorRoute = () => router.push("/sign-up");
  const onSubmit = async (formData: loginPayload) => {
    await nubaApis.auth.handleLogin(
      formData,
      loginUser,
      dispatch,
      successRoute,
      errorRoute,
      handleResendOTP
    );
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginFormSchema.safeParse(loginDetails);

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
    await onSubmit({
      email: loginDetails.email.toLowerCase(),
      password: loginDetails.password,
    });

    setErrors({});
  };

  // const user = useSelector((state: RootState) => state.signup.user);
  // const userAll = useSelector((state: RootState) => state.signup);

  return (
    <div className="w-full flex items-center justify-center h-full flex-col">
      <p className="text-[24px] md:text-[30px] lg:text-[48px] font-[700] text-center mb-10 ">
        Welcome Back
      </p>

      <form onSubmit={handleSubmit}>
        <NubaInput
          containerClass={"w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] "}
          inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
          label="Email Address"
          placeholder="joeelon@email.com"
          name="email"
          type="email"
          value={loginDetails.email}
          onChange={handleOnchange}
        />
        {errors.email && (
          <p className="text-red-500 text-[12px]">{errors.email}</p>
        )}
        <NubaInput
          containerClass={
            "w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7 "
          }
          inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
          label="Password"
          placeholder="*****"
          type="password"
          name="password"
          value={loginDetails.password}
          onChange={handleOnchange}
        />
        {errors.password && (
          <p className="text-red-500 text-[12px]">{errors.password}</p>
        )}
        <Button
          disabled={isLoading}
          type="submit"
          className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[570px] mt-7"
        >
          {isLoading ? "Logging in" : "Continue"}
        </Button>
        <p className="font-[700] text-[12px] text-center mt-5 ">
          By continuing, you agree to our Terms & Conditions.{" "}
        </p>
        <span className="mt-3 text-[14px] flex items-center justify-center gap-1 ">
          <p className=" ">No Account?</p>
          <button
            onClick={() => router.push("/sign-up")}
            type="button"
            className="font-[700] text-brandCore-orange "
          >
            Create One
          </button>
        </span>
      </form>
    </div>
  );
};

export default LoginClient;
