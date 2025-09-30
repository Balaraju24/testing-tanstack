import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { T as TanStackTable } from "./TanstackTable-Be14m9-C.js";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearch } from "@tanstack/react-router";
import { S as SearchFilter } from "./SearchFilter-B_XAJrmD.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { PlusIcon } from "lucide-react";
import { D as DEFAULT_HEIGHT_CLASS } from "./advocate-DLfkmGnv.js";
import { a as addSerial } from "./app-CEOvaEAI.js";
import { g as getAllAdvocateAPI } from "./advocate-Cvw6EtWS.js";
import { D as DefaultUserIcon } from "./default-user-EV710LEP.js";
import { E as EditNoteIcon } from "./edit-note-icon-8syF9cj8.js";
import { M as MaleIcon, F as FemaleIcon } from "./male-icon-DSAUjAFs.js";
import { V as ViewIcon } from "./view-icon-BDRfyII2.js";
import { A as Avatar, a as AvatarImage } from "./avatar-DZ-dXD0g.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-D8srg3RR.js";
import { g as getColorByFirstLetter } from "./getColorByFirstLetter-BN8gbOeM.js";
import "./NoDataBlock-OQRQAvdc.js";
import "./no-cases-data-B3QWVZUO.js";
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
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
import "@radix-ui/react-avatar";
import "@radix-ui/react-tooltip";
function ManagerColumns() {
  const router = useRouter();
  return [
    {
      accessorFn: (row) => row.serial,
      id: "serial",
      header: () => /* @__PURE__ */ jsx("span", { className: " text-sm", children: "S No" }),
      footer: (props) => props.column.id,
      width: "50px",
      maxWidth: "50px",
      minWidth: "50px",
      cell: (info) => /* @__PURE__ */ jsx("span", { className: "text-sm", children: info.getValue() || "--" })
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
        return /* @__PURE__ */ jsxs("span", { className: "flex gap-2 items-center", children: [
          avatar ? /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 border-0", children: /* @__PURE__ */ jsx(
            AvatarImage,
            {
              src: avatar,
              className: "object-center"
            }
          ) }) : /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-900", children: /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "self-center text-xs truncate w-40",
              title: fullname,
              children: fullname
            }
          )
        ] });
      },
      width: "160px",
      maxWidth: "160px",
      minWidth: "160px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Name" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.gender,
      id: "gender",
      cell: (info) => {
        return /* @__PURE__ */ jsxs("span", { className: "text-xs flex gap-2 [&_svg]:size-4 items-center ", children: [
          info.getValue() == "MALE" ? /* @__PURE__ */ jsx(MaleIcon, {}) : info.getValue() == "FEMALE" ? /* @__PURE__ */ jsx(FemaleIcon, {}) : null,
          " ",
          info.getValue() || "--"
        ] });
      },
      width: "90px",
      maxWidth: "90px",
      minWidth: "90px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Gender" }),
      footer: (props) => props.column.id
    },
    {
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
    },
    {
      accessorFn: (row) => row.area_of_interest || [],
      id: "designation",
      cell: (info) => {
        const interests = info.getValue();
        if (!Array.isArray(interests) || interests.length === 0) {
          return /* @__PURE__ */ jsx("span", { className: "text-xs", children: "--" });
        }
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 items-center", children: [
          interests.slice(0, 1).map((interest) => {
            const { background, color } = getColorByFirstLetter(interest);
            return /* @__PURE__ */ jsx(
              "div",
              {
                title: interest,
                className: "px-2 py-1 cursor-pointer rounded-full text-[10px] font-medium w-24 truncate whitespace-nowrap overflow-hidden",
                style: {
                  backgroundColor: background,
                  color: "#333333",
                  border: `1px solid ${background}`
                },
                children: interest
              },
              interest
            );
          }),
          interests.length > 1 && /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-normal px-2 rounded-full py-1 bg-sky-200 text-blue-700 cursor-pointer", children: [
              "+",
              interests.length - 1
            ] }) }),
            /* @__PURE__ */ jsx(
              TooltipContent,
              {
                className: "bg-white max-w-xs overflow-y-auto",
                style: { maxHeight: "150px" },
                children: interests.slice(1).map((interest) => {
                  const { background, color } = getColorByFirstLetter(interest);
                  return /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "px-2 py-1 cursor-pointer rounded-full text-xs 3xl:text-sm font-medium mb-1 w-24 truncate whitespace-nowrap overflow-hidden",
                      style: {
                        backgroundColor: background,
                        color: "#333333"
                      },
                      title: interest,
                      children: interest
                    },
                    interest
                  );
                })
              }
            )
          ] }) })
        ] });
      },
      width: "170px",
      maxWidth: "170px",
      minWidth: "170px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Area of Interest" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.email,
      id: "email",
      cell: (info) => {
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-xs truncate w-32 2xl:w-full",
            title: info.getValue(),
            children: info.getValue() || "--"
          }
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Email" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.phone ? row.phone.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3") : "--",
      id: "phone",
      cell: (info) => {
        return /* @__PURE__ */ jsx("span", { className: "text-xs", children: info.getValue() ?? "--" });
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Phone" }),
      footer: (props) => props.column.id
    },
    {
      accessorFn: (row) => row.actions,
      id: "actions",
      cell: (info) => /* @__PURE__ */ jsxs("div", { className: "table-action-buttons flex space-x-3   items-center  cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => {
              router.navigate({ to: `/view-manager/${info.row.original.id}` });
            },
            title: "View Manager",
            children: /* @__PURE__ */ jsx(ViewIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => {
              router.navigate({
                to: `/edit-manager/${info.row.original.id}`
              });
            },
            title: "Edit Manager",
            children: /* @__PURE__ */ jsx(EditNoteIcon, { className: "size-4 text-black" })
          }
        )
      ] }),
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Actions" }),
      footer: (props) => props.column.id,
      width: "80px",
      minWidth: "80px",
      maxWidth: "80px"
    }
  ];
}
const ManagerList = ({
  heightClass = DEFAULT_HEIGHT_CLASS
}) => {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const [searchString, setSearchString] = useState(
    search.search_string || ""
  );
  const [debounceSearchString, setDebounceSearchString] = useState(
    search.search_string || ""
  );
  console.log("searchString", searchString);
  const [pagination, setPagination] = useState({
    current_page: Number(search.page) || 1,
    page_size: Number(search.page_size) || 15
  });
  const lawyerColumns = ManagerColumns();
  const { isLoading, data: lawyersData } = useQuery({
    queryKey: ["manager", pagination, debounceSearchString],
    queryFn: async () => {
      let queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        user_type: "MANAGER",
        ...debounceSearchString && { search_string: debounceSearchString }
      };
      const response = await getAllAdvocateAPI(queryParams);
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
        to: "/managers",
        search: {
          page: queryParams.page,
          page_size: queryParams.page_size,
          ...debounceSearchString && { search_string: debounceSearchString }
        }
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
  useEffect(() => {
    const newPage = Number(search.page) || 1;
    const newPageSize = Number(search.page_size) || 15;
    const newSearch = search.search_string || "";
    setPagination({ current_page: newPage, page_size: newPageSize });
    setSearchString(newSearch);
    setDebounceSearchString(newSearch);
  }, [search.page, search.page_size, search.search_string]);
  useEffect(() => {
    const searchParams = {
      page: pagination.current_page,
      page_size: pagination.page_size,
      ...debounceSearchString && { search_string: debounceSearchString }
    };
    router.navigate({
      search: searchParams,
      replace: true
    });
  }, [
    pagination.current_page,
    pagination.page_size,
    debounceSearchString,
    router
  ]);
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-full relative", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end items-center gap-x-8 mb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-x-3", children: [
      /* @__PURE__ */ jsx(
        SearchFilter,
        {
          searchString,
          setSearchString,
          title: "Search by name"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "bg-black !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-none h-9 px-6 py-0 transition duration-300 text-sm  3xl:text-base font-normal",
          onClick: () => router.navigate({ to: "/create-manager" }),
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(PlusIcon, { className: "font-extralight w-6 h-6 group-hover:rotate-90 duration-300 " }),
            /* @__PURE__ */ jsx("span", { className: "font-extralight", children: "Add Manager" })
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
          "location"
        ],
        heightClass,
        noDataLabel: "advocates",
        noDataDescription: "Get started by creating your first advocate",
        showNoDataIcon: true,
        noDataHeight: "h-[calc(100vh-170px)]"
      }
    ) })
  ] }) });
};
const SplitComponent = ManagerList;
export {
  SplitComponent as component
};
