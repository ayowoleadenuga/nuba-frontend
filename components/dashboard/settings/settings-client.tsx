"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { PointIcon } from "@/assets/svg/point-icon";
import { IconButton } from "@mui/material";
import DetailsTab from "./details-tab";
import AccountTab from "./account-tab";
import SecurityTab from "./security-tab";
import { Button } from "@/components/ui/button";
import { Check } from "@/assets/svg/check";
import { CancelIcon } from "@/assets/svg/cancel-icon";
import { changePasswordSettingsSchema } from "@/utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SettingsState } from "@/types";
import { resetSettingsForm } from "@/redux/features/settings-slice";

const SettingsClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const allTabs = ["Details", "Account", "Security"];
  const currentTab = searchParams.get("tab") || "Details";
  const [rentDueDate, setRentDueDate] = useState<Date | null>(null);
  const { oldPassword, newPassword } = useSelector(
    (state: RootState) => state.settings
  );

  const formRef = useRef(null);
  const handleTabClick = (tab: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("tab", tab);
    router.replace(`?${params.toString()}`);
  };
  const [errors, setErrors] = useState<{
    [key in keyof SettingsState]?: string;
  }>({});

  const showTab = (tab: string) => {
    switch (tab) {
      case "Details":
        return <DetailsTab />;
      case "Account":
        return (
          <AccountTab
            rentDueDate={rentDueDate}
            setRentDueDate={setRentDueDate}
          />
        );
      case "Security":
        return <SecurityTab errors={errors} />;
      default:
        return <DetailsTab />;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTab === "Security") {
      const result = changePasswordSettingsSchema.safeParse({
        oldPassword,
        newPassword,
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
      dispatch(resetSettingsForm());
    }
  };
  return (
    <div className="w-full p-5">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between">
        <p className="text-[20px] font-[600]">Settings</p>
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center">
              <PointIcon />
              <p className="font-[700] text-[#CF931D]">30,256 pts</p>
            </div>
            <p className="text-[11px] text-[#999B9E]">Member since ‘25</p>
          </div>
          <IconButton>
            <OptionsIcon />
          </IconButton>
        </div>
      </div>

      <div className="mt-10 border-b border-b-[#D9D9D9]">
        <div className="w-fit flex items-center ">
          {allTabs.map(tab => {
            const isActive = currentTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`pb-3 w-fit px-5 md:px-0 md:min-w-[150px]  border-b-[3px]  border-b-[#cbd5e1] ${
                  isActive
                    ? "text-black border-b-[3px] border-b-black"
                    : "text-[#999B9E] "
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white w-full p-4 md:p-8"
      >
        {showTab(currentTab)}
        <div className="flex justify-end w-full gap-5 ">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-[12px] font-[600] px-4 text-brandCore-orange border border-border rounded-[6px] flex items-center gap-2 "
          >
            Cancel <CancelIcon />
          </button>
          <Button
            type="submit"
            className="text-[12px] font-[600] flex items-center gap-2 "
          >
            Save Settings <Check />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsClient;
