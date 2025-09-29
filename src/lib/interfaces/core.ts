import { Dispatch, SetStateAction } from "react";
import { pageProps } from "./iTable";

export interface ApproveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  icon: React.ReactNode | null;
  disabled?: boolean;
  requireRemarks?: boolean;
  remarks?: string;
  setRemarks?: (val: string) => void;
  isPending?: any;
}

export interface DateOfBirthPickerProps {
  value?: Date;
  onDateSelect: (date: Date | undefined) => void;
}

export interface DatePickerProps {
  onDateSelect: (date: Date | undefined) => void;
  caseDetails: any;
}

export interface LoadingComponentProps {
  loading: boolean | undefined;
  message?: string;
  className?: string;
}

export interface PaginationDetails {
  total_pages: number;
  page_size: number;
  total_records: number;
  current_page: number;
}

export interface LimitOption {
  title: string;
  value: number;
}

export interface PaginationProps {
  capturePageNum: (page: number) => void;
  captureRowPerItems: (limit: number) => void;
  initialPage?: number;
  limitOptionsFromProps?: LimitOption[];
  paginationDetails: PaginationDetails;
}

export interface ISearchFilters {
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  title?: string;
  className?: string;
}

export interface SuccessAnimationProps {
  isVisible: boolean;
  title?: string;
  message?: string;
  caseNumber?: string;
  onComplete?: () => void;
}

export interface TanStackTableProps extends pageProps {
  noDataDescription?: string;
  showNoDataIcon?: boolean;
  noDataHeight?: string;
}

export interface NoDataDisplayProps {
  title?: string;
  description?: string;
  showIcon?: boolean;
  height?: string;
  hasSearch?: boolean;
  isOnHold?: boolean;
  onHoldMessage?: string;
  show?: boolean;
}

export interface SearchDropdownProps {
  placeholder: string;
  options: any[];
  value: any;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelect: (option: any) => void;
  onClear: () => void;
  getOptionLabel: (option: any) => string;
  getOptionKey: (option: any) => string;
  isSelected: (option: any) => boolean;
  renderOption?: (option: any, isSelected: boolean) => React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  noOptionsText?: string;
  width?: string;
  maxHeight?: string;
  className?: string;
}
