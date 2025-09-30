import { jsxs, jsx } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "./index-Bb_5490h.js";
import "./Loading-DQypZbMn.js";
import "./router-e7zdrxGz.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-BKF0DBvK.js";
import "@radix-ui/react-tooltip";
import "./manage-CWSyPq63.js";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
import "lucide-react";
import "./pending-icon-C39HKFOC.js";
import "./approved-Icon-D4Mj_64A.js";
import "./current-icon-PhyH9fHB.js";
import "./complete-logo-DwVwh2_J.js";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-BfKn0GZN.js";
import "vaul";
import "./notification-kzFgGftV.js";
import "./service-1g9dZr4o.js";
import "./fileUpload-BBm5-XTb.js";
import "axios";
import "@radix-ui/react-progress";
import "react-dropzone";
import "./default-user-EV710LEP.js";
import "./notes-delete-icon-CyozBLV8.js";
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./avatar-xL-W5RbG.js";
import "@radix-ui/react-avatar";
import "./input-CcfBn-WR.js";
import "./sheet-vrO17VYZ.js";
import "@radix-ui/react-dialog";
import "./skeleton-BAyQx-Zm.js";
const LOAN_DATA_FIELDS = [
  {
    label: "Customer Name",
    getValueFn: (serviceData) => serviceData?.customer_name || serviceData?.user?.first_name + " " + serviceData?.user?.last_name || "--"
  },
  {
    label: "Organization / Individual",
    getValueFn: (serviceData) => serviceData?.organisation_name || serviceData?.user?.organisation_name || "--"
  },
  {
    label: "Loan Application Number",
    getValueFn: (serviceData) => serviceData?.loan_application_number || "--"
  },
  {
    label: "Type of Loan",
    getValueFn: (serviceData) => serviceData?.loan_type || "--"
  },
  {
    label: "Loan Amount",
    getValueFn: (serviceData) => parseFloat(serviceData?.loan_amount) !== 0 ? `${parseFloat(serviceData.loan_amount).toLocaleString("en-IN")}` : "--"
  },
  {
    label: "Type of Property",
    getValueFn: (serviceData) => serviceData?.property_type || "--"
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
export {
  LoanDetails as default
};
