import { jsx } from "react/jsx-runtime";
import { F as FilePdfIcon, a as FileFilesIcon, b as FileSpreadsheatIcon, c as Docsicon, d as FilesAudioIcon } from "./DocsCommentsSection-Dgcs8l8-.js";
import { F as FileTextIcon, p as pdfjsWorker } from "./pdf.worker-CIugw0DL.js";
import * as pdfjsLib from "pdfjs-dist";
import { useState, useEffect } from "react";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const UserFileIcon = ({
  fileType,
  downloadUrl,
  fileName
}) => {
  const [pdfThumbnail, setPdfThumbnail] = useState(null);
  useEffect(() => {
    const generateThumbnail = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/pdf" }
        });
        if (!response.ok) throw new Error("Failed to fetch PDF");
        const pdfData = await response.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Failed to get canvas context");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, canvasContext: context, viewport }).promise;
        const thumbnail = canvas.toDataURL("image/png");
        setPdfThumbnail(thumbnail);
        canvas.remove();
      } catch (error) {
        console.error("Error generating PDF thumbnail:", error);
        setPdfThumbnail(null);
      }
    };
    if ((fileType === "application/pdf" || fileType === "pdf") && downloadUrl) {
      generateThumbnail(downloadUrl);
    } else {
      setPdfThumbnail(null);
    }
    return () => {
      if (pdfThumbnail) URL.revokeObjectURL(pdfThumbnail);
    };
  }, [fileType, downloadUrl]);
  const imageTypes = [
    "image",
    "jpg",
    "jpeg",
    "image/jpeg",
    "image/png",
    "gif",
    "svg",
    "png",
    "webp",
    "image/webp",
    "image/svg+xml"
  ];
  if (imageTypes.includes(fileType)) {
    return /* @__PURE__ */ jsx(
      "img",
      {
        src: downloadUrl,
        alt: fileName || "Image preview",
        className: "h-28 w-full object-cover object-top"
      }
    );
  }
  if (fileType === "application/pdf" || fileType === "pdf") {
    return pdfThumbnail ? /* @__PURE__ */ jsx(
      "img",
      {
        src: pdfThumbnail,
        alt: fileName || "PDF preview",
        className: "h-28 w-full object-cover object-top"
      }
    ) : /* @__PURE__ */ jsx(FilePdfIcon, {});
  }
  switch (fileType) {
    case "audio":
      return /* @__PURE__ */ jsx(FilesAudioIcon, {});
    case "document":
    case "docx":
    case "doc":
    case "application/msword":
      return /* @__PURE__ */ jsx(Docsicon, {});
    case "xlsx":
    case "xls":
    case "csv":
      return /* @__PURE__ */ jsx(FileSpreadsheatIcon, {});
    case "text":
    case "txt":
    case "text/plain":
    case "text/csv":
      return /* @__PURE__ */ jsx(FileTextIcon, {});
    default:
      return /* @__PURE__ */ jsx(FileFilesIcon, {});
  }
};
export {
  UserFileIcon as U
};
