import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { iApproveRejectDialog } from "@/lib/interfaces/iTable";

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
  isPending,
}: iApproveRejectDialog) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppRejError("");
    const value = event.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setInputValue(capitalizedValue);
    setApproveRejectReason?.(capitalizedValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  return (
    <Dialog open={removeConfirm} onOpenChange={setRemoveConfirm}>
      <DialogContent
        className="sm:max-w-[350px] bg-white rounded-none !shadow-all font-primary"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <div className="flex flex-col text-base 3xl:text-xl font-normal tracking-wide text-grey-600">
            <DialogTitle>
              <div className="flex gap-2 items-end text-red-500">
                {" "}
                Rejection Notes
              </div>
            </DialogTitle>
            <Textarea
              className="flex-1 border rounded-none border-gray-200 h-40 resize-none text-sm 3xl:text-base font-normal mt-2 focus:!outline-none outline-none"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              placeholder="Rejection Reason"
            />
          </div>
          {appRejError && <p className="text-red-500">{appRejError}</p>}
        </DialogHeader>

        <div className="flex justify-end gap-5 mt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="bg-transparent cursor-pointer border rounded-none active:scale-95 duration-300 transition-all  text-red-500 font-medium text-sm 3xl:text-base px-4 py-0 h-8 outline-none focus:outline-none hover:bg-transparent"
          >
            Cancel
          </Button>
          {dialogType?.verification_status === "REJECTED" ? (
            <Button
              onClick={onConfirm}
              disabled={inputValue.length === 0 || isDeleteLoading}
              className="bg-black hover:bg-black cursor-pointer  text-white font-medium active:scale-95 duration-300 transition-all text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none"
            >
              {isDeleteLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          ) : (
            <Button
              onClick={onConfirm}
              disabled={isDeleteLoading}
              className="bg-black hover:bg-black cursor-pointer  text-white font-medium text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none"
            >
              {isDeleteLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveRejectDialog;
