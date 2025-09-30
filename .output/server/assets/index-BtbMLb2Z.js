import { jsx, jsxs } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { A as ApproveDialog } from "./complete-logo-BunEj7SL.js";
import { A as ApproveRejectDialog, F as FileUpload } from "./ApproveRejectDialog-Bd5cCnaD.js";
import { L as LoadingComponent } from "./Loading-CtQhAIXf.js";
import { F as FileDownload, A as ApproveLogo } from "./approve-logo-BxROxWMC.js";
import { P as PlusIcon } from "./plus-icon-DkC55LLp.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./index-oJQ5f2gj.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { e as documentApprovalAPI, b as deleteSingleDocAPI } from "./fileUpload-BBm5-XTb.js";
import { i as isSubStageCompleted, M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useMutation } from "@tanstack/react-query";
import { X, FileTextIcon, ChevronDown } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { G as GetCaseNotes } from "./GetCaseNotes-CcN4R54R.js";
import { A as ApprovedIcon } from "./approved-Icon-D4Mj_64A.js";
import { D as DeleteStrokeIcon } from "./delete-stroke-icon-mn8-8d5M.js";
import { D as DocsCommentsSection, F as FilePdfIcon, d as FilesAudioIcon, c as Docsicon, b as FileSpreadsheatIcon, a as FileFilesIcon } from "./DocsCommentsSection-Dgcs8l8-.js";
import { R as RejectIcon } from "./reject-icon-B4PaiBZt.js";
import { V as ViewIcon } from "./view-icon-BDRfyII2.js";
import { D as Dialog, d as DialogTrigger, a as DialogContent, c as DialogTitle, e as DialogClose } from "./dialog-6uxmGonW.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-D8srg3RR.js";
import { u as userStore } from "./userDetails-Dbr9T6uw.js";
import { s as sliceFilename } from "./manage-CWSyPq63.js";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useStore } from "@tanstack/react-store";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-router";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-Bgbbi7bt.js";
import "react-dropzone";
import "pdfjs-dist";
import "./apiHelpers-QKbVsPE7.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "framer-motion";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./pending-icon-C39HKFOC.js";
import "./current-icon-PhyH9fHB.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "react-error-boundary";
import "vaul";
import "./notification-kzFgGftV.js";
import "./service-1g9dZr4o.js";
import "axios";
import "@radix-ui/react-progress";
import "./default-user-EV710LEP.js";
import "./notes-delete-icon-CyozBLV8.js";
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./avatar-DZ-dXD0g.js";
import "@radix-ui/react-avatar";
import "./input-G3xZAzeG.js";
import "./sheet-BXmbu-1p.js";
import "@radix-ui/react-dialog";
import "./skeleton-CElu2WzA.js";
import "dayjs";
import "./card-DL-Nbx-j.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
const FILE_TYPE_ICONS = {
  IMAGE_TYPES: [
    "image",
    "jpg",
    "jpeg",
    "image/jpeg",
    "image/png",
    "gif",
    "svg",
    "png",
    "webp",
    "image/webp",
    "image/jpg"
  ],
  PDF_TYPES: ["application/pdf", "pdf"],
  AUDIO_TYPES: ["audio"],
  DOCUMENT_TYPES: ["document", "docx", "doc", "application/msword"],
  SPREADSHEET_TYPES: ["xlsx", "xls", "csv"],
  TEXT_TYPES: ["text", "txt", "text/plain", "text/csv"]
};
const VERIFICATION_STATUS = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PENDING: "PENDING"
};
const MESSAGES = {
  NO_MISSING_DOCS_USER: "The advocate has reviewed your case and did not raise any queries. This stage is already completed.",
  NO_MISSING_DOCS_ADVOCATE: "No missing documents were required for this case. This stage is already completed",
  NO_MISSING_DOCS_FOUND: "No missing documents found",
  RAISE_QUERY_MESSAGE: "Raise a query to upload the missing documents",
  NO_FILES_CATEGORY: "No files available for this category.",
  LOADING_MESSAGE: "Loading LOD Files",
  DELETE_CONFIRMATION: "Are you sure want to delete the file",
  SUCCESS_DELETE: "File deleted successfully",
  ERROR_DELETE_DEFAULT: "Failed to delete file"
};
const UI_CONFIG = {
  FILENAME_SLICE_LENGTH: 11,
  LOADING_TIMEOUT: 2e3,
  GRID_CLASSES: "grid xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4 gap-1 cursor-pointer"
};
function LODImageIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 48 49",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M7.40782 45.1959C6.21032 45.1959 5.21125 44.7956 4.4106 43.9949C3.60995 43.1943 3.20876 42.1943 3.20703 40.9951V7.80467C3.20703 6.60717 3.60822 5.6081 4.4106 4.80745C5.21298 4.0068 6.21205 3.60561 7.40782 3.60388H40.6008C41.7966 3.60388 42.7957 4.00507 43.5981 4.80745C44.4004 5.60983 44.8008 6.6089 44.799 7.80467V40.9977C44.799 42.1935 44.3987 43.1925 43.5981 43.9949C42.7974 44.7973 41.7975 45.1976 40.5982 45.1959H7.40782ZM7.40782 42.5964H40.6008C40.9994 42.5964 41.366 42.43 41.7004 42.0973C42.0349 41.7645 42.2013 41.3971 42.1995 40.9951V7.80467C42.1995 7.40435 42.0332 7.03695 41.7004 6.70249C41.3677 6.36802 41.0003 6.20165 40.5982 6.20338H7.40782C7.0075 6.20338 6.6401 6.36975 6.30563 6.70249C5.97117 7.03522 5.8048 7.40262 5.80653 7.80467V40.9977C5.80653 41.3963 5.9729 41.7628 6.30563 42.0973C6.63837 42.4317 7.0049 42.5981 7.40522 42.5964M12.3053 36.0976H36.1011L28.7523 26.2975L21.9546 34.8967L17.4055 29.3987L12.3053 36.0976Z",
          fill: "#353535"
        }
      )
    }
  );
}
function FileItem({
  file,
  index,
  stage,
  subStage,
  isReportingStageCompleted,
  onDeleteFile,
  getAllDocsRefetch,
  setDialogType,
  isCurrentStageCompleted
}) {
  const { isUser } = useUserDetails();
  const userDetails = useStore(userStore, (state) => state["user"]);
  const getFileIcon = (fileType) => {
    if (FILE_TYPE_ICONS.IMAGE_TYPES.includes(fileType)) {
      return /* @__PURE__ */ jsx(LODImageIcon, {});
    }
    if (FILE_TYPE_ICONS.PDF_TYPES.includes(fileType)) {
      return /* @__PURE__ */ jsx(FilePdfIcon, {});
    }
    if (FILE_TYPE_ICONS.AUDIO_TYPES.includes(fileType)) {
      return /* @__PURE__ */ jsx(FilesAudioIcon, {});
    }
    if (FILE_TYPE_ICONS.DOCUMENT_TYPES.includes(fileType)) {
      return /* @__PURE__ */ jsx(Docsicon, {});
    }
    if (FILE_TYPE_ICONS.SPREADSHEET_TYPES.includes(fileType)) {
      return /* @__PURE__ */ jsx(FileSpreadsheatIcon, {});
    }
    if (FILE_TYPE_ICONS.TEXT_TYPES.includes(fileType)) {
      return /* @__PURE__ */ jsx(FileTextIcon, {});
    }
    return /* @__PURE__ */ jsx(FileFilesIcon, {});
  };
  const {
    mutate: mutateApproveorRejectDocument,
    isPending: ApproveOrRejectDocument
  } = useMutation({
    mutationKey: ["approve_reject_document"],
    mutationFn: async ({
      docId,
      verification_status
    }) => {
      const payload = {
        verification_status,
        case_stage: stage,
        case_sub_stage: subStage
      };
      const response = await documentApprovalAPI({
        payload,
        doc_id: docId
      });
      return response;
    },
    onSuccess: (data) => {
      getAllDocsRefetch();
      toast.success(data?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
    },
    onError: (error) => {
      toast.error(error?.data?.errData?.notes?.[0] || "An error occurred");
    }
  });
  const rejAppDialog = (params) => {
    setDialogType({
      docId: params.docId,
      verification_status: params.verification_status
    });
  };
  const onApprove = (params) => {
    mutateApproveorRejectDocument(params);
  };
  const getStatusButton = () => {
    const status = file.verification_status;
    const baseClass = "leading-tight text-xs px-4 py-2 text-white rounded-none font-primary";
    if (status === VERIFICATION_STATUS.REJECTED) {
      return /* @__PURE__ */ jsx("p", { className: `bg-red-500 hover:bg-red-500 ${baseClass}`, children: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() });
    }
    if (status === VERIFICATION_STATUS.APPROVED) {
      return /* @__PURE__ */ jsx("p", { className: `bg-green-500 hover:bg-green-500 ${baseClass}`, children: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() });
    }
    return null;
  };
  const renderActionButtons = () => {
    if (isUser() || file.verification_status !== VERIFICATION_STATUS.PENDING || isCurrentStageCompleted) {
      return getStatusButton();
    }
    return /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "bg-red-500 hover:bg-red-500 border border-red-500 text-white rounded-none text-xs h-7 px-4",
          onClick: () => rejAppDialog({
            docId: file.id,
            verification_status: VERIFICATION_STATUS.REJECTED
          }),
          children: "Reject"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "bg-green-500 h-7 hover:bg-green-500 text-white-500 text-xs px-4 py-1 text-white rounded-none",
          onClick: () => onApprove({
            docId: file.id,
            verification_status: VERIFICATION_STATUS.APPROVED
          }),
          disabled: ApproveOrRejectDocument,
          children: "Approve"
        }
      )
    ] });
  };
  const isImageFile = FILE_TYPE_ICONS.IMAGE_TYPES.includes(file.file_type);
  if (!file?.file_name) return null;
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border border-gray-300 p-2 mb-2 cursor-pointer", children: [
      /* @__PURE__ */ jsx(DialogTrigger, { className: "w-full cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 [&_svg]:size-4 cursor-pointer", children: [
        getFileIcon(file.file_type),
        /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("div", { className: "text-sm cursor-pointer", children: sliceFilename(
            file?.file_name,
            UI_CONFIG.FILENAME_SLICE_LENGTH
          ) }) }),
          /* @__PURE__ */ jsx(TooltipContent, { className: "bg-white cursor-pointer", children: file?.file_name })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1 items-center", children: [
        file?.verification_status === VERIFICATION_STATUS.APPROVED && /* @__PURE__ */ jsx("span", { className: "text-green-500", children: /* @__PURE__ */ jsx(ApprovedIcon, { className: "w-4 h-4" }) }),
        file?.verification_status === VERIFICATION_STATUS.REJECTED && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: /* @__PURE__ */ jsx(RejectIcon, {}) }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 hover:bg-gray-200 h-7 w-7 flex justify-center items-center", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: file.download_url,
            target: "_blank",
            rel: "noopener noreferrer",
            children: /* @__PURE__ */ jsx(ViewIcon, { className: "w-4 h-4" })
          }
        ) }),
        /* @__PURE__ */ jsx(
          FileDownload,
          {
            file: {
              key: file.key,
              file_name: file.file_name
            }
          }
        ),
        file?.verification_status === VERIFICATION_STATUS.PENDING && !isCurrentStageCompleted && file?.uploaded_by === userDetails?.id && /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => onDeleteFile(file),
              className: "cursor-pointer bg-gray-100 hover:bg-gray-200 px-1 py-0.5",
              children: /* @__PURE__ */ jsx(DeleteStrokeIcon, { className: "size-5" })
            }
          ) }),
          /* @__PURE__ */ jsxs(TooltipContent, { className: "bg-black text-xs rounded-none text-white px-1 py-1", children: [
            "Delete",
            /* @__PURE__ */ jsx(TooltipArrow, { className: "fill-black" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      DialogContent,
      {
        "aria-describedby": void 0,
        className: "w-[90%] p-2 gap-0 bg-white",
        children: [
          /* @__PURE__ */ jsx(DialogTitle, {}),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm", children: file.file_name }),
            /* @__PURE__ */ jsx(DialogClose, { className: "border-0 border-gray-300 mt-0 h-fit px-0 py-0 [&_svg]:size-6", children: /* @__PURE__ */ jsx(X, { className: "stroke-red-500 cursor-pointer" }) })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "mt-2 mb-0 border-gray-300" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-3/5 px-2 py-2 border-r border-r-gray-300 flex flex-col", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 w-full mb-4", children: [
                /* @__PURE__ */ jsx("div", { children: !isUser() && renderActionButtons() }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
                  FileDownload,
                  {
                    file: {
                      key: file.key,
                      file_name: file.file_name
                    }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex", children: isImageFile ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: file.download_url,
                  alt: "Full Image",
                  className: "w-full h-[70vh] object-contain rounded-lg"
                }
              ) : /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: file.download_url,
                  title: "Document Preview",
                  className: "w-full h-[70vh] object-contain rounded-lg"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-2/5 h-full flex flex-col", children: /* @__PURE__ */ jsx(DocsCommentsSection, { documentId: file.id }) })
          ] })
        ]
      }
    )
  ] }, index);
}
function MissingDocuments({
  stage,
  subStage
}) {
  const [dialogType, setDialogType] = useState(null);
  const [deleteObj, setDeleteObj] = useState(null);
  const [openCategory, setOpenCategory] = useState([]);
  const [approveRejectReason, setApproveRejectReason] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [appRejError, setAppRejError] = useState("");
  const { isUser } = useUserDetails();
  const { allDocsIsFetching, getAllDocsRefetch, allDocsData, caseStagesData } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const onCancelDeleteFile = () => setDeleteObj(null);
  const onCancelApproveReject = () => setDialogType(null);
  const { mutate: onConfirmDeleteFile, isPending: isDeleteLoading } = useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: async (docId) => {
      const doc = allDocsData?.find((item) => item.id === docId);
      if (!doc?.id) throw new Error("Document ID not found");
      const response = await deleteSingleDocAPI({
        docId: doc.id,
        payload: {
          case_stage: stage,
          case_sub_stage: subStage
        }
      });
      if (response?.status === 200 || response?.status === 201) {
        return response.data.data;
      }
      throw new Error(MESSAGES.ERROR_DELETE_DEFAULT);
    },
    onSuccess: () => {
      toast.success(MESSAGES.SUCCESS_DELETE, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
      setDeleteObj(null);
      getAllDocsRefetch();
    },
    onError: (error) => {
    }
  });
  const {
    mutate: mutateApproveorRejectDocument,
    isPending: ApproveOrRejectDocument
  } = useMutation({
    mutationKey: ["approve_reject_document"],
    mutationFn: async ({
      docId,
      verification_status
    }) => {
      const doc = allDocsData?.find((item) => item.id === docId);
      if (!doc?.id) throw new Error("Document ID not found");
      let payload = {
        verification_status,
        case_stage: stage,
        case_sub_stage: subStage,
        notes: void 0
      };
      if (approveRejectReason !== "") {
        payload = {
          ...payload,
          notes: approveRejectReason,
          type: verification_status
        };
      }
      const response = await documentApprovalAPI({
        payload,
        doc_id: doc.id
      });
      return response;
    },
    onSuccess: (data) => {
      getAllDocsRefetch();
      toast.success(data?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
      setDialogType(null);
      setApproveRejectReason("");
    },
    onError: (error) => {
      setAppRejError(error?.data?.errData?.notes?.[0]);
    }
  });
  const onConfirmApproveReject = () => {
    if (dialogType) {
      mutateApproveorRejectDocument(dialogType);
    }
  };
  const onConfirmDelete = () => {
    if (isDeleteLoading) return;
    onConfirmDeleteFile(deleteObj?.id);
  };
  const onDeleteFile = (contactTypeObj) => {
    setDeleteObj(contactTypeObj);
  };
  const groupedByCategory = useMemo(() => {
    return Array.isArray(allDocsData) && allDocsData?.reduce((acc, file) => {
      if (file.is_requested) {
        const category = file.category || "Uncategorized";
        if (!acc[category]) acc[category] = [];
        const falseFiles = allDocsData.filter(
          (f) => f.category === category && !f.is_requested
        );
        acc[category] = falseFiles;
      }
      return acc;
    }, {}) || {};
  }, [allDocsData]);
  useEffect(() => {
    if (allDocsData && groupedByCategory) {
      const itemsWithValidFiles = Object.entries(groupedByCategory).filter(([_, files]) => files.some((file) => file?.file_name)).map(([category]) => category);
      setOpenCategory((prev) => {
        const updatedCategories = prev.filter(
          (cat) => itemsWithValidFiles.includes(cat)
        );
        const newCategories = itemsWithValidFiles.filter(
          (cat) => !updatedCategories.includes(cat)
        );
        return [...updatedCategories, ...newCategories];
      });
    }
  }, [allDocsData, groupedByCategory]);
  useEffect(() => {
    if (allDocsIsFetching) {
      setTimeout(() => {
        setLoading2(false);
      }, UI_CONFIG.LOADING_TIMEOUT);
    }
  }, [allDocsIsFetching]);
  const renderEmptyState = () => {
    if (isCurrentStageCompleted) {
      return /* @__PURE__ */ jsx("div", { className: "h-96 flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "text-center text-base text-gray-500 flex items-center justify-center", children: isUser() ? MESSAGES.NO_MISSING_DOCS_USER : MESSAGES.NO_MISSING_DOCS_ADVOCATE }) });
    }
    return /* @__PURE__ */ jsx("div", { className: "h-[calc(100vh-200px)] flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "text-center text-base text-gray-500 flex items-center justify-center", children: isUser() ? MESSAGES.NO_MISSING_DOCS_FOUND : MESSAGES.RAISE_QUERY_MESSAGE }) });
  };
  const renderFileGrid = (files) => /* @__PURE__ */ jsx("div", { className: UI_CONFIG.GRID_CLASSES, children: files.map((file, index) => /* @__PURE__ */ jsx(
    FileItem,
    {
      file,
      index,
      stage,
      subStage,
      isReportingStageCompleted: isCurrentStageCompleted,
      onDeleteFile,
      getAllDocsRefetch,
      setDialogType,
      isCurrentStageCompleted
    },
    index
  )) });
  const renderUploadButton = (category, hasValidFiles) => {
    if (isCurrentStageCompleted) return null;
    const shouldShowButton = !hasValidFiles || hasValidFiles;
    if (!shouldShowButton) return null;
    return /* @__PURE__ */ jsx(Button, { className: "bg-black hover:bg-black text-white h-fit rounded-none py-1 px-2", children: /* @__PURE__ */ jsx(
      FileUpload,
      {
        refetch: getAllDocsRefetch,
        category,
        loading2,
        setLoading2,
        children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1 items-center text-sm", children: [
          /* @__PURE__ */ jsx(PlusIcon, { className: "!h-4 !w-4" }),
          " Upload"
        ] })
      }
    ) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showUploadButton: false,
        showActionButton: !isUser(),
        showNoteButton: false
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-4 relative h-[calc(100%-30px)] overflow-y-auto", children: [
      /* @__PURE__ */ jsx("div", { children: loading2 || allDocsIsFetching ? /* @__PURE__ */ jsx(
        LoadingComponent,
        {
          loading: loading2 || allDocsIsFetching,
          message: MESSAGES.LOADING_MESSAGE
        }
      ) : allDocsData?.length === 0 ? renderEmptyState() : /* @__PURE__ */ jsx(
        Accordion,
        {
          type: "multiple",
          className: "space-y-2 w-full",
          value: openCategory,
          onValueChange: setOpenCategory,
          children: Object.entries(groupedByCategory).map(([category, files]) => {
            const hasValidFiles = files.some((file) => file?.file_name);
            return /* @__PURE__ */ jsxs(
              AccordionItem,
              {
                value: category,
                className: "border border-gray-300 rounded-none p-3",
                children: [
                  /* @__PURE__ */ jsxs(AccordionTrigger, { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 w-full cursor-pointer", children: /* @__PURE__ */ jsx("div", { className: "text-xs font-normal", children: category }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                      !hasValidFiles && !isCurrentStageCompleted && /* @__PURE__ */ jsx("div", { onClick: (e) => e.stopPropagation(), children: renderUploadButton(category, hasValidFiles) }),
                      /* @__PURE__ */ jsx(ChevronDown, { className: "cursor-pointer" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(AccordionContent, { className: "p-2", children: [
                    hasValidFiles ? renderFileGrid(files) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: MESSAGES.NO_FILES_CATEGORY }),
                    !isCurrentStageCompleted && hasValidFiles && /* @__PURE__ */ jsx("div", { className: "mt-2", children: renderUploadButton(category, hasValidFiles) })
                  ] })
                ]
              },
              category
            );
          })
        }
      ) }),
      /* @__PURE__ */ jsx(
        ApproveDialog,
        {
          icon: /* @__PURE__ */ jsx(ApproveLogo, {}),
          open: !!deleteObj,
          onOpenChange: setDeleteObj,
          title: "Delete File",
          message: MESSAGES.DELETE_CONFIRMATION,
          onCancel: onCancelDeleteFile,
          isPending: isDeleteLoading,
          onConfirm: onConfirmDelete
        }
      ),
      /* @__PURE__ */ jsx(
        ApproveRejectDialog,
        {
          removeConfirm: !!dialogType,
          setRemoveConfirm: () => setDialogType(null),
          onCancel: onCancelApproveReject,
          onConfirm: onConfirmApproveReject,
          isDeleteLoading: ApproveOrRejectDocument,
          setApproveRejectReason,
          dialogType,
          appRejError,
          setAppRejError,
          isPending: ApproveOrRejectDocument
        }
      ),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] })
  ] });
}
export {
  MissingDocuments as default
};
