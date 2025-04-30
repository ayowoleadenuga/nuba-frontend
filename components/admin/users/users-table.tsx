"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { dummyUsers, User } from "./constants";
import React, { useState } from "react";
import { OptionsIcon } from "@/assets/svg/options-icon";

type SortKey = keyof User;
type SortDirection = "asc" | "desc";

const UsersTable = () => {
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...dummyUsers].sort((a, b) => {
    if (!sortBy) return 0;

    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  const renderArrow = (key: SortKey) =>
    sortBy === key ? (sortDirection === "asc" ? "↑" : "↓") : "";

  return (
    <div className="overflow-x-auto mt-6 px-2">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="font-semibold text-xs">
          <tr>
            <th
              onClick={() => handleSort("fullName")}
              className="cursor-pointer px-2 py-3"
            >
              Full Name {renderArrow("fullName")}
            </th>
            <th
              onClick={() => handleSort("email")}
              className="cursor-pointer px-2 py-3"
            >
              Email {renderArrow("email")}
            </th>
            <th
              onClick={() => handleSort("phone")}
              className="cursor-pointer px-2 py-3"
            >
              Phone {renderArrow("phone")}
            </th>
            <th
              onClick={() => handleSort("joinedOn")}
              className="cursor-pointer px-2 py-3"
            >
              Joined On {renderArrow("joinedOn")}
            </th>
            <th
              onClick={() => handleSort("rentPaid")}
              className="cursor-pointer px-2 py-3"
            >
              Rent Paid {renderArrow("rentPaid")}
            </th>
            <th
              onClick={() => handleSort("paymentDate")}
              className="cursor-pointer px-2 py-3"
            >
              Payment Date {renderArrow("paymentDate")}
            </th>
            <th
              onClick={() => handleSort("referralCount")}
              className="cursor-pointer px-2 py-3"
            >
              Referral Count {renderArrow("referralCount")}
            </th>
            <th
              onClick={() => handleSort("discountEarned")}
              className="cursor-pointer px-2 py-3"
            >
              Discount Earned {renderArrow("discountEarned")}
            </th>
            <th
              onClick={() => handleSort("status")}
              className="cursor-pointer px-2 py-3"
            >
              Status {renderArrow("status")}
            </th>
            <th className="px-2 py-3">Actions {renderArrow("status")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index} className="h-12 border-t hover:bg-[#ececec]">
              <td className="px-2 py-2">{user.fullName}</td>
              <td className="px-2 py-2">{user.email}</td>
              <td className="px-2 py-2">{user.phone}</td>
              <td className="px-2 py-2">
                {new Date(user.joinedOn).toLocaleDateString()}
              </td>
              <td className="px-2 py-2">${user.rentPaid.toFixed(2)}</td>
              <td className="px-2 py-2">
                {new Date(user.paymentDate).toLocaleDateString()}
              </td>
              <td className="px-2 py-2">{user.referralCount}</td>
              <td className="px-2 py-2">${user.discountEarned.toFixed(2)}</td>
              <td className="px-2 py-2">{user.status}</td>
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

export default UsersTable;
