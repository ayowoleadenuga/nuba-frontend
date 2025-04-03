import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}
export const GetStartedButton: React.FC<Props> = ({ className }) => {
  return (
    <Link href="/contact-us" passHref className="">
      <Button
        variant="ghost"
        className={`bg-black text-white rounded-[36px] h-10 px-7 font-bold ${className}`}
      >
        Get started now
      </Button>
    </Link>
  );
};
