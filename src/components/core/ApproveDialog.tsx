import { ApproveDialogProps } from "@/lib/interfaces/core";
import { Loader2 } from "lucide-react";
import React from "react";
import NotesCloseIcon from "../icons/notes-close-icon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const ApproveDialog: React.FC<ApproveDialogProps> = ({
  open,
  icon,
  onOpenChange,
  title,
  message,
  onCancel,
  onConfirm,
  disabled,
  requireRemarks,
  remarks,
  setRemarks,
  isPending,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white sm:rounded-none  w-1/4 flex flex-col gap-2 items-center font-primary">
        <Button
          className="absolute top-0 right-2 p-1 hover:bg-transparent cursor-pointer bg-transparent"
          onClick={onCancel}
        >
          <NotesCloseIcon className="w-5 h-5" />
        </Button>

        <AlertDialogHeader>
          {icon}
          <AlertDialogTitle className="text-green-600 font-medium ">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-center">
          {message}
        </AlertDialogDescription>
        {requireRemarks && (
          <Textarea
            placeholder="Enter remarks (Optional)"
            value={remarks}
            onChange={(e) => setRemarks?.(e.target.value)}
            className="w-full mt-2 text-sm"
          />
        )}
        <AlertDialogFooter className="flex items-center justify-center gap-2 mt-4">
          <Button
            className=" group relative bg-transparent overflow-hidden active:scale-95 duration-100 transition-all h-fit text-sm px-4 py-1 font-normal border border-red-600 rounded-none"
            onClick={onCancel}
            disabled={disabled}
          >
            <span className="cursor-pointer relative text-red-600 w-full transition-colors ">
              Cancel
            </span>
          </Button>
          <Button
            onClick={onConfirm}
            disabled={disabled}
            className="bg-orange-400 cursor-pointer hover:bg-orange-500 group relative overflow-hidden  h-fit text-sm py-1 px-4 font-normal border border-orange-400 active:scale-95 duration-300 transition-all  text-white rounded-none"
          >
            {isPending ? <Loader2 className="animate-spin h-fit" /> : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApproveDialog;
