import { Button } from "@/components/ui/button";
import { fileUploadAPI, uploadToS3API } from "@/http/services/fileUpload";
import { RecordFileUploadProps } from "@/lib/interfaces/files";
import { useMutation } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const RecordFileUpload: React.FC<RecordFileUploadProps> = ({
  sendAttachment,
  setLoading2,
}) => {
  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB.", {
        action: {
          label: "✕",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      return;
    }

    handleFileUpload(acceptedFiles[0]);
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

    toast.error(message, {
      action: {
        label: "✕",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
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

  const { mutate: getPresignedUrls, isPending: uploadFile } = useMutation({
    mutationFn: async ({ file }: { file: any }) => {
      setLoading2 && setLoading2(true);
      const fileType = file.name.split(".").pop();
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
      });
      const { target_url, file_key, file_type } = data?.data;
      if (!target_url) {
        throw new Error("Presigned URL is missing");
      }

      await uploadTos3({ url: target_url, file, file_key, file_type });

      return {
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
        key: file_key,
      };
    },
    onSuccess: async ({ key, file_name, file_size, file_type }) => {
      sendAttachment(key, file_name, file_size, file_type);
      setLoading2 && setLoading2(false);
    },
    onError: () => {
      setLoading2 && setLoading2(false);
    },
  });

  const handleFileUpload = (file: any) => {
    toast.promise(
      new Promise((resolve, reject) => {
        getPresignedUrls(
          { file },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error),
          }
        );
      }),
      {
        loading: "Uploading file...",
        success: () => {
          return "File uploaded successfully";
        },
        error: (err) => {
          if (
            err.response?.status === 422 &&
            err.response?.data?.errData?.file_size
          ) {
            return err.response.data.errData.file_size[0];
          }
          return "Failed to upload file";
        },
      }
    );
  };

  const uploadTos3 = async ({ url, file }: any) => {
    try {
      const response = await uploadToS3API(url, file);
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div id="upload-attachments" className="w-full">
      <div className=" w-full py-0 flex justify-between items-center">
        <Button
          type="button"
          onClick={open}
          variant="default"
          size="default"
          className="h-fit w-full px-0 py-0 text-sm bg-transparent rounded-none hover:bg-transparent text-white"
        >
          <Upload className="stroke-black " />
          <span className="font-primary text-black">Upload File</span>
        </Button>
      </div>

      <div>
        <div {...getRootProps()} className="hidden">
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
};

export default RecordFileUpload;
