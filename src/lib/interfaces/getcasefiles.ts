import { Dispatch, SetStateAction } from "react";

export interface ConsentCheckboxProps {
  filesDetails: any[];
}

export interface PlaceholderCardProps {
  file: any;
  getCaseFilesFetcher: () => void;
  loading2: boolean;
  setLoading2: Dispatch<SetStateAction<boolean>>;
  isCurrentStageCompleted?: any;
}

export interface AssignAdvocateProps {
  stage: string;
  subStage: string;
}

export interface NotesListProps {
  text: string;
}

export interface Document {
  id: number;
  created_at: string;
  file_name: string;
  document_type: string;
  remarks: string;
  download_url: string;
}
export interface AssignAdvocateProps {
  stage: string;
  subStage: string;
}
export interface PendingStepOverlayProps {
  title: string;
}
export interface FileUploadProps {
  stage: string;
  subStage: string;
}

export interface AdvocateGroupAvatarsProps {
  advocateCases: any[];
  id: string;
}

export interface ExistingDocument {
  id: number;
  file_name: string;
  file_size: number;
  file_type: string;
  created_at: string;
  download_url: string;
  key: string;
  category: string;
}

export interface DocumentListProps {
  documents: ExistingDocument[];
  category: string;
  downloadingDocId: number | null;
  handleDownload: (doc: ExistingDocument) => void;
}

export interface UploadedFile {
  id: number;
  name: string;
  size: number;
  uploadDate: string;
  type: string;
  key: string;
  presignedUrl: string;
  file: File;
}

export interface FileListProps {
  files: UploadedFile[];
  isDeleting: (id: number) => boolean;
  removeFile: (id: number) => void;
  loading: boolean;
}

export interface FileUploadUIProps {
  isDragOver: boolean;
  isAnyOperationInProgress: boolean;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
}

export interface DynamicComponentProps {
  stage: string;
  subStage: string;
}

export interface AssignAdvocateProps {
  stage: string;
  subStage: string;
}

export interface PlaceholderCardProps {
  file: any;
  getCaseFilesFetcher: () => void;
  loading2: boolean;
  setLoading2: Dispatch<SetStateAction<boolean>>;
  filesDetails: any[];
  isCurrentStageCompleted?: any;
}

type CommentType = "APPROVED" | "REJECTED" | null;

export type Advocate = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  profile_pic?: string;
  designation?: string;
  address?: string;
  rating?: number;
  experience?: number;
};

export type AdvocateCase = {
  is_advocate_assigned: boolean;
  advocate: Advocate;
};

export type LitigationAdvocatesListProps = {
  advocateCases: AdvocateCase[];
  onAdvocateSelect?: (advocate: Advocate, index: number) => void;
  selectedAdvocateIndex?: number;
};

export type FileIconRendererProps = {
  fileType: string;
  downloadUrl?: string;
  fileName?: string;
};
