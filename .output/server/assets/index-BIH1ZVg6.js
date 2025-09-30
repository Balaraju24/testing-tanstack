import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useState, useEffect } from "react";
import { g as getOrgServiceCasesCount } from "./dashboard-uQmz2qHd.js";
import { g as getIcon, u as useOrganizationsStats, I as INRFormatter, a as useLocations, b as useOrganizationDropdown, C as ComboBox, c as CustomDateRangePicker } from "./dashboard_queries-CTi2BkbR.js";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch, useLocation } from "@tanstack/react-router";
import dayjs from "dayjs";
import { MapPin } from "lucide-react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { L as LoadingComponent } from "./Loading-CtQhAIXf.js";
import { N as NoDataDisplay } from "./NoDataBlock-OQRQAvdc.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./litigation-icon-CGSJaxzX.js";
import "./router-o2MrkizZ.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./popover-CzRIlGkS.js";
import "@radix-ui/react-popover";
import "./command-DpLzz_EP.js";
import "cmdk";
import "./calendar-Dtf51Yqv.js";
import "react-day-picker";
import "./separator-D4bWh-hU.js";
import "@radix-ui/react-separator";
import "./select-BFmTkKF2.js";
import "@radix-ui/react-select";
import "./no-cases-data-B3QWVZUO.js";
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "./noDataConstants-CAKRQRCT.js";
const Stats = ({
  dateRange,
  searchOrganization
}) => {
  const navigate = useNavigate();
  const { data: serviceStats, isLoading } = useQuery({
    queryKey: ["serviceStats", dateRange, searchOrganization],
    queryFn: async () => {
      let queryParams = {};
      if (dateRange) {
        queryParams = {
          from_date: dayjs(dateRange?.from).format("YYYY-MM-DD"),
          to_date: dayjs(dateRange?.to).format("YYYY-MM-DD")
        };
      }
      if (searchOrganization) {
        queryParams = { ...queryParams, user_id: searchOrganization };
      }
      const response = await getOrgServiceCasesCount(queryParams);
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
  const allServices = [
    {
      title: "Legal Opinion",
      path: "legal-opinion?page=1&page_size=15&service_type=Legal+opinion&view=grid"
    },
    {
      title: "Engineer Property Valuation",
      path: "engineer-property-valuation?"
    },
    {
      title: "Litigation",
      path: "litigations?page=1&page_size=15&view=grid"
    }
  ];
  const stats = allServices.map((service) => {
    const serviceData = serviceStats?.find(
      (s) => s.service_type.toLowerCase() === service.title.toLowerCase()
    );
    if (serviceData) {
      const statusMap = {};
      serviceData.statuses.forEach((s) => {
        if (s.status === "TO_START") statusMap["to_start"] = s.count;
        if (s.status === "IN_PROGRESS") statusMap["progress"] = s.count;
        if (s.status === "COMPLETED") statusMap["completed"] = s.count;
      });
      return {
        title: service.title,
        path: service.path,
        cases: serviceData.statuses.reduce((a, b) => a + b.count, 0),
        ...statusMap
      };
    } else {
      return {
        title: service.title,
        path: service.path,
        cases: 0,
        to_start: 0,
        progress: 0,
        completed: 0
      };
    }
  });
  const statusConfig = [
    { key: "cases", label: "Cases" },
    { key: "to_start", label: "To Start" },
    { key: "progress", label: "In Progress" },
    { key: "completed", label: "Completed" }
  ];
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2 mt-1 p-1 ", children: stats.map((item, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "p-1 px-2 rounded bg-white border border-gray-300",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium text-gray-800", children: item.title }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 my-1", children: statusConfig.map((status) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "px-2 py-1 border border-gray-300 flex justify-between items-center \r\n                     cursor-pointer hover:bg-gray-50",
            onClick: () => {
              if (status.key === "cases") {
                navigate({
                  to: `/${item.path}`
                });
              } else {
                navigate({
                  to: `/${item.path}&status=${status.key.toUpperCase()}`
                });
              }
            },
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-smd font-light text-gray-700", children: status.label }),
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: item[status.key] || 0 })
              ] }),
              /* @__PURE__ */ jsx("div", { children: getIcon(status.key) })
            ]
          },
          status.key
        )) })
      ]
    },
    index
  )) });
};
const OrganizationStatistics = ({
  dateRange,
  organization,
  location
}) => {
  const { data, isLoading } = useOrganizationsStats({
    dateRange,
    organization,
    location
  });
  const { organizations, months } = data || { organizations: [], months: [] };
  const columns = React__default.useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => "Organization Name",
        cell: (info) => /* @__PURE__ */ jsxs("div", { className: "w-40", children: [
          /* @__PURE__ */ jsx("div", { children: info.row.original.name }),
          /* @__PURE__ */ jsx(Fragment, { children: info.row.original.location.length > 0 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-amber-800 flex gap-1 items-center mt-1 text-[10px]", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3" }),
            " ",
            info.row.original.location
          ] }) })
        ] }),
        size: 140
      },
      ...months.flatMap((month) => [
        {
          id: `${month}-lop-cases`,
          header: () => "Cases",
          meta: { parent: `${month}-lop` },
          cell: (info) => info.row.original.data.find((d) => d.month === month).lop.cases
        },
        {
          id: `${month}-lop-revenue`,
          header: () => "Revenue",
          meta: { parent: `${month}-lop` },
          cell: (info) => {
            const value = info.row.original.data.find(
              (d) => d.month === month
            ).lop.revenue;
            return INRFormatter.format(value);
          }
        },
        {
          id: `${month}-eop-cases`,
          header: () => "Cases",
          meta: { parent: `${month}-eop` },
          cell: (info) => info.row.original.data.find((d) => d.month === month).eop.cases
        },
        {
          id: `${month}-eop-revenue`,
          header: () => "Revenue",
          meta: { parent: `${month}-eop` },
          cell: (info) => {
            const value = info.row.original.data.find(
              (d) => d.month === month
            ).eop.revenue;
            return INRFormatter.format(value);
          }
        },
        {
          id: `${month}-litigation-cases`,
          header: () => "Cases",
          meta: { parent: `${month}-litigation` },
          cell: (info) => info.row.original.data.find((d) => d.month === month).litigation.cases
        },
        {
          id: `${month}-litigation-revenue`,
          header: () => "Revenue",
          meta: { parent: `${month}-litigation` },
          cell: (info) => {
            const value = info.row.original.data.find(
              (d) => d.month === month
            ).litigation.revenue;
            return INRFormatter.format(value);
          }
        }
      ]),
      {
        id: "total-lop-cases",
        header: () => "Cases",
        meta: { parent: "total-lop" },
        cell: (info) => info.row.original.total.lop.cases
      },
      {
        id: "total-lop-revenue",
        header: () => "Revenue",
        meta: { parent: "total-lop" },
        cell: (info) => {
          const value = info.row.original.total.lop.revenue;
          return INRFormatter.format(value);
        }
      },
      {
        id: "total-eop-cases",
        header: () => "Cases",
        meta: { parent: "total-eop" },
        cell: (info) => info.row.original.total.eop.cases
      },
      {
        id: "total-eop-revenue",
        header: () => "Revenue",
        meta: { parent: "total-eop" },
        cell: (info) => {
          const value = info.row.original.total.eop.revenue;
          return INRFormatter.format(value);
        }
      },
      {
        id: "total-litigation-cases",
        header: () => "Cases",
        meta: { parent: "total-litigation" },
        cell: (info) => info.row.original.total.litigation.cases
      },
      {
        id: "total-litigation-revenue",
        header: () => "Revenue",
        meta: { parent: "total-litigation" },
        cell: (info) => {
          const value = info.row.original.total.litigation.revenue;
          return INRFormatter.format(value);
        }
      }
    ],
    [months]
  );
  const table = useReactTable({
    data: organizations,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ jsx("div", { className: "border h-[calc(100vh-280px)] relative overflow-auto border-gray-300", children: isLoading ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isLoading, message: "Loading..." }) : organizations.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "border-separate border-spacing-0 table-auto text-sm min-w-full", children: [
    /* @__PURE__ */ jsxs("thead", { className: "bg-gray-100 sticky top-0 z-30", children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx(
          "th",
          {
            rowSpan: 3,
            className: "font-normal text-sm p-2 border border-gray-300 sticky left-0 bg-gray-100 z-20",
            children: "Organization Name"
          }
        ),
        months.map((m) => /* @__PURE__ */ jsx(
          "th",
          {
            colSpan: 6,
            className: "font-normal border border-gray-300 capitalize text-xs p-2",
            children: m
          },
          m
        )),
        /* @__PURE__ */ jsx(
          "th",
          {
            colSpan: 6,
            className: "font-normal text-xs p-2 sticky border border-gray-300 right-0 bg-gray-100 z-20",
            children: "Total"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        months.map((m) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
          /* @__PURE__ */ jsx(
            "th",
            {
              colSpan: 2,
              className: "font-normal border border-gray-300  text-xs p-2",
              children: "Legal Opinion"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              colSpan: 2,
              className: "font-normal border border-gray-300 text-xs p-2",
              children: "EP Valuation"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              colSpan: 2,
              className: "font-normal border border-gray-300 text-xs p-2",
              children: "Litigation"
            }
          )
        ] }, m)),
        /* @__PURE__ */ jsx(
          "th",
          {
            colSpan: 2,
            className: "font-normal text-xs p-2 border border-gray-300 sticky right-[calc((80px+100px)*2)]  bg-gray-100 z-20",
            children: "Legal Opinion"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            colSpan: 2,
            className: "font-normal text-xs p-2 sticky border border-gray-300 right-[180px] bg-gray-100 z-20",
            children: "EP Valuation"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            colSpan: 2,
            className: "font-normal text-xs p-2 sticky right-0 border border-gray-300 bg-gray-100 z-20",
            children: "Litigation"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        months.map((m) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
          /* @__PURE__ */ jsx(
            "th",
            {
              className: "font-normal border border-gray-300 text-xs p-2",
              style: { width: "80px", minWidth: "80px" },
              children: "Cases"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              className: "font-normal text-xs p-2 border border-gray-300",
              style: { width: "100px", minWidth: "100px" },
              children: "Revenue"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              className: "font-normal text-xs p-2 border border-gray-300",
              style: { width: "80px", minWidth: "80px" },
              children: "Cases"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              className: "font-normal text-xs p-2 border border-gray-300",
              style: { width: "100px", minWidth: "100px" },
              children: "Revenue"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              className: "font-normal text-xs p-2 border border-gray-300",
              style: { width: "80px", minWidth: "80px" },
              children: "Cases"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              className: "font-normal text-xs p-2 border border-gray-300",
              style: { width: "100px", minWidth: "100px" },
              children: "Revenue"
            }
          )
        ] }, m)),
        /* @__PURE__ */ jsx(
          "th",
          {
            className: "font-normal text-xs p-2 border border-gray-300 sticky right-[calc(80px+80px+100px+100px+100px)] bg-gray-100 z-20",
            style: { width: "80px", minWidth: "80px" },
            children: "Cases"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            className: "font-normal text-xs p-2 border border-gray-300 sticky right-[calc((80px+100px)*2)] bg-gray-100 z-20",
            style: { width: "100px", minWidth: "100px" },
            children: "Revenue"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            className: "font-normal text-xs p-2 sticky border border-gray-300 right-[calc(80px+100px+100px)] bg-gray-100 z-20",
            style: { width: "80px", minWidth: "80px" },
            children: "Cases"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            className: "font-normal text-xs p-2 border border-gray-300 sticky right-[calc(80px+100px)] bg-gray-100 z-20",
            style: { width: "100px", minWidth: "100px" },
            children: "Revenue"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            className: "font-normal text-xs p-2 sticky right-[100px] border border-gray-300 bg-gray-100 z-20",
            style: { width: "80px", minWidth: "80px" },
            children: "Cases"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            className: "font-normal text-xs p-2 sticky right-0 border border-gray-300 bg-gray-100 z-20",
            style: { width: "100px", minWidth: "100px" },
            children: "Revenue"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { children: row.getVisibleCells().map((cell, idx) => /* @__PURE__ */ jsx(
      "td",
      {
        className: `border-r border-gray-300 p-2 text-xs text-center ${idx === 0 ? "sticky left-0 bg-white z-10 text-left" : idx >= row.getVisibleCells().length - 6 ? "sticky bg-white z-10" : idx === row.getVisibleCells().length - 5 ? "border-l border-gray-300" : ""}`,
        style: idx >= row.getVisibleCells().length - 6 ? {
          right: `${[80, 100, 80, 100, 80, 100].slice(
            idx - (row.getVisibleCells().length - 6) + 1
          ).reduce((a, b) => a + b, 0)}px`
        } : {},
        children: flexRender(cell.column.columnDef.cell, cell.getContext())
      },
      cell.id
    )) }, row.id)) })
  ] }) : /* @__PURE__ */ jsx("div", { className: "mt-3 h-[calc(100vh-400px)] flex flex-col items-center justify-center", children: /* @__PURE__ */ jsx(NoDataDisplay, { title: "Data" }) }) });
};
const RevenueStatistics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const search = useSearch({
    strict: false
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [dateRange, setDateRange] = useState();
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchOrganizationString, setSearchOrganizationString] = useState();
  const [searchOrganization, setSearchOrganization] = useState(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { data: locationData, isLoading } = useLocations({
    search_string: searchLocation
  });
  const location2 = locationData?.records?.map((location3) => {
    return {
      id: location3.id,
      label: location3.name
    };
  });
  const { data: organizationsData, isLoading: isLoadingOrganizations } = useOrganizationDropdown(searchOrganizationString);
  const allOrganizations = organizationsData?.records?.map((org) => {
    return {
      id: org.id,
      label: org.organisation_name
    };
  });
  useEffect(() => {
    const fromDate = search.from ? dayjs(search.from).toDate() : void 0;
    const toDate = search.to ? dayjs(search.to).toDate() : void 0;
    if (fromDate || toDate) {
      setDateRange({ from: fromDate, to: toDate });
    }
    if (search.from || search.to) {
      navigate({
        to: location?.pathname,
        search: void 0,
        replace: true
      });
    }
  }, [search.from, search.to, navigate]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end  items-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
        ComboBox,
        {
          items: allOrganizations,
          placeholder: "Select Organization",
          value: allOrganizations?.find(
            (o) => o.id === searchOrganization
          ),
          onChange: (item) => setSearchOrganization(item?.id),
          className: "h-8 text-smd font-light border-gray-300",
          contentClassName: "bg-white rounded",
          isLoading: isLoadingOrganizations,
          onSearchChange: setSearchOrganizationString,
          enableApiSearch: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        ComboBox,
        {
          items: location2,
          placeholder: "Select Location",
          value: location2?.find((o) => o.id === selectedLocation),
          onChange: (item) => setSelectedLocation(item?.id),
          defaultIcon: MapPin,
          className: "h-8 text-smd font-light border-gray-300",
          contentClassName: "bg-white rounded",
          isLoading,
          onSearchChange: (search2) => setSearchLocation(search2),
          enableApiSearch: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        CustomDateRangePicker,
        {
          date: dateRange,
          setDate: setDateRange,
          mode: "month-year",
          align: "end"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Stats, { dateRange, searchOrganization }),
    /* @__PURE__ */ jsx("div", { className: "p-1 mt-1", children: /* @__PURE__ */ jsx(
      OrganizationStatistics,
      {
        dateRange,
        location: selectedLocation,
        organization: searchOrganization
      }
    ) })
  ] });
};
const SplitComponent = RevenueStatistics;
export {
  SplitComponent as component
};
