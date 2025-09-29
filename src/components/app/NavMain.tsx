// NavMain.tsx
import { Link, useLocation } from "@tanstack/react-router";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { NavMainProps } from "@/lib/interfaces/nav";

export function NavMain({ items }: any) {
  const location = useLocation();
  const { state } = useSidebar();

  const isActive = (activeLinks: string[]) => {
    return activeLinks.some((link) => location.pathname.startsWith(link));
  };

  const isCollapsed = state === "collapsed";

  const linkBaseClass = `w-full flex items-center gap-2 text-black [&>svg]:size-5 !no-underline !hover:no-underline !focus:no-underline !active:no-underline py-2 px-3 ${
    isCollapsed ? "justify-center !gap-0" : "justify-start"
  }`;

  return (
    <SidebarGroup className="bg-[#F0F4FA] h-full">
      <SidebarMenu className="space-y-1 2xl:space-y-2">
        {items.map((item: any) => {
          const activeLinks = item.activePaths || [item.url];
          const activeClass = isActive(activeLinks)
            ? "bg-black text-white font-normal !rounded-none !py-0.5 xl:!py-2"
            : "bg-transparent hover:bg-gray-200 !rounded-none";

          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.title} className="w-full">
              <SidebarMenuButton
                asChild
                className="rounded-none text-normal h-auto min-h-fit overflow-visible p-0 w-full"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.url}
                      activeOptions={{ exact: true }}
                      className={`${linkBaseClass} ${activeClass} rounded-md`}
                    >
                      <div
                        className={`flex items-center w-full ${
                          isCollapsed ? "justify-center" : "gap-2"
                        }`}
                        title={`${isCollapsed ? item.title : ""}`}
                      >
                        <div className="flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        {!isCollapsed && (
                          <span className="text-xs lg:text-sm leading-4 2xl:leading-5 min-w-0 flex-1 whitespace-normal break-words hyphens-auto">
                            {item.title}
                          </span>
                        )}
                      </div>
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
