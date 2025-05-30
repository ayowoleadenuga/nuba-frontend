"use client";

import DashboardLayoutWrapper from "@/components/layout/dashboard-layout-wrapper";
import MobileLayoutWrapper from "@/components/layout/mobile-layout-wrapper";
import { PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.signup.user);
  const userAll = useSelector((state: RootState) => state.signup);

  useEffect(() => {
    // !userAll?.token || !user?.onboarding?.isOnboarded
    if (!userAll?.token) {
      router.push(`/login?redirectTo=${pathname}`);
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="h-[100vh] w-full flex">
      <div className="h-[100vh] w-full hidden md:flex">
        <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
      </div>
      <div className="h-[100vh] w-full md:hidden block">
        <MobileLayoutWrapper>{children}</MobileLayoutWrapper>
      </div>
    </div>
  );
};

export default DashboardLayout;
