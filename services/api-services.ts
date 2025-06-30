import { env } from "@/env";
import {
  nextStep,
  setAuthData,
  setStep,
  SignUpStep,
  updateUserOnboardingStatus,
} from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";
import {
  ChangePasswordPayload,
  ContactUsPayload,
  CreateSupportTicket,
  landlordDetailsPayload,
  loginPayload,
  loginResponse,
  newPaymentPayload,
  paymentInitiationPayload,
  signUpResponse,
  sigUpPayload,
  tenancyDetailsPayload,
  tenancyDetailsResponse,
  UpdateRentDueDatePayload,
  UpdateUserProfilePayload,
} from "@/types";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export type RegisterUserTrigger = (payload: sigUpPayload) => {
  unwrap: () => Promise<signUpResponse>;
};

export type LoginUserTrigger = (payload: loginPayload) => {
  unwrap: () => Promise<loginResponse>;
};

export type UploadTenancyDetailsTrigger = (payload: tenancyDetailsPayload) => {
  unwrap: () => Promise<tenancyDetailsResponse>;
};

export type uploadLandlordDetailsTrigger = (
  payload: landlordDetailsPayload
) => {
  unwrap: () => Promise<any>;
};

export type newPaymentTrigger = (payload: newPaymentPayload) => {
  unwrap: () => Promise<any>;
};

export type validatePaymentTrigger = (payload: string) => {
  unwrap: () => Promise<any>;
};

export type makePaymentTrigger = (params: {
  paymentId: string;
  payload: paymentInitiationPayload;
}) => {
  unwrap: () => Promise<any>;
};

// export type verificationTrigger = (params: {
//   kycId: string;
//   payload: paymentInitiationPayload;
// }) => {
//   unwrap: () => Promise<any>;
// };

export type verificationTrigger = () => {
  unwrap: () => Promise<any>;
};

export type SendOTPTrigger = (payload: { token: string }) => {
  unwrap: () => Promise<{
    message: string;
    status: string;
    statusCode: number;
  }>;
};

export type ResendOTPTrigger = (payload: { email: string }) => {
  unwrap: () => Promise<any>;
};

export type ChangePasswordTrigger = (payload: ChangePasswordPayload) => {
  unwrap: () => Promise<{ message: string }>;
};

export type UpdateUserProfileTrigger = (payload: UpdateUserProfilePayload) => {
  unwrap: () => Promise<any>;
};

export type CreateSupportTicketTrigger = (payload: CreateSupportTicket) => {
  unwrap: () => Promise<any>;
};
export type autopayToggleTrigger = (autoPayStatus: boolean) => {
  unwrap: () => Promise<any>;
};

export type SubmitContactUsMessageTrigger = (payload: ContactUsPayload) => {
  unwrap: () => Promise<any>;
};

export type UpdateRentDueDateTrigger = (payload: UpdateRentDueDatePayload) => {
  unwrap: () => Promise<any>;
};

export type setDefaultPaymentMethodTrigger = (paymentMethodId: string) => {
  unwrap: () => Promise<any>;
};

