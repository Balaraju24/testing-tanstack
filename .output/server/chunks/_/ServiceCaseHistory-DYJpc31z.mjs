import { jsxs, jsx } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { D as DefaultUserIcon } from './default-user-EV710LEP.mjs';
import { A as Avatar, a as AvatarImage } from './avatar-xL-W5RbG.mjs';
import { B as Button } from './router-e7zdrxGz.mjs';
import { T as TableRow, a as TableCell, b as Table, c as TableHeader, d as TableHead, e as TableBody } from './table-U9GtizYM.mjs';
import { c as caseViewNotesAPI } from './manage-tW0NLyej.mjs';
import { k as summaryViewAPI } from './service-1g9dZr4o.mjs';
import { u as userStore } from './userDetails-Dbr9T6uw.mjs';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import dayjs from 'dayjs';
import { useRef, useState, useCallback } from 'react';
import { T as TabValuesForViewCase } from './TabValuesForViewCase-nIQOXDrY.mjs';

const NoSummaryData = ({ className, ...props }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "900",
    height: "600",
    viewBox: "0 0 900 600",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    ...props,
    children: [
      /* @__PURE__ */ jsx("path", { fill: "transparent", d: "M0 0h900v600H0z" }),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M812.538 276.782c-25.082 12.442-58.372-3.557-58.372-3.557s7.398-36.163 32.494-48.588c25.082-12.442 58.359 3.539 58.359 3.539s-7.399 36.163-32.481 48.606z",
          fill: "url(#a)"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M100.08 367.715c32.772 19.642 79.791 1.484 79.791 1.484s-6.148-49.996-38.941-69.616c-32.772-19.642-79.77-1.507-79.77-1.507s6.147 49.997 38.92 69.639z",
          fill: "url(#b)"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "763.186",
          cy: "193.409",
          r: "13.695",
          transform: "rotate(180 763.186 193.409)",
          fill: "#858591"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "703.641",
          cy: "317.631",
          r: "15.407",
          transform: "rotate(180 703.641 317.631)",
          fill: "#858591"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "12.839",
          transform: "matrix(-1 0 0 1 144.141 180.425)",
          fill: "#858591"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "5.992",
          transform: "matrix(-1 0 0 1 645.732 247.189)",
          fill: "#858591"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "7.704",
          transform: "matrix(-1 0 0 1 680.311 514.546)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "11.127",
          transform: "matrix(-1 0 0 1 141.844 434.555)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "8.469",
          transform: "matrix(-1 0 0 1 270.527 150.238)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "9.416",
          transform: "matrix(-1 0 0 1 681.697 151.809)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "8.455",
          transform: "scale(1 -1) rotate(-75 -84.875 -238.371)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "11.248",
          transform: "matrix(-1 0 0 1 382.042 79.19)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "ellipse",
        {
          rx: "8.652",
          ry: "6.922",
          transform: "matrix(-1 0 0 1 740.745 366.706)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "17.597",
          transform: "scale(1 -1) rotate(-75 270.683 -461.601)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M806.36 318.9h.226c1.34 18.991 15.464 19.283 15.464 19.283s-15.574.304-15.574 22.248c0-21.944-15.575-22.248-15.575-22.248s14.118-.292 15.459-19.283zM237.473 503.525h.201c1.189 17.189 13.722 17.453 13.722 17.453s-13.82.275-13.82 20.136c0-19.861-13.819-20.136-13.819-20.136s12.527-.264 13.716-17.453z",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M634.992 471.883V196.296c0-13.073-4.334-25.629-12.015-34.855l-58.101-69.785c-7.702-9.25-18.156-14.455-29.041-14.455H306.388c-22.694 0-41.076 22.078-41.076 49.335v345.347c0 27.257 18.382 49.335 41.076 49.335h287.528c22.694 0 41.076-22.078 41.076-49.335z",
          fill: "#858591",
          stroke: "#858591",
          strokeWidth: "36.875",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M530.983 231.438c44.92 44.919 44.92 117.747 0 162.666-44.919 44.919-117.747 44.919-162.666 0s-44.919-117.747 0-162.666 117.747-44.919 162.666 0",
          stroke: "#fff",
          strokeWidth: "36.875",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M530.365 393.639 450 312.69V204.781",
          stroke: "#fff",
          strokeWidth: "36.875",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "a",
            x1: "716.22",
            y1: "315.592",
            x2: "923.098",
            y2: "151.951",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { stopColor: "#fff" }),
              /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEE" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "b",
            x1: "226.901",
            y1: "430.941",
            x2: "-36.799",
            y2: "185.929",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { stopColor: "#fff" }),
              /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEE" })
            ]
          }
        )
      ] })
    ]
  }
);
const ServiceCaseHistory = () => {
  var _a, _b;
  const observer = useRef(null);
  const { service_id } = useParams({ strict: false });
  const [selectedSummaryId, setSelectedSummaryId] = useState(
    null
  );
  const userDetails = useStore(userStore, (state) => state["user"]);
  const userType = userDetails == null ? void 0 : userDetails.id;
  const isViewPanelOpen = !!selectedSummaryId;
  const { caseStagesData } = UseContextAPI();
  const fetchCaseSummary = async ({ pageParam = 1 }) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    try {
      if (!service_id) return;
      const queryParams = { page: pageParam, page_size: 10, types: "SUMMARY" };
      const response = await caseViewNotesAPI(service_id, queryParams);
      return {
        data: (_b2 = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.data) == null ? void 0 : _b2.records,
        nextCursor: ((_e = (_d = (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.data) == null ? void 0 : _d.pagination_info) == null ? void 0 : _e.next_page) ? ((_h = (_g = (_f = response == null ? void 0 : response.data) == null ? void 0 : _f.data) == null ? void 0 : _g.pagination_info) == null ? void 0 : _h.current_page) + 1 : null,
        prevCursor: ((_k = (_j = (_i = response == null ? void 0 : response.data) == null ? void 0 : _i.data) == null ? void 0 : _j.pagination_info) == null ? void 0 : _k.current_page) !== 1 ? ((_n = (_m = (_l = response == null ? void 0 : response.data) == null ? void 0 : _l.data) == null ? void 0 : _m.pagination_info) == null ? void 0 : _n.current_page) - 1 : null,
        totalRecords: (_q = (_p = (_o = response == null ? void 0 : response.data) == null ? void 0 : _o.data) == null ? void 0 : _p.pagination_info) == null ? void 0 : _q.total_records
      };
    } catch (err) {
      throw new Error("Failed to fetch case history");
    }
  };
  const {
    data: caseSummary,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-history", "summary", service_id],
    queryFn: fetchCaseSummary,
    getNextPageParam: (lastPage) => {
      var _a2;
      return (_a2 = lastPage == null ? void 0 : lastPage.nextCursor) != null ? _a2 : null;
    },
    getPreviousPageParam: (firstPage) => {
      var _a2;
      return (_a2 = firstPage == null ? void 0 : firstPage.prevCursor) != null ? _a2 : null;
    },
    refetchOnWindowFocus: false
  });
  const allRecords = (caseSummary == null ? void 0 : caseSummary.pages.map((e) => e.data).flat()) || [];
  const selectedSummary = allRecords.find(
    (record) => record.id === selectedSummaryId
  );
  const lastSummaryRef = useCallback(
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
  const { mutate: mutateSummaryView } = useMutation({
    mutationFn: async (summaryId) => {
      const payload = {
        summary_ids: [Number(summaryId)]
      };
      const response = await summaryViewAPI(payload);
      return response == null ? void 0 : response.data;
    },
    onSuccess: () => {
      refetch();
    }
  });
  const handleViewClick = (summaryId) => {
    setSelectedSummaryId(summaryId === selectedSummaryId ? null : summaryId);
    const isRecordUnread = allRecords == null ? void 0 : allRecords.some(
      (record) => {
        var _a2;
        return record.id === summaryId && ((_a2 = record == null ? void 0 : record.notes_read_status) == null ? void 0 : _a2.some(
          (item) => !item.is_seen && item.user_id === userType
        ));
      }
    );
    if (isRecordUnread) {
      mutateSummaryView(summaryId);
    }
  };
  const renderTableRows = allRecords.map((record, index) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
    const isRecordUnread = (_a2 = record.notes_read_status) == null ? void 0 : _a2.some(
      (item) => !item.is_seen && item.user_id === userType
    );
    const fullUsername = `${(_b2 = record == null ? void 0 : record.created_by) == null ? void 0 : _b2.first_name} ${(_c = record == null ? void 0 : record.created_by) == null ? void 0 : _c.last_name}`;
    const fullTitle = (record == null ? void 0 : record.title) || "No Title";
    return /* @__PURE__ */ jsxs(
      TableRow,
      {
        className: `border-t border-gray-200 hover:bg-gray-50 transition-colors ${selectedSummaryId === record.id ? "bg-blue-50" : "bg-white"}`,
        ref: index === allRecords.length - 1 ? lastSummaryRef : null,
        children: [
          /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-1 border-r border-gray-200 relative", children: [
            isRecordUnread && /* @__PURE__ */ jsx("div", { className: "absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Avatar, { className: "w-8 h-8 flex items-center justify-center", children: ((_d = record == null ? void 0 : record.created_by) == null ? void 0 : _d.profile_pic) ? /* @__PURE__ */ jsx(AvatarImage, { src: (_e = record.created_by) == null ? void 0 : _e.profile_pic }) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 2xl:w-5 2xl:h-5 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "2xl:text-sm text-xs capitalize font-normal text-gray-900 truncate max-w-[80px]", children: fullUsername }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] 2xl:text-xs text-gray-500", children: dayjs(record.created_at).format("DD MMM YYYY") })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-1 border-r border-gray-200 font-normal break-words", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `line-clamp-2 text-gray-900 truncate ${isViewPanelOpen ? "w-12" : "w-32"}`,
              title: fullTitle,
              children: fullTitle
            }
          ) }),
          /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-1 border-r border-gray-200 font-normal", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-900", children: ((_g = (_f = caseStagesData == null ? void 0 : caseStagesData.stages) == null ? void 0 : _f.find(
              (sub) => sub.code === (record == null ? void 0 : record.case_stage)
            )) == null ? void 0 : _g.title) || (record == null ? void 0 : record.case_stage) || "--" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: ((_i = (_h = caseStagesData == null ? void 0 : caseStagesData.sub_stages) == null ? void 0 : _h.find(
              (sub) => sub.code === (record == null ? void 0 : record.case_sub_stage)
            )) == null ? void 0 : _i.title) || (record == null ? void 0 : record.case_sub_stage) || "--" })
          ] }),
          /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-1 border-r border-gray-200 2xl:text-sm text-xs font-normal", children: /* @__PURE__ */ jsx("div", { className: "text-gray-700 break-words whitespace-pre-wrap line-clamp-2", children: record == null ? void 0 : record.note }) }),
          !isViewPanelOpen && /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-1", children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "2xl:text-sm text-xs h-fit py-1 px-2 !shadow-none cursor-pointer bg-blue-50 text-black hover:bg-blue-100 border border-gray-200 rounded-md",
              onClick: () => handleViewClick(record.id),
              children: "View"
            }
          ) })
        ]
      },
      index
    );
  });
  const notesTableContent = isLoading && !isFetchingNextPage ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsx(LoadingComponent, { loading: isLoading, message: "Loading Notes..." }) }) : (allRecords == null ? void 0 : allRecords.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { className: "w-full", children: [
    /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-50 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx(TableHead, { className: "text-left w-32 font-normal px-4 py-2 border-r border-gray-200", children: "User Name" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-normal px-4 py-2 border-r border-gray-200", children: "Title" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-normal px-4 py-2 border-r border-gray-200", children: "Stage" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-normal px-4 py-2 border-r border-gray-200", children: "Notes" }),
      !isViewPanelOpen && /* @__PURE__ */ jsx(TableHead, { className: "text-left w-20 font-normal px-4 py-2", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsx(TableBody, { children: renderTableRows })
  ] }) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-gray-400", children: [
    /* @__PURE__ */ jsx(NoSummaryData, { className: "w-60 h-60 text-gray-400" }),
    /* @__PURE__ */ jsx("span", { children: "No Case History Available" })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 flex flex-col h-[calc(100vh-132px)]", children: [
    /* @__PURE__ */ jsx(TabValuesForViewCase, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 p-4 gap-2 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative overflow-auto", children: [
        notesTableContent,
        isFetchingNextPage && /* @__PURE__ */ jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsx("div", { children: "Loading Notes..." }) })
      ] }),
      selectedSummaryId && /* @__PURE__ */ jsx(
        "div",
        {
          className: `bg-gray-100 flex-shrink-0 overflow-auto transition-all duration-1500 ease-in-out ${isViewPanelOpen ? "w-2/5 border-l border-gray-200" : "w-0"}`,
          children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-sm font-normal", children: [
                (_a = selectedSummary == null ? void 0 : selectedSummary.created_by) == null ? void 0 : _a.first_name,
                " ",
                (_b = selectedSummary == null ? void 0 : selectedSummary.created_by) == null ? void 0 : _b.last_name
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setSelectedSummaryId(null),
                  className: "h-fit bg-red-200 text-red-400 text-sm rounded-none",
                  children: "Close"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-base font-medium mb-2", children: selectedSummary == null ? void 0 : selectedSummary.title }),
              /* @__PURE__ */ jsx("div", { className: "text-gray-700", children: selectedSummary == null ? void 0 : selectedSummary.note.split("\n").map((item, index) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-black text-opacity-60 text-sm",
                  children: item.trim()
                },
                index
              )) })
            ] })
          ] })
        }
      )
    ] })
  ] });
};

export { ServiceCaseHistory as S };
//# sourceMappingURL=ServiceCaseHistory-DYJpc31z.mjs.map
