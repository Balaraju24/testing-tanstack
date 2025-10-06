import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { T as TanStackTable, P as PaginationComponent } from './TanstackTable-CsC49-gk.mjs';
import { g as getInitialView, T as TableViewIcon, G as GridViewIcon, E as EmptyCaseCard, C as CaseCard, v as viewStateHelper, V as VIEW_KEYS, S as SettingsIcon } from './settings-icon-BFH7lXgA.mjs';
import { B as Button } from './router-e7zdrxGz.mjs';
import { a as getAllLegalOpinionAPI } from './litigations-2Q1m8RsY.mjs';
import { D as DEFAULT_HEIGHT_CLASS } from './advocate-DLfkmGnv.mjs';
import { u as userStore } from './userDetails-Dbr9T6uw.mjs';
import { a as addSerial, c as capitalize } from './app-CEOvaEAI.mjs';
import { N as NoDataDisplay } from './NoDataBlock-OQRQAvdc.mjs';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useLocation, useNavigate } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import { PlusIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { S as SearchFilter } from './SearchFilter-BoKc3EM1.mjs';
import { O as OverflowContentTooltip } from './OverflowContentTooltip-CDqdkYzJ.mjs';
import { D as DefaultUserIcon } from './default-user-EV710LEP.mjs';
import { V as ViewIcon } from './view-icon-BDRfyII2.mjs';
import { A as Avatar, a as AvatarImage } from './avatar-xL-W5RbG.mjs';
import { c as caseStatusConstants, s as statusConstants } from './statusConstants-t7T05Rlh.mjs';
import dayjs from 'dayjs';
import { S as SearchDropdown } from './SearchDropdown-DfUKvMvl.mjs';
import '@tanstack/react-table';
import './skeleton-BAyQx-Zm.mjs';
import './input-CcfBn-WR.mjs';
import './select-DGUsKCQS.mjs';
import '@radix-ui/react-select';
import './calendar-icon-LEoQxdpF.mjs';
import './litigation-b6202F6J.mjs';
import './legal-notice-icon-ivaufGCR.mjs';
import './pending-icon-C39HKFOC.mjs';
import './approved-Icon-D4Mj_64A.mjs';
import './current-icon-PhyH9fHB.mjs';
import './tooltip-BKF0DBvK.mjs';
import '@radix-ui/react-tooltip';
import 'clsx';
import './summary-icon-card-CWzIqgof.mjs';
import './todo-icon-DEoezyPT.mjs';
import './card-CfZVGcIr.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'tailwind-merge';
import 'sonner';
import 'framer-motion';
import 'react-error-boundary';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './no-cases-data-B3QWVZUO.mjs';
import './noDataConstants-CAKRQRCT.mjs';
import '@radix-ui/react-avatar';

function LegalOpinionColumns() {
  const router = useRouter();
  const navigate = useNavigate();
  const { isUser, isManager, isAdvocate, isAdmin } = useUserDetails();
  const handleManage = (service_id) => {
    sessionStorage.setItem("case-origin", "legal-opinion");
    if (isUser()) {
      navigate({
        to: `/legal-opinion/service/${service_id}/user/manage`
      });
      return;
    }
    navigate({
      to: `/legal-opinion/service/${service_id}/manage`
    });
  };
  const columns = [
    {
      accessorFn: (row) => row.temp_id,
      id: "service_id",
      cell: (info) => {
        return /* @__PURE__ */ jsx("span", { className: "text-xs  flex gap-2 [&_svg]:size-4 items-center ", children: info.getValue() || "--" });
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm  ", children: "File ID" }),
      footer: (props) => props.column.id
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
      accessorFn: (row) => row.stage,
      id: "status",
      cell: (info) => {
        var _a, _b;
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-xs  uppercase font-normal",
            style: {
              color: (_a = statusConstants.find(
                (status) => status.value === info.getValue()
              )) == null ? void 0 : _a.color
            },
            children: (_b = statusConstants.find((status) => status.value === info.getValue())) == null ? void 0 : _b.label
          }
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Stage" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.due_date,
      id: "due_date",
      cell: (info) => {
        const value = info.getValue();
        return /* @__PURE__ */ jsxs("span", { className: "text-xs ", children: [
          value ? dayjs(value).format("DD MMM YYYY") : "--",
          " "
        ] });
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm  ", children: "Due Date" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.actions,
      id: "actions",
      cell: (info) => /* @__PURE__ */ jsxs("div", { className: "table-action-buttons flex space-x-3 items-center  cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => {
              sessionStorage.setItem("case-origin", "legal-opinion");
              router.navigate({
                to: `/legal-opinion/service/${info.row.original.id}/notes`
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
      ] }),
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm  ", children: "Actions" }),
      footer: (props) => props.column.id,
      width: "120px",
      minWidth: "120px",
      maxWidth: "120px"
    }
  ];
  if (isUser() || isManager() || isAdmin()) {
    columns.splice(2, 0, {
      accessorFn: (row) => {
        var _a, _b, _c;
        const firstName = ((_a = row.advocate) == null ? void 0 : _a.first_name) ? capitalize(row.advocate.first_name) : "";
        const lastName = ((_b = row.advocate) == null ? void 0 : _b.last_name) ? capitalize(row.advocate.last_name) : "";
        return {
          fullname: `${firstName} ${lastName}`.trim(),
          avatar: ((_c = row == null ? void 0 : row.advocate) == null ? void 0 : _c.profile_pic) || null
        };
      },
      id: "advocate_name",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm  ", children: "Advocate" }),
      footer: (props) => props.column.id,
      width: "180px",
      maxWidth: "180px",
      minWidth: "180px",
      cell: (info) => {
        const { fullname, avatar } = info.getValue() || {
          fullname: "--",
          avatar: null
        };
        const displayName = fullname.trim() === "" ? "--" : fullname;
        return /* @__PURE__ */ jsxs("span", { className: "flex gap-2 items-center", children: [
          avatar ? /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 border-0", children: /* @__PURE__ */ jsx(
            AvatarImage,
            {
              src: avatar,
              className: "object-center"
            }
          ) }) : /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-800", children: /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "self-center text-xs truncate w-48",
              title: displayName,
              children: /* @__PURE__ */ jsx(OverflowContentTooltip, { text: displayName })
            }
          )
        ] });
      }
    });
  }
  if (isAdvocate() || isManager() || isAdmin() || isUser()) {
    columns.splice(2, 0, {
      accessorFn: (row) => {
        var _a, _b;
        const name = isUser() ? row.customer_name ? capitalize(row.customer_name) : "" : `${((_a = row.user) == null ? void 0 : _a.first_name) ? capitalize(row.user.first_name) : ""} ${((_b = row.user) == null ? void 0 : _b.last_name) ? capitalize(row.user.last_name) : ""}`;
        return { fullname: name || "--", avatar: null };
      },
      id: "customer_name",
      cell: (info) => {
        const { fullname } = info.getValue() || { fullname: "--" };
        return /* @__PURE__ */ jsxs("span", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-800", children: /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "self-center text-xs w-42 truncate",
              title: fullname,
              children: fullname
            }
          )
        ] });
      },
      width: "220px",
      maxWidth: "220px",
      minWidth: "220px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: isUser() ? "Customer" : "Point of Contact" }),
      footer: (props) => props.column.id
    });
  }
  return columns;
}
const LegalOpinion = ({
  heightClass = DEFAULT_HEIGHT_CLASS
}) => {
  var _a, _b;
  const router = useRouter();
  const location = useLocation();
  const isFirstLoad = useRef(true);
  const searchParams = new URLSearchParams(location.search);
  const [tabsValue, setTabsValue] = useState(getInitialView());
  const [isClient, setIsClient] = useState(false);
  const [searchString, setSearchString] = useState(
    searchParams.get("search_string") || ""
  );
  const [debounceSearchString, setDebounceSearchString] = useState(
    searchParams.get("search_string") || ""
  );
  const [pagination, setPagination] = useState({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15
  });
  const { isAdvocate, isAdmin, isUser } = useUserDetails();
  const userDetails = useStore(userStore, (state) => state["user"]);
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || ""
  );
  const statusLabel = ((_a = caseStatusConstants.find((s) => s.value === selectedStatus)) == null ? void 0 : _a.label) || "";
  const [searchStatus, setSearchStatus] = useState(statusLabel);
  const lawyerColumns = LegalOpinionColumns();
  const {
    isLoading,
    data: lawyersData,
    refetch
  } = useQuery({
    queryKey: [
      "legalOpinion",
      pagination,
      debounceSearchString,
      userDetails == null ? void 0 : userDetails.id,
      tabsValue,
      selectedStatus
    ],
    queryFn: async () => {
      var _a2;
      let queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        service_type: "Legal opinion",
        view: tabsValue,
        ...debounceSearchString && { search_string: debounceSearchString },
        ...selectedStatus && { status: selectedStatus }
      };
      router.navigate({
        to: "/legal-opinion",
        search: queryParams
      });
      const response = await getAllLegalOpinionAPI(queryParams);
      if (response.status === 200 || response.status === 201) {
        const { records, pagination_info } = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.data;
        let responseAfterSerial = addSerial(
          records,
          pagination_info.current_page,
          pagination_info.page_size
        ) || [];
        return { records: responseAfterSerial, pagination_info };
      }
    },
    enabled: !!pagination.current_page,
    refetchOnWindowFocus: false
  });
  const handleViewModeChange = (value) => {
    setTabsValue(value);
    viewStateHelper.setViewState(VIEW_KEYS.LEGAL_OPINION, value);
    router.navigate({
      to: "/legal-opinion",
      search: {
        ...Object.fromEntries(searchParams),
        view: value,
        page: pagination.current_page,
        page_size: pagination.page_size,
        service_type: "Legal opinion"
      }
    });
  };
  const getCases = async ({
    page,
    page_size
  }) => {
    setPagination({ current_page: page, page_size });
    router.navigate({
      to: "/legal-opinion",
      search: {
        ...Object.fromEntries(searchParams),
        page,
        page_size,
        view: tabsValue,
        service_type: "Legal opinion"
      }
    });
  };
  const capturePageNum = (current_page) => {
    setPagination((prev) => ({ ...prev, current_page }));
    router.navigate({
      to: "/legal-opinion",
      search: {
        ...Object.fromEntries(searchParams),
        page: current_page,
        view: tabsValue,
        service_type: "Legal opinion"
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
      to: "/legal-opinion",
      search: {
        ...Object.fromEntries(searchParams),
        page_size: pageSize,
        page: 1,
        view: tabsValue,
        service_type: "Legal opinion"
      }
    });
  };
  const filteredStatusConstants = caseStatusConstants.filter(
    (s) => s.label.includes(searchStatus)
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchString(searchString);
      if (!isFirstLoad.current) {
        setPagination((prev) => ({ ...prev, current_page: 1 }));
        router.navigate({
          to: "/legal-opinion",
          search: {
            ...Object.fromEntries(searchParams),
            search_string: searchString,
            page: 1,
            page_size: pagination.page_size,
            service_type: "Legal opinion"
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
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-full relative", children: isClient && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-x-8 mb-2 mx-0", children: [
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
      /* @__PURE__ */ jsxs("div", { className: "flex gap-x-3 ", children: [
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
            onClick: () => router.navigate({ to: "/create-legal-opinion" }),
            className: "bg-black !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-none h-9 px-6 py-0 transition duration-300 text-sm  3xl:text-base font-normal",
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row space-x-1 justify-center items-center  ", children: [
              /* @__PURE__ */ jsx(PlusIcon, { className: "font-extralight w-6 h-6 group-hover:rotate-90 duration-300" }),
              /* @__PURE__ */ jsx("div", { className: "font-extralight", children: " New Service" })
            ] })
          }
        )
      ] })
    ] }),
    tabsValue === "table" ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      TanStackTable,
      {
        data: (lawyersData == null ? void 0 : lawyersData.records) || [],
        columns: lawyerColumns,
        paginationDetails: (lawyersData == null ? void 0 : lawyersData.pagination_info) || {},
        getData: getCases,
        loading: isLoading,
        removeSortingForColumnIds: [
          "service_id",
          "status",
          "due_date",
          "actions",
          "advocate_name",
          "customer_name",
          "organization_name",
          "phone"
        ],
        heightClass,
        noDataLabel: "legal opinions",
        noDataDescription: debounceSearchString ? "Try adjusting your search criteria" : "Get started by creating your first legal opinion",
        showNoDataIcon: true,
        noDataHeight: heightClass || "h-[calc(100vh-170px)]"
      }
    ) }) : /* @__PURE__ */ jsxs("div", { className: `flex flex-col h-[calc(100vh-115px)]`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsx(EmptyCaseCard, {}) : (lawyersData == null ? void 0 : lawyersData.records) && (lawyersData == null ? void 0 : lawyersData.records.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4  p-0", children: (_b = lawyersData == null ? void 0 : lawyersData.records) == null ? void 0 : _b.map((record) => /* @__PURE__ */ jsx(CaseCard, { record }, record.id)) }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full h-120", children: /* @__PURE__ */ jsx(
        NoDataDisplay,
        {
          title: "legal opinions",
          description: debounceSearchString ? "Try adjusting your search criteria" : "Get started by creating your first legal opinion",
          hasSearch: !!debounceSearchString,
          height: "h-full"
        }
      ) }) }),
      (lawyersData == null ? void 0 : lawyersData.records) && (lawyersData == null ? void 0 : lawyersData.records.length) > 0 && (lawyersData == null ? void 0 : lawyersData.pagination_info) && /* @__PURE__ */ jsx("div", { className: "sticky bottom-0 bg-white", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center gap-4", children: /* @__PURE__ */ jsx(
        PaginationComponent,
        {
          paginationDetails: lawyersData == null ? void 0 : lawyersData.pagination_info,
          capturePageNum,
          captureRowPerItems
        }
      ) }) })
    ] })
  ] }) });
};
const SplitComponent = LegalOpinion;

export { SplitComponent as component };
//# sourceMappingURL=index-Bipkupn9.mjs.map
