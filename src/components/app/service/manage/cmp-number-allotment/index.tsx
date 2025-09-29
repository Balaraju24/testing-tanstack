import { UseContextAPI } from "@/components/context/Provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddCMPNumberAPI } from "@/http/services/manage";
import { labelSubStages } from "@/lib/constants/statusConstants";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import { isSubStageCompleted } from "@/utils/helpers/files";
import getSubStageStatuses from "@/utils/helpers/manage";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import ManageCaseHeader from "../../ManageCaseHeader";
import PendingStepOverlay from "../PendingStepOverlay";

const CMPNumberAllotment = ({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) => {
  const { service_id } = useParams({ strict: false });
  const [cmpError, setCmpError] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cmpNumber, setCmpNumber] = useState<string>("");
  const { caseStagesData, serviceData, setServiceData } = UseContextAPI();

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

  const { mutate: mutateAddCMPNumber, isPending } = useMutation({
    mutationFn: async (data: { cmp_number: string }) => {
      const response = await AddCMPNumberAPI(service_id, data);
      return response;
    },
    onSuccess: () => {
      setServiceData((prev: any) => ({
        ...prev,
        cmp_number: cmpNumber,
      }));
      setIsEditing(false);
    },
    onError: (error: any) => {
      if (error?.status === 404 || error?.status === 401) {
        setCmpError(error.message);
      } else if (error.status == 422) {
        let errors = error.data.errData;
        setCmpError(errors?.cmp_number[0]);
      } else if (error.status == 409) {
        let errors = error.message;
        setCmpError(errors);
      }
    },
  });

  const handleCMPNumberSubmit = () => {
    if (!cmpNumber?.trim()) {
      setCmpError("CMP Number is required");
      return;
    }
    mutateAddCMPNumber({ cmp_number: cmpNumber });
  };

  const handleCMPNumberClose = () => {
    setCmpNumber(serviceData?.cmp_number ?? "");
    setIsEditing(false);
    setCmpError("");
  };

  const handleCmpKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && cmpNumber.length > 0) {
      handleCMPNumberSubmit();
    }
  };

  useEffect(() => {
    if (serviceData && typeof serviceData.cmp_number === "string") {
      setCmpNumber(serviceData.cmp_number);
    }
  }, [serviceData]);

  return (
    <div className="h-full">
      {isPrevSubStageCompleted ? (
        <div className="h-full px-1">
          <div className="h-full">
            <ManageCaseHeader
              showActionButton={!isEditing && !!serviceData?.cmp_number}
              caseStage={stage}
              caseSubStage={subStage}
              showUploadButton={false}
            />
            <div className="p-2 relative w-full  h-[calc(100%-60px)] overflow-auto">
              <div className="py-4 px-2 flex  gap-4 w-full">
                <div className="w-full space-y-1">
                  <span>
                    CMP Number{" "}
                    <span className="text-sm text-red-600 -mt-0">&#42;</span>
                  </span>
                  {!isEditing && serviceData?.cmp_number ? (
                    <div className="flex bg-slate-100 justify-between items-center text-sm gap-2 border-none p-2">
                      <p>{serviceData?.cmp_number}</p>
                      {!isCurrentStageCompleted && (
                        <Button
                          className="bg-transparent h-fit py-0 font-semibold underline text-xs cursor-pointer"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 w-full mt-1">
                      <Input
                        placeholder="Enter CMP Number"
                        value={cmpNumber}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase().trim();
                          if (/^[A-Z0-9]*$/.test(value)) {
                            setCmpNumber(value);
                            setCmpError("");
                          }
                        }}
                        onKeyDown={handleCmpKeyDown}
                        maxLength={16}
                        disabled={isPending || isCurrentStageCompleted}
                        className="w-full rounded-none border h-fit border-gray-200 focus:outline-none focus-visible:outline-none bg-gray-100 text-black"
                      />
                      {cmpError && (
                        <span className="text-red-500 text-xs block mt-1">
                          {cmpError}
                        </span>
                      )}
                      <div className="flex justify-end gap-2">
                        {isEditing && (
                          <Button
                            onClick={handleCMPNumberClose}
                            disabled={isPending}
                            variant="outline"
                            className="rounded-none text-red-500 text-xs h-8 py-1.5 font-normal cursor-pointer"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          onClick={handleCMPNumberSubmit}
                          disabled={isPending || isCurrentStageCompleted}
                          className="rounded-none text-white text-xs bg-black h-8 py-1.5 font-normal hover:bg-black cursor-pointer"
                        >
                          {isPending ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <GetCaseNotes />
            </div>
          </div>
        </div>
      ) : (
        <PendingStepOverlay title={prevSubStage} />
      )}
    </div>
  );
};

export default CMPNumberAllotment;
