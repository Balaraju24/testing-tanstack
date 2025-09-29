import { Dispatch, SetStateAction } from "react";

export interface pageProps {
  columns: any[];
  data: any[];
  loading?: boolean;
  heightClass?: string;
  getData?: any;
  paginationDetails: any;
  removeSortingForColumnIds?: string[];
  noDataLabel?: string;
}

export interface iConfirmDialog {
  removeConfirm: boolean;
  setRemoveConfirm: Dispatch<SetStateAction<boolean>>;
  name?: string;
  contactTypes?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleteLoading?: boolean;
  setDeleteReason?: Dispatch<SetStateAction<string>>;
  deleteReason?: string;
  deleteError?: string;
  setDeleteError?: Dispatch<SetStateAction<string>>;
}

export interface iApproveRejectDialog {
  isPending?: boolean;
  removeConfirm: boolean;
  setRemoveConfirm: Dispatch<SetStateAction<boolean>>;
  contactTypes?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleteLoading?: boolean;
  setApproveRejectReason?: Dispatch<SetStateAction<string>>;
  dialogType: any;
  appRejError: string;
  setAppRejError: Dispatch<SetStateAction<string>>;
}
