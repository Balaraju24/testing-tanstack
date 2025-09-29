import { Button } from "@/components/ui/button";
import { fileUploadAPI, uploadToS3API } from "@/http/services/fileUpload";
import { MAX_FILE_SIZE_MB } from "@/lib/constants/file";
import { UpdateImageProps } from "@/lib/interfaces/files";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ProfileUpload: React.FC<UpdateImageProps> = ({
  onFileKeyGenerated,
  previewImage,
  setPreviewImage,
}) => {
  const { advocate_id } = useParams({ strict: false });
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setRejectionMessage(null);
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setRejectionMessage(
        `File exceeds the maximum size of ${MAX_FILE_SIZE_MB}MB.`
      );
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setPreviewImage(fileUrl);
    handleFileUpload(file);
  };

  const onDropRejected = (rejectedFiles: any) => {
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

    setRejectionMessage(message);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    noClick: true,
    maxFiles: 1,
  });

  const { mutate: getPresignedUrls } = useMutation({
    mutationFn: async (file: File) => {
      setIsUploading(true);
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

      await uploadToS3({
        url: target_url,
        file,
      });

      return {
        filename: file.name,
        file_type: fileType,
        file_size: file.size,
        key: file_key,
      };
    },
    onSuccess: async ({ key }) => {
      onFileKeyGenerated?.(key);
      setIsUploading(false);
    },
    onError: (error: any) => {
      setIsUploading(false);
      setRejectionMessage("Failed to upload file. Please try again.");
    },
  });

  const uploadToS3 = async ({ url, file }: { url: string; file: File }) => {
    try {
      const response = await uploadToS3API(url, file);
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleFileUpload = (file: File) => {
    getPresignedUrls(file);
  };

  return (
    <div id="upload-attachments">
      <div className="py-0 flex justify-center items-center">
        <Button
          type="button"
          onClick={open}
          variant="default"
          size="default"
          className="h-7 cursor-pointer px-4 py-1 bg-gray-300 active:scale-95 transition-all duration-300 ease-in-out rounded-none hover:bg-gray-300"
          disabled={isUploading}
        >
          <PlusIcon />
          {advocate_id ? (
            <span className="">Change</span>
          ) : (
            <span className="">Upload</span>
          )}
        </Button>
      </div>

      <div>
        <div {...getRootProps()} className="hidden">
          <input {...getInputProps()} />
        </div>

        {rejectionMessage && (
          <p className="text-red-500 text-xs mt-2">{rejectionMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileUpload;
