import { JSX } from "react";

import ArbitrationPetetion from "@/components/icons/arbitration-petetion-icon";
import Conclilition from "@/components/icons/conciliation-icon";
import LegalNotice from "@/components/icons/legal-notice-icon";
import NiActPetetion from "@/components/icons/ni-act-petetion-icon";
import ExecutionPetetion from "@/components/icons/execution-petetion-icon";
import SarfaesiPetetion from "@/components/icons/sarfaesi-petetion-icon";
import ChequeBounce from "@/components/icons/litigationCasesIcons/cheque-bounce";
import CommercialNotices from "@/components/icons/litigationCasesIcons/commercial-notices";
import ContractCancellation from "@/components/icons/litigationCasesIcons/contract-cancellation";
import ContractDefaultNotice from "@/components/icons/litigationCasesIcons/contract-default-notice";
import ContractTerminationNotice from "@/components/icons/litigationCasesIcons/contract-termination-notice";
import DebtOrRecoveryNoticeIcons from "@/components/icons/litigationCasesIcons/debt-or-recovery-notice-icons";
import DemandNoticeforPayment from "@/components/icons/litigationCasesIcons/demand-notice-for-payment";
import FinancialNotices from "@/components/icons/litigationCasesIcons/financial-notices";
import ForeclosureorAuctionNotice from "@/components/icons/litigationCasesIcons/fore-closure-or-auction-notice";
import GuaranteeInvocationNotice from "@/components/icons/litigationCasesIcons/guarantee-invocation-notice";
import LoanDemandNotice from "@/components/icons/litigationCasesIcons/loan-demand-notice";
import NoticeInvokingDisputeResolution from "@/components/icons/litigationCasesIcons/notice-invoking-dispute-resolution";
import NoticeofDefault from "@/components/icons/litigationCasesIcons/notice-of-default";
import NoticeofPromotionorSalaryChange from "@/components/icons/litigationCasesIcons/notice-of-promotion-or-salary-change";
import NoticetoLaborAuthorities from "@/components/icons/litigationCasesIcons/notice-to-labor-authorities";
import OrderCancellationNotice from "@/components/icons/litigationCasesIcons/order-cancellation-notice";
import RegularShowCaseNotice from "@/components/icons/litigationCasesIcons/regular-show-case-notice";
import ResignationNotice from "@/components/icons/litigationCasesIcons/resignation-notice";
import SARFAESIDemand from "@/components/icons/litigationCasesIcons/sarfaesi-demand";
import ShowCauseNoticetoEmployee from "@/components/icons/litigationCasesIcons/show-cause-notice-to-employee";
import Termination from "@/components/icons/litigationCasesIcons/termination-icon";
import Transfer from "@/components/icons/litigationCasesIcons/transfer-icon";
import HRNoticeIcon from "@/components/icons/litigationCasesIcons/hr-notice-icon";
import LegalNoticeIcon from "@/components/icons/litigationCasesIcons/legal-notice-icon";
import DefamationNoticeIcon from "@/components/icons/litigationCasesIcons/defamation-notice-icon";
import EvictionorTenancynoticeIcon from "@/components/icons/litigationCasesIcons/eviction-or-tenancy-notice-icon";
import StatutoryIcon from "@/components/icons/litigationCasesIcons/loan-demand-notice";
import Inspection from "@/components/icons/litigationCasesIcons/inspection-icon";

export const issueIcons: Record<string, any> = {
  // Existing entries
  "Arbitration Petition": ArbitrationPetetion,
  Conciliation: Conclilition,
  Notices: LegalNotice,
  "NI Act Petitions": NiActPetetion,
  "Execution Petition": ExecutionPetetion,
  "Sarfaesi Petition": SarfaesiPetetion,

  // Legal Notices
  "Legal Notices": LegalNoticeIcon,
  "Debt/Recovery Notice": DebtOrRecoveryNoticeIcons,
  "Defamation Notice": DefamationNoticeIcon,
  "Eviction/Tenancy Notice": EvictionorTenancynoticeIcon,
  "Contract Default Notice": ContractDefaultNotice,
  "Contract Termination Notice": ContractTerminationNotice,
  "Statutory/Compliance Notice": StatutoryIcon,

  // Financial Notices
  "Financial Notices": FinancialNotices,
  "Loan Demand Notice": LoanDemandNotice,
  "SARFAESI Demand/Possession Notice": SARFAESIDemand,
  "Cheque Bounce (Section 138 NI Act) Notice": ChequeBounce,
  "Guarantee Invocation Notice": GuaranteeInvocationNotice,
  "Foreclosure or Auction Notice": ForeclosureorAuctionNotice,

  // Commercial Notices
  "Commercial Notices": CommercialNotices,
  "Notice of Default": NoticeofDefault,
  "Contract Cancellation/Termination Notice": ContractCancellation,
  "Order Cancellation Notice": OrderCancellationNotice,
  "Notice Invoking Dispute Resolution": NoticeInvokingDisputeResolution,
  "Demand Notice for Payment": DemandNoticeforPayment,
  "Regulatory Show-Cause Notices (Between Business partners)":
    RegularShowCaseNotice,
  "Inspection / Compliance Notices (Between Business partners)": Inspection,

  // HR (Employment) Notices
  "HR (Employment) Notices": HRNoticeIcon,
  "Resignation Notice": ResignationNotice,
  "Show-Cause (Warning) Notice to Employee": ShowCauseNoticetoEmployee,
  "Termination/Dismissal Notice": Termination,
  "Transfer/Posting Notice": Transfer,
  "Notice to Labor Authorities/Unions": NoticetoLaborAuthorities,
  "Notice of Promotion or Salary Change": NoticeofPromotionorSalaryChange,
};

