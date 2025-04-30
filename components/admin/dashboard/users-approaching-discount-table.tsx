"use client";
import React, { useState } from "react";
import { OptionsIcon } from "@/assets/svg/options-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DiscountUser, dummyDiscountUsers } from "./constants";

const UserApproachingDiscountTable = () => {
  const [sortBy, setSortBy] = useState<keyof DiscountUser | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const getStatusColor = (status: DiscountUser["status"]) => {
    return status === "Activated" ? "bg-green-500" : "bg-orange-500";
  };
  const handleSort = (field: keyof DiscountUser) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...dummyDiscountUsers].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
  return (
    <div className="overflow-x-auto mt-6 px-2">
      <table className="w-[95%] text-sm text-left">
        <thead className="w-full">
          <tr className=" font-[600] text-[12px] w-full ">
            <th
              onClick={() => handleSort("user")}
              className="cursor-pointer w-[20%]"
            >
              User {sortBy === "user" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th className=" w-[20%]">Milestone</th>
            <th className=" w-[25%]">Status</th>
            <th className=" w-[15%]">Rent Amount</th>
            <th className=" w-[15%]">After Discount</th>
            <th className="w-[5%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user, idx) => (
            <tr key={idx} className="h-12">
              <td>{user.user}</td>
              <td>{user.milestone}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span
                    className={`${getStatusColor(
                      user.status
                    )} w-2 h-2 rounded-full`}
                  />
                  <span
                    className={
                      user.status === "Activated"
                        ? "text-green-600"
                        : "text-orange-600"
                    }
                  >
                    {user.status}
                  </span>
                </div>
              </td>
              <td>${user.rentAmount.toFixed(2)}</td>
              <td>${user.afterDiscount.toFixed(2)}</td>
              <td>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <OptionsIcon />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white border rounded-md shadow-lg text-sm"
                  >
                    <DropdownMenuLabel className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                      View
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="px-4 py-1 hover:bg-gray-100 cursor-pointer text-red-500">
                      Delete
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserApproachingDiscountTable;
