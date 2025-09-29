import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import FilePdfIcon from "@/components/icons/file-pdf-icon";
import Docsicon from "@/components/icons/docs-icon";
import FileFilesIcon from "@/components/icons/file-files-icon";
import FileSpreadsheatIcon from "@/components/icons/file-spreadsheet-icon";
import FilesAudioIcon from "@/components/icons/files-audio-icon";
import FileTextIcon from "@/components/icons/file-text-icon";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { imageTypes } from "@/lib/constants/statusConstants";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export const getFileIcon = (
  fileType: string,
  downloadUrl?: string,
  fileName?: string
) => {
  const [pdfThumbnail, setPdfThumbnail] = useState<string | null>(null);

  const generateThumbnail = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/pdf" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }
      const pdfData = await response.arrayBuffer();

      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      const pdf = await loadingTask.promise;

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Failed to get canvas context");
      }
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvas, canvasContext: context, viewport }).promise;

      const thumbnail = canvas.toDataURL("image/png");
      setPdfThumbnail(thumbnail);

      canvas.remove();
    } catch (error) {
      console.error("Error generating PDF thumbnail:", error);
      setPdfThumbnail(null);
    } finally {
    }
  };
  useEffect(() => {
    if ((fileType === "application/pdf" || fileType === "pdf") && downloadUrl) {
      generateThumbnail(downloadUrl);
    } else {
      setPdfThumbnail(null);
    }
    return () => {
      if (pdfThumbnail) {
        URL.revokeObjectURL(pdfThumbnail);
      }
    };
  }, [fileType, downloadUrl]);

  if (imageTypes.includes(fileType)) {
    return (
      <img
        src={downloadUrl}
        alt={fileName || "Image preview"}
        className="h-28 w-full object-cover object-top"
      />
    );
  }

  if (fileType === "application/pdf" || fileType === "pdf") {
    if (pdfThumbnail) {
      return (
        <img
          src={pdfThumbnail}
          alt={fileName || "PDF preview"}
          className="h-28 w-full object-cover object-top cursor-pointer"
        />
      );
    }
    return <FilePdfIcon />;
  }

  switch (fileType) {
    case "audio":
      return <FilesAudioIcon />;
    case "document":
    case "docx":
    case "doc":
    case "application/msword":
      return <Docsicon />;
    case "xlsx":
    case "xls":
    case "csv":
      return <FileSpreadsheatIcon />;
    case "text":
    case "txt":
    case "text/plain":
    case "text/csv":
      return <FileTextIcon />;
    default:
      return <FileFilesIcon />;
  }
};
