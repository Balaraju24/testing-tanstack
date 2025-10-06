import { jsxs, jsx } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
import '@tanstack/react-query';
import '@tanstack/react-router';
import 'react';
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';
import './index-Bb_5490h.mjs';
import './Loading-DQypZbMn.mjs';
import './router-e7zdrxGz.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'sonner';
import 'framer-motion';
import 'react-error-boundary';
import './CaseFilingIcon-Dywh8hPV.mjs';
import './legal-notice-icon-ivaufGCR.mjs';
import './notes-edit-icon-B2gT4vHe.mjs';
import '@radix-ui/react-accordion';
import './tooltip-BKF0DBvK.mjs';
import '@radix-ui/react-tooltip';
import './manage-CWSyPq63.mjs';
import 'dayjs';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/utc.js';
import 'lucide-react';
import './pending-icon-C39HKFOC.mjs';
import './approved-Icon-D4Mj_64A.mjs';
import './current-icon-PhyH9fHB.mjs';
import './complete-logo-DwVwh2_J.mjs';
import './notes-close-icon-FqM48RJz.mjs';
import '@radix-ui/react-alert-dialog';
import './textarea-BfKn0GZN.mjs';
import 'vaul';
import './notification-kzFgGftV.mjs';
import './service-1g9dZr4o.mjs';
import './fileUpload-BBm5-XTb.mjs';
import 'axios';
import '@radix-ui/react-progress';
import 'react-dropzone';
import './default-user-EV710LEP.mjs';
import './notes-delete-icon-CyozBLV8.mjs';
import './notes-head-icon-BuoOTi3l.mjs';
import './summary-icon-card-CWzIqgof.mjs';
import './avatar-xL-W5RbG.mjs';
import '@radix-ui/react-avatar';
import './input-CcfBn-WR.mjs';
import './sheet-vrO17VYZ.mjs';
import '@radix-ui/react-dialog';
import './skeleton-BAyQx-Zm.mjs';

const LOAN_DATA_FIELDS = [
  {
    label: "Customer Name",
    getValueFn: (serviceData) => {
      var _a, _b;
      return (serviceData == null ? void 0 : serviceData.customer_name) || ((_a = serviceData == null ? void 0 : serviceData.user) == null ? void 0 : _a.first_name) + " " + ((_b = serviceData == null ? void 0 : serviceData.user) == null ? void 0 : _b.last_name) || "--";
    }
  },
  {
    label: "Organization / Individual",
    getValueFn: (serviceData) => {
      var _a;
      return (serviceData == null ? void 0 : serviceData.organisation_name) || ((_a = serviceData == null ? void 0 : serviceData.user) == null ? void 0 : _a.organisation_name) || "--";
    }
  },
  {
    label: "Loan Application Number",
    getValueFn: (serviceData) => (serviceData == null ? void 0 : serviceData.loan_application_number) || "--"
  },
  {
    label: "Type of Loan",
    getValueFn: (serviceData) => (serviceData == null ? void 0 : serviceData.loan_type) || "--"
  },
  {
    label: "Loan Amount",
    getValueFn: (serviceData) => parseFloat(serviceData == null ? void 0 : serviceData.loan_amount) !== 0 ? `${parseFloat(serviceData.loan_amount).toLocaleString("en-IN")}` : "--"
  },
  {
    label: "Type of Property",
    getValueFn: (serviceData) => (serviceData == null ? void 0 : serviceData.property_type) || "--"
  }
];
const HEADER_CONFIG = {
  SHOW_ACTION_BUTTON: (isUser) => !isUser,
  SHOW_UPLOAD_BUTTON: false,
  SHOW_NOTE_BUTTON: false
};
function LoanDetails({ stage, subStage }) {
  const { serviceData } = UseContextAPI();
  const { isUser } = useUserDetails();
  const loanData = LOAN_DATA_FIELDS.map((field) => ({
    label: field.label,
    value: field.getValueFn(serviceData)
  }));
  return /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: HEADER_CONFIG.SHOW_ACTION_BUTTON(isUser()),
        showUploadButton: HEADER_CONFIG.SHOW_UPLOAD_BUTTON,
        showNoteButton: HEADER_CONFIG.SHOW_NOTE_BUTTON
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "p-4 w-full h-[calc(100%-60px)] overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-1 max-w-lg", children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: loanData.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("div", { className: "w-48 flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-xs 2xl:text-sm text-black font-normal", children: item.label }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mx-4", children: /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-800", children: ":" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-900 font-light capitalize", children: item.value }) })
    ] }, index)) }) }) })
  ] });
}

export { LoanDetails as default };
//# sourceMappingURL=index-DF37-Lha.mjs.map
