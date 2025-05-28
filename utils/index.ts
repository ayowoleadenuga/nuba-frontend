import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateInput: string | Date | null): string => {
  const date = new Date(dateInput ? dateInput : "");
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const getOrdinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
};

export const handleCopy = async (
  requestId: string,
  setCopied: (value: React.SetStateAction<boolean>) => void
) => {
  try {
    await navigator.clipboard.writeText(requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export const formatDate2 = (dateString: Date) => {
  const date: Date = new Date(dateString);
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: number = date.getFullYear();
  const formattedDate: string = `${year}-${month}-${day}`;

  return formattedDate;
};
