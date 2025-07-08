// Type definitions for Ryft SDK
export interface ApplePayConfig {
  merchantName: string;
  merchantCountryCode: string;
}

export interface GooglePayConfig {
  merchantIdentifier: string;
  merchantName: string;
  merchantCountryCode: string;
}

export interface FieldCollectionConfig {
  billingAddress?: {
    display: "full" | "minimum" | "none";
  };
  browserInfo: any;
  // nameOnCard: boolean;
}

export interface PaymentMethod {
  id: string;
}

export interface RyftConfig {
  publicKey: string;
  clientSecret: string;
  paymentMethod?: PaymentMethod;
  accountId?: string;
  applePay?: ApplePayConfig;
  googlePay?: GooglePayConfig;
  fieldCollection?: FieldCollectionConfig;
  usage: string;
}

export interface PaymentSession {
  id: string;
  status: "Approved" | "Captured" | "Failed" | "Pending";
  lastError?: RyftError;
}

export interface RyftError {
  code: string;
  message: string;
  type: string;
}

export interface CardValidationEvent {
  isValid: boolean;
}
export interface billingAddressalidationEvent {
  eventName: "billingAddressValidationChanged";
  isValid: boolean;
}
export interface WalletPaymentEvent {
  paymentSession: PaymentSession;
}

export type RyftEventType =
  | "cardValidationChanged"
  | "walletPaymentSessionResult";

export interface RyftSDK {
  init: (config: RyftConfig) => void;
  attemptPayment: () => Promise<PaymentSession>;
  getUserFacingErrorMessage: (error: RyftError) => string;
  addEventHandler(
    event: "cardValidationChanged",
    handler: (e: CardValidationEvent) => void
  ): void;
  addEventHandler(
    event: "walletPaymentSessionResult",
    handler: (e: WalletPaymentEvent) => void
  ): void;
}

declare global {
  interface Window {
    Ryft?: RyftSDK;
    google?: {
      payments?: {
        api?: {
          PaymentsClient?: any;
          ReadyToPayRequest?: any;
          PaymentDataRequest?: any;
        };
      };
    };
    isSecureContext?: boolean;
  }
}

// Component props interface
export interface RyftPaymentComponentProps {
  /**
   * Your Ryft public key
   * @default "pk_sandbox_123"
   */
  publicKey?: string;

  /**
   * Payment session client secret from your backend
   */
  clientSecret: string;

  /**
   * Callback function called when payment is successful
   */
  onPaymentSuccess?: (paymentSession: PaymentSession) => void;

  /**
   * Callback function called when payment fails
   */
  onPaymentError?: (error: RyftError, userFacingMessage: string) => void;

  /**
   * Callback when payment loading state changes
   */
  onPaymentLoadingChange?: (isLoading: boolean) => void;

  /**
   * Sub-account ID for marketplace payments
   */
  accountId?: string;

  /**
   * Apple Pay configuration
   */
  applePay?: ApplePayConfig;

  /**
   * Google Pay configuration
   */
  googlePay?: GooglePayConfig;

  /**
   * Disable Google Pay initialization (useful to avoid Google Pay API issues)
   * @default false
   */
  disableGooglePay?: boolean;

  /**
   * Field collection settings for billing address
   */
  fieldCollection?: FieldCollectionConfig;

  /**
   * Custom CSS class name for the component
   */
  className?: string;

  /**
   * Custom button text
   * @default "PAY NOW"
   */
  buttonText?: string;

  /**
   * Disable the component
   * @default false
   */
  disabled?: boolean;

  loading: boolean;
  // browserInfo: any;
}
