"use client";
import { navLinks } from "@/components/constants";
import { NubaLogo } from "@/public/assets/nuba-logo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import React, { PropsWithChildren, useState } from "react";

const FeaturesLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" h-[100vh]  w-full px-6 md:px-[60px] lg:px-[120px] overflow-hidden">
      <header className="h-[80px] flex items-center justify-between z-[50] fixed top-0 w-[calc(100%-48px)]  md:w-[calc(100%-120px)] lg:w-[calc(100%-240px)] ">
        <button onClick={() => router.push("/")} className="">
          <NubaLogo />
        </button>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-0 left-0 w-full h-[100vh]  backdrop-blur-xl flex flex-col items-start justify-start z-[100] p-5">
              <div className="relative flex justify-between w-full">
                <Link href="/" className="flex items-center gap-1">
                  <NubaLogo />
                </Link>
                <button className="" onClick={() => setIsOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <ul className=" text-xl space-y-8 mt-10 ml-8 text-left">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.navLink} onClick={() => setIsOpen(false)}>
                      {link.name}
                    </a>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/login");
                    }}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/sign-up");
                    }}
                    className=" bg-white text-black font-[700]  cursor-pointer px-3 rounded-[36px] h-8 "
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className=" h-[calc(100%-80px)] mt-[80px] w-full overflow-auto ">
        <div>{children} </div>
      </div>
    </div>
  );
};

export default FeaturesLayout;
