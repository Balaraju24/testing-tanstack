import { UseContextAPI } from "@/components/context/Provider";
import {
  fileUploadAPI,
  uploadDocumentAPI,
  uploadToS3API,
} from "@/http/services/fileUpload";
import { UploadedFile } from "@/lib/interfaces/getcasefiles";
import { useState } from "react";
import { toast } from "sonner";

export const useFileHandling = (
  serviceId: string | undefined,
  stage: string,
  subStage: string
) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingFiles, setDeletingFiles] = useState<Set<number>>(new Set());

  const isAnyOperationInProgress = loading || deletingFiles.size > 0;
  const { getAllDocsRefetch, serviceData } = UseContextAPI();
  const handleFileSelect = async (files: FileList) => {
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
      "application/pdf",
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
        file_size: file.size,
      });

      const { target_url, file_key } = data?.data;
      if (!target_url) throw new Error("Presigned URL is missing");

      setUploadedFiles((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: file.name,
          size: file.size,
          uploadDate: new Date().toLocaleDateString("en-GB"),
          type: file.type,
          key: file_key,
          presignedUrl: target_url,
          file,
        },
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
          category: serviceData?.is_received_original_doc
            ? "Final Report Document"
            : "Legal Report Document",
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

  const removeFile = async (fileId: number) => {
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
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate cleanup
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
    setIsDragOver,
  };
};
