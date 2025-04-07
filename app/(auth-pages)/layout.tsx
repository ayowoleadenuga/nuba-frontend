"use client";
import { NubaLogo } from "@/public/assets/nuba-logo";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

const FeaturesLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <div className=" h-[100vh]  w-full px-6 md:px-[60px] lg:px-[120px] overflow-hidden">
      <header className="h-[80px] bg-whi flex items-center z-[50] fixed top-0 w-[calc(100%-48px)]  md:w-[calc(100%-120px)] lg:w-[calc(100%-240px)] ">
        <button onClick={() => router.push("/")} className="">
          <NubaLogo />
        </button>
      </header>
      <div className=" h-[calc(100%-80px)] mt-[80px] w-full overflow-auto ">
        <div>{children} </div>
      </div>
    </div>
  );
};

export default FeaturesLayout;
