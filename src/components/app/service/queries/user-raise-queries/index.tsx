import dayjs from "dayjs";

import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import { DynamicComponentProps } from "@/lib/interfaces/manage";

import { isSubStageCompleted } from "@/utils/helpers/files";
import ManageCaseHeader from "../../ManageCaseHeader";

const UserRaiseQueries = ({ stage, subStage }: DynamicComponentProps) => {
  const { allDocsData, caseStagesData, allDocsIsFetching } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const isQueriesStageCompleted =
    caseStagesData?.stages?.find((sub: any) => sub.code === "QURI")?.status ===
    "completed";

  return (
    <div className="overflow-hidden h-full">
      {allDocsIsFetching ? (
        <div className="relative h-[calc(100%-43px)] flex items-center justify-center">
          <LoadingComponent
            loading={allDocsIsFetching}
            message="Docs loading..."
          />
        </div>
      ) : (
        <>
          <ManageCaseHeader
            caseStage={stage}
            caseSubStage={subStage}
            showActionButton={false}
            showNoteButton={false}
            showUploadButton={false}
          />

          {isQueriesStageCompleted && allDocsData?.length === 0 && (
            <div className="h-[calc(100%-100px)]  flex justify-center items-center">
              <div className="text-center text-base text-gray-500 flex items-center justify-center">
                The advocate has reviewed your case and did not raise any
                queries.
              </div>
            </div>
          )}

          {!isQueriesStageCompleted && allDocsData?.length === 0 && (
            <div className="h-[calc(100%-100px)]  flex justify-center items-center">
              <div className="text-center text-base text-gray-500 flex items-center justify-center">
                No queries have been raised at this moment
              </div>
            </div>
          )}

          <div
            className={`p-2 space-y-2 ${!isCurrentStageCompleted ? "overflow-y-auto h-[calc(100vh-100px)] " : " overflow-y-auto h-[calc(100vh-250px)]"}`}
          >
            {Array.isArray(allDocsData) &&
              allDocsData?.map((item: any) => {
                return (
                  <div
                    key={item?.id}
                    className={`flex flex-cols w-full border p-2 gap-4 ${"border-gray-200"}`}
                  >
                    <div className="text-sm flex-1 self-center">
                      {item?.category}
                    </div>
                    <div className="text-xs bg-gray-200 font-normal p-1 flex  self-center">
                      {dayjs(item?.created_at).format("DD MMM YYYY")}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default UserRaiseQueries;
