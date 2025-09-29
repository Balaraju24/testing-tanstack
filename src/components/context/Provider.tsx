import { getCaseStagesAPI } from "@/http/services/litigations";
import { caseViewNotesAPI, getAllManageDocsAPI } from "@/http/services/manage";
import {
  CaseStagesContextValue,
  CaseStagesProviderProps,
} from "@/lib/interfaces/context";
import { CaseNotesResponse } from "@/lib/interfaces/manage";
import {
  QueryObserverResult,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useLocation, useParams, useSearch } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";

const CaseStagesContext = createContext<CaseStagesContextValue>({
  caseStagesData: null,
  caseStagesIsLoading: false,
  isError: false,
  isFetchingNextPage: false,
  getCaseStagesRefetch: async () =>
    Promise.resolve({} as QueryObserverResult<any, Error>),
  fetchNextPage: () => Promise.resolve({} as QueryObserverResult<any, Error>),
  serviceData: null,
  setServiceData: () => {},
  allDocsData: null,
  allDocsIsFetching: false,
  allDocsIsLoading: false,
  getAllDocsRefetch: async () =>
    Promise.resolve({} as QueryObserverResult<any, Error>),
  hasNextPage: false,
  isLoadingCaseNote: false,
  refetchCaseNotes: () =>
    Promise.resolve({} as QueryObserverResult<any, Error>),
  allRecords: [],
  notes: null,
  setNotes: () => {},
  notesId: null,
  setNotesId: () => {},
});

export const UseContextAPI = () => useContext(CaseStagesContext);

export const CaseStagesProvider = ({ children }: CaseStagesProviderProps) => {
  const { service_id } = useParams({ strict: false });
  const location = useLocation();
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const path = location.pathname;
  const stage = search.stage;
  const subStage = search.sub_stage;
  const [notes, setNotes] = useState<any>(null);
  const [notesId, setNotesId] = useState<number | null>(null);
  const [serviceData, setServiceData] = useState<any>(null);

  const {
    isLoading: caseStagesIsLoading,
    data: caseStagesData,
    isError,
    refetch: getCaseStagesRefetch,
  } = useQuery({
    queryKey: ["caseStages", service_id],
    queryFn: async () => {
      const payload = {
        case_id: service_id,
      };
      const response = await getCaseStagesAPI(payload);
      if (response.status === 200 || response.status === 201) {
        return response?.data?.data;
      }
      throw new Error("Failed to fetch case stages");
    },
    enabled: !!service_id,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: allDocsIsLoading,
    isFetching: allDocsIsFetching,
    data: allDocsData,
    refetch: getAllDocsRefetch,
  } = useQuery({
    queryKey: ["file-details", service_id, stage, subStage, location.pathname],

    queryFn: async ({ signal }) => {
      try {
        if (
          !service_id ||
          path.includes("case-history") ||
          path.includes("notes") ||
          path.includes("logs") ||
          path.includes("chat") ||
          path.includes("files") ||
          path.includes("advocate-approval") ||
          subStage === "PRBD"
        )
          return { signal };
        let queryParams: any = {};
        if (subStage === "CSFG#DREV") {
          queryParams = {
            case_stage: "CSFG",
            case_sub_stages: [
              "CSFG#DAPT",
              "CSFG#DROC",
              "CSFG#DROP",
              "CSFG#DRCR",
              "CSFG#DRAP",
            ].map(encodeURIComponent),
            verification_status: "APPROVED",
          };
        } else if (subStage === "VEFI#FICV" || subStage === "FIUP#UPAF") {
          queryParams = {
            case_stages: ["FIUP", "VEFI"].map(encodeURIComponent),
            case_sub_stages: ["FIUP#UPAF", "VEFI#FICV"].map(encodeURIComponent),
          };
        } else if (subStage === "QURI#MDSC") {
          queryParams = {
            case_stages: ["QURI"].map(encodeURIComponent),
            case_sub_stages: ["QURI#RQMD", "QURI#MDSC"].map(encodeURIComponent),
          };
        } else if (subStage === "SLNT#SNNT") {
          queryParams = {
            case_stages: ["DLNT", "SLNT"].map(encodeURIComponent),
            case_sub_stages: ["DLNT#DFNT", "SLNT#SNNT"].map(encodeURIComponent),
          };
        } else {
          queryParams = {
            case_stage: stage,
            case_sub_stage: subStage && encodeURIComponent(subStage),
          };
        }

        const response = await getAllManageDocsAPI(
          service_id as string,
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
        const error = err as Error;
        if (error.name === "AbortError") return undefined;
        throw new Error("Failed to fetch case data");
      }
    },
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    // refetchOnMount: "always",
  });

  const fetchCaseNotes = async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }): Promise<CaseNotesResponse | undefined> => {
    try {
      if (!service_id) return undefined;
      let queryParams: any = {};
      queryParams = {
        case_stage: stage,
        case_sub_stage: subStage && encodeURIComponent(subStage),
        types: ["NOTE", "CASE_DRAFT_REMARKS"],
        page: pageParam,
      };
      const response = await caseViewNotesAPI(service_id, queryParams);
      const records = response?.data?.data?.records || [];
      return {
        data: records,
        nextCursor:
          records.length > 0 && response?.data?.data?.pagination_info?.next_page
            ? response?.data?.data?.pagination_info?.current_page + 1
            : undefined,
        prevCursor:
          response?.data?.data?.pagination_info?.current_page !== 1
            ? response?.data?.data?.pagination_info?.current_page - 1
            : undefined,
        totalRecords: response?.data?.data?.pagination_info?.total_records,
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
    refetch: refetchCaseNotes,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-notes", service_id, stage, subStage],
    queryFn: fetchCaseNotes,
    getNextPageParam: (lastPage: CaseNotesResponse | undefined) => {
      if (!lastPage) return undefined; // Handle undefined case
      const { nextCursor, data } = lastPage;
      return data.length > 0 && nextCursor ? nextCursor : undefined;
    },
    getPreviousPageParam: (firstPage: CaseNotesResponse | undefined) =>
      firstPage?.prevCursor ?? undefined,
    refetchOnWindowFocus: false,
    enabled: !!service_id,
  });

  const allRecords = caseNotes?.pages.map((e: any) => e.data).flat() || [];

  return (
    <CaseStagesContext.Provider
      value={{
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
        setServiceData,
      }}
    >
      {children}
    </CaseStagesContext.Provider>
  );
};
