import { DropdownIcon } from "@/assets/svg/dropdown-icon";
import Hamburger from "@/assets/svg/hamburger";
import NotificationIcon from "@/assets/svg/notification-icon";
import { sideListItems, supportList } from "@/components/sidebar/constants";
import { Avatar, IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const cleanedPathname = pathname.replace(/^\/+|\/+$/g, "");

  const capitalizedPathanme =
    cleanedPathname.charAt(0).toUpperCase() + cleanedPathname.slice(1);

  return (
    <div className="md:hidden bg-black text-white px-4 h-[70px] flex items-center  z-50 fixed top-0 right-0 w-full">
      <div className="flex justify-between items-center w-full ">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          {menuOpen ? <p className="text-white">X</p> : <Hamburger />}
        </button>
        <p className="text-[20px] font-[600] ">{capitalizedPathanme}</p>
        <div className="flex items-center gap-1">
          <IconButton
            size="small"
            aria-label="Notifications"
            color="inherit"
            // sx={{ display: open ? "none" : "block" }}
          >
            <NotificationIcon />
          </IconButton>

          <Avatar sx={{ width: "20px", height: "20px" }} />
          <button>
            <DropdownIcon />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className=" absolute top-10 right-0 w-full mt-4 space-y-2 bg-black  rounded-lg p-4 shadow-lg">
          {sideListItems.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className="block py-2 px-3 rounded hover:bg-gray-700 transition"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
          {supportList.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className="block py-2 px-3 rounded hover:bg-gray-700 transition"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
