"use client";
import DashboardLayoutWrapper from "@/components/layout/dashboard-layout-wrapper";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" h-[100vh]  w-full flex ">
      <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
    </div>
  );
};

export default DashboardLayout;
