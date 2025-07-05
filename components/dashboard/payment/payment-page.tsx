import { ArrowLeftIcon } from "@/assets/svg/arrow-left";
import { Boost } from "@/assets/svg/boost";
import { EarnedPoints } from "@/assets/svg/earned-points";
import { Redeem } from "@/assets/svg/redeem";
import { RefreshIcon } from "@/assets/svg/refresh-icon";
import AutopayOff from "./autopay-off";
import AutopayOn from "./autopay-on";
import EarnedCard from "./earned-card";
import React, { FC, useEffect, useState } from "react";
import MakePayment from "./make-payment";
import PaymentResponse from "./payment-response";
import { useRouter } from "nextjs-toploader/app";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { formatDate3, formatDateToDDMMYYYY } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setMakePayment,
  setRentPaymentStatus,
} from "@/redux/features/paymentSlice";
import { RootState } from "@/redux/store";
import {
  useGetUpcomingRentPaymentQuery,
  useInitiatePaymentQuery,
} from "@/redux/features/paymentsApiSlice";
import { useGetUserTransactionFeeQuery } from "@/redux/features/transactionsApiSlice";
import { nubaApis } from "@/services/api-services";
import RyftPayment from "@/components/dashboard/payment/ryft-payment";
import RyftPaymentResponse from "@/components/dashboard/payment/ryft-payment-response";

