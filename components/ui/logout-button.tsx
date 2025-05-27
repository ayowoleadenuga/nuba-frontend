import { useLogoutMutation } from "@/redux/features/authApiSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { resetSignup, setAuthData } from "@/redux/features/authSlice";

const LogoutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(resetSignup());
      router.push("/");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      className="bg-red-400 text-white rounded-[8px] px-3 py-1 "
      disabled={isLoading}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
