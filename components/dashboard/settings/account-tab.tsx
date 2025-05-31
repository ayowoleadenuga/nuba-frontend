"use client";
import NubaInput from "@/components/ui/nuba-input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetPaymentMethodsQuery } from "@/redux/features/paymentsApiSlice";
import { setSettingsField } from "@/redux/features/settings-slice";
import { RootState } from "@/redux/store";
import { SettingsState } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import ammex from "@/assets/svg/amex-card.svg";
import { Mastercard } from "@/assets/svg/mastercard";
import Image from "next/image";

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
  console.log("Payment Methods:", paymentMethods);

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

            <Accordion type="single" collapsible className=" ">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center justify-between gap-2 relative bg-[#F1F1F1] px-3 ">
                  <p className="font-[500] text-[14px] ">American Express</p>
                  <div className="absolute right-8 top-4 flex items-center gap-2">
                    <Image src={ammex} alt="card" />
                    <p>4308</p>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <Mastercard />
                      <div>
                        <p className="font-[500] text-[14px] ">
                          Mastercard ending in 8480
                        </p>
                        <p className="font-[300] text-[12px] ">
                          Expiry 04/2026
                        </p>
                      </div>
                    </div>
                    <span className="bg-[#27AE60] border-[#474747] border rounded-full w-4 h-4 "></span>
                  </div>
                </AccordionContent>
              </AccordionItem>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
