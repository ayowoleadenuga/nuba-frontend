"use client";
import DashboardLayoutWrapper from "@/components/layout/dashboard-layout-wrapper";
import MobileLayoutWrapper from "@/components/layout/mobile-layout-wrapper";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" h-[100vh]  w-full flex ">
      <div className=" h-[100vh]   w-full hidden md:flex">
        <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
      </div>
      <div className=" h-[100vh]   w-full md:hidden block">
        <MobileLayoutWrapper>{children}</MobileLayoutWrapper>
      </div>
    </div>
  );
};

export default DashboardLayout;
