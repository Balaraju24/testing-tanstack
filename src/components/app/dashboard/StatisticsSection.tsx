import LegalCasesIcon from "@/components/icons/Dashboard/legal-cases-icon";
import RevenueIcon from "@/components/icons/Dashboard/revenue-icon";
import TotalFileCountIcon from "@/components/icons/Dashboard/total-file-count";
import ManagerIcon from "@/components/icons/ManagerIcon";
import AdvocateIcon from "@/components/icons/advocate-icon";
import EngineerValuationIcon from "@/components/icons/engineer-property-valuation-icon";
import Litigation from "@/components/icons/litigation-icon";
import {
  getAdvocatesCountAPI,
  getAdvocateServicesCountAPI,
  getCasesCountAPI,
  getLocationStatsCountAPI,
  getManagersCountAPI,
  getOrganizationsCountAPI,
  getOrgServiceCasesCount,
  getServicesCountApi,
} from "@/http/services/dashboard";
import { userStore } from "@/store/userDetails";
import { INRFormatter } from "@/utils/helpers/formatINR";
import { getIcon } from "@/utils/helpers/getIcon";

import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { MapPin } from "lucide-react";
import { useState } from "react";

import OverflowContentTooltip from "@/components/core/OverflowContentTooltip";
import TotalFileCasesCountIcon from "@/components/icons/Dashboard/total-cases-count-icon";
import OrganizationStatistics from "./OrganizationStatistics";
import OrganizationTable from "./OrganizationTable";

export interface ServiceStatus {
  cases: number;
  to_start: number;
  progress: number;
  completed: number;
  overdue: number;
}

const TotalOrganizationIcon = ({ className }: { className: string }) => (
  <TotalFileCountIcon className={className} />
);
const TotalCasesIcon = ({ className }: { className: string }) => (
  <TotalFileCasesCountIcon className={className} />
);

