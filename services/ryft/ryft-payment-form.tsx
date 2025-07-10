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
        // publicKey: env.NEXT_PUBLIC_RYFT_PUBLIC_KEY,
        publicKey:
          "pk_sandbox_kimVdAdYA/3xMkVYz5icjS4nqqHFS+ghpxE1UJyVOhWrh7Ao8/DeM3hm8MKlJzFv",
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
    <form id="ryft-pay-form" onSubmit={handleSubmit} className="space-y-4">
      <div id="ryft-card-number" className="border rounded p-2" />
      <div id="ryft-expiry-date" className="border rounded p-2" />
      <div id="ryft-cvc" className="border rounded p-2" />
      <button
        className="bg-[#CF931D] rounded-[16px] w-full py-2 text-white font-semibold"
        id="pay-btn"
        ref={payButtonRef}
        disabled={!isReady}
      >
        PAY NOW
      </button>
      <div id="ryft-pay-error" />
    </form>
  );
}
