import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { T as TanStackTable } from "./TanstackTable-Be14m9-C.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { g as getAllOganizationAPI } from "./organization-9L2vrBNN.js";
import { D as DEFAULT_HEIGHT_CLASS } from "./advocate-DLfkmGnv.js";
import { a as addSerial } from "./app-CEOvaEAI.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useLocation } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { S as SearchFilter } from "./SearchFilter-B_XAJrmD.js";
import { E as EditNoteIcon } from "./edit-note-icon-8syF9cj8.js";
import { g as getColorByFirstLetter } from "./getColorByFirstLetter-BN8gbOeM.js";
import "./NoDataBlock-OQRQAvdc.js";
import "./no-cases-data-B3QWVZUO.js";
import "./noDataConstants-CAKRQRCT.js";
import "@tanstack/react-table";
import "./skeleton-CElu2WzA.js";
import "./input-G3xZAzeG.js";
import "./select-BFmTkKF2.js";
import "@radix-ui/react-select";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "js-cookie";
import "react-error-boundary";
import "./fetch-Cpm1bFFM.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
function OrganizationColumns() {
  const router = useRouter();
  const { isManager, isAdmin } = useUserDetails();
  const columns = [
    {
      accessorFn: (row) => row.customer_id,
      id: "customer_id",
      cell: (info) => {
        return /* @__PURE__ */ jsx("span", { className: "text-xs", children: info.getValue() || "--" });
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Institution ID" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.organisation_name,
      id: "organisation_name",
      cell: (info) => {
        return /* @__PURE__ */ jsx("div", { className: "text-xs w-32 truncate", title: info.getValue(), children: info.getValue() || "--" });
      },
      width: "140px",
      maxWidth: "140px",
      minWidth: "140px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Organization" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.employee_id,
      id: "employee_id",
      cell: (info) => {
        return /* @__PURE__ */ jsx("span", { className: "text-xs", children: info.getValue() || "--" });
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Employee ID" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => {
        const capitalize = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());
        const firstName = row.first_name ? capitalize(row.first_name) : "";
        const lastName = row.last_name ? capitalize(row.last_name) : "";
        return {
          fullname: `${firstName} ${lastName}`,
          avatar: row.profile_pic || null
        };
      },
      id: "first_name",
      cell: (info) => {
        const { fullname, avatar } = info.getValue() || {
          fullname: "--",
          avatar: null
        };
        return /* @__PURE__ */ jsx("span", { className: "flex gap-2 items-center", children: /* @__PURE__ */ jsx("div", { className: "self-center text-xs truncate w-32", title: fullname, children: fullname }) });
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Employee" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.email,
      id: "email",
      cell: (info) => {
        return /* @__PURE__ */ jsx("div", { className: "truncate w-32 text-xs", title: info.getValue() || "", children: info.getValue() || "--" });
      },
      width: "180px",
      maxWidth: "180px",
      minWidth: "180px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Email ID" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.phone ? row.phone.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3") : "--",
      id: "phone",
      cell: (info) => {
        return /* @__PURE__ */ jsx("span", { className: "text-xs", children: info.getValue() ?? "--" });
      },
      width: "140px",
      maxWidth: "140px",
      minWidth: "140px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Phone Number" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.branch_code,
      id: "branch_code",
      cell: (info) => {
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-xs flex gap-2 [&_svg]:size-4 items-center truncate w-32",
            title: info.getValue() || "--",
            children: info.getValue() || "--"
          }
        );
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Branch Code" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.branch_name,
      id: "branch_name",
      cell: (info) => {
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "self-center text-xs truncate w-32",
            title: info.getValue() || "--",
            children: info.getValue() || "--"
          }
        );
      },
      width: "140px",
      maxWidth: "140px",
      minWidth: "140px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Branch Name" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.designation,
      id: "designation",
      cell: (info) => {
        return /* @__PURE__ */ jsx("span", { className: "text-xs flex gap-2 [&_svg]:size-4 items-center ", children: info.getValue() || "--" });
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Designation" }),
      footer: (props) => props.column.id
    }
  ];
  if (isAdmin()) {
    columns.splice(6, 0, {
      accessorFn: (row) => row.location?.name,
      id: "location",
      cell: (info) => {
        const locationName = info.getValue();
        const { background, color } = getColorByFirstLetter(locationName || "");
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-xs flex gap-2 [&_svg]:size-4 cursor-pointer items-center px-2 py-1 rounded-full w-24 truncate whitespace-nowrap overflow-hidden",
            title: locationName,
            style: {
              backgroundColor: background,
              color: "#333333",
              border: `1px solid ${background}`
            },
            children: /* @__PURE__ */ jsx("span", { className: "truncate w-32 ", children: locationName || "--" })
          }
        );
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Location" }),
      footer: (props) => props.column.id
    });
  }
  if (isManager()) {
    columns.splice(10, 0, {
      accessorFn: (row) => row.actions,
      id: "actions",
      cell: (info) => /* @__PURE__ */ jsx("div", { className: "table-action-buttons flex items-center  cursor-pointer", children: /* @__PURE__ */ jsx(
        "span",
        {
          onClick: () => {
            router.navigate({
              to: `/edit-organization/${info.row.original.id}`
            });
          },
          title: "Edit Organization",
          children: /* @__PURE__ */ jsx(EditNoteIcon, { className: "size-4 text-black" })
        }
      ) }),
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Actions" }),
      footer: (props) => props.column.id,
      width: "80px",
      minWidth: "80px",
      maxWidth: "80px"
    });
  }
  return columns;
}
const OrganizationList = ({
  heightClass = DEFAULT_HEIGHT_CLASS
}) => {
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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
  const { isAdmin } = useUserDetails();
  const lawyerColumns = OrganizationColumns();
  const { isLoading, data: lawyersData } = useQuery({
    queryKey: ["organization", pagination, debounceSearchString],
    queryFn: async () => {
      let queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        user_type: "CUSTOMER",
        ...debounceSearchString && { search_string: debounceSearchString }
      };
      const response = await getAllOganizationAPI(queryParams);
      if (response.status === 200 || response.status === 201) {
        const { records, pagination_info } = response?.data?.data;
        let responseAfterSerial = addSerial(
          records,
          pagination_info.current_page,
          pagination_info.page_size
        ) || [];
        return { records: responseAfterSerial, pagination_info };
      }
      router.navigate({
        to: "/organizations",
        search: queryParams
      });
    },
    enabled: true,
    refetchOnWindowFocus: false
  });
  const getAllLawyers = async ({
    page,
    page_size
  }) => {
    setPagination({ current_page: page, page_size });
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setPagination((prev) => ({
        ...prev,
        current_page: searchString ? prev.current_page : 1
      }));
      setDebounceSearchString(searchString);
    }, 1e3);
    return () => clearTimeout(handler);
  }, [searchString]);
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-full relative", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end items-center gap-x-8 mb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-x-3", children: [
      /* @__PURE__ */ jsx(
        SearchFilter,
        {
          searchString,
          setSearchString,
          title: "Search by Employee"
        }
      ),
      !isAdmin() && /* @__PURE__ */ jsx(
        Button,
        {
          className: "bg-black !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-none h-9 px-6 py-0 transition duration-300 text-sm  3xl:text-base font-normal",
          onClick: () => router.navigate({ to: "/create-organization" }),
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(PlusIcon, { className: "font-extralight w-6 h-6 group-hover:rotate-90 duration-300" }),
            /* @__PURE__ */ jsx("span", { className: "font-extralight", children: "Add Organization" })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
      TanStackTable,
      {
        data: lawyersData?.records || [],
        columns: lawyerColumns,
        paginationDetails: lawyersData?.pagination_info || {},
        getData: getAllLawyers,
        loading: isLoading,
        removeSortingForColumnIds: [
          "serial",
          "actions",
          "first_name",
          "gender",
          "designation",
          "email",
          "phone",
          "customer_id",
          "organisation_name",
          "employee_id",
          "location",
          "branch_name",
          "branch_code"
        ],
        heightClass,
        noDataLabel: "organizations",
        noDataDescription: debounceSearchString ? "Try adjusting your search criteria" : "Get started by creating your first organization",
        showNoDataIcon: true,
        noDataHeight: heightClass || "h-[calc(100vh-170px)]"
      }
    ) })
  ] }) });
};
const SplitComponent = OrganizationList;
export {
  SplitComponent as component
};
