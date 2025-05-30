"use client";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { PointsIcon } from "@/assets/svg/points-icon";
import SupportFaqs from "@/components/dashboard/support/support-faqs";
import { Button } from "@/components/ui/button";
import { IconButton } from "@mui/material";
import React, { useRef } from "react";
import NubaInput from "@/components/ui/nuba-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setField } from "@/redux/features/support-center-slice";
import { SupportCenterState } from "@/types";
import { supportClientFormSchema } from "@/utils/validator";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import PointsDateJoinSkeleton from "../skeletons/points-date-join-skeleton";

const SupportClient = () => {
  const { data: userProfileDetails, isLoading: isProfileDetailsLoading } =
    useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const joinedYear = React.useMemo(() => {
    if (!userProfile?.joinedAt) return "";
    const date = new Date(userProfile.joinedAt);
    return `${date.getFullYear().toString().slice(-2)}`;
  }, [userProfile?.joinedAt]);

  const { issue, email, fullName } = useSelector(
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = supportClientFormSchema.safeParse({
      fullName,
      email,
      issue,
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
  };

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
          {/* <IconButton>
            <OptionsIcon />
          </IconButton> */}
        </div>
      </div>
      <div className="w-full md:w-[70%] xl:w-[50%] ">
        <div className="w-full flex items-center justify-between mt-10 gap-2">
          <input
            className="w-[80%] h-[44px] px-4 border border-border rounded-[10px] outline-none text-[14px] "
            placeholder="Search Frequently Asked Questions"
          />
          <Button className="w-[20%] ">Search</Button>
        </div>
      </div>
      <SupportFaqs />
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
              name="full_name"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500 text-[12px]">{errors.fullName}</p>
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
              label="Describe your issue"
              placeholder=""
              name="message"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] h-[119px] "
              value={issue}
              onChange={(e) => handleChange("issue", e.target.value)}
            />
            {errors.issue && (
              <p className="text-red-500 text-[12px]">{errors.issue}</p>
            )}
          </div>
          <div className="w-full flex items-center justify-center mt-4">
            <Button
              // disabled={pending}
              type="submit"
              // className={cn(
              //   pending ? "bg-gray-300" : "bg-black",
              //   "w-full text-white h-[54px] mt-[50px] rounded-[4px] text-[14px] font-[700] "
              // )}
            >
              Submit
              {/* {pending ? "SUBMITTING..." : "SUBMIT"} */}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportClient;
