import { env } from "@/env";
import {
  nextStep,
  setAuthData,
  setStep,
  SignUpStep,
} from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";
import {
  ChangePasswordPayload,
  landlordDetailsPayload,
  loginPayload,
  loginResponse,
  newPaymentPayload,
  signUpResponse,
  sigUpPayload,
  tenancyDetailsPayload,
  tenancyDetailsResponse,
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
        console.log("the email verify response is", response);
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
        await uploadLandlordDetailsMutation(payload).unwrap();
        dispatch(nextStep());
        toast.success("New payment method uploaded");
        route();
      } catch (error: any) {
        toast.error(error.data.message);
      }
    },
  },

  changePassword: {
    handleChangePassword: async (
      payload: {
        current_password: string;
        new_password: string;
        new_password_confirmation: string;
      },
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
      payload: { firstName: string; lastName: string; phone: string },
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

  admin: {},
};
