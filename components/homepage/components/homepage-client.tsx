import Revolutionize from "@/components/homepage/components/revolutionize";
import Home from "./home";
import React from "react";
import Navbar from "@/components/layout/navbar";
import PaymentMethods from "@/components/homepage/components/payment-methods";
import PayRent from "@/components/homepage/components/pay-rent";
import RentPayment from "@/components/homepage/components/rent-payment";
import JoinUs from "@/components/homepage/components/join-us";
import Faqs from "@/components/homepage/components/faqs";
import Footer from "@/components/layout/footer";

const HomepageClient = () => {
  return (
    <div className={`landingPageBgImage px-[120px `}>
      <Home />
      <Revolutionize />
      <PaymentMethods />
      <PayRent />
      <RentPayment />
      <JoinUs />
      <Faqs />
      <Footer />
    </div>
  );
};

export default HomepageClient;
