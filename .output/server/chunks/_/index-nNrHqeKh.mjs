import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { u as useCaseCompletion } from './index-Bb_5490h.mjs';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { N as NoCasesData } from './no-cases-data-B3QWVZUO.mjs';
import { v as vettingDocumentsAPI, r as receivedDocumentsAPI } from './legalOpinion-qNiAW4Gj.mjs';
import { i as isSubStageCompleted, M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import { h as downloadSingleDocAPI, u as uploadToS3API, a as uploadDocumentAPI, f as fileUploadAPI } from './fileUpload-BBm5-XTb.mjs';
import { d as downloadFileFromS3 } from './apiHelpers-QKbVsPE7.mjs';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Loader2, Upload, Download, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import './CaseFilingIcon-Dywh8hPV.mjs';
import './legal-notice-icon-ivaufGCR.mjs';
import './router-e7zdrxGz.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'framer-motion';
import 'react-error-boundary';
import './notes-edit-icon-B2gT4vHe.mjs';
import '@radix-ui/react-accordion';
import './tooltip-BKF0DBvK.mjs';
import '@radix-ui/react-tooltip';
import './manage-CWSyPq63.mjs';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/utc.js';
import './pending-icon-C39HKFOC.mjs';
import './approved-Icon-D4Mj_64A.mjs';
import './current-icon-PhyH9fHB.mjs';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
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
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';

const useDocumentOperations = (serviceId, stage, subStage) => {
  const [downloadingDocId, setDownloadingDocId] = useState(null);
  const { mutate: mutateDownloadFile, isPending: isPendingDownloadFile } = useMutation({
    mutationFn: async (payload) => {
      var _a, _b, _c;
      const response = await downloadSingleDocAPI({ file_key: payload.key });
      if (((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.status) === 200 && ((_c = (_b = response == null ? void 0 : response.data) == null ? void 0 : _b.data) == null ? void 0 : _c.download_url)) {
        downloadFileFromS3(
          response.data.data.download_url,
          payload.file_name
        );
      } else {
        throw new Error("Invalid response or download URL");
      }
    },
    onError: () => toast.error("Failed to download attachment"),
    onSettled: () => setDownloadingDocId(null)
  });
  const handleDownload = (doc) => {
    if (doc.key) {
      setDownloadingDocId(doc.id);
      mutateDownloadFile({ key: doc.key, file_name: doc.file_name });
    } else {
      toast.error("Document key not available for download");
    }
  };
  return { downloadingDocId, isPendingDownloadFile, handleDownload };
};
const useFileHandling = (serviceId, stage, subStage) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingFiles, setDeletingFiles] = useState(/* @__PURE__ */ new Set());
  const isAnyOperationInProgress = loading || deletingFiles.size > 0;
  const { getAllDocsRefetch, serviceData } = UseContextAPI();
  const handleFileSelect = async (files) => {
    if (isAnyOperationInProgress) {
      toast.error("Please wait for the current operation to complete");
      return;
    }
    const file = files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
      return;
    }
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf"
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Unsupported file type. Please upload JPEG, PNG, WebP, or PDF files."
      );
      return;
    }
    try {
      const fileType = file.name.split(".").pop();
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size
      });
      const { target_url, file_key } = data == null ? void 0 : data.data;
      if (!target_url) throw new Error("Presigned URL is missing");
      setUploadedFiles((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: file.name,
          size: file.size,
          uploadDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"),
          type: file.type,
          key: file_key,
          presignedUrl: target_url,
          file
        }
      ]);
    } catch (error) {
      toast.error("Failed to prepare file for upload");
    }
  };
  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one file before submitting.");
      return;
    }
    if (deletingFiles.size > 0) {
      toast.error("Please wait for file removal operations to complete");
      return;
    }
    setLoading(true);
    try {
      for (const fileData of uploadedFiles) {
        await uploadToS3API(fileData.presignedUrl, fileData.file);
        await uploadDocumentAPI({
          case_id: Number(serviceId),
          file_name: fileData.name,
          file_type: fileData.name.split(".").pop(),
          file_size: fileData.size,
          key: fileData.key,
          case_stage: stage,
          case_sub_stage: subStage,
          category: (serviceData == null ? void 0 : serviceData.is_received_original_doc) ? "Final Report Document" : "Legal Report Document"
        });
      }
      if (getAllDocsRefetch) {
        await getAllDocsRefetch();
      }
      toast.success("Successfully submitted report document");
      setUploadedFiles([]);
    } catch (error) {
      toast.error("Failed to submit files");
    } finally {
      setLoading(false);
    }
  };
  const removeFile = async (fileId) => {
    if (loading) {
      toast.error("Cannot remove files while submitting");
      return;
    }
    if (deletingFiles.has(fileId)) {
      toast.error("File is already being removed");
      return;
    }
    setDeletingFiles((prev) => new Set(prev).add(fileId));
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
      toast.success("File removed successfully");
    } catch (error) {
      toast.error("Failed to remove file");
    } finally {
      setDeletingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };
  return {
    uploadedFiles,
    isDragOver,
    loading,
    deletingFiles,
    isAnyOperationInProgress,
    handleFileSelect,
    handleSubmit,
    removeFile,
    setIsDragOver
  };
};
const ReportSubmissionsIcOn = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "28",
      height: "34",
      viewBox: "0 0 28 34",
      fill: "none",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M27.2889 9.915L18.6002 1.22634C18.4849 1.11111 18.3479 1.01974 18.1972 0.957446C18.0466 0.895151 17.8851 0.863153 17.722 0.863282H2.8272C2.16881 0.863282 1.53738 1.12483 1.07183 1.59038C0.606272 2.05594 0.344727 2.68736 0.344727 3.34575V30.653C0.344727 31.3114 0.606272 31.9428 1.07183 32.4083C1.53738 32.8739 2.16881 33.1354 2.8272 33.1354H25.1695C25.8279 33.1354 26.4593 32.8739 26.9248 32.4083C27.3904 31.9428 27.6519 31.3114 27.6519 30.653V10.7932C27.6521 10.6301 27.6201 10.4686 27.5578 10.318C27.4955 10.1673 27.4041 10.0304 27.2889 9.915ZM18.9633 24.4468H9.03338C8.70419 24.4468 8.38847 24.316 8.1557 24.0832C7.92292 23.8505 7.79215 23.5347 7.79215 23.2055C7.79215 22.8763 7.92292 22.5606 8.1557 22.3279C8.38847 22.0951 8.70419 21.9643 9.03338 21.9643H18.9633C19.2925 21.9643 19.6082 22.0951 19.841 22.3279C20.0737 22.5606 20.2045 22.8763 20.2045 23.2055C20.2045 23.5347 20.0737 23.8505 19.841 24.0832C19.6082 24.316 19.2925 24.4468 18.9633 24.4468ZM18.9633 19.4818H9.03338C8.70419 19.4818 8.38847 19.3511 8.1557 19.1183C7.92292 18.8855 7.79215 18.5698 7.79215 18.2406C7.79215 17.9114 7.92292 17.5957 8.1557 17.3629C8.38847 17.1301 8.70419 16.9994 9.03338 16.9994H18.9633C19.2925 16.9994 19.6082 17.1301 19.841 17.3629C20.0737 17.5957 20.2045 17.9114 20.2045 18.2406C20.2045 18.5698 20.0737 18.8855 19.841 19.1183C19.6082 19.3511 19.2925 19.4818 18.9633 19.4818ZM17.722 10.7932V3.96637L24.5488 10.7932H17.722Z",
          fill: "#828282"
        }
      )
    }
  );
};
const DocumentList = ({
  documents,
  category,
  downloadingDocId,
  handleDownload
}) => /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium text-gray-900 mb-3", children: category }),
  /* @__PURE__ */ jsx("div", { className: "space-y-2", children: documents.map((doc) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx(ReportSubmissionsIcOn, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: doc.file_name }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: dayjs(doc.created_at).format("DD MMM YYYY") }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                (doc.file_size / (1024 * 1024)).toFixed(2),
                " MB"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDownload(doc),
            disabled: downloadingDocId === doc.id,
            className: "p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer border border-gray-300 hover:border-gray-400 transition-colors ml-2 disabled:opacity-50",
            title: downloadingDocId === doc.id ? "Downloading..." : "Download file",
            children: downloadingDocId === doc.id ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 text-gray-600 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" })
          }
        )
      ]
    },
    doc.id
  )) })
] });
const FileList = ({
  files,
  isDeleting,
  removeFile,
  loading
}) => /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
  /* @__PURE__ */ jsxs("h2", { className: "text-sm font-medium text-gray-900 mb-3", children: [
    "Selected Files (",
    files.length,
    ")"
  ] }),
  /* @__PURE__ */ jsx("div", { className: "space-y-2", children: files.map((file) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200 transition-opacity ${isDeleting(file.id) ? "opacity-50" : ""}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx(ReportSubmissionsIcOn, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: file.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
              file.uploadDate,
              " - ",
              (file.size / (1024 * 1024)).toFixed(2),
              " MB"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => removeFile(file.id),
            className: `p-1.5 rounded-md transition-colors ml-2 ${loading || isDeleting(file.id) ? "text-gray-400" : "text-red-500 hover:text-red-700 hover:bg-red-50"}`,
            title: loading ? "Cannot remove during submission" : isDeleting(file.id) ? "Removing..." : "Remove file",
            disabled: loading || isDeleting(file.id),
            children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
          }
        )
      ]
    },
    file.id
  )) })
] });
const FileUploadUI = ({
  isDragOver,
  isAnyOperationInProgress,
  handleFileInput,
  handleDrop,
  handleDragOver,
  handleDragLeave
}) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: `border-2 border-dashed rounded-lg p-6 mt-4 text-center transition-colors ${isDragOver && !isAnyOperationInProgress ? "border-blue-400 bg-blue-50" : isAnyOperationInProgress ? "border-gray-200 bg-gray-50 opacity-50" : "border-gray-300 hover:border-gray-400"}`,
    onDrop: handleDrop,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    children: [
      /* @__PURE__ */ jsx(
        Upload,
        {
          className: `mx-auto h-8 w-8 mb-3 ${isAnyOperationInProgress ? "text-gray-300" : "text-gray-400"}`
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: `text-sm mb-1 ${isAnyOperationInProgress ? "text-gray-400" : "text-gray-600"}`,
          children: isAnyOperationInProgress ? "Please wait for current operation to complete" : "Click to upload or drag and drop"
        }
      ),
      !isAnyOperationInProgress && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-4", children: "JPEG, PNG, JPG, WEBP and PDF (Max 50MB)" }),
      /* @__PURE__ */ jsxs("label", { className: "inline-block", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: ".pdf,.jpg,.jpeg,.png,.webp",
            onChange: handleFileInput,
            className: "hidden",
            disabled: isAnyOperationInProgress
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `bg-white border border-gray-300 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${isAnyOperationInProgress ? "opacity-50 text-gray-400" : "text-gray-700 hover:bg-gray-50 cursor-pointer"}`,
            children: isAnyOperationInProgress ? "Please Wait..." : "Choose File"
          }
        )
      ] })
    ]
  }
);
const ReportSubmissions = ({ stage, subStage }) => {
  var _a, _b, _c, _d, _e, _f;
  const { service_id } = useParams({ strict: false });
  useNavigate();
  const [localVettingState, setLocalVettingState] = useState(false);
  const [localReceivedState, setLocalReceivedState] = useState(false);
  const { isAdvocate } = useUserDetails();
  const { completeSubStage } = useCaseCompletion();
  const {
    allDocsIsFetching,
    allDocsData,
    setServiceData,
    serviceData,
    getCaseStagesRefetch,
    caseStagesData
  } = UseContextAPI();
  const advocateName = `${((_c = (_b = (_a = serviceData == null ? void 0 : serviceData.advocate_cases) == null ? void 0 : _a[0]) == null ? void 0 : _b.advocate) == null ? void 0 : _c.first_name) || ""} ${((_f = (_e = (_d = serviceData == null ? void 0 : serviceData.advocate_cases) == null ? void 0 : _d[0]) == null ? void 0 : _e.advocate) == null ? void 0 : _f.last_name) || ""}`.trim();
  const { isUser } = useUserDetails();
  const {
    uploadedFiles,
    isDragOver,
    loading,
    deletingFiles,
    isAnyOperationInProgress,
    handleFileSelect,
    handleSubmit,
    removeFile,
    setIsDragOver
  } = useFileHandling(service_id, stage, subStage);
  const { downloadingDocId, handleDownload } = useDocumentOperations();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData == null ? void 0 : caseStagesData.sub_stages,
    subStage
  );
  const hasExistingDocs = (allDocsData == null ? void 0 : allDocsData.length) > 0;
  const showUploadUI = !hasExistingDocs && uploadedFiles.length === 0 && !isUser();
  const hasFinalDocs = (allDocsData == null ? void 0 : allDocsData.length) > 1;
  const showFinalUploadUI = (serviceData == null ? void 0 : serviceData.is_received_original_doc) && uploadedFiles.length === 0 && !hasFinalDocs;
  const { mutate: mutateVettingDocument, isPending: isPendingVetting } = useMutation({
    mutationFn: async (vettingStatus) => {
      const response = await vettingDocumentsAPI(service_id, {
        vetting_of_doc: vettingStatus,
        stage,
        sub_stage: subStage
      });
      if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201)
        return response.data;
      throw new Error("Failed to update vetting status");
    },
    onSuccess: async (data, vettingStatus) => {
      toast.success(data.message);
      setServiceData((prev) => ({
        ...prev,
        vetting_of_doc: vettingStatus
      }));
      await getCaseStagesRefetch();
      completeSubStage(subStage);
    },
    onError: (error, vettingStatus) => {
      setLocalVettingState(!vettingStatus);
      toast.error(error.message);
    }
  });
  const { mutate: mutateReceivedDocument, isPending: isPendingReceived } = useMutation({
    mutationFn: async (receivedStatus) => {
      const response = await receivedDocumentsAPI(service_id, {
        is_received_original_doc: receivedStatus,
        stage,
        sub_stage: subStage
      });
      if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201)
        return response.data;
      throw new Error("Failed to update received status");
    },
    onSuccess: (data, receivedStatus) => {
      toast.success(data.message);
      setServiceData((prev) => ({
        ...prev,
        is_received_original_doc: receivedStatus
      }));
    },
    onError: (error, receivedStatus) => {
      setLocalReceivedState(!receivedStatus);
      toast.error(error.message);
    }
  });
  const handleFileInput = (e) => {
    if (e.target.files) handleFileSelect(e.target.files);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!isAnyOperationInProgress && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isAnyOperationInProgress) setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  useEffect(() => {
    setLocalVettingState((serviceData == null ? void 0 : serviceData.vetting_of_doc) || false);
    setLocalReceivedState((serviceData == null ? void 0 : serviceData.is_received_original_doc) || false);
  }, [serviceData == null ? void 0 : serviceData.vetting_of_doc, serviceData == null ? void 0 : serviceData.is_received_original_doc]);
  if (allDocsIsFetching) {
    return /* @__PURE__ */ jsx("div", { className: "h-full relative bg-white", children: /* @__PURE__ */ jsx(
      LoadingComponent,
      {
        loading: allDocsIsFetching,
        message: "Loading documents..."
      }
    ) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "h-full relative bg-white", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: !isUser() && ((allDocsData == null ? void 0 : allDocsData.length) === 2 || (allDocsData == null ? void 0 : allDocsData.length) === 1 && isCurrentStageCompleted && !localVettingState),
        showUploadButton: false,
        showNoteButton: false
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "px-4 py-2", children: [
      showUploadUI && /* @__PURE__ */ jsx(
        FileUploadUI,
        {
          isDragOver,
          isAnyOperationInProgress,
          handleFileInput,
          handleDrop,
          handleDragOver,
          handleDragLeave
        }
      ),
      !hasExistingDocs && isUser() && /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center h-[calc(100vh-300px)]", children: [
        /* @__PURE__ */ jsx(NoCasesData, { className: "cursor-pointer w-80 h-50" }),
        /* @__PURE__ */ jsx("div", { className: "text-base 3xl:text-xl text-center font-light text-[#444] mx-auto", children: "No report submissions found for this case." })
      ] }),
      hasExistingDocs && /* @__PURE__ */ jsx(
        DocumentList,
        {
          documents: allDocsData.filter(
            (doc) => doc.category === "Legal Report Document"
          ),
          category: "Legal Report Document",
          downloadingDocId,
          handleDownload
        }
      ),
      hasExistingDocs && !(isCurrentStageCompleted && !(serviceData == null ? void 0 : serviceData.vetting_of_doc)) && /* @__PURE__ */ jsx("div", { className: "bg-blue-50 p-2 rounded mt-2", children: (serviceData == null ? void 0 : serviceData.vetting_of_doc) ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "form-checkbox text-blue-600",
            checked: localVettingState,
            disabled: true
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-gray-700 ${isPendingVetting ? "opacity-70" : ""}`,
            children: "Requesting for vetting documents"
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-gray-700 ${isPendingVetting ? "opacity-70" : ""}`,
            children: "Requesting for vetting documents"
          }
        ),
        isPendingVetting ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 text-blue-600 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => mutateVettingDocument(true),
              disabled: isPendingVetting,
              className: `px-3 py-1 rounded text-sm cursor-pointer ${localVettingState ? "bg-blue-600 text-white" : "bg-green-400 text-gray-700"}`,
              children: "Yes"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => mutateVettingDocument(false),
              disabled: isPendingVetting,
              className: `px-3 py-1 rounded text-sm cursor-pointer ${!localVettingState ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`,
              children: "No"
            }
          )
        ] })
      ] }) }),
      (serviceData == null ? void 0 : serviceData.vetting_of_doc) && /* @__PURE__ */ jsx("div", { className: "bg-blue-50 p-2 rounded mt-2", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
        isPendingReceived ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 text-black animate-spin" }) : /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: " text-black bg-white border-gray-300 rounded focus:ring-black focus:ring-2 accent-black",
            checked: localReceivedState,
            onChange: (e) => mutateReceivedDocument(e.target.checked),
            disabled: isPendingReceived || !isAdvocate() || (allDocsData == null ? void 0 : allDocsData.length) === 2
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `text-gray-700 ${isPendingReceived ? "opacity-70" : ""}`,
              children: !isAdvocate() && (serviceData == null ? void 0 : serviceData.is_received_original_doc) ? `Received original documents by ${advocateName}` : "Received original documents"
            }
          ),
          !isAdvocate() && !(serviceData == null ? void 0 : serviceData.is_received_original_doc) && /* @__PURE__ */ jsx("div", { className: "text-[11px] 2xl:text-xs  text-gray-500", children: "Only advocates can perform this action" })
        ] })
      ] }) }),
      showFinalUploadUI && isAdvocate() && /* @__PURE__ */ jsx(
        FileUploadUI,
        {
          isDragOver,
          isAnyOperationInProgress,
          handleFileInput,
          handleDrop,
          handleDragOver,
          handleDragLeave
        }
      ),
      (serviceData == null ? void 0 : serviceData.is_received_original_doc) && !showFinalUploadUI && /* @__PURE__ */ jsx(
        DocumentList,
        {
          documents: allDocsData.filter(
            (doc) => doc.category === "Final Report Document"
          ),
          category: "Final Report Document",
          downloadingDocId,
          handleDownload
        }
      ),
      uploadedFiles.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          FileList,
          {
            files: uploadedFiles,
            isDeleting: (id) => deletingFiles.has(id),
            removeFile,
            loading
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSubmit,
            disabled: isAnyOperationInProgress,
            className: `px-3 py-1 text-sm rounded-md font-normal transition-colors cursor-pointer ${isAnyOperationInProgress ? "bg-gray-300 text-gray-500" : "bg-black text-white hover:bg-gray-800"}`,
            title: loading ? "Submitting files..." : deletingFiles.size > 0 ? "Please wait for file removal to complete" : "Submit files",
            children: loading ? "Submitting..." : deletingFiles.size > 0 ? "Please Wait..." : "Submit"
          }
        ) })
      ] })
    ] })
  ] });
};

export { ReportSubmissions as default };
//# sourceMappingURL=index-nNrHqeKh.mjs.map
