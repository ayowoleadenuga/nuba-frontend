"use client";
import { navLinks } from "@/components/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavigationProps {
  hasBg?: boolean;
}

const Navbar2: React.FC<NavigationProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visibleSection = entries.find(entry => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.3 }
    );

    navLinks.forEach(link => {
      const section = document.getElementById(link.navLink.replace("#", ""));
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="h-[80px] z-[1000] fixed top-0 md:px-[120px] px-4 w-full">
      <nav className="flex h-full text-white items-center  md:px-5  justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image
            height={46}
            width={94}
            src="/assets/nuba-logo.svg"
            alt="Nkeji-Logo"
          />
        </Link>

        <div className="hidden md:flex">
          <ul className="flex gap-5 lg:gap-9 items-center w-full font-[700] ">
            {navLinks.map((link, index) => (
              <a key={index} href={link.navLink} className="scroll-smooth">
                <span
                  className={`text-sm ${
                    activeSection === link.navLink.replace("#", "")
                      ? "font-[700]"
                      : ""
                  }`}
                >
                  {link.name}
                </span>
              </a>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          <button className=" text-black font-[700] md:block hidden cursor-pointer px-3 h-8 ">
            Login
          </button>
          <button className=" bg-white text-black font-[700] md:block hidden cursor-pointer px-3 rounded-[36px] h-8 ">
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
        </div>

        {isOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-start justify-start z-[100] p-5">
            <div className="relative flex justify-between w-full">
              <Link href="/" className="flex items-center gap-1">
                <Image
                  height={50}
                  width={50}
                  src="/assets/nkejiLogo.svg"
                  alt="Nkeji-Logo"
                />
                <h1 className="text-[24px] font-[500] text-[#1F2632]">nkeji</h1>
              </Link>
              <button className="text-black" onClick={() => setIsOpen(false)}>
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
            <ul className="text-black text-xl space-y-8 mt-10 ml-8 text-left">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.navLink} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/"
                  className="bg-brandCore-primary text-white px-6 py-2 rounded-[100px] w-full block text-center"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar2;
