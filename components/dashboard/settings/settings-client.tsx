"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PointIcon } from "@/assets/svg/point-icon";
import DetailsTab from "./details-tab";
import AccountTab from "./account-tab";
import SecurityTab from "./security-tab";
import { Button } from "@/components/ui/button";
import { Check } from "@/assets/svg/check";
import { CancelIcon } from "@/assets/svg/cancel-icon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SettingsErrorState } from "@/types";
import { SettingsSubmitProps, useSettingsSubmit } from "./use-settings-submit";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import PointsDateJoinSkeleton from "../skeletons/points-date-join-skeleton";
import { formatDate4 } from "@/utils";

const SettingsClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allTabs = ["Details", "Account", "Security"];
  const currentTab = searchParams.get("tab") || "Details";
  const [rentDueDate, setRentDueDate] = useState<Date | null>(null);
  const [rentId, setRentId] = useState<string>("");
  const {
    oldPassword,
    newPassword,
    confirmPassword,
    firstName,
    lastName,
    phoneNumber,
  } = useSelector((state: RootState) => state.settings);

  const formRef = useRef(null);
  const handleTabClick = (tab: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("tab", tab);
    router.replace(`?${params.toString()}`);
  };

  const [errors, setErrors] = useState<SettingsErrorState>({});

  const { data: userProfileDetails, isLoading: isProfileDetailsLoading } =
    useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const joinedYear = React.useMemo(() => {
    if (!userProfile?.joinedAt) return "";
    const date = new Date(userProfile.joinedAt);
    return `${date.getFullYear().toString().slice(-2)}`;
  }, [userProfile?.joinedAt]);

  let config: SettingsSubmitProps | undefined;

  if (currentTab === "Security") {
    config = {
      currentTab: "Security",
      oldPassword,
      newPassword,
      confirmPassword,
      setErrors,
    };
  } else if (currentTab === "Details") {
    config = {
      currentTab: "Details",
      firstName,
      lastName,
      phoneNumber,
      setErrors,
    };
  } else if (currentTab === "Account") {
    config = {
      currentTab: "Account",
      rentDueDate: rentDueDate
        ? formatDate4(rentDueDate)
        : new Date().toString(),
      rentId,
      setErrors,
    };
  }

  const { handleSubmit } = config
    ? useSettingsSubmit(config)
    : { handleSubmit: () => {} };

  const showTab = (tab: string) => {
    switch (tab) {
      case "Details":
        return (
          <DetailsTab
            errors={errors}
            onClearError={field => {
              setErrors(prev => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
              });
            }}
            onCancel={() => router.push("/dashboard")}
          />
        );
      case "Account":
        return (
          <AccountTab
            setRentDueDate={setRentDueDate}
            setRentId={setRentId}
            rentDueDate={rentDueDate}
          />
        );
      case "Security":
        return (
          <SecurityTab
            errors={errors}
            onClearError={field => {
              setErrors(prev => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
              });
            }}
          />
        );
      default:
        return (
          <DetailsTab
            errors={errors}
            onClearError={field => {
              setErrors(prev => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
              });
            }}
            onCancel={() => router.push("/dashboard")}
          />
        );
    }
  };

  return (
    <div className="w-full p-5">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between">
        <p className="text-[20px] font-[600]">Settings</p>
        <div className="flex items-center gap-4">
          {isProfileDetailsLoading ? (
            <PointsDateJoinSkeleton />
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <PointIcon />
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

        {currentTab !== "Details" && (
          <div className="flex justify-end w-full gap-5 ">
            <button
              type="button"
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
        )}
      </form>
    </div>
  );
};

export default SettingsClient;
