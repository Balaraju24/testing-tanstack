import CustomDateRangePicker from "@/components/core/CustomDateRangePicker";
import LoadingComponent from "@/components/core/Loading";
import TanStackTable from "@/components/core/TanstackTable";
import YearDropdown from "@/components/core/YearDropdown";
import CaseAnalyticsIcon from "@/components/icons/Dashboard/case-analytics-icon";
import { getOrganizationAnalytics } from "@/http/services/dashboard";
import { userStore } from "@/store/userDetails";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

const OrganizationTable = () => {
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dayjs().startOf("year").toDate(),
    to: dayjs().endOf("day").toDate(),
  });

  const { data: orgData, isLoading } = useQuery({
    queryKey: ["orgData", dateRange],
    queryFn: async () => {
      let queryParams = {};
      if (dateRange) {
        queryParams = {
          from_date: dayjs(dateRange?.from).format("YYYY-MM-DD"),
          to_date: dayjs(dateRange?.to).format("YYYY-MM-DD"),
        };
      }
      const response = await getOrganizationAnalytics(
        userDetails?.id,
        queryParams
      );
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
  });

  const serviceTypes = useMemo(() => {
    if (!orgData) return [];
    const types = orgData.flatMap((row: any) =>
      row.service_types.map((s: any) => s.service_type)
    );

    if (!types.includes("E.P Valuation")) {
      types.push("E.P Valuation");
    }
    return Array.from(new Set(types));
  }, [orgData]);

  const columns = useMemo<ColumnDef<any>[]>(() => {
    const baseSize = 120;

    return [
      {
        accessorKey: "month",
        header: "Month",
        size: 80,
        minSize: 80,
        maxSize: 80,
      },
      ...serviceTypes.map((type) => ({
        id: (type as string).toLowerCase().replace(/\s+/g, "_"),
        header: type as string,
        accessorFn: (row: any) =>
          row.service_types.find((s: any) => s.service_type === type)
            ?.cases_count ?? 0,
        size: baseSize,
        minSize: 80,
        maxSize: 150,
      })),
      {
        accessorKey: "total_cases",
        header: "Total Cases",
        size: 100,
        minSize: 80,
        maxSize: 120,
      },
    ];
  }, [serviceTypes]);

  return (
    <div className="bg-white h-[calc(100vh-390px)] mt-2 p-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-gray-100">
            <CaseAnalyticsIcon className="h-4 w-4" />
          </div>
          <div className="text-sm">Cases Analytics</div>
        </div>
        <div>
          <YearDropdown onChange={setDateRange} />
        </div>
      </div>
      {isLoading ? (
        <div className="h-[calc(100vh-420px)] relative">
          <LoadingComponent loading={isLoading} />
        </div>
      ) : (
        <TanStackTable
          columns={columns}
          data={orgData ?? []}
          paginationDetails={undefined}
          noDataLabel="data"
          heightClass={"h-[calc(100vh-420px)]"}
          removeSortingForColumnIds={[
            "total_cases",
            "month",
            "legal_opinion",
            "litigation",
            "e.p_valuation",
          ]}
        />
      )}
    </div>
  );
};

export default OrganizationTable;
