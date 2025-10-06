import { jsxs, jsx } from 'react/jsx-runtime';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { d as caseViewLogAPI } from './service-1g9dZr4o.mjs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useRef, useCallback } from 'react';
import { T as TabValuesForViewCase } from './TabValuesForViewCase-nIQOXDrY.mjs';

const ServiceLogs = () => {
  const { service_id } = useParams({ strict: false });
  const fetchLogs = async ({ pageParam = 1 }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    let queryParams = { page: pageParam, page_size: 15 };
    let response = await caseViewLogAPI(service_id, queryParams);
    return {
      data: (_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data) == null ? void 0 : _b.records,
      nextCursor: ((_e = (_d = (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.data) == null ? void 0 : _d.pagination_info) == null ? void 0 : _e.next_page) ? ((_h = (_g = (_f = response == null ? void 0 : response.data) == null ? void 0 : _f.data) == null ? void 0 : _g.pagination_info) == null ? void 0 : _h.current_page) + 1 : null,
      prevCursor: ((_k = (_j = (_i = response == null ? void 0 : response.data) == null ? void 0 : _i.data) == null ? void 0 : _j.pagination_info) == null ? void 0 : _k.current_page) != 1 ? ((_n = (_m = (_l = response == null ? void 0 : response.data) == null ? void 0 : _l.data) == null ? void 0 : _m.pagination_info) == null ? void 0 : _n.current_page) - 1 : null,
      totalRecords: (_q = (_p = (_o = response == null ? void 0 : response.data) == null ? void 0 : _o.data) == null ? void 0 : _p.pagination_info) == null ? void 0 : _q.total_records
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
  const allRecords = (caseLogs == null ? void 0 : caseLogs.pages.map((e) => e.data).flat()) || [];
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-300", children: [
    /* @__PURE__ */ jsx(TabValuesForViewCase, {}),
    /* @__PURE__ */ jsxs("div", { className: "h-[calc(100vh-155px)] overflow-auto relative p-4", children: [
      isLoading && !isFetchingNextPage ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isLoading, message: "Logs" }) : (allRecords == null ? void 0 : allRecords.length) > 0 ? allRecords == null ? void 0 : allRecords.map((record, index) => {
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

export { ServiceLogs as S };
//# sourceMappingURL=ServiceLogs-ur7D7wgl.mjs.map
