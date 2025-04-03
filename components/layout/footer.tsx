import React from "react";
import Image from "next/image";
import Link from "next/link";
import IgIcon from "@/assets/svg/ig-icon";
import XIcon from "@/assets/svg/x-icon";
import YoutubeIcon from "@/assets/svg/youtube-icon";
import LinkedinIcon from "@/assets/svg/linkedin-icon";
import FbIcon from "@/assets/svg/fb-icon";

const Footer = () => {
  return (
    <footer className="bg-black h-[70vh] flex gap-10 lg:gap-0 lg:flex-row flex-col items-start justify-between p-5 md:p-10 lg:p-[120px] text-white text-[14px] ">
      <div className="w-full lg:w-[50%] h-full flex flex-col justify-start gap-10 md:justify-between">
        <div>
          <Image
            height={46}
            width={94}
            src="/assets/nuba-logo.svg"
            alt="Nkeji-Logo"
          />
          <div className="flex items-center gap-[10px] mt-4 ">
            <button>
              <IgIcon />
            </button>
            <button>
              <XIcon />
            </button>
            <button>
              <FbIcon />
            </button>
            <button>
              <YoutubeIcon />
            </button>
            <button>
              <LinkedinIcon />
            </button>
          </div>
        </div>
        <div>
          <p className="mt-4 font-[300] ">
            © {new Date().getFullYear()} Nuba Rewards. All rights reserved.
            <br /> Nuba Payments LLC
          </p>
        </div>
      </div>
      <div className="w-full lg:w-[50%]  flex justify-between items-start font-[600] ">
        <div className=" text- flex flex-col  space-y-4">
          <Link href="/" className="">
            Terms & Conditions
          </Link>
          <Link href="/" className="">
            Terms of Use
          </Link>
          <Link href="/" className=" ">
            Privacy Center
          </Link>
          <Link href="/" className="">
            Help Center
          </Link>
          <Link href="/" className="">
            App
          </Link>
        </div>

        <div className=" text- flex flex-col   space-y-4">
          <Link href="/contact-us" className="">
            Contact Us
          </Link>
          <Link href="/" className="">
            Careers
          </Link>
          <Link href="/" className=" ">
            Nuba: Real Estate Partners
          </Link>
          <Link href="/" className=" ">
            Newsroom
          </Link>
          <Link href="/" className=" ">
            Privacy Settings
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
