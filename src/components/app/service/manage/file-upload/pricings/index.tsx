import LogoPath from "@/assets/nyaya-tech-logo.svg";
import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import NotesCloseIcon from "@/components/icons/notes-close-icon";
import PaymentReceiptIcon from "@/components/icons/payment-reciept-icon";
import PaymentRecieved from "@/components/icons/payment-recieved";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { addPriceAPI, getPaymentDetailsAPI } from "@/http/services/manage";
import { PaymentDetails, PricingProps } from "@/lib/interfaces/service";
import { cn } from "@/lib/utils";
import { formatDateTime, formatPhoneNumber } from "@/utils/helpers/fileUpload";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Link, X } from "lucide-react";
import { useState } from "react";
import ManageCaseHeader from "../../../ManageCaseHeader";

function Pricing({ stage, subStage }: PricingProps) {
  const { service_id } = useParams({ strict: false }) as {
    service_id?: string;
  };
  const { isUser, isManager } = useUserDetails();
  const { serviceData } = UseContextAPI();
  const [errors, setErrors] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editPrice, setEditPrice] = useState<string>("");

  const {
    isLoading: isPaymentLoading,
    data: paymentDetails,
    refetch,
  } = useQuery<PaymentDetails>({
    queryKey: ["paymentDetails", service_id],
    queryFn: async (): Promise<PaymentDetails> => {
      if (!service_id) {
        throw new Error("File ID is required");
      }
      const response = await getPaymentDetailsAPI(service_id);
      if (response?.status === 200 || response?.status === 201) {
        return response?.data?.data;
      }
      throw new Error("Failed to fetch payment details");
    },
    enabled: !!service_id,
    refetchOnWindowFocus: false,
  });

  const updatePriceMutation = useMutation({
    mutationFn: async (newPrice: string) => {
      const payload = {
        price: Number(newPrice),
        stage: stage,
        sub_stage: subStage,
      };
      return await addPriceAPI(service_id, payload);
    },
    onSuccess: () => {
      refetch();
      setIsEditing(false);
      setEditPrice("");
      setErrors(null);
    },
    onError: (response: any) => {
      const errorData = response?.data?.errData?.price;
      const errorMessage = Array.isArray(errorData)
        ? errorData.join(", ")
        : typeof errorData === "string"
          ? errorData
          : response?.data?.message || "Failed to update price";
      setErrors(errorMessage);
    },
  });

  const handleEditClick = (): void => {
    const currentPrice =
      paymentDetails?.case_details?.price ||
      serviceData?.price?.toString() ||
      "";
    const formattedPrice = Math.floor(currentPrice);
    setEditPrice(formattedPrice === 0 ? "" : String(formattedPrice));
    setIsEditing(true);
  };

  const handleSavePrice = (): void => {
    if (editPrice && parseFloat(editPrice) > 0) {
      updatePriceMutation.mutate(editPrice);
    } else {
      setErrors("Please enter a valid price");
    }
  };

  const handleCancelEdit = (): void => {
    setIsEditing(false);
    setEditPrice("");
    setErrors(null);
  };

  const handleClearInput = (): void => {
    setEditPrice("");
    setErrors(null);
  };

  const handlePaymentClick = (): void => {
    if (service_id) {
      window.open(
        `${import.meta.env.VITE_PAYMENT_LINK}/payment/${service_id}`,
        "_blank"
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSavePrice();
    }
  };

  const getCurrentPrice = (): string => {
    return (
      paymentDetails?.case_details?.price ||
      serviceData?.price?.toString() ||
      "0"
    );
  };

  if (isPaymentLoading) {
    return (
      <div className="h-full relative">
        <ManageCaseHeader
          caseStage={stage}
          caseSubStage={subStage}
          showActionButton={
            isUser() ? false : serviceData?.is_payment_completed
          }
          showUploadButton={false}
          showNoteButton={false}
        />
        <div className="p-2 w-full h-[calc(100%-60px)] overflow-auto">
          <LoadingComponent
            loading={isPaymentLoading}
            message="Loading Payment details..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <ManageCaseHeader
        caseStage={stage}
        caseSubStage={subStage}
        showActionButton={
          isUser() ? false : paymentDetails?.case_details?.is_payment_completed
        }
        showUploadButton={false}
        showNoteButton={false}
      />
      <div className="p-2 w-full h-[calc(100%-60px)] overflow-auto">
        {paymentDetails?.case_details?.is_payment_completed ? (
          <div className="py-2 px-2 w-1/2">
            <div className="p-4 border border-gray-300 flex flex-col items-center space-y-1 shadow-md">
              <div className="flex flex-col items-center">
                <div>
                  <PaymentRecieved className="w-14 h-14" />
                </div>
                <div className="flex flex-col">
                  <div className="font-medium text-md 3xl:text-lg text-primaryblack mb-1">
                    Payment Received
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xl 3xl:text-2xl font-medium text-black flex items-center gap-1">
                      <span>&#8377; </span>
                      {paymentDetails?.case_details?.price}
                    </span>
                    <p className="text-xs 3xl:text-sm text-black text-opacity-80 font-normal">
                      {formatDateTime(
                        paymentDetails?.case_details?.recent_payment_date
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <Drawer direction="right">
                <DrawerTrigger className="w-full">
                  <div className="font-medium bg-gray-200 w-full [&_svg]:size-5 flex gap-2 justify-center text-smd 3xl:text-base py-1 decoration-1 cursor-pointer">
                    <PaymentReceiptIcon /> View Receipt
                  </div>
                </DrawerTrigger>
                <DrawerContent
                  className={cn(
                    "fixed inset-y-0 inset-x-[auto_0] right-0 w-3/12 h-full shadow-lg bg-white mt-0 rounded-none font-primary [>div]:none"
                  )}
                >
                  <div className="p-2 flex w-full justify-end">
                    <DrawerClose>
                      <NotesCloseIcon className="w-7 h-7 cursor-pointer" />
                    </DrawerClose>
                  </div>
                  <div className="p-2 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2 w-full">
                      <img src={LogoPath} alt="" className="w-32 py-10" />
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col items-center text-xl 3xl:text-2xl font-medium pb-10 text-primaryblack">
                        <PaymentRecieved className="w-16 h-16" />
                        <p className="text-xl 3xl:text-2xl font-medium text-primaryblack">
                          Payment Received
                        </p>
                        <p className="text-xs 3xl:text-sm font-medium text-black text-opacity-80 mt-1">
                          {formatDateTime(
                            paymentDetails?.case_details?.recent_payment_date
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="text-center text-xs 3xl:text-sm">
                        Payment Details
                      </div>
                      <div className="w-full text-smd bg-[#F0F4FAB2] space-y-3 mt-3 p-3 box-border">
                        <div className="w-full flex justify-between">
                          <div className="max-w-1/3 text-black text-xs 3xl:text-sm font-normal">
                            File ID:
                          </div>
                          <div className="max-w-1/2 text-black text-xs 3xl:text-sm font-normal text-opacity-80">
                            {paymentDetails?.case_details?.temp_id ||
                              paymentDetails?.case_details?.ref_id}
                          </div>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="max-w-1/3 text-black text-xs 3xl:text-sm font-normal">
                            Service Type:
                          </div>
                          <div className="max-w-1/2 text-black text-xs 3xl:text-sm font-normal text-opacity-80">
                            {paymentDetails?.service_details?.category}
                          </div>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="max-w-1/3 text-black text-xs 3xl:text-sm font-normal">
                            Mobile Number:
                          </div>
                          <div className="max-w-1/2 text-black text-xs 3xl:text-sm font-normal text-opacity-80">
                            {formatPhoneNumber(
                              paymentDetails?.user_details?.phone
                            )}
                          </div>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="max-w-1/3 text-black text-xs 3xl:text-sm font-normal">
                            Amount:
                          </div>
                          <div className="font-medium max-w-1/2 text-black text-sm 3xl:text-lg">
                            <span>&#8377; </span>
                            {paymentDetails?.case_details?.paid_amount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-sm border border-gray-200 p-2 max-w-sm m-2">
            <h3 className="text-base font-normal text-gray-900 mb-3 text-center">
              Proceed to Payment
            </h3>
            {!isEditing && (
              <div className="space-y-4 mb-3 bg-gray-100 p-3">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-normal text-gray-900">
                      Consultation Fee:{" "}
                      <span className="text-sm font-normal text-gray-900 mx-1">
                        ₹{getCurrentPrice()}
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      {isManager() && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={handleEditClick}
                        >
                          <span className="text-xs underline font-normal">
                            Edit
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isEditing && (
              <div className="mb-3 bg-gray-100 p-3">
                <div className="flex border  border-gray-300 px-3 gap-1 items-center">
                  <span className="text-sm">₹</span>
                  <Input
                    type="string"
                    value={editPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setEditPrice(value);
                      }

                      if (errors) {
                        setErrors(null);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    className="rounded-none text-md font-normal focus:!outline-none h-8"
                    placeholder="Enter new price"
                    min="0"
                    step="0.01"
                  />
                  {editPrice !== "" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-5 w-5 p-0 text-gray-700 border-none hover:text-gray-800 cursor-pointer"
                      onClick={handleClearInput}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                {errors && (
                  <span className="text-xs text-red-500">{errors}</span>
                )}
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-8 text-sm rounded-sm"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 h-8 text-sm bg-slate-900 hover:bg-slate-800 text-white rounded-sm"
                    onClick={handleSavePrice}
                    disabled={updatePriceMutation.isPending}
                  >
                    Update
                  </Button>
                </div>
              </div>
            )}
            {!isEditing && (
              <Button
                className="bg-slate-900 hover:bg-slate-800 w-full text-white rounded-none font-light flex [&_svg]:size-5 h-fit px-3 text-sm 3xl:text-sm"
                onClick={handlePaymentClick}
                disabled={updatePriceMutation.isPending}
              >
                <Link className="size-4" />
                PAY NOW
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pricing;
