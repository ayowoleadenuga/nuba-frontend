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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Not in Redux
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
