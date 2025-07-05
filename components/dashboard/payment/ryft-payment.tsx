import { RyftPaymentComponent } from "@/components/ryft/ryft-payment";
import { env } from "@/env";
import { useGetPaymentMethodsQuery } from "@/redux/features/paymentsApiSlice";
import {
  setMakePayment,
  setRentPaymentStatus,
} from "@/redux/features/paymentSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const RyftPayment = ({
  clientSecret,
  addPayment = true,
  buttonText = "Save Card",
}: {
  clientSecret: string | undefined;
  addPayment?: boolean;
  buttonText?: string;
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch: refreshPaymentMethods } = useGetPaymentMethodsQuery();

  const handlePaymentSuccess = () => {
    setIsLoading(true);
    if (addPayment) {
      setTimeout(() => {
        refreshPaymentMethods();
        toast.success("Payment added successfully");
        setIsLoading(false);
      }, 10000);
    } else {
      dispatch(setMakePayment("complete"));
      dispatch(setRentPaymentStatus("success"));
      setIsLoading(false);
    }
  };

  const handlePaymentFailure = () => {
    setIsLoading(false);
    if (addPayment) {
      toast.error("Error adding payment");
    } else {
      dispatch(setMakePayment("complete"));
      dispatch(setRentPaymentStatus("error"));
    }
  };

  return (
    <div className="bg-white p-6 mt-10">
      <RyftPaymentComponent
        publicKey={env.NEXT_PUBLIC_RYFT_PUBLIC_KEY}
        clientSecret={clientSecret as string}
        buttonText={buttonText}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentFailure}
        loading={isLoading}
        googlePay={{
          merchantIdentifier: "your_merchant_id",
          merchantName: "Your Business",
          merchantCountryCode: "US",
        }}
        applePay={{
          merchantName: "Your Business Name",
          merchantCountryCode: "US",
        }}
        fieldCollection={{
          billingAddress: {
            display: "full",
          },
        }}
      />
    </div>
  );
};

export default RyftPayment;
