import { UseContextAPI } from "@/components/context/Provider";
import DeleteStrokeIcon from "@/components/icons/delete-stroke-icon";
import {
  deleteSingleDocAPI,
  downloadSingleDocAPI,
  fileUploadAPI,
  uploadToS3API,
} from "@/http/services/fileUpload";
import {
  fileUploadStageAPI,
  updateUploadStageAPI,
} from "@/http/services/legalOpinion";
import { TOAST_MESSAGES } from "@/lib/constants/getCaseFilesConstants";
import { documentTypes } from "@/lib/constants/stateConstants";
import { DocumentItem } from "@/lib/interfaces/files";
import { cn } from "@/lib/utils";
import { downloadFileFromS3 } from "@/utils/helpers/apiHelpers";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import {
  Check,
  ChevronDown,
  Download,
  Edit2,
  Eye,
  FileText,
  Loader2,
  Plus,
  Search,
  Upload,
  X,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface DocumentItemWithId extends DocumentItem {
  existingId?: number;
  isUpdated?: boolean;
}

const DocumentTypeFileUpload = ({
  subStage,
  editMode,
  setEditMode,
}: {
  subStage: string;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const setDropdownRef = (id: number) => (el: HTMLDivElement | null) => {
    dropdownRefs.current[id] = el;
  };
  const { service_id } = useParams({ strict: false });
  const [documents, setDocuments] = useState<DocumentItemWithId[]>([]);
  const [remarks, setRemarks] = useState<string>("");
  const [searchValues, setSearchValues] = useState<Record<number, string>>({});
  const [showDropdowns, setShowDropdowns] = useState<Record<number, boolean>>(
    {}
  );
  const [dropdownPositions, setDropdownPositions] = useState<
    Record<number, "top" | "bottom">
  >({});
  const [downloadingDocId, setDownloadingDocId] = useState<number | null>(null);
  const [maxDocsError, setMaxDocsError] = useState<string>("");
  const { getAllDocsRefetch, allDocsData, caseStagesData } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const calculateDropdownPosition = (id: number) => {
    const ref = dropdownRefs.current[id];
    if (!ref) return "bottom";
    const rect = ref.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 176;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    return spaceBelow < dropdownHeight && spaceAbove > dropdownHeight
      ? "top"
      : "bottom";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach((id) => {
        const ref = dropdownRefs.current[parseInt(id)];
        if (ref && !ref.contains(event.target as Node)) {
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
      documentId,
    }: {
      file: File;
      documentId: number;
    }) => {
      const fileType = file.name.split(".").pop() || "unknown";
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
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
        documentId,
      };
    },
    onSuccess: ({ key, documentId }) => {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                s3Key: key,
                uploading: false,
                uploaded: true,
                fileError: "",
                isUpdated: doc.existingId ? true : doc.isUpdated,
              }
            : doc
        )
      );
    },
    onError: (error: any, { documentId }) => {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                file: null,
                s3Key: "",
                uploading: false,
                uploaded: false,
                fileError:
                  error?.data?.errData?.file_size ||
                  "File upload failed. Please try again.",
              }
            : doc
        )
      );
    },
  });

  const { mutateAsync: deleteDocument } = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteSingleDocAPI({ docId: id });
      return response;
    },
    onSuccess: () => {
      getAllDocsRefetch();
    },
    onError: () => {
      toast.error("Failed to delete document.");
    },
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
        documentTypeError: "",
      },
    ]);
    setRemarks("");
    setSearchValues({});
    setShowDropdowns({});
    setDropdownPositions({});
  };

  const handleError = (response: any) => {
    if (response) {
      const newDocs = documents.map((doc, index) => {
        const fileError =
          response.data.errData[`docs.${index}.file_name`]?.[0] ||
          response.data.errData[`docs.${index}.file_type`]?.[0] ||
          response.data.errData[`docs.${index}.key`]?.[0] ||
          "";
        const documentTypeError =
          response.data.errData[`docs.${index}.document_type`]?.[0] || "";
        setMaxDocsError(response.data.errData.docs?.[0]);
        return {
          ...doc,
          fileError,
          documentTypeError,
        };
      });
      setDocuments(newDocs);
    }
  };

  const { mutate: mutateDocs, isPending: isDocsPending } = useMutation({
    mutationFn: async (payload: any) => {
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
    onError: handleError,
  });

  const { mutate: mutateDownloadFile, isPending: isPendingDownloadFile } =
    useMutation({
      mutationFn: async (payload: { key: string; file_name: string }) => {
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
      },
    });

  useEffect(() => {
    if (allDocsData?.length && !documents.length) {
      const initialDocs = allDocsData.map((doc: any, index: number) => ({
        id: index + 1,
        existingId: doc.id,
        file: {
          name: doc.file_name,
          size: `${(doc.file_size / 1024).toFixed(1)}KB`,
          date: doc.created_at,
          rawSize: doc.file_size,
        },
        documentType: doc.document_type,
        customType: doc.document_type === "Other" ? doc.document_type : "",
        s3Key: doc.key,
        uploading: false,
        uploaded: true,
        fileError: "",
        documentTypeError: "",
        isUpdated: false,
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
          documentTypeError: "",
        },
      ]);
    }
  }, [allDocsData, editMode]);

  const handleFileChange = async (id: number, file: File | null) => {
    if (!file) {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === id
            ? {
                ...doc,
                file: null,
                s3Key: "",
                uploading: false,
                uploaded: false,
                fileError: "",
                isUpdated: doc.existingId ? true : doc.isUpdated,
              }
            : doc
        )
      );
      return;
    }
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              file: {
                name: file.name,
                size: `${(file.size / 1024).toFixed(1)}KB`,
                date: new Date().toLocaleDateString(),
                rawSize: file.size,
              },
              uploading: true,
              uploaded: false,
              fileError: "",
              isUpdated: doc.existingId ? true : doc.isUpdated,
            }
          : doc
      )
    );
    uploadFileToS3({ file, documentId: id });
  };

  const handleDocumentTypeSelect = (id: number, type: string) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              documentType: type,
              customType: type === "Other" ? doc.customType : "",
              documentTypeError: "",
              isUpdated: doc.existingId ? true : doc.isUpdated,
            }
          : doc
      )
    );
    if (type !== "Other") {
      setSearchValues((prev) => ({ ...prev, [id]: type }));
    }
    setShowDropdowns((prev) => ({ ...prev, [id]: false }));
  };

  const handleCustomTypeChange = (id: number, value: string) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              customType: value,
              documentType: "Other",
              documentTypeError: "",
              isUpdated: doc.existingId ? true : doc.isUpdated,
            }
          : doc
      )
    );
  };

  const handleSearchChange = (id: number, value: string) => {
    setSearchValues((prev) => ({ ...prev, [id]: value }));
    setShowDropdowns((prev) => ({ ...prev, [id]: true }));
    const position = calculateDropdownPosition(id);
    setDropdownPositions((prev) => ({ ...prev, [id]: position }));
    const currentDoc = documents.find((doc) => doc.id === id);
    if (
      currentDoc &&
      currentDoc.documentType !== "Other" &&
      value !== currentDoc.documentType
    ) {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === id
            ? {
                ...doc,
                documentType: "",
                customType: "",
                documentTypeError: "",
                isUpdated: doc.existingId ? true : doc.isUpdated,
              }
            : doc
        )
      );
    }
  };

  const handleDropdownToggle = (id: number) => {
    const newShowState = !showDropdowns[id];
    if (newShowState) {
      const position = calculateDropdownPosition(id);
      setDropdownPositions((prev) => ({ ...prev, [id]: position }));
    }
    setShowDropdowns((prev) => ({ ...prev, [id]: newShowState }));
  };

  const handleInputFocus = (id: number) => {
    const position = calculateDropdownPosition(id);
    setDropdownPositions((prev) => ({ ...prev, [id]: position }));
    setShowDropdowns((prev) => ({ ...prev, [id]: true }));
  };

  const removeDocument = (id: number) => {
    const doc = documents.find((d) => d.id === id);
    if (doc?.existingId) {
      toast.promise(deleteDocument(doc.existingId), {
        loading: TOAST_MESSAGES.DELETE_LOADING,
        success: TOAST_MESSAGES.DELETE_SUCCESS,
        error: TOAST_MESSAGES.DELETE_ERROR,
        action: {
          label: TOAST_MESSAGES.CLOSE_LABEL,
          onClick: () => toast.dismiss(),
        },
      });
    }
    setDocuments((docs) => docs.filter((doc) => doc.id !== id));
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
        documentTypeError: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    const documentsPayload = documents
      // .filter((doc) => doc.file && (doc.documentType || doc.customType))
      .map((doc) => {
        const file = doc.file;
        const fileType = file ? file.name.split(".").pop() || "unknown" : "";
        return {
          ...(doc.existingId && { id: doc.existingId }),
          case_id: Number(service_id),
          file_type: fileType,
          file_name: file ? file.name : "",
          file_size: file ? file.rawSize : 0,
          key: doc.s3Key || "",
          document_type: doc.customType || doc.documentType || "",
          remarks: remarks,
        };
      });
    mutateDocs({ docs: documentsPayload });
  };

  const handleDownloadDocument = (doc: any) => {
    if (doc.key) {
      setDownloadingDocId(doc.id);
      mutateDownloadFile({
        key: doc.key,
        file_name: doc.file?.name || "document",
      });
    } else {
      toast.error("Document key not available for download");
    }
  };

  const handleViewDocument = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast.error("No download URL available");
    }
  };

  const getFilteredDocumentTypes = (searchValue: string) => {
    if (!searchValue) return documentTypes;
    return documentTypes.filter((type) =>
      type.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const getDisplayValue = (document: DocumentItemWithId) => {
    if (document.documentType && document.documentType !== "Other") {
      return document.documentType;
    }
    if (document.documentType === "Other") {
      return "Other";
    }
    return "";
  };

  const handleClearSelection = (id: number) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              documentType: "",
              customType: "",
              documentTypeError: "",
              isUpdated: doc.existingId ? true : doc.isUpdated,
            }
          : doc
      )
    );
    setSearchValues((prev) => ({ ...prev, [id]: "" }));
  };

  const inputClasses =
    "w-full p-3 bg-gray-100 outline-none text-sm rounded-none border-none";
  const labelClasses = "block text-sm font-normal text-gray-700 mb-1";

  return (
    <div className="w-full max-w-none flex flex-col border-none overflow-hidden">
      <div className="w-full max-w-4xl mx-auto mt-2 bg-white">
        {allDocsData?.length > 0 && !isCurrentStageCompleted && !editMode && (
          <div className="flex justify-end ">
            <button
              onClick={() => {
                setEditMode(!editMode);
              }}
              className="bg-gray-800 text-white text-xs hover:bg-gray-900 rounded-none p-2 flex items-center cursor-pointer"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Documents
            </button>
          </div>
        )}
        {editMode || allDocsData?.length === 0 ? (
          <div className="p-2">
            <div className="space-y-3">
              <div className="max-h-[calc(100vh-258px)] bg-gray-50/80 p-2 2xl:p-3 overflow-y-auto">
                <div>
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="grid grid-cols-11 gap-2 2xl:gap-4 items-start mb-3"
                    >
                      <div className="col-span-5 space-y-2">
                        <label className={labelClasses}>Upload Document</label>
                        <div className="relative">
                          {document.file ? (
                            <div className="flex items-center px-4 py-1 bg-gray-100 relative">
                              <div className="w-5 h-5 mr-3 flex-shrink-0">
                                {document.uploading ? (
                                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                ) : document.uploaded ? (
                                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                ) : (
                                  <FileText className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div
                                  className="text-sm font-normal overflow-hidden w-32 whitespace-nowrap cursor-pointer text-ellipsis text-gray-900"
                                  title={document.file.name}
                                >
                                  {document.file.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {document.file.date
                                    ? dayjs(document.file.date).format(
                                        "DD MMM YYYY"
                                      )
                                    : null}{" "}
                                  |{" "}
                                  {(
                                    document.file.rawSize /
                                    (1024 * 1024)
                                  ).toFixed(2)}{" "}
                                  MB
                                </div>
                              </div>
                              {!document.uploading && (
                                <button
                                  onClick={() =>
                                    handleFileChange(document.id, null)
                                  }
                                  className="ml-3 w-5 h-5 text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="relative">
                              <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) =>
                                  handleFileChange(
                                    document.id,
                                    e.target.files?.[0] || null
                                  )
                                }
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                              <div className="flex items-center justify-center px-3 py-3 h-[44px] bg-gray-100 cursor-pointer hover:bg-gray-200 border-2 border-dashed border-gray-300">
                                <Upload className="w-3 h-3 mr-2 text-gray-400" />
                                <span className="text-sm text-gray-600 font-normal">
                                  Click to Upload File
                                </span>
                              </div>
                            </div>
                          )}
                          {document.fileError && (
                            <p className="text-red-500 text-xs mt-1">
                              {document.fileError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-5 space-y-2">
                        <label className={labelClasses}>
                          Select Document Type
                        </label>
                        <div
                          className="relative"
                          ref={setDropdownRef(document.id)}
                        >
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Search document type..."
                              value={
                                searchValues[document.id] ||
                                getDisplayValue(document)
                              }
                              onChange={(e) =>
                                handleSearchChange(document.id, e.target.value)
                              }
                              onFocus={() => handleInputFocus(document.id)}
                              className="w-full pl-2 2xl:px-4 py-3 bg-gray-100 text-sm outline-none pr-24"
                            />
                            {(document.documentType ||
                              searchValues[document.id]) && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleClearSelection(document.id)
                                }
                                className="absolute cursor-pointer inset-y-0 right-16 top-2.5 flex items-center justify-center w-6 h-6 hover:text-red-500"
                              >
                                <X className="h-4 w-4 text-gray-400 cursor-pointer" />
                              </button>
                            )}
                            <div className="absolute inset-y-0 right-8 top-2.5 flex items-center justify-center w-6 h-6 pointer-events-none">
                              <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDropdownToggle(document.id)}
                              className="absolute top-0 inset-y-0 right-0 flex items-center justify-center w-8 h-full"
                            >
                              <ChevronDown
                                className={`h-4 w-4 text-gray-400 transition-transform ${
                                  showDropdowns[document.id] ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>
                          {showDropdowns[document.id] && (
                            <div
                              className={cn(
                                "absolute z-50 w-full bg-white border border-gray-300 shadow-lg max-h-44 overflow-y-auto",
                                dropdownPositions[document.id] === "top"
                                  ? "bottom-full mb-1"
                                  : "top-full mt-1"
                              )}
                            >
                              {getFilteredDocumentTypes(
                                searchValues[document.id] || ""
                              ).length > 0 ? (
                                getFilteredDocumentTypes(
                                  searchValues[document.id] || ""
                                ).map((type) => (
                                  <div
                                    key={type}
                                    onClick={() =>
                                      handleDocumentTypeSelect(
                                        document.id,
                                        type
                                      )
                                    }
                                    className={cn(
                                      "flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm",
                                      document.documentType === type &&
                                        "bg-gray-50"
                                    )}
                                  >
                                    <span className="flex-1">{type}</span>
                                    {document.documentType === type && (
                                      <Check className="h-4 w-4 text-green-600" />
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">
                                  No document types found
                                </div>
                              )}
                            </div>
                          )}
                          {document.documentType === "Other" && (
                            <input
                              type="text"
                              value={document.customType}
                              onChange={(e) =>
                                handleCustomTypeChange(
                                  document.id,
                                  e.target.value
                                )
                              }
                              placeholder="Enter custom document type"
                              className={`${inputClasses} mt-2`}
                            />
                          )}
                          {document.documentTypeError && (
                            <p className="text-red-500 text-xs mt-1">
                              {document.documentTypeError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-end pt-6">
                        {allDocsData?.length !== 0 ? (
                          <button
                            onClick={() => removeDocument(document.id)}
                            className="w-11 h-11 cursor-pointer flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md transition-colors border border-gray-300"
                            disabled={document.uploading}
                          >
                            <DeleteStrokeIcon className="w-5 h-5" />
                          </button>
                        ) : (
                          documents.length !== 1 && (
                            <button
                              onClick={() => removeDocument(document.id)}
                              className="w-11 h-11 cursor-pointer flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md transition-colors border border-gray-300"
                              disabled={document.uploading}
                            >
                              <DeleteStrokeIcon className="w-5 h-5" />
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    onClick={addDocument}
                    // disabled={documents.length >= 5}
                    className={cn(
                      "inline-flex items-center px-4 py-2.5 text-sm font-normal text-gray-700 bg-white border border-gray-300 rounded-none focus:outline-none focus:ring-0 transition-colors cursor-pointer hover:bg-gray-50"
                    )}
                  >
                    <Plus className="w-4 h-4 mr-2 text-gray-600" />
                    Add Another Document
                  </button>
                </div>
                {maxDocsError && (
                  <p className="text-red-500 text-xs mt-1">{maxDocsError}</p>
                )}
                <div className="col-span-12 space-y-2 mt-4">
                  <label className={labelClasses}>Remarks</label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter remarks for the documents"
                    className={`${inputClasses} resize-none`}
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3 gap-2">
                {allDocsData?.length > 0 && !isCurrentStageCompleted && (
                  <div className="flex justify-end ">
                    <button
                      onClick={() => {
                        setEditMode(!editMode);
                        setDocuments([]);
                      }}
                      className="bg-transparent cursor-pointer border rounded-none active:scale-95 duration-300 transition-all  text-black font-medium text-sm 3xl:text-base px-4 py-0 h-8 outline-none focus:outline-none hover:bg-transparent"
                    >
                      {editMode && "Cancel"}
                    </button>
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  className="bg-black hover:bg-black  text-white cursor-pointer font-medium active:scale-95 duration-300 transition-all text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none"
                  disabled={
                    documents.some((doc) => doc.uploading) || isDocsPending
                  }
                >
                  {isDocsPending ? (
                    <span className="flex items-center">
                      {allDocsData?.length === 0
                        ? "Submitting..."
                        : "Updating..."}
                      <Loader2 className="animate-spin h-5 w-5 mx-1" />
                    </span>
                  ) : allDocsData?.length === 0 ? (
                    "Submit"
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2">
            <div className="bg-white overflow-hidden">
              <div className="overflow-x-auto max-h-[calc(100vh-380px)]">
                <table className="w-full">
                  <thead className="bg-black sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-normal text-white/80 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-normal text-white/80 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-normal text-white/80 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-normal text-white/80 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(allDocsData) &&
                      allDocsData.map((doc: any, index: number) => (
                        <tr
                          key={doc.id}
                          className={`hover:bg-gray-200 ${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {dayjs(doc.created_at).format("DD MMM YYYY")}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <div
                              className="text-ellipsis whitespace-nowrap w-32 cursor-pointer overflow-hidden"
                              title={doc?.file_name}
                            >
                              {doc?.file_name || "--"}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {doc.document_type}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <button
                              onClick={() =>
                                handleViewDocument(doc.download_url)
                              }
                              className="p-1 hover:bg-gray-300 rounded cursor-pointer"
                              title="View Document"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDownloadDocument(doc)}
                              disabled={isPendingDownloadFile}
                              className="p-1 hover:bg-gray-300 rounded transition-colors disabled:opacity-50 cursor-pointer"
                              title="Download Document"
                            >
                              {downloadingDocId === doc.id ? (
                                <Loader2 className="w-4 h-4 text-gray-600 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4 text-gray-600" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {allDocsData?.[0]?.remarks && (
              <div className="col-span-12 space-y-2 mt-4 flex flex-col p-4 pt-2">
                <div className="w-full text-sm font-normal text-gray-700 mb-1">
                  Remarks
                </div>
                <div className="bg-gray-50 p-2 max-h-16 overflow-y-auto overflow-x-hidden">
                  {allDocsData[0].remarks}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentTypeFileUpload;
