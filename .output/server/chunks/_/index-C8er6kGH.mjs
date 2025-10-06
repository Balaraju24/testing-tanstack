import { jsx, jsxs } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { C as Checkbox } from './checkbox-DwAU5kG6.mjs';
import { l as sendingNoticeAPI } from './service-1g9dZr4o.mjs';
import { i as isSubStageCompleted, M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import { u as useDocsApproval } from './useDocsApproval-CzCEMiQ5.mjs';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { G as GetCaseFiles } from './GetCaseFiles-DxxxDQtF.mjs';
import { G as GetCaseNotes } from './GetCaseNotes-DSbNb1Jm.mjs';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
import './router-e7zdrxGz.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'framer-motion';
import 'react-error-boundary';
import '@radix-ui/react-checkbox';
import 'lucide-react';
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
import './pending-icon-C39HKFOC.mjs';
import './approved-Icon-D4Mj_64A.mjs';
import './current-icon-PhyH9fHB.mjs';
import './complete-logo-DwVwh2_J.mjs';
import './notes-close-icon-FqM48RJz.mjs';
import '@radix-ui/react-alert-dialog';
import './textarea-BfKn0GZN.mjs';
import 'vaul';
import './notification-kzFgGftV.mjs';
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
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';
import './ApproveRejectDialog-CbjX-vD1.mjs';
import 'pdfjs-dist';
import './dialog-CbaK730S.mjs';
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
import './pdf.worker-CIugw0DL.mjs';
import './statusConstants-t7T05Rlh.mjs';

function SendingNotice({
  stage,
  subStage
}) {
  const { service_id } = useParams({ strict: false });
  const [markedStatus, setMarkedStatus] = useState("");
  const { isUser } = useUserDetails();
  const {
    isLoadingCaseNote,
    allDocsIsLoading,
    caseStagesData,
    allDocsData,
    serviceData,
    setServiceData
  } = UseContextAPI();
  const docsApprove = useDocsApproval();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData == null ? void 0 : caseStagesData.sub_stages,
    subStage
  );
  const { mutate: mutateSendingNotice, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await sendingNoticeAPI(service_id, data);
      return response;
    },
    onSuccess: (data, variables) => {
      setServiceData((prev) => ({
        ...prev,
        confirmation_boxes: {
          ...prev == null ? void 0 : prev.confirmation_boxes,
          legal_notice: {
            sent_by_post: variables.status === "sent_by_post" ? variables.is_marked : false,
            sent_by_mail: variables.status === "sent_by_mail" ? variables.is_marked : false,
            sent_by_Both: variables.status === "sent_by_Both" ? variables.is_marked : false
          }
        }
      }));
    },
    onError: (error) => {
      toast.error(error == null ? void 0 : error.message);
    }
  });
  const handleMarkChange = (status) => {
    const isSame = markedStatus === status;
    const newMarkedStatus = isSame ? "" : status;
    setMarkedStatus(newMarkedStatus);
    mutateSendingNotice({
      status,
      is_marked: !isSame,
      case_stage: stage,
      case_sub_stage: subStage
    });
  };
  useEffect(() => {
    var _a, _b;
    const legalNotice = (_a = serviceData == null ? void 0 : serviceData.confirmation_boxes) == null ? void 0 : _a.legal_notice;
    if (legalNotice) {
      const activeStatus = (_b = Object.entries(legalNotice).find(
        ([, value]) => value === true
      )) == null ? void 0 : _b[0];
      setMarkedStatus(activeStatus || "");
    }
  }, [serviceData]);
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: isUser() ? false : !!docsApprove,
        showUploadButton: false
      }
    ),
    /* @__PURE__ */ jsx("div", { className: " p-2  w-full h-[calc(100%-60px)] relative overflow-auto ", children: allDocsIsLoading && isLoadingCaseNote ? /* @__PURE__ */ jsx(
      LoadingComponent,
      {
        loading: allDocsIsLoading && isLoadingCaseNote
      }
    ) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(GetCaseFiles, { NoticeDraftKey: "Notice Draft" }),
      !(isCurrentStageCompleted && (allDocsData == null ? void 0 : allDocsData.length) === 0) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 mt-2 mb-2", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "font-medium text-base", children: [
          "Notice Sent",
          " "
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                id: "post",
                className: "w-4 h-4 mr-2 border-black cursor-pointer",
                disabled: isCurrentStageCompleted || isUser() || isPending,
                checked: markedStatus === "sent_by_post",
                onChange: () => {
                },
                onClick: () => handleMarkChange("sent_by_post")
              }
            ),
            "Sent By Post"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                id: "mail",
                className: "w-4 h-4 mr-2 border-black cursor-pointer",
                disabled: isCurrentStageCompleted || isUser() || isPending,
                checked: markedStatus === "sent_by_mail",
                onChange: () => {
                },
                onClick: () => handleMarkChange("sent_by_mail")
              }
            ),
            "Sent By Mail"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                id: "both",
                className: "w-4 h-4 mr-2 border-black cursor-pointer",
                disabled: isCurrentStageCompleted || isUser() || isPending,
                checked: markedStatus === "sent_by_Both",
                onChange: () => {
                },
                onClick: () => handleMarkChange("sent_by_Both")
              }
            ),
            "Sent By Both"
          ] })
        ] })
      ] }),
      markedStatus && /* @__PURE__ */ jsx(GetCaseFiles, { NoticeSentKey: "Notice Sent" }),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] }) })
  ] }) }) });
}

export { SendingNotice as default };
//# sourceMappingURL=index-C8er6kGH.mjs.map
