"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { nubaApis } from "@/services/api-services";
import { useLoginWithGoogleMutation } from "@/redux/features/authApiSlice";

const GoogleOAuthClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [loginWithGoogle] = useLoginWithGoogleMutation();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      nubaApis.loginWithGoogle.handleLoginWithGoogle(
        { code },
        loginWithGoogle,
        dispatch,
        () => router.push("/dashboard"),
        () => router.push("/onboarding")
      );
    } else {
      toast.error("Missing authorization code.");
      router.push("/login");
    }
  }, [searchParams]);

  return <p className="text-center mt-10">Signing you in with Google...</p>;
};

export default GoogleOAuthClient;
