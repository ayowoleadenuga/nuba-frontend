"use client";
import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import CalendarComp from "@/components/ui/calendar-component";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";

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
  dropdownButtonStyle?: string;
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
  dropdownButtonStyle,
  ...props
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateIsSelected, setDateIsSelected] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCalendar(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

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
            className={cn("absolute top-4 right-3", dropdownButtonStyle)}
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
          <div
            ref={calendarRef}
            className="fixed top-[10vh] right-0 md:right-4 z-[50]"
          >
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
