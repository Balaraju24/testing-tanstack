import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import { Checkbox } from "@/components/ui/checkbox";
import { sendingNoticeAPI } from "@/http/services/service";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import { isSubStageCompleted } from "@/utils/helpers/files";
import useDocsApproval from "@/utils/helpers/useDocsApproval";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import GetCaseFiles from "../../get-case-files/GetCaseFiles";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import ManageCaseHeader from "../../ManageCaseHeader";

export default function SendingNotice({
  stage,
  subStage,
}: DynamicComponentProps) {
  const { service_id } = useParams({ strict: false });
  const [markedStatus, setMarkedStatus] = useState<
    "sent_by_post" | "sent_by_mail" | "sent_by_Both" | ""
  >("");
  const { isUser } = useUserDetails();
  const {
    isLoadingCaseNote,
    allDocsIsLoading,
    caseStagesData,
    allDocsData,
    serviceData,
    setServiceData,
  } = UseContextAPI();

  const docsApprove = useDocsApproval();

  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const { mutate: mutateSendingNotice, isPending } = useMutation({
    mutationFn: async (data: {
      status: string;
      is_marked: boolean;
      case_stage: string | undefined;
      case_sub_stage: string | undefined;
    }) => {
      const response = await sendingNoticeAPI(service_id, data);
      return response;
    },
    onSuccess: (data, variables) => {
      setServiceData((prev: any) => ({
        ...prev,
        confirmation_boxes: {
          ...prev?.confirmation_boxes,
          legal_notice: {
            sent_by_post:
              variables.status === "sent_by_post" ? variables.is_marked : false,
            sent_by_mail:
              variables.status === "sent_by_mail" ? variables.is_marked : false,
            sent_by_Both:
              variables.status === "sent_by_Both" ? variables.is_marked : false,
          },
        },
      }));
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  const handleMarkChange = (
    status: "sent_by_post" | "sent_by_mail" | "sent_by_Both"
  ) => {
    const isSame = markedStatus === status;
    const newMarkedStatus = isSame ? "" : status;

    setMarkedStatus(newMarkedStatus);

    mutateSendingNotice({
      status,
      is_marked: !isSame,
      case_stage: stage,
      case_sub_stage: subStage,
    });
  };
  useEffect(() => {
    const legalNotice = serviceData?.confirmation_boxes?.legal_notice;

    if (legalNotice) {
      const activeStatus = Object.entries(legalNotice).find(
        ([, value]) => value === true
      )?.[0] as "sent_by_post" | "sent_by_mail" | "sent_by_Both" | "";

      setMarkedStatus(activeStatus || "");
    }
  }, [serviceData]);

  return (
    <div className="h-full">
      <div className="h-full px-1">
        <div className="h-full relative">
          <ManageCaseHeader
            caseStage={stage}
            caseSubStage={subStage}
            showActionButton={isUser() ? false : !!docsApprove}
            showUploadButton={false}
          />
          <div className=" p-2  w-full h-[calc(100%-60px)] relative overflow-auto ">
            {allDocsIsLoading && isLoadingCaseNote ? (
              <LoadingComponent
                loading={allDocsIsLoading && isLoadingCaseNote}
              />
            ) : (
              <div>
                <GetCaseFiles NoticeDraftKey={"Notice Draft"} />
                {!(isCurrentStageCompleted && allDocsData?.length === 0) && (
                  <div className="flex flex-col gap-2 mt-2 mb-2">
                    <div>
                      <span className="font-medium text-base">
                        Notice Sent{" "}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center cursor-pointer">
                        <Checkbox
                          id="post"
                          className="w-4 h-4 mr-2 border-black cursor-pointer"
                          disabled={
                            isCurrentStageCompleted || isUser() || isPending
                          }
                          checked={markedStatus === "sent_by_post"}
                          onChange={() => {}}
                          onClick={() => handleMarkChange("sent_by_post")}
                        />
                        Sent By Post
                      </label>

                      <label className="flex items-center cursor-pointer">
                        <Checkbox
                          id="mail"
                          className="w-4 h-4 mr-2 border-black cursor-pointer"
                          disabled={
                            isCurrentStageCompleted || isUser() || isPending
                          }
                          checked={markedStatus === "sent_by_mail"}
                          onChange={() => {}}
                          onClick={() => handleMarkChange("sent_by_mail")}
                        />
                        Sent By Mail
                      </label>

                      <label className="flex items-center cursor-pointer">
                        <Checkbox
                          id="both"
                          className="w-4 h-4 mr-2 border-black cursor-pointer"
                          disabled={
                            isCurrentStageCompleted || isUser() || isPending
                          }
                          checked={markedStatus === "sent_by_Both"}
                          onChange={() => {}}
                          onClick={() => handleMarkChange("sent_by_Both")}
                        />
                        Sent By Both
                      </label>
                    </div>
                  </div>
                )}
                {markedStatus && <GetCaseFiles NoticeSentKey={"Notice Sent"} />}
                <GetCaseNotes />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
