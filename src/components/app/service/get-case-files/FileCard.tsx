import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ApprovedIcon from "@/components/icons/approved-Icon";
import EditIcon from "@/components/icons/edit-icon";
import PaymentReceipt from "@/components/icons/payment-reciept";
import RejectIcon from "@/components/icons/reject-icon";
import { fileSizeInMB } from "@/utils/helpers/files";
import { formatDateWithTime, sliceFilename } from "@/utils/helpers/manage";
import FileActions from "./FileActions";
import { getFileIcon } from "./FileIcon";
import FilePreviewDialog from "./FilePreviewDialog";
import FileUpload from "./FileUpload";

const FileCard = ({
  file,
  onDeleteFile,
  onDeletePlaceHolder,
  rejAppDialog,
  onApprove,
  getCaseFilesFetcher,
  loading2,
  setLoading2,
  isUser,
  isB2CManager,
  isB2CLegalAdvisor,
  case_sub_stage,
  ApproveOrRejectDocument,
  isPayment,
  isCurrentStageCompleted,
}: any) => {
  const icon = getFileIcon(file.file_type, file.download_url, file.file_name);

  const showUploadOption =
    file.verification_status === "REJECTED" && file.category;
  const cardHeaderStyle =
    file.file_type === "application/pdf" || file.file_type === "pdf"
      ? "bg-[#F3F3F3]"
      : "bg-gray-100";

  return (
    <div className="w-fit">
      <Card className="w-56 rounded-none border border-gray-300 overflow-hidden ">
        <FilePreviewDialog
          file={file}
          rejAppDialog={rejAppDialog}
          onApprove={onApprove}
          getCaseFilesFetcher={getCaseFilesFetcher}
          loading2={loading2}
          setLoading2={setLoading2}
          isUser={isUser}
          isB2CManager={isB2CManager}
          isB2CLegalAdvisor={isB2CLegalAdvisor}
          case_sub_stage={case_sub_stage}
          ApproveOrRejectDocument={ApproveOrRejectDocument}
          isCurrentStageCompleted={isCurrentStageCompleted}
        >
          <CardHeader
            className={`${cardHeaderStyle} relative flex items-center !p-0 space-y-0 justify-center w-full min-h-28`}
          >
            <Button
              className="!p-0 h-fit w-full rounded-none border-none bg-transparent [&_svg]:size-14 cursor-pointer"
              aria-label="View File"
            >
              {icon}
            </Button>
            <span className="text-green-500 absolute top-4 right-3">
              {file?.verification_status === "APPROVED" && <ApprovedIcon />}
              {file?.verification_status === "REJECTED" && <RejectIcon />}
            </span>
            {isPayment && (
              <span className="absolute top-1 left-1">
                <PaymentReceipt />
              </span>
            )}
          </CardHeader>
        </FilePreviewDialog>
        <CardContent className="flex flex-col px-2 py-1.5 cursor-pointer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="font-normal text-start text-xs">
                  {sliceFilename(file.file_name || "", 25)}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white">
                {file.file_name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>

        <CardFooter className="w-full p-2 border-none text-left flex justify-between items-center border-t">
          <div className="text-gray-500 text-[10px] smd:text-[10px] flex items-center gap-2">
            {formatDateWithTime(file?.updated_at || file?.created_at)}
            {file.key && (
              <>
                <Separator orientation="vertical" className="h-3 bg-gray-500" />
                <span className="text-[11px]">
                  {fileSizeInMB(file.file_size)} MB
                </span>
              </>
            )}
          </div>

          <FileActions
            file={file}
            onDeleteFile={onDeleteFile}
            onDeletePlaceHolder={onDeletePlaceHolder}
            rejAppDialog={rejAppDialog}
            getCaseFilesFetcher={getCaseFilesFetcher}
            loading2={loading2}
            setLoading2={setLoading2}
            isCurrentStageCompleted={isCurrentStageCompleted}
          />
        </CardFooter>
      </Card>
      {showUploadOption && !isCurrentStageCompleted && (
        <FileUpload
          refetch={getCaseFilesFetcher}
          documentId={file.id}
          loading2={loading2}
          setLoading2={setLoading2}
          category={file.category}
        >
          <div className="flex gap-2 text-xs items-center mt-1 justify-self-start [&_svg]:size-4">
            <EditIcon className="" />
            Replace the Document
          </div>
        </FileUpload>
      )}
    </div>
  );
};

export default FileCard;
