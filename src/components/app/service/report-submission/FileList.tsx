import ReportSubmissionsIcon from "@/components/icons/report-submission-icon";
import { FileListProps } from "@/lib/interfaces/getcasefiles";
import { Trash2 } from "lucide-react";

const FileList = ({
  files,
  isDeleting,
  removeFile,
  loading,
}: FileListProps) => (
  <div className="mt-6">
    <h2 className="text-sm font-medium text-gray-900 mb-3">
      Selected Files ({files.length})
    </h2>
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className={`flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200 transition-opacity ${
            isDeleting(file.id) ? "opacity-50" : ""
          }`}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <ReportSubmissionsIcon className="h-6 w-6" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {file.uploadDate} - {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => removeFile(file.id)}
            className={`p-1.5 rounded-md transition-colors ml-2 ${
              loading || isDeleting(file.id)
                ? "text-gray-400"
                : "text-red-500 hover:text-red-700 hover:bg-red-50"
            }`}
            title={
              loading
                ? "Cannot remove during submission"
                : isDeleting(file.id)
                  ? "Removing..."
                  : "Remove file"
            }
            disabled={loading || isDeleting(file.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default FileList;
