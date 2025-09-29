import { FileUploadUIProps } from "@/lib/interfaces/getcasefiles";
import { Upload } from "lucide-react";

const FileUploadUI = ({
  isDragOver,
  isAnyOperationInProgress,
  handleFileInput,
  handleDrop,
  handleDragOver,
  handleDragLeave,
}: FileUploadUIProps) => (
  <div
    className={`border-2 border-dashed rounded-lg p-6 mt-4 text-center transition-colors ${
      isDragOver && !isAnyOperationInProgress
        ? "border-blue-400 bg-blue-50"
        : isAnyOperationInProgress
          ? "border-gray-200 bg-gray-50 opacity-50"
          : "border-gray-300 hover:border-gray-400"
    }`}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
  >
    <Upload
      className={`mx-auto h-8 w-8 mb-3 ${isAnyOperationInProgress ? "text-gray-300" : "text-gray-400"}`}
    />
    <p
      className={`text-sm mb-1 ${isAnyOperationInProgress ? "text-gray-400" : "text-gray-600"}`}
    >
      {isAnyOperationInProgress
        ? "Please wait for current operation to complete"
        : "Click to upload or drag and drop"}
    </p>
    {!isAnyOperationInProgress && (
      <p className="text-xs text-gray-500 mb-4">
        JPEG, PNG, JPG, WEBP and PDF (Max 50MB)
      </p>
    )}
    <label className="inline-block">
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        onChange={handleFileInput}
        className="hidden"
        disabled={isAnyOperationInProgress}
      />
      <span
        className={`bg-white border border-gray-300 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
          isAnyOperationInProgress
            ? "opacity-50 text-gray-400"
            : "text-gray-700 hover:bg-gray-50 cursor-pointer"
        }`}
      >
        {isAnyOperationInProgress ? "Please Wait..." : "Choose File"}
      </span>
    </label>
  </div>
);

export default FileUploadUI;
