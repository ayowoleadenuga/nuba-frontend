"use client";
import NubaInput from "@/components/ui/nuba-input";
import { useGetPaymentMethodsQuery } from "@/redux/features/paymentsApiSlice";
import { setSettingsField } from "@/redux/features/settings-slice";
import { RootState } from "@/redux/store";
import { SettingsState } from "@/types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AccountTabProps {
  setRentDueDate: (Date: Date | null) => void;
  rentDueDate: Date | null;
}
const AccountTab: React.FC<AccountTabProps> = ({
  setRentDueDate,
  rentDueDate,
}) => {
  const { preferredPaymnetMethod } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();
  const handleChange = (field: keyof SettingsState, value: string) => {
    dispatch(setSettingsField({ field, value }));
  };

  const { data: paymentMethods } = useGetPaymentMethodsQuery(undefined);

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
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Preferred Payment Method"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              dropdown
              dropdownItems={["Ammex", "Mastercard"]}
              value={preferredPaymnetMethod}
              onChange={(e) =>
                handleChange("preferredPaymnetMethod", e.target.value)
              }
            />
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Rent Due Date"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              dropdownIcon
              setSelectedDate={setRentDueDate}
              value={rentDueDate ? rentDueDate.toLocaleDateString() : ""}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
