"use client";
import React, { useState } from "react";
import { dummyUsers } from "@/components/admin/referrals/constants";

type SortKey =
  | "fullName"
  | "email"
  | "referralCount"
  | "milestone"
  | "joined"
  | "status";
type SortDirection = "asc" | "desc";

const ReferralsTable = () => {
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
        <thead className="text-xs font-semibold">
          <tr className="border-b">
            <th
              onClick={() => handleSort("fullName")}
              className="cursor-pointer px-3 py-2"
            >
              Full Name {renderArrow("fullName")}
            </th>
            <th
              onClick={() => handleSort("email")}
              className="cursor-pointer px-3 py-2"
            >
              Email {renderArrow("email")}
            </th>
            <th
              onClick={() => handleSort("referralCount")}
              className="cursor-pointer px-3 py-2"
            >
              Referral Count {renderArrow("referralCount")}
            </th>
            <th
              onClick={() => handleSort("milestone")}
              className="cursor-pointer px-3 py-2"
            >
              Milestone {renderArrow("milestone")}
            </th>
            <th
              onClick={() => handleSort("joined")}
              className="cursor-pointer px-3 py-2"
            >
              Joined {renderArrow("joined")}
            </th>
            <th
              onClick={() => handleSort("status")}
              className="cursor-pointer px-3 py-2"
            >
              Status {renderArrow("status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index} className="border-t h-12 hover:bg-[#ececec] ">
              <td className="px-3 py-2">{user.fullName}</td>
              <td className="px-3 py-2">{user.email}</td>
              <td className="px-3 py-2">
                {user.referralCount.toLocaleString()}
              </td>
              <td className="px-3 py-2">{user.milestone}%</td>
              <td className="px-3 py-2">${user.joined.toFixed(2)}</td>
              <td className="px-3 py-2">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralsTable;
