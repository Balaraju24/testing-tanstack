import HandledCases from "@/components/icons/handled-case";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAdvocateWiseCaseTrendsAPI,
  getManagerWiseCaseTrendsAPI,
} from "@/http/services/advocate";
import { caseTrends } from "@/lib/interfaces/advocate";
import { getCaseTrendsChartOptions } from "@/utils/helpers/caseTrendsChartOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

const CasesViewTrends = () => {
  const { advocate_id, manager_id } = useParams({ strict: false });
  const currentYear = new Date().getFullYear();
  const endYear = Math.max(currentYear, 2026);
  const years = Array.from({ length: endYear - 2022 + 1 }, (_, i) => 2022 + i);

  const [year, setYear] = useState(currentYear);

  const { isLoading, data: caseTrends } = useQuery({
    queryKey: ["caseTrends", manager_id, advocate_id, year],
    queryFn: async () => {
      let queryParams = {
        from_date: `${year}-01-01`,
        to_date: `${year}-12-31`,
      };
      let response;

      if (manager_id) {
        response = await getManagerWiseCaseTrendsAPI(manager_id, queryParams);
      } else if (advocate_id) {
        response = await getAdvocateWiseCaseTrendsAPI(advocate_id, queryParams);
      } else {
        throw new Error(`No id provided`);
      }

      if (response?.status === 200 || response?.status === 201) {
        return response?.data?.data;
      }
      throw new Error("Failed to fetch monthly case trends.");
    },
    enabled: !!(manager_id || advocate_id) && !!year,
    refetchOnWindowFocus: false,
  });

  const months = caseTrends?.map((trend: caseTrends) => trend.month) || [];
  const caseCounts =
    caseTrends?.map((trend: caseTrends) => trend.cases_count) || [];

  const barChartOptions = getCaseTrendsChartOptions(months, caseCounts);

  return (
    <Card className="h-full overflow-hidden p-4 space-y-4 rounded-none border-gray-200 mx-2">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2">
            <HandledCases className="w-4 h-4" />
            <span className="text-xs 3xl:text-sm text-black opacity-80 font-normal">
              Cases Handled in a Year
            </span>
          </p>
          <Select
            value={year.toString()}
            onValueChange={(val) => setYear(Number(val))}
          >
            <SelectTrigger className="w-24 text-xs border rounded px-2 py-1 text-black cursor-pointer">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {years.map((y) => (
                <SelectItem
                  key={y}
                  value={y.toString()}
                  className="cursor-pointer"
                >
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-40px)]">
        <div className="h-full">
          <div className="h-full">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-4 h-[calc(100%-40px)] text-center">
                <div className="space-y-2">Loading case trends...</div>
              </div>
            ) : (
              <HighchartsReact
                highcharts={Highcharts}
                options={barChartOptions}
                containerProps={{ style: { height: "99%", width: "100%" } }}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CasesViewTrends;
