"use client";

import React from "react";
import { DropdownIcon } from "@/assets/svg/dropdown-icon";
import NotificationIcon from "@/assets/svg/notification-icon";

const UserInfoSkeleton = () => {
  return (
    <div className="flex items-center gap-2 animate-pulse">
      {/* Notification icon placeholder */}
      <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
        <NotificationIcon />
      </div>

      {/* Points icon + text */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        <div className="w-12 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Avatar */}
      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>

      {/* Name */}
      <div className="w-20 h-4 bg-gray-300 rounded"></div>

      {/* Dropdown icon */}
      <div className="w-5 h-5 bg-gray-300 rounded flex items-center justify-center">
        <DropdownIcon />
      </div>
    </div>
  );
};

export default UserInfoSkeleton;
