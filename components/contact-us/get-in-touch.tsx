"use client";
import { IconDelete } from "@/assets/svg/icon-delete";
import UploadIcon from "@/assets/svg/upload-icon";
import NubaInput from "@/components/ui/nuba-input";
import { useSubmitContactUsMessageMutation } from "@/redux/features/contactApiSlice";
import { resetContactUsForm, setField } from "@/redux/features/contactSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { nubaApis } from "@/services/api-services";
import { ContactState } from "@/types";
import { cn } from "@/utils";
import { contactFormSchema } from "@/utils/validator";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GetInTouch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fullName, phoneNumber, email, message, selectedFile } = useSelector(
    (state: RootState) => state.contact
  );
  const form = useRef<HTMLFormElement | null>(null);

  const [errors, setErrors] = React.useState<{
    [key in keyof ContactState]?: string;
  }>({});

  const handleChange = (
    field: keyof RootState["contact"],
    value: string | File | null
  ) => {
    dispatch(setField({ field, value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(setField({ field: "selectedFile", value: file }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectedFile: "",
      }));
    }
  };

  const [submitContactUsMessageMutation, { isLoading: isContactUsReqPending }] =
    useSubmitContactUsMessageMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactFormSchema.safeParse({
      fullName,
      phoneNumber: phoneNumber.toString(),
      email,
      message,
    });

    const errorMessages: { [key: string]: string } = {};

    if (!result.success) {
      result.error.errors.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
    }

    // if (!selectedFile) {
    //   errorMessages.selectedFile = "File is required!";
    // }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    setErrors({});
    await nubaApis.submitContactUsMessage.handleSubmitContactUsMessage(
      {
        name: fullName,
        email: email,
        subject: message,
        message: message,
      },
      submitContactUsMessageMutation
    );

    dispatch(resetContactUsForm());
  };

  return (
    <div className="bg-white text-black p-6 md:p-[60px] lg:p-[120px] flex flex-col md:flex-row items-start justify-between h-fit gap-10 ">
      <div className="w-fullmd:w-[50%] ">
        <p className="text-[40px] lg:text-[53px] font-[700] ">Get in touch</p>
        <p className="text-[20px] font-[700] ">
          You can reach out to us anytime.
        </p>
      </div>
      <form ref={form} onSubmit={handleSubmit} className="w-full md:w-[50%] ">
        <NubaInput
          containerClass={"w-full"}
          label=""
          placeholder="Full Name"
          name="user_name"
          value={fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        {errors.fullName && (
          <p className="text-red-500 text-[12px]">{errors.fullName}</p>
        )}
        <NubaInput
          containerClass={"w-full mt-10"}
          label=""
          placeholder="Phone Number"
          name="user_phone"
          inputMode="numeric"
          pattern="[0-9]*"
          value={phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-[12px]">{errors.phoneNumber}</p>
        )}
        <NubaInput
          containerClass={"w-full mt-10"}
          label=""
          placeholder="Email address"
          name="user_email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-[12px]">{errors.email}</p>
        )}
        <NubaInput
          containerClass={"w-full mt-10"}
          label=""
          placeholder="Message"
          name="message"
          value={message}
          onChange={(e) => handleChange("message", e.target.value)}
        />
        {errors.message && (
          <p className="text-red-500 text-[12px]">{errors.message}</p>
        )}
        <label>
          <input
            id="FileInput"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <div
            onClick={(e) => {
              e.preventDefault();
              const fileInput = document.getElementById(
                "FileInput"
              ) as HTMLInputElement;
              fileInput?.click();
            }}
            className=" mt-10 cursor-pointer w-full py-10 text-[12px] border-[2px] border-dashed border-black"
          >
            {!selectedFile && (
              <div className="flex items-center justify-center gap-2 ">
                <UploadIcon />
                <p className="font-[700]">Upload Additional file</p>
              </div>
            )}
            {selectedFile && (
              <div className="mt-4 text-center flex items-center justify-center gap-2 w-full">
                <div>
                  {selectedFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-[100px] h-[100px] object-cover mx-auto rounded-md"
                    />
                  ) : (
                    <p className="text-[12px] font-[500]">
                      {selectedFile.name}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setField({ field: "selectedFile", value: null }));
                  }}
                >
                  <IconDelete fill="red" />
                </button>
              </div>
            )}
          </div>
        </label>
        <p className="text-[10px] font-[500] mt-1 ">
          Attach file. File size of your documents should not exceed 10MB
        </p>
        {errors.selectedFile && (
          <p className="text-red-500 text-[12px]">{errors.selectedFile}</p>
        )}
        <button
          disabled={isContactUsReqPending}
          type="submit"
          className={cn(
            isContactUsReqPending ? "bg-gray-300" : "bg-black",
            "w-full text-white h-[54px] mt-[50px] rounded-[4px] text-[14px] font-[700] "
          )}
        >
          {isContactUsReqPending ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
};

export default GetInTouch;
