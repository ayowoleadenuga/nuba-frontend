import { skipToken } from "@reduxjs/toolkit/query/react";
import NubaInput from "@/components/ui/nuba-input";
import { setSettingsField } from "@/redux/features/settings-slice";
import { RootState } from "@/redux/store";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserRentsQuery,
  useGetUserRentsDetailsQuery,
  useGetUserProfileQuery,
} from "@/redux/features/authApiSlice";
import ErrorMessage from "../skeletons/error-message";
import { SettingsState } from "@/types";

interface DetailsTabProps {
  errors: Partial<Record<keyof SettingsState, string>>;
  onClearError?: (field: keyof SettingsState) => void;
}

const DetailsTab: FC<DetailsTabProps> = ({ errors, onClearError }) => {
  const {
    firstName,
    lastName,
    // email,
    phoneNumber,
    rentAddress,
    rentAmount,
    leaseDuration,
    landlordName,
    landlordbankDetails,
  } = useSelector((state: RootState) => state.settings);
  const user = useSelector((state: RootState) => state.signup.user);
  const dispatch = useDispatch();

  const { data: userProfileDetails } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const {
    data: rents,
    isError: isRentsError,
    error: rentsError,
  } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;

  const {
    data: rentDetails,
    isError: isRentDetailsError,
    error: rentDetailsError,
  } = useGetUserRentsDetailsQuery(firstRentId ?? skipToken);
  const rentDetail = rentDetails?.data;

  useEffect(() => {
    if (user) {
      dispatch(
        setSettingsField({
          field: "firstName",
          value: userProfile?.firstName ?? "",
        })
      );
      dispatch(
        setSettingsField({
          field: "lastName",
          value: userProfile?.lastName ?? "",
        })
      );
      dispatch(
        setSettingsField({
          field: "phoneNumber",
          value: userProfile?.phoneNumber ?? "",
        })
      );
    }
  }, [userProfile]);

  useEffect(() => {
    if (rentDetail) {
      dispatch(
        setSettingsField({
          field: "rentAddress",
          value: rentDetail?.country ?? "",
        })
      );
      dispatch(
        setSettingsField({
          field: "rentAmount",
          value: rentDetail.monthlyPrice?.toString() ?? "",
        })
      );
      dispatch(
        setSettingsField({ field: "leaseDuration", value: rentDetail.endDate })
      );
      dispatch(
        setSettingsField({
          field: "landlordName",
          value: rentDetail.landlord.accountName || "Not provided",
        })
      );
      dispatch(
        setSettingsField({
          field: "landlordbankDetails",
          value: rentDetail.landlord.accountNumber || "Not provided",
        })
      );
    }
  }, [rentDetail, dispatch]);

  const handleChange = (field: keyof RootState["settings"], value: string) => {
    dispatch(setSettingsField({ field, value }));

    if (value && errors[field]) {
      onClearError?.(field);
    }
  };

  return (
    <div>
      {isRentsError || isRentDetailsError ? (
        <ErrorMessage
          message={
            (rentsError as any)?.data?.message ??
            (rentDetailsError as any)?.data?.message ??
            "Unable to load rent data."
          }
        />
      ) : (
        <>
          <div className="w-full mb-10">
            <div className="w-full border-b border-b-[#E2E8F0] pb-1 ">
              <p className="font-[600] text-[12px] text-[#2A4152] ">
                Profile Details
              </p>
              <p className="text-[10px] ">Manage your rent payment profile.</p>
            </div>
            <div className="w-full border-b border-b-[#E2E8F0] pb-6 ">
              <div className="w-full md:w-[70%] xl:w-[50%] ">
                <NubaInput
                  containerClass={"w-full mt-6"}
                  label="First Name"
                  placeholder=""
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  value={firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-[12px]">{errors.firstName}</p>
                )}
                <NubaInput
                  containerClass={"w-full mt-6"}
                  label="Last Name"
                  placeholder=""
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  value={lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-[12px]">{errors.lastName}</p>
                )}

                {/* <NubaInput
              containerClass={"w-full mt-6"}
              label="Email"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={email}
              type="email"
              onChange={e => handleChange("email", e.target.value)}
            /> */}
                <NubaInput
                  containerClass={"w-full mt-6"}
                  label="Phone Number"
                  placeholder=""
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />

                {errors.phoneNumber && (
                  <p className="text-red-500 text-[12px]">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full my-10 ">
            <div className="flex items-center justify-between w-full border-b border-b-[#E2E8F0]">
              <div className=" pb-1 ">
                <p className="font-[600] text-[12px] text-[#2A4152] ">
                  Rent Information
                </p>
                <p className="text-[10px] bo ">
                  More information about your rent details.
                </p>
              </div>
              {/* <button className="font-[600] text-[12px] text-[#2A4152] underline ">
            Move Residence
          </button> */}
            </div>
            <div className="w-full border-b border-b-[#E2E8F0] pb-6 ">
              <div className="w-full md:w-[70%] xl:w-[50%]">
                <NubaInput
                  containerClass={"w-full mt-6"}
                  label="Rent Address"
                  placeholder=""
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  value={rentAddress ?? ""}
                  readOnly
                  // onChange={(e) => handleChange("rentAddress", e.target.value)}
                />
                <NubaInput
                  containerClass={"w-full mt-6"}
                  label="Rent Amount"
                  placeholder=""
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  value={`£${rentAmount ?? ""}`}
                  readOnly
                  // onChange={(e) => handleChange("rentAmount", e.target.value)}
                />
                <NubaInput
                  containerClass={"w-full mt-6"}
                  label="Lease Duration"
                  placeholder=""
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  value={leaseDuration ?? ""}
                  readOnly
                  // onChange={(e) => handleChange("leaseDuration", e.target.value)}
                />
                <NubaInput
                  containerClass={"w-full mt-6"}
                  label="Landlord's Name"
                  placeholder=""
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  value={landlordName ?? ""}
                  readOnly
                  // onChange={(e) => handleChange("landlordName", e.target.value)}
                />
                <NubaInput
                  containerClass={"w-full mt-6"}
                  label="Landlord's Bank Details"
                  placeholder=""
                  inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
                  value={landlordbankDetails ?? ""}
                  readOnly
                  // onChange={(e) =>
                  //   handleChange("landlordbankDetails", e.target.value)
                  // }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsTab;
