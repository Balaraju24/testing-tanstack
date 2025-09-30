import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { h as downloadSingleDocAPI } from "./fileUpload-BBm5-XTb.js";
import { d as downloadFileFromS3 } from "./apiHelpers-QKbVsPE7.js";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import { T as TableHeader, S as SkeletonRow } from "./TableHeader-CuMiBeKR.js";
import dayjs from "dayjs";
import { Eye, Loader2, Download } from "lucide-react";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-router";
import "./router-e7zdrxGz.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "react-error-boundary";
import "./index-Bb_5490h.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-BKF0DBvK.js";
import "@radix-ui/react-tooltip";
import "./manage-CWSyPq63.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
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
import "axios";
import "@radix-ui/react-progress";
import "react-dropzone";
import "./default-user-EV710LEP.js";
import "./notes-delete-icon-CyozBLV8.js";
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./avatar-xL-W5RbG.js";
import "@radix-ui/react-avatar";
import "./input-CcfBn-WR.js";
import "./sheet-vrO17VYZ.js";
import "@radix-ui/react-dialog";
import "./skeleton-BAyQx-Zm.js";
const TableRow = ({
  doc,
  index,
  downloadingDocId,
  isPendingDownloadFile,
  onView,
  onDownload
}) => /* @__PURE__ */ jsxs(
  "tr",
  {
    className: `hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`,
    children: [
      /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: dayjs(doc.created_at).format("DD MMM YYYY") }),
      /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: /* @__PURE__ */ jsx("div", { className: "truncate w-32", title: doc?.file_name || "--", children: doc?.file_name || "--" }) }),
      /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: /* @__PURE__ */ jsx("div", { className: "truncate w-32 cursor-pointer", title: doc.document_type, children: doc.document_type }) }),
      /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onView(doc.download_url),
            className: "p-1 hover:bg-gray-300 rounded transition-colors cursor-pointer",
            title: "View Document",
            children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-gray-600" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onDownload(doc),
            disabled: isPendingDownloadFile,
            className: "p-1 hover:bg-gray-300 rounded transition-colors disabled:opacity-50 cursor-pointer",
            title: "Download Document",
            children: downloadingDocId === doc.id ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 text-gray-600 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 text-gray-600" })
          }
        )
      ] }) })
    ]
  },
  doc.id
);
function FileCheckVerification({
  stage,
  subStage,
  isLoading = false
}) {
  const [downloadingDocId, setDownloadingDocId] = useState(null);
  const { allDocsIsFetching, allDocsData } = UseContextAPI();
  const { mutate: mutateDownloadFile, isPending: isPendingDownloadFile } = useMutation({
    mutationFn: async (payload) => {
      const body = { file_key: payload.key };
      const response = await downloadSingleDocAPI(body);
      const status = response?.data?.status;
      const downloadUrl = response?.data?.data?.download_url;
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
  const renderTableContent = () => {
    if (isLoading) {
      return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-96", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx(TableHeader, {}),
        /* @__PURE__ */ jsx("tbody", { children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsx(SkeletonRow, { index }, `skeleton-${index}`)) })
      ] }) });
    }
    if (allDocsData?.length === 0) {
      return /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-normal leading-6 text-gray-900", children: "No Documents Uploaded" }) });
    }
    return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-96", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx(TableHeader, {}),
      /* @__PURE__ */ jsx("tbody", { children: Array.isArray(allDocsData) && allDocsData.map((doc, index) => /* @__PURE__ */ jsx(
        TableRow,
        {
          doc,
          index,
          downloadingDocId,
          isPendingDownloadFile,
          onView: handleViewDocument,
          onDownload: handleDownloadDocument
        },
        doc.id
      )) })
    ] }) });
  };
  return /* @__PURE__ */ jsx("div", { className: "h-full relative", children: allDocsIsFetching ? /* @__PURE__ */ jsx(
    LoadingComponent,
    {
      loading: allDocsIsFetching,
      message: "Loading documents..."
    }
  ) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: false,
        showUploadButton: false
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "p-2 w-full h-max-[calc(100%-60px)] overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden", children: renderTableContent() }) }),
    isLoading ? /* @__PURE__ */ jsxs("div", { className: "col-span-12 space-y-2 mt-4 flex flex-col p-4 pt-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-4 bg-gray-200 rounded animate-pulse mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-2", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse" }) })
    ] }) : allDocsData?.length > 0 && allDocsData[0]?.remarks && /* @__PURE__ */ jsxs("div", { className: "col-span-12 space-y-2 mt-4 flex flex-col p-4 pt-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full text-sm font-normal text-gray-700 mb-1", children: "Remarks" }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-2 text-gray-700 text-xs 2xl:text-sm", children: allDocsData[0].remarks })
    ] })
  ] }) });
}
export {
  FileCheckVerification as default
};
