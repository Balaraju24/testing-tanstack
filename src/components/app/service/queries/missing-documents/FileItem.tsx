// FileItem.tsx
import ApprovedIcon from "@/components/icons/approved-Icon";
import DeleteStrokeIcon from "@/components/icons/delete-stroke-icon";
import Docsicon from "@/components/icons/docs-icon";
import FileFilesIcon from "@/components/icons/file-files-icon";
import FilePdfIcon from "@/components/icons/file-pdf-icon";
import FileSpreadsheatIcon from "@/components/icons/file-spreadsheet-icon";
import FilesAudioIcon from "@/components/icons/files-audio-icon";
import LODImageIcon from "@/components/icons/image-lod-icon";
import RejectIcon from "@/components/icons/reject-icon";
import ViewIcon from "@/components/icons/view-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { documentApprovalAPI } from "@/http/services/fileUpload";
import {
  FILE_TYPE_ICONS,
  UI_CONFIG,
  VERIFICATION_STATUS,
} from "@/lib/constants/missingDocument";
import { FileItemProps } from "@/lib/interfaces/service";
import { userStore } from "@/store/userDetails";
import { sliceFilename } from "@/utils/helpers/manage";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";
import { FileTextIcon, X } from "lucide-react";
import { toast } from "sonner";
import DocsCommentsSection from "../../get-case-files/DocsCommentsSection";
import FileDownload from "../../get-case-files/FileDownload";

