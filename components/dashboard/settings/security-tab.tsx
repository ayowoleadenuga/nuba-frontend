import NubaInput from "@/components/ui/nuba-input";
import { setSettingsField } from "@/redux/features/settings-slice";
import { RootState } from "@/redux/store";
import { SettingsState } from "@/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface SecurityTabProps {
  errors: Partial<Record<keyof SettingsState, string>>;
  onClearError?: (field: keyof SettingsState) => void;
}
const SecurityTab: React.FC<SecurityTabProps> = ({ errors, onClearError }) => {
  const { oldPassword, newPassword, confirmPassword } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();

  const handleChange = (field: keyof SettingsState, value: string) => {
    dispatch(setSettingsField({ field, value }));

    if (value && errors[field]) {
      onClearError?.(field);
    }
  };

  return (
    <div>
      <div className="w-full mb-10  ">
        <div className="w-full border-b border-b-[#E2E8F0] pb-1 ">
          <p className="font-[600] text-[12px] text-[#2A4152] ">Security</p>
          <p className="text-[10px] bo ">Manage your security settings.</p>
        </div>
        <div className="w-full border-b border-b-[#E2E8F0] pb-6 ">
          <div className="w-full md:w-[70%] xl:w-[50%] ">
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Old Password"
              placeholder=""
              name="oldPassword"
              type="password"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={oldPassword}
              onChange={(e) => handleChange("oldPassword", e.target.value)}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-[12px]">{errors.oldPassword}</p>
            )}
            <NubaInput
              containerClass={"w-full mt-6"}
              label="New Password"
              placeholder=""
              name="newPassword"
              type="password"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-[12px]">{errors.newPassword}</p>
            )}

            <NubaInput
              containerClass={"w-full mt-6"}
              label="Confirm Password"
              type="password"
              placeholder=""
              name="confirmPassword"
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-[12px]">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
