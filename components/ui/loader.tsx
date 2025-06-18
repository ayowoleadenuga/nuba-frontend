import { cn } from "@/utils";

interface LoaderProps {
  customStyle?: string;
}
export const Loader: React.FC<LoaderProps> = customStyle => {
  return (
    <div
      className={cn(
        "animate-spin border-brandCore-orange border-dashed  border-[4px] rounded-full w-10 h-10 ",
        customStyle
      )}
    ></div>
  );
};
