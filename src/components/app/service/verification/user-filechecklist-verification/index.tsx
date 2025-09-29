import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import { downloadSingleDocAPI } from "@/http/services/fileUpload";
import { Document, FileUploadProps } from "@/lib/interfaces/verification";
import { downloadFileFromS3 } from "@/utils/helpers/apiHelpers";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import ManageCaseHeader from "../../ManageCaseHeader";
import { SkeletonRow } from "../filechecklist-verification/SkeletonFileCheck";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function FileCheckVerification({
  stage,
  subStage,
  isLoading = false,
}: FileUploadProps) {
  const [downloadingDocId, setDownloadingDocId] = useState<number | null>(null);
  const { allDocsIsFetching, allDocsData } = UseContextAPI();

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

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <div className="overflow-x-auto max-h-96">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRow key={`skeleton-${index}`} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (allDocsData?.length === 0) {
      return (
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-normal leading-6 text-gray-900">
            No Documents Uploaded
          </h3>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto max-h-96">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {Array.isArray(allDocsData) &&
              allDocsData.map((doc: Document, index: number) => (
                <TableRow
                  key={doc.id}
                  doc={doc}
                  index={index}
                  downloadingDocId={downloadingDocId}
                  isPendingDownloadFile={isPendingDownloadFile}
                  onView={handleViewDocument}
                  onDownload={handleDownloadDocument}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="h-full relative">
      {allDocsIsFetching ? (
        <LoadingComponent
          loading={allDocsIsFetching}
          message="Loading documents..."
        />
      ) : (
        <>
          <ManageCaseHeader
            caseStage={stage}
            caseSubStage={subStage}
            showActionButton={false}
            showUploadButton={false}
          />
          <div className="p-2 w-full h-max-[calc(100%-60px)] overflow-auto">
            <div className="bg-white overflow-hidden">
              {renderTableContent()}
            </div>
          </div>

          {isLoading ? (
            <div className="col-span-12 space-y-2 mt-4 flex flex-col p-4 pt-2">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="bg-gray-50 p-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            allDocsData?.length > 0 &&
            allDocsData[0]?.remarks && (
              <div className="col-span-12 space-y-2 mt-4 flex flex-col p-4 pt-2">
                <div className="w-full text-sm font-normal text-gray-700 mb-1">
                  Remarks
                </div>
                <div className="bg-gray-50 p-2 text-gray-700 text-xs 2xl:text-sm">
                  {allDocsData[0].remarks}
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
