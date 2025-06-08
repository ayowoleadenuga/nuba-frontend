import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { CheckedIcon } from "@/assets/svg/ckecked-icon";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useGetPaymentMethodsQuery } from "@/redux/features/paymentsApiSlice";
import { AutoPayOffProps } from "@/types";
import React, { useState } from "react";
import PaymentAccordionItem from "../settings/payment-accordion-item";
import { setMakePayment } from "@/redux/features/paymentSlice";
import { useDispatch } from "react-redux";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

const AutopayOff: React.FC<AutoPayOffProps> = ({ setTab }) => {
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null);
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const dispatch = useDispatch();
  const { data: rents } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    firstRentId ?? skipToken
  );
  const rentDetail = rentDetails?.data;
  return (
    <div className=" rounded-[4px] ">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between border-b border-[#d9d9d9] pb-2">
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
          {paymentMethods?.data?.map((method, index: number) => (
            <PaymentAccordionItem
              key={method.id}
              method={method}
              index={index}
              isActive={method.id === activeMethodId}
              onSelect={() => setActiveMethodId(method.id)}
            />
          ))}
        </Accordion>
      </div>

      <div className="mt-2 bg-white p-4">
        <div className="flex items-center justify-between text-[#999B9E] ">
          <p className="font-[600] text-[12px] ">Total balance</p>
          <p className="text-[10px]">
            {" "}
            £{rentDetail && (rentDetail?.monthlyPrice + 23.88).toLocaleString()}
          </p>
        </div>
        <Button
          onClick={() => dispatch(setMakePayment("start"))}
          className=" flex items-center justify-center w-full mt-2 "
        >
          Make Payment
        </Button>
      </div>
    </div>
  );
};

export default AutopayOff;
