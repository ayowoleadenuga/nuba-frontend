"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { dummyPayouts, Payout } from "./constants";

type SortKey = keyof Payout;
type SortDirection = "asc" | "desc";

const PayoutTable = () => {
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...dummyPayouts].sort((a, b) => {
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
              onClick={() => handleSort("renterName")}
              className="cursor-pointer pr-3 py-2"
            >
              Renter Name {renderArrow("renterName")}
            </th>
            <th
              onClick={() => handleSort("renterEmail")}
              className="cursor-pointer px-3 py-2"
            >
              Renter Email {renderArrow("renterEmail")}
            </th>
            <th
              onClick={() => handleSort("landlordName")}
              className="cursor-pointer px-3 py-2"
            >
              Landlord Name {renderArrow("landlordName")}
            </th>
            <th className="px-3 py-2">Landlord Bank Details</th>
            <th
              onClick={() => handleSort("amountPaid")}
              className="cursor-pointer px-3 py-2"
            >
              Amount Paid {renderArrow("amountPaid")}
            </th>
            <th
              onClick={() => handleSort("paymentDate")}
              className="cursor-pointer px-3 py-2"
            >
              Payment Date {renderArrow("paymentDate")}
            </th>
            <th
              onClick={() => handleSort("payoutStatus")}
              className="cursor-pointer px-3 py-2"
            >
              Payout Status {renderArrow("payoutStatus")}
            </th>
            <th className="px-3 py-2">Notes</th>
            <th className="px-3 py-2">Actions {renderArrow("renterName")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((payout, index) => (
            <tr key={index} className="border-t h-12 hover:bg-[#ececec] ">
              <td className="pr-3 py-2">{payout.renterName}</td>
              <td className="px-3 py-2">{payout.renterEmail}</td>
              <td className="px-3 py-2">{payout.landlordName}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                {payout.landlordBankDetails}
              </td>
              <td className="px-3 py-2">${payout.amountPaid.toFixed(2)}</td>
              <td className="px-3 py-2">
                {new Date(payout.paymentDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-3 py-2">{payout.payoutStatus}</td>
              <td className="px-3 py-2">{payout.notes}</td>
              <td className="px-3 py-2">
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

export default PayoutTable;
