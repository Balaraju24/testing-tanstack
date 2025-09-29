import { labelSubStages } from "@/lib/constants/statusConstants";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import getSubStageStatuses from "@/utils/helpers/manage";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import PendingStepOverlay from "../../manage/PendingStepOverlay";
import ManageCaseHeader from "../../ManageCaseHeader";
import UserGetCaseFiles from "../userGetCaseFiles";

const UploadDocuments = ({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) => {
  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData,
  });

  const prevSubStage =
    labelSubStages[subStageLabel as keyof typeof labelSubStages];

  return (
    <div className="h-full">
      {isPrevSubStageCompleted ? (
        <div className=" h-full px-1">
          <div className=" relative">
            <ManageCaseHeader
              caseStage={stage}
              caseSubStage={subStage}
              showNoteButton={false}
              showUploadButton={false}
            />
          </div>
          <div className="p-2 relative w-full h-[calc(100%-60px)] overflow-auto">
            <UserGetCaseFiles />
            <GetCaseNotes />
          </div>
        </div>
      ) : (
        <PendingStepOverlay title={prevSubStage} />
      )}
    </div>
  );
};

export default UploadDocuments;
