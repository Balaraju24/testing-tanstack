import { UseContextAPI } from "@/components/context/Provider";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TABS_CONFIG } from "@/lib/constants/tab";
import { TabItem } from "@/lib/interfaces/service";
import { getActiveTab, getBasePath } from "@/utils/helpers/tabHelper";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useLocation, useParams, useRouter } from "@tanstack/react-router";
import TabComponent from "./TabComponent";

const TabValuesForViewCase = () => {
  const { service_id } = useParams({ strict: false });
  const location = useLocation();
  const router = useRouter();
  const { isUser } = useUserDetails();
  const { serviceData } = UseContextAPI();

  const isLegalOpinion = serviceData?.service_type === "Legal opinion";

  const visibleTabs: TabItem[] = TABS_CONFIG.filter((tab) => {
    if (tab.value === "case-history" && isLegalOpinion) return false;
    if (tab.value === "logs" && isUser()) return false;
    return true;
  });

  const activeTabValue = getActiveTab(location.pathname, visibleTabs);
  const basePath = getBasePath(serviceData?.service_type);

  return (
    <Tabs
      defaultValue={activeTabValue}
      className="w-full"
      onValueChange={(value) =>
        router.navigate({
          to: `${basePath}/${service_id}/${value}`,
        })
      }
    >
      <TabsList
        className={`w-full h-auto grid ${
          isUser() && isLegalOpinion
            ? "grid-cols-3"
            : isLegalOpinion || isUser()
              ? "grid-cols-4"
              : "grid-cols-5"
        } bg-black text-white rounded-none`}
      >
        {visibleTabs.map((tab) => (
          <TabComponent
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            label={tab.label}
            activeTabValue={activeTabValue}
          />
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabValuesForViewCase;
