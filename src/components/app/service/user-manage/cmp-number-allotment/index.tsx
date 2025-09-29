import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import { singleServiceAPI } from "@/http/services/service";

import ManageCaseHeader from "../../ManageCaseHeader";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import PendingStepOverlay from "../../manage/PendingStepOverlay";
import getSubStageStatuses from "@/utils/helpers/manage";
import { labelSubStages } from "@/lib/constants/statusConstants";

const UserCMPNumberAllotment = ({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) => {
  const { service_id } = useParams({ strict: false });

  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData,
  });

  const prevSubStage =
    labelSubStages[subStageLabel as keyof typeof labelSubStages];

  const { data: caseDetails } = useQuery({
    queryKey: ["case-details", service_id],
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await singleServiceAPI(service_id as string);
        if (response.status === 200 || response.status === 201) {
          const { data } = response?.data;
          return data;
        }
      } catch {
        throw new Error("Failed to fetch case data");
      }
    },
  });

  return (
    <div className="h-full">
      {isPrevSubStageCompleted ? (
        <>
          <div className="">
            <ManageCaseHeader
              caseStage={stage}
              caseSubStage={subStage}
              showUploadButton={false}
              showNoteButton={false}
            />
          </div>
          <div className="p-2 relative w-full h-[calc(100%-60px)] overflow-auto">
            {caseDetails?.cmp_number ? (
              <div className="flex gap-3">
                {caseDetails?.cmp_number && (
                  <div className="p-2 inline-block bg-gray-100 border border-gray-200">
                    <span className="text-gray-500">CMP Number :</span>{" "}
                    {caseDetails?.cmp_number}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center  text-lg h-[calc(100%-80px)] flex items-center justify-center ">
                <div>
                  Currently, this case <strong> cmp </strong> number is not
                  alloted.
                </div>
              </div>
            )}

            <GetCaseNotes />
          </div>
        </>
      ) : (
        <PendingStepOverlay title={prevSubStage} />
      )}
    </div>
  );
};

export default UserCMPNumberAllotment;
