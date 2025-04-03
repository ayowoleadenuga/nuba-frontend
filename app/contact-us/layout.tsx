import Footer from "@/components/layout/footer";
import React, { PropsWithChildren } from "react";

const ContactUsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" relative w-full  ">
      <div className=" ">{children}</div>
      <Footer />
    </div>
  );
};

export default ContactUsLayout;
