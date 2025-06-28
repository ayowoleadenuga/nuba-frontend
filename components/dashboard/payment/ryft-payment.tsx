import { RyftPaymentComponent } from "@/components/ryft/ryft-payment";
import { env } from "@/env";
import {
  setMakePayment,
  setRentPaymentStatus,
} from "@/redux/features/paymentSlice";
import React from "react";
import { useDispatch } from "react-redux";
// import { RyftPaymentComponent } from "ryft-react";
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

  const handlePaymentSuccess = () => {
    if (addPayment) {
      toast.success("Payment added successfully");
    } else {
      dispatch(setMakePayment("complete"));
      dispatch(setRentPaymentStatus("success"));
    }
  };
  const handlePaymentFailure = () => {
    if (addPayment) {
      toast.error("Error adding payment");
    } else {
      dispatch(setMakePayment("complete"));
      dispatch(setRentPaymentStatus("error"));
    }
  };

  console.log("add payment is", addPayment, "client secret", clientSecret);
  return (
    <div className="bg-white p-6 mt-10 ">
      {/* <RyftPaymentForm
                clientSecret={clientSecretData?.data?.token as string}
              /> */}
      <RyftPaymentComponent
        publicKey={env.NEXT_PUBLIC_RYFT_PUBLIC_KEY}
        clientSecret={clientSecret as string}
        buttonText={buttonText ?? "Pay Now"}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentFailure}
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
            display: "full", // "full", "minimum", or "none"
          },
          nameOnCard: true,
        }}
      />
    </div>
  );
};

export default RyftPayment;
