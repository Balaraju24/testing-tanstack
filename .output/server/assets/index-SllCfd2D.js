import { jsx, jsxs } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { L as LoadingComponent } from "./Loading-CtQhAIXf.js";
import { a as labelSubStages } from "./statusConstants-t7T05Rlh.js";
import { c as getSubStageStatuses } from "./manage-CWSyPq63.js";
import { G as GetCaseFiles } from "./GetCaseFiles-CMfiRIPO.js";
import { G as GetCaseNotes } from "./GetCaseNotes-CcN4R54R.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import { P as PendingStepOverlay } from "./PendingStepOverlay-BxgRCvn6.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "./router-o2MrkizZ.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
import "./index-oJQ5f2gj.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-D8srg3RR.js";
import "@radix-ui/react-tooltip";
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "lucide-react";
import "./pending-icon-C39HKFOC.js";
import "./approved-Icon-D4Mj_64A.js";
import "./current-icon-PhyH9fHB.js";
import "./complete-logo-BunEj7SL.js";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-Bgbbi7bt.js";
import "./ApproveRejectDialog-Bd5cCnaD.js";
import "react-dropzone";
import "pdfjs-dist";
import "./fileUpload-BBm5-XTb.js";
import "./dialog-6uxmGonW.js";
import "@radix-ui/react-dialog";
import "./approve-logo-BxROxWMC.js";
import "./apiHelpers-QKbVsPE7.js";
import "./getCaseFilesConstants-BRQFWmkt.js";
import "./upload-file-icon-D1lM9Y8S.js";
import "./delete-stroke-icon-mn8-8d5M.js";
import "./view-icon-BDRfyII2.js";
import "./card-DL-Nbx-j.js";
import "./separator-D4bWh-hU.js";
import "@radix-ui/react-separator";
import "./edit-icon-DqCvL3Yg.js";
import "./reject-icon-B4PaiBZt.js";
import "./FileIcon-CxEHPjFg.js";
import "./DocsCommentsSection-Dgcs8l8-.js";
import "./avatar-DZ-dXD0g.js";
import "@radix-ui/react-avatar";
import "./default-user-EV710LEP.js";
import "./pdf.worker-CIugw0DL.js";
import "./notes-delete-icon-CyozBLV8.js";
import "vaul";
import "./notification-kzFgGftV.js";
import "./service-1g9dZr4o.js";
import "axios";
import "@radix-ui/react-progress";
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./input-G3xZAzeG.js";
import "./sheet-BXmbu-1p.js";
import "./skeleton-CElu2WzA.js";
const OptionalUploadComponent = ({
  stage,
  subStage,
  mappedCaseStagesData
}) => {
  const { allDocsIsFetching, isLoadingCaseNote } = UseContextAPI();
  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData
  });
  const prevSubStage = labelSubStages[subStageLabel];
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: isPrevSubStageCompleted ? /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: true
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
  ] }) }) : /* @__PURE__ */ jsx(PendingStepOverlay, { title: prevSubStage }) });
};
export {
  OptionalUploadComponent as default
};
