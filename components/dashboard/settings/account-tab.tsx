"use client";
import NubaInput from "@/components/ui/nuba-input";
import { Accordion } from "@/components/ui/accordion";
import { useGetPaymentMethodsQuery } from "@/redux/features/paymentsApiSlice";
import { setSettingsField } from "@/redux/features/settings-slice";
import { RootState } from "@/redux/store";
import { AccountTabProps, SettingsState } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import PaymentAccordionItem from "./payment-accordion-item";
import { FC, useEffect, useState } from "react";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { formatDate } from "@/utils";
import empty from "@/assets/gif/empty.gif";
import Image from "next/image";

const AccountTab: FC<AccountTabProps> = ({
  setRentDueDate,
  setRentId,
  rentDueDate,
}) => {
  const { preferredPaymnetMethod } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();
  const handleChange = (field: keyof SettingsState, value: string) => {
    dispatch(setSettingsField({ field, value }));
  };
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null);

  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const { data: rents, isLoading: isRentsLoading } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    firstRentId ?? skipToken
  );
  const rentDetail = rentDetails?.data;

  useEffect(() => {
    if (rentDetail?.dueDate) {
      setRentDueDate(new Date(rentDetail.dueDate));
      setRentId(rentDetail.id);
    }
  }, [rentDetail?.dueDate]);

  return (
    <div>
      <div className="w-full mb-10  ">
        <div className="w-full border-b border-b-[#E2E8F0] pb-1 ">
          <p className="font-[600] text-[12px] text-[#2A4152] ">
            Account Settings
          </p>
          <p className="text-[10px] bo ">Manage payment preferences</p>
        </div>
        <div className="w-full border-b border-b-[#E2E8F0] pb-6 ">
          <div className="w-full md:w-[70%] xl:w-[50%] ">
            <Accordion type="single" collapsible className="mt-6">
              <p className="font-[500] text-[12px] ">Payment List</p>
              {paymentMethods?.data?.length === 0 && (
                <div className="flex items-center justify-center w-full py-3">
                  <Image src={empty} alt="empty" className="w-10 h-10 " />
                </div>
              )}
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

            <NubaInput
              containerClass={"w-full mt-6"}
              label="Rent Due Date"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              dropdownIcon
              setSelectedDate={setRentDueDate}
              value={
                rentDueDate ? formatDate(rentDueDate.toISOString()) : "Loading"
              }
              onChange={() => {}}
              calendarType="future"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
