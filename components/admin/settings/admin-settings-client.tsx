"use client";
import { CancelIcon } from "@/assets/svg/cancel-icon";
import { Check } from "@/assets/svg/check";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import {
  resetSettingsForm,
  setSettingsField,
} from "@/redux/features/settings-slice";
import { RootState } from "@/redux/store";
import { SettingsState } from "@/types";
import { changePasswordSettingsSchema } from "@/utils/validator";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminSettingsClient = () => {
  const { oldPassword, newPassword } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{
    [key in keyof SettingsState]?: string;
  }>({});

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (field: keyof SettingsState, value: string) => {
    dispatch(setSettingsField({ field, value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = changePasswordSettingsSchema.safeParse({
      oldPassword,
      newPassword,
    });

    const errorMessages: { [key: string]: string } = {};

    if (!result.success) {
      result.error.errors.forEach(err => {
        errorMessages[err.path[0]] = err.message;
      });
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    setErrors({});
    dispatch(resetSettingsForm());
  };

  return (
    <div className="w-full p-5">
      <div className="w-full border-b border-b-[#E2E8F0] bg-[#edf1f4] mb-8 pt-5 pb-3 px-8 ">
        <p className="font-[600] text-[12px] text-[#2A4152] ">Admin Settings</p>
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="w-full mb-10 px-8 ">
          <div className="w-full border-b border-b-[#E2E8F0] pb-1 ">
            <p className="font-[600] text-[12px] text-[#2A4152] ">
              Account Settings
            </p>
          </div>
          <div className="w-full border-b border-b-[#E2E8F0] pb-6 ">
            <div className="w-full md:w-[70%] xl:w-[50%] ">
              <NubaInput
                containerClass={"w-full mt-6"}
                label="Old Password"
                placeholder=""
                name="oldPassword"
                inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                value={oldPassword}
                onChange={e => handleChange("oldPassword", e.target.value)}
                type="password"
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-[12px]">{errors.oldPassword}</p>
              )}

              <NubaInput
                containerClass={"w-full mt-6"}
                label="New Password"
                placeholder=""
                name="newPassword"
                inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                value={newPassword}
                onChange={e => handleChange("newPassword", e.target.value)}
                type="password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-[12px]">{errors.newPassword}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full gap-5 ">
          <button className="text-[12px] font-[600] px-4 text-brandCore-orange border border-[#d9d9d9] rounded-[6px] flex items-center gap-2 ">
            Cancel <CancelIcon />
          </button>
          <Button
            type="submit"
            className="text-[12px] font-[600] flex items-center gap-2 "
          >
            Save Settings <Check />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsClient;
