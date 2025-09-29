import DeleteIcon from "@/components/icons/delete-icon";
import NotesCloseIcon from "@/components/icons/notes-close-icon";
import OfflineModeIcon from "@/components/icons/offline-mode-icon";
import OnlineModeIcon from "@/components/icons/online-mode-icon";
import SelectPaymentIcon from "@/components/icons/select-payment-image";
import SendIcon from "@/components/icons/send-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { casePaymentDocAPI, sendPaymentLink } from "@/http/services/service";
import { sliceFilename } from "@/utils/helpers/manage";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PaymentDatePicker } from "./PaymentDatePicker";
import RecordFileUpload from "./RecordFileUpload";

const RecordPayment = () => {
  const { service_id } = useParams({ strict: false });
  const [mode, setMode] = useState<string | null>(null);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [price, setPrice] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [fileName, setFileName] = useState<string>("");
  const [errors, setErrors] = useState<any>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [fileDetails, setFileDetails] = useState({
    key: "",
    file_name: "",
    file_size: "",
    file_type: "",
  });

  const { mutate: mutateSendPaymentLink, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        case_id: Number(service_id),
        price: Number(price),
      };
      const response = await sendPaymentLink(service_id, payload);
      return response?.data;
    },
    onSuccess: () => {
      toast.success("Successfully sent payment link", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      setIsLinkSent(true);
      setErrors("");
    },
    onError: (error: any) => {
      if (error?.status === 422) {
        setErrors(error?.data?.errData || {});
      } else {
        toast.error("Failed to send payment link", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
      }
    },
  });

  const { mutate: mutatePaymentDocs, isPending: isPendingPaymentDocs } =
    useMutation({
      mutationFn: async (data: any) => {
        const response = await casePaymentDocAPI(data);
        return response?.data;
      },
      onSuccess: () => {
        toast.success("offline payment is done", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        setDate(new Date());
        setPrice("");
        setFileName("");
        setFileDetails({
          key: "",
          file_name: "",
          file_size: "",
          file_type: "",
        });
        setErrors("");
        setIsSheetOpen(false);
        setMode(null);
        // openSheet();
      },
      onError: (error: any) => {
        if (error?.status === 422) {
          setErrors(error?.data?.errData || {});
        } else {
          toast.error("Failed to pay in offline payment", {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          });
        }
      },
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      mutateSendPaymentLink();
    }
  };

  const handleSubmit = () => {
    mutatePaymentDocs({
      ...fileDetails,
      case_id: Number(service_id),
      price: Number(price),
      payment_date: date?.toISOString(),
    });
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => {
        if (!open) {
          setMode(null);
          setPrice("");
          setDate(new Date());
          setIsLinkSent(false);
          setFileName("");
          setIsSheetOpen(false);
          setFileDetails({
            key: "",
            file_name: "",
            file_size: "",
            file_type: "",
          });
          setErrors("");
        }
      }}
    >
      <SheetTrigger asChild>
        <Button
          className="h-fit w-fit text-xs px-2 py-1 rounded-none text-white hover:bg-primary font-normal bg-orange-400 opacity-80"
          onClick={() => setIsSheetOpen(true)}
        >
          Record Payment
        </Button>
      </SheetTrigger>
      <SheetContent className="w-3/12 bg-white flex flex-col p-3 z-50 font-primary">
        <SheetClose className="self-end [&_svg]:size-6">
          <NotesCloseIcon className="cursor-pointer" />
        </SheetClose>

        {!mode && (
          <div className="self-center flex flex-col items-center justify-center">
            <SelectPaymentIcon className="size-full" />
            <h3 className="text-lg font-medium text-center">
              Select Payment Method
            </h3>
            <div className="text-center text-sm">
              Choose your preferred payment option below
            </div>
            <div
              className="p-2 w-full flex border border-gray-300 items-center justify-between my-4 cursor-pointer"
              onClick={() => {
                setMode("online");
                setPrice("");

                setErrors("");
              }}
            >
              <div>
                <h4 className="font-medium text-md">Online Payment</h4>
                <p className="text-xs">
                  Pay Securely with Credit Card or Digital Wallet
                </p>
              </div>
              <ChevronRight className="w-5 h-5" />
            </div>
            <div
              className="p-2 flex w-full border border-gray-300   items-center justify-between mb-4 cursor-pointer"
              onClick={() => {
                setMode("offline");
                setPrice("");

                setErrors("");
                setDate(new Date());
              }}
            >
              <div>
                <h4 className="font-medium  text-md ">Offline Payment</h4>
                <p className="text-xs ">Pay at our physical locations</p>
              </div>
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        )}

        {mode === "online" && (
          <div className="self-center w-full">
            <div className="flex justify-center">
              {" "}
              <OnlineModeIcon className="size-60" />
            </div>

            <div>
              <h3 className="text-center font-medium text-xl">
                Proceed to Online
              </h3>
              <div className="text-xs my-4">
                <div className="my-1">
                  Enter amount
                  <span className="text-sm text-red-600"> &#42;</span>
                </div>
                <Label>
                  <Input
                    value={price === null ? "" : price}
                    className="bg-slate-100 rounded-none h-8"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setPrice(value);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </Label>
                {errors.price && (
                  <span className="text-red-500 text-xs block">
                    {errors.price[0]}
                  </span>
                )}
              </div>
            </div>
            <Button
              onClick={() => mutateSendPaymentLink()}
              disabled={isPending}
              className="bg-slate-900 hover:bg-slate-800 w-full mb-4 !text-white rounded-none text-smd font-medium"
            >
              <SendIcon className="" />
              {isPending
                ? "Sending..."
                : isLinkSent
                  ? "Link Sent"
                  : "Send Payment Link"}
            </Button>
            <Button
              className="text-center bg-transparent hover:bg-transparent w-full underline  h-fit py-0 text-smd font-medium text-black flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-80"
              onClick={() => {
                setMode(null);
                setPrice("");

                setDate(new Date());
                setErrors("");
              }}
              disabled={isPending}
            >
              <span>Change payment mode</span>
            </Button>
          </div>
        )}

        {mode === "offline" && (
          <div className="self-center w-full">
            <div className="flex items-center justify-center">
              <OfflineModeIcon className="size-60" />
            </div>

            <div>
              <h3 className="text-center font-medium text-xl">
                Proceed to Offline
              </h3>
              <div className="text-xs my-4">
                <div className="my-1 ">
                  Enter amount you paid
                  <span className="text-sm text-red-600"> &#42;</span>
                </div>
                <Label>
                  <Input
                    value={price === null ? "" : price}
                    className="bg-slate-100 rounded-none h-8"
                    maxLength={8}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setPrice(value);
                      }
                    }}
                  />
                </Label>
                {errors.price && (
                  <span className="text-red-500 text-xs block">
                    {errors.price[0]}
                  </span>
                )}
              </div>
              <div className="text-xs my-4">
                <div className="my-1">
                  Select Date you paid
                  <span className="text-sm text-red-600"> &#42;</span>
                </div>
                <div className="flex gap-2">
                  <PaymentDatePicker date={date} setDate={setDate} />
                </div>

                {errors.payment_date && (
                  <span className="text-red-500 text-xs block">
                    {errors.payment_date[0]}
                  </span>
                )}
              </div>
              <Button className="bg-gray-400 justify-between  hover:bg-gray-300 w-full !text-black rounded-none text-smd font-medium">
                {fileName ? (
                  <>
                    <span className="justify-self-start">
                      {sliceFilename(fileName, 25)}
                    </span>
                    <Button
                      onClick={() => {
                        setFileName("");
                        setFileDetails({
                          key: "",
                          file_name: "",
                          file_size: "",
                          file_type: "",
                        });
                      }}
                      className="text-red-500 hover:text-red-700 ml-2 font-semibold bg-transparent hover:bg-transparent"
                    >
                      <DeleteIcon />
                    </Button>
                  </>
                ) : (
                  <RecordFileUpload
                    sendAttachment={(
                      file_key,
                      file_name,
                      file_size,
                      file_type
                    ) => {
                      setFileDetails({
                        key: file_key,
                        file_name,
                        file_size,
                        file_type,
                      });
                      setFileName(file_name);
                    }}
                    loading2={isPendingPaymentDocs}
                  />
                )}
              </Button>
              {errors.key && (
                <span className="text-red-500 text-xs block">
                  {errors.key[0]}
                </span>
              )}

              <Button
                className="bg-gray-900 hover:bg-gray-800 w-full mb-4 mt-4 !text-white rounded-none text-smd font-medium"
                onClick={handleSubmit}
                // disabled={isPendingPaymentDocs || !price || !fileDetails.key}
              >
                {isPendingPaymentDocs ? "Submitting..." : "Submit"}
              </Button>

              <Button
                className="text-center w-full py-0 h-fit underline cursor-pointer text-smd font-medium bg-transparent hover:bg-transparent text-black flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                onClick={() => {
                  setMode(null);
                  setPrice("");

                  setDate(new Date());
                  setErrors("");
                  setFileName("");
                  setFileDetails({
                    key: "",
                    file_name: "",
                    file_size: "",
                    file_type: "",
                  });
                }}
                disabled={isPendingPaymentDocs}
              >
                <span>Change payment mode</span>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RecordPayment;
