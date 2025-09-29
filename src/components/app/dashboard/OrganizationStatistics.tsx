import CustomDateRangePicker from "@/components/core/CustomDateRangePicker";
import {
  useAdvocateOrgDropdown,
  useLocations,
  useOrganizationDropdown,
  useOrganizationsStats,
  useAdvocateLocationDropdown,
} from "@/components/core/dashboard_queries";

import LoadingComponent from "@/components/core/Loading";
import NoDataDisplay from "@/components/core/NoDataBlock";
import ComboBox from "@/components/ui/combo-box";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { INRFormatter } from "@/utils/helpers/formatINR";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useNavigate } from "@tanstack/react-router";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const OrganizationStatistics = () => {
  const [location, setLocation] = useState<number | null>(null);
  const [searchOrganization, setSearchOrganization] = useState<string | null>(
    null
  );
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dayjs().subtract(1, "month").startOf("month").toDate(),
    to: dayjs().endOf("day").toDate(),
  });

  const [searchOrganizationString, setSearchOrganizationString] =
    useState<string>();

  const [searchLocation, setSearchLocation] = useState<string | null>(null);

  const { isAdvocate, isManager, isUser, isAdmin } = useUserDetails();

  const { data, isLoading } = useOrganizationsStats({
    dateRange,
    organization: searchOrganization,
    location: location,
  });

  const { data: locationData } = useLocations({
    search_string: searchLocation,
    enabled: !!isAdmin(),
  });
  const allLocations = locationData?.records?.map((location) => {
    return {
      id: location.id,
      label: location.name,
    };
  });

  const { organizations, months } = data || { organizations: [], months: [] };

  const { data: organizationsData, isLoading: isLoadingOrganizations } =
    useOrganizationDropdown(searchOrganizationString, isManager() || isAdmin());

  const allOrganizations = organizationsData?.records?.map((org) => {
    return {
      id: org.id,
      label: org.organisation_name,
    };
  });

  const { data: advocatesOrgData, isLoading: isLoadingAdvocates } =
    useAdvocateOrgDropdown(isAdvocate());

  const allAdvocatesOrg = advocatesOrgData?.map((advocate) => {
    return {
      id: advocate.id,
      label: advocate.organisation_name,
    };
  });

  const { data: advocatesLocData, isLoading: isLoadingAdvocatesLoc } =
    useAdvocateLocationDropdown(isAdvocate());

  const allAdvocatesLoc = advocatesLocData?.map((advLoc) => {
    return {
      id: advLoc.id,
      label: advLoc.name,
    };
  });

  const columns = React.useMemo<ColumnDef<any>[]>(() => {
    const cols: ColumnDef<any>[] = [
      {
        accessorKey: "name",
        header: () => "Organization Name",
        cell: (info) => (
          <div className=" ">
            <Tooltip>
              <TooltipTrigger className="max-w-full">
                <div className="max-w-full whitespace-nowrap truncate text-left">
                  {info.row.original.name}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-white w-fit z-50! py-1 text-smd border-gray-300"
              >
                {info.row.original.name}
              </TooltipContent>
            </Tooltip>
            {isAdmin() && info.row.original.location.length > 0 && (
              <div className="text-xs text-amber-800 flex gap-1 items-center mt-1 text-[10px]">
                <MapPin className="w-3 h-3" /> {info.row.original.location}
              </div>
            )}
          </div>
        ),
        size: 160,
      },
    ];

    months.forEach((month) => {
      ["lop", "eop", "litigation"].forEach((type) => {
        // Cases
        cols.push({
          id: `${month}-${type}-cases`,
          header: () => "Cases",
          meta: { parent: `${month}-${type}` },
          cell: (info) =>
            info.row.original.data.find((d: any) => d.month === month)[type]
              .cases,
          size: 60,
        });

        if (!isAdvocate()) {
          cols.push({
            id: `${month}-${type}-revenue`,
            header: () => "Revenue",
            meta: { parent: `${month}-${type}` },
            cell: (info) =>
              INRFormatter.format(
                info.row.original.data.find((d: any) => d.month === month)[type]
                  .revenue
              ),
            size: 100,
          });
        }
      });
    });

    ["lop", "eop", "litigation"].forEach((type) => {
      cols.push({
        id: `total-${type}-cases`,
        header: () => "Cases",
        meta: { parent: `total-${type}` },
        cell: (info) => info.row.original.total[type].cases,
        size: 60,
      });

      if (!isAdvocate()) {
        cols.push({
          id: `total-${type}-revenue`,
          header: () => "Revenue",
          meta: { parent: `total-${type}` },
          cell: (info) =>
            INRFormatter.format(info.row.original.total[type].revenue),
          size: 100,
        });
      }
    });

    return cols;
  }, [months, isAdvocate]);

  const table = useReactTable({
    data: organizations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to || !isAdmin()) return;

    const fromDate = dayjs(dateRange.from);
    const toDate = dayjs(dateRange.to);

    const monthsDiff = toDate.diff(fromDate, "month", true);

    if (monthsDiff > 3) {
      navigate({
        to: `/revenue-statistics?from=${fromDate.format("YYYY-MM-DD")}&to=${toDate.format("YYYY-MM-DD")}`,
      });
    }
  }, [dateRange, navigate]);

  if (isLoading) {
    return (
      <div className="mt-2 p-4 bg-white">
        <div className="flex items-center justify-between"></div>
        <div className="mt-3 h-[calc(100vh-327px)] relative flex items-center justify-center">
          <LoadingComponent loading={isLoading} />
        </div>
      </div>
    );
  }

  if (organizations?.length === 0)
    return (
      <div className="mt-2 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div>Organization Statistics</div>
          <div className="flex gap-2">
            <div className="relative">
              {isAdvocate() ? (
                <ComboBox
                  items={allAdvocatesOrg}
                  placeholder="Select Organization"
                  value={allAdvocatesOrg?.find(
                    (o) => o.id === searchOrganization
                  )}
                  onChange={(item) => setSearchOrganization(item?.id)}
                  className="h-8 text-smd font-light border-gray-300"
                  contentClassName="bg-white rounded"
                  isLoading={isLoadingOrganizations}
                  onSearchChange={setSearchOrganizationString}
                />
              ) : (
                <ComboBox
                  items={allOrganizations}
                  placeholder="Select Organization"
                  value={allOrganizations?.find(
                    (o) => o.id === searchOrganization
                  )}
                  onChange={(item) => setSearchOrganization(item?.id)}
                  className="h-8 text-smd font-light border-gray-300"
                  contentClassName="bg-white rounded"
                  isLoading={isLoadingOrganizations}
                  onSearchChange={setSearchOrganizationString}
                  enableApiSearch={true}
                />
              )}
            </div>
            {isAdvocate() && (
              <ComboBox
                items={allAdvocatesLoc}
                placeholder="Select Location"
                value={allAdvocatesLoc?.find((l) => l.id === location)}
                onChange={(item) => setLocation(item?.id)}
                defaultIcon={MapPin}
                className="h-8 text-smd font-light border-gray-300"
                contentClassName="bg-white rounded"
                isLoading={isLoading}
                enableApiSearch={true}
                onSearchChange={setSearchLocation}
              />
            )}
            {isAdmin() && (
              <ComboBox
                items={allLocations}
                placeholder="Select Location"
                value={allLocations?.find((l) => l.id === location)}
                onChange={(item) => setLocation(item?.id)}
                defaultIcon={MapPin}
                className="h-8 text-smd font-light border-gray-300"
                contentClassName="bg-white rounded"
                isLoading={isLoading}
                enableApiSearch={true}
                onSearchChange={setSearchLocation}
              />
            )}

            <CustomDateRangePicker
              date={dateRange}
              setDate={setDateRange}
              mode="month-year"
              align="end"
            />
          </div>
        </div>
        <div className="mt-3 h-[calc(100vh-327px)]  flex flex-col items-center justify-center">
          <NoDataDisplay height="h-[calc(100vh-327px)]" title="Data" />
        </div>
      </div>
    );

  return (
    <div className="mt-2 p-4 bg-white">
      <div className="flex items-center justify-between">
        <div>Organization Statistics</div>
        <div className="flex gap-2">
          <div className="relative">
            {isAdvocate() ? (
              <ComboBox
                items={allAdvocatesOrg}
                placeholder="Select Organization"
                value={allAdvocatesOrg?.find(
                  (o) => o.id === searchOrganization
                )}
                onChange={(item) => setSearchOrganization(item?.id)}
                className="h-8 text-smd font-light border-gray-300"
                contentClassName="bg-white rounded"
                isLoading={isLoadingOrganizations}
                onSearchChange={setSearchOrganizationString}
              />
            ) : (
              <ComboBox
                items={allOrganizations}
                placeholder="Select Organization"
                value={allOrganizations?.find(
                  (o) => o.id === searchOrganization
                )}
                onChange={(item) => setSearchOrganization(item?.id)}
                className="h-8 text-smd font-light border-gray-300"
                contentClassName="bg-white rounded"
                isLoading={isLoadingOrganizations}
                onSearchChange={setSearchOrganizationString}
                enableApiSearch={true}
              />
            )}
          </div>
          {isAdvocate() && (
            <ComboBox
              items={allAdvocatesLoc}
              placeholder="Select Location"
              value={allAdvocatesLoc?.find((l) => l.id === location)}
              onChange={(item) => setLocation(item?.id)}
              defaultIcon={MapPin}
              className="h-8 text-smd font-light border-gray-300"
              contentClassName="bg-white rounded"
              isLoading={isLoading}
              enableApiSearch={true}
              onSearchChange={setSearchLocation}
            />
          )}
          {isAdmin() && (
            <ComboBox
              items={allLocations}
              placeholder="Select Location"
              value={allLocations?.find((l) => l.id === location)}
              onChange={(item) => setLocation(item?.id)}
              defaultIcon={MapPin}
              className="h-8 text-smd font-light border-gray-300"
              contentClassName="bg-white rounded"
              isLoading={isLoading}
              enableApiSearch={true}
              onSearchChange={setSearchLocation}
            />
          )}
          <CustomDateRangePicker
            date={dateRange}
            setDate={setDateRange}
            mode="month-year"
            align="end"
          />
        </div>
      </div>
      <div
        className={`mt-3 ${isAdvocate() ? "h-[calc(100vh-250px)]" : "h-[calc(100vh-320px)]"} relative`}
      >
        <div
          className={`overflow-auto  ${isAdvocate() ? "h-[calc(100vh-238px)]" : "h-[calc(100vh-308px)]"}  border-gray-300`}
        >
          <table className="border-separate border  border-spacing-0 table-fixed text-sm min-w-full ">
            <thead className="bg-gray-100 sticky top-0 z-30">
              <tr>
                <th
                  rowSpan={3}
                  className="font-normal sticky left-0 z-20 text-sm p-2 border bg-gray-200 border-gray-300"
                >
                  Organization Name
                </th>
                {months.map((month) => (
                  <th
                    key={month}
                    colSpan={isAdvocate() ? 3 : 6}
                    className="font-normal text-xs capitalize p-2 border border-gray-300"
                  >
                    {month}
                  </th>
                ))}
                <th
                  colSpan={isAdvocate() ? 3 : 6}
                  className="font-normal text-xs p-2 border border-gray-300"
                >
                  Total
                </th>
              </tr>

              <tr>
                {months.map((month) => (
                  <React.Fragment key={month}>
                    <th
                      colSpan={isAdvocate() ? 1 : 2}
                      className="font-normal text-xs p-2 border border-gray-300"
                    >
                      Legal Opinion
                    </th>
                    <th
                      colSpan={isAdvocate() ? 1 : 2}
                      className="font-normal text-xs p-2 border border-gray-300"
                    >
                      EP Valuation
                    </th>
                    <th
                      colSpan={isAdvocate() ? 1 : 2}
                      className="font-normal text-xs p-2 border border-gray-300"
                    >
                      Litigation
                    </th>
                  </React.Fragment>
                ))}

                {["lop", "eop", "litigation"].map((type) => (
                  <th
                    key={type}
                    colSpan={isAdvocate() ? 1 : 2}
                    className="font-normal text-xs p-2 border border-gray-300"
                  >
                    {type === "lop"
                      ? "Legal Opinion"
                      : type === "eop"
                        ? "EP Valuation"
                        : "Litigation"}
                  </th>
                ))}
              </tr>

              <tr>
                {months.map((m) => (
                  <React.Fragment key={m}>
                    <th
                      className="font-normal border-r border-gray-300 text-xs p-2"
                      style={{ width: "60px", minWidth: "60px" }}
                    >
                      Cases
                    </th>
                    {!isAdvocate() && (
                      <th
                        className="font-normal border-r border-gray-300 text-xs p-2"
                        style={{ width: "60px", minWidth: "60px" }}
                      >
                        Revenue
                      </th>
                    )}
                    <th
                      className="font-normal border-r border-gray-300 text-xs p-2"
                      style={{ width: "60px", minWidth: "60px" }}
                    >
                      Cases
                    </th>
                    {!isAdvocate() && (
                      <th
                        className="font-normal border-r border-gray-300 text-xs p-2"
                        style={{ width: "60px", minWidth: "60px" }}
                      >
                        Revenue
                      </th>
                    )}
                    <th
                      className="font-normal border-r border-gray-300 text-xs p-2"
                      style={{ width: "60px", minWidth: "60px" }}
                    >
                      Cases
                    </th>
                    {!isAdvocate() && (
                      <th
                        className="font-normal border-r border-gray-300 text-xs p-2"
                        style={{ width: "60px", minWidth: "60px" }}
                      >
                        Revenue
                      </th>
                    )}
                  </React.Fragment>
                ))}

                {["lop", "eop", "litigation"].map((type) => (
                  <React.Fragment key={type}>
                    <th className="font-normal text-xs p-2 border-r border-gray-300 bg-gray-100">
                      Cases
                    </th>
                    {!isAdvocate() && (
                      <th className="font-normal text-xs p-2 bg-gray-100">
                        Revenue
                      </th>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="h-auto">
                  {row.getVisibleCells().map((cell, idx) => (
                    <td
                      key={cell.id}
                      className={`border-r  border-gray-300 p-2 text-xs text-center ${
                        idx === 0 && "sticky left-0 bg-white z-10 text-left"
                      } `}
                      style={{
                        minWidth: `${cell.column.columnDef.size}px`,
                        maxWidth: `${cell.column.columnDef.size}px`,
                        width: `${cell.column.columnDef.size}px`,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {organizations.length === 0 && (
                <tr>
                  <td
                    colSpan={months.length * 3 + 3}
                    className="text-center p-4"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizationStatistics;
