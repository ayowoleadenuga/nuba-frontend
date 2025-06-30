"use client";
import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import UploadFile from "@/components/ui/upload-file";
import { useUploadTenancyAgreementMutation } from "@/redux/features/authApiSlice";
import { nextStep, updateFormData } from "@/redux/features/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const TenancyAgreementUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [uploadTenancyAgreement, { isLoading }] =
    useUploadTenancyAgreementMutation();
  const [file, setFile] = useState<File | null>(null);

  const { paymentReference } = useSelector(
    (state: RootState) => state.signup.formData
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadTenancyAgreement(formData).unwrap();
      dispatch(nextStep());
      toast.success("Tenancy agreement uploaded");
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    }
  };

  return (
    <div className="w-full md:w-[65%] lg:w-[45%] ">
      <p className="text-[24px] md:text-[28px] font-[600] text-center my-10 ">
        Tenancy Agreement Upload
      </p>
      <UploadFile
        description="Upload Tenancy Agreemment"
        containerClass={["py-[90px]"]}
        handleFileChange={handleFileChange}
        handleClearFile={() => setFile(null)}
        selectedFile={file as File | null}
        name="tenancyAgreement"
      />
      <NubaInput
        containerClass={"w-full mt-7 "}
        inputClass=" rounded-[8px] bg-[#f2f6f9] border-b-0"
        label="Payment Reference"
        name="paymentReference"
        value={paymentReference}
        onChange={e =>
          dispatch(updateFormData({ paymentReference: e.target.value }))
        }
      />
      <Button
        disabled={!file || isLoading}
        className="w-full mt-10"
        onClick={handleSubmit}
      >
        {isLoading ? "Uploading" : "Continue"}
      </Button>
    </div>
  );
};

export default TenancyAgreementUpload;
