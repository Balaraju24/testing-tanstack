import { AppSidebar } from "@/components/app/Sidebar";
import { CaseStagesProvider } from "@/components/context/Provider";
import { NavTop } from "@/components/layout/NavTop";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { routesWithCustomBg } from "@/lib/constants/noDataConstants";
import { getSidebarWidth } from "@/utils/helpers/getSidebarWidth";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function MainLayoutContent() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const { state } = useSidebar();
  const [is2xlOrBelow, setIs2xlOrBelow] = useState(false);

  const isActive = (routes: string[]) => {
    return routes.some(
      (route) =>
        location.pathname === route || location.pathname.includes(route)
    );
  };

  const routesWithoutPadding = ["/checklist/create-new"];

  const sidebarWidth = getSidebarWidth(state, is2xlOrBelow);

  useEffect(() => {
    const handleResize = () => {
      setIs2xlOrBelow(window.innerWidth <= 1536);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden w-full font-primary">
      <NavTop className="w-full !px-0 h-16 flex-shrink-0" />

      <div className="flex h-full overflow-hidden">
        <div
          className="flex-shrink-0 bg-[#F0F4FA]"
          style={{
            width: sidebarWidth,
            minWidth: sidebarWidth,
            maxWidth: sidebarWidth,
          }}
        >
          <AppSidebar className="!h-full w-full" />
        </div>

        <main
          className={`flex-1 overflow-y-auto min-w-0
            ${isActive(routesWithCustomBg) ? "bg-[#f8f8f8]" : "bg-white"}
            ${routesWithoutPadding.includes(currentRoute) ? "p-0" : "p-2"}
          `}
          style={{
            width: `calc(100% - ${sidebarWidth})`,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function MainComponent() {
  return (
    <CaseStagesProvider>
      <SidebarProvider>
        <MainLayoutContent />
      </SidebarProvider>
    </CaseStagesProvider>
  );
}
