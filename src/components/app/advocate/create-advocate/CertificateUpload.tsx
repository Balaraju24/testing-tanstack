import DeleteStrokeIcon from "@/components/icons/delete-stroke-icon";
import { Button } from "@/components/ui/button";
import { fileUploadAPI, uploadToS3API } from "@/http/services/fileUpload";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from "@/lib/constants/file";
import { UpdateCertificateProps } from "@/lib/interfaces/files";
import { useMutation } from "@tanstack/react-query";
import { Loader2, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

const CertificateUpload: React.FC<UpdateCertificateProps> = ({
  onFileKeyGenerated,
}) => {
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<
    { filename: string; fileKey: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setRejectionMessage(null);
    acceptedFiles.forEach((file) => {
      const fileType = `.${file.name.split(".").pop()?.toLowerCase()}`;

      if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        setRejectionMessage(`File "${file.name}" has an unsupported type.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setRejectionMessage(
          `${file.name} file exceeds the maximum size of 5MB`
        );
      } else {
        handleFileUpload(file);
      }
    });
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const message = rejectedFiles
      .map(({ file, errors }) =>
        errors.map((error) => {
          if (error.code === "file-invalid-type") {
            return `File "${file.name}" has an unsupported type.`;
          }
          return `File "${file.name}" was rejected. Reason: ${error.message}`;
        })
      )
      .flat()
      .join(", ");
    setRejectionMessage(message);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".pdf"],
    },
    noClick: true,
  });

  const { mutate: getPresignedUrls } = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
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
      return { filename: file.name, fileKey: file_key };
    },
    onSuccess: ({ fileKey, filename }) => {
      setIsUploading(false);
      setUploadedFiles((prevFiles) => [...prevFiles, { filename, fileKey }]);
      if (onFileKeyGenerated) {
        onFileKeyGenerated(fileKey);
      }
    },
    onError: (error) => {
      setIsUploading(false);
    },
  });

  const uploadTos3 = async ({ url, file }: { url: string; file: File }) => {
    try {
      const response = await uploadToS3API(url, file);
      if (!(response.status === 200 || response.status === 201)) {
        throw response;
      }
    } catch (error) {}
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    getPresignedUrls({ file });
  };

  const handleRemoveFile = (fileKey: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.fileKey !== fileKey)
    );
  };

  return (
    <div id="upload-attachments">
      <div className="py-0 flex w-full justify-between items-center">
        {uploadedFiles.length === 0 && (
          <Button
            type="button"
            onClick={open}
            variant="default"
            size="default"
            className="rounded-none cursor-pointer h-9 w-full active:scale-95 transition-all duration-300 ease-in-out  bg-slate-100 hover:bg-slate-100"
          >
            <span className="font-primary">
              {isUploading ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <div className="flex gap-1">
                  <PlusIcon />
                  Upload a Certificate
                </div>
              )}
            </span>
          </Button>
        )}

        {uploadedFiles.map((file) => (
          <div
            key={file.fileKey}
            className="flex items-center justify-between w-full bg-slate-100 p-2 rounded-md"
          >
            <span className="font-medium text-gray-800">{file.filename}</span>
            <button
              onClick={() => handleRemoveFile(file.fileKey)}
              className="text-red-500 hover:text-red-700 ml-2 font-semibold"
            >
              <DeleteStrokeIcon />
            </button>
          </div>
        ))}
      </div>

      <div>
        <div {...getRootProps()} className="hidden">
          <input {...getInputProps()} />
        </div>

        {rejectionMessage && (
          <p className="text-red-500 text-xs mt-1">{rejectionMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CertificateUpload;
