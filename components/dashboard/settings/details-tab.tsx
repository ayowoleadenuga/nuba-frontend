import NubaInput from "@/components/ui/nuba-input";
import { setSettingsField } from "@/redux/features/settings-slice";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailsTab = () => {
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
  const dispatch = useDispatch();
  const handleChange = (field: keyof RootState["settings"], value: string) => {
    dispatch(setSettingsField({ field, value }));
  };

  return (
    <div>
      <div className="w-full mb-10  ">
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
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Last Name"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
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
              value={rentAddress}
              onChange={(e) => handleChange("rentAddress", e.target.value)}
            />
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Rent Amount"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={rentAmount}
              onChange={(e) => handleChange("rentAmount", e.target.value)}
            />
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Lease Duration"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={leaseDuration}
              onChange={(e) => handleChange("leaseDuration", e.target.value)}
            />
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Landlord's Name"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={landlordName}
              onChange={(e) => handleChange("landlordName", e.target.value)}
            />
            <NubaInput
              containerClass={"w-full mt-6"}
              label="Landlord's Bank Details"
              placeholder=""
              inputClass="bg-[#edf1f4] rounded-[8px] border-0 text-[12px] "
              value={landlordbankDetails}
              onChange={(e) =>
                handleChange("landlordbankDetails", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
