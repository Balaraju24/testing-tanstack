import { DialogType } from "./files";
import { CaseFile } from "./manage";

export type NotesViewPayload = {
  note_ids: number[];
  note_type: string;
};

export type Note = {
  id: number;
  case_id: number;
  title: string;
  note: string;
  created_by: User;
  updated_by: User | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  case_stage: string;
  case_sub_stage: string;
  type: string;
  notes_read_status: NotesReadStatus[];
  visible_to: number[];
  visible_status: string | null;
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  user_type?: string;
  phone?: string;
  email?: string;
  aadhaar?: string;
  customer_id?: string;
};

export type NotesReadStatus = {
  is_seen: boolean;
  user_id: number;
};

export interface Notification {
  id: number;
  user_id: number;
  case_id: number;
  case_stage: string;
  case_sub_stage: string;
  message: string;
  is_marked: boolean;
  created_at: string;
  case: {
    id: number;
    temp_id: string;
    ref_id: string;
    cnr_number: string;
    cmp_number?: string;
    service_type: string;
  };
}

export interface ManageCaseHeaderProps {
  title?: string;
  onAppoint?: () => void;
  onApprove?: () => void;
  showApproveButton?: boolean;
  onPriceApprove?: () => void;
  isButtonDisabled?: boolean;
  isButtonHidden?: boolean;
  caseDetails?: any;
  full_profile?: any;
  showActionButton?: boolean;
  isCompleted?: boolean;
  setIsCompleted?: (value: boolean) => void;
  caseStage?: string;
  caseSubStage?: string;
  showUploadButton?: boolean;
  showNoteButton?: boolean;
  showSummaryButton?: boolean;
  showEditButton?: boolean;
  blur?: string | null;
  showReview?: boolean;
  reviewDetails?: any;
}

export type ChatMessageData = {
  message: string;
  time: string;
  user_id: number;
  created_by: string;
  profile_pic: string;
  created_at?: any;
  id?: any;
  user_read_status: UserReadStatus[];
  user: ChatUser;
  type: string;
  attachment_key: string;
  attachment_name: string;
  download_url: string;
};

type UserReadStatus = {
  is_seen: boolean;
  user_id: number;
};

type ChatUser = {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic: string | null;
};

export type ChatMessageProps = {
  messageData: ChatMessageData;
  refetch: () => void;
  onEdit: (chatId: string, message: string, created_at: Date) => void;
};

export type File = {
  id: number;
  case_id: number;
  key: string;
  desc: null;
  file_name: string;
  file_size: number;
  file_type: string;
  is_requested: boolean;
  requested_by: string;
  upload_status: string;
  verification_status: string;
  verified_at: Date;
  verified_by: number;
  category: string;
  case_stage: string;
  case_sub_stage: string;
  is_consent_provided: boolean;
  comments_count: number;
  notes: string;
  uploaded_by: number;
  doc_read_status: NotesReadStatus[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  download_url: string;
};

export type Log = {
  id: number;
  case_id: number;
  description: string;
  reason: string | null;
  created_by: number;
  created_at: Date;
};
export interface FilePreviewDialogProps {
  file: any;
  handleDocumentClick: (documentId: number) => void;
  children?: React.ReactNode;
}

export interface TabProps {
  value: string;
  icon: React.ComponentType;
  label: string;
  activeTabValue: string;
}

export type TabItem = {
  value: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  show?: boolean;
};

export interface HearingHistoryListProps {
  allRecords: any[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  lastHearingSummaryRef: (node: any) => void;
}

export interface HearingHistoryItemProps {
  record: any;
}

export interface FileItemProps {
  file: CaseFile;
  index: number;
  stage: string | undefined;
  subStage: string | undefined;
  isReportingStageCompleted: boolean;
  onDeleteFile: (file: CaseFile) => void;
  getAllDocsRefetch: () => void;
  setDialogType: (dialog: DialogType | null) => void;
  isCurrentStageCompleted: boolean;
}

export interface PaymentDetails {
  case_details?: {
    id?: number;
    temp_id?: string;
    ref_id?: string;
    status?: string;
    price?: string;
    paid_amount?: string;
    recent_payment_date?: string;
    is_payment_completed?: boolean;
    payment_method?: string;
    pending_price?: string;
    pending_price_status?: string;
  };
  service_details?: {
    id?: number;
    issue?: string;
    category?: string;
  };
  user_details?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
}

export interface ServiceData {
  is_payment_completed?: boolean;
  price?: number;
}

export interface PricingProps {
  stage: string;
  subStage: string;
}
