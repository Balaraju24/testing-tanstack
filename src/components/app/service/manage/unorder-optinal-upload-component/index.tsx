import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import GetCaseFiles from "../../get-case-files/GetCaseFiles";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import ManageCaseHeader from "../../ManageCaseHeader";

const OptionalUploadComponent = ({
  stage,
  subStage,
}: DynamicComponentProps) => {
  const { allDocsIsFetching, isLoadingCaseNote } = UseContextAPI();

  return (
    <div className="h-full">
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
    </div>
  );
};

export default OptionalUploadComponent;
