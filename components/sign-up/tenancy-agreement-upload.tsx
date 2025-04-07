import { Button } from "@/components/ui/button";
import NubaInput from "@/components/ui/nuba-input";
import UploadFile from "@/components/ui/upload-file";
import { nextStep, updateFormData } from "@/redux/features/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TenancyAgreementUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tenancyAgreement, paymentReference } = useSelector(
    (state: RootState) => state.signup.formData
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(updateFormData({ [event.target.name]: file }));
    }
  };

  const handleClearFile = () => {
    dispatch(updateFormData({ tenancyAgreement: null }));
  };

  return (
    <div className="w-[45%] ">
      <p className="text-[28px] font-[600] text-center mb-10 ">
        Tenancy Agreement Upload
      </p>
      <UploadFile
        description="Upload Tenancy Agreemment"
        containerClass={["py-[90px]"]}
        handleFileChange={handleFileChange}
        handleClearFile={handleClearFile}
        selectedFile={tenancyAgreement as File | null}
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
        disabled={!paymentReference || !tenancyAgreement}
        className="w-full mt-10"
        onClick={() => dispatch(nextStep())}
      >
        Continue
      </Button>
    </div>
  );
};

export default TenancyAgreementUpload;
