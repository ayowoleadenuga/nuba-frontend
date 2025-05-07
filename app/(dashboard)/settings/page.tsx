import SettingsClient from "@/components/dashboard/settings/settings-client";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-[500px] flex items-center justify-center animate-pulse ">
          Loading settings...
        </div>
      }
    >
      <SettingsClient />
    </Suspense>
  );
};

export default page;