// Alternative structure if you prefer nested organization
export const categorizedIssueIcons = {
  legalNotices: {
    category: "Legal Notices",
    icon: LegalNoticeIcon,
    subCategories: {
      "Debt/Recovery Notice": DebtOrRecoveryNoticeIcons,
      "Defamation Notice": DefamationNoticeIcon,
      "Eviction/Tenancy Notice": EvictionorTenancynoticeIcon,
      "Contract Default Notice": ContractDefaultNotice,
      "Contract Termination Notice": ContractTerminationNotice,
      "Statutory/Compliance Notice": StatutoryIcon,
    },
  },
  financialNotices: {
    category: "Financial Notices",
    icon: FinancialNotices,
    subCategories: {
      "Loan Demand Notice": LoanDemandNotice,
      "SARFAESI Demand/Possession Notice": SARFAESIDemand,
      "Cheque Bounce (Section 138 NI Act) Notice": ChequeBounce,
      "Guarantee Invocation Notice": GuaranteeInvocationNotice,
      "Foreclosure or Auction Notice": ForeclosureorAuctionNotice,
    },
  },
  commercialNotices: {
    category: "Commercial Notices",
    icon: CommercialNotices,
    subCategories: {
      "Notice of Default": NoticeofDefault,
      "Contract Cancellation/Termination Notice": ContractCancellation,
      "Order Cancellation Notice": OrderCancellationNotice,
      "Notice Invoking Dispute Resolution": NoticeInvokingDisputeResolution,
      "Demand Notice for Payment": DemandNoticeforPayment,
      "Regulatory Show-Cause Notices (Between Business partners)":
        RegularShowCaseNotice,
      "Inspection / Compliance Notices (Between Business partners)": Inspection,
    },
  },
  hrNotices: {
    category: "HR (Employment) Notices",
    icon: HRNoticeIcon,
    subCategories: {
      "Resignation Notice": ResignationNotice,
      "Show-Cause (Warning) Notice to Employee": ShowCauseNoticetoEmployee,
      "Termination/Dismissal Notice": Termination,
      "Transfer/Posting Notice": Transfer,
      "Notice to Labor Authorities/Unions": NoticetoLaborAuthorities,
      "Notice of Promotion or Salary Change": NoticeofPromotionorSalaryChange,
    },
  },
  // Keep existing categories
  arbitration: {
    category: "Arbitration Petition",
    icon: ArbitrationPetetion,
  },
  conciliation: {
    category: "Conciliation",
    icon: Conclilition,
  },
  niAct: {
    category: "NI Act Petitions",
    icon: NiActPetetion,
  },
  execution: {
    category: "Execution Petition",
    icon: ExecutionPetetion,
  },
  sarfaesi: {
    category: "Sarfaesi Petition",
    icon: SarfaesiPetetion,
  },
};

// Helper function to get icon by key
export const getIssueIcon = (
  issueType: string
): ((props: { className?: string }) => JSX.Element) | null => {
  return issueIcons[issueType] || null;
};

export const loanTypeOptions = [
  { value: "Home loan", label: "Home Loan" },
  { value: "Personal loan", label: "Personal Loan" },
  { value: "Business loan", label: "Business Loan" },
  { value: "Auto loan", label: "Auto Loan" },
  { value: "Education loan", label: "Education Loan" },
  { value: "Property loan", label: "Property Loan" },
  { value: "Gold loan", label: "Gold Loan" },
];

export const propertyOptions = [
  "Residential",
  "Commercial",
  "Industrial",
  "Agricultural",
  "Plot/Land",
  "Apartment",
  "Office Space",
];
