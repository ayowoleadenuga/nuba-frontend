"use client";
import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { PointsIcon } from "@/assets/svg/points-icon";
import { IconButton } from "@mui/material";
import { format } from "date-fns";
import { TransactionsIcon } from "@/assets/svg/transactions";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import { useGetUserTransactionByRefQuery } from "@/redux/features/transactionsApiSlice";
import html2pdf from "html2pdf.js";
import { useGetUserRentsQuery } from "@/redux/features/rentsApiSlice";

const TransactionDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const transactionNumber = id as string;

  const { data: userProfileDetails } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;
  const {
    data: rents,
    isLoading: isRentsLoading,
    isError: isRentsError,
    error: rentsError,
  } = useGetUserRentsQuery();
  const landLord = rents?.data?.[0]?.landlord?.accountName;

  const { data: userTransactionByRef } =
    useGetUserTransactionByRefQuery(transactionNumber);
  const userTransaction = userTransactionByRef?.data[0];

  const receiptRef = useRef<HTMLDivElement>(null);

  const joinedYear = React.useMemo(() => {
    if (!userProfile?.joinedAt) return "";
    const date = new Date(userProfile.joinedAt);
    return `${date.getFullYear().toString().slice(-2)}`;
  }, [userProfile?.joinedAt]);

  const handleDownloadPDF = () => {
    if (receiptRef.current) {
      const opt = {
        margin: 0.5,
        filename: `receipt-${transactionNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(opt).from(receiptRef.current).save();
    }
  };

  return (
    <div className="w-full p-5 min-h-[100vh] pb-[60px]">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between ">
        <p className="text-[20px] font-[600] ">
          {userTransaction?.createdAt &&
            format(new Date(userTransaction?.createdAt), "dd/MM/yyyy")}
        </p>
        <div className="flex items-center gap-4 ">
          <div>
            <div className="flex items-center">
              <PointsIcon />
              <p className="font-[700] text-[#CF931D]  ">
                {userProfile?.statistics.unitsEarned} pts
              </p>
            </div>
            <p className="text-[11px] text-[#999B9E] ">
              Member since ‘{joinedYear}
            </p>
          </div>
          <IconButton>
            <OptionsIcon />
          </IconButton>
        </div>
      </div>

      {/* Printable Section */}
      <div
        ref={receiptRef}
        className="w-full md:w-[70%] xl:w-[50%] bg-white p-4 mt-5"
      >
        <p className="font-[600] text-[12px] mt-3">Transaction details</p>
        <div className="border border-[#D9D9D9] rounded-[4px] flex items-center justify-between p-2 md:p-5 mt-1">
          <div className="flex items-center gap-3">
            <TransactionsIcon />
            <div className="text-[12px] text-[#999B9E]">
              <p>
                Sending money to
                <span className="text-black font-[500] mx-1">
                  Landlord: {landLord}
                </span>
              </p>
              <p>Sent</p>
            </div>
          </div>
          <p className="text-[24px]">
            - £{Number(userTransaction?.amount).toLocaleString()}
          </p>
        </div>

        <p className="text-[12px] mt-6 mb-5">Details</p>
        <div className="text-[12px]">
          <div className="flex items-center justify-between py-3">
            <p className="text-[#2A4152]">Transaction ID</p>
            <p>{userTransaction?.transactionNumber}</p>
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-[#2A4152]">Transaction Date</p>
            <p>
              {userTransaction?.createdAt &&
                format(new Date(userTransaction?.createdAt), "dd/MM/yyyy")}
            </p>
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-[#2A4152]">Recipient</p>
            <p>{landLord} </p>
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-[#2A4152]">Status</p>
            <p>Successful</p>
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-[#2A4152]">Rent amount</p>
            <p>£{Number(userTransaction?.amount).toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-[#2A4152]">Fees</p>
            <p>£{userTransaction?.fee} </p>
          </div>
          <div className="flex items-center justify-between py-3 ">
            <p>Discount</p>
            <p> £{userTransaction?.discount}</p>
          </div>
          <div className="flex items-center justify-between py-3 font-[700]">
            <p>Total</p>
            <p>
              {" "}
              £
              {userTransaction
                ? userTransaction?.amount + userTransaction?.fee
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-0 mt-6 md:px-3 w-full md:w-[60%] xl:w-[45%]">
        <Button className="w-[48%]" onClick={handleDownloadPDF}>
          Download Receipt
        </Button>
        <Button
          onClick={() => router.push("/support")}
          className="bg-[#2A4152] w-[48%]"
        >
          Support Center
        </Button>
      </div>
    </div>
  );
};

export default TransactionDetails;
