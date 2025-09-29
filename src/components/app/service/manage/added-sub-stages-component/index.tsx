import { DynamicComponentProps } from "@/lib/interfaces/manage";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import ManageCaseHeader from "../../ManageCaseHeader";
import UserGetCaseFiles from "../../user-manage/userGetCaseFiles";

const AddedSubStagesComponent = ({
  stage,
  subStage,
}: DynamicComponentProps) => {
  return (
    <div className="h-full">
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
    </div>
  );
};

export default AddedSubStagesComponent;
