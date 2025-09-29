import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import CaseFilingIcon from "@/components/icons/CaseFilingIcon";
import EngineerValuationIcon from "@/components/icons/engineer-property-valuation-icon";
import Litigation from "@/components/icons/litigation-icon";
import { StatItem } from "@/lib/interfaces/advocate";

import { getServiceTypeStatsCountAPI } from "@/http/services/dashboard";

const StatsCards = () => {
  const { advocate_id, manager_id } = useParams({ strict: false });

  const {
    data: serviceStats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["serviceTypeStats", manager_id, advocate_id],
    queryFn: () =>
      getServiceTypeStatsCountAPI({
        manager_id,
        advocate_id,
      }),
    enabled: !!manager_id || !!advocate_id,
    refetchOnWindowFocus: false,
  });

  const advisorCasesStats = serviceStats?.data?.data?.count || {
    LEGAL_OPINION: 0,
    ENGINEERING_PROPERTY_EVALUATION: 0,
    LITIGATION: 0,
  };

  const stats: StatItem[] = [
    {
      title: "Legal Opinion",
      count: advisorCasesStats?.["LEGAL_OPINION"] ?? 0,
      icon: <CaseFilingIcon />,
    },
    {
      title: "Engineer Property valuation",
      count: advisorCasesStats?.["ENGINEERING_PROPERTY_EVALUATION"] ?? 0,
      icon: <EngineerValuationIcon className="" />,
    },
    {
      title: "Litigation",
      count: advisorCasesStats?.["LITIGATION"] ?? 0,
      icon: <Litigation className="" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="p-2 space-y-6 bg-white">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border-gray-200 border-2 animate-pulse"
            >
              <div className="space-y-2">
                <div className="flex shrink-0 gap-2 items-center">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16 ml-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-2 space-y-6 bg-white">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">
            Failed to load statistics: {error?.message || "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-6 bg-white">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border-gray-200 border-2"
          >
            <div className="space-y-2">
              <div className="flex shrink-0 gap-2 [&_svg]:size-5 items-center">
                {stat.icon}
                <p className="text-xs 2xl:text-smd 3xl:text-base text-black opacity-80">
                  {stat.title}
                </p>
              </div>
              <h2 className="text-2xl 3xl:text-3xl font-normal pl-1">
                {stat.count}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
