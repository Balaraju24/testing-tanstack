import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import { labelSubStages } from "@/lib/constants/statusConstants";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import getSubStageStatuses from "@/utils/helpers/manage";
import GetCaseFiles from "../../get-case-files/GetCaseFiles";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import ManageCaseHeader from "../../ManageCaseHeader";
import PendingStepOverlay from "../PendingStepOverlay";

const OptionalUploadComponent = ({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) => {
  const { allDocsIsFetching, isLoadingCaseNote } = UseContextAPI();

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
        <div className="h-full px-1">
          <div className="h-full relative">
            <ManageCaseHeader
              caseStage={stage}
              caseSubStage={subStage}
              showActionButton={true}
            />
            <div className=" p-2  w-full h-[calc(100%-60px)] relative overflow-auto ">
              {allDocsIsFetching && isLoadingCaseNote ? (
                <LoadingComponent
                  loading={allDocsIsFetching && isLoadingCaseNote}
                />
              ) : (
                <div>
                  <GetCaseFiles />
                  <GetCaseNotes />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <PendingStepOverlay title={prevSubStage} />
      )}
    </div>
  );
};

export default OptionalUploadComponent;