interface PaymentPageProps {
  setTab: React.Dispatch<
    React.SetStateAction<"" | "autopay-setup" | "include-points">
  >;
}
const PaymentPage: FC<PaymentPageProps> = ({ setTab }) => {
  const [feeFetchedAt, setFeeFetchedAt] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data: userProfileDetails } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const { data: rents } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    firstRentId ?? skipToken
  );
  const rentDetail = rentDetails?.data;
  const { makePayment } = useSelector((state: RootState) => state.payment);

  const {
    data: upcomingRentPaymentsList,
    isLoading: upcomingRentPaymentsLoading,
  } = useGetUpcomingRentPaymentQuery(firstRentId ?? skipToken);

  const {
    data: transactionFee,
    refetch: refetchTransactionFee,
    isFetching: isFetchingFee,
    isSuccess: isFeeSuccess,
  } = useGetUserTransactionFeeQuery(
    upcomingRentPaymentsList?.data?.id ?? skipToken
  );

  useEffect(() => {
    if (!isFetchingFee && transactionFee?.data?.fee) {
      const formattedDate = new Date().toLocaleString("en-us", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      setFeeFetchedAt(formattedDate);
    }
  }, [isFetchingFee, transactionFee?.data?.fee]);

  const {
    data: clientSecretData,
    isLoading: initiatePaymentLoading,
    isSuccess: initatePaymentSuccess,
    isError: initiatePaymentError,
    refetch,
  } = useInitiatePaymentQuery();

  console.log("so the client secret data callinig itself", clientSecretData);

  const handleInitiatePayment = async () => {
    // if (upcomingRentPaymentsList?.data?.id) {
    //   await nubaApis.createPaymentMethod.handleInitiatePay(refetch);
    //   if (initatePaymentSuccess) {
    //     dispatch(setMakePayment("start"));
    //     // window.location.href === data?.data?.authorizationUrl;
    //     // dispatch(setMakePayment("complete"));
    //   }
    // }
    if (upcomingRentPaymentsList?.data?.id && clientSecretData?.data?.token) {
      dispatch(setMakePayment("start"));
    }
  };

  const handleInitiateRyft = async () => {
    if (upcomingRentPaymentsList?.data?.id) {
      await nubaApis.createPaymentMethod.handleInitiatePay(refetch);
      if (initatePaymentSuccess) {
        dispatch(setMakePayment("ryft"));
      }
    }
  };

  useEffect(() => {
    dispatch(setRentPaymentStatus(""));
    dispatch(setMakePayment(""));
  }, []);

  return (
    <div className="py-6 ">
      {upcomingRentPaymentsLoading ? (
        <div className="bg-gray-300 w-[400px] h-4500px] animate-pulse "></div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            {makePayment === "start" ? (
              <button
                onClick={() => dispatch(setMakePayment(""))}
                className="text-[12px] font-[600] my-5 flex items-center gap-2"
              >
                <ArrowLeftIcon /> Confirm your payment
              </button>
            ) : makePayment === "ryft" ? (
              <button
                onClick={() => dispatch(setMakePayment("start"))}
                className="text-[12px] font-[600] my-5 flex items-center gap-2"
              >
                <ArrowLeftIcon /> Go back
              </button>
            ) : (
              <p className="font-[600] text-[12px] ">
                {userProfile?.address1} || {userProfile?.city}
              </p>
            )}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => router.push("/transactions")}
                className="text-[12px] font-[500] "
              >
                Payment History
              </button>
            </div>
          </div>
          {makePayment === "" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
              <div className="cardStyle bg-white h-fit  ">
                <div className="flex items-center justify-between">
                  <p className="font-[600] text-[14px] ">Charges</p>
                  <div className="flex items-center gap-1">
                    {feeFetchedAt && (
                      <p className="text-[10px] text-[#474747]">
                        As of {feeFetchedAt}
                      </p>
                    )}

                    <button
                      onClick={refetchTransactionFee}
                      className={isFetchingFee ? "animate-spin" : ""}
                    >
                      <RefreshIcon />
                    </button>
                  </div>
                </div>
                <div className="mt-5 border-b border-b-[#D9D9D9] pb-4 ">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-[600] ">
                        Residential Rent
                      </p>
                      <p className="text-[#474747] text-[10px] ">
                        {rentDetail?.dueDate
                          ? formatDateToDDMMYYYY(rentDetail.dueDate)
                          : "—"}
                      </p>
                    </div>
                    <p className="font-[500] text-[14px] text-[#474747] ">
                      £{rentDetail?.monthlyPrice?.toString()}
                    </p>
                  </div>
                </div>
                <div className="mt-5 border-b border-b-[#D9D9D9] pb-4 ">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-[600] ">Fee</p>
                      {/* <p className="text-[#474747] text-[10px] ">01/05/2025</p> */}
                    </div>
                    <p className="font-[500] text-[14px] text-[#474747] ">
                      £{transactionFee?.data?.fee}
                    </p>
                  </div>
                </div>
                <div className="mt-5 ">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-[600] ">Total</p>
                    <p className="font-[500] text-[14px] text-[#474747] ">
                      £
                      {(
                        rentDetail &&
                        rentDetail?.monthlyPrice +
                          (transactionFee?.data?.fee ?? 0)
                      )?.toString()}
                    </p>
                  </div>
                </div>
              </div>

              {userProfile?.autopay ? (
                <AutopayOn
                  setTab={setTab}
                  initiatePaymentLoading={initiatePaymentLoading}
                  handleInitiatePayment={handleInitiatePayment}
                  upcomingRentPaymentsLoading={upcomingRentPaymentsLoading}
                />
              ) : (
                <AutopayOff
                  setTab={setTab}
                  initiatePaymentLoading={initiatePaymentLoading}
                  handleInitiatePayment={handleInitiatePayment}
                  upcomingRentPaymentsLoading={upcomingRentPaymentsLoading}
                />
              )}
            </div>
          ) : makePayment === "start" ? (
            <MakePayment
              paymentId={upcomingRentPaymentsList?.data?.id}
              clientSecret={clientSecretData?.data?.token}
              initiatePaymentLoading={initiatePaymentLoading}
              initiatePaymentError={initiatePaymentError}
              handleInitiateRyft={handleInitiateRyft}
            />
          ) : makePayment === "ryft" ? (
            <RyftPayment
              addPayment={true}
              clientSecret={clientSecretData?.data?.token}
              buttonText="Add Card"
            />
          ) : (
            // <RyftPayment clientSecret={clientSecretData?.data?.token} />
            <RyftPaymentResponse />
          )}
        </div>
      )}

      <p className="hidden md:block text-[18px] font-[500] mt-[210px] mb-4 ">
        Your rewards & benefits on Nuba
      </p>
      <div className="hidden md:flex items-center gap-10">
        <EarnedCard
          earned="You’ve earned"
          point="30,265"
          title="on paid referrals"
          description="Terms apply to earn points"
          action="Explore rewards"
          Icon={EarnedPoints}
          handleClick={() => {}}
        />
        <EarnedCard
          title="Redeem points for a percentage of your rent credit paid"
          description="Use your points to get a substancial amount off your next payment"
          action="Redeem points"
          Icon={Redeem}
          handleClick={() => {}}
        />
        <EarnedCard
          title="Boost your credit with rent reporting"
          description="Build your credit history with free rent reporting of the three major credit bureaus."
          action="Enable rent reporting (soon)"
          Icon={Boost}
          handleClick={() => {}}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
