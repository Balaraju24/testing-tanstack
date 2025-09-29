import DragDropIcon from "@/components/icons/drag-drop-icon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadImagesComponentProps } from "@/lib/interfaces/files";
import { bytesToMB } from "@/utils/helpers/files";
import { CheckCircle, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadFiles: React.FC<uploadImagesComponentProps> = ({
  handleFileChange,
  multipleFiles,
  fileProgress,
  fileErrors,
  setMultipleFiles,
  setFileProgress,
  resumeUpload,
  abortFileUpload,
  uploadProgressStart,
  fileTitles,
  setFileTitles,
  selectedCategoryId,
  from,
  setFileErrors,
  startUploading,
  setStartUploading,
}) => {
  const [file, setFile] = useState<File[]>([]);
  const MULTIPART_THRESHOLD = 39558800;

  const allFilesUploaded =
    multipleFiles.length > 0 &&
    multipleFiles.every((_, index) => fileProgress[index] === 100);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile((prevFiles) => [...prevFiles, ...acceptedFiles]);

      setFileProgress((prevProgress) => {
        const newProgress = { ...prevProgress };
        const currentLength = Object.keys(prevProgress).length;
        acceptedFiles.forEach((file, index) => {
          const newIndex = currentLength + index;
          newProgress[newIndex] = 0;
        });
        return newProgress;
      });

      handleFileChange(acceptedFiles, false);
      setFileTitles((prev: any) => [
        ...prev,
        ...Array(acceptedFiles.length).fill(""),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      // "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"],
    },
    disabled: startUploading,
  });

  const dropzoneClass = startUploading
    ? "bg-gray-300 cursor-not-allowed"
    : "bg-gray-100 cursor-pointer";

  const removeFileAfterAdding = (index?: number) => {
    if (index !== undefined) {
      // Remove single file
      const updatedFiles = multipleFiles.filter((_, i) => i !== index);
      const updatedTitles = fileTitles.filter((_: any, i: any) => i !== index);

      setFileProgress((prevProgress) => {
        const newProgress = { ...prevProgress };
        delete newProgress[index];

        const shiftedProgress: any = {};
        Object.keys(newProgress).forEach((key: any) => {
          const currentIndex = parseInt(key);
          shiftedProgress[
            currentIndex > index ? currentIndex - 1 : currentIndex
          ] = newProgress[key];
        });

        return shiftedProgress;
      });

      setMultipleFiles(updatedFiles);
      setFileTitles(updatedTitles);
      abortFileUpload(index);
    } else {
      // Clear all files
      setMultipleFiles([]);
      setFileTitles([]);
      setFileProgress({});
      setFileErrors([]);
      file.forEach((_, i) => abortFileUpload(i)); // abort each file upload
      setFile([]); // clear local state too
    }
  };

  const retryUpload = (file: File, index: number) => {
    resumeUpload(file, index);
  };

  const handleTitleChange = (index: number, title: string) => {
    const updatedTitles = [...fileTitles];
    updatedTitles[index] = title;
    setFileTitles(updatedTitles);
  };

  const allTitlesProvided = fileTitles.every(
    (title: any) => title.trim() !== ""
  );

  const handleCancelUpload = (index: number) => {
    setFileErrors((prev: any) => [
      ...prev,
      {
        file: { name: multipleFiles[index].name } as File,
        id: index,
        reason: "Upload Canceled",
      },
    ]);

    setFileProgress((prevProgress) => {
      const newProgress = { [index]: 0 };
      delete newProgress[0];

      const shiftedProgress: any = {};
      Object.keys(newProgress).forEach((key: any) => {
        const currentIndex = parseInt(key);
        shiftedProgress[
          currentIndex > index ? currentIndex - 1 : currentIndex
        ] = newProgress[key];
      });

      return shiftedProgress;
    });
    abortFileUpload(index);
  };

  return (
    <div className="p-4 bg-white rounded-lg ">
      <div className="mb-4  ">
        <div
          {...getRootProps({
            className: `dropzone border-2  border-dashed border-gray-400 p-6 rounded-md cursor-pointer hover:border-gray-600   ${dropzoneClass}`,
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-600">Drop the file here ...</p>
          ) : (
            <div className="flex flex-col items-center gap-y-2 text-center">
              <DragDropIcon />
              <p className="text-base font-medium">
                Choose a file or drag and drop it here
              </p>
              <p className="text-red-600 font-light text-xs flex justify-center items-center">
                Accept only JPEG, PNG, JPG, WEBP and PDF format files. File size
                must be less than 50 MB
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 max-h-[calc(100vh-330px)] overflow-auto">
        {multipleFiles.map((item: File, index: number) => {
          const isMultipart = item.size > MULTIPART_THRESHOLD;
          const error = fileErrors.find((error: any) => error.id === index);

          return (
            <div className="flex mb-2 p-2 bg-gray-100 rounded-md" key={index}>
              <div className="flex-1 ">
                <p className="text-sm font-medium">
                  {item.name.length > 15
                    ? `${item.name.slice(0, 12)}...`
                    : item.name}{" "}
                  <span className="text-gray-500">({item.type})</span>
                </p>
                <Progress
                  value={fileProgress[index]}
                  className="my-1 h-2 bg-gray-300"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {fileProgress[index]?.toFixed(2)}%
                  </span>
                  {error ? (
                    <div className="text-red-500 text-xs">
                      {error.reason || "Upload Failed"}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">
                      {bytesToMB(item.size).toFixed(2)} MB
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="flex ">
                  {fileProgress[index] === 100 ? (
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      (removeFileAfterAdding(index), setStartUploading(false));
                    }}
                    className="ml-2 hover:bg-black  h-fit py-1 bg-black text-white rounded-none px-1 cursor-pointer"
                    disabled={
                      allFilesUploaded ||
                      (!selectedCategoryId && from === "sidebar")
                    }
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {!(multipleFiles.length === 0) && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button
            onClick={() => removeFileAfterAdding()}
            className="rounded-none h-fit py-1 hover:bg-black bg-black text-white cursor-pointer"
            disabled={
              allFilesUploaded ||
              startUploading ||
              (!selectedCategoryId && from === "sidebar")
            }
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              uploadProgressStart();
            }}
            disabled={
              allFilesUploaded ||
              startUploading ||
              (!selectedCategoryId && from === "sidebar")
            }
            className="rounded-none h-fit py-1 hover:bg-black bg-black text-white cursor-pointer"
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;
