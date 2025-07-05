"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { useGetUserTransactionsQuery } from "@/redux/features/transactionsApiSlice";
import { Transaction, TransactionStatus } from "./constants";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { ArrowLeftIcon } from "@/assets/svg/arrow-left";
import { capitalizeFirstLetter } from "@/utils";
import paymentCard from "@/assets/png/payment-card.png";
import masterCard from "@/assets/svg/mastercard-logo.svg";
import ammex from "@/assets/svg/amex-card.svg";
import visa from "@/assets/png/visa-logo.png";

// type SortKey = keyof Transaction

type SortKey = "createdAt" | "status" | "cardType" | "amount";

const itemsPerPage = 5;

const TransactionTable = () => {
  const {
    data: userTransactions,
    isLoading,
    isError,
  } = useGetUserTransactionsQuery();
  const [sortBy, setSortBy] = useState<SortKey>("createdAt");
  const [ascending, setAscending] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  if (isLoading) {
    return <p className="text-center mt-8">Loading transactions...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-8">
        Failed to load transactions.
      </p>
    );
  }

  const transactions = userTransactions?.data || [];

  if (transactions.length === 0) {
    return <p className="text-center py-8">No transactions found.</p>;
  }

  // const sortedData = [...transactions].sort((a, b) => {
  //   const valA = a?.[sortBy] ?? "";
  //   const valB = b?.[sortBy] ?? "";

  //   if (valA < valB) return ascending ? -1 : 1;
  //   if (valA > valB) return ascending ? 1 : -1;
  //   return 0;
  // });

  const offset = currentPage * itemsPerPage;
  // const paginatedData = sortedData.slice(offset, offset + itemsPerPage);
  // const pageCount = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = transactions.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div className="overflow-x-auto mt-6 px-2 md:block hidden">
      <table className="w-[95%] text-sm text-left">
        <thead className="w-full">
          <tr className="font-[600] text-[12px] w-full">
            <th className="w-[5%] ">S/N</th>
            <th
              className="cursor-pointer w-[15%]"
              // onClick={() => handleSort("createdAt")}
            >
              Payment Date
              {/* {sortBy === "createdAt" && (ascending ? "↑" : "↓")} */}
            </th>
            <th
              className="cursor-pointer w-[15%]"
              // onClick={() => handleSort("status")}
            >
              Status
              {/* {sortBy === "status" && (ascending ? "↑" : "↓")} */}
            </th>
            <th
              className="cursor-pointer w-[30%]"
              // onClick={() => handleSort("cardType")}
            >
              Card
              {/* {sortBy === "cardType" && (ascending ? "↑" : "↓")} */}
            </th>
            <th className="w-[15%]">Referral Discount</th>
            <th
              className="cursor-pointer w-[15%]"
              // onClick={() => handleSort("amount")}
            >
              Rent Amount
              {/* {sortBy === "amount" && (ascending ? "↑" : "↓")} */}
            </th>
            <th className="w-[5%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((tx, index: number) => (
            <tr key={tx.id} className="h-12">
              <td>{offset + index + 1} </td>
              <td>{format(new Date(tx.createdAt), "dd/MM/yyyy")}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span
                    className={`${getStatusColor(
                      tx.status
                    )} w-2 h-2 rounded-full`}
                  />
                  {capitalizeFirstLetter(tx.status)}
                </div>
              </td>
              <td className="pr-10">
                <div className="flex items-center gap-2 ">
                  {tx.cardType === "Mastercard" ? (
                    <Image src={masterCard} alt="card" className="w-7 h-5 " />
                  ) : tx.cardType === "Visa" ? (
                    <Image src={visa} alt="card" className="w-7 h-5 " />
                  ) : tx.cardType === "Ammex" ? (
                    <Image src={ammex} alt="card" className="w-7 h-5 " />
                  ) : (
                    <Image src={paymentCard} alt="card" className="w-7 h-5 " />
                  )}
                  {tx?.cardType}
                </div>
              </td>
              <td>{tx.discount}</td>
              <td>${Number(tx.amount).toLocaleString()}</td>
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
                    <DropdownMenuLabel
                      onClick={() =>
                        router.push(`/transactions/${tx.transactionNumber}`)
                      }
                      className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      View
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
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="flex gap-2 text-sm"
          activeClassName="font-bold text-white bg-[#2A4152] rounded-[8px]"
          pageClassName="px-3 py-1 rounded hover:bg-gray-100"
          previousClassName="px-2 rounded-[8px] py-1 border hover:bg-gray-100"
          nextClassName="px-2 rounded-[8px] py-1 border hover:bg-gray-100"
          breakClassName="px-2 rounded-[8px] py-1"
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
