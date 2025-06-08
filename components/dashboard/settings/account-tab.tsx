"use client";
import NubaInput from "@/components/ui/nuba-input";
import { Accordion } from "@/components/ui/accordion";
import { useGetPaymentMethodsQuery } from "@/redux/features/paymentsApiSlice";
import { setSettingsField } from "@/redux/features/settings-slice";
import { RootState } from "@/redux/store";
import { SettingsState } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import PaymentAccordionItem from "./payment-accordion-item";
import { useState } from "react";

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
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null);

  const { data: paymentMethods } = useGetPaymentMethodsQuery();

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
            {/* <NubaInput
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
            /> */}

            <Accordion type="single" collapsible className="mt-6">
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
              value={rentDueDate ? rentDueDate.toLocaleDateString() : ""}
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
