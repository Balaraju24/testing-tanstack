import { jsx, jsxs } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { u as useDocsApproval } from './useDocsApproval-CzCEMiQ5.mjs';
import { G as GetCaseFiles } from './GetCaseFiles-DxxxDQtF.mjs';
import { G as GetCaseNotes } from './GetCaseNotes-DSbNb1Jm.mjs';
import { M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
import '@tanstack/react-query';
import '@tanstack/react-router';
import 'react';
import './router-e7zdrxGz.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'sonner';
import 'framer-motion';
import 'react-error-boundary';
import './index-Bb_5490h.mjs';
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
import './useUserPermissions-IrViIWLA.mjs';
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';
import 'lucide-react';
import './pending-icon-C39HKFOC.mjs';
import './approved-Icon-D4Mj_64A.mjs';
import './current-icon-PhyH9fHB.mjs';
import './complete-logo-DwVwh2_J.mjs';
import './notes-close-icon-FqM48RJz.mjs';
import '@radix-ui/react-alert-dialog';
import './textarea-BfKn0GZN.mjs';
import './ApproveRejectDialog-CbjX-vD1.mjs';
import 'react-dropzone';
import 'pdfjs-dist';
import './fileUpload-BBm5-XTb.mjs';
import './dialog-CbaK730S.mjs';
import '@radix-ui/react-dialog';
import './approve-logo-BtPutrSX.mjs';
import './apiHelpers-QKbVsPE7.mjs';
import './getCaseFilesConstants-BRQFWmkt.mjs';
import './upload-file-icon-D1lM9Y8S.mjs';
import './delete-stroke-icon-mn8-8d5M.mjs';
import './view-icon-BDRfyII2.mjs';
import './card-CfZVGcIr.mjs';
import './separator-BzkEE94Y.mjs';
import '@radix-ui/react-separator';
import './edit-icon-DqCvL3Yg.mjs';
import './reject-icon-B4PaiBZt.mjs';
import './FileIcon-DM2CMkXH.mjs';
import './DocsCommentsSection-1v4F6eR1.mjs';
import './avatar-xL-W5RbG.mjs';
import '@radix-ui/react-avatar';
import './default-user-EV710LEP.mjs';
import './pdf.worker-CIugw0DL.mjs';
import './statusConstants-t7T05Rlh.mjs';
import './notes-delete-icon-CyozBLV8.mjs';
import 'vaul';
import './notification-kzFgGftV.mjs';
import './service-1g9dZr4o.mjs';
import 'axios';
import '@radix-ui/react-progress';
import './notes-head-icon-BuoOTi3l.mjs';
import './summary-icon-card-CWzIqgof.mjs';
import './input-CcfBn-WR.mjs';
import './sheet-vrO17VYZ.mjs';
import './skeleton-BAyQx-Zm.mjs';

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

export { MandatoryUploadComponent as default };
//# sourceMappingURL=index-FNXL3fUd.mjs.map
