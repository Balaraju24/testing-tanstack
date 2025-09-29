import items from "@/lib/constants/sidebarConstants";
import { userStore } from "@/store/userDetails";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, useSidebar } from "../ui/sidebar";
import { NavMain } from "./NavMain";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userType, setUserType] = useState<string | null>(null);
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const { state } = useSidebar();
  const [is2xlOrBelow, setIs2xlOrBelow] = useState(false);

  useEffect(() => {
    setUserType(userDetails?.user_type ?? null);
  }, []);

  const filteredNavMain = items.navMain.filter((item) =>
    item.userTypes?.includes(userType as string)
  );

  const sidebarWidth =
    state === "collapsed" ? "60px" : is2xlOrBelow ? "190px" : "200px";

  useEffect(() => {
    setIs2xlOrBelow(window.innerWidth <= 1536);
  }, []);

  return (
    <Sidebar
      className="h-full !border-r !border-gray-300 bg-[#F0F4FA] flex-shrink-0"
      style={{
        position: "relative",
        borderRight: "1px solid #e5e7eb",
        width: sidebarWidth,
        minWidth: sidebarWidth,
        maxWidth: sidebarWidth,
      }}
      collapsible="icon"
      {...props}
    >
      <SidebarContent className="overflow-visible">
        <NavMain items={filteredNavMain} />
      </SidebarContent>
    </Sidebar>
  );
}
