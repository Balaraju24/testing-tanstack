import { Download, Loader2 } from "lucide-react";
import dayjs from "dayjs";
import ReportSubmissionsIcon from "@/components/icons/report-submission-icon";
import { DocumentListProps } from "@/lib/interfaces/getcasefiles";

const DocumentList = ({
  documents,
  category,
  downloadingDocId,
  handleDownload,
}: DocumentListProps) => (
  <div className="mt-6">
    <h2 className="text-sm font-medium text-gray-900 mb-3">{category}</h2>
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <ReportSubmissionsIcon className="h-6 w-6" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {doc.file_name}
              </p>
              <div className="flex gap-2">
                <p className="text-xs text-gray-500">
                  {dayjs(doc.created_at).format("DD MMM YYYY")}
                </p>
                <p className="text-xs text-gray-500">
                  {(doc.file_size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleDownload(doc)}
            disabled={downloadingDocId === doc.id}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer border border-gray-300 hover:border-gray-400 transition-colors ml-2 disabled:opacity-50"
            title={
              downloadingDocId === doc.id ? "Downloading..." : "Download file"
            }
          >
            {downloadingDocId === doc.id ? (
              <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default DocumentList;
