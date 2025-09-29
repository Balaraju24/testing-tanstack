import { useMutation } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import React, { useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";

import LoadingComponent from "@/components/core/Loading";
import {
  fileUploadAPI,
  updateDocumentAPI,
  uploadDocumentAPI,
  uploadToS3API,
} from "@/http/services/fileUpload";
import { sliceFilename } from "@/utils/helpers/manage";
import { FileUploadProps } from "@/lib/interfaces/files";
import { FileUploadDialog } from "./FileUploadDialog";

const FileUpload = ({
  refetch,
  documentId,
  category,
  loading2,
  setLoading2,
  children,
}: any) => {
  const { service_id } = useParams({ strict: false });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [previewThumbnail, setPreviewThumbnail] = useState<null | string>(null);
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const stage = search.stage;
  const subStage = search.sub_stage;

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const file = acceptedFiles[0];
    if (file?.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }
    if (fileRejections.length > 0) {
      toast.warning(`Unsupported file type is uploaded`, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    }

    setSelectedFile(file);
    setRejectionMessage(null);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    if (acceptedFiles[0]?.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        generateThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewThumbnail(url);
    }

    setIsDialogOpen(true);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const message = rejectedFiles
      .map(({ file, errors }: any) =>
        errors.map((error: any) => {
          if (error.code === "file-invalid-type") {
            return `File "${file.name}" has an unsupported type.`;
          }
          return `File "${file.name}" was rejected. Reason: ${error.message}`;
        })
      )
      .flat()
      .join(", ");

    toast.message(message);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"],
    },
    multiple: false,
    noClick: true,
  });

  const handleConfirmUpload = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile, documentId);
    }
    setIsDialogOpen(false);
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (previewThumbnail) {
      URL.revokeObjectURL(previewThumbnail);
      setPreviewThumbnail(null);
    }
    setIsDialogOpen(false);
  };

  const handleFileUpload = (file: File, documentId?: number) => {
    getPresignedUrls({ file, documentId });
  };

  const { mutate: getPresignedUrls } = useMutation({
    mutationFn: async ({
      file,
      documentId,
    }: {
      file: File;
      documentId?: number;
    }) => {
      setLoading2 && setLoading2(true);
      const fileType = file.name.split(".").pop();
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
      });
      const { target_url, file_key } = data?.data;
      if (!target_url) {
        throw new Error("Presigned URL is missing");
      }

      await uploadTos3({ url: target_url, file });

      return {
        documentId,
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
        key: file_key,
      };
    },
    onSuccess: async ({ file_name, file_type, file_size, key, documentId }) => {
      const payload = {
        case_id: Number(service_id),
        file_name,
        file_type,
        file_size,
        key,
        case_stage: stage,
        case_sub_stage: subStage,
        category,
      };

      if (documentId) {
        updateDocumentMutation.mutate({ documentId, payload });
      } else {
        uploadDocsMutation.mutate(payload);
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      if (previewThumbnail) {
        URL.revokeObjectURL(previewThumbnail);
        setPreviewThumbnail(null);
      }
    },
    onError: (error: any) => {
      if (
        error.response?.status === 422 &&
        error.response?.data?.errData?.file_size
      ) {
        toast.message(error.response.data.errData.file_size[0]);
      } else {
        toast.error("Failed to upload file.", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
      }
    },
  });

  const uploadTos3 = async ({ url, file }: { url: string; file: File }) => {
    try {
      const response = await uploadToS3API(url, file);
      if (response.status === 200 || response.status === 201) {
      } else {
        throw response;
      }
    } catch (error) {}
  };

  const uploadDocsMutation = useMutation({
    mutationFn: async (payload: any) => {
      try {
        const response = await uploadDocumentAPI(payload);
        if (response.data?.status === 200 || response.data?.status === 201) {
          toast.success("File uploaded successfully", {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          });
          refetch();
          return response;
        } else {
          throw new Error("Failed to upload ");
        }
      } catch (error) {
        toast.error("Failed to upload.", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
      }
    },
  });

  const updateDocumentMutation = useMutation({
    mutationFn: async ({
      documentId,
      payload,
    }: {
      documentId: number;
      payload: any;
    }) => {
      try {
        const response = await updateDocumentAPI({
          docId: documentId,
          payload,
        });

        if (response.data?.status === 200 || response.data?.status === 201) {
          toast.success("File uploaded successfully", {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          });
          refetch();
          return response;
        } else {
          throw new Error("Failed to update document");
        }
      } catch (error) {
        toast.error("Failed to update document.", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
      }
    },
  });

  const generateThumbnail = async (base64String: string) => {
    try {
      // Remove base64 prefix if it exists
      const base64Data = base64String.split(",")[1] || base64String;
      const pdfBytes = Uint8Array.from(atob(base64Data), (c) =>
        c.charCodeAt(0)
      );

      // Load PDF
      const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
      const pdf = await loadingTask.promise;

      // Get first page
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });

      // Create a canvas to render
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvas, canvasContext: context!, viewport }).promise;

      setPreviewThumbnail(canvas.toDataURL("image/png"));
    } catch (error) {
      console.error("Error generating PDF thumbnail:", error);
    }
  };

  const getFilePreview = () => {
    if (!selectedFile || !previewUrl) return null;

    const fileType = selectedFile.type;
    const fileName = selectedFile.name;

    if (fileType.startsWith("image/")) {
      return (
        <div className="flex flex-col items-center">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-64 max-w-full object-contain"
          />
        </div>
      );
    }
    if (fileType === "application/pdf") {
      return (
        <div className="flex flex-col items-center">
          {previewThumbnail ? (
            <img
              src={previewThumbnail}
              className="w-80 h-80 object-contain"
              alt="PDF Preview"
            />
          ) : (
            <div className="bg-gray-100 p-6 mt-4">
              <div className="flex items-center justify-center">
                <File size={70} />
              </div>
              <p className="text-base mt-4">No Preview Available</p>
              <div className="text-sm text-gray-500 flex items-center justify-center">
                {selectedFile && (
                  <p>{Math.round(selectedFile.size / 1024)} KB - PDF</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <div className="text-sm flex items-center justify-center">
          {sliceFilename(selectedFile?.name, 25)}
        </div>
        <div className="bg-gray-100 p-6 mt-4">
          <div className="flex items-center justify-center">
            <File size={70} />
          </div>
          <p className="text-base mt-4">No Preview Available</p>
          <div className="text-sm text-gray-500 flex items-center justify-center">
            {selectedFile && (
              <p>
                {Math.round(selectedFile.size / 1024)} KB -{" "}
                {selectedFile.type.split("/")[1]?.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="upload-attachments" className="w-full">
      <div className="w-full py-0 flex justify-between items-center">
        <Button
          type="button"
          onClick={open}
          variant="default"
          size="default"
          className="h-fit w-full px-0 [&_svg]:w-[unset] [&_svg]:h-[unset] py-0 text-sm bg-transparent rounded-none hover:bg-transparent cursor-pointer"
        >
          {children}
        </Button>
      </div>

      <div>
        <div {...getRootProps()} className="hidden">
          <input {...getInputProps()} />
        </div>

        {rejectionMessage && (
          <p className="text-red-600 mt-2">{rejectionMessage}</p>
        )}
      </div>

      <FileUploadDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        selectedFile={selectedFile}
        getFilePreview={getFilePreview}
        handleCancelUpload={handleCancelUpload}
        handleConfirmUpload={handleConfirmUpload}
      />

      <LoadingComponent
        loading={loading2 ?? false}
        message="Loading..."
        className="bg-white"
      />
    </div>
  );
};

export default FileUpload;
