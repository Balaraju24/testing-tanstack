import { TabItem } from "@/lib/interfaces/service";

export const getBasePath = (serviceType?: string): string => {
  switch (serviceType) {
    case "Legal opinion":
      return "/legal-opinion/service";
    case "Litigation":
      return "/litigations/service";
    default:
      return "";
  }
};

export const getActiveTab = (pathname: string, tabs: TabItem[]): string => {
  return (
    tabs.find((tab) => pathname.includes(`/${tab.value}`))?.value ||
    tabs[0].value
  );
};
