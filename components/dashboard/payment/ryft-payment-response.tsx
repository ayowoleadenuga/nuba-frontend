import React, { useEffect } from "react";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { ErrorLogo } from "@/assets/svg/error-logo";
import { cn } from "@/utils";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import check from "@/assets/gif/check.gif";
import { useDispatch, useSelector } from "react-redux";
import { setMakePayment } from "@/redux/features/paymentSlice";
import { RootState } from "@/redux/store";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

const RyftPaymentResponse = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const rentPaymentStatus = useSelector(
    (state: RootState) => state.payment.rentPaymentStatus
  );
  const paymentId = useSelector((state: RootState) => state.payment.paymentId);
  const currentRentId = useSelector(
    (state: RootState) => state.rent.currentRentId
  );

  const { data: rents } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;
  const rentIdtoUse = !currentRentId ? firstRentId : currentRentId;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    rentIdtoUse ?? skipToken
  );
  const rentDetail = rentDetails?.data;
  return (
    <div>
      <div className="w-full flex items-center justify-center flex-col text-center gap-5 mt-10 mb-[153px] ">
        {rentPaymentStatus === "error" ? (
          <ErrorLogo />
        ) : (
          <Image src={check} alt="success" />
        )}

        <p
          className={cn(
            "text-[24px] font-[500]  ",
            rentPaymentStatus === "success"
              ? "text-[#46642D]"
              : "text-[#FF3D00] "
          )}
        >
          {rentPaymentStatus === "success"
            ? `Your payment for ${rentDetail?.name} has been submitted`
            : " Your payment could not be processed"}
        </p>
        <p className="font-[500] text-[12px] md:text-[16px] text-center w-full md:w-[70%] lg:w-[50%] ">
          {rentPaymentStatus === "success"
            ? "  Kindly note that payment processing may take between 24 and 48 hours."
            : "  We couldn’t complete your rent payment. This may be due to an issue with your payment method."}
        </p>
        {rentPaymentStatus === "success" ? (
          <button
            onClick={() => router.push(`/transactions/${paymentId}`)}
            className="flex items-center gap-1 underline"
          >
            View payment details <ArrowRightIcon />
          </button>
        ) : (
          <button
            onClick={() => dispatch(setMakePayment(""))}
            className="flex items-center gap-1 underline"
          >
            Retry Payment <ArrowRightIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default RyftPaymentResponse;
