import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePreviewDialogProps } from "@/lib/interfaces/files";
import { X } from "lucide-react";
import DocsCommentsSection from "./DocsCommentsSection";
import FileDownload from "./FileDownload";
import {
  IMAGE_FILE_TYPES,
  SPECIAL_STAGES,
  STATUS_CLASSES,
  VERIFICATION_STATUS,
  DIALOG_CONFIG,
  BUTTON_CONFIG
} from "@/lib/constants/filePreviewConstants";

const FilePreviewDialog = ({
  file,
  children,
  rejAppDialog,
  onApprove,
  isUser,
  isB2CManager,
  isB2CLegalAdvisor,
  case_sub_stage,
  ApproveOrRejectDocument,
  isCurrentStageCompleted,
}: FilePreviewDialogProps) => {
  const isPending = file.verification_status === VERIFICATION_STATUS.PENDING;
  const isRejected = file.verification_status === VERIFICATION_STATUS.REJECTED;
  const finalDoc = file?.category === "Final Document";

  const isSpecialStage = case_sub_stage ? SPECIAL_STAGES.includes(case_sub_stage) : false;
  const isManagerOrAdvisor = isB2CManager || isB2CLegalAdvisor;

  const canApproveReject =
    (isPending && !isSpecialStage && !isUser) ||
    (isSpecialStage && isManagerOrAdvisor);

  const getStatusClass = (status: string) => {
    return STATUS_CLASSES[status as keyof typeof STATUS_CLASSES] || STATUS_CLASSES.DEFAULT;
  };

  const statusText = file?.verification_status
    ? file?.verification_status.charAt(0).toUpperCase() +
    file?.verification_status.slice(1).toLowerCase()
    : "";

  const isImageFile = IMAGE_FILE_TYPES.includes(file?.file_type);

  const handleReject = () => {
    rejAppDialog({
      docId: file.id,
      verification_status: VERIFICATION_STATUS.REJECTED,
      category: file?.category ?? "",
    });
  };

  const handleApprove = () => {
    onApprove({
      docId: file?.id,
      verification_status: VERIFICATION_STATUS.APPROVED,
    });
  };

  const renderActionButtons = () => {
    if (finalDoc) return null;

    if (!isUser && canApproveReject && !isRejected) {
      return (
        <>
          {!isCurrentStageCompleted && (
            <>
              <Button
                variant={BUTTON_CONFIG.REJECT.variant}
                className={BUTTON_CONFIG.REJECT.className}
                onClick={handleReject}
                disabled={ApproveOrRejectDocument}
              >
                {BUTTON_CONFIG.REJECT.text}
              </Button>

              <Button
                className={BUTTON_CONFIG.APPROVE.className}
                onClick={handleApprove}
                disabled={ApproveOrRejectDocument}
              >
                {BUTTON_CONFIG.APPROVE.text}
              </Button>
            </>
          )}
        </>
      );
    }

    return (
      <p className={getStatusClass(file?.verification_status)}>
        {statusText}
      </p>
    );
  };

  const renderFileContent = () => {
    if (isImageFile) {
      return (
        <img
          src={file?.download_url}
          alt="Full Image"
          className={`w-full h-[${DIALOG_CONFIG.IMAGE_HEIGHT}] object-contain rounded-lg`}
        />
      );
    }

    return (
      <iframe
        src={file?.download_url}
        title="Full Image"
        className={`w-full h-[${DIALOG_CONFIG.IMAGE_HEIGHT}] object-contain rounded-lg`}
      />
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="cursor-pointer">{children}</div>
      </DialogTrigger>
      <DialogContent
        className={`w-[${DIALOG_CONFIG.WIDTH_PERCENTAGE}] p-2 gap-0 bg-white`}
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between w-full pb-2">
          <DialogTitle>
            <div className="text-sm font-medium tracking-normal">
              {file?.file_name.replace(/\.[^/.]+$/, "")}
            </div>
          </DialogTitle>

          <DialogClose className="[&_svg]:size-5">
            <X className="stroke-red-500 cursor-pointer" />
          </DialogClose>
        </div>

        <div className="flex gap-4">
          <div className={`w-${DIALOG_CONFIG.MAIN_CONTENT_WIDTH} px-2 py-2 border-r border-t border-gray-300 flex flex-col`}>
            <div className="flex items-center justify-end w-full mb-4">
              <div className="flex items-center gap-2">
                {renderActionButtons()}

                {!finalDoc && !isCurrentStageCompleted && (
                  <div className="w-[0.5px] h-9 bg-gray-300"></div>
                )}

                <FileDownload
                  file={{
                    key: file?.key,
                    file_name: file?.file_name,
                  }}
                />
              </div>
            </div>
            {renderFileContent()}
          </div>
          <div className={`w-${DIALOG_CONFIG.SIDEBAR_WIDTH} h-full flex flex-col space-y-3`}>
            <DocsCommentsSection documentId={file.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewDialog;