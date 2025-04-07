"use client";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import { FormLoginValue } from "@/types";
import { loginFormSchema } from "@/utils/validator";
import React, { useState } from "react";

const LoginClient = () => {
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    setErrors({});
  };
  return (
    <div className="w-full flex items-center justify-center h-full flex-col">
      <p className="text-[48px] font-[700] text-center mb-10 ">Welcome Back</p>

      <form onSubmit={handleSubmit}>
        <NubaInput
          containerClass={"w-[570px] "}
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
          containerClass={"w-[570px] mt-7 "}
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
        <Button className="w-full mt-7">Continue</Button>
        <p className="font-[700] text-[12px] text-center mt-5 ">
          By continuing, you agree to our Terms & Conditions.{" "}
        </p>
      </form>
    </div>
  );
};

export default LoginClient;
