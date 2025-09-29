import ApprovedIcon from "@/components/icons/approved-Icon";
import NewIcon from "@/components/icons/new-icon";
import RejectIcon from "@/components/icons/reject-icon";
import ViewIcon from "@/components/icons/view-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileCardProps } from "@/lib/interfaces/files";
import { sliceFilename } from "@/utils/helpers/manage";
import React from "react";
import { getFileIcon } from "./get-case-files/FileIcon";
import ViewCaseFilesDialog from "./ViewCaseFileDialog";

const FileCard: React.FC<FileCardProps> = ({
  file,
  userType,
  handleDocumentClick,
}) => {
  const isRecordUnread = file.doc_read_status?.some(
    (item: any) => !item.is_seen && item.user_id === userType
  );
  const icon = getFileIcon(file.file_type, file.download_url, file.file_name);
  const cardHeaderStyle =
    file.file_type === "application/pdf" || file.file_type === "pdf"
      ? "bg-[#F3F3F3]"
      : "bg-gray-100";

  return (
    <Card className="w-full rounded-none mt-2 border-gray-200">
      <ViewCaseFilesDialog
        file={file}
        handleDocumentClick={handleDocumentClick}
      >
        <CardHeader
          className={`${cardHeaderStyle} relative flex items-center p-0 space-y-0 justify-center min-h-28 w-full`}
        >
          {isRecordUnread && (
            <div className="absolute top-1 left-1 px-1">
              <NewIcon />
            </div>
          )}

          <span className="text-green-500 absolute top-3 right-3">
            {file?.verification_status === "APPROVED" && <ApprovedIcon />}
            {file?.verification_status === "REJECTED" && <RejectIcon />}
          </span>
          <Button
            className="w-full h-fit p-0 flex justify-center items-center rounded-none border-none bg-transparent overflow-hidden [&_svg]:size-14"
            aria-label="View Image"
          >
            {icon}
          </Button>

          {/* <Button
            className="p-0 border-none bg-transparent [&_svg]:size-12"
            aria-label="View Image"
          >
            <FileIconPreview file={file} />
          </Button> */}
        </CardHeader>
      </ViewCaseFilesDialog>

      <CardContent className="w-full p-2 text-left flex justify-between items-center border-t border-gray-200">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="font-medium text-start text-xs">
                {file?.file_name ? sliceFilename(file?.file_name, 10) : null}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white border p-2 w-60">
              {file?.file_name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
          onClick={() => handleDocumentClick(file?.id)}
        >
          <a href={file.download_url} target="_blank" rel="noopener noreferrer">
            <ViewIcon className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCard;