export const nubaApis = {
  sendEmail: (
    form: React.RefObject<HTMLFormElement | null>,
    setPending: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setPending(true);
    if (form.current) {
      emailjs
        .sendForm(
          env.NEXT_PUBLIC_EMAIL_JS_SERVICE_KEY || "",
          env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_KEY || "",
          form.current,
          {
            publicKey: env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
          }
        )
        .then(
          () => {
            toast.success("Email sent");
            setPending(false);
          },
          (error) => {
            setPending(false);
            toast.error("Email failed", error);
            console.error("FAILED...", error.text);
          }
        );
    }
  },
  auth: {
    handleRegister: async (
      payload: sigUpPayload,
      registerUser: RegisterUserTrigger,
      dispatch: AppDispatch
    ): Promise<loginResponse | void> => {
      try {
        await registerUser(payload).unwrap();
        dispatch(setStep(SignUpStep.OTP));
        toast.success("Account created");
      } catch (error: any) {
        toast.error(error.data.message);
      }
    },
    handleSendOTP: async (
      payload: { token: string },
      sendOTP: SendOTPTrigger,
      dispatch: AppDispatch
    ) => {
      try {
        const response: any = await sendOTP(payload).unwrap();
        dispatch(nextStep());
        toast.success("Email verified");
        dispatch(
          setAuthData({
            token: response["accessToken"],
            user: response.data,
          })
        );
      } catch (error: any) {
        toast.error(error.data.message);
      }
    },
    handleResendOTP: async (
      payload: { email: string },
      resendOTP: ResendOTPTrigger
    ) => {
      try {
        const response = await resendOTP(payload).unwrap();
        toast.success("Please check your email for OTP");
        return response;
      } catch (error: any) {
        toast.error(toast.error(error.data.message));
      }
    },
    handleLogin: async (
      payload: loginPayload,
      loginUser: LoginUserTrigger,
      dispatch: AppDispatch,
      route: () => void,
      route2: () => void,
      relogin: () => void
    ) => {
      try {
        const response = await loginUser(payload).unwrap();
        dispatch(
          setAuthData({
            token: response.accessToken,
            user: response.data,
          })
        );
        toast.success("Login Successful");
        route();
        if (response?.data?.onboarding?.isOnboarded === false) {
          if (response?.data?.onboarding?.step === 0) {
            route2();
            dispatch(setStep(SignUpStep.TENANCY_DETAILS));
          } else if (response?.data?.onboarding?.step === 1) {
            route2();
            dispatch(setStep(SignUpStep.TENANCY_AGREEMENT));
          } else if (response?.data?.onboarding?.step === 2) {
            route2();
            dispatch(setStep(SignUpStep.AGENT_DETAILS));
          } else if (response?.data?.onboarding?.step === 3) {
            route2();
            dispatch(setStep(SignUpStep.NEW_PAYMENT_METHOD));
          }
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.data.message);
        if (error.data.statusCode === 403) {
          route2();
          dispatch(setStep(SignUpStep.OTP));
          relogin();
        }
      }
    },
    handleUploadTenancyDetails: async (
      payload: tenancyDetailsPayload,
      UploadTenancyDetails: UploadTenancyDetailsTrigger,
      dispatch: AppDispatch
    ): Promise<loginResponse | void> => {
      try {
        await UploadTenancyDetails(payload).unwrap();
        dispatch(nextStep());
        toast.success("Tenancy details uploaded");
      } catch (error: any) {
        toast.error(error.data.message);
      }
    },
    handleUploadLandlordDetails: async (
      payload: landlordDetailsPayload,
      uploadLandlordDetailsMutation: uploadLandlordDetailsTrigger,
      dispatch: AppDispatch
    ) => {
      try {
        await uploadLandlordDetailsMutation(payload).unwrap();
        dispatch(nextStep());
        toast.success("Landlord details uploaded");
      } catch (error: any) {
        toast.error(error.data.message);
      }
    },
    handleUploadNewPaymentMethod: async (
      payload: newPaymentPayload,
      uploadLandlordDetailsMutation: newPaymentTrigger,
      dispatch: AppDispatch,
      route: () => void
    ) => {
      try {
        const response = await uploadLandlordDetailsMutation(payload).unwrap();
        dispatch(nextStep());
        toast.success("New payment method uploaded");
        dispatch(
          updateUserOnboardingStatus({
            isOnboarded: response?.onboarding?.isOnboarded,
          })
        );
        route();
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    },
  },

  changePassword: {
    handleChangePassword: async (
      payload: ChangePasswordPayload,
      changePasswordMutation: ChangePasswordTrigger
    ) => {
      try {
        const res = await changePasswordMutation(payload).unwrap();
        toast.success(res.message || "Password changed successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to change password");
      }
    },
  },

  updateUserProfile: {
    handleUpdateUserProfile: async (
      payload: UpdateUserProfilePayload,
      updateUserProfileMutation: UpdateUserProfileTrigger
    ) => {
      try {
        const res = await updateUserProfileMutation(payload).unwrap();
        toast.success("Profile updated successfully");
        return res;
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update profile");
      }
    },
  },

  createPaymentMethod: {
    handleCreatePaymentMethod: async (
      payload: newPaymentPayload,
      createPaymentMethodMutation: newPaymentTrigger
    ) => {
      try {
        await createPaymentMethodMutation(payload).unwrap();
        toast.success("Payment method created successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create payment method");
      }
    },
    handleInitiatePay: async (makePayment: verificationTrigger) => {
      try {
        await makePayment().unwrap();
        // toast.success("Payment initiated successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || "Failed to initiate payment");
      }
    },
    handlePay: async (
      makePayment: makePaymentTrigger,
      paymentId: string,
      payload: paymentInitiationPayload
    ) => {
      try {
        return await makePayment({ paymentId, payload }).unwrap();
      } catch (error: any) {
        console.error(error);
        // toast.error(error?.data?.message || "Failed to initiate payment");
      }
    },
    handleValidatePayment: async (
      paymentId: string,
      validatePayment: validatePaymentTrigger
    ) => {
      try {
        await validatePayment(paymentId).unwrap();
        toast.success("Payment validated successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || "Failed to validate payment");
      }
    },
    handleToggleAutopay: async (
      toggleAutopay: autopayToggleTrigger,
      autoPayStatus: boolean
    ) => {
      try {
        await toggleAutopay(autoPayStatus).unwrap();
        toast.success(
          `Autopay turned ${autoPayStatus ? "off" : "on"} successfully`
        );
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || "Failed to turn off autopay");
      }
    },
  },

  setDefaultPaymentMethod: {
    handleSetDefaultPaymentMethod: async (
      paymentMethodId: string,
      setDefaultPaymentMethodMutation: setDefaultPaymentMethodTrigger
    ) => {
      try {
        await setDefaultPaymentMethodMutation(paymentMethodId).unwrap();
        toast.success("Default payment method set successfully");
      } catch (error: any) {
        toast.error(
          error?.data?.message || "Failed to set default payment method"
        );
      }
    },
  },

  getGoogleLoginUrl: {
    handleGetGoogleLoginUrl: async (
      triggerGoogleLoginUrl: () => Promise<any>
    ) => {
      try {
        const res = await triggerGoogleLoginUrl();

        const redirectUrl = res?.data?.data?.url;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          toast.error("Google login URL not found");
        }
      } catch (error: any) {
        toast.error(
          error?.data?.message || error?.message || "Google login failed"
        );
      }
    },
  },

  loginWithGoogle: {
    handleLoginWithGoogle: async (
      payload: { code: string },
      loginWithGoogle: (payload: { code: string }) => {
        unwrap: () => Promise<loginResponse>;
      },
      dispatch: AppDispatch,
      onSuccessRoute: () => void,
      onOnboardingRoute: () => void
    ) => {
      try {
        const response = await loginWithGoogle(payload).unwrap();

        dispatch(
          setAuthData({
            token: response.accessToken,
            user: response.data,
          })
        );
        toast.success("Login with Google successful");
        onSuccessRoute();

        if (response?.data?.onboarding?.isOnboarded === false) {
          onOnboardingRoute();

          switch (response?.data?.onboarding?.step) {
            case 0:
              dispatch(setStep(SignUpStep.TENANCY_DETAILS));
              break;
            case 1:
              dispatch(setStep(SignUpStep.TENANCY_AGREEMENT));
              break;
            case 2:
              dispatch(setStep(SignUpStep.AGENT_DETAILS));
              break;
            case 3:
              dispatch(setStep(SignUpStep.NEW_PAYMENT_METHOD));
              break;
            default:
              break;
          }
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Google login failed");
      }
    },
  },

  createSupportTicket: {
    handleCreateSupportTicket: async (
      payload: CreateSupportTicket,
      createSupportTicketMutation: CreateSupportTicketTrigger
    ) => {
      try {
        await createSupportTicketMutation(payload).unwrap();
        toast.success("Support ticket created successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create support ticket");
      }
    },
  },
  kyc: {
    handleVerify: async (
      verify: verificationTrigger
      // kycId: string,
      // payload: paymentInitiationPayload
    ) => {
      try {
        const response = await verify().unwrap();
        toast.success("KYC Verification initiated successfully");
        return response;
      } catch (error: any) {
        console.error(error);
        toast.error(
          error?.data?.message || "Failed to initiate KYC Verification"
        );
        throw error;
      }
    },
    handleValidateKYCStatus: async (
      kycId: string,
      validateKYCStatus: validatePaymentTrigger
    ) => {
      try {
        await validateKYCStatus(kycId).unwrap();
        toast.success("Payment validated successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || "Failed to validate payment");
      }
    },
  },

  submitContactUsMessage: {
    handleSubmitContactUsMessage: async (
      payload: ContactUsPayload,
      submitContactUsMessageMutation: SubmitContactUsMessageTrigger
    ) => {
      try {
        await submitContactUsMessageMutation(payload).unwrap();
        toast.success("Message sent successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to send message");
      }
    },
  },

  updateRentDueDate: {
    handleUpdateRentDueDate: async (
      payload: UpdateRentDueDatePayload,
      updateRentDueDateMutation: UpdateRentDueDateTrigger
    ) => {
      try {
        await updateRentDueDateMutation(payload).unwrap();
        toast.success("Rent due date updated successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update rent due date");
      }
    },
  },

  admin: {},
};
