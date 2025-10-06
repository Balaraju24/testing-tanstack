import { jsx, jsxs } from 'react/jsx-runtime';
import { useMutation } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { toast } from 'sonner';
import { B as Button } from './router-e7zdrxGz.mjs';
import { Loader, File } from 'lucide-react';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { f as fileUploadAPI, u as uploadToS3API, a as uploadDocumentAPI, i as updateDocumentAPI } from './fileUpload-BBm5-XTb.mjs';
import { s as sliceFilename } from './manage-CWSyPq63.mjs';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, f as DialogDescription, g as DialogFooter } from './dialog-CbaK730S.mjs';
import { T as Textarea } from './textarea-BfKn0GZN.mjs';

function FileUploadDialog({
  isOpen,
  setIsOpen,
  getFilePreview,
  selectedFile,
  handleCancelUpload,
  handleConfirmUpload
}) {
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md bg-white", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "File Preview" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Review your file before uploading" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "py-4", children: getFilePreview() }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: handleCancelUpload,
          className: " text-red-500 h-7 py-1 px-3 rounded-none cursor-pointer",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleConfirmUpload,
          className: "bg-black hover:bg-black font-normal text-white h-7 py-1 px-3 rounded-none cursor-pointer",
          children: "Upload"
        }
      )
    ] })
  ] }) });
}
const FileUpload = ({
  refetch,
  documentId,
  category,
  loading2,
  setLoading2,
  children
}) => {
  const { service_id } = useParams({ strict: false });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [rejectionMessage, setRejectionMessage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const search = useSearch({ strict: false });
  const stage = search.stage;
  const subStage = search.sub_stage;
  const onDrop = (acceptedFiles, fileRejections) => {
    var _a;
    const file = acceptedFiles[0];
    if ((file == null ? void 0 : file.size) > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      return;
    }
    if (fileRejections.length > 0) {
      toast.warning(`Unsupported file type is uploaded`, {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
    }
    setSelectedFile(file);
    setRejectionMessage(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    if (((_a = acceptedFiles[0]) == null ? void 0 : _a.type) === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        generateThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewThumbnail(url);
    }
    setIsDialogOpen(true);
  };
  const onDropRejected = (rejectedFiles) => {
    const message = rejectedFiles.map(
      ({ file, errors }) => errors.map((error) => {
        if (error.code === "file-invalid-type") {
          return `File "${file.name}" has an unsupported type.`;
        }
        return `File "${file.name}" was rejected. Reason: ${error.message}`;
      })
    ).flat().join(", ");
    toast.message(message);
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"]
    },
    multiple: false,
    noClick: true
  });
  const handleConfirmUpload = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile, documentId);
    }
    setIsDialogOpen(false);
  };
  const handleCancelUpload = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (previewThumbnail) {
      URL.revokeObjectURL(previewThumbnail);
      setPreviewThumbnail(null);
    }
    setIsDialogOpen(false);
  };
  const handleFileUpload = (file, documentId2) => {
    getPresignedUrls({ file, documentId: documentId2 });
  };
  const { mutate: getPresignedUrls } = useMutation({
    mutationFn: async ({
      file,
      documentId: documentId2
    }) => {
      setLoading2 && setLoading2(true);
      const fileType = file.name.split(".").pop();
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size
      });
      const { target_url, file_key } = data == null ? void 0 : data.data;
      if (!target_url) {
        throw new Error("Presigned URL is missing");
      }
      await uploadTos3({ url: target_url, file });
      return {
        documentId: documentId2,
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
        key: file_key
      };
    },
    onSuccess: async ({ file_name, file_type, file_size, key, documentId: documentId2 }) => {
      const payload = {
        case_id: Number(service_id),
        file_name,
        file_type,
        file_size,
        key,
        case_stage: stage,
        case_sub_stage: subStage,
        category
      };
      if (documentId2) {
        updateDocumentMutation.mutate({ documentId: documentId2, payload });
      } else {
        uploadDocsMutation.mutate(payload);
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      if (previewThumbnail) {
        URL.revokeObjectURL(previewThumbnail);
        setPreviewThumbnail(null);
      }
    },
    onError: (error) => {
      var _a, _b, _c, _d;
      if (((_a = error.response) == null ? void 0 : _a.status) === 422 && ((_d = (_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.errData) == null ? void 0 : _d.file_size)) {
        toast.message(error.response.data.errData.file_size[0]);
      } else {
        toast.error("Failed to upload file.", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    }
  });
  const uploadTos3 = async ({ url, file }) => {
    try {
      const response = await uploadToS3API(url, file);
      if (response.status === 200 || response.status === 201) {
      } else {
        throw response;
      }
    } catch (error) {
    }
  };
  const uploadDocsMutation = useMutation({
    mutationFn: async (payload) => {
      var _a, _b;
      try {
        const response = await uploadDocumentAPI(payload);
        if (((_a = response.data) == null ? void 0 : _a.status) === 200 || ((_b = response.data) == null ? void 0 : _b.status) === 201) {
          toast.success("File uploaded successfully", {
            action: {
              label: "\u2715",
              onClick: () => toast.dismiss()
            }
          });
          refetch();
          return response;
        } else {
          throw new Error("Failed to upload ");
        }
      } catch (error) {
        toast.error("Failed to upload.", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    }
  });
  const updateDocumentMutation = useMutation({
    mutationFn: async ({
      documentId: documentId2,
      payload
    }) => {
      var _a, _b;
      try {
        const response = await updateDocumentAPI({
          docId: documentId2,
          payload
        });
        if (((_a = response.data) == null ? void 0 : _a.status) === 200 || ((_b = response.data) == null ? void 0 : _b.status) === 201) {
          toast.success("File uploaded successfully", {
            action: {
              label: "\u2715",
              onClick: () => toast.dismiss()
            }
          });
          refetch();
          return response;
        } else {
          throw new Error("Failed to update document");
        }
      } catch (error) {
        toast.error("Failed to update document.", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    }
  });
  const generateThumbnail = async (base64String) => {
    try {
      const base64Data = base64String.split(",")[1] || base64String;
      const pdfBytes = Uint8Array.from(
        atob(base64Data),
        (c) => c.charCodeAt(0)
      );
      const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvas, canvasContext: context, viewport }).promise;
      setPreviewThumbnail(canvas.toDataURL("image/png"));
    } catch (error) {
      console.error("Error generating PDF thumbnail:", error);
    }
  };
  const getFilePreview = () => {
    var _a;
    if (!selectedFile || !previewUrl) return null;
    const fileType = selectedFile.type;
    selectedFile.name;
    if (fileType.startsWith("image/")) {
      return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: previewUrl,
          alt: "Preview",
          className: "max-h-64 max-w-full object-contain"
        }
      ) });
    }
    if (fileType === "application/pdf") {
      return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: previewThumbnail ? /* @__PURE__ */ jsx(
        "img",
        {
          src: previewThumbnail,
          className: "w-80 h-80 object-contain",
          alt: "PDF Preview"
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 p-6 mt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(File, { size: 70 }) }),
        /* @__PURE__ */ jsx("p", { className: "text-base mt-4", children: "No Preview Available" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 flex items-center justify-center", children: selectedFile && /* @__PURE__ */ jsxs("p", { children: [
          Math.round(selectedFile.size / 1024),
          " KB - PDF"
        ] }) })
      ] }) });
    }
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm flex items-center justify-center", children: sliceFilename(selectedFile == null ? void 0 : selectedFile.name, 25) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 p-6 mt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(File, { size: 70 }) }),
        /* @__PURE__ */ jsx("p", { className: "text-base mt-4", children: "No Preview Available" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 flex items-center justify-center", children: selectedFile && /* @__PURE__ */ jsxs("p", { children: [
          Math.round(selectedFile.size / 1024),
          " KB -",
          " ",
          (_a = selectedFile.type.split("/")[1]) == null ? void 0 : _a.toUpperCase()
        ] }) })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { id: "upload-attachments", className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full py-0 flex justify-between items-center", children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        onClick: open,
        variant: "default",
        size: "default",
        className: "h-fit w-full px-0 [&_svg]:w-[unset] [&_svg]:h-[unset] py-0 text-sm bg-transparent rounded-none hover:bg-transparent cursor-pointer",
        children
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { ...getRootProps(), className: "hidden", children: /* @__PURE__ */ jsx("input", { ...getInputProps() }) }),
      rejectionMessage && /* @__PURE__ */ jsx("p", { className: "text-red-600 mt-2", children: rejectionMessage })
    ] }),
    /* @__PURE__ */ jsx(
      FileUploadDialog,
      {
        isOpen: isDialogOpen,
        setIsOpen: setIsDialogOpen,
        selectedFile,
        getFilePreview,
        handleCancelUpload,
        handleConfirmUpload
      }
    ),
    /* @__PURE__ */ jsx(
      LoadingComponent,
      {
        loading: loading2 != null ? loading2 : false,
        message: "Loading...",
        className: "bg-white"
      }
    )
  ] });
};
const ApproveRejectDialog = ({
  removeConfirm,
  setRemoveConfirm,
  onCancel,
  onConfirm,
  isDeleteLoading,
  setApproveRejectReason,
  dialogType,
  appRejError,
  setAppRejError,
  isPending
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setAppRejError("");
    const value = event.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setInputValue(capitalizedValue);
    setApproveRejectReason == null ? void 0 : setApproveRejectReason(capitalizedValue);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && inputValue.length > 0) {
      event.preventDefault();
      if (isDeleteLoading || isPending) {
        return;
      }
      onConfirm();
    }
  };
  useEffect(() => {
    if (!removeConfirm) {
      setInputValue("");
      setAppRejError("");
    }
  }, [removeConfirm]);
  return /* @__PURE__ */ jsx(Dialog, { open: removeConfirm, onOpenChange: setRemoveConfirm, children: /* @__PURE__ */ jsxs(
    DialogContent,
    {
      className: "sm:max-w-[350px] bg-white rounded-none !shadow-all font-primary",
      "aria-describedby": void 0,
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-base 3xl:text-xl font-normal tracking-wide text-grey-600", children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-end text-red-500", children: [
              " ",
              "Rejection Notes"
            ] }) }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                className: "flex-1 border rounded-none border-gray-200 h-40 resize-none text-sm 3xl:text-base font-normal mt-2 focus:!outline-none outline-none",
                value: inputValue,
                onKeyDown: handleKeyDown,
                onChange: handleInputChange,
                placeholder: "Rejection Reason"
              }
            )
          ] }),
          appRejError && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: appRejError })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-5 mt-4", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: onCancel,
              className: "bg-transparent cursor-pointer border rounded-none active:scale-95 duration-300 transition-all  text-red-500 font-medium text-sm 3xl:text-base px-4 py-0 h-8 outline-none focus:outline-none hover:bg-transparent",
              children: "Cancel"
            }
          ),
          (dialogType == null ? void 0 : dialogType.verification_status) === "REJECTED" ? /* @__PURE__ */ jsx(
            Button,
            {
              onClick: onConfirm,
              disabled: inputValue.length === 0 || isDeleteLoading,
              className: "bg-black hover:bg-black cursor-pointer  text-white font-medium active:scale-95 duration-300 transition-all text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none",
              children: isDeleteLoading ? /* @__PURE__ */ jsx(Loader, { className: "animate-spin" }) : "Confirm"
            }
          ) : /* @__PURE__ */ jsx(
            Button,
            {
              onClick: onConfirm,
              disabled: isDeleteLoading,
              className: "bg-black hover:bg-black cursor-pointer  text-white font-medium text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none",
              children: isDeleteLoading ? /* @__PURE__ */ jsx(Loader, { className: "animate-spin" }) : "Confirm"
            }
          )
        ] })
      ]
    }
  ) });
};

export { ApproveRejectDialog as A, FileUpload as F };
//# sourceMappingURL=ApproveRejectDialog-CbjX-vD1.mjs.map
