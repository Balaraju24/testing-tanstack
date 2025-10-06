import { jsx } from 'react/jsx-runtime';
import { b as getCaseStagesAPI } from './litigations-2Q1m8RsY.mjs';
import { f as getAllManageDocsAPI, c as caseViewNotesAPI } from './manage-tW0NLyej.mjs';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useLocation, useSearch } from '@tanstack/react-router';
import { useContext, useState, createContext } from 'react';

const CaseStagesContext = createContext({
  caseStagesData: null,
  caseStagesIsLoading: false,
  isError: false,
  isFetchingNextPage: false,
  getCaseStagesRefetch: async () => Promise.resolve({}),
  fetchNextPage: () => Promise.resolve({}),
  serviceData: null,
  setServiceData: () => {
  },
  allDocsData: null,
  allDocsIsFetching: false,
  allDocsIsLoading: false,
  getAllDocsRefetch: async () => Promise.resolve({}),
  hasNextPage: false,
  isLoadingCaseNote: false,
  refetchCaseNotes: () => Promise.resolve({}),
  allRecords: [],
  notes: null,
  setNotes: () => {
  },
  notesId: null,
  setNotesId: () => {
  }
});
const UseContextAPI = () => useContext(CaseStagesContext);
const CaseStagesProvider = ({ children }) => {
  const { service_id } = useParams({ strict: false });
  const location = useLocation();
  const search = useSearch({ strict: false });
  const path = location.pathname;
  const stage = search.stage;
  const subStage = search.sub_stage;
  const [notes, setNotes] = useState(null);
  const [notesId, setNotesId] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const {
    isLoading: caseStagesIsLoading,
    data: caseStagesData,
    isError,
    refetch: getCaseStagesRefetch
  } = useQuery({
    queryKey: ["caseStages", service_id],
    queryFn: async () => {
      var _a;
      const payload = {
        case_id: service_id
      };
      const response = await getCaseStagesAPI(payload);
      if (response.status === 200 || response.status === 201) {
        return (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data;
      }
      throw new Error("Failed to fetch case stages");
    },
    enabled: !!service_id,
    refetchOnWindowFocus: false
  });
  const {
    isLoading: allDocsIsLoading,
    isFetching: allDocsIsFetching,
    data: allDocsData,
    refetch: getAllDocsRefetch
  } = useQuery({
    queryKey: ["file-details", service_id, stage, subStage, location.pathname],
    queryFn: async ({ signal }) => {
      var _a, _b;
      try {
        if (!service_id || path.includes("case-history") || path.includes("notes") || path.includes("logs") || path.includes("chat") || path.includes("files") || path.includes("advocate-approval") || subStage === "PRBD")
          return { signal };
        let queryParams = {};
        if (subStage === "CSFG#DREV") {
          queryParams = {
            case_stage: "CSFG",
            case_sub_stages: [
              "CSFG#DAPT",
              "CSFG#DROC",
              "CSFG#DROP",
              "CSFG#DRCR",
              "CSFG#DRAP"
            ].map(encodeURIComponent),
            verification_status: "APPROVED"
          };
        } else if (subStage === "VEFI#FICV" || subStage === "FIUP#UPAF") {
          queryParams = {
            case_stages: ["FIUP", "VEFI"].map(encodeURIComponent),
            case_sub_stages: ["FIUP#UPAF", "VEFI#FICV"].map(encodeURIComponent)
          };
        } else if (subStage === "QURI#MDSC") {
          queryParams = {
            case_stages: ["QURI"].map(encodeURIComponent),
            case_sub_stages: ["QURI#RQMD", "QURI#MDSC"].map(encodeURIComponent)
          };
        } else if (subStage === "SLNT#SNNT") {
          queryParams = {
            case_stages: ["DLNT", "SLNT"].map(encodeURIComponent),
            case_sub_stages: ["DLNT#DFNT", "SLNT#SNNT"].map(encodeURIComponent)
          };
        } else {
          queryParams = {
            case_stage: stage,
            case_sub_stage: subStage && encodeURIComponent(subStage)
          };
        }
        const response = await getAllManageDocsAPI(
          service_id,
          queryParams,
          { signal }
        );
        if (response.status === 200 || response.status === 201) {
          const data = (_b = (_a = response.data) == null ? void 0 : _a.data) == null ? void 0 : _b.records;
          return data;
        } else {
          throw new Error("Failed to fetch documents");
        }
      } catch (err) {
        const error = err;
        if (error.name === "AbortError") return void 0;
        throw new Error("Failed to fetch case data");
      }
    },
    enabled: !!service_id,
    refetchOnWindowFocus: false
    // refetchOnMount: "always",
  });
  const fetchCaseNotes = async ({
    pageParam = 1
  }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    try {
      if (!service_id) return void 0;
      let queryParams = {};
      queryParams = {
        case_stage: stage,
        case_sub_stage: subStage && encodeURIComponent(subStage),
        types: ["NOTE", "CASE_DRAFT_REMARKS"],
        page: pageParam
      };
      const response = await caseViewNotesAPI(service_id, queryParams);
      const records = ((_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data) == null ? void 0 : _b.records) || [];
      return {
        data: records,
        nextCursor: records.length > 0 && ((_e = (_d = (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.data) == null ? void 0 : _d.pagination_info) == null ? void 0 : _e.next_page) ? ((_h = (_g = (_f = response == null ? void 0 : response.data) == null ? void 0 : _f.data) == null ? void 0 : _g.pagination_info) == null ? void 0 : _h.current_page) + 1 : void 0,
        prevCursor: ((_k = (_j = (_i = response == null ? void 0 : response.data) == null ? void 0 : _i.data) == null ? void 0 : _j.pagination_info) == null ? void 0 : _k.current_page) !== 1 ? ((_n = (_m = (_l = response == null ? void 0 : response.data) == null ? void 0 : _l.data) == null ? void 0 : _m.pagination_info) == null ? void 0 : _n.current_page) - 1 : void 0,
        totalRecords: (_q = (_p = (_o = response == null ? void 0 : response.data) == null ? void 0 : _o.data) == null ? void 0 : _p.pagination_info) == null ? void 0 : _q.total_records
      };
    } catch (err) {
      throw new Error("Failed to fetch case notes");
    }
  };
  const {
    data: caseNotes,
    fetchNextPage,
    hasNextPage,
    isFetching: isLoadingCaseNote,
    isFetchingNextPage,
    refetch: refetchCaseNotes
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-notes", service_id, stage, subStage],
    queryFn: fetchCaseNotes,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return void 0;
      const { nextCursor, data } = lastPage;
      return data.length > 0 && nextCursor ? nextCursor : void 0;
    },
    getPreviousPageParam: (firstPage) => {
      var _a;
      return (_a = firstPage == null ? void 0 : firstPage.prevCursor) != null ? _a : void 0;
    },
    refetchOnWindowFocus: false,
    enabled: !!service_id
  });
  const allRecords = (caseNotes == null ? void 0 : caseNotes.pages.map((e) => e.data).flat()) || [];
  return /* @__PURE__ */ jsx(
    CaseStagesContext.Provider,
    {
      value: {
        caseStagesData,
        caseStagesIsLoading,
        isError,
        getCaseStagesRefetch,
        allDocsData,
        allDocsIsFetching,
        allDocsIsLoading,
        getAllDocsRefetch,
        fetchNextPage,
        hasNextPage,
        isLoadingCaseNote,
        isFetchingNextPage,
        refetchCaseNotes,
        allRecords,
        notes,
        setNotes,
        notesId,
        setNotesId,
        serviceData,
        setServiceData
      },
      children
    }
  );
};

export { CaseStagesProvider as C, UseContextAPI as U };
//# sourceMappingURL=Provider-DRuE0d-A.mjs.map