export default function FileItem({
  file,
  index,
  stage,
  subStage,
  isReportingStageCompleted,
  onDeleteFile,
  getAllDocsRefetch,
  setDialogType,
  isCurrentStageCompleted,
}: FileItemProps) {
  const { isUser } = useUserDetails();
  const userDetails = useStore(userStore, (state: any) => state["user"]);

  const getFileIcon = (fileType: string) => {
    if (FILE_TYPE_ICONS.IMAGE_TYPES.includes(fileType)) {
      return <LODImageIcon />;
    }

    if (FILE_TYPE_ICONS.PDF_TYPES.includes(fileType)) {
      return <FilePdfIcon />;
    }

    if (FILE_TYPE_ICONS.AUDIO_TYPES.includes(fileType)) {
      return <FilesAudioIcon />;
    }

    if (FILE_TYPE_ICONS.DOCUMENT_TYPES.includes(fileType)) {
      return <Docsicon />;
    }

    if (FILE_TYPE_ICONS.SPREADSHEET_TYPES.includes(fileType)) {
      return <FileSpreadsheatIcon />;
    }

    if (FILE_TYPE_ICONS.TEXT_TYPES.includes(fileType)) {
      return <FileTextIcon />;
    }

    return <FileFilesIcon />;
  };

  const {
    mutate: mutateApproveorRejectDocument,
    isPending: ApproveOrRejectDocument,
  } = useMutation({
    mutationKey: ["approve_reject_document"],
    mutationFn: async ({
      docId,
      verification_status,
    }: {
      docId: number | undefined;
      verification_status: string;
    }) => {
      const payload = {
        verification_status,
        case_stage: stage,
        case_sub_stage: subStage,
      };

      const response = await documentApprovalAPI({
        payload,
        doc_id: docId,
      });
      return response;
    },
    onSuccess: (data) => {
      getAllDocsRefetch();
      toast.success(data?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error(error?.data?.errData?.notes?.[0] || "An error occurred");
    },
  });

  const rejAppDialog = (params: {
    docId: number;
    verification_status: string;
  }) => {
    setDialogType({
      docId: params.docId,
      verification_status: params.verification_status,
    });
  };

  const onApprove = (params: {
    docId: number;
    verification_status: string;
  }) => {
    mutateApproveorRejectDocument(params);
  };

  const getStatusButton = () => {
    const status = file.verification_status;
    const baseClass =
      "leading-tight text-xs px-4 py-2 text-white rounded-none font-primary";

    if (status === VERIFICATION_STATUS.REJECTED) {
      return (
        <p className={`bg-red-500 hover:bg-red-500 ${baseClass}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </p>
      );
    }

    if (status === VERIFICATION_STATUS.APPROVED) {
      return (
        <p className={`bg-green-500 hover:bg-green-500 ${baseClass}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </p>
      );
    }

    return null;
  };

  const renderActionButtons = () => {
    if (
      isUser() ||
      file.verification_status !== VERIFICATION_STATUS.PENDING ||
      isCurrentStageCompleted
    ) {
      return getStatusButton();
    }

    return (
      <div className="flex gap-2">
        <Button
          className="bg-red-500 hover:bg-red-500 border border-red-500 text-white rounded-none text-xs h-7 px-4"
          onClick={() =>
            rejAppDialog({
              docId: file.id,
              verification_status: VERIFICATION_STATUS.REJECTED,
            })
          }
        >
          Reject
        </Button>
        <Button
          className="bg-green-500 h-7 hover:bg-green-500 text-white-500 text-xs px-4 py-1 text-white rounded-none"
          onClick={() =>
            onApprove({
              docId: file.id,
              verification_status: VERIFICATION_STATUS.APPROVED,
            })
          }
          disabled={ApproveOrRejectDocument}
        >
          Approve
        </Button>
      </div>
    );
  };

  const isImageFile = FILE_TYPE_ICONS.IMAGE_TYPES.includes(file.file_type);

  if (!file?.file_name) return null;

  return (
    <Dialog key={index}>
      <div className="flex justify-between items-center border border-gray-300 p-2 mb-2 cursor-pointer">
        <DialogTrigger className="w-full cursor-pointer">
          <div className="flex items-center gap-1 [&_svg]:size-4 cursor-pointer">
            {getFileIcon(file.file_type)}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-sm cursor-pointer">
                    {sliceFilename(
                      file?.file_name,
                      UI_CONFIG.FILENAME_SLICE_LENGTH
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white cursor-pointer">
                  {file?.file_name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogTrigger>

        <div className="flex gap-1 items-center">
          {file?.verification_status === VERIFICATION_STATUS.APPROVED && (
            <span className="text-green-500">
              <ApprovedIcon className="w-4 h-4" />
            </span>
          )}
          {file?.verification_status === VERIFICATION_STATUS.REJECTED && (
            <span className="text-red-500">
              <RejectIcon />
            </span>
          )}

          <div className="bg-gray-100 hover:bg-gray-200 h-7 w-7 flex justify-center items-center">
            <a
              href={file.download_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ViewIcon className="w-4 h-4" />
            </a>
          </div>

          <FileDownload
            file={{
              key: file.key,
              file_name: file.file_name,
            }}
          />

          {file?.verification_status === VERIFICATION_STATUS.PENDING &&
            !isCurrentStageCompleted &&
            file?.uploaded_by === userDetails?.id && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => onDeleteFile(file)}
                      className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-1 py-0.5"
                    >
                      <DeleteStrokeIcon className="size-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-xs rounded-none text-white px-1 py-1">
                    Delete
                    <TooltipArrow className="fill-black" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>
      </div>

      <DialogContent
        aria-describedby={undefined}
        className="w-[90%] p-2 gap-0 bg-white"
      >
        <DialogTitle />
        <div className="flex items-center justify-between w-full">
          <div className="text-sm">{file.file_name}</div>
          <DialogClose className="border-0 border-gray-300 mt-0 h-fit px-0 py-0 [&_svg]:size-6">
            <X className="stroke-red-500 cursor-pointer" />
          </DialogClose>
        </div>
        <hr className="mt-2 mb-0 border-gray-300" />

        <div className="flex gap-4">
          <div className="w-3/5 px-2 py-2 border-r border-r-gray-300 flex flex-col">
            <div className="flex items-center justify-end gap-2 w-full mb-4">
              <div>{!isUser() && renderActionButtons()}</div>
              <div className="flex gap-2">
                <FileDownload
                  file={{
                    key: file.key,
                    file_name: file.file_name,
                  }}
                />
              </div>
            </div>

            <div className="flex">
              {isImageFile ? (
                <img
                  src={file.download_url}
                  alt="Full Image"
                  className="w-full h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <iframe
                  src={file.download_url}
                  title="Document Preview"
                  className="w-full h-[70vh] object-contain rounded-lg"
                />
              )}
            </div>
          </div>

          <div className="w-2/5 h-full flex flex-col">
            <DocsCommentsSection documentId={file.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
