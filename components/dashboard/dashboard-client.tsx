"use client";

import React from "react";
// import { IconButton } from "@mui/material";
import DashboardPage from "@/components/dashboard/dashboard-page";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import PointsDateJoinSkeleton from "./skeletons/points-date-join-skeleton";
import { PointIcon } from "@/assets/svg/point-icon";

const DashboardClient = () => {
  const { data: userProfileDetails, isLoading: isProfileDetailsLoading } =
    useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const joinedYear = React.useMemo(() => {
    if (!userProfile?.joinedAt) return "";
    const date = new Date(userProfile.joinedAt);
    return `${date.getFullYear().toString().slice(-2)}`;
  }, [userProfile?.joinedAt]);

  return (
    <div className="w-full p-5">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between ">
        <p className="text-[20px] font-[600] ">Dashboard</p>
        <div className="flex items-center gap-4 ">
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
      <DashboardPage />
    </div>
  );
};

export default DashboardClient;
