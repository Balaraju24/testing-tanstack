import { useStore } from "@tanstack/react-store";
import { userStore } from "@/store/userDetails";
import DeleteStrokeIcon from "@/components/icons/delete-stroke-icon";
import ViewIcon from "@/components/icons/view-icon";
const FileActions = ({
  file,
  onDeleteFile,
  onDeletePlaceHolder,
  isCurrentStageCompleted,
}: any) => {
  const userDetails = useStore(userStore, (state: any) => state["user"]);

  return (
    <div className="flex gap-2">
      {!isCurrentStageCompleted && file?.verification_status === "PENDING" && (
        <>
          {file?.uploaded_by === userDetails?.id && (
            <div
              onClick={() =>
                file?.category === "placeholder"
                  ? onDeletePlaceHolder(file)
                  : onDeleteFile(file)
              }
              className="cursor-pointer"
            >
              <DeleteStrokeIcon className="w-4 h-4" />
            </div>
          )}
        </>
      )}
      {file.key && (
        <>
          <a href={file.download_url} target="_blank" rel="noopener noreferrer">
            <ViewIcon className="w-4 h-4" />
          </a>
        </>
      )}
    </div>
  );
};

export default FileActions;
