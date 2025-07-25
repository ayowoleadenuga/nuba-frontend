import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { CheckedIcon } from "@/assets/svg/ckecked-icon";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  useGetPaymentMethodsQuery,
  useGetUpcomingRentPaymentQuery,
  useInitiatePaymentQuery,
  useSetDefaultPaymentMethodMutation,
} from "@/redux/features/paymentsApiSlice";
import { AutoPayOffProps } from "@/types";
import React, { useState } from "react";
import PaymentAccordionItem from "../settings/payment-accordion-item";
import { setMakePayment } from "@/redux/features/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetUserTransactionFeeQuery } from "@/redux/features/transactionsApiSlice";
import { nubaApis } from "@/services/api-services";
import { RootState } from "@/redux/store";
import { useRouter } from "nextjs-toploader/app";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";

const AutopayOff: React.FC<AutoPayOffProps> = ({
  setTab,
  initiatePaymentLoading,
  handleInitiatePayment,
  upcomingRentPaymentsLoading,
}) => {
  const router = useRouter();
  // const [activeMethodId, setActiveMethodId] = useState<string | null>(null);
  const { data: paymentMethods, refetch: refreshPaymentMethods } =
    useGetPaymentMethodsQuery();

  const { data: rents } = useGetUserRentsQuery();

  const currentRentId = useSelector(
    (state: RootState) => state.rent.currentRentId
  );
  const firstRentId = rents?.data?.[0]?.id;
  const rentIdtoUse = !currentRentId ? firstRentId : currentRentId;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    rentIdtoUse ?? skipToken
  );
  const rentDetail = rentDetails?.data;

  const { data: upcomingRentPaymentsList } = useGetUpcomingRentPaymentQuery(
    rentIdtoUse ?? skipToken
  );
  const { data: transactionFee } = useGetUserTransactionFeeQuery(
    upcomingRentPaymentsList?.data?.id ?? skipToken
  );

  const [setDefaultPaymentMethodMutation] =
    useSetDefaultPaymentMethodMutation();

  const handleSelectPaymentMethod = async (id: string) => {
    await nubaApis.setDefaultPaymentMethod.handleSetDefaultPaymentMethod(
      id,
      setDefaultPaymentMethodMutation
    );
    refreshPaymentMethods();
  };

  const {
    data: userProfileDetails,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;
  return (
    <div className=" rounded-[4px] ">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between border-b border-[#d9d9d9]] pb-2">
          <div>
            <div className="flex items-center gap-1">
              <CheckedIcon fill="#999B9E" />
              <p className="text-[12px] font-[500] ">Autopay off</p>
            </div>
          </div>
          <button onClick={() => setTab("autopay-setup")}>
            <ArrowRightIcon />
          </button>
        </div>
        <div className="flex items-center justify-between pt-6 pb-4">
          <div className="flex items-center gap-1">
            <CheckedIcon fill="#999B9E" />
            <p className="text-[12px]  ">Include Points in Payment</p>
          </div>
          <button onClick={() => setTab("include-points")}>
            <ArrowRightIcon />
          </button>
        </div>

        <Accordion type="single" collapsible className=" ">
          {paymentMethods?.data
            ?.slice()
            .sort(
              (a, b) =>
                (b.default === true ? 1 : 0) - (a.default === true ? 1 : 0)
            )
            .map((method, index: number) => (
              <PaymentAccordionItem
                key={method.id}
                method={method}
                index={index}
                onSelect={() => {
                  console.log(
                    "card name is",
                    method.cardName,
                    "id is",
                    method.id
                  );
                  handleSelectPaymentMethod(method.id);
                }}
              />
            ))}
        </Accordion>
      </div>

      <div className="mt-2 bg-white p-4">
        <div className="flex items-center justify-between text-[#999B9E] ">
          <p className="font-[600] text-[12px] ">Total balance</p>
          <p className="text-[10px]">
            {" "}
            £
            {rentDetail &&
              (
                rentDetail?.monthlyPrice + (transactionFee?.data?.fee ?? 0)
              ).toLocaleString()}
          </p>
        </div>
        <Button
          onClick={() => {
            if (userProfile?.isKycVerified) {
              handleInitiatePayment();
            } else {
              router.push("/kyc-verification");
            }
          }}
          disabled={
            upcomingRentPaymentsLoading ||
            initiatePaymentLoading ||
            isUserProfileLoading ||
            isUserProfileError
          }
          className=" flex items-center justify-center w-full mt-2 "
        >
          {initiatePaymentLoading ? "Initiating Payment..." : "Make Payment"}
        </Button>
      </div>
    </div>
  );
};

export default AutopayOff;
