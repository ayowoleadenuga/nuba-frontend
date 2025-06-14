// components/RyftPaymentForm.tsx
import { env } from "@/env";
import { useEffect, useRef, useState } from "react";

export default function RyftPaymentForm({
  clientSecret,
}: //   setShowPaymentForm,
{
  clientSecret: string;
  //   setShowPaymentForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isReady, setIsReady] = useState(false);
  const payButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embedded.ryftpay.com/v2/ryft.min.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      Ryft.init({
        publicKey: env.NEXT_PUBLIC_RYFT_PUBLIC_KEY,
        clientSecret,
      });

      // @ts-ignore
      Ryft.addEventHandler("cardValidationChanged", e => {
        if (payButtonRef.current) {
          payButtonRef.current.disabled = !e.isValid;
        }
      });

      setIsReady(true);
    };

    document.body.appendChild(script);
  }, [clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // @ts-ignore
    Ryft.attemptPayment()
      .then((session: any) => {
        if (session.status === "Approved" || session.status === "Captured") {
          alert("Payment successful!");
        } else if (session.lastError) {
          // @ts-ignore
          const errMsg = Ryft.getUserFacingErrorMessage(session.lastError);
          alert(errMsg);
        }
      })
      .catch(() => {
        alert("Payment attempt failed.");
      });
  };

  return (
    <form id="ryft-pay-form" onSubmit={handleSubmit}>
      <button
        className="bg-[#CF931D] rounded-[16px] w-full  "
        id="pay-btn"
        ref={payButtonRef}
        disabled
      >
        PAY NOW
      </button>
      <div id="ryft-pay-error" />
    </form>
  );
}
