import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import dayjs from 'dayjs';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { i as isSubStageCompleted, M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
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

const UserRaiseQueries = ({ stage, subStage }) => {
  var _a, _b;
  const { allDocsData, caseStagesData, allDocsIsFetching } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData == null ? void 0 : caseStagesData.sub_stages,
    subStage
  );
  const isQueriesStageCompleted = ((_b = (_a = caseStagesData == null ? void 0 : caseStagesData.stages) == null ? void 0 : _a.find((sub) => sub.code === "QURI")) == null ? void 0 : _b.status) === "completed";
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-full", children: allDocsIsFetching ? /* @__PURE__ */ jsx("div", { className: "relative h-[calc(100%-43px)] flex items-center justify-center", children: /* @__PURE__ */ jsx(
    LoadingComponent,
    {
      loading: allDocsIsFetching,
      message: "Docs loading..."
    }
  ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: false,
        showNoteButton: false,
        showUploadButton: false
      }
    ),
    isQueriesStageCompleted && (allDocsData == null ? void 0 : allDocsData.length) === 0 && /* @__PURE__ */ jsx("div", { className: "h-[calc(100%-100px)]  flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "text-center text-base text-gray-500 flex items-center justify-center", children: "The advocate has reviewed your case and did not raise any queries." }) }),
    !isQueriesStageCompleted && (allDocsData == null ? void 0 : allDocsData.length) === 0 && /* @__PURE__ */ jsx("div", { className: "h-[calc(100%-100px)]  flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "text-center text-base text-gray-500 flex items-center justify-center", children: "No queries have been raised at this moment" }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `p-2 space-y-2 ${!isCurrentStageCompleted ? "overflow-y-auto h-[calc(100vh-100px)] " : " overflow-y-auto h-[calc(100vh-250px)]"}`,
        children: Array.isArray(allDocsData) && (allDocsData == null ? void 0 : allDocsData.map((item) => {
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `flex flex-cols w-full border p-2 gap-4 ${"border-gray-200"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm flex-1 self-center", children: item == null ? void 0 : item.category }),
                /* @__PURE__ */ jsx("div", { className: "text-xs bg-gray-200 font-normal p-1 flex  self-center", children: dayjs(item == null ? void 0 : item.created_at).format("DD MMM YYYY") })
              ]
            },
            item == null ? void 0 : item.id
          );
        }))
      }
    )
  ] }) });
};

export { UserRaiseQueries as default };
//# sourceMappingURL=index-BIEEUdF7.mjs.map
