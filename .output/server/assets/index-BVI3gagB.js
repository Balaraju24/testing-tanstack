import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { i as isSubStageCompleted, M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import { D as DeleteStrokeIcon } from "./delete-stroke-icon-mn8-8d5M.js";
import { f as fileUploadAPI, u as uploadToS3API, b as deleteSingleDocAPI, h as downloadSingleDocAPI } from "./fileUpload-BBm5-XTb.js";
import { u as updateUploadStageAPI, f as fileUploadStageAPI } from "./legalOpinion-qNiAW4Gj.js";
import { T as TOAST_MESSAGES } from "./getCaseFilesConstants-BRQFWmkt.js";
import { d as documentTypes } from "./stateConstants-CKjWDC1S.js";
import { c as cn } from "./router-e7zdrxGz.js";
import { d as downloadFileFromS3 } from "./apiHelpers-QKbVsPE7.js";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Edit2, Check, FileText, X, Upload, Search, ChevronDown, Plus, Loader2, Eye, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "./index-Bb_5490h.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "framer-motion";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-BKF0DBvK.js";
import "@radix-ui/react-tooltip";
import "./manage-CWSyPq63.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
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
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "react-error-boundary";
const DocumentTypeFileUpload = ({
  subStage,
  editMode,
  setEditMode
}) => {
  const dropdownRefs = useRef({});
  const setDropdownRef = (id) => (el) => {
    dropdownRefs.current[id] = el;
  };
  const { service_id } = useParams({ strict: false });
  const [documents, setDocuments] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [searchValues, setSearchValues] = useState({});
  const [showDropdowns, setShowDropdowns] = useState(
    {}
  );
  const [dropdownPositions, setDropdownPositions] = useState({});
  const [downloadingDocId, setDownloadingDocId] = useState(null);
  const [maxDocsError, setMaxDocsError] = useState("");
  const { getAllDocsRefetch, allDocsData, caseStagesData } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const calculateDropdownPosition = (id) => {
    const ref = dropdownRefs.current[id];
    if (!ref) return "bottom";
    const rect = ref.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 176;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    return spaceBelow < dropdownHeight && spaceAbove > dropdownHeight ? "top" : "bottom";
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((id) => {
        const ref = dropdownRefs.current[parseInt(id)];
        if (ref && !ref.contains(event.target)) {
          setShowDropdowns((prev) => ({ ...prev, [parseInt(id)]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { mutate: uploadFileToS3 } = useMutation({
    mutationFn: async ({
      file,
      documentId
    }) => {
      const fileType = file.name.split(".").pop() || "unknown";
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size
      });
      const { target_url, file_key } = data?.data;
      if (!target_url) throw new Error("Presigned URL is missing");
      const response = await uploadToS3API(target_url, file);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`S3 upload failed with status: ${response.status}`);
      }
      return {
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
        key: file_key,
        documentId
      };
    },
    onSuccess: ({ key, documentId }) => {
      setDocuments(
        (docs) => docs.map(
          (doc) => doc.id === documentId ? {
            ...doc,
            s3Key: key,
            uploading: false,
            uploaded: true,
            fileError: "",
            isUpdated: doc.existingId ? true : doc.isUpdated
          } : doc
        )
      );
    },
    onError: (error, { documentId }) => {
      setDocuments(
        (docs) => docs.map(
          (doc) => doc.id === documentId ? {
            ...doc,
            file: null,
            s3Key: "",
            uploading: false,
            uploaded: false,
            fileError: error?.data?.errData?.file_size || "File upload failed. Please try again."
          } : doc
        )
      );
    }
  });
  const { mutateAsync: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      const response = await deleteSingleDocAPI({ docId: id });
      return response;
    },
    onSuccess: () => {
      getAllDocsRefetch();
    },
    onError: () => {
      toast.error("Failed to delete document.");
    }
  });
  const resetState = () => {
    setDocuments([
      {
        id: 1,
        file: null,
        documentType: "",
        customType: "",
        s3Key: "",
        uploading: false,
        uploaded: false,
        fileError: "",
        documentTypeError: ""
      }
    ]);
    setRemarks("");
    setSearchValues({});
    setShowDropdowns({});
    setDropdownPositions({});
  };
  const handleError = (response) => {
    if (response) {
      const newDocs = documents.map((doc, index) => {
        const fileError = response.data.errData[`docs.${index}.file_name`]?.[0] || response.data.errData[`docs.${index}.file_type`]?.[0] || response.data.errData[`docs.${index}.key`]?.[0] || "";
        const documentTypeError = response.data.errData[`docs.${index}.document_type`]?.[0] || "";
        setMaxDocsError(response.data.errData.docs?.[0]);
        return {
          ...doc,
          fileError,
          documentTypeError
        };
      });
      setDocuments(newDocs);
    }
  };
  const { mutate: mutateDocs, isPending: isDocsPending } = useMutation({
    mutationFn: async (payload) => {
      if (allDocsData?.length !== 0) {
        return await updateUploadStageAPI(payload);
      }
      return await fileUploadStageAPI(payload);
    },
    onSuccess: () => {
      resetState();
      setEditMode(false);
      getAllDocsRefetch();
    },
    onError: handleError
  });
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
  useEffect(() => {
    if (allDocsData?.length && !documents.length) {
      const initialDocs = allDocsData.map((doc, index) => ({
        id: index + 1,
        existingId: doc.id,
        file: {
          name: doc.file_name,
          size: `${(doc.file_size / 1024).toFixed(1)}KB`,
          date: doc.created_at,
          rawSize: doc.file_size
        },
        documentType: doc.document_type,
        customType: doc.document_type === "Other" ? doc.document_type : "",
        s3Key: doc.key,
        uploading: false,
        uploaded: true,
        fileError: "",
        documentTypeError: "",
        isUpdated: false
      }));
      setDocuments(initialDocs);
      setRemarks(allDocsData[0]?.remarks || "");
    } else if (!documents.length) {
      setDocuments([
        {
          id: 1,
          file: null,
          documentType: "",
          customType: "",
          s3Key: "",
          uploading: false,
          uploaded: false,
          fileError: "",
          documentTypeError: ""
        }
      ]);
    }
  }, [allDocsData, editMode]);
  const handleFileChange = async (id, file) => {
    if (!file) {
      setDocuments(
        (docs) => docs.map(
          (doc) => doc.id === id ? {
            ...doc,
            file: null,
            s3Key: "",
            uploading: false,
            uploaded: false,
            fileError: "",
            isUpdated: doc.existingId ? true : doc.isUpdated
          } : doc
        )
      );
      return;
    }
    setDocuments(
      (docs) => docs.map(
        (doc) => doc.id === id ? {
          ...doc,
          file: {
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)}KB`,
            date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
            rawSize: file.size
          },
          uploading: true,
          uploaded: false,
          fileError: "",
          isUpdated: doc.existingId ? true : doc.isUpdated
        } : doc
      )
    );
    uploadFileToS3({ file, documentId: id });
  };
  const handleDocumentTypeSelect = (id, type) => {
    setDocuments(
      (docs) => docs.map(
        (doc) => doc.id === id ? {
          ...doc,
          documentType: type,
          customType: type === "Other" ? doc.customType : "",
          documentTypeError: "",
          isUpdated: doc.existingId ? true : doc.isUpdated
        } : doc
      )
    );
    if (type !== "Other") {
      setSearchValues((prev) => ({ ...prev, [id]: type }));
    }
    setShowDropdowns((prev) => ({ ...prev, [id]: false }));
  };
  const handleCustomTypeChange = (id, value) => {
    setDocuments(
      (docs) => docs.map(
        (doc) => doc.id === id ? {
          ...doc,
          customType: value,
          documentType: "Other",
          documentTypeError: "",
          isUpdated: doc.existingId ? true : doc.isUpdated
        } : doc
      )
    );
  };
  const handleSearchChange = (id, value) => {
    setSearchValues((prev) => ({ ...prev, [id]: value }));
    setShowDropdowns((prev) => ({ ...prev, [id]: true }));
    const position = calculateDropdownPosition(id);
    setDropdownPositions((prev) => ({ ...prev, [id]: position }));
    const currentDoc = documents.find((doc) => doc.id === id);
    if (currentDoc && currentDoc.documentType !== "Other" && value !== currentDoc.documentType) {
      setDocuments(
        (docs) => docs.map(
          (doc) => doc.id === id ? {
            ...doc,
            documentType: "",
            customType: "",
            documentTypeError: "",
            isUpdated: doc.existingId ? true : doc.isUpdated
          } : doc
        )
      );
    }
  };
  const handleDropdownToggle = (id) => {
    const newShowState = !showDropdowns[id];
    if (newShowState) {
      const position = calculateDropdownPosition(id);
      setDropdownPositions((prev) => ({ ...prev, [id]: position }));
    }
    setShowDropdowns((prev) => ({ ...prev, [id]: newShowState }));
  };
  const handleInputFocus = (id) => {
    const position = calculateDropdownPosition(id);
    setDropdownPositions((prev) => ({ ...prev, [id]: position }));
    setShowDropdowns((prev) => ({ ...prev, [id]: true }));
  };
  const removeDocument = (id) => {
    const doc = documents.find((d) => d.id === id);
    if (doc?.existingId) {
      toast.promise(deleteDocument(doc.existingId), {
        loading: TOAST_MESSAGES.DELETE_LOADING,
        success: TOAST_MESSAGES.DELETE_SUCCESS,
        error: TOAST_MESSAGES.DELETE_ERROR,
        action: {
          label: TOAST_MESSAGES.CLOSE_LABEL,
          onClick: () => toast.dismiss()
        }
      });
    }
    setDocuments((docs) => docs.filter((doc2) => doc2.id !== id));
    setSearchValues((prev) => {
      const newValues = { ...prev };
      delete newValues[id];
      return newValues;
    });
    setShowDropdowns((prev) => {
      const newValues = { ...prev };
      delete newValues[id];
      return newValues;
    });
    setDropdownPositions((prev) => {
      const newValues = { ...prev };
      delete newValues[id];
      return newValues;
    });
    delete dropdownRefs.current[id];
  };
  const addDocument = () => {
    const newId = Math.max(...documents.map((d) => d.id), 0) + 1;
    setDocuments([
      ...documents,
      {
        id: newId,
        file: null,
        documentType: "",
        customType: "",
        s3Key: "",
        uploading: false,
        uploaded: false,
        fileError: "",
        documentTypeError: ""
      }
    ]);
  };
  const handleSubmit = async () => {
    const documentsPayload = documents.map((doc) => {
      const file = doc.file;
      const fileType = file ? file.name.split(".").pop() || "unknown" : "";
      return {
        ...doc.existingId && { id: doc.existingId },
        case_id: Number(service_id),
        file_type: fileType,
        file_name: file ? file.name : "",
        file_size: file ? file.rawSize : 0,
        key: doc.s3Key || "",
        document_type: doc.customType || doc.documentType || "",
        remarks
      };
    });
    mutateDocs({ docs: documentsPayload });
  };
  const handleDownloadDocument = (doc) => {
    if (doc.key) {
      setDownloadingDocId(doc.id);
      mutateDownloadFile({
        key: doc.key,
        file_name: doc.file?.name || "document"
      });
    } else {
      toast.error("Document key not available for download");
    }
  };
  const handleViewDocument = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast.error("No download URL available");
    }
  };
  const getFilteredDocumentTypes = (searchValue) => {
    if (!searchValue) return documentTypes;
    return documentTypes.filter(
      (type) => type.toLowerCase().includes(searchValue.toLowerCase())
    );
  };
  const getDisplayValue = (document2) => {
    if (document2.documentType && document2.documentType !== "Other") {
      return document2.documentType;
    }
    if (document2.documentType === "Other") {
      return "Other";
    }
    return "";
  };
  const handleClearSelection = (id) => {
    setDocuments(
      (docs) => docs.map(
        (doc) => doc.id === id ? {
          ...doc,
          documentType: "",
          customType: "",
          documentTypeError: "",
          isUpdated: doc.existingId ? true : doc.isUpdated
        } : doc
      )
    );
    setSearchValues((prev) => ({ ...prev, [id]: "" }));
  };
  const inputClasses = "w-full p-3 bg-gray-100 outline-none text-sm rounded-none border-none";
  const labelClasses = "block text-sm font-normal text-gray-700 mb-1";
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-none flex flex-col border-none overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl mx-auto mt-2 bg-white", children: [
    allDocsData?.length > 0 && !isCurrentStageCompleted && !editMode && /* @__PURE__ */ jsx("div", { className: "flex justify-end ", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          setEditMode(!editMode);
        },
        className: "bg-gray-800 text-white text-xs hover:bg-gray-900 rounded-none p-2 flex items-center cursor-pointer",
        children: [
          /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4 mr-2" }),
          "Edit Documents"
        ]
      }
    ) }),
    editMode || allDocsData?.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-h-[calc(100vh-258px)] bg-gray-50/80 p-2 2xl:p-3 overflow-y-auto", children: [
        /* @__PURE__ */ jsx("div", { children: documents.map((document2) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "grid grid-cols-11 gap-2 2xl:gap-4 items-start mb-3",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "col-span-5 space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: labelClasses, children: "Upload Document" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  document2.file ? /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 py-1 bg-gray-100 relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-5 h-5 mr-3 flex-shrink-0", children: document2.uploading ? /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) : document2.uploaded ? /* @__PURE__ */ jsx("div", { className: "w-5 h-5 bg-green-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-white" }) }) : /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-gray-400" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "text-sm font-normal overflow-hidden w-32 whitespace-nowrap cursor-pointer text-ellipsis text-gray-900",
                          title: document2.file.name,
                          children: document2.file.name
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
                        document2.file.date ? dayjs(document2.file.date).format(
                          "DD MMM YYYY"
                        ) : null,
                        " ",
                        "|",
                        " ",
                        (document2.file.rawSize / (1024 * 1024)).toFixed(2),
                        " ",
                        "MB"
                      ] })
                    ] }),
                    !document2.uploading && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handleFileChange(document2.id, null),
                        className: "ml-3 w-5 h-5 text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer",
                        children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "file",
                        className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10",
                        onChange: (e) => handleFileChange(
                          document2.id,
                          e.target.files?.[0] || null
                        ),
                        accept: ".pdf,.jpg,.jpeg,.png"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center px-3 py-3 h-[44px] bg-gray-100 cursor-pointer hover:bg-gray-200 border-2 border-dashed border-gray-300", children: [
                      /* @__PURE__ */ jsx(Upload, { className: "w-3 h-3 mr-2 text-gray-400" }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600 font-normal", children: "Click to Upload File" })
                    ] })
                  ] }),
                  document2.fileError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: document2.fileError })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-span-5 space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: labelClasses, children: "Select Document Type" }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "relative",
                    ref: setDropdownRef(document2.id),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Search document type...",
                            value: searchValues[document2.id] || getDisplayValue(document2),
                            onChange: (e) => handleSearchChange(document2.id, e.target.value),
                            onFocus: () => handleInputFocus(document2.id),
                            className: "w-full pl-2 2xl:px-4 py-3 bg-gray-100 text-sm outline-none pr-24"
                          }
                        ),
                        (document2.documentType || searchValues[document2.id]) && /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => handleClearSelection(document2.id),
                            className: "absolute cursor-pointer inset-y-0 right-16 top-2.5 flex items-center justify-center w-6 h-6 hover:text-red-500",
                            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-gray-400 cursor-pointer" })
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-8 top-2.5 flex items-center justify-center w-6 h-6 pointer-events-none", children: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-gray-400" }) }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => handleDropdownToggle(document2.id),
                            className: "absolute top-0 inset-y-0 right-0 flex items-center justify-center w-8 h-full",
                            children: /* @__PURE__ */ jsx(
                              ChevronDown,
                              {
                                className: `h-4 w-4 text-gray-400 transition-transform ${showDropdowns[document2.id] ? "rotate-180" : ""}`
                              }
                            )
                          }
                        )
                      ] }),
                      showDropdowns[document2.id] && /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: cn(
                            "absolute z-50 w-full bg-white border border-gray-300 shadow-lg max-h-44 overflow-y-auto",
                            dropdownPositions[document2.id] === "top" ? "bottom-full mb-1" : "top-full mt-1"
                          ),
                          children: getFilteredDocumentTypes(
                            searchValues[document2.id] || ""
                          ).length > 0 ? getFilteredDocumentTypes(
                            searchValues[document2.id] || ""
                          ).map((type) => /* @__PURE__ */ jsxs(
                            "div",
                            {
                              onClick: () => handleDocumentTypeSelect(
                                document2.id,
                                type
                              ),
                              className: cn(
                                "flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm",
                                document2.documentType === type && "bg-gray-50"
                              ),
                              children: [
                                /* @__PURE__ */ jsx("span", { className: "flex-1", children: type }),
                                document2.documentType === type && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-600" })
                              ]
                            },
                            type
                          )) : /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-sm text-gray-500", children: "No document types found" })
                        }
                      ),
                      document2.documentType === "Other" && /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: document2.customType,
                          onChange: (e) => handleCustomTypeChange(
                            document2.id,
                            e.target.value
                          ),
                          placeholder: "Enter custom document type",
                          className: `${inputClasses} mt-2`
                        }
                      ),
                      document2.documentTypeError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: document2.documentTypeError })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "col-span-1 flex justify-end pt-6", children: allDocsData?.length !== 0 ? /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => removeDocument(document2.id),
                  className: "w-11 h-11 cursor-pointer flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md transition-colors border border-gray-300",
                  disabled: document2.uploading,
                  children: /* @__PURE__ */ jsx(DeleteStrokeIcon, { className: "w-5 h-5" })
                }
              ) : documents.length !== 1 && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => removeDocument(document2.id),
                  className: "w-11 h-11 cursor-pointer flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md transition-colors border border-gray-300",
                  disabled: document2.uploading,
                  children: /* @__PURE__ */ jsx(DeleteStrokeIcon, { className: "w-5 h-5" })
                }
              ) })
            ]
          },
          document2.id
        )) }),
        /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: addDocument,
            className: cn(
              "inline-flex items-center px-4 py-2.5 text-sm font-normal text-gray-700 bg-white border border-gray-300 rounded-none focus:outline-none focus:ring-0 transition-colors cursor-pointer hover:bg-gray-50"
            ),
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2 text-gray-600" }),
              "Add Another Document"
            ]
          }
        ) }),
        maxDocsError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: maxDocsError }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-12 space-y-2 mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: labelClasses, children: "Remarks" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: remarks,
              onChange: (e) => setRemarks(e.target.value),
              placeholder: "Enter remarks for the documents",
              className: `${inputClasses} resize-none`,
              rows: 2
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end mt-3 gap-2", children: [
        allDocsData?.length > 0 && !isCurrentStageCompleted && /* @__PURE__ */ jsx("div", { className: "flex justify-end ", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setEditMode(!editMode);
              setDocuments([]);
            },
            className: "bg-transparent cursor-pointer border rounded-none active:scale-95 duration-300 transition-all  text-black font-medium text-sm 3xl:text-base px-4 py-0 h-8 outline-none focus:outline-none hover:bg-transparent",
            children: editMode && "Cancel"
          }
        ) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSubmit,
            className: "bg-black hover:bg-black  text-white cursor-pointer font-medium active:scale-95 duration-300 transition-all text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none",
            disabled: documents.some((doc) => doc.uploading) || isDocsPending,
            children: isDocsPending ? /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
              allDocsData?.length === 0 ? "Submitting..." : "Updating...",
              /* @__PURE__ */ jsx(Loader2, { className: "animate-spin h-5 w-5 mx-1" })
            ] }) : allDocsData?.length === 0 ? "Submit" : "Update"
          }
        )
      ] })
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-[calc(100vh-380px)]", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-black sticky top-0 z-10", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-normal text-white/80 uppercase tracking-wider", children: "Date" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-normal text-white/80 uppercase tracking-wider", children: "Document Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-normal text-white/80 uppercase tracking-wider", children: "Type" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-normal text-white/80 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: Array.isArray(allDocsData) && allDocsData.map((doc, index) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: `hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`,
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: dayjs(doc.created_at).format("DD MMM YYYY") }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-ellipsis whitespace-nowrap w-32 cursor-pointer overflow-hidden",
                  title: doc?.file_name,
                  children: doc?.file_name || "--"
                }
              ) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: doc.document_type }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-sm text-gray-900", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleViewDocument(doc.download_url),
                    className: "p-1 hover:bg-gray-300 rounded cursor-pointer",
                    title: "View Document",
                    children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-gray-600" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDownloadDocument(doc),
                    disabled: isPendingDownloadFile,
                    className: "p-1 hover:bg-gray-300 rounded transition-colors disabled:opacity-50 cursor-pointer",
                    title: "Download Document",
                    children: downloadingDocId === doc.id ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 text-gray-600 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 text-gray-600" })
                  }
                )
              ] })
            ]
          },
          doc.id
        )) })
      ] }) }) }),
      allDocsData?.[0]?.remarks && /* @__PURE__ */ jsxs("div", { className: "col-span-12 space-y-2 mt-4 flex flex-col p-4 pt-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full text-sm font-normal text-gray-700 mb-1", children: "Remarks" }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-2 max-h-16 overflow-y-auto overflow-x-hidden", children: allDocsData[0].remarks })
      ] })
    ] })
  ] }) });
};
function DocumentDisplay({
  stage,
  subStage
}) {
  const [editMode, setEditMode] = useState(false);
  const { isUser } = useUserDetails();
  const { allDocsIsFetching, allDocsData } = UseContextAPI();
  useEffect(() => {
    if (allDocsData?.length === 0) {
      setEditMode(false);
    }
  }, []);
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
        showActionButton: isUser() ? false : allDocsData?.length !== 0 && !editMode,
        showNoteButton: false
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "px-2 py-1 sm:px-2", children: /* @__PURE__ */ jsx(
      DocumentTypeFileUpload,
      {
        subStage,
        editMode,
        setEditMode
      }
    ) })
  ] }) });
}
export {
  DocumentDisplay as default
};
