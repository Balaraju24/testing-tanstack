import { UseContextAPI } from "@/components/context/Provider";
import DueDateIcon from "@/components/icons/due-date-icon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateDueDateAPI } from "@/http/services/legalOpinion";
import { labelSubStages } from "@/lib/constants/statusConstants";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import { isSubStageCompleted } from "@/utils/helpers/files";
import getSubStageStatuses from "@/utils/helpers/manage";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ManageCaseHeader from "../../ManageCaseHeader";
import PendingStepOverlay from "../../manage/PendingStepOverlay";

const SetDueDate = ({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) => {
  const { service_id } = useParams({ strict: false });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isUser } = useUserDetails();
  const { serviceData, setServiceData, caseStagesData } = UseContextAPI();

  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData,
  });

  const prevSubStage =
    labelSubStages[subStageLabel as keyof typeof labelSubStages];

  const disabledDays = { before: new Date() };

  const updateDueDateMutation = useMutation({
    mutationFn: async ({
      service_id,
      payload,
    }: {
      service_id: any;
      payload: any;
    }) => {
      return await updateDueDateAPI(service_id, payload);
    },
    onSuccess: (data) => {
      setServiceData((prev: any) => ({
        ...prev,
        due_date: dayjs(selectedDate).format("DD MMM YYYY"),
      }));
      toast.success("Due date updated successfully");
      setApiError("");
      setIsEditing(false);
    },
    onError: (response: any) => {
      let errorMessage = "Failed to update due date";
      if (response?.data?.errData) {
        errorMessage = response?.data?.errData.due_date[0];
      } else if (response?.response?.data?.message) {
        errorMessage = response.response.data.message;
      } else if (response?.message) {
        errorMessage = response.message;
      }
      setApiError(errorMessage);
    },
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsPopoverOpen(false);
  };

  const handleSubmit = () => {
    const formattedDate = selectedDate
      ? dayjs(selectedDate).format("DD MMM YYYY")
      : "";
    const payload = {
      due_date: formattedDate,
      stage: stage,
      sub_stage: subStage,
    };

    setApiError("");
    updateDueDateMutation.mutate({ service_id: service_id, payload: payload });
  };

  useEffect(() => {
    if (serviceData?.due_date) {
      const existingDate = serviceData.due_date;
      setSelectedDate(existingDate);
    }

    if (serviceData?.due_date === null) {
      setIsEditing(true);
    }
  }, [serviceData?.due_date]);

  return (
    <div className="h-full">
      {isPrevSubStageCompleted ? (
        <div className="h-full px-1">
          <div className="h-full relative">
            <ManageCaseHeader
              caseStage={stage}
              caseSubStage={subStage}
              showActionButton={
                isUser() ? false : serviceData?.due_date !== null && !isEditing
              }
              showUploadButton={false}
              showNoteButton={false}
            />
            {isUser() ? (
              <div className="p-4">
                {serviceData?.due_date ? (
                  <div className="flex bg-slate-100 justify-between items-center gap-2 border p-2">
                    <p className="text-sm">
                      Due Date :{" "}
                      {dayjs(serviceData?.due_date).format("DD MMM YYYY")}
                    </p>
                  </div>
                ) : (
                  <div className=" flex flex-col items-center justify-center text-center text-base">
                    <DueDateIcon className="" />
                    <span className=" text-gray-400 font-normal text-base">
                      Due date not assigned
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="p-2 w-full h-[calc(100%-60px)] overflow-auto">
                  <div className="bg-white relative p-2">
                    {!isEditing ? (
                      <div className="flex bg-slate-100 justify-between items-center gap-2 border border-gray-300 p-2">
                        <p className="text-sm">
                          Due Date :{" "}
                          {dayjs(serviceData?.due_date).format("DD MMM YYYY")}
                        </p>
                        {!isCurrentStageCompleted && (
                          <Button
                            className="bg-transparent h-fit py-0 font-semibold underline text-xs !shadow-none cursor-pointer"
                            onClick={() => setIsEditing(true)}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 max-w-xs">
                        <div className="flex flex-col gap-2">
                          <div className="relative">
                            <Popover
                              open={isPopoverOpen}
                              onOpenChange={setIsPopoverOpen}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  id="due-date"
                                  className="w-full justify-start  border border-gray-300 text-left font-normal !rounded-none  cursor-pointer pr-10"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {selectedDate ? (
                                    dayjs(selectedDate).format("DD MMM YYYY")
                                  ) : (
                                    <span className="text-muted-foreground">
                                      Select a date
                                    </span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 bg-white"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={handleDateSelect}
                                  captionLayout="dropdown"
                                  disabled={disabledDays}
                                  fromYear={2025}
                                  toYear={2030}
                                  className="[&>div>button.bg-accent]:!bg-transparent [&>div>button.bg-accent]:!text-current"
                                  modifiers={{
                                    today: new Date(),
                                  }}
                                  modifiersClassNames={{
                                    today: "text-blue-900 ",
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          {apiError && (
                            <p className="text-sm text-red-500 mt-1">
                              {apiError}
                            </p>
                          )}
                        </div>

                        {serviceData?.due_date === null ? (
                          <Button
                            onClick={handleSubmit}
                            disabled={updateDueDateMutation.isPending}
                            className=" w-full bg-black hover:bg-black  text-white cursor-pointer font-medium active:scale-95 duration-300 transition-all text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none"
                          >
                            {updateDueDateMutation.isPending
                              ? "Adding..."
                              : "Add"}
                          </Button>
                        ) : (
                          <div className="flex gap-3">
                            <Button
                              onClick={() => setIsEditing(false)}
                              disabled={updateDueDateMutation.isPending}
                              className=" flex-1 bg-transparent cursor-pointer border rounded-none active:scale-95 duration-300 transition-all  text-black font-medium text-sm 3xl:text-base px-4 py-0 h-8 outline-none focus:outline-none hover:bg-transparent"
                            >
                              Close
                            </Button>
                            <Button
                              onClick={handleSubmit}
                              disabled={updateDueDateMutation.isPending}
                              className="flex-1 bg-black hover:bg-black  text-white cursor-pointer font-medium active:scale-95 duration-300 transition-all text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none"
                            >
                              {updateDueDateMutation.isPending
                                ? "Updating..."
                                : "Update"}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <PendingStepOverlay title={prevSubStage} />
      )}
    </div>
  );
};

export default SetDueDate;
