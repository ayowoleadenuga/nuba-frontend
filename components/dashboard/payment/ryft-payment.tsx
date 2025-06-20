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
  addPayment,
  buttonText,
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
  return (
    <div className="bg-white p-6 mt-10 ">
      {/* <RyftPaymentForm
                clientSecret={clientSecretData?.data?.token as string}
              /> */}
      <RyftPaymentComponent
        publicKey={env.NEXT_PUBLIC_RYFT_PUBLIC_KEY}
        clientSecret={clientSecret as string}
        buttonText={buttonText ?? "Pay Now"}
        //   amount={100}
        //   currency="usd"
        //   onSuccess={onSuccess}
        //   onError={onError}
        //   onPaymentCancel={onPaymentCancel}
        //   onPaymentError={onPaymentError}
        //   onPaymentSuccess={onPaymentSuccess}
        //   onPaymentCancel={onPaymentCancel}
        //   onPaymentError={onPaymentError}
        //   onPaymentSuccess={onPaymentSuccess}
        //   onPaymentCancel={onPaymentCancel}
        //   onPaymentError={onPaymentError}
        //   onPaymentSuccess={onPaymentSuccess}
        //   onPaymentCancel={onPaymentCancel}
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
            display: "minimum", // "full", "minimum", or "none"
          },
        }}
      />
    </div>
  );
};

export default RyftPayment;
