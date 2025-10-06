import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { h as downloadSingleDocAPI, e as documentApprovalAPI } from './fileUpload-BBm5-XTb.mjs';
import { d as downloadFileFromS3 } from './apiHelpers-QKbVsPE7.mjs';
import { i as isSubStageCompleted, M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Eye, Loader2, Download } from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { T as TableHeader, S as SkeletonRow } from './TableHeader-CuMiBeKR.mjs';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
import '@tanstack/react-router';
import './router-e7zdrxGz.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
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

function FileCheckVerification({
  stage,
  subStage,
  isLoading = false
}) {
  var _a;
  const { allDocsIsLoading, allDocsData, caseStagesData, getAllDocsRefetch } = UseContextAPI();
  const [acceptedDocs, setAcceptedDocs] = useState(/* @__PURE__ */ new Set());
  const [downloadingDocId, setDownloadingDocId] = useState(null);
  const [acceptDocId, setAcceptDocId] = useState(null);
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData == null ? void 0 : caseStagesData.sub_stages,
    subStage
  );
  const { mutate: mutateDownloadFile, isPending: isPendingDownloadFile } = useMutation({
    mutationFn: async (payload) => {
      var _a2, _b, _c;
      const body = { file_key: payload.key };
      const response = await downloadSingleDocAPI(body);
      const status = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.status;
      const downloadUrl = (_c = (_b = response == null ? void 0 : response.data) == null ? void 0 : _b.data) == null ? void 0 : _c.download_url;
      if ((status === 200 || status === 201) && downloadUrl) {
        downloadFileFromS3(downloadUrl, payload.file_name);
        setDownloadingDocId(null);
      } else {
        throw new Error("Invalid response or download URL");
      }
    },
    onError: () => {
      toast.error("Failed to download attachment.");
    }
  });
  const { mutate: mutateAcceptDocument, isPending: isPendingAccept } = useMutation({
    mutationFn: async (docId) => {
      const payload = {
        verification_status: "APPROVED",
        case_stage: stage,
        case_sub_stage: subStage
      };
      const response = await documentApprovalAPI({
        payload,
        doc_id: docId
      });
      if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201) {
        return response.data;
      } else {
        throw new Error("Failed to accept document");
      }
    },
    onSuccess: (data, docId) => {
      toast.success("Document accepted successfully");
      setAcceptedDocs((prev) => new Set(prev).add(docId));
      getAllDocsRefetch();
    },
    onError: () => {
      toast.error("Failed to accept document");
    }
  });
  const handleViewDocument = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.error("No download URL available");
    }
  };
  const handleDownloadDocument = (doc) => {
    if (doc.key) {
      setDownloadingDocId(doc.id);
      mutateDownloadFile({
        key: doc.key,
        file_name: doc.file_name
      });
    } else {
      toast.error("Document key not available for download");
    }
  };
  const allDocumentsApproved = useMemo(() => {
    if (!Array.isArray(allDocsData) || allDocsData.length === 0) {
      return false;
    }
    return allDocsData.every(
      (doc) => doc.verification_status === "APPROVED"
    );
  }, [allDocsData]);
  const handleAcceptDocument = (docId) => {
    setAcceptDocId(docId);
    mutateAcceptDocument(docId);
  };
  const renderTableContent = () => {
    if (isLoading) {
      return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-96", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx(TableHeader, {}),
        /* @__PURE__ */ jsx("tbody", { children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsx(SkeletonRow, { index }, `skeleton-${index}`)) })
      ] }) });
    }
    if (!Array.isArray(allDocsData) || (allDocsData == null ? void 0 : allDocsData.length) === 0) {
      return /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-normal leading-6 text-gray-900", children: "No Documents Uploaded" }) });
    }
    return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-96", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx(TableHeader, {}),
      /* @__PURE__ */ jsx("tbody", { children: Array.isArray(allDocsData) && (allDocsData == null ? void 0 : allDocsData.map((doc, index) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: `hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`,
          children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs text-gray-900", children: dayjs(doc.created_at).format("DD MMM YYYY") }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "truncate w-32",
                title: (doc == null ? void 0 : doc.file_name) || "--",
                children: (doc == null ? void 0 : doc.file_name) || "--"
              }
            ) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "truncate w-32 cursor-pointer",
                title: doc.document_type,
                children: doc.document_type
              }
            ) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleViewDocument(doc.download_url),
                  className: "p-1 hover:bg-gray-300 cursor-pointer rounded transition-colors",
                  title: "View Document",
                  children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-gray-600" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDownloadDocument(doc),
                  disabled: isPendingDownloadFile,
                  className: "p-1 hover:bg-gray-300 cursor-pointer rounded transition-colors disabled:opacity-50",
                  title: "Download Document",
                  children: downloadingDocId === doc.id ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 text-gray-600 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 text-gray-600" })
                }
              ),
              acceptedDocs.has(doc.id) || (doc == null ? void 0 : doc.verification_status) === "APPROVED" ? /* @__PURE__ */ jsx(
                "button",
                {
                  className: "px-2 py-1 bg-green-600 text-white text-xs rounded flex items-center gap-1 cursor-default",
                  title: "Document Accepted",
                  children: "Accepted"
                }
              ) : !isCurrentStageCompleted && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleAcceptDocument(doc.id),
                  disabled: isPendingAccept,
                  className: "px-2 py-1 bg-white w-18 cursor-pointer hover:bg-gray-300  border border-gray-200 text-gray-700 text-xs rounded transition-colors flex items-center justify-center gap-1 disabled:opacity-50",
                  title: "Accept Document",
                  children: acceptDocId === doc.id ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : "Accept"
                }
              )
            ] }) })
          ]
        },
        doc.id
      ))) })
    ] }) });
  };
  return /* @__PURE__ */ jsx("div", { className: "h-full relative", children: allDocsIsLoading ? /* @__PURE__ */ jsx(
    LoadingComponent,
    {
      loading: allDocsIsLoading,
      message: "Loading documents..."
    }
  ) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: !!allDocumentsApproved,
        showUploadButton: false,
        showNoteButton: false
      }
    ),
    !Array.isArray(allDocsData) || (allDocsData == null ? void 0 : allDocsData.length) === 0 ? /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-normal leading-6 text-gray-900", children: "No Documents Uploaded" }) }) : /* @__PURE__ */ jsxs("div", { className: "w-full overflow-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "p-2 h-max-[calc(100%-60px)] w-full overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden", children: renderTableContent() }) }),
      !isLoading && Array.isArray(allDocsData) && ((_a = allDocsData == null ? void 0 : allDocsData[0]) == null ? void 0 : _a.remarks) && /* @__PURE__ */ jsxs("div", { className: "col-span-12 space-y-2 mt-4 flex flex-col p-4 pt-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full text-sm font-normal text-gray-900 mb-1", children: "Remarks" }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-2 text-gray-700 text-xs 2xl:textsm", children: allDocsData[0].remarks })
      ] })
    ] })
  ] }) });
}

export { FileCheckVerification as default };
//# sourceMappingURL=index-C0hg8BAC.mjs.map
