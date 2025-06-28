import { useLogoutMutation } from "@/redux/features/authApiSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { resetSignup } from "@/redux/features/authSlice";
import logoutImg from "@/assets/png/logout.png";
import Image from "next/image";
import { LogoutIcon } from "@/assets/svg/logout-icon";

const LogoutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await logout().unwrap();
      dispatch(resetSignup());
      router.push("/");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      className="bg-red-400 text-white text-[14px] rounded-[8px] px-3 py-1 flex items-center gap-2 "
      disabled={isLoading}
      onClick={handleLogout}
    >
      <LogoutIcon />
      {/* <Image src={logoutImg} alt="logout" className="w-4 h-4" /> */}
      Logout
    </button>
  );
};

export default LogoutButton;
