import { jsx, jsxs } from "react/jsx-runtime";
import { G as GetCaseNotes } from "./GetCaseNotes-CcN4R54R.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import { U as UserGetCaseFiles } from "./userGetCaseFiles-DfgBLT9C.js";
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
import "./router-o2MrkizZ.js";
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
import "./index-oJQ5f2gj.js";
import "./Loading-CtQhAIXf.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "@radix-ui/react-accordion";
import "./tooltip-D8srg3RR.js";
import "@radix-ui/react-tooltip";
import "./manage-CWSyPq63.js";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
import "./useUserPermissions-IrViIWLA.js";
import "./pending-icon-C39HKFOC.js";
import "./approved-Icon-D4Mj_64A.js";
import "./current-icon-PhyH9fHB.js";
import "./complete-logo-BunEj7SL.js";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-Bgbbi7bt.js";
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
import "./avatar-DZ-dXD0g.js";
import "@radix-ui/react-avatar";
import "./input-G3xZAzeG.js";
import "./sheet-BXmbu-1p.js";
import "@radix-ui/react-dialog";
import "./skeleton-CElu2WzA.js";
import "./DocsCommentsSection-Dgcs8l8-.js";
import "./card-DL-Nbx-j.js";
import "./upload-file-icon-D1lM9Y8S.js";
import "./delete-stroke-icon-mn8-8d5M.js";
import "./view-icon-BDRfyII2.js";
import "./approve-logo-BxROxWMC.js";
import "./apiHelpers-QKbVsPE7.js";
import "./ApproveRejectDialog-Bd5cCnaD.js";
import "pdfjs-dist";
import "./dialog-6uxmGonW.js";
import "./edit-icon-DqCvL3Yg.js";
import "./reject-icon-B4PaiBZt.js";
import "./separator-D4bWh-hU.js";
import "@radix-ui/react-separator";
import "./userFileIcon-xoT1vQew.js";
import "./pdf.worker-CIugw0DL.js";
const AddedSubStagesComponent = ({
  stage,
  subStage
}) => {
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: " h-full px-1", children: [
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
  ] }) });
};
export {
  AddedSubStagesComponent as default
};
