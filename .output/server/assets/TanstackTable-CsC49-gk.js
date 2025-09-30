import { jsx, jsxs } from "react/jsx-runtime";
import { N as NoDataDisplay } from "./NoDataBlock-OQRQAvdc.js";
import { useRouter, useLocation } from "@tanstack/react-router";
import { useReactTable, getSortedRowModel, getFilteredRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useState, useCallback } from "react";
import { S as Skeleton } from "./skeleton-BAyQx-Zm.js";
import { I as Input } from "./input-CcfBn-WR.js";
import { ChevronLeftIcon, MoreHorizontalIcon, ChevronRightIcon } from "lucide-react";
import { c as cn, b as buttonVariants } from "./router-e7zdrxGz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DGUsKCQS.js";
const TableSortAscIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "668",
      height: "668",
      viewBox: "0 0 668 668",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M445.667 236.333L334.333 125L223 236.333",
          stroke: "white",
          strokeWidth: "66.6667",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
};
const TableSortDscIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "668",
      height: "668",
      viewBox: "0 0 668 668",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M223 432L334.333 543.333L445.667 432",
          stroke: "white",
          strokeWidth: "66.6667",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
};
const TableSortNormIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "668",
      height: "668",
      viewBox: "0 0 668 668",
      fill: "none",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M223 432L334.333 543.333L445.667 432",
            stroke: "#fff",
            strokeWidth: "66.6667",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M445.667 236.333L334.333 125L223 236.333",
            stroke: "#fff",
            strokeWidth: "66.6667",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
};
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("flex flex-row items-center gap-1", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      "aria-current": isActive ? "page" : void 0,
      "data-slot": "pagination-link",
      "data-active": isActive,
      className: cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      ),
      ...props
    }
  );
}
function PaginationPrevious({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pl-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChevronLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function PaginationNext({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pr-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ jsx(ChevronRightIcon, {})
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "aria-hidden": true,
      "data-slot": "pagination-ellipsis",
      className: cn("flex size-9 items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
const PaginationComponent = ({
  capturePageNum,
  captureRowPerItems,
  initialPage = 1,
  limitOptionsFromProps = [],
  paginationDetails
}) => {
  const [inputPageValue, setInputPageValue] = useState(
    initialPage.toString()
  );
  const [limitOptions, setLimitOptions] = useState(
    limitOptionsFromProps.length ? limitOptionsFromProps : [
      { title: "15/page", value: 15 },
      { title: "25/page", value: 25 },
      { title: "100/page", value: 100 },
      { title: "250/page", value: 250 },
      { title: "500/page", value: 500 }
    ]
  );
  const totalPages = paginationDetails?.total_pages ?? 1;
  const selectedValue = paginationDetails?.page_size ?? 15;
  const totalRecords = paginationDetails?.total_records ?? 0;
  const currentPage = paginationDetails?.current_page ?? initialPage;
  const lastIndex = currentPage * selectedValue;
  const firstIndex = lastIndex - selectedValue;
  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setInputPageValue(page.toString());
        capturePageNum(page);
      }
    },
    [capturePageNum, totalPages]
  );
  const handleRowChange = useCallback(
    (newLimit) => {
      captureRowPerItems(Number(newLimit));
    },
    [captureRowPerItems]
  );
  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === "" || /^[0-9]+$/.test(value)) {
        setInputPageValue(value);
      }
    },
    []
  );
  const onKeyDownInPageChange = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const page = Math.max(
          1,
          Math.min(parseInt(inputPageValue) || 1, totalPages)
        );
        handlePageChange(page);
      }
    },
    [inputPageValue, totalPages, handlePageChange]
  );
  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(null);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push(null);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(null);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(null);
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  }, [currentPage, totalPages]);
  return /* @__PURE__ */ jsxs(Pagination, { className: "flex justify-between items-center !mx-0 !px-0 sticky bottom-0 shadow-inner-none !shadow-none !bordeer-none", children: [
    /* @__PURE__ */ jsxs(PaginationContent, { className: "!px-0 pt-1 flex gap-5", children: [
      /* @__PURE__ */ jsxs(
        Select,
        {
          value: selectedValue?.toString(),
          onValueChange: handleRowChange,
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-24 text-xs !py-0 !h-8 border cursor-pointer", children: /* @__PURE__ */ jsx(
              SelectValue,
              {
                placeholder: "Items per page",
                className: "font-normal text-xs!rounded-none "
              }
            ) }),
            /* @__PURE__ */ jsx(SelectContent, { className: "w-[120px]  text-xs bg-white pointer", children: limitOptions.map((item) => /* @__PURE__ */ jsx(
              SelectItem,
              {
                value: item.value?.toString(),
                className: "cursor-pointer font-normal text-xs opacity-90",
                children: item.title
              },
              item.value
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "font-normal text-xs opacity-80", children: [
        Math.min(firstIndex + 1, totalRecords),
        " -",
        " ",
        Math.min(lastIndex, totalRecords),
        " of ",
        totalRecords
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-center", children: [
      /* @__PURE__ */ jsx(PaginationContent, { className: "px-1 py-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center font-normal text-xs opacity-80", children: [
        "GoTo",
        /* @__PURE__ */ jsx(
          Input,
          {
            value: inputPageValue,
            onChange: handleInputChange,
            onKeyDown: onKeyDownInPageChange,
            className: "h-6 w-10 text-center bg-gray-300 rounded-none text-xs ml-2",
            placeholder: "Page"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(PaginationContent, { className: "px-1 py-0 font-normal", children: [
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
          PaginationPrevious,
          {
            href: currentPage === 1 ? void 0 : "#",
            onClick: (e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            },
            "aria-disabled": currentPage === 1,
            className: currentPage === 1 ? "opacity-50 " : ""
          }
        ) }),
        getPageNumbers().map(
          (pageNumber, index) => pageNumber === null ? /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationEllipsis, {}) }, `ellipsis-${index}`) : /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
            PaginationLink,
            {
              href: "#",
              isActive: pageNumber === currentPage,
              onClick: (e) => {
                e.preventDefault();
                handlePageChange(pageNumber);
              },
              className: `text-xs ${pageNumber === currentPage ? "bg-black text-white w-6 h-6 rounded-none " : "rounded-none"}`,
              children: pageNumber
            }
          ) }, pageNumber)
        ),
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
          PaginationNext,
          {
            href: currentPage === totalPages ? void 0 : "#",
            onClick: (e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            },
            "aria-disabled": currentPage === totalPages,
            className: currentPage === totalPages ? "opacity-50 " : ""
          }
        ) })
      ] })
    ] })
  ] });
};
const TanStackTable = ({
  columns,
  data,
  loading = false,
  getData,
  paginationDetails,
  removeSortingForColumnIds,
  heightClass,
  noDataLabel,
  noDataDescription,
  showNoDataIcon = true,
  noDataHeight
}) => {
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const [sorting, setSorting] = useState([]);
  const shouldStickyLastColumn = columns.length > 6;
  const lastColumnIndex = columns.length - 1;
  const table = useReactTable({
    columns,
    data: data?.length ? data : [],
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  const capturePageNum = useCallback(
    (value) => {
      getData({
        ...searchParams,
        page_size: searchParams.get("page_size") ? Number(searchParams.get("page_size")) : 15,
        page: value,
        order_by: searchParams.get("order_by"),
        order_type: searchParams.get("order_type")
      });
    },
    [getData, searchParams]
  );
  const captureRowPerItems = useCallback(
    (value) => {
      getData({
        ...searchParams,
        page_size: value,
        page: 1,
        order_by: searchParams.get("order_by"),
        order_type: searchParams.get("order_type")
      });
    },
    [getData, searchParams]
  );
  const sortAndGetData = useCallback(
    (header) => {
      if (removeSortingForColumnIds && removeSortingForColumnIds.length && removeSortingForColumnIds.includes(header.id)) {
        return;
      }
      let sortBy = header.id;
      let orderBy = `${sortBy}:asc`;
      if (searchParams.get("order_by")?.startsWith(header.id)) {
        if (searchParams.get("order_by") === `${header.id}:asc`) {
          orderBy = `${sortBy}:desc`;
        } else {
          sortBy = "";
          orderBy = "";
        }
      }
      getData({
        ...searchParams,
        page: 1,
        page_size: searchParams.get("page_size") || paginationDetails?.page_size || 15,
        order_by: orderBy
      });
    },
    [
      getData,
      searchParams,
      removeSortingForColumnIds,
      paginationDetails?.page_size
    ]
  );
  const getWidth = useCallback(
    (id) => {
      const widthObj = columns.find((col) => col.id === id);
      return widthObj ? widthObj?.width || widthObj?.size || "100px" : "100px";
    },
    [columns]
  );
  const isLastColumn = useCallback(
    (index) => {
      return shouldStickyLastColumn && index === lastColumnIndex;
    },
    [shouldStickyLastColumn, lastColumnIndex]
  );
  const getColumnStyle = useCallback(
    (headerId, index) => {
      const baseStyle = {
        minWidth: getWidth(headerId),
        width: getWidth(headerId)
      };
      if (isLastColumn(index)) {
        return {
          ...baseStyle,
          position: "sticky",
          right: 0,
          backgroundColor: "black",
          zIndex: 11
          // borderLeft: "1px solid #374151",
        };
      }
      return {
        ...baseStyle,
        position: "sticky",
        top: 0,
        backgroundColor: "black",
        zIndex: 10
      };
    },
    [getWidth, isLastColumn]
  );
  const getCellStyle = useCallback(
    (index, isEven) => {
      if (isLastColumn(index)) {
        return {
          position: "sticky",
          right: 0,
          backgroundColor: isEven ? "white" : "#f9fafb",
          zIndex: 5
          // borderLeft: "1px solid #e5e7eb",
        };
      }
      return {};
    },
    [isLastColumn]
  );
  return /* @__PURE__ */ jsxs("div", { className: "w-full rounded-md bg-white", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-full relative bg-white ${heightClass || "h-96"} overflow-auto custom-scrollbar`,
        style: {
          display: "flex",
          flexDirection: "column"
        },
        children: loading ? /* @__PURE__ */ jsx("div", { className: "w-full h-full flex flex-col", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse bg-white min-w-full table-fixed", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-black border-b", children: table?.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { className: "border-b", children: headerGroup.headers.map(
            (header, index) => /* @__PURE__ */ jsx(
              "th",
              {
                colSpan: header.colSpan,
                className: "bg-black text-left px-3 py-2 text-sm font-normal text-white sticky top-0 z-10",
                style: getColumnStyle(header.id, index),
                children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => sortAndGetData(header),
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ),
                      /* @__PURE__ */ jsx(
                        SortItems,
                        {
                          header,
                          removeSortingForColumnIds
                        }
                      )
                    ]
                  }
                )
              },
              `${header.id}-${index}`
            )
          ) }, headerGroup.id)) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200", children: [...Array(paginationDetails?.page_size || 15)].map((_, i) => /* @__PURE__ */ jsx(
            "tr",
            {
              className: `border-b border-b-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`,
              children: [...Array(columns.length)].map((_2, j) => /* @__PURE__ */ jsx(
                "td",
                {
                  className: "px-4 py-3 text-sm text-gray-900 whitespace-nowrap",
                  style: getCellStyle(j, i % 2 === 0),
                  children: j === 1 ? /* @__PURE__ */ jsxs("div", { className: "p-2 flex gap-2 items-center", children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-7 rounded-full bg-gray-200" }),
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-3/5 bg-gray-200 rounded-none" })
                  ] }) : /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-3/5 bg-gray-200 rounded-none" }) })
                },
                `loading-cell-${i}-${j}`
              ))
            },
            `loading-row-${i}`
          )) })
        ] }) }) : !data.length ? /* @__PURE__ */ jsx(
          NoDataDisplay,
          {
            title: noDataLabel || "No Data Available",
            description: noDataDescription,
            showIcon: showNoDataIcon,
            height: noDataHeight || heightClass || "h-96"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex flex-col", children: /* @__PURE__ */ jsx("div", { className: "w-full overflow-auto custom-scrollbar", children: /* @__PURE__ */ jsxs("table", { className: "w-full border border-gray-200 border-collapse bg-white min-w-full table-fixed", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-black border-b", children: table?.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { className: "border-b", children: headerGroup.headers.map(
            (header, index) => /* @__PURE__ */ jsx(
              "th",
              {
                colSpan: header.colSpan,
                className: "bg-black text-left px-3 py-2 text-sm font-normal text-white/90 sticky top-0 z-10",
                style: getColumnStyle(header.id, index),
                children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => sortAndGetData(header),
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ),
                      /* @__PURE__ */ jsx(
                        SortItems,
                        {
                          header,
                          removeSortingForColumnIds
                        }
                      )
                    ]
                  }
                )
              },
              `${header.id}-${index}`
            )
          ) }, headerGroup.id)) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200", children: data?.length ? table?.getRowModel().rows.map((row, index) => /* @__PURE__ */ jsx(
            "tr",
            {
              className: `transition-colors duration-200 border-b border-b-gray-100 cursor-pointer ${index % 2 === 0 ? "bg-white hover:bg-gray-100" : "bg-gray-50 hover:bg-gray-100"}`,
              ...row?.original.issue_id && row?.original.id ? {
                onClick: () => router.navigate({
                  to: `/cases/${row.original.id}/case-history`
                })
              } : {},
              children: row.getVisibleCells().map((cell, cellIndex) => /* @__PURE__ */ jsx(
                "td",
                {
                  className: "px-4 py-2 text-sm text-gray-900 whitespace-nowrap",
                  style: getCellStyle(cellIndex, index % 2 === 0),
                  children: flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )
                },
                cell.id
              ))
            },
            row.id
          )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns.length, className: "text-center py-8", children: /* @__PURE__ */ jsx(
            NoDataDisplay,
            {
              title: noDataLabel || "No Data Available",
              description: noDataDescription,
              showIcon: showNoDataIcon,
              height: noDataHeight || heightClass || "h-96"
            }
          ) }) }) })
        ] }) }) })
      }
    ),
    !loading && data?.length && paginationDetails ? /* @__PURE__ */ jsx("div", { className: " border-gray-200", children: /* @__PURE__ */ jsx(
      PaginationComponent,
      {
        paginationDetails,
        capturePageNum,
        captureRowPerItems,
        initialPage: paginationDetails?.current_page || 1
      }
    ) }) : null
  ] });
};
const SortItems = ({
  header,
  removeSortingForColumnIds
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const sortBy = searchParams.get("order_by")?.split(":")[0];
  const sortDirection = searchParams.get("order_by")?.split(":")[1];
  if (removeSortingForColumnIds?.includes(header.id)) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center" }, children: sortBy === header.id ? sortDirection === "asc" ? /* @__PURE__ */ jsx(TableSortAscIcon, { className: "size-4" }) : /* @__PURE__ */ jsx(TableSortDscIcon, { className: "size-4" }) : /* @__PURE__ */ jsx(TableSortNormIcon, { className: "size-4" }) });
};
export {
  PaginationComponent as P,
  TanStackTable as T
};
