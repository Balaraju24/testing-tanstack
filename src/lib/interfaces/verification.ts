import { Dispatch, SetStateAction } from "react";

export interface Advocate {
  id: string;
  first_name: string;
  last_name: string;
  profile_pic?: string;
  phone: string;
  experience: number;
  rating?: number;
}

export interface AssignAdvocateProps {
  stage: string;
  subStage: string;
}

export interface Document {
  id: number;
  created_at: string;
  file_name: string;
  document_type: string;
  remarks: string;
  download_url: string;
  key?: string; // Add key for download API
  is_accepted?: boolean; // Add acceptance status
  verification_status: string;
}

export interface FileUploadProps {
  stage: string;
  subStage: string;
  isLoading?: boolean; // Add loading prop
}

export interface PlaceholderCardProps {
  file: any;
  getCaseFilesFetcher: () => void;
  loading2: boolean;
  setLoading2: Dispatch<SetStateAction<boolean>>;
  isCurrentStageCompleted?: any;
}
