import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import { iApproveRejectDialog } from "@/lib/interfaces/iTable";
const NextHearingDialog = ({
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

  useEffect(() => {
    if (!removeConfirm) {
      setInputValue("");
      setAppRejError("");
    }
  }, [removeConfirm]);

  return (
    <Dialog open={removeConfirm} onOpenChange={setRemoveConfirm}>
      <DialogContent
        className="w-1/3 p-3 bg-gray-100 rounded-none !shadow-all font-primary"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <div className="flex flex-col text-base 3xl:text-xl font-normal tracking-wide text-grey-600">
            <DialogTitle>
              <div className="flex gap-2 font-normal text-md">
                {" "}
                Next hearing
              </div>
            </DialogTitle>
            <Textarea
              className=" border h-52 rounded-none border-gray-200 resize-none  text-sm 3xl:text-base font-normal  mt-2 focus:!outline-none outline-none "
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter reason"
            />
          </div>
          {appRejError && <p className="text-red-500">{appRejError}</p>}
        </DialogHeader>

        <div className="flex justify-end gap-5 ">
          <Button
            onClick={onCancel}
            className="bg-transparent rounded-none border-gray-400  text-red-600 border font-medium text-sm 3xl:text-base px-4 py-1 h-7 outline-none focus:outline-none hover:bg-transparent hover:text-red-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none cursor-pointer"
          >
            Close
          </Button>
          <Button
            onClick={onConfirm}
            disabled={inputValue.length === 0 || isDeleteLoading}
            className="bg-black hover:bg-black  h-7 text-white font-medium text-sm 3xl:text-base px-4 py-1  rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none cursor-pointer"
          >
            {isDeleteLoading ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NextHearingDialog;
