import { CancelIcon } from "@/assets/svg/cancel-icon";
import { Check } from "@/assets/svg/check";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import React from "react";

const AdminSettingsClient = () => {
  return (
    <div className="w-full p-5">
      <div className="w-full border-b border-b-[#E2E8F0] bg-[#edf1f4] mb-8 pt-5 pb-3 px-8 ">
        <p className="font-[600] text-[12px] text-[#2A4152] ">Admin Settings</p>
      </div>
      <div className="w-full mb-10 px-8 ">
        <div className="w-full border-b border-b-[#E2E8F0] pb-1 ">
          <p className="font-[600] text-[12px] text-[#2A4152] ">
            Account Settings
          </p>
        </div>
        <div className="w-full border-b border-b-[#E2E8F0] pb-6 ">
          <div className="w-[50%] ">
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Preferred Payment Method"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              dropdown
              dropdownItems={["Ammex", "Mastercard"]}
              //   value={preferredPaymnetMethod}
              //   onChange={e =>
              //     handleChange("preferredPaymnetMethod", e.target.value)
              //   }
            />
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Rent Due Date"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              dropdownIcon
              //   setSelectedDate={setRentDueDate}
              //   value={rentDueDate ? rentDueDate.toLocaleDateString() : ""}
              //   onChange={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full gap-5 ">
        <button className="text-[12px] font-[600] px-4 text-brandCore-orange border border-border rounded-[6px] flex items-center gap-2 ">
          Cancel <CancelIcon />
        </button>
        <Button
          type="submit"
          className="text-[12px] font-[600] flex items-center gap-2 "
        >
          Save Settings <Check />
        </Button>
      </div>
    </div>
  );
};

export default AdminSettingsClient;
