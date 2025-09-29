import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUploadDialogProps } from "@/lib/interfaces/files";

export function FileUploadDialog({
  isOpen,
  setIsOpen,
  getFilePreview,
  selectedFile,
  handleCancelUpload,
  handleConfirmUpload,
}: FileUploadDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>File Preview</DialogTitle>
          <DialogDescription>
            Review your file before uploading
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{getFilePreview()}</div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancelUpload}
            className=" text-red-500 h-7 py-1 px-3 rounded-none cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmUpload}
            className="bg-black hover:bg-black font-normal text-white h-7 py-1 px-3 rounded-none cursor-pointer"
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
