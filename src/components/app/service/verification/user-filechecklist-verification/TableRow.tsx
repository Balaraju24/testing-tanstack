import { Document } from "@/lib/interfaces/verification";
import dayjs from "dayjs";
import { Download, Eye, Loader2 } from "lucide-react";

const TableRow = ({
  doc,
  index,
  downloadingDocId,
  isPendingDownloadFile,
  onView,
  onDownload,
}: {
  doc: Document;
  index: number;
  downloadingDocId: number | null;
  isPendingDownloadFile: boolean;
  onView: (url: string) => void;
  onDownload: (doc: Document) => void;
}) => (
  <tr
    key={doc.id}
    className={`hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
  >
    <td className="px-4 py-3 text-sm text-gray-900">
      {dayjs(doc.created_at).format("DD MMM YYYY")}
    </td>
    <td className="px-4 py-3 text-sm text-gray-900">
      <div className="truncate w-32" title={doc?.file_name || "--"}>
        {doc?.file_name || "--"}
      </div>
    </td>
    <td className="px-4 py-3 text-sm text-gray-900">
      <div className="truncate w-32 cursor-pointer" title={doc.document_type}>
        {doc.document_type}
      </div>
    </td>
    <td className="px-4 py-3 text-sm text-gray-900">
      <div className="flex items-center gap-2">
        {/* View Button */}
        <button
          onClick={() => onView(doc.download_url)}
          className="p-1 hover:bg-gray-300 rounded transition-colors cursor-pointer"
          title="View Document"
        >
          <Eye className="w-4 h-4 text-gray-600" />
        </button>

        {/* Download Button */}
        <button
          onClick={() => onDownload(doc)}
          disabled={isPendingDownloadFile}
          className="p-1 hover:bg-gray-300 rounded transition-colors disabled:opacity-50 cursor-pointer"
          title="Download Document"
        >
          {downloadingDocId === doc.id ? (
            <Loader2 className="w-4 h-4 text-gray-600 animate-spin" />
          ) : (
            <Download className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
    </td>
  </tr>
);

export default TableRow;
