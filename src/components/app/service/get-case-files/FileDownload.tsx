import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { TooltipArrow, TooltipContent } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { FileDownloadProps } from "@/lib/interfaces/files";
import { downloadSingleDocAPI } from "@/http/services/fileUpload";
import { downloadFileFromS3 } from "@/utils/helpers/apiHelpers";
import DownloadIcon from "@/components/icons/download-icon";

const FileDownload: React.FC<FileDownloadProps> = ({ file }) => {
  const { mutate: mutateDownloadFile, isPending: isPendingDownloadFile } =
    useMutation({
      mutationFn: async (payload: { key: string; file_name: string }) => {
        const body = { file_key: payload.key };
        const response = await downloadSingleDocAPI(body);
        const status = response?.data?.status;
        const downloadUrl = response?.data?.data?.download_url;

        if ((status === 200 || status === 201) && downloadUrl) {
          downloadFileFromS3(downloadUrl, payload.file_name);
        } else {
          throw new Error("Invalid response or download URL");
        }
      },
      onError: () => {
        toast.error("Failed to download attachment.");
      },
    });

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() =>
                mutateDownloadFile({
                  key: file.key,
                  file_name: file.file_name,
                })
              }
              disabled={isPendingDownloadFile}
              className="bg-gray-100 hover:bg-gray-200 h-fit rounded-none p-1 [&_svg]:size-5 disabled:opacity-50 cursor-pointer"
            >
              {isPendingDownloadFile ? (
                <Loader2 className="animate-spin" />
              ) : (
                <DownloadIcon />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-xs text-white px-1 py-1 ">
            Download
            <TooltipArrow className="fill-black" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FileDownload;
