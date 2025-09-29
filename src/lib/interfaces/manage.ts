import { JSX } from "react";

export interface CaseNotesResponse {
  data: any[];
  nextCursor: number | undefined;
  prevCursor: number | undefined;
  totalRecords: number;
}

export interface FeedbackCardProps {
  review: reviewType;
}

export interface DynamicComponentProps {
  stage: string | undefined;
  subStage: string | undefined;
  mappedCaseStagesData?: any;
}

export interface SubStage {
  id: string;
  code: string;
  order: number;
  title: string;
  status: string;
}

export interface ManageSubStage {
  stage: string;
  subStage: string;
}

export interface SubStepRoute {
  name: string;
  label: string;
}

export interface StageRoute {
  title: string;
  value: string;
  icon: (stageValue: string) => JSX.Element | null;
  subSteps: SubStepRoute[];
}

export type ReviewLinkResponse = {
  status: number;
  success: boolean;
  message: string;
};

export type reviewType = {
  id: number;
  case_id: number;
  legal_advisor_id: number;
  advocate_id: number;
  rating: string;
  feedback: string;
  feedback_type: string;
  is_recommended: boolean;
  suggestion: string;
  case_stage: string;
  case_sub_stage: string;
  verification_status: string;
  verified_by: number;
  created_at: string;
  updated_at: string;
  case: {
    id: number;
    temp_id: string;
    ref_id: string;
  };
  advocate: {
    id: number;
    first_name: string;
    last_name: string;
    profile_pic: string;
  };
  legal_advisor: {
    id: number;
    first_name: string;
    last_name: string;
    profile_pic: string;
  };
};

export type CaseFile = {
  id: number;
  case_id: number;
  key: string;
  desc: string | null;
  file_name: string;
  file_size: number;
  file_type: string;
  is_requested: boolean;
  requested_by: number | null;
  upload_status: string;
  verification_status: string;
  verified_at: string | null;
  verified_by: number | null;
  category: string;
  case_stage: string;
  case_sub_stage: string;
  is_consent_provided: boolean;
  comments_count: number;
  notes: string;
  uploaded_by: number;
  doc_read_status: NotesReadStatus[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  download_url: string;
  document_type: string;
};

export type NotesReadStatus = {
  is_seen: boolean;
  user_id: number;
};

export type GroupedFiles = Record<string, CaseFile[]>;

export type GroupedFile = {
  [substage: string]: File[] | { [category: string]: File[] };
};

export type LazyComponentType = React.LazyExoticComponent<
  React.ComponentType<DynamicComponentProps>
>;

export type DocRecord = {
  category: string | null;
  verification_status: "APPROVED" | "PENDING" | "REJECTED" | string;
};
