"use client";
import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import CalendarComp from "@/components/ui/calendar-component";
import { cn } from "@/utils";
import { useState } from "react";

interface RequestProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isRequired?: boolean;
  containerClass?: string;
  prependContent?: React.ReactNode | undefined;
  dropdown?: boolean;
  dropdownIcon?: boolean;
  setSelectedDate?: (date: Date | null) => void;
  dropdownItems?: string[];
  inputClass?: string;
}

const NubaInput: React.FC<RequestProps> = ({
  label,
  isRequired,
  containerClass,
  prependContent,
  dropdown,
  dropdownIcon,
  dropdownItems = [],
  type,
  inputClass,
  setSelectedDate,
  onChange,
  value,
  name,
  ...props
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateIsSelected, setDateIsSelected] = useState(false);

  const handleSelectItem = (item: string) => {
    setIsDropdownOpen(false);
    if (onChange) {
      onChange({
        target: {
          name: name || "",
          value: item,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={cn("flex flex-col space-y-1 text-[14px]", containerClass)}>
      <label htmlFor={label}>
        <p className="font-[500] text-[12px] ">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </p>
      </label>
      {prependContent}
      <div className={cn("w-full relative", containerClass)}>
        <input
          onClick={() => dropdownIcon && setShowCalendar(!showCalendar)}
          type={type || "text"}
          id={label}
          placeholder={props.placeholder}
          className={cn(
            "border-b font-[500] border-black w-full h-10 outline-none p-3",
            prependContent ? "pl-10" : "",
            inputClass
          )}
          value={value}
          readOnly={dropdown}
          name={name}
          onChange={onChange}
          {...props}
        />
        {(dropdown || dropdownIcon) && (
          <button
            type="button"
            className="absolute top-4 right-3"
            onClick={e => {
              e.preventDefault();
              if (dropdownIcon) setShowCalendar(!showCalendar);
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <ArrowDownIcon fill="" width={15} height={15} />
          </button>
        )}
        {dropdown && isDropdownOpen && (
          <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[250px] overflow-y-auto">
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
        {dropdownIcon && showCalendar && (
          <div className="fixed top-[7vh] right-4 z-[50]">
            <CalendarComp
              setShowCalendar={setShowCalendar}
              setSelectedDate={setSelectedDate}
              setDateIsSelected={setDateIsSelected}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NubaInput;
