import React, { useEffect, useState, useRef } from "react";
import {
  RyftPaymentComponentProps,
  RyftConfig,
  PaymentSession,
  RyftError,
  CardValidationEvent,
  WalletPaymentEvent,
} from "@/types/ryft-type";

// Global loading promise to prevent multiple simultaneous script loads
let scriptLoadingPromise: Promise<void> | null = null;

export const RyftPaymentComponent: React.FC<RyftPaymentComponentProps> = ({
  publicKey = "pk_sandbox_123",
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
  accountId,
  applePay,
  googlePay,
  disableGooglePay = false,
  fieldCollection,
  className = "",
  buttonText = "PAY NOW",
  disabled = false,
  onPaymentLoadingChange,
}) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ryftInitialized = useRef<boolean>(false);
  const baseUrl = "https://embedded.ryftpay.com/v2/ryft.min.js";

  useEffect(() => {
    // Load Ryft SDK if not already loaded
    const loadRyftSDK = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // If Ryft is already available, resolve immediately
        if (window.Ryft) {
          resolve();
          return;
        }

        // If script is already loading, return the existing promise
        if (scriptLoadingPromise) {
          scriptLoadingPromise.then(resolve).catch(reject);
          return;
        }

        // Check if script tag already exists
        const existingScript = document.querySelector(
          `script[src="${baseUrl}"]`
        );
        if (existingScript) {
          // Script exists but Ryft might not be loaded yet, wait for it
          const checkRyft = () => {
            if (window.Ryft) {
              resolve();
            } else {
              setTimeout(checkRyft, 100);
            }
          };
          checkRyft();
          return;
        }

        // Create new loading promise
        scriptLoadingPromise = new Promise((scriptResolve, scriptReject) => {
          const script = document.createElement("script");
          script.src = baseUrl;
          script.async = true;

          script.onload = () => {
            scriptLoadingPromise = null;
            scriptResolve();
          };

          script.onerror = () => {
            scriptLoadingPromise = null;
            scriptReject(new Error("Failed to load Ryft SDK"));
          };

          document.head.appendChild(script);
        });

        scriptLoadingPromise.then(resolve).catch(reject);
      });
    };

    const initializeRyft = async (): Promise<void> => {
      try {
        await loadRyftSDK();

        if (!ryftInitialized.current && clientSecret && window.Ryft) {
          const config: RyftConfig = {
            publicKey,
            clientSecret,
          };

          // Add optional configurations
          if (accountId) {
            config.accountId = accountId;
          }

          if (applePay) {
            config.applePay = applePay;
          }

          // Only add Google Pay if it's available and supported
          if (googlePay && !disableGooglePay) {
            // Check if Google Pay is supported in this environment
            const isGooglePaySupported = () => {
              try {
                // Check if running in a secure context (HTTPS or localhost)
                if (!window.isSecureContext) {
                  console.warn(
                    "Google Pay requires a secure context (HTTPS or localhost)"
                  );
                  return false;
                }

                // Check if Google Pay API is available
                if (
                  typeof window.google === "undefined" ||
                  !window.google.payments
                ) {
                  console.warn("Google Pay API not available");
                  return false;
                }

                return true;
              } catch (error) {
                console.warn("Google Pay support check failed:", error);
                return false;
              }
            };

            if (isGooglePaySupported()) {
              config.googlePay = googlePay;
            } else {
              console.warn(
                "Google Pay configuration provided but not supported in this environment. Google Pay will be disabled."
              );
            }
          }

          if (fieldCollection) {
            config.fieldCollection = fieldCollection;
          }

          try {
            window.Ryft.init(config);
            ryftInitialized.current = true;

            // Set up event handlers
            window.Ryft.addEventHandler(
              "cardValidationChanged",
              (e: CardValidationEvent) => {
                setIsFormValid(e.isValid);
              }
            );

            // Add wallet payment event handler if Apple Pay or Google Pay is configured
            if (applePay || googlePay) {
              window.Ryft.addEventHandler(
                "walletPaymentSessionResult",
                (e: WalletPaymentEvent) => {
                  handlePaymentResult(e.paymentSession);
                }
              );
            }

            // Inject custom styles for the country dropdown
            const style = document.createElement("style");
            style.innerHTML = `
              .ryft-form-group select {
                padding-left: 1.5em !important;
                min-width: 0;
                box-sizing: border-box;
              }
            `;
            document.head.appendChild(style);
          } catch (initError) {
            console.error("Ryft initialization failed:", initError);

            // If Google Pay caused the issue, try reinitializing without it
            if (
              googlePay &&
              initError instanceof Error &&
              initError.message &&
              initError.message.includes("google")
            ) {
              console.warn("Retrying initialization without Google Pay...");
              const fallbackConfig = { ...config };
              delete fallbackConfig.googlePay;

              try {
                window.Ryft.init(fallbackConfig);
                ryftInitialized.current = true;

                // Set up event handlers
                window.Ryft.addEventHandler(
                  "cardValidationChanged",
                  (e: CardValidationEvent) => {
                    setIsFormValid(e.isValid);
                  }
                );

                if (applePay) {
                  window.Ryft.addEventHandler(
                    "walletPaymentSessionResult",
                    (e: WalletPaymentEvent) => {
                      handlePaymentResult(e.paymentSession);
                    }
                  );
                }

                // Inject custom styles for the country dropdown
                const style = document.createElement("style");
                style.innerHTML = `
                  .ryft-form-group select {
                    padding-left: 1.5em !important;
                    min-width: 0;
                    box-sizing: border-box;
                  }
                `;
                document.head.appendChild(style);

                // console.log("Ryft initialized successfully without Google Pay");
              } catch (fallbackError) {
                console.error(
                  "Fallback initialization also failed:",
                  fallbackError
                );
                setError(
                  "Failed to initialize payment system. Please refresh the page."
                );
              }
            } else {
              setError(
                "Failed to initialize payment system. Please refresh the page."
              );
            }
          }
        }
      } catch (error) {
        console.error("Failed to load Ryft SDK:", error);
        setError("Failed to load payment system. Please refresh the page.");
      }
    };

    initializeRyft();

    // Cleanup function to reset initialization flag when component unmounts
    return () => {
      ryftInitialized.current = false;
    };
  }, [
    publicKey,
    clientSecret,
    accountId,
    applePay,
    googlePay,
    disableGooglePay,
    fieldCollection,
  ]);

  useEffect(() => {
    if (typeof onPaymentLoadingChange === "function") {
      onPaymentLoadingChange(isLoading);
    }
  }, [isLoading, onPaymentLoadingChange]);

  const handlePaymentResult = (paymentSession: PaymentSession): void => {
    setIsLoading(false);

    if (
      paymentSession.status === "Approved" ||
      paymentSession.status === "Captured"
    ) {
      setError("");
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentSession);
      }
      return;
    }

    if (paymentSession.lastError && window.Ryft) {
      const userFacingError = window.Ryft.getUserFacingErrorMessage(
        paymentSession.lastError
      );
      setError(userFacingError);
      if (onPaymentError) {
        onPaymentError(paymentSession.lastError, userFacingError);
      }
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!window.Ryft) {
      setError("Payment system not initialized");
      return;
    }

    if (disabled) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const paymentSession = await window.Ryft.attemptPayment();
      handlePaymentResult(paymentSession);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = "Payment failed. Please try again.";
      setError(errorMessage);

      if (onPaymentError && error instanceof Error) {
        const ryftError: RyftError = {
          code: "PAYMENT_FAILED",
          message: error.message,
          type: "payment_error",
        };
        onPaymentError(ryftError, errorMessage);
      }
    }
  };

  if (!clientSecret) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          Client secret is required to initialize the payment form.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 ryft-payment-component ${className}`}
    >
      <div className="Ryft--paysection">
        <div id="ryft-pay-form" className="Ryft--payform space-y-4">
          <button
            id="pay-btn"
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading || disabled}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors pay-button ${
              !isFormValid || isLoading || disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#CF931D] hover:bg-[#CF931D] active:bg-[#CF931D] "
            }`}
            aria-label={isLoading ? "Processing payment" : "Submit payment"}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              buttonText
            )}
          </button>

          {error && (
            <div
              id="ryft-pay-error"
              className="bg-red-50 border border-red-200 rounded-lg p-3"
              role="alert"
              aria-live="polite"
            >
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center mt-4">
        <p>Secure payment powered by Ryft</p>
      </div>
    </div>
  );
};
