"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import { dummyData, Transaction, TransactionStatus } from "./constants";
import { OptionsIcon } from "@/assets/svg/options-icon";
import Image from "next/image";
import masterCard from "@/assets/svg/mastercard-logo.svg";
import ammexCard from "@/assets/svg/amex-card.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { ArrowLeftIcon } from "@/assets/svg/arrow-left";

type SortKey = keyof Transaction;

const itemsPerPage = 5;

const TransactionTable = () => {
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [ascending, setAscending] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSort = (key: SortKey) => {
    if (key === sortBy) {
      setAscending(!ascending);
    } else {
      setSortBy(key);
      setAscending(true);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const sortedData = [...dummyData].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return ascending ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return ascending ? 1 : -1;
    return 0;
  });

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Success":
        return "bg-green-500";
      case "Failed":
        return "bg-red-500";
    }
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = sortedData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="overflow-x-auto mt-6 px-2">
      <table className="w-[95%] text-sm text-left">
        <thead className="w-full">
          <tr className=" font-[600] text-[12px] w-full ">
            <th
              className="cursor-pointer w-[20%]"
              onClick={() => handleSort("date")}
            >
              Payment Date {sortBy === "date" && (ascending ? "↑" : "↓")}
            </th>
            <th
              className="cursor-pointer w-[15%]"
              onClick={() => handleSort("status")}
            >
              Status {sortBy === "status" && (ascending ? "↑" : "↓")}
            </th>
            <th
              className="cursor-pointer w-[30%]"
              onClick={() => handleSort("cardType")}
            >
              Card {sortBy === "cardType" && (ascending ? "↑" : "↓")}
            </th>
            <th className="w-[15%]">Referral Discount</th>
            <th
              className="cursor-pointer w-[15%]"
              onClick={() => handleSort("amount")}
            >
              Rent Amount {sortBy === "amount" && (ascending ? "↑" : "↓")}
            </th>
            <th className="w-[5%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((tx, index) => (
            <tr key={index} className="h-12">
              <td>{format(new Date(tx.date), "dd/MM/yyyy hh:mm a")}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span
                    className={`${getStatusColor(
                      tx.status
                    )} w-2 h-2 rounded-full`}
                  ></span>
                  {tx.status}
                </div>
              </td>
              <td className="pr-10">
                <div className="flex items-center gap-2 justify-between">
                  {tx.cardType === "Amex" ? (
                    <div className="flex items-center gap-2">
                      <Image src={ammexCard} alt="ammex" />
                      <p>Amex Card</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Image src={masterCard} alt="ammex" />
                      <p>Mastercard</p>
                    </div>
                  )}
                  <span>..{tx.cardNumber}</span>
                </div>
              </td>
              <td>{tx.referralDiscount}</td>
              <td>${tx.amount.toFixed(2)}</td>
              <td>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <OptionsIcon />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white border rounded-md shadow-lg text-sm "
                  >
                    <DropdownMenuLabel
                      onClick={() => console.log("View clicked", tx)}
                      className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      View
                    </DropdownMenuLabel>
                    <DropdownMenuLabel
                      onClick={() => console.log("Delete clicked", tx)}
                      className="px-4 py-1 hover:bg-gray-100 cursor-pointer text-red-500"
                    >
                      Delete
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={<ArrowLeftIcon />}
          nextLabel={<ArrowRightIcon />}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"flex gap-2 text-sm"}
          activeClassName={"font-bold text-white bg-[#2A4152] rounded-[8px] "}
          pageClassName={"px-3 py-1 rounded hover:bg-gray-100"}
          previousClassName={
            "px-2 rounded-[8px] py-1 border rounded hover:bg-gray-100"
          }
          nextClassName={
            "px-2 rounded-[8px] py-1 border rounded hover:bg-gray-100"
          }
          breakClassName={"px-2 rounded-[8px] py-1"}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
