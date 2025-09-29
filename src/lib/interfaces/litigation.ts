export interface IssueGridProps {
  issues: LitigationService[];
  selectedIssue: LitigationService | null;
  onIssueSelect: (issue: LitigationService) => void;
}

export interface IssueTypeGridProps {
  issueTypes: string[];
  selectedIssueType: string | null;
  onIssueTypeSelect: (issueType: string) => void;
}

export interface OrganizationGridProps {
  organizations: any[];
  selectedOrganization: any;
  onOrganizationSelect: (org: any) => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  searchTerm: string;
}

export interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export interface StepHeaderProps {
  onBackClick: () => void;
  currentStep: number;
  totalSteps: number;
  title: string;
  searchComponent?: React.ReactNode;
}

export interface SubIssueGridProps {
  subIssues: LitigationService[];
  selectedSubIssue: LitigationService | null;
  onSubIssueSelect: (subIssue: LitigationService) => void;
  showChevron?: boolean;
}

export interface SubmitButtonProps {
  canSubmit: boolean;
  isPending: boolean;
  onSubmit: () => void;
}

export interface LitigationService {
  id: number;
  category: string;
  issue: string;
  issue_type: string | null;
  sub_issue: string | null;
  pro_code: string;
}

export type StepType = "issue" | "issueType" | "subIssue" | "organization";
