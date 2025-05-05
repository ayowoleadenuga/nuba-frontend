import MobileNavbar from "@/components/layout/mobile-navbar";
import React from "react";

const MobileLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <MobileNavbar /> <div className="mt-[70px] ">{children} </div>
    </div>
  );
};

export default MobileLayoutWrapper;
