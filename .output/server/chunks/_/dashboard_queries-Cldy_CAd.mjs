import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { L as Litigation } from './litigation-icon-CGSJaxzX.mjs';
import { X, ChevronsUpDown, Loader2, Check, Calendar, XIcon, Circle } from 'lucide-react';
import * as React from 'react';
import React__default from 'react';
import { B as Button } from './router-e7zdrxGz.mjs';
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from './popover-8VPYQ3UR.mjs';
import { C as Command, a as CommandInput, b as CommandList, c as CommandEmpty, d as CommandGroup, e as CommandItem } from './command-DoJaARCj.mjs';
import { C as Calendar$1 } from './calendar-BN2MwFmY.mjs';
import { S as Separator } from './separator-BzkEE94Y.mjs';
import dayjs from 'dayjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, e as SelectGroup, d as SelectItem } from './select-DGUsKCQS.mjs';
import { l as getAllLocations, o as orgsDropdown, O as OrgsStatsAPI, m as advOrgDropDown, n as advLocDropdown } from './dashboard-uQmz2qHd.mjs';
import { useQuery } from '@tanstack/react-query';

const HourGlassIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "11",
      height: "16",
      viewBox: "0 0 11 16",
      fill: "none",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M9.85413 0.6875H1.97913C1.68076 0.6875 1.39461 0.806026 1.18363 1.017C0.972652 1.22798 0.854126 1.51413 0.854126 1.8125V4.34375C0.854506 4.51833 0.895336 4.69045 0.973412 4.84661C1.05149 5.00276 1.16469 5.1387 1.30413 5.24375L4.97936 8L1.30413 10.7562C1.16469 10.8613 1.05149 10.9972 0.973412 11.1534C0.895336 11.3095 0.854506 11.4817 0.854126 11.6562V14.1875C0.854126 14.4859 0.972652 14.772 1.18363 14.983C1.39461 15.194 1.68076 15.3125 1.97913 15.3125H9.85413C10.1525 15.3125 10.4386 15.194 10.6496 14.983C10.8606 14.772 10.9791 14.4859 10.9791 14.1875V11.6816C10.9787 11.5076 10.9382 11.3362 10.8608 11.1804C10.7834 11.0247 10.6711 10.8889 10.5326 10.7837L6.84967 8L10.5326 5.21563C10.6711 5.11057 10.7835 4.97494 10.8609 4.81931C10.9384 4.66368 10.9788 4.49227 10.9791 4.31844V1.8125C10.9791 1.51413 10.8606 1.22798 10.6496 1.017C10.4386 0.806026 10.1525 0.6875 9.85413 0.6875ZM9.85413 1.8125V2.9375H1.97913V1.8125H9.85413ZM9.85413 14.1875H1.97913V11.6562L5.91663 8.70312L9.85413 11.6809V14.1875ZM5.91663 7.29688L1.97913 4.34375V4.0625H9.85413V4.31844L5.91663 7.29688Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const RefreshIcon2 = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "15",
      viewBox: "0 0 16 15",
      fill: "none",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M15.8333 1.1499V4.8999C15.8333 5.06566 15.7674 5.22463 15.6502 5.34184C15.533 5.45905 15.374 5.5249 15.2083 5.5249H11.4583C11.2925 5.5249 11.1335 5.45905 11.0163 5.34184C10.8991 5.22463 10.8333 5.06566 10.8333 4.8999C10.8333 4.73414 10.8991 4.57517 11.0163 4.45796C11.1335 4.34075 11.2925 4.2749 11.4583 4.2749H13.6997L12.5567 3.13193C11.3951 1.96506 9.818 1.30674 8.17153 1.30146H8.13638C6.5037 1.29763 4.93514 1.93668 3.76997 3.08037C3.65061 3.19179 3.49239 3.25208 3.32915 3.24833C3.1659 3.24459 3.01061 3.17711 2.89649 3.06033C2.78236 2.94355 2.71847 2.78675 2.71848 2.62346C2.71849 2.46018 2.7824 2.30338 2.89653 2.18662C4.30867 0.806458 6.20811 0.0388668 8.18265 0.0504216C10.1572 0.0619763 12.0475 0.851745 13.4434 2.24834L14.5833 3.3913V1.1499C14.5833 0.984138 14.6491 0.825167 14.7663 0.707957C14.8835 0.590747 15.0425 0.524899 15.2083 0.524899C15.374 0.524899 15.533 0.590747 15.6502 0.707957C15.7674 0.825167 15.8333 0.984138 15.8333 1.1499ZM12.8965 11.7194C11.7198 12.8688 10.1375 13.508 8.49258 13.4984C6.8477 13.4887 5.27294 12.831 4.10981 11.6679L2.96685 10.5249H5.20825C5.37401 10.5249 5.53298 10.4591 5.65019 10.3418C5.7674 10.2246 5.83325 10.0657 5.83325 9.8999C5.83325 9.73414 5.7674 9.57517 5.65019 9.45796C5.53298 9.34075 5.37401 9.2749 5.20825 9.2749H1.45825C1.29249 9.2749 1.13352 9.34075 1.01631 9.45796C0.8991 9.57517 0.833252 9.73414 0.833252 9.8999V13.6499C0.833252 13.8157 0.8991 13.9746 1.01631 14.0918C1.13352 14.2091 1.29249 14.2749 1.45825 14.2749C1.62401 14.2749 1.78298 14.2091 1.90019 14.0918C2.0174 13.9746 2.08325 13.8157 2.08325 13.6499V11.4085L3.22622 12.5515C4.62014 13.9524 6.51325 14.7426 8.4895 14.7483H8.53091C10.4903 14.7534 12.3729 13.9863 13.7708 12.6132C13.8849 12.4964 13.9488 12.3396 13.9488 12.1763C13.9488 12.013 13.8849 11.8562 13.7708 11.7395C13.6567 11.6227 13.5014 11.5552 13.3381 11.5515C13.1749 11.5477 13.0167 11.608 12.8973 11.7194H12.8965Z",
          fill: "#F2C94C"
        }
      )
    }
  );
};
const getIcon = (title) => {
  switch (title) {
    case "cases":
      return /* @__PURE__ */ jsx("div", { className: "p-1 bg-green-200", children: /* @__PURE__ */ jsx(Litigation, { className: "w-3.5 h-3.5 text-green-700" }) });
    case "to_start":
      return /* @__PURE__ */ jsx("div", { className: "p-1 bg-blue-100", children: /* @__PURE__ */ jsx(HourGlassIcon, { className: "w-3.5 h-3.5 text-blue-500" }) });
    case "progress":
      return /* @__PURE__ */ jsx("div", { className: "p-1 bg-orange-100", children: /* @__PURE__ */ jsx(RefreshIcon2, { className: "w-3.5 h-3.5 text-orange-500" }) });
    case "completed":
      return /* @__PURE__ */ jsx("div", { className: "p-1 bg-green-100", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-900" }) });
    default:
      return null;
  }
};
function ComboBox({
  items = [],
  value,
  onChange,
  placeholder = "Select...",
  className,
  contentClassName,
  itemClassName,
  defaultIcon: DefaultIconProp,
  enableApiSearch,
  onSearchChange,
  isLoading = false
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const listRef = React.useRef(null);
  const selected = React.useMemo(() => {
    var _a;
    if (!value) return null;
    return (_a = items.find((it) => it.id === value.id)) != null ? _a : null;
  }, [value, items]);
  const filtered = React.useMemo(() => {
    if (enableApiSearch) {
      return items;
    }
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) => it.label.toLowerCase().includes(q));
  }, [items, query, enableApiSearch]);
  const FallbackIcon = DefaultIconProp != null ? DefaultIconProp : Circle;
  React.useEffect(() => {
    if (!enableApiSearch) return;
    const handler = setTimeout(() => {
      onSearchChange == null ? void 0 : onSearchChange(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query, onSearchChange, enableApiSearch]);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        role: "combobox",
        className: `w-40 justify-between ${className != null ? className : ""}`,
        children: [
          selected ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 min-w-0", children: /* @__PURE__ */ jsx("span", { className: "truncate", title: selected.label, children: selected.label }) }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: placeholder }),
          selected ? /* @__PURE__ */ jsx(
            "button",
            {
              className: "cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
                onChange(null);
              },
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 opacity-70 " })
            }
          ) : /* @__PURE__ */ jsx(ChevronsUpDown, { className: "h-4 w-4 opacity-70 " })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: `w-[260px] p-0 ${contentClassName != null ? contentClassName : ""}`, children: /* @__PURE__ */ jsxs(Command, { shouldFilter: false, children: [
      /* @__PURE__ */ jsx(
        CommandInput,
        {
          placeholder: "Search...",
          value: query,
          onValueChange: setQuery
        }
      ),
      /* @__PURE__ */ jsx(
        CommandList,
        {
          ref: listRef,
          className: "max-h-60 overflow-y-auto",
          children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-6", children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(CommandEmpty, { children: "No results." }),
            /* @__PURE__ */ jsx(CommandGroup, { children: filtered.map((item) => {
              var _a;
              const isSelected = (selected == null ? void 0 : selected.id) === item.id;
              (_a = item.icon) != null ? _a : FallbackIcon;
              return /* @__PURE__ */ jsxs(
                CommandItem,
                {
                  "data-combobox-item": true,
                  onSelect: () => {
                    setOpen(false);
                    if (!enableApiSearch) setQuery("");
                    onChange(item);
                  },
                  className: `flex justify-between items-center ${itemClassName != null ? itemClassName : ""} ${isSelected ? "bg-accent" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("div", { className: "capitalize text-sm", children: item.label }) }),
                    isSelected ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) : null
                  ]
                },
                item.id
              );
            }) })
          ] })
        },
        filtered.map((it) => it.id).join(",")
      )
    ] }) })
  ] });
}
const DropdownIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "8",
      viewBox: "0 0 12 8",
      fill: "none",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M6.28696 7.3C6.00844 7.65588 5.46982 7.65588 5.1913 7.3L0.358219 1.12439C0.000850365 0.667751 0.326195 4.09955e-07 0.906049 4.60647e-07L10.5722 1.30569e-06C11.1521 1.35638e-06 11.4774 0.667752 11.12 1.12439L6.28696 7.3Z",
          fill: "black"
        }
      )
    }
  );
};
function CustomSelectDropdown(props) {
  const { options, value, onChange } = props;
  const handleValueChange = (newValue) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: newValue
        }
      };
      onChange(syntheticEvent);
    }
  };
  return /* @__PURE__ */ jsxs(Select, { value: value == null ? void 0 : value.toString(), onValueChange: handleValueChange, children: [
    /* @__PURE__ */ jsx(SelectTrigger, { className: " h-fit py-1  ", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
    /* @__PURE__ */ jsx(SelectContent, { className: "bg-white border-gray-200 h-[40vh]", children: /* @__PURE__ */ jsx(SelectGroup, { children: options == null ? void 0 : options.map((option) => /* @__PURE__ */ jsx(
      SelectItem,
      {
        value: option.value.toString(),
        disabled: option.disabled,
        children: option.label
      },
      option.value
    )) }) })
  ] });
}
const CustomDateRangePicker = ({ date, setDate, mode = "day", align }) => {
  const [selectedDate, setSelectedDate] = React__default.useState(
    date
  );
  dayjs();
  const [open, setOpen] = React__default.useState(false);
  const formatLabel = () => {
    if (!(date == null ? void 0 : date.from)) return "Date";
    if (date.to) {
      if (dayjs(date.from).isSame(date.to, "day")) {
        return dayjs(date.from).format("DD/MM/YYYY");
      }
      return `${dayjs(date.from).format("DD/MM/YYYY")} - ${dayjs(
        date.to
      ).format("DD/MM/YYYY")}`;
    }
    return dayjs(date.from).format("DD/MM/YYYY");
  };
  const dayPresets = [
    {
      label: "Today",
      action: () => setDate({
        from: dayjs().startOf("day").toDate(),
        to: dayjs().startOf("day").toDate()
      })
    },
    {
      label: "Yesterday",
      action: () => setDate({
        from: dayjs().subtract(1, "day").startOf("day").toDate(),
        to: dayjs().subtract(1, "day").endOf("day").toDate()
      })
    },
    {
      label: "Tomorrow",
      action: () => setDate({
        from: dayjs().add(1, "day").startOf("day").toDate(),
        to: dayjs().add(1, "day").endOf("day").toDate()
      })
    }
  ];
  const monthPresets = [
    {
      label: "This Month",
      action: () => setDate({
        from: dayjs().startOf("month").toDate(),
        to: dayjs().endOf("month").toDate()
      })
    }
  ];
  const yearPresets = [
    {
      label: "Last 3 Months",
      action: () => setDate({
        from: dayjs().subtract(3, "month").startOf("day").toDate(),
        to: dayjs().endOf("day").toDate()
      })
    },
    {
      label: "Last 6 Months",
      action: () => setDate({
        from: dayjs().subtract(6, "month").startOf("day").toDate(),
        to: dayjs().endOf("day").toDate()
      })
    },
    {
      label: "This Year",
      action: () => setDate({
        from: dayjs().startOf("year").toDate(),
        to: dayjs().endOf("year").toDate()
      })
    },
    {
      label: "Last Year",
      action: () => setDate({
        from: dayjs().subtract(1, "year").startOf("year").toDate(),
        to: dayjs().subtract(1, "year").endOf("year").toDate()
      })
    }
  ];
  let presets = [];
  if (mode === "day") presets = dayPresets;
  if (mode === "day-month") presets = [...dayPresets, ...monthPresets];
  if (mode === "day-year")
    presets = [...dayPresets, ...monthPresets, ...yearPresets];
  if (mode === "month") presets = monthPresets;
  if (mode === "year") presets = yearPresets;
  if (mode === "month-year") presets = [...monthPresets, ...yearPresets];
  const handleSubmit = () => {
    setDate(selectedDate);
    setOpen(false);
  };
  const resetDate = () => setDate(void 0);
  return /* @__PURE__ */ jsxs(
    Popover,
    {
      open,
      onOpenChange: (open2) => {
        setOpen(open2);
      },
      children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "border w-fit text-smd font-normal items-center border-gray-300 py-1.5 h-8 rounded-none px-2 ", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "mr-0.5 h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", children: formatLabel() }),
          date ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
            "span",
            {
              onClick: (e) => {
                e.stopPropagation();
                resetDate();
              },
              children: /* @__PURE__ */ jsx(XIcon, { className: "ml-0.5 h-4 w-4 shrink-0 cursor-pointer" })
            }
          ) }) : /* @__PURE__ */ jsx(DropdownIcon, { className: "ml-1 !h-3 !w-3 shrink-0" })
        ] }) }),
        /* @__PURE__ */ jsxs(
          PopoverContent,
          {
            align,
            sideOffset: 4,
            className: "flex w-fit mr-2 gap-2 p-2 bg-white  border border-gray-300",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between h-68", children: [
                /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: presets.map((preset) => /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    className: "justify-start py-1.5 hover:bg-gray-100 text-sm font-light h-fit px-1",
                    onClick: () => {
                      preset.action();
                      setOpen(false);
                    },
                    children: preset.label
                  },
                  preset.label
                )) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "destructive",
                    size: "sm",
                    className: "mt-2 text-sm bg-gray-200 hover:bg-gray-400  py-1.5 h-fit px-1",
                    onClick: handleSubmit,
                    children: "OK"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 h-68 w-[0.5px] bg-gray-300", children: /* @__PURE__ */ jsx(Separator, { orientation: "vertical" }) }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-between ", children: /* @__PURE__ */ jsx(
                Calendar$1,
                {
                  mode: "range",
                  selected: selectedDate,
                  onSelect: setSelectedDate,
                  classNames: {
                    range_middle: "bg-gray-100 ",
                    day: "hover:bg-gray-100 w-full flex items-center justify-center data-[range-start=true]:bg-black",
                    weekday: "text-sm flex justify-center font-normal w-full"
                  },
                  captionLayout: "dropdown",
                  components: {
                    Dropdown: CustomSelectDropdown
                  },
                  modifiers: {
                    today: /* @__PURE__ */ new Date()
                  },
                  modifiersClassNames: {
                    today: "bg-blue-200 text-blue-900 rounded-sm"
                  }
                }
              ) })
            ]
          }
        )
      ]
    }
  );
};
const INRFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  currencyDisplay: "symbol",
  minimumFractionDigits: 2
});
const transformApiData = (apiData) => {
  const monthOrder = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  const orgMap = {};
  const monthsSet = /* @__PURE__ */ new Set();
  apiData.forEach((entry) => {
    var _a, _b;
    const orgName = entry.organization_name || "";
    const monthKey = ((_a = entry.month) == null ? void 0 : _a.toLowerCase()) || "";
    monthsSet.add(monthKey);
    if (!orgMap[orgName]) {
      orgMap[orgName] = {
        name: orgName,
        data: {},
        total: {
          lop: { cases: 0, revenue: 0 },
          eop: { cases: 0, revenue: 0 },
          litigation: { cases: 0, revenue: 0 }
        },
        location: entry.location_name || ""
      };
    }
    if (!orgMap[orgName].data[monthKey]) {
      orgMap[orgName].data[monthKey] = {
        lop: { cases: 0, revenue: 0 },
        eop: { cases: 0, revenue: 0 },
        litigation: { cases: 0, revenue: 0 }
      };
    }
    (_b = entry.service_types) == null ? void 0 : _b.forEach((service) => {
      const target = service.service_type === "Legal opinion" ? orgMap[orgName].data[monthKey].lop : service.service_type === "Litigation" ? orgMap[orgName].data[monthKey].litigation : orgMap[orgName].data[monthKey].eop;
      target.cases += service.cases_count;
      target.revenue += service.revenue;
      const totalTarget = service.service_type === "Legal opinion" ? orgMap[orgName].total.lop : service.service_type === "Litigation" ? orgMap[orgName].total.litigation : orgMap[orgName].total.eop;
      totalTarget.cases += service.cases_count;
      totalTarget.revenue += service.revenue;
    });
  });
  const months = Array.from(monthsSet).sort(
    (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
  );
  const organizations = Object.values(orgMap).map((org) => ({
    name: org.name,
    data: months.map((month) => {
      var _a, _b, _c;
      return {
        month,
        lop: ((_a = org.data[month]) == null ? void 0 : _a.lop) || { cases: 0, revenue: 0 },
        eop: ((_b = org.data[month]) == null ? void 0 : _b.eop) || { cases: 0, revenue: 0 },
        litigation: ((_c = org.data[month]) == null ? void 0 : _c.litigation) || { cases: 0, revenue: 0 }
      };
    }),
    total: org.total,
    location: org.location
  }));
  return { organizations, months };
};
const useLocations = ({
  search_string,
  enabled
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["locations", search_string],
    queryFn: async () => {
      var _a;
      const queryParams = {
        page: 1,
        page_size: 50,
        ...search_string ? { search_string } : {}
      };
      const response = await getAllLocations(queryParams);
      return (_a = response.data) == null ? void 0 : _a.data;
    },
    enabled
  });
  return { data, isLoading };
};
const useOrganizationsStats = ({
  dateRange,
  organization,
  location
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["organizationsStats", dateRange, organization, location],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      var _a;
      let queryParams = {};
      if (dateRange)
        queryParams = {
          from_date: dayjs(dateRange == null ? void 0 : dateRange.from).format("YYYY-MM-DD"),
          to_date: dayjs(dateRange == null ? void 0 : dateRange.to).format("YYYY-MM-DD")
        };
      if (organization) queryParams = { ...queryParams, user_id: organization };
      if (location) queryParams = { ...queryParams, location_id: location };
      const response = await OrgsStatsAPI(queryParams);
      const data2 = (_a = response.data) == null ? void 0 : _a.data;
      return transformApiData(data2);
    }
  });
  return { data, isLoading };
};
const useOrganizationDropdown = (search_string, enabled) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orgsDropdown", search_string],
    queryFn: async () => {
      var _a;
      let queryparam = {};
      if (search_string) queryparam = { search_string };
      const response = await orgsDropdown({
        page: 1,
        page_size: 50,
        ...queryparam
      });
      return (_a = response.data) == null ? void 0 : _a.data;
    },
    enabled,
    refetchOnWindowFocus: false
  });
  return { data, isLoading };
};
const useAdvocateOrgDropdown = (enabled) => {
  const { data, isLoading } = useQuery({
    queryKey: ["AdvOrgsDropdown"],
    queryFn: async () => {
      var _a;
      const response = await advOrgDropDown();
      return (_a = response.data) == null ? void 0 : _a.data;
    },
    enabled,
    refetchOnWindowFocus: false
  });
  return { data, isLoading };
};
const useAdvocateLocationDropdown = (enabled) => {
  const { data, isLoading } = useQuery({
    queryKey: ["AdvLocsDropdown"],
    queryFn: async () => {
      var _a;
      const response = await advLocDropdown();
      return (_a = response.data) == null ? void 0 : _a.data;
    },
    enabled
  });
  return { data, isLoading };
};

export { ComboBox as C, INRFormatter as I, useOrganizationDropdown as a, CustomDateRangePicker as b, useOrganizationsStats as c, useAdvocateOrgDropdown as d, useAdvocateLocationDropdown as e, getIcon as g, useLocations as u };
//# sourceMappingURL=dashboard_queries-Cldy_CAd.mjs.map
