import { Dispatch, SetStateAction } from "react";

export interface UpdateCertificateProps {
  onFileKeyGenerated?: (fileKey: string) => void;
}

export interface FileUploadProps {
  refetch: () => void;
  documentId?: number;
  children?: React.ReactNode;
  category?: string;
  filesDetails?: any;
  loading2?: boolean;
  setLoading2?: Dispatch<SetStateAction<boolean>>;
}

export interface UpdateImageProps {
  onFileKeyGenerated?: (fileKey: string) => void;
  previewImage: string | null;
  setPreviewImage: (url: string | null) => void;
}

export interface FileUploadDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  getFilePreview: any;
  selectedFile: File | null;
  handleCancelUpload: () => void;
  handleConfirmUpload: () => void;
}

export interface FileListProps {
  files: any[];
  onDeleteFile: (file: any) => void;
  onDeletePlaceHolder: (file: any) => void;
  rejAppDialog: (params: {
    docId: number;
    verification_status: string;
    category?: string;
  }) => void;
  onApprove: (params: { docId: number; verification_status: string }) => void;
  getCaseFilesFetcher: () => void;
  loading2: boolean;
  setLoading2: Dispatch<SetStateAction<boolean>>;
  isUser: boolean;
  isB2CManager: boolean;
  isB2CLegalAdvisor: boolean;
  case_sub_stage: string | undefined;
  ApproveOrRejectDocument: boolean;
  showPlaceholder?: boolean;
  isCurrentStageCompleted?: any;
  showPlaceholderforLegalNotice?: boolean;
  noticeDraftKey?: string | undefined;
  noticeSentKey?: string | undefined;
}

export interface FilePreviewDialogProps {
  file: any;
  children: React.ReactNode;
  rejAppDialog: (params: {
    docId: number;
    verification_status: string;
    category?: string;
  }) => void;
  onApprove: (params: { docId: number; verification_status: string }) => void;
  getCaseFilesFetcher: () => void;
  loading2: boolean;
  setLoading2: (loading: boolean) => void;
  isUser: boolean;
  isB2CManager: boolean;
  isB2CLegalAdvisor: boolean;
  case_sub_stage: string | undefined;
  ApproveOrRejectDocument: boolean;
  disabled?: boolean;
  isCurrentStageCompleted: any;
}

export type FileDownloadProps = {
  file: {
    key: string;
    file_name: string;
  };
};

export type GetCaseFilesProps = {
  NoticeSentKey?: string;
  NoticeDraftKey?: string;
};

export interface CommentProps {
  documentId: number;
}

export interface FileCardProps {
  file: any;
  userType: number;
  handleDocumentClick: (id: number) => void;
}
export type caseComment = {
  [x: string]: any;
  id: number;
  case_id: number;
  doc_id: number;
  case_stage: string;
  case_sub_stage: string;
  comment: string;
  reply_to: number;
  created_by: {
    id: number;
    first_name: string;
    last_name: string;
    profile_pic: string;
    user_type: string;
  };
  updated_at: string;
  deleted_at: string;
  created_at: string;
};

export interface DialogType {
  docId: number;
  verification_status: string;
  notes?: string;
  category?: string;
}

export interface IUseFileUploadHook {
  refetch?: () => void;
  showFileUpload?: boolean;
  setShowFileUpload?: Dispatch<SetStateAction<boolean>>;
  getAllFiles?: (page: number) => void;
  from?: string;
  onUploadSuccess?: () => void;
}

export interface ChunkResponse {
  ETag: string;
  PartNumber: number;
}

export type FileProgress = Record<number, number>;

export interface FileError {
  file: File;
  id: number;
  reason: string;
}

export interface FilePreview {
  fileIndex: string;
  previewUrl: string;
}

export interface FileFormData {
  chunkSize: string;
  unit: "MB" | "GB";
  totalChunksParts: string;
  chunkSizeInBytes: number;
}

export interface uploadImagesComponentProps {
  handleFileChange: (files: File[], start: any) => void;
  multipleFiles: File[];
  previewImages: { fileIndex: string; previewUrl: string }[];
  fileProgress: FileProgress;
  fileErrors: any;
  setMultipleFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setFileProgress: React.Dispatch<React.SetStateAction<FileProgress>>;
  setFileFormData: React.Dispatch<React.SetStateAction<FileFormData>>;
  fileFormData: any;
  resumeUpload: (file: File, index: number) => void;
  abortFileUpload: (index: number) => void;
  abortedFiles: Set<number>;
  uploadProgressStart: any;
  fileTitles: any;
  setFileTitles: any;
  selectedCategoryId: any;
  setSelectedCategoryId: any;
  setShowFileUpload: any;
  from?: string;
  setFileErrors: any;
  startUploading: boolean;
  setStartUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DocumentItem {
  id: number;
  file: {
    name: string;
    size: string;
    date: string;
    rawSize: number;
  } | null;
  documentType: string;
  customType: string;
  s3Key: string;
  uploading: boolean;
  uploaded: boolean;
  fileError: string;
  documentTypeError: string;
}

export interface Document {
  id: number;
  created_at: string;
  file_name: string;
  document_type: string;
  remarks: string;
  download_url: string;
}

export interface FileUploadPropsStages {
  stage: string;
  subStage: string;
}
export interface RecordFileUploadProps {
  sendAttachment: (
    file_key: string,
    file_name: string,
    file_size: string,
    file_type: string
  ) => void;
  loading2?: boolean;
  setLoading2?: Dispatch<SetStateAction<boolean>>;
}

export interface SubStage {
  code: string;
  title: string;
  [key: string]: any;
}
