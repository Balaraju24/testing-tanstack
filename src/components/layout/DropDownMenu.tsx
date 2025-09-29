import { userStore } from "@/store/userDetails";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import Cookies from "js-cookie";
import { ChevronDown, LogOutIcon } from "lucide-react";
import { useState } from "react";
import DefaultUserIcon from "../icons/default-user";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const DropDownMenu = () => {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const userDetails = useStore(userStore, (state) => state["user"]);
  const displayName = isClient
    ? `${userDetails?.first_name || ""} ${userDetails?.last_name || ""}`?.trim()
    : "";

  const getUserTypeDisplay = (userType?: string) => {
    if (!userType) return "";
    if (userType?.toLowerCase() === "customer") {
      return "Point of Contact";
    }
    return (
      userType?.charAt(0)?.toUpperCase() + userType?.slice(1)?.toLowerCase()
    );
  };

  const handleLogOut = () => {
    const clearCookies = ["token", "refreshToken", "userData"];
    clearCookies.forEach((cookie) => Cookies.remove(cookie, { path: "/" }));
    localStorage.clear();
    localStorage.removeItem("userDetails");
    localStorage.removeItem("device_token");
    navigate({ to: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center gap-2 cursor-pointer  bg-white pr-2 rounded-full">
          <Avatar className="h-9 w-9 rounded-full bg-[#F7F7F7] border border-gray-300 flex items-center justify-center">
            {userDetails?.avatar ? (
              <AvatarImage src={isClient ? userDetails?.avatar : ""} />
            ) : (
              <DefaultUserIcon className="w-4 h-4" />
            )}
          </Avatar>
          <div>
            <div
              className="capitalize text-sm truncate max-w-40"
              title={displayName}
            >
              {displayName}
            </div>
            <div className="text-[11px]">
              {getUserTypeDisplay(userDetails?.user_type)}
            </div>
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg bg-white border border-gray-200"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full bg-[#e7e7e7] flex justify-center items-center">
              <AvatarImage src={userDetails?.avatar} alt="admin" />
              <DefaultUserIcon className="w-4 h-4" />
            </Avatar>
            <div className="flex flex-col items-start text-left text-sm leading-tight">
              <Tooltip>
                <TooltipTrigger>
                  <span
                    className={`font-semibold ${displayName.length > 15 ? "truncate" : ""}`}
                  >
                    {displayName}
                  </span>
                </TooltipTrigger>
                {displayName.length > 15 && (
                  <TooltipContent className="bg-white">
                    {displayName}
                  </TooltipContent>
                )}
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <span
                    className={`truncate text-xs ${
                      userDetails?.email?.length > 15 ? "tooltip-active" : ""
                    }`}
                  >
                    {userDetails?.email || "--"}
                  </span>
                </TooltipTrigger>
                {userDetails?.email?.length > 15 && (
                  <TooltipContent className="bg-white">
                    {userDetails?.email}
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem
          className="text-red-500 hover:bg-red-500 cursor-pointer hover:text-white"
          onClick={handleLogOut}
        >
          <LogOutIcon /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
