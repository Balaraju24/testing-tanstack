import { jsx, jsxs } from "react/jsx-runtime";
import { a as labelSubStages } from "./statusConstants-t7T05Rlh.js";
import { c as getSubStageStatuses } from "./manage-CWSyPq63.js";
import { G as GetCaseNotes } from "./GetCaseNotes-DSbNb1Jm.js";
import { P as PendingStepOverlay } from "./PendingStepOverlay-BxgRCvn6.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import { U as UserGetCaseFiles } from "./userGetCaseFiles-D4VE_Qg7.js";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
import "./Provider-DRuE0d-A.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "./notes-delete-icon-CyozBLV8.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "./router-e7zdrxGz.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "lucide-react";
import "./index-Bb_5490h.js";
import "./Loading-DQypZbMn.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "@radix-ui/react-accordion";
import "./tooltip-BKF0DBvK.js";
import "@radix-ui/react-tooltip";
import "./useUserPermissions-IrViIWLA.js";
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
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./avatar-xL-W5RbG.js";
import "@radix-ui/react-avatar";
import "./input-CcfBn-WR.js";
import "./sheet-vrO17VYZ.js";
import "@radix-ui/react-dialog";
import "./skeleton-BAyQx-Zm.js";
import "./DocsCommentsSection-1v4F6eR1.js";
import "./card-CfZVGcIr.js";
import "./upload-file-icon-D1lM9Y8S.js";
import "./delete-stroke-icon-mn8-8d5M.js";
import "./view-icon-BDRfyII2.js";
import "./approve-logo-BtPutrSX.js";
import "./apiHelpers-QKbVsPE7.js";
import "./ApproveRejectDialog-CbjX-vD1.js";
import "pdfjs-dist";
import "./dialog-CbaK730S.js";
import "./edit-icon-DqCvL3Yg.js";
import "./reject-icon-B4PaiBZt.js";
import "./separator-BzkEE94Y.js";
import "@radix-ui/react-separator";
import "./userFileIcon-XAkFxF_N.js";
import "./pdf.worker-CIugw0DL.js";
const UploadDocuments = ({
  stage,
  subStage,
  mappedCaseStagesData
}) => {
  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData
  });
  const prevSubStage = labelSubStages[subStageLabel];
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: isPrevSubStageCompleted ? /* @__PURE__ */ jsxs("div", { className: " h-full px-1", children: [
    /* @__PURE__ */ jsx("div", { className: " relative", children: /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showNoteButton: false,
        showUploadButton: false
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "p-2 relative w-full h-[calc(100%-60px)] overflow-auto", children: [
      /* @__PURE__ */ jsx(UserGetCaseFiles, {}),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] })
  ] }) : /* @__PURE__ */ jsx(PendingStepOverlay, { title: prevSubStage }) });
};
export {
  UploadDocuments as default
};
