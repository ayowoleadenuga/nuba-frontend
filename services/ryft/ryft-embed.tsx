"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type Ryft = any; // ideally import from Ryft types

export function RyftEmbed({ clientSecret }: { clientSecret: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ryftLoaded, setRyftLoaded] = useState(false);

  return (
    <>
      <Script
        src="https://js.ryftpay.com/embedded-sdk.js"
        strategy="afterInteractive"
        onLoad={() => setRyftLoaded(true)}
      />
      <div ref={containerRef} />
      <form id="ryft-pay-form">
        <button
          // onClick={() => {
          //   Ryft?.init({
          //     publicKey: "{{API public key}}",
          //     clientSecret: "{{client secret}}", // optional here - this can be supplied on Ryft.attemptPayment()
          //   });
          // }}
          id="ryft-pay-btn"
        >
          PAY GBP 24.99
        </button>
        <div id="ryft-pay-error"></div>
      </form>
      {ryftLoaded &&
        containerRef.current &&
        ((window as any).Ryft as Ryft)?.embed({
          clientSecret,
          container: containerRef.current,
          onSuccess: (paymentResult: any) => {
            console.log(" Payment success", paymentResult);
            // Handle post-payment (e.g., call backend)
          },
          onError: (error: any) => {
            console.error("Payment failed", error);
          },
        })}
    </>
  );
}
