import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import { FileUploadPropsStages } from "@/lib/interfaces/files";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import ManageCaseHeader from "../../../ManageCaseHeader";
import DocumentTypeFileUpload from "./DocumentTypeFileUpload";
import { useEffect, useState } from "react";

export default function DocumentDisplay({
  stage,
  subStage,
}: FileUploadPropsStages) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { isUser } = useUserDetails();
  const { allDocsIsFetching, allDocsData } = UseContextAPI();

  useEffect(() => {
    if (allDocsData?.length === 0) {
      setEditMode(false);
    }
  }, []);

  return (
    <div className="h-full relative">
      {allDocsIsFetching ? (
        <LoadingComponent
          loading={allDocsIsFetching}
          message="Loading documents..."
        />
      ) : (
        <>
          <ManageCaseHeader
            caseStage={stage}
            caseSubStage={subStage}
            showActionButton={
              isUser() ? false : allDocsData?.length !== 0 && !editMode
            }
            showNoteButton={false}
          />
          <div className="px-2 py-1 sm:px-2">
            <DocumentTypeFileUpload
              subStage={subStage}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </div>
        </>
      )}
    </div>
  );
}
