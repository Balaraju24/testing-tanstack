import { jsx, jsxs } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { u as useDocsApproval } from "./useDocsApproval-CzCEMiQ5.js";
import { G as GetCaseFiles } from "./GetCaseFiles-DxxxDQtF.js";
import { G as GetCaseNotes } from "./GetCaseNotes-DSbNb1Jm.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "./router-e7zdrxGz.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./index-Bb_5490h.js";
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
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "lucide-react";
import "./pending-icon-C39HKFOC.js";
import "./approved-Icon-D4Mj_64A.js";
import "./current-icon-PhyH9fHB.js";
import "./complete-logo-DwVwh2_J.js";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-BfKn0GZN.js";
import "./ApproveRejectDialog-CbjX-vD1.js";
import "react-dropzone";
import "pdfjs-dist";
import "./fileUpload-BBm5-XTb.js";
import "./dialog-CbaK730S.js";
import "@radix-ui/react-dialog";
import "./approve-logo-BtPutrSX.js";
import "./apiHelpers-QKbVsPE7.js";
import "./getCaseFilesConstants-BRQFWmkt.js";
import "./upload-file-icon-D1lM9Y8S.js";
import "./delete-stroke-icon-mn8-8d5M.js";
import "./view-icon-BDRfyII2.js";
import "./card-CfZVGcIr.js";
import "./separator-BzkEE94Y.js";
import "@radix-ui/react-separator";
import "./edit-icon-DqCvL3Yg.js";
import "./reject-icon-B4PaiBZt.js";
import "./FileIcon-DM2CMkXH.js";
import "./DocsCommentsSection-1v4F6eR1.js";
import "./avatar-xL-W5RbG.js";
import "@radix-ui/react-avatar";
import "./default-user-EV710LEP.js";
import "./pdf.worker-CIugw0DL.js";
import "./statusConstants-t7T05Rlh.js";
import "./notes-delete-icon-CyozBLV8.js";
import "vaul";
import "./notification-kzFgGftV.js";
import "./service-1g9dZr4o.js";
import "axios";
import "@radix-ui/react-progress";
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./input-CcfBn-WR.js";
import "./sheet-vrO17VYZ.js";
import "./skeleton-BAyQx-Zm.js";
const MandatoryUploadComponent = ({
  stage,
  subStage
}) => {
  const { allDocsIsFetching, isLoadingCaseNote } = UseContextAPI();
  const docsApprove = useDocsApproval();
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: !!docsApprove,
        showUploadButton: true
      }
    ),
    /* @__PURE__ */ jsx("div", { className: " p-2  w-full h-[calc(100%-60px)] relative overflow-auto ", children: allDocsIsFetching && isLoadingCaseNote ? /* @__PURE__ */ jsx(
      LoadingComponent,
      {
        loading: allDocsIsFetching && isLoadingCaseNote
      }
    ) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(GetCaseFiles, {}),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] }) })
  ] }) }) });
};
export {
  MandatoryUploadComponent as default
};
