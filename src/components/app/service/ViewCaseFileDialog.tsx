import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { imageTypes } from "@/lib/constants/statusConstants";
import { FilePreviewDialogProps } from "@/lib/interfaces/service";
import { X } from "lucide-react";
import DocsCommentsSection from "./get-case-files/DocsCommentsSection";

const ViewCaseFilesDialog: React.FC<FilePreviewDialogProps> = ({
  file,
  handleDocumentClick,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className="w-full"
        onClick={() => handleDocumentClick(file.id)}
      >
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent
        className="w-[90%] p-2 bg-white"
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between w-full">
          <div className="text-sm">{file.file_name}</div>
          <DialogClose asChild className="hover:bg-gray-100">
            <Button className="w-fit h-fit bg-transparent hover:bg-transparent py-0 [&_svg]:size-6">
              {" "}
              <X />
            </Button>
          </DialogClose>
        </div>
        <hr className="mt-2 mb-0 border-t-[0.5px] border-gray-200 shadow-none" />
        <div className="flex">
          <div className="w-3/5 border-r border-gray-200 px-2 flex flex-col">
            <div className="flex">
              {imageTypes.includes(file.file_type) ? (
                <img
                  src={file.download_url}
                  alt="Full Image"
                  className="w-full h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <iframe
                  src={file.download_url}
                  title="Full Image"
                  className="w-full h-[70vh] object-contain rounded-lg"
                />
              )}
            </div>
          </div>
          <div className="w-2/5 flex flex-col">
            <DocsCommentsSection documentId={file.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCaseFilesDialog;
