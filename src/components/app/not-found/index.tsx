import ManageCaseHeader from "../service/ManageCaseHeader";

const NotFound = ({ stage, subStage }: any) => {
  return (
    <div className="h-full">
      <div className="h-full px-1">
        <div className="h-full relative">
          <ManageCaseHeader
            caseStage={stage}
            caseSubStage={subStage}
            showActionButton={true}
          />
          <div className=" p-2  w-full h-[calc(100%-60px)] overflow-auto ">
            <div>Not Found Component</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
