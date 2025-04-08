"use client";
import { navLinks } from "@/components/constants";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavigationProps {
  hasBg?: boolean;
}

const Navbar: React.FC<NavigationProps> = ({ hasBg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="h-[80px] z-[1000] absolute top-0 w-[calc(100%-48px)]   md:w-[calc(100%-120px)] lg:w-[calc(100%-240px)] ">
      <nav className="flex h-full text-white items-center  md:px-5  justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image
            height={46}
            width={94}
            src="/assets/nuba-logo.svg"
            alt="Nuba"
          />
        </Link>

        <div className="hidden md:flex">
          <ul className="flex gap-5 lg:gap-9 items-center w-full  ">
            {navLinks.map((link, index) => (
              <a key={index} href={link.navLink} className="scroll-smooth">
                <span
                  className={`text-sm ${
                    pathname === link.navLink ? "font-[700]" : ""
                  }`}
                >
                  {link.name}
                </span>
              </a>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          {/* <GetStartedButton className="bg-white text-black hidden md:block " /> */}
          <button
            onClick={() => router.push("/login")}
            className={cn(
              "font-[700] md:block hidden cursor-pointer px-3 h-8",
              hasBg ? "text-white" : "text-black"
            )}
          >
            Login
          </button>

          <button
            onClick={() => router.push("/sign-up")}
            className=" bg-white text-black font-[700] md:block hidden cursor-pointer px-3 rounded-[36px] h-8 "
          >
            Register
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-0 left-0 w-full h-screen  backdrop-blur-xl  text-white flex flex-col items-start justify-start z-[100] p-5">
            <div className="relative flex justify-between w-full">
              <Link href="/" className="flex items-center gap-1">
                <Image
                  height={50}
                  width={50}
                  src="/assets/nuba-logo.svg"
                  alt="Nuba"
                />
              </Link>
              <button className="" onClick={() => setIsOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
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
              {/* <li>
                <GetStartedButton className="bg-white text-black md:hidden block " />
              </li> */}
              <li>
                <button
                  onClick={() => router.push("/login")}
                  className={cn(
                    "font-[700] cursor-pointer px-3 h-8",
                    hasBg ? "text-white" : "text-black"
                  )}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/sign-up")}
                  className=" bg-white text-black font-[700]  cursor-pointer px-3 rounded-[36px] h-8 "
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
