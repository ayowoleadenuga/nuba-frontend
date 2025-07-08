"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { newRentPayload } from "@/types";
import { newRentSchema } from "@/utils/validator";
import { useRegisterTenancyDetailsMutation } from "@/redux/features/authApiSlice";
import { nubaApis } from "@/services/api-services";
import { formatDate } from "@/utils";
import {
  useAddNewRentMutation,
  useGetUserRentsQuery,
  useLazyGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
const AddNewRentForm = () => {
  const [getUserRents] = useLazyGetUserRentsQuery();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.rent.formData);
  const [addNewRent, { isLoading }] = useAddNewRentMutation();
  const [errors, setErrors] = React.useState<{
    [key in keyof newRentPayload]?: string;
  }>({});
  const [agreement, setAgreement] = useState(false);

  const formatNumberWithCommas = (value: string | number): string => {
    const num = String(value).replace(/[^\d]/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "monthlyRentAmt") {
      const numericValue = value.replace(/[^\d]/g, "");
      const formattedValue = formatNumberWithCommas(numericValue);
      dispatch(updateFormData({ [name]: formattedValue }));
    } else {
      dispatch(updateFormData({ [name]: value }));
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const onSubmit = async (formData: newRentPayload) => {
    await nubaApis.rent.handleAddNewRent(formData, addNewRent);
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = newRentSchema.safeParse({
      country: formData.country,
      startDate,
      endDate,
      rentFrequency: formData.rentFrequency,
      monthlyPrice: formData.monthlyPrice,
      address: formData.address,
      landlordAccountName: formData.landlordAccountName,
      landlordAccountNumber: formData.landlordAccountNumber,
      landlordSortCode: formData.landlordSortCode,
      landlordEmail: formData.landlordEmail,
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
    const payload = {
      country: formData.country,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      rentFrequency: formData.rentFrequency,
      monthlyPrice: Number(String(formData.monthlyPrice).replace(/[^\d]/g, "")),
      address: formData.address,
      landlordAccountName: formData.landlordAccountName,
      landlordAccountNumber: formData.landlordAccountNumber,
      landlordSortCode: formData.landlordSortCode,
      landlordEmail: formData.landlordEmail,
    };
    await onSubmit(payload);
    getUserRents();
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <form onSubmit={handleContinue} className="h-full ">
      <p className="text-[18px] font-[600] text-center my-3 ">
        Add Rent Details
      </p>
      <NubaInput
        containerClass={"w-full "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Country"
        name="country"
        value={formData?.country}
        dropdown
        dropdownItems={["United Kingdom"]}
        onChange={handleChange}
      />

      {errors.country && (
        <p className="text-red-500 text-start text-[12px]">{errors.country}</p>
      )}

      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0 cursor-pointer"
        label="Start Date"
        readOnly
        dropdownIcon
        setSelectedDate={setStartDate}
        name="startDate"
        onChange={() => {
          setErrors({ startDate: "" });
        }}
        value={startDate ? startDate.toLocaleDateString() : ""}
      />
      {errors.startDate && (
        <p className="text-red-500 text-[12px]">{errors.startDate}</p>
      )}
      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0 cursor-pointer"
        label="End Date"
        readOnly
        dropdownIcon
        setSelectedDate={setEndDate}
        name="endDate"
        onChange={() => {
          setErrors({ endDate: "" });
        }}
        value={endDate ? endDate.toLocaleDateString() : ""}
      />
      {errors.endDate && (
        <p className="text-red-500 text-[12px]">{errors.endDate}</p>
      )}
      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Rent Frequency"
        name="rentFrequency"
        value={formData?.rentFrequency}
        dropdown
        dropdownItems={[
          "Monthly",
          "Every 2 months",
          "Every 3 months",
          "Every 4 months",
          "Every 5 months",
          "Every 2 months",
          "Yearly",
        ]}
        onChange={handleChange}
      />
      {errors.rentFrequency && (
        <p className="text-red-500 text-[12px]">{errors.rentFrequency}</p>
      )}

      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Monthly Rent Amount"
        name="monthlyPrice"
        type="number"
        value={formData?.monthlyPrice.toLocaleString()}
        onChange={handleChange}
      />
      {errors.monthlyPrice && (
        <p className="text-red-500 text-[12px]">{errors.monthlyPrice}</p>
      )}
      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      {errors.address && (
        <p className="text-red-500 text-[12px]">{errors.address}</p>
      )}

      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Landlord Account Name"
        name="landlordAccountName"
        value={formData.landlordAccountName}
        onChange={handleChange}
      />
      {errors.landlordAccountName && (
        <p className="text-red-500 text-[12px]">{errors.landlordAccountName}</p>
      )}

      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Landlord Account Number"
        name="landlordAccountNumber"
        value={formData?.landlordAccountNumber}
        onChange={handleChange}
      />
      {errors.landlordAccountNumber && (
        <p className="text-red-500 text-[12px]">
          {errors.landlordAccountNumber}
        </p>
      )}

      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Landlord Sort Code"
        name="landlordSortCode"
        value={formData?.landlordSortCode}
        onChange={handleChange}
      />
      {errors.landlordSortCode && (
        <p className="text-red-500 text-[12px]">{errors.landlordSortCode}</p>
      )}

      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Landlord Email"
        name="landlordEmail"
        value={formData?.landlordEmail}
        onChange={handleChange}
      />
      {errors.landlordEmail && (
        <p className="text-red-500 text-[12px]">{errors.landlordEmail}</p>
      )}
      <Button
        disabled={!agreement || isLoading}
        type="submit"
        className="w-full mt-7"
      >
        {isLoading ? "Uploading tenancy details" : "Continue"}
      </Button>
      <span className="font-[700] text-[12px] text- mt-5 flex items-center gap-2 w-full ">
        <input
          type="checkbox"
          className="w-4 h-4 accent-black "
          checked={agreement}
          onChange={() => setAgreement(!agreement)}
        />
        Please confirm that the amount here matches the actual rent amount on
        the tenancy agreement, payment wont go through otherwise
      </span>
    </form>
  );
};
export default AddNewRentForm;