const StatisticsSection = () => {
  const navigate = useNavigate();

  const { isAdvocate, isManager, isUser, isAdmin } = useUserDetails();

  const userDetails = useStore(userStore, (state: any) => state["user"]);

  const {
    data: dashboardStats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const response = await getCasesCountAPI();
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: locationsCount, isLoading: locationsLoading } = useQuery({
    queryKey: ["locationsCount"],
    queryFn: async () => {
      const response = await getLocationStatsCountAPI();
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isManager() || isAdmin(),
  });

  const { data: servicesCount, isLoading: servicesCountLoading } = useQuery({
    queryKey: ["servicesCount"],
    queryFn: async () => {
      const response = await getServicesCountApi();
      return response?.data?.data;
    },
    enabled: isManager() || isAdmin(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: advocateServiceCount } = useQuery({
    queryKey: ["AdvocateServiceCount"],
    queryFn: async () => {
      const response = await getAdvocateServicesCountAPI(userDetails?.id);
      return response?.data?.data;
    },
    enabled: isAdvocate(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: orgCasesCount } = useQuery({
    queryKey: ["OrgCasesCount"],
    queryFn: async () => {
      const response = await getOrgServiceCasesCount();
      return response?.data?.data;
    },
    enabled: isUser(),
  });

  const { data: organizationsCount } = useQuery({
    queryKey: ["organizationsCount"],
    queryFn: async () => {
      const response = await getOrganizationsCountAPI();
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isManager() || isAdmin() || isAdvocate(),
  });

  const { data: advocatesCount } = useQuery({
    queryKey: ["advocatesCount"],
    queryFn: async () => {
      const response = await getAdvocatesCountAPI();
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isManager() || isAdmin(),
  });

  const { data: managersCount } = useQuery({
    queryKey: ["managersCount"],
    queryFn: async () => {
      const response = await getManagersCountAPI();
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isManager() || isAdmin(),
  });

  const handleRoute = (path: string) => {
    navigate({ to: `/${path}` });
  };

  const stats1 = [
    {
      name: "Locations",
      icon: MapPin,
      count: locationsCount?.count || 0,
      color: "bg-green-100 text-green-600",
      userType: ["ADMIN"],
      path: "locations",
    },
    {
      name: "Managers",
      icon: ManagerIcon,
      count: managersCount?.count || 0,
      color: "bg-blue-100 text-blue-600",
      userType: ["ADMIN"],
      path: "managers",
    },
    {
      name: "Organizations",
      icon: TotalOrganizationIcon,
      count: organizationsCount?.count || 0,
      color: "bg-violet-100 text-violet-600",
      userType: ["ADMIN", "MANAGER", "ADVOCATE"],
      path: "organizations",
    },
    {
      name: "Advocates",
      icon: AdvocateIcon,
      count: advocatesCount?.count || 0,
      userType: ["ADMIN", "MANAGER"],
      path: "advocates",
    },
    {
      name: "Total Cases",
      icon: TotalCasesIcon,
      count: dashboardStats?.count || 0,
      color: "bg-amber-100 text-amber-500",
      userType: ["ADMIN", "MANAGER", "ADVOCATE"],
    },
  ];

  const legalOpinionCount = isAdvocate()
    ? advocateServiceCount?.find((s: any) => s.service_type === "Legal opinion")
        ?.cases_count
    : servicesCount?.find((s: any) => s.service_type === "Legal opinion")
        ?.cases_count;

  const litigationCount = isAdvocate()
    ? advocateServiceCount?.find((s: any) => s.service_type === "Litigation")
        ?.cases_count
    : servicesCount?.find((s: any) => s.service_type === "Litigation")
        ?.cases_count;

  const eopCount = isAdvocate()
    ? advocateServiceCount?.find(
        (s: any) => s.service_type === "Engineer property valuation"
      )?.cases_count
    : servicesCount?.find(
        (s: any) => s.service_type === "Engineer property valuation"
      )?.cases_count;

  const getVisibleStats1 = () => {
    const currentUserTypes: string[] = [];
    if (isAdmin()) currentUserTypes.push("ADMIN");
    if (isManager()) currentUserTypes.push("MANAGER");
    if (isAdvocate()) currentUserTypes.push("ADVOCATE");
    if (isUser()) currentUserTypes.push("USER");

    return stats1.filter((stat) =>
      stat.userType.some((type) => currentUserTypes.includes(type))
    );
  };

  const stats2 = [
    {
      name: "Legal Opinion",
      cases: legalOpinionCount,
      revenue: servicesCount?.find(
        (s: any) => s.service_type === "Legal opinion"
      )?.revenue,

      color: "bg-green-100 text-green-600",
      icon: LegalCasesIcon,
      path: "legal-opinion?page=1&page_size=15&service_type=Legal+opinion&view=grid",
    },
    {
      name: isAdvocate() ? "EP Valuation" : "Engineer Property Valuation",
      cases: eopCount,

      revenue: servicesCount?.find(
        (s: any) => s.service_type === "Engineer property valuation"
      ),
      color: "bg-blue-100 text-blue-600",
      icon: EngineerValuationIcon,
      path: "engineer-property-valuation",
    },
    {
      name: "Litigation",
      cases: litigationCount,
      revenue: servicesCount?.find((s: any) => s.service_type === "Litigation")
        ?.revenue,
      color: "bg-violet-100 text-violet-600",
      icon: Litigation,
      path: "litigations?page=1&page_size=15&view=grid",
    },
  ];

  const allServices = [
    {
      title: "Legal Opinion",
      path: "legal-opinion?page=1&page_size=15&service_type=Legal+opinion&view=grid",
    },
    {
      title: "Engineer Property Valuation",
      path: "engineer-property-valuation",
    },
    {
      title: "Litigation",
      path: "litigations?page=1&page_size=15&view=grid",
    },
  ];

  const customerStats = allServices.map((service) => {
    const serviceData = orgCasesCount?.find(
      (s: any) => s.service_type.toLowerCase() === service.title.toLowerCase()
    );

    if (serviceData) {
      const statusMap: Partial<ServiceStatus> = {};
      serviceData.statuses.forEach((s: any) => {
        if (s.status === "TO_START") statusMap["to_start"] = s.count;
        if (s.status === "IN_PROGRESS") statusMap["progress"] = s.count;
        if (s.status === "COMPLETED") statusMap["completed"] = s.count;
      });

      return {
        title: service.title,
        path: service.path,
        cases: serviceData.statuses.reduce((a: any, b: any) => a + b.count, 0),
        ...statusMap,
      };
    } else {
      return {
        title: service.title,
        path: service.path,
        cases: 0,
        to_start: 0,
        progress: 0,
        completed: 0,
      };
    }
  });

  const statusConfig = [
    { key: "cases", label: "Cases" },
    { key: "to_start", label: "To Start" },
    { key: "in_progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="col-span-7">
      {(isAdmin() || isManager()) && (
        <div className="">
          <div className={`grid grid-cols-${getVisibleStats1().length} gap-2`}>
            {getVisibleStats1().map((stat, index) => (
              <div
                onClick={() => {
                  if (stat.path) {
                    handleRoute(stat.path);
                  }
                }}
                key={index}
                className={`bg-white   border border-gray-200 px-2 py-1 rounded flex items-center justify-between gap-2 ${stat.path ? "cursor-pointer" : ""}`}
              >
                <div className=" items-center gap-3">
                  <div className="font-medium text-sm">
                    <OverflowContentTooltip text={stat.name} />
                  </div>
                  <OverflowContentTooltip text={stat.count} />
                </div>
                <div className={`${stat.color} p-2  `}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {stats2.map((stat, index) => (
              <div
                key={index}
                onClick={() => handleRoute(stat.path ?? "")}
                className="bg-white border cursor-pointer border-gray-200  p-2 rounded  gap-2"
              >
                <div className=" items-center gap-3">
                  <div className="font-medium text-smd">{stat.name}</div>
                </div>
                <div className="grid grid-cols-[43%_55%] gap-2 mt-2">
                  <div className="flex justify-between border p-1.5 rounded border-gray-300 items-center gap-3">
                    <div className="min-w-0">
                      <div className="font-light text-gray-500 text-xs truncate">
                        Cases
                      </div>
                      <OverflowContentTooltip text={stat.cases || 0} />
                    </div>
                    <div className={`${stat.color} p-1 shrink-0`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center rounded border gap-3 border-gray-300 p-2">
                    <div className="min-w-0">
                      <div className="font-light text-gray-500 text-xs">
                        Revenue
                      </div>
                      <OverflowContentTooltip
                        text={INRFormatter.format(Number(stat.revenue || 0))}
                      />
                    </div>
                    <div className="p-1 bg-blue-100 shrink-0 rounded">
                      <RevenueIcon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isAdvocate() && (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 p-2 border border-gray-300 bg-white ">
            <h2 className="text-sm font-medium  ">Total</h2>
            <div className="grid grid-cols-2 gap-2 ">
              {getVisibleStats1().map((stat, index) => (
                <div
                  key={index}
                  className="bg-white  border border-gray-200 px-2 py-1 rounded flex items-center justify-between gap-2"
                >
                  <div className=" items-center gap-3">
                    <div className="font-light text-sm">
                      <OverflowContentTooltip text={stat.name} />
                    </div>
                    <OverflowContentTooltip text={stat.count} />
                  </div>
                  <div className={`${stat.color} p-1  `}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 p-2 border border-gray-300 bg-white">
            <h2 className="text-sm font-medium ">Cases</h2>
            <div className="grid grid-cols-3 gap-2">
              {stats2.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border cursor-pointer border-gray-200  px-2 py-1 rounded  gap-2"
                  onClick={() => handleRoute(stat.path ?? "")}
                >
                  <div className="flex justify-between  rounded border-gray-300 items-center gap-3">
                    <div>
                      <div className="font-light text-sm">
                        <OverflowContentTooltip text={stat.name} />
                      </div>
                      <div className="text-md font-medium">
                        <OverflowContentTooltip text={stat.cases} />
                      </div>
                    </div>
                    <div className={`${stat.color} p-1  `}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isUser() && (
        <div className="space-y-2">
          {customerStats.map((item, index) => (
            <div
              key={index}
              className="p-1 px-2 rounded bg-white border border-gray-300"
            >
              <h2 className="text-sm font-medium text-gray-800">
                {item.title}
              </h2>

              <div className="grid grid-cols-4 gap-2 my-1">
                {statusConfig?.map((status) => (
                  <div
                    key={status.key}
                    className="px-2 py-1 border border-gray-300 flex justify-between items-center 
                     cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      if (status.key === "cases") {
                        navigate({
                          to: `/${item.path}`,
                        });
                      } else {
                        navigate({
                          to: `/${item.path}&status=${status.key.toUpperCase()}`,
                        });
                      }
                    }}
                  >
                    <div>
                      <p className="text-smd font-light text-gray-700">
                        {status.label}
                      </p>
                      <p className="font-medium">
                        {" "}
                        {item[status.key as keyof typeof item] || 0}
                      </p>
                    </div>
                    <div>{getIcon(status.key)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {isUser() ? <OrganizationTable /> : <OrganizationStatistics />}
    </div>
  );
};

export default StatisticsSection;
