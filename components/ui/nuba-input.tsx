"use client";
import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import { cn } from "@/utils";
import { useState } from "react";

interface RequestProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isRequired?: boolean;
  containerClass?: string;
  prependContent?: React.ReactNode | undefined;
  dropdown?: boolean;
  dropdownItems?: string[];
}

const NubaInput: React.FC<RequestProps> = ({
  label,
  isRequired,
  containerClass,
  prependContent,
  dropdown,
  dropdownItems = [],
  type,
  ...props
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.value || "");

  const handleSelectItem = (item: string) => {
    setSelectedValue(item);
    setIsDropdownOpen(false);
  };

  return (
    <div className={cn("flex flex-col space-y-1 text-[14px]", containerClass)}>
      <label htmlFor={label}>
        <p className="font-[500] text-[12px] ">{label}</p>

        {isRequired && <span className="text-red-500">*</span>}
      </label>
      {prependContent}
      <div className={cn("w-full relative", containerClass)}>
        <input
          type={type || "text"}
          id={label}
          placeholder={props.placeholder}
          className={`border-b font-[500] border-black w-full h-10 outline-none p-3 ${
            prependContent ? "pl-10" : ""
          }`}
          value={selectedValue}
          readOnly={dropdown}
          {...props}
        />
        {dropdown && (
          <button
            type="button"
            className="absolute top-4 right-3"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <ArrowDownIcon fill="" width={15} height={15} />
          </button>
        )}
        {dropdown && isDropdownOpen && (
          <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {dropdownItems.map((item, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NubaInput;
