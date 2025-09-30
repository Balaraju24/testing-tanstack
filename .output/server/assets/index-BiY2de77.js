import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { T as TanStackTable, P as PaginationComponent } from "./TanstackTable-CsC49-gk.js";
import { A as AdvocateGroupAvatars, S as SettingsIcon, g as getInitialView, T as TableViewIcon, G as GridViewIcon, E as EmptyCaseCard, C as CaseCard, v as viewStateHelper, V as VIEW_KEYS } from "./settings-icon-BFH7lXgA.js";
import { B as Button } from "./router-e7zdrxGz.js";
import { g as getAllLitigationAPI } from "./litigations-2Q1m8RsY.js";
import { D as DEFAULT_HEIGHT_CLASS } from "./advocate-DLfkmGnv.js";
import { u as userStore } from "./userDetails-Dbr9T6uw.js";
import { N as NoDataDisplay } from "./NoDataBlock-OQRQAvdc.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useNavigate, useLocation } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { PlusIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { S as SearchFilter } from "./SearchFilter-BoKc3EM1.js";
import { D as DefaultUserIcon } from "./default-user-EV710LEP.js";
import { V as ViewIcon } from "./view-icon-BDRfyII2.js";
import { A as Avatar, a as AvatarImage } from "./avatar-xL-W5RbG.js";
import { s as statusConstants, c as caseStatusConstants } from "./statusConstants-t7T05Rlh.js";
import { c as capitalize } from "./app-CEOvaEAI.js";
import dayjs from "dayjs";
import { S as SearchDropdown } from "./SearchDropdown-DfUKvMvl.js";
import "@tanstack/react-table";
import "./skeleton-BAyQx-Zm.js";
import "./input-CcfBn-WR.js";
import "./select-DGUsKCQS.js";
import "@radix-ui/react-select";
import "./OverflowContentTooltip-CDqdkYzJ.js";
import "@radix-ui/react-tooltip";
import "./tooltip-BKF0DBvK.js";
import "./calendar-icon-LEoQxdpF.js";
import "./litigation-b6202F6J.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./pending-icon-C39HKFOC.js";
import "./approved-Icon-D4Mj_64A.js";
import "./current-icon-PhyH9fHB.js";
import "clsx";
import "./summary-icon-card-CWzIqgof.js";
import "./todo-icon-DEoezyPT.js";
import "./card-CfZVGcIr.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "js-cookie";
import "react-error-boundary";
import "./fetch-Cpm1bFFM.js";
import "./no-cases-data-B3QWVZUO.js";
import "./noDataConstants-CAKRQRCT.js";
import "@radix-ui/react-avatar";
function LitigationsColumns() {
  const router = useRouter();
  const navigate = useNavigate();
  const { isUser, isManager, isAdvocate, isAdmin } = useUserDetails();
  const handleManage = (service_id) => {
    sessionStorage.setItem("case-origin", "litigation");
    if (isUser()) {
      navigate({
        to: `/litigations/service/${service_id}/user/manage`
      });
      return;
    }
    navigate({
      to: `/litigations/service/${service_id}/manage`
    });
  };
  const columns = [
    {
      accessorFn: (row) => row.temp_id,
      id: "case_reference",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "File ID" }),
      footer: (props) => props.column.id,
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      cell: (info) => /* @__PURE__ */ jsx("span", { className: "text-xs", children: info.getValue() || "--" })
    },
    {
      accessorFn: (row) => row.organisation_name,
      id: "organization_name",
      cell: (info) => {
        return /* @__PURE__ */ jsx("div", { className: "text-xs  w-36 truncate", title: info.getValue(), children: info.getValue() || "--" });
      },
      width: "180px",
      maxWidth: "180px",
      minWidth: "180px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm  ", children: "Organization" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.advocate_cases || [],
      id: "advocates",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Advocates" }),
      footer: (props) => props.column.id,
      width: "180px",
      maxWidth: "220px",
      minWidth: "180px",
      cell: (info) => {
        const advocateCases = info.getValue();
        const rowId = `litigation-${info.row.original.id}`;
        if (!advocateCases || advocateCases.length === 0) {
          return /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Not Assigned" });
        }
        if (advocateCases.length === 1) {
          const advocate = advocateCases[0].advocate;
          const advocateName = advocate ? `${advocate.first_name || ""} ${advocate.last_name || ""}`.trim() : "Unknown Advocate";
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border-none", children: advocate?.profile_pic ? /* @__PURE__ */ jsx(
              AvatarImage,
              {
                src: advocate.profile_pic,
                alt: advocateName,
                className: "rounded-full h-7 w-7 object-cover object-top"
              }
            ) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-3 h-3" }) }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-xs max-w-32 truncate cursor-pointer",
                title: advocateName,
                children: advocateName || "--"
              }
            )
          ] });
        }
        return /* @__PURE__ */ jsx(AdvocateGroupAvatars, { advocateCases, id: rowId });
      }
    },
    {
      accessorFn: (row) => row.service?.issue || row.service_type || "",
      id: "service_type",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: " Issue" }),
      footer: (props) => props.column.id,
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      cell: (info) => /* @__PURE__ */ jsx("span", { className: "text-xs", children: info.getValue() || "--" })
    },
    {
      accessorFn: (row) => row.stage || "",
      id: "priority",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: " Stage" }),
      footer: (props) => props.column.id,
      width: "160px",
      maxWidth: "160px",
      minWidth: "160px",
      cell: (info) => {
        const value = info.getValue();
        if (!value) return "--";
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-xs uppercase font-normal",
            style: {
              color: statusConstants.find(
                (status) => status.value === info.getValue()
              )?.color
            },
            children: statusConstants.find((status) => status.value === info.getValue())?.label
          }
        );
      }
    },
    {
      accessorFn: (row) => row.next_hearing_date || "",
      id: "next_hearing",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Next Hearing" }),
      footer: (props) => props.column.id,
      width: "180px",
      maxWidth: "220px",
      minWidth: "180px",
      cell: (info) => {
        const value = info.getValue();
        return /* @__PURE__ */ jsxs("span", { className: "text-xs", children: [
          value ? dayjs(value).format("DD MMM YYYY") : "--",
          " "
        ] });
      }
    },
    {
      accessorFn: (row) => row,
      id: "actions",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Actions" }),
      footer: (props) => props.column.id,
      width: "120px",
      minWidth: "120px",
      maxWidth: "120px",
      cell: (info) => /* @__PURE__ */ jsxs("div", { className: "table-action-buttons text-xs flex space-x-3 items-center cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => {
              sessionStorage.setItem("case-origin", "litigation");
              router.navigate({
                to: `/litigations/service/${info.row.original.id}/case-history`
              });
            },
            title: "View Service",
            children: /* @__PURE__ */ jsx(ViewIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => {
              handleManage(info.row.original.id);
            },
            title: "Manage Service",
            children: /* @__PURE__ */ jsx(SettingsIcon, { className: "size-4 text-black" })
          }
        )
      ] })
    }
  ];
  if (isAdvocate() || isManager() || isUser() || isAdmin()) {
    columns.splice(2, 0, {
      accessorFn: (row) => {
        const firstName = row.user?.first_name ? capitalize(row.user.first_name) : "";
        const lastName = row.user?.last_name ? capitalize(row.user.last_name) : "";
        return {
          fullname: `${firstName} ${lastName}`,
          avatar: null
        };
      },
      id: "customer_name",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Point of Contact" }),
      footer: (props) => props.column.id,
      width: "200px",
      maxWidth: "200px",
      minWidth: "200px",
      cell: (info) => {
        const { fullname } = info.getValue() || { fullname: "--" };
        return /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-800 ", children: /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("div", { className: "self-center text-xs w-36 truncate", title: fullname, children: fullname })
        ] });
      }
    });
  }
  return columns;
}
const Litigations = ({
  heightClass = DEFAULT_HEIGHT_CLASS
}) => {
  const router = useRouter();
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstLoad = useRef(true);
  const searchParams = new URLSearchParams(location.search);
  const [isClient, setIsClient] = useState(false);
  const [tabsValue, setTabsValue] = useState(getInitialView());
  const [searchString, setSearchString] = useState(
    searchParams.get("search_string") || ""
  );
  const [debounceSearchString, setDebounceSearchString] = useState(
    searchParams.get("search_string") || ""
  );
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || ""
  );
  const statusLabel = caseStatusConstants.find((s) => s.value === selectedStatus)?.label || "";
  const [searchStatus, setSearchStatus] = useState(statusLabel);
  const [pagination, setPagination] = useState({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15
  });
  const { isAdvocate, isAdmin, isUser } = useUserDetails();
  const userDetails = useStore(userStore, (state) => state["user"]);
  const litigationsColumns = LitigationsColumns();
  const {
    isLoading,
    data: litigationsData,
    refetch
  } = useQuery({
    queryKey: [
      "getLitigation",
      pagination,
      userDetails?.id,
      debounceSearchString,
      tabsValue,
      selectedStatus
    ],
    queryFn: async () => {
      const queryParams = {
        page: Number(pagination.current_page),
        page_size: Number(pagination.page_size),
        ...debounceSearchString && { search_string: debounceSearchString },
        ...selectedStatus && { status: selectedStatus },
        view: tabsValue
      };
      router.navigate({
        to: "/litigations",
        search: queryParams
      });
      const response = await getAllLitigationAPI(queryParams);
      if (response?.status === 200 || response?.status === 201) {
        return response.data?.data;
      }
    },
    enabled: !!pagination.current_page,
    refetchOnWindowFocus: false
  });
  const showLitigationPagination = !isLoading && litigationsData?.pagination_info && litigationsData?.records && litigationsData?.records?.length > 0;
  const getCases = async ({
    page,
    page_size
  }) => {
    setPagination({ current_page: page, page_size });
    router.navigate({
      to: "/litigations",
      search: {
        ...Object.fromEntries(searchParams),
        page,
        page_size,
        view: tabsValue
      }
    });
  };
  const capturePageNum = (current_page) => {
    setPagination((prev) => ({ ...prev, current_page }));
    router.navigate({
      to: "/litigations",
      search: {
        ...Object.fromEntries(searchParams),
        page: current_page,
        view: tabsValue
      }
    });
  };
  const captureRowPerItems = (pageSize) => {
    setPagination((prev) => ({
      ...prev,
      page_size: pageSize,
      current_page: 1
    }));
    router.navigate({
      to: "/litigations",
      search: {
        ...Object.fromEntries(searchParams),
        page_size: pageSize,
        page: 1,
        view: tabsValue
      }
    });
  };
  const handleViewModeChange = (value) => {
    setTabsValue(value);
    viewStateHelper.setViewState(VIEW_KEYS.LITIGATION, value);
    router.navigate({
      to: "/litigations",
      search: {
        ...Object.fromEntries(searchParams),
        view: value,
        page: pagination.current_page,
        page_size: pagination.page_size
      }
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchString(searchString);
      if (!isFirstLoad.current) {
        setPagination((prev) => ({ ...prev, current_page: 1 }));
        router.navigate({
          to: "/litigations",
          search: {
            ...Object.fromEntries(searchParams),
            search_string: searchString,
            page: 1,
            page_size: pagination.page_size
          }
        });
      } else {
        isFirstLoad.current = false;
      }
    }, 1e3);
    return () => clearTimeout(timer);
  }, [searchString]);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const filteredStatusConstants = caseStatusConstants.filter(
    (s) => s.label.includes(searchStatus)
  );
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-full relative", children: isClient && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-x-8 mb-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-gray-200", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: tabsValue === "table" ? "default" : "outline",
            size: "sm",
            onClick: () => handleViewModeChange("table"),
            className: `h-8 px-3 !rounded-none  cursor-pointer ${tabsValue === "table" ? "bg-gray-200 text-white" : "bg-white-300 text-white hover:bg-gray-50 "}`,
            children: /* @__PURE__ */ jsx(TableViewIcon, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: tabsValue === "grid" ? "default" : "outline",
            size: "sm",
            onClick: () => handleViewModeChange("grid"),
            className: `h-8 !rounded-none px-3 cursor-pointer ${tabsValue === "grid" ? "bg-gray-200 text-white" : "bg-white-300 text-white hover:bg-gray-50 "}`,
            children: /* @__PURE__ */ jsx(GridViewIcon, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-x-3", children: [
        !isUser() && /* @__PURE__ */ jsx(
          SearchFilter,
          {
            searchString,
            setSearchString,
            title: "Search by Point of Contact"
          }
        ),
        (isAdmin() || isUser()) && /* @__PURE__ */ jsx(
          SearchDropdown,
          {
            options: filteredStatusConstants,
            value: selectedStatus,
            onSelect: (option) => {
              setSelectedStatus(option.value);
              setSearchStatus(option.label);
            },
            onClear: () => {
              setSelectedStatus("");
              setSearchStatus("");
            },
            placeholder: "Filter by Status",
            getOptionLabel: (option) => option.label,
            getOptionKey: (option) => option.value,
            isSelected: (option) => option.value === selectedStatus,
            width: "w-44",
            className: "h-9",
            searchValue: searchStatus,
            onSearchChange: setSearchStatus
          }
        ),
        !isAdvocate() && !isAdmin() && /* @__PURE__ */ jsx(
          Button,
          {
            className: "bg-black !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-none h-9 px-6 py-0 transition duration-300 text-sm  3xl:text-base font-normal",
            onClick: () => navigate({ to: "/create-litigation" }),
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row space-x-1 justify-center items-center  ", children: [
              /* @__PURE__ */ jsx(PlusIcon, { className: "font-extralight w-6 h-6 group-hover:rotate-90 duration-300" }),
              /* @__PURE__ */ jsx("div", { className: "font-extralight", children: " New Service" })
            ] })
          }
        )
      ] })
    ] }),
    tabsValue === "table" ? /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
      TanStackTable,
      {
        data: litigationsData?.records || [],
        columns: litigationsColumns,
        paginationDetails: litigationsData?.pagination_info,
        getData: getCases,
        loading: isLoading,
        removeSortingForColumnIds: [
          "case_reference",
          "service_type",
          "customer_name",
          "advocate_name",
          "priority",
          "organization_name",
          "next_hearing",
          "advocates",
          "actions"
        ],
        heightClass,
        noDataLabel: "litigations",
        noDataDescription: "Get started by creating your first litigations",
        showNoDataIcon: true,
        noDataHeight: heightClass || "h-[calc(100vh-170px)]"
      }
    ) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-[calc(100vh-115px)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsx(EmptyCaseCard, {}) : litigationsData?.records && litigationsData?.records?.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xll:grid-cols-4  2xl:gap-4", children: litigationsData?.records?.map((record) => /* @__PURE__ */ jsx(CaseCard, { record }, record.id)) }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full h-120", children: /* @__PURE__ */ jsx(
        NoDataDisplay,
        {
          title: "litigations",
          description: debounceSearchString ? "Try adjusting your search criteria" : "Get started by creating your first litigation",
          hasSearch: !!debounceSearchString,
          height: "h-full"
        }
      ) }) }),
      showLitigationPagination && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center gap-4 border-gray-200", children: /* @__PURE__ */ jsx(
        PaginationComponent,
        {
          paginationDetails: litigationsData?.pagination_info,
          capturePageNum,
          captureRowPerItems
        }
      ) })
    ] })
  ] }) });
};
const SplitComponent = Litigations;
export {
  SplitComponent as component
};
