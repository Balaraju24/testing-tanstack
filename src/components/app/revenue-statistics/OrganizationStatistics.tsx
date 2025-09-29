import { INRFormatter } from "@/utils/helpers/formatINR";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MapPin } from "lucide-react";
import React from "react";

import LoadingComponent from "@/components/core/Loading";
import NoDataDisplay from "@/components/core/NoDataBlock";
import { useOrganizationsStats } from "@/components/core/dashboard_queries";
import { DateRange } from "react-day-picker";

const OrganizationStatistics = ({
  dateRange,
  organization,
  location,
}: {
  dateRange?: DateRange;
  organization?: string | null;
  location?: number | null;
}) => {
  const { data, isLoading } = useOrganizationsStats({
    dateRange,
    organization,
    location,
  });

  const { organizations, months } = data || { organizations: [], months: [] };

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => "Organization Name",
        cell: (info) => (
          <div className="w-40">
            <div>{info.row.original.name}</div>
            <>
              {info.row.original.location.length > 0 && (
                <div className="text-xs text-amber-800 flex gap-1 items-center mt-1 text-[10px]">
                  <MapPin className="w-3 h-3" /> {info.row.original.location}
                </div>
              )}
            </>
          </div>
        ),
        size: 140,
      },

      ...months.flatMap((month) => [
        {
          id: `${month}-lop-cases`,
          header: () => "Cases",
          meta: { parent: `${month}-lop` },
          cell: (info) =>
            info.row.original.data.find((d: any) => d.month === month).lop
              .cases,
        },
        {
          id: `${month}-lop-revenue`,
          header: () => "Revenue",
          meta: { parent: `${month}-lop` },
          cell: (info) => {
            const value = info.row.original.data.find(
              (d: any) => d.month === month
            ).lop.revenue;
            return INRFormatter.format(value);
          },
        },
        {
          id: `${month}-eop-cases`,
          header: () => "Cases",
          meta: { parent: `${month}-eop` },
          cell: (info) =>
            info.row.original.data.find((d: any) => d.month === month).eop
              .cases,
        },
        {
          id: `${month}-eop-revenue`,
          header: () => "Revenue",
          meta: { parent: `${month}-eop` },
          cell: (info) => {
            const value = info.row.original.data.find(
              (d: any) => d.month === month
            ).eop.revenue;
            return INRFormatter.format(value);
          },
        },
        {
          id: `${month}-litigation-cases`,
          header: () => "Cases",
          meta: { parent: `${month}-litigation` },
          cell: (info) =>
            info.row.original.data.find((d: any) => d.month === month)
              .litigation.cases,
        },
        {
          id: `${month}-litigation-revenue`,
          header: () => "Revenue",
          meta: { parent: `${month}-litigation` },
          cell: (info) => {
            const value = info.row.original.data.find(
              (d: any) => d.month === month
            ).litigation.revenue;
            return INRFormatter.format(value);
          },
        },
      ]),

      {
        id: "total-lop-cases",
        header: () => "Cases",
        meta: { parent: "total-lop" },
        cell: (info) => info.row.original.total.lop.cases,
      },
      {
        id: "total-lop-revenue",
        header: () => "Revenue",
        meta: { parent: "total-lop" },
        cell: (info) => {
          const value = info.row.original.total.lop.revenue;
          return INRFormatter.format(value);
        },
      },
      {
        id: "total-eop-cases",
        header: () => "Cases",
        meta: { parent: "total-eop" },
        cell: (info) => info.row.original.total.eop.cases,
      },
      {
        id: "total-eop-revenue",
        header: () => "Revenue",
        meta: { parent: "total-eop" },
        cell: (info) => {
          const value = info.row.original.total.eop.revenue;
          return INRFormatter.format(value);
        },
      },
      {
        id: "total-litigation-cases",
        header: () => "Cases",
        meta: { parent: "total-litigation" },
        cell: (info) => info.row.original.total.litigation.cases,
      },
      {
        id: "total-litigation-revenue",
        header: () => "Revenue",
        meta: { parent: "total-litigation" },
        cell: (info) => {
          const value = info.row.original.total.litigation.revenue;
          return INRFormatter.format(value);
        },
      },
    ],
    [months]
  );

  const table = useReactTable({
    data: organizations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border h-[calc(100vh-280px)] relative overflow-auto border-gray-300">
      {isLoading ? (
        <LoadingComponent loading={isLoading} message="Loading..." />
      ) : organizations.length > 0 ? (
        <table className="border-separate border-spacing-0 table-auto text-sm min-w-full">
          <thead className="bg-gray-100 sticky top-0 z-30">
            <tr>
              <th
                rowSpan={3}
                className="font-normal text-sm p-2 border border-gray-300 sticky left-0 bg-gray-100 z-20"
              >
                Organization Name
              </th>
              {months.map((m) => (
                <th
                  key={m}
                  colSpan={6}
                  className="font-normal border border-gray-300 capitalize text-xs p-2"
                >
                  {m}
                </th>
              ))}
              <th
                colSpan={6}
                className="font-normal text-xs p-2 sticky border border-gray-300 right-0 bg-gray-100 z-20"
              >
                Total
              </th>
            </tr>

            <tr>
              {months.map((m) => (
                <React.Fragment key={m}>
                  <th
                    colSpan={2}
                    className="font-normal border border-gray-300  text-xs p-2"
                  >
                    Legal Opinion
                  </th>
                  <th
                    colSpan={2}
                    className="font-normal border border-gray-300 text-xs p-2"
                  >
                    EP Valuation
                  </th>
                  <th
                    colSpan={2}
                    className="font-normal border border-gray-300 text-xs p-2"
                  >
                    Litigation
                  </th>
                </React.Fragment>
              ))}
              <th
                colSpan={2}
                className="font-normal text-xs p-2 border border-gray-300 sticky right-[calc((80px+100px)*2)]  bg-gray-100 z-20"
              >
                Legal Opinion
              </th>
              <th
                colSpan={2}
                className="font-normal text-xs p-2 sticky border border-gray-300 right-[180px] bg-gray-100 z-20"
              >
                EP Valuation
              </th>
              <th
                colSpan={2}
                className="font-normal text-xs p-2 sticky right-0 border border-gray-300 bg-gray-100 z-20"
              >
                Litigation
              </th>
            </tr>

            <tr>
              {months.map((m) => (
                <React.Fragment key={m}>
                  <th
                    className="font-normal border border-gray-300 text-xs p-2"
                    style={{ width: "80px", minWidth: "80px" }}
                  >
                    Cases
                  </th>
                  <th
                    className="font-normal text-xs p-2 border border-gray-300"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    Revenue
                  </th>
                  <th
                    className="font-normal text-xs p-2 border border-gray-300"
                    style={{ width: "80px", minWidth: "80px" }}
                  >
                    Cases
                  </th>
                  <th
                    className="font-normal text-xs p-2 border border-gray-300"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    Revenue
                  </th>
                  <th
                    className="font-normal text-xs p-2 border border-gray-300"
                    style={{ width: "80px", minWidth: "80px" }}
                  >
                    Cases
                  </th>
                  <th
                    className="font-normal text-xs p-2 border border-gray-300"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    Revenue
                  </th>
                </React.Fragment>
              ))}
              <th
                className="font-normal text-xs p-2 border border-gray-300 sticky right-[calc(80px+80px+100px+100px+100px)] bg-gray-100 z-20"
                style={{ width: "80px", minWidth: "80px" }}
              >
                Cases
              </th>
              <th
                className="font-normal text-xs p-2 border border-gray-300 sticky right-[calc((80px+100px)*2)] bg-gray-100 z-20"
                style={{ width: "100px", minWidth: "100px" }}
              >
                Revenue
              </th>
              <th
                className="font-normal text-xs p-2 sticky border border-gray-300 right-[calc(80px+100px+100px)] bg-gray-100 z-20"
                style={{ width: "80px", minWidth: "80px" }}
              >
                Cases
              </th>
              <th
                className="font-normal text-xs p-2 border border-gray-300 sticky right-[calc(80px+100px)] bg-gray-100 z-20"
                style={{ width: "100px", minWidth: "100px" }}
              >
                Revenue
              </th>
              <th
                className="font-normal text-xs p-2 sticky right-[100px] border border-gray-300 bg-gray-100 z-20"
                style={{ width: "80px", minWidth: "80px" }}
              >
                Cases
              </th>
              <th
                className="font-normal text-xs p-2 sticky right-0 border border-gray-300 bg-gray-100 z-20"
                style={{ width: "100px", minWidth: "100px" }}
              >
                Revenue
              </th>
            </tr>
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, idx) => (
                  <td
                    key={cell.id}
                    className={`border-r border-gray-300 p-2 text-xs text-center ${
                      idx === 0
                        ? "sticky left-0 bg-white z-10 text-left"
                        : idx >= row.getVisibleCells().length - 6
                          ? "sticky bg-white z-10"
                          : idx === row.getVisibleCells().length - 5
                            ? "border-l border-gray-300"
                            : ""
                    }`}
                    style={
                      idx >= row.getVisibleCells().length - 6
                        ? {
                            right: `${[80, 100, 80, 100, 80, 100]
                              .slice(
                                idx - (row.getVisibleCells().length - 6) + 1
                              )
                              .reduce((a, b) => a + b, 0)}px`,
                          }
                        : {}
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-3 h-[calc(100vh-400px)] flex flex-col items-center justify-center">
          <NoDataDisplay title="Data" />
        </div>
      )}
    </div>
  );
};

export default OrganizationStatistics;
