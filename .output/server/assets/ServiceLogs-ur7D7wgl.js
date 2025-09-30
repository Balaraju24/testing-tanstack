import { jsxs, jsx } from "react/jsx-runtime";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { d as caseViewLogAPI } from "./service-1g9dZr4o.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useRef, useCallback } from "react";
import { T as TabValuesForViewCase } from "./TabValuesForViewCase-nIQOXDrY.js";
const ServiceLogs = () => {
  const { service_id } = useParams({ strict: false });
  const fetchLogs = async ({ pageParam = 1 }) => {
    let queryParams = { page: pageParam, page_size: 15 };
    let response = await caseViewLogAPI(service_id, queryParams);
    return {
      data: response?.data?.data?.records,
      nextCursor: response?.data?.data?.pagination_info?.next_page ? response?.data?.data?.pagination_info?.current_page + 1 : null,
      prevCursor: response?.data?.data?.pagination_info?.current_page != 1 ? response?.data?.data?.pagination_info?.current_page - 1 : null,
      totalRecords: response?.data?.data?.pagination_info?.total_records
    };
  };
  const {
    data: caseLogs,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-logs"],
    queryFn: fetchLogs,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor
  });
  const observer = useRef(null);
  const lastLogRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  const allRecords = caseLogs?.pages.map((e) => e.data).flat() || [];
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-300", children: [
    /* @__PURE__ */ jsx(TabValuesForViewCase, {}),
    /* @__PURE__ */ jsxs("div", { className: "h-[calc(100vh-155px)] overflow-auto relative p-4", children: [
      isLoading && !isFetchingNextPage ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isLoading, message: "Logs" }) : allRecords?.length > 0 ? allRecords?.map((record, index) => {
        const isLastLog = index === allRecords.length - 1;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            ref: isLastLog ? lastLogRef : null,
            className: "flex items-center gap-2 justify-start mb-1 hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded-md py-1 px-2",
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-3 h-3  bg-black text-white rounded-full", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "w-3 h-3",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M5 13l4 4L19 7"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-start", children: [
                /* @__PURE__ */ jsxs("span", { className: "space-x-1 shrink-0", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-black text-xs 3xl:text-sm", children: dayjs(record.created_at).format("MMM DD") }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-black text-xs 3xl:text-sm before:content-['['] space-x-0 after:content-[']']", children: dayjs(record.created_at).format("hh:mm A") })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm mt-1 3xl:text-base font-light", children: record.description })
              ] })
            ]
          },
          record.id
        );
      }) : !isLoading && /* @__PURE__ */ jsx("div", { className: " max-w-full mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex items-center gap-4 p-4 rounded-lg shadow-md", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full", children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-6 h-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M5 13l4 4L19 7"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-800", children: "Log Title" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Log description goes here." })
        ] })
      ] }) }),
      isFetchingNextPage && /* @__PURE__ */ jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" }) })
    ] })
  ] });
};
export {
  ServiceLogs as S
};
