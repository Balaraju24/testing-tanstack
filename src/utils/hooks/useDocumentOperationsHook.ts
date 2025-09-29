import { downloadSingleDocAPI } from "@/http/services/fileUpload";
import { downloadFileFromS3 } from "@/utils/helpers/apiHelpers";
import { ExistingDocument } from "@/lib/interfaces/getcasefiles";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useDocumentOperations = (
  serviceId: string | undefined,
  stage: string,
  subStage: string
) => {
  const [downloadingDocId, setDownloadingDocId] = useState<number | null>(null);

  const { mutate: mutateDownloadFile, isPending: isPendingDownloadFile } =
    useMutation({
      mutationFn: async (payload: { key: string; file_name: string }) => {
        const response = await downloadSingleDocAPI({ file_key: payload.key });
        if (
          response?.data?.status === 200 &&
          response?.data?.data?.download_url
        ) {
          downloadFileFromS3(
            response.data.data.download_url,
            payload.file_name
          );
        } else {
          throw new Error("Invalid response or download URL");
        }
      },
      onError: () => toast.error("Failed to download attachment"),
      onSettled: () => setDownloadingDocId(null),
    });

  const handleDownload = (doc: ExistingDocument) => {
    if (doc.key) {
      setDownloadingDocId(doc.id);
      mutateDownloadFile({ key: doc.key, file_name: doc.file_name });
    } else {
      toast.error("Document key not available for download");
    }
  };

  return { downloadingDocId, isPendingDownloadFile, handleDownload };
};
