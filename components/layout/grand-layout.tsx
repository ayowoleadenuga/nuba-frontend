// import Footer from "@/components/layout/footer";
// import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import React, { PropsWithChildren } from "react";

const GrandLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>{children}</div>
  );
};

export default GrandLayout;
