import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

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

export const formatDate2 = (dateString: Date | string) => {
  const date: Date = new Date(dateString);
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: number = date.getFullYear();
  const formattedDate: string = `${year}-${month}-${day}`;

  return formattedDate;
};

export const formatDate3 = (date: Date) => {
  return date.toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Format date to yyyy-mm-dd
export const formatDate4 = (date: Date) => date.toISOString().split("T")[0];

export const getNextPaymentDate = (startDateStr: string): Date => {
  const today = new Date();
  let date = new Date(startDateStr);

  while (date < today) {
    date.setMonth(date.getMonth() + 1);
  }

  return date;
};

export const formatDateToDisplay = (
  date: Date
): { day: number; month: string } => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return { day, month };
};

export const getDaySuffix = (day: number | undefined | null): string => {
  if (typeof day !== "number") return "";
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
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

export const getDaysLeft = (nextPaymentDate: Date): number => {
  const today = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  const diffInTime = nextPaymentDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / oneDay);

  return diffInDays;
};

export const formatDateToDDMMYYYY = (dateStr: string): string => {
  const date = parseISO(dateStr);
  return format(date, "dd/MM/yyyy");
};

export const dayOptions = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";
  return `${day}${suffix}`;
});

export const capitalizeFirstLetter = (str: string | undefined): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const collectBrowserInfo = (idAddress?: string) => ({
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  colorDepth: window.screen.colorDepth,
  language: navigator.language,
  userAgent: navigator.userAgent,
  timezone: new Date().getTimezoneOffset(),
});
