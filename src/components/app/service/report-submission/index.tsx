import { useCaseCompletion } from "@/components/context/CaseCompletion";
import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import NoCasesData from "@/components/icons/no-cases-data";
import {
  receivedDocumentsAPI,
  vettingDocumentsAPI,
} from "@/http/services/legalOpinion";
import { DynamicComponentProps } from "@/lib/interfaces/getcasefiles";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { useDocumentOperations } from "@/utils/hooks/useDocumentOperationsHook";
import { useFileHandling } from "@/utils/hooks/useFileHandlingHook";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ManageCaseHeader from "../ManageCaseHeader";
import DocumentList from "./DocumentList";
import FileList from "./FileList";
import FileUploadUI from "./FileUploadUI";

const ReportSubmissions = ({ stage, subStage }: DynamicComponentProps) => {
  const { service_id } = useParams({ strict: false });
  const navigate = useNavigate();
  const [localVettingState, setLocalVettingState] = useState(false);
  const [localReceivedState, setLocalReceivedState] = useState(false);
  const { isAdmin, isAdvocate } = useUserDetails();
  const { completeSubStage } = useCaseCompletion();

  const {
    allDocsIsFetching,
    allDocsData,
    setServiceData,
    serviceData,
    getCaseStagesRefetch,
    caseStagesData,
  } = UseContextAPI();
  const advocateName =
    `${serviceData?.advocate_cases?.[0]?.advocate?.first_name || ""} ${serviceData?.advocate_cases?.[0]?.advocate?.last_name || ""}`.trim();

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
    setIsDragOver,
  } = useFileHandling(service_id, stage, subStage);

  const { downloadingDocId, handleDownload } = useDocumentOperations(
    service_id,
    stage,
    subStage
  );

  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const hasExistingDocs = allDocsData?.length > 0;
  const showUploadUI =
    !hasExistingDocs && uploadedFiles.length === 0 && !isUser();
  const hasFinalDocs = allDocsData?.length > 1;
  const showFinalUploadUI =
    serviceData?.is_received_original_doc &&
    uploadedFiles.length === 0 &&
    !hasFinalDocs;

  const { mutate: mutateVettingDocument, isPending: isPendingVetting } =
    useMutation({
      mutationFn: async (vettingStatus: boolean) => {
        const response = await vettingDocumentsAPI(service_id!, {
          vetting_of_doc: vettingStatus,
          stage,
          sub_stage: subStage,
        });
        if (response?.status === 200 || response?.status === 201)
          return response.data;
        throw new Error("Failed to update vetting status");
      },
      onSuccess: async (data, vettingStatus) => {
        toast.success(data.message);
        setServiceData((prev: any) => ({
          ...prev,
          vetting_of_doc: vettingStatus,
        }));
        await getCaseStagesRefetch();
        completeSubStage(subStage!);
      },
      onError: (error: any, vettingStatus) => {
        setLocalVettingState(!vettingStatus);
        toast.error(error.message);
      },
    });

  const { mutate: mutateReceivedDocument, isPending: isPendingReceived } =
    useMutation({
      mutationFn: async (receivedStatus: boolean) => {
        const response = await receivedDocumentsAPI(service_id!, {
          is_received_original_doc: receivedStatus,
          stage,
          sub_stage: subStage,
        });
        if (response?.status === 200 || response?.status === 201)
          return response.data;
        throw new Error("Failed to update received status");
      },
      onSuccess: (data, receivedStatus) => {
        toast.success(data.message);
        setServiceData((prev: any) => ({
          ...prev,
          is_received_original_doc: receivedStatus,
        }));
      },
      onError: (error: any, receivedStatus) => {
        setLocalReceivedState(!receivedStatus);
        toast.error(error.message);
      },
    });

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFileSelect(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!isAnyOperationInProgress && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAnyOperationInProgress) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  useEffect(() => {
    setLocalVettingState(serviceData?.vetting_of_doc || false);
    setLocalReceivedState(serviceData?.is_received_original_doc || false);
  }, [serviceData?.vetting_of_doc, serviceData?.is_received_original_doc]);

  if (allDocsIsFetching) {
    return (
      <div className="h-full relative bg-white">
        <LoadingComponent
          loading={allDocsIsFetching}
          message="Loading documents..."
        />
      </div>
    );
  }

  return (
    <div className="h-full relative bg-white">
      <ManageCaseHeader
        caseStage={stage}
        caseSubStage={subStage}
        showActionButton={
          !isUser() &&
          (allDocsData?.length === 2 ||
            (allDocsData?.length === 1 &&
              isCurrentStageCompleted &&
              !localVettingState))
        }
        showUploadButton={false}
        showNoteButton={false}
      />
      <div className="px-4 py-2">
        {showUploadUI && (
          <FileUploadUI
            isDragOver={isDragOver}
            isAnyOperationInProgress={isAnyOperationInProgress}
            handleFileInput={handleFileInput}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
          />
        )}
        {!hasExistingDocs && isUser() && (
          <div className="flex flex-col justify-center items-center h-[calc(100vh-300px)]">
            <NoCasesData className="cursor-pointer w-80 h-50" />
            <div className="text-base 3xl:text-xl text-center font-light text-[#444] mx-auto">
              No report submissions found for this case.
            </div>
          </div>
        )}
        {hasExistingDocs && (
          <DocumentList
            documents={allDocsData.filter(
              (doc) => doc.category === "Legal Report Document"
            )}
            category="Legal Report Document"
            downloadingDocId={downloadingDocId}
            handleDownload={handleDownload}
          />
        )}
        {hasExistingDocs &&
          !(isCurrentStageCompleted && !serviceData?.vetting_of_doc) && (
            <div className="bg-blue-50 p-2 rounded mt-2">
              {serviceData?.vetting_of_doc ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    checked={localVettingState}
                    disabled
                  />
                  <span
                    className={`text-gray-700 ${isPendingVetting ? "opacity-70" : ""}`}
                  >
                    Requesting for vetting documents
                  </span>
                </div>
              ) : (
                <div className="flex justify-between items-center gap-2">
                  <span
                    className={`text-gray-700 ${isPendingVetting ? "opacity-70" : ""}`}
                  >
                    Requesting for vetting documents
                  </span>
                  {isPendingVetting ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => mutateVettingDocument(true)}
                        disabled={isPendingVetting}
                        className={`px-3 py-1 rounded text-sm cursor-pointer ${
                          localVettingState
                            ? "bg-blue-600 text-white"
                            : "bg-green-400 text-gray-700"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => mutateVettingDocument(false)}
                        disabled={isPendingVetting}
                        className={`px-3 py-1 rounded text-sm cursor-pointer ${
                          !localVettingState
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        {serviceData?.vetting_of_doc && (
          <div className="bg-blue-50 p-2 rounded mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              {isPendingReceived ? (
                <Loader2 className="w-5 h-5 text-black animate-spin" />
              ) : (
                <input
                  type="checkbox"
                  className=" text-black bg-white border-gray-300 rounded focus:ring-black focus:ring-2 accent-black"
                  checked={localReceivedState}
                  onChange={(e) => mutateReceivedDocument(e.target.checked)}
                  disabled={
                    isPendingReceived ||
                    !isAdvocate() ||
                    allDocsData?.length === 2
                  }
                />
              )}
              <div className="flex flex-col">
                <div
                  className={`text-gray-700 ${isPendingReceived ? "opacity-70" : ""}`}
                >
                  {!isAdvocate() && serviceData?.is_received_original_doc
                    ? `Received original documents by ${advocateName}`
                    : "Received original documents"}
                </div>
                {!isAdvocate() && !serviceData?.is_received_original_doc && (
                  <div className="text-[11px] 2xl:text-xs  text-gray-500">
                    Only advocates can perform this action
                  </div>
                )}
              </div>
            </label>
          </div>
        )}

        {showFinalUploadUI && isAdvocate() && (
          <FileUploadUI
            isDragOver={isDragOver}
            isAnyOperationInProgress={isAnyOperationInProgress}
            handleFileInput={handleFileInput}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
          />
        )}
        {serviceData?.is_received_original_doc && !showFinalUploadUI && (
          <DocumentList
            documents={allDocsData.filter(
              (doc) => doc.category === "Final Report Document"
            )}
            category="Final Report Document"
            downloadingDocId={downloadingDocId}
            handleDownload={handleDownload}
          />
        )}
        {uploadedFiles.length > 0 && (
          <>
            <FileList
              files={uploadedFiles}
              isDeleting={(id) => deletingFiles.has(id)}
              removeFile={removeFile}
              loading={loading}
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isAnyOperationInProgress}
                className={`px-3 py-1 text-sm rounded-md font-normal transition-colors cursor-pointer ${
                  isAnyOperationInProgress
                    ? "bg-gray-300 text-gray-500"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
                title={
                  loading
                    ? "Submitting files..."
                    : deletingFiles.size > 0
                      ? "Please wait for file removal to complete"
                      : "Submit files"
                }
              >
                {loading
                  ? "Submitting..."
                  : deletingFiles.size > 0
                    ? "Please Wait..."
                    : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportSubmissions;
