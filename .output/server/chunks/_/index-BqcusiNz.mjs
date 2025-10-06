import { jsx, jsxs } from 'react/jsx-runtime';
import { a as labelSubStages } from './statusConstants-t7T05Rlh.mjs';
import { c as getSubStageStatuses } from './manage-CWSyPq63.mjs';
import { G as GetCaseNotes } from './GetCaseNotes-DSbNb1Jm.mjs';
import { P as PendingStepOverlay } from './PendingStepOverlay-BxgRCvn6.mjs';
import { M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import { U as UserGetCaseFiles } from './userGetCaseFiles-D4VE_Qg7.mjs';
import 'dayjs';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/utc.js';
import './Provider-DRuE0d-A.mjs';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
import '@tanstack/react-query';
import '@tanstack/react-router';
import 'react';
import './notes-delete-icon-CyozBLV8.mjs';
import './notes-edit-icon-B2gT4vHe.mjs';
import './router-e7zdrxGz.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'sonner';
import 'framer-motion';
import 'react-error-boundary';
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';
import 'lucide-react';
import './index-Bb_5490h.mjs';
import './Loading-DQypZbMn.mjs';
import './CaseFilingIcon-Dywh8hPV.mjs';
import './legal-notice-icon-ivaufGCR.mjs';
import '@radix-ui/react-accordion';
import './tooltip-BKF0DBvK.mjs';
import '@radix-ui/react-tooltip';
import './useUserPermissions-IrViIWLA.mjs';
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
import './notes-head-icon-BuoOTi3l.mjs';
import './summary-icon-card-CWzIqgof.mjs';
import './avatar-xL-W5RbG.mjs';
import '@radix-ui/react-avatar';
import './input-CcfBn-WR.mjs';
import './sheet-vrO17VYZ.mjs';
import '@radix-ui/react-dialog';
import './skeleton-BAyQx-Zm.mjs';
import './DocsCommentsSection-1v4F6eR1.mjs';
import './card-CfZVGcIr.mjs';
import './upload-file-icon-D1lM9Y8S.mjs';
import './delete-stroke-icon-mn8-8d5M.mjs';
import './view-icon-BDRfyII2.mjs';
import './approve-logo-BtPutrSX.mjs';
import './apiHelpers-QKbVsPE7.mjs';
import './ApproveRejectDialog-CbjX-vD1.mjs';
import 'pdfjs-dist';
import './dialog-CbaK730S.mjs';
import './edit-icon-DqCvL3Yg.mjs';
import './reject-icon-B4PaiBZt.mjs';
import './separator-BzkEE94Y.mjs';
import '@radix-ui/react-separator';
import './userFileIcon-XAkFxF_N.mjs';
import './pdf.worker-CIugw0DL.mjs';

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

export { UploadDocuments as default };
//# sourceMappingURL=index-BqcusiNz.mjs.map
