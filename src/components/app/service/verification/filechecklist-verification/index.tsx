import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import {
  documentApprovalAPI,
  downloadSingleDocAPI,
} from "@/http/services/fileUpload";
import { Document, FileUploadProps } from "@/lib/interfaces/verification";
import { downloadFileFromS3 } from "@/utils/helpers/apiHelpers";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Download, Eye, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import ManageCaseHeader from "../../ManageCaseHeader";
import TableHeader from "../user-filechecklist-verification/TableHeader";
import { SkeletonRow } from "./SkeletonFileCheck";

export default function FileCheckVerification({
  stage,
  subStage,
  isLoading = false,
}: FileUploadProps) {
  const { allDocsIsLoading, allDocsData, caseStagesData, getAllDocsRefetch } =
    UseContextAPI();
  const [acceptedDocs, setAcceptedDocs] = useState<Set<number>>(new Set());
  const [downloadingDocId, setDownloadingDocId] = useState<number | null>(null);
  const [acceptDocId, setAcceptDocId] = useState<number | null>(null);
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  // Download mutation
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

  // Accept document mutation
  const { mutate: mutateAcceptDocument, isPending: isPendingAccept } =
    useMutation({
      mutationFn: async (docId: number) => {
        const payload = {
          verification_status: "APPROVED",
          case_stage: stage,
          case_sub_stage: subStage,
        };

        const response = await documentApprovalAPI({
          payload,
          doc_id: docId,
        });

        if (response?.status === 200 || response?.status === 201) {
          return response.data;
        } else {
          throw new Error("Failed to accept document");
        }
      },
      onSuccess: (data, docId) => {
        toast.success("Document accepted successfully");
        setAcceptedDocs((prev) => new Set(prev).add(docId));
        // You can add refetch logic here if needed
        getAllDocsRefetch();
      },

      onError: () => {
        toast.error("Failed to accept document");
      },
    });

  const handleViewDocument = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.error("No download URL available");
    }
  };

  const handleDownloadDocument = (doc: any) => {
    if (doc.key) {
      setDownloadingDocId(doc.id);
      mutateDownloadFile({
        key: doc.key,
        file_name: doc.file_name,
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
      (doc: Document) => doc.verification_status === "APPROVED"
    );
  }, [allDocsData]);

  const handleAcceptDocument = (docId: number) => {
    setAcceptDocId(docId);
    mutateAcceptDocument(docId);
  };

  const renderTableContent = () => {
    // Show skeleton while loading
    if (isLoading) {
      return (
        <div className="overflow-x-auto max-h-96">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {/* Render 5 skeleton rows */}
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRow key={`skeleton-${index}`} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Show empty state
    if (!Array.isArray(allDocsData) || allDocsData?.length === 0) {
      return (
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-normal leading-6 text-gray-900">
            No Documents Uploaded
          </h3>
        </div>
      );
    }

    // Show actual data
    return (
      <div className="overflow-x-auto max-h-96">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {Array.isArray(allDocsData) &&
              allDocsData?.map((doc: Document, index: number) => (
                <tr
                  key={doc.id}
                  className={`hover:bg-gray-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {dayjs(doc.created_at).format("DD MMM YYYY")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div
                      className="truncate w-32"
                      title={doc?.file_name || "--"}
                    >
                      {doc?.file_name || "--"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div
                      className="truncate w-32 cursor-pointer"
                      title={doc.document_type}
                    >
                      {doc.document_type}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleViewDocument(doc.download_url)}
                        className="p-1 hover:bg-gray-300 cursor-pointer rounded transition-colors"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>

                      <button
                        onClick={() => handleDownloadDocument(doc)}
                        disabled={isPendingDownloadFile}
                        className="p-1 hover:bg-gray-300 cursor-pointer rounded transition-colors disabled:opacity-50"
                        title="Download Document"
                      >
                        {downloadingDocId === doc.id ? (
                          <Loader2 className="w-4 h-4 text-gray-600 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                      {acceptedDocs.has(doc.id) ||
                      doc?.verification_status === "APPROVED" ? (
                        <button
                          className="px-2 py-1 bg-green-600 text-white text-xs rounded flex items-center gap-1 cursor-default"
                          title="Document Accepted"
                        >
                          Accepted
                        </button>
                      ) : (
                        !isCurrentStageCompleted && (
                          <button
                            onClick={() => handleAcceptDocument(doc.id)}
                            disabled={isPendingAccept}
                            className="px-2 py-1 bg-white w-18 cursor-pointer hover:bg-gray-300  border border-gray-200 text-gray-700 text-xs rounded transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                            title="Accept Document"
                          >
                            {acceptDocId === doc.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              "Accept"
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="h-full relative">
      {allDocsIsLoading ? (
        <LoadingComponent
          loading={allDocsIsLoading}
          message="Loading documents..."
        />
      ) : (
        <>
          <ManageCaseHeader
            caseStage={stage}
            caseSubStage={subStage}
            showActionButton={!!allDocumentsApproved}
            showUploadButton={false}
            showNoteButton={false}
          />

          {!Array.isArray(allDocsData) || allDocsData?.length === 0 ? (
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-normal leading-6 text-gray-900">
                No Documents Uploaded
              </h3>
            </div>
          ) : (
            <div className="w-full overflow-auto">
              <div className="p-2 h-max-[calc(100%-60px)] w-full overflow-auto">
                <div className="bg-white overflow-hidden">
                  {renderTableContent()}
                </div>
              </div>

              {!isLoading &&
                Array.isArray(allDocsData) &&
                allDocsData?.[0]?.remarks && (
                  <div className="col-span-12 space-y-2 mt-4 flex flex-col p-4 pt-2">
                    <div className="w-full text-sm font-normal text-gray-900 mb-1">
                      Remarks
                    </div>
                    <div className="bg-gray-50 p-2 text-gray-700 text-xs 2xl:textsm">
                      {allDocsData[0].remarks}
                    </div>
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
