"use client";

import { PointsIcon } from "@/assets/svg/points-icon";
import SupportFaqs from "@/components/dashboard/support/support-faqs";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import NubaInput from "@/components/ui/nuba-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  resetSupportForm,
  setField,
} from "@/redux/features/support-center-slice";
import { SupportCenterState } from "@/types";
import { supportClientFormSchema } from "@/utils/validator";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import PointsDateJoinSkeleton from "../skeletons/points-date-join-skeleton";
import { nubaApis } from "@/services/api-services";
import { useCreateSupportTicketMutation } from "@/redux/features/supportApiSlice";
import { supportFaqs } from "./constants";
import Search from "@/assets/svg/Search";

const SupportClient = () => {
  const [faqQuestions, setFaqQuestions] = useState(supportFaqs);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: userProfileDetails, isLoading: isProfileDetailsLoading } =
    useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const joinedYear = React.useMemo(() => {
    if (!userProfile?.joinedAt) return "";
    const date = new Date(userProfile.joinedAt);
    return `${date.getFullYear().toString().slice(-2)}`;
  }, [userProfile?.joinedAt]);

  const { message, email, name, subject } = useSelector(
    (state: RootState) => state.supportCenter
  );

  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState<{
    [key in keyof SupportCenterState]?: string;
  }>({});

  const form = useRef<HTMLFormElement | null>(null);

  const handleChange = (
    field: keyof RootState["supportCenter"],
    value: string
  ) => {
    dispatch(setField({ field, value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const [createSupportTicketMutation, { isLoading: supportRequestPending }] =
    useCreateSupportTicketMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = supportClientFormSchema.safeParse({
      name,
      email,
      message,
      subject,
    });

    const errorMessages: { [key: string]: string } = {};

    if (!result.success) {
      result.error.errors.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    setErrors({});

    await nubaApis.createSupportTicket.handleCreateSupportTicket(
      {
        subject,
        message,
        name,
        email,
      },
      createSupportTicketMutation
    );
    dispatch(resetSupportForm());
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFaqQuestions(supportFaqs);
    } else {
      const filtered = supportFaqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFaqQuestions(filtered);
    }
  }, [searchTerm, supportFaqs]);

  return (
    <div className="w-full p-5">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between ">
        <p className="text-[20px] font-[600] ">Support Center</p>
        <div className="flex items-center gap-4">
          {isProfileDetailsLoading ? (
            <PointsDateJoinSkeleton />
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <PointsIcon />
                <p className="font-[700] text-[#CF931D]">
                  {userProfile?.statistics.unitsEarned} pts
                </p>
              </div>
              <p className="text-[11px] text-[#999B9E]">
                Member since ‘{joinedYear}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-[70%] xl:w-[50%] ">
        <div className="relative w-full flex items-center justify-between mt-10 gap-2">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[80%] h-[44px] pl-9 pr-4 border border-border rounded-[10px] outline-none text-[14px] "
            placeholder="Search Frequently Asked Questions"
          />
          <span className="absolute pl-4">
            <Search />
          </span>
        </div>
      </div>
      <SupportFaqs
        faqQuestions={faqQuestions}
        setFaqQuestions={setFaqQuestions}
      />

      <div className="w-full md:w-[70%] xl:w-[50%] my-10 ">
        <div className="w-full border-b border-b-[#E2E8F0] pb-1 ">
          <p className="font-[600] text-[12px] text-[#2A4152] ">
            Still need help?
          </p>
          <p className="text-[10px] bo ">
            Fill out the form below and our team will get back to you.
          </p>
        </div>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="w-full border-b border-b-[#E2E8F0] pb-6 "
        >
          <div className="w-full md:w-[70%] ">
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Full Name"
              placeholder=""
              name="name"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-[12px]">{errors.name}</p>
            )}

            <NubaInput
              containerClass={"w-full mt-6"}
              label="Email"
              placeholder=""
              name="email"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]  "
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-[12px]">{errors.email}</p>
            )}
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Subject"
              placeholder=""
              name="subject"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px]  "
              value={subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
            {errors.subject && (
              <p className="text-red-500 text-[12px]">{errors.subject}</p>
            )}
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Describe your issue"
              placeholder=""
              name="message"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] h-[119px] "
              value={message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
            {errors.message && (
              <p className="text-red-500 text-[12px]">{errors.message}</p>
            )}
          </div>
          <div className="w-full flex items-center justify-center mt-4">
            <Button type="submit">
              {supportRequestPending ? "SUBMITTING..." : "SUBMIT"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportClient;
