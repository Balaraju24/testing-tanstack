import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ReactNode } from "react";

export interface CaseCompletionContextType {
  completeSubStage: (subStage: string) => void;
  completeStage: (stage: string) => void;
  completeCase: () => void;
}

export interface CaseStagesContextValue {
  caseStagesData?: any;
  allDocsIsLoading?: boolean;
  caseStagesIsLoading?: boolean;
  isError?: boolean;
  getCaseStagesRefetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  allDocsData?: any;
  allDocsIsFetching?: boolean;
  getAllDocsRefetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoadingCaseNote?: boolean;
  refetchCaseNotes: () => void;
  allRecords: any[];
  notes: any;
  setNotes: (value: any) => void;
  notesId?: number | null;
  serviceData?: any;
  setServiceData: React.Dispatch<React.SetStateAction<any>>;
  setNotesId: (value: number | null) => void;
}

export interface CaseStagesProviderProps {
  children: ReactNode;
}
