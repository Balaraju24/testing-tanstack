import { jsx } from "react/jsx-runtime";
import { b as getCaseStagesAPI } from "./litigations-2Q1m8RsY.js";
import { f as getAllManageDocsAPI, c as caseViewNotesAPI } from "./manage-tW0NLyej.js";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useLocation, useSearch } from "@tanstack/react-router";
import { useContext, useState, createContext } from "react";
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
      const payload = {
        case_id: service_id
      };
      const response = await getCaseStagesAPI(payload);
      if (response.status === 200 || response.status === 201) {
        return response?.data?.data;
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
          const data = response.data?.data?.records;
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
      const records = response?.data?.data?.records || [];
      return {
        data: records,
        nextCursor: records.length > 0 && response?.data?.data?.pagination_info?.next_page ? response?.data?.data?.pagination_info?.current_page + 1 : void 0,
        prevCursor: response?.data?.data?.pagination_info?.current_page !== 1 ? response?.data?.data?.pagination_info?.current_page - 1 : void 0,
        totalRecords: response?.data?.data?.pagination_info?.total_records
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
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor ?? void 0,
    refetchOnWindowFocus: false,
    enabled: !!service_id
  });
  const allRecords = caseNotes?.pages.map((e) => e.data).flat() || [];
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
export {
  CaseStagesProvider as C,
  UseContextAPI as U
};
