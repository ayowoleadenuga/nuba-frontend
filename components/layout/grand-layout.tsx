// import Footer from "@/components/layout/footer";
// import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import React, { PropsWithChildren } from "react";

const GrandLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" ">
      {/* <Navbar /> */}
      <div className=" ">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default GrandLayout;
