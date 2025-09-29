import { getOrgServiceCasesCount } from "@/http/services/dashboard";
import { getIcon } from "@/utils/helpers/getIcon";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";
import { ServiceStatus } from "../dashboard/StatisticsSection";

const Stats = ({
  dateRange,
  searchOrganization,
}: {
  dateRange?: DateRange;
  searchOrganization?: string | null;
}) => {
  const navigate = useNavigate();
  const { data: serviceStats, isLoading } = useQuery({
    queryKey: ["serviceStats", dateRange, searchOrganization],
    queryFn: async () => {
      let queryParams = {};
      if (dateRange) {
        queryParams = {
          from_date: dayjs(dateRange?.from).format("YYYY-MM-DD"),
          to_date: dayjs(dateRange?.to).format("YYYY-MM-DD"),
        };
      }
      if (searchOrganization) {
        queryParams = { ...queryParams, user_id: searchOrganization };
      }
      const response = await getOrgServiceCasesCount(queryParams);
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const allServices = [
    {
      title: "Legal Opinion",
      path: "legal-opinion?page=1&page_size=15&service_type=Legal+opinion&view=grid",
    },
    {
      title: "Engineer Property Valuation",
      path: "engineer-property-valuation?",
    },
    {
      title: "Litigation",
      path: "litigations?page=1&page_size=15&view=grid",
    },
  ];

  const stats = allServices.map((service) => {
    const serviceData = serviceStats?.find(
      (s) => s.service_type.toLowerCase() === service.title.toLowerCase()
    );

    if (serviceData) {
      const statusMap: Partial<ServiceStatus> = {};
      serviceData.statuses.forEach((s) => {
        if (s.status === "TO_START") statusMap["to_start"] = s.count;
        if (s.status === "IN_PROGRESS") statusMap["progress"] = s.count;
        if (s.status === "COMPLETED") statusMap["completed"] = s.count;
      });

      return {
        title: service.title,
        path: service.path,
        cases: serviceData.statuses.reduce((a, b) => a + b.count, 0),
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
    { key: "progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1 p-1 ">
      {stats.map((item, index) => (
        <div
          key={index}
          className="p-1 px-2 rounded bg-white border border-gray-300"
        >
          <h2 className="text-sm font-medium text-gray-800">{item.title}</h2>

          <div className="grid grid-cols-2 gap-2 my-1">
            {statusConfig.map((status) => (
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
                  <p className="font-medium">{item[status.key] || 0}</p>
                </div>
                <div>{getIcon(status.key)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
