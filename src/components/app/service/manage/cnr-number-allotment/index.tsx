import { UseContextAPI } from "@/components/context/Provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddCNRNumberAPI } from "@/http/services/manage";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import ManageCaseHeader from "../../ManageCaseHeader";

const CNRNumberAllotment = ({ stage, subStage }: DynamicComponentProps) => {
  const { service_id } = useParams({ strict: false });
  const [cnrError, setCnrError] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cnrNumber, setCnrNumber] = useState<string>("");
  const { caseStagesData, serviceData, setServiceData } = UseContextAPI();

  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const { mutate: mutateAddCNRNumber, isPending } = useMutation({
    mutationFn: async (data: {
      cnr_number: string;
      stage: string | undefined;
      sub_stage: string | undefined;
    }) => {
      const response = await AddCNRNumberAPI(service_id, data);
      return response;
    },
    onSuccess: () => {
      setServiceData((prev: any) => ({
        ...prev,
        cnr_number: cnrNumber,
      }));
      setIsEditing(false);
    },
    onError: (error: any) => {
      if (error?.status === 404 || error?.status === 401) {
        setCnrError(error.message);
      } else if (error.status == 422) {
        let errors = error.data.errData;
        setCnrError(errors?.cnr_number[0]);
      } else if (error.status == 409) {
        let errors = error.message;
        setCnrError(errors);
      }
    },
  });

  const handleCNRNumberSubmit = () => {
    if (!cnrNumber?.trim()) {
      setCnrError("CNR Number is required");
      return;
    }
    mutateAddCNRNumber({
      cnr_number: cnrNumber,
      stage: stage,
      sub_stage: subStage,
    });
  };

  const handleCNRNumberClose = () => {
    setCnrNumber(serviceData?.cnr_number ?? "");
    setIsEditing(false);
    setCnrError("");
  };

  const handleCnrKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && cnrNumber.length > 0) {
      handleCNRNumberSubmit();
    }
  };

  useEffect(() => {
    if (serviceData && typeof serviceData.cnr_number === "string") {
      setCnrNumber(serviceData.cnr_number);
    }
  }, [serviceData]);

  return (
    <div className="h-full">
      <div className="h-full px-1">
        <div className="h-full">
          <ManageCaseHeader
            showActionButton={!isEditing && !!serviceData?.cnr_number}
            caseStage={stage}
            caseSubStage={subStage}
            showUploadButton={false}
          />
          <div className="p-2 relative w-full  h-[calc(100%-60px)] overflow-auto">
            <div className="py-2 px-2 flex  gap-4 w-full">
              <div className="w-full space-y-3">
                <div className="text-sm text-gray-800">
                  CNR Number {}
                  <span className="text-sm text-red-600 -mt-0">&#42;</span>
                </div>
                {!isEditing && serviceData?.cnr_number ? (
                  <div className="flex bg-slate-100 justify-between items-center text-gray-600 text-sm gap-2 border-none p-2">
                    <p>{serviceData?.cnr_number}</p>
                    {!isCurrentStageCompleted && (
                      <Button
                        className="bg-transparent h-fit py-0 cursor-pointer font-semibold underline text-xs"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 w-full mt-1">
                    <Input
                      placeholder="Enter CNR Number"
                      value={cnrNumber}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase().trim();
                        if (/^[A-Z0-9]*$/.test(value)) {
                          setCnrNumber(value);
                          setCnrError("");
                        }
                      }}
                      onKeyDown={handleCnrKeyDown}
                      maxLength={16}
                      disabled={isPending || isCurrentStageCompleted}
                      className="w-full rounded-none border  border-gray-300 h-fit  focus:outline-none focus-visible:outline-none bg-gray-100 text-black"
                    />
                    {cnrError && (
                      <span className="text-red-500 text-xs block mt-1">
                        {cnrError}
                      </span>
                    )}
                    <div className="flex justify-end gap-2">
                      {isEditing && (
                        <Button
                          onClick={handleCNRNumberClose}
                          disabled={isPending}
                          variant="outline"
                          className="rounded-none text-red-500 text-xs  cursor-pointer h-8 py-1.5 font-normal"
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={handleCNRNumberSubmit}
                        disabled={isPending || isCurrentStageCompleted}
                        className="rounded-none text-white text-xs cursor-pointer bg-black h-8 py-1.5 font-normal hover:bg-black"
                      >
                        {isPending ? (
                          <div className="flex">
                            Submitting...
                            <Loader2 className="animate-spin mx-1" />
                          </div>
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
    </div>
  );
};

export default CNRNumberAllotment;
