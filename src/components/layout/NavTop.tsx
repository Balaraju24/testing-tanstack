import Logo from "@/assets/nyaya-tech-logo.svg";
import { useSidebar } from "@/components/ui/sidebar";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ClientOnly from "../core/ClientOnly";
import MenuOne from "../icons/menu1";
import MenuTwo from "../icons/menu2";
import DropDownMenu from "./DropDownMenu";
import GeneralNotifications from "./GeneralNotification";
import Todo from "./Todo";

export function NavTop(className: { className: any }) {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAdmin } = useUserDetails();

  const handleToggleSidebar = () => {
    toggleSidebar?.();
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex bg-[#F0F4FA] justify-between !h-14 items-center !px-2 border-b border-gray-300  w-full ${className}`}
    >
      <div className="flex items-center gap-1">
        <div
          onClick={handleToggleSidebar}
          className="rounded-md p-0 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent shadow-none cursor-pointer"
        >
          {isSidebarOpen ? (
            <MenuTwo className="w-12 !h-6" />
          ) : (
            <MenuOne className="w-12 !h-6" />
          )}
        </div>

        <img
          src={Logo}
          alt="Logo"
          className="w-36 2xl:w-40 cursor-pointer "
          onClick={() => navigate({ to: "/dashboard" })}
        />
      </div>
      <div className="flex items-center gap-3">
        <ClientOnly>
          <>
            {!isAdmin() && <Todo />}
            <GeneralNotifications />
          </>
          <DropDownMenu />
        </ClientOnly>
      </div>
    </div>
  );
}
