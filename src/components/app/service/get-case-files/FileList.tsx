import UploadFileIcon from "@/components/icons/upload-file-icon";
import { FileListProps } from "@/lib/interfaces/files";
import FileCard from "./FileCard";
import FileUpload from "./FileUpload";
import PlaceholderCard from "./PlaceholderCard";

const FileList = ({
  files,
  onDeleteFile,
  onDeletePlaceHolder,
  rejAppDialog,
  onApprove,
  getCaseFilesFetcher,
  loading2,
  setLoading2,
  isUser,
  isB2CManager,
  isB2CLegalAdvisor,
  case_sub_stage,
  ApproveOrRejectDocument,
  showPlaceholder,
  isCurrentStageCompleted,
  showPlaceholderforLegalNotice,
  noticeDraftKey,
  noticeSentKey,
}: FileListProps) => {
  const noticeDraftDocs = files?.filter(
    (file) =>
      file?.case_sub_stage === "DLNT#DFNT" &&
      file?.verification_status === "APPROVED"
  );
  const noticeSendDocs = files?.filter(
    (file) => file?.case_sub_stage === "SLNT#SNNT"
  );

  let finalFiles: any[] = [];

  if (noticeDraftKey) {
    finalFiles = noticeDraftDocs || [];
  } else if (noticeSentKey) {
    finalFiles = noticeSendDocs || [];
  } else {
    finalFiles = files || [];
  }

  const userUploadNotice = isUser && noticeSendDocs;

  return (
    <div className={`flex flex-col gap-0`}>
      <div className="grid grid-cols-2 gap-y-4 2xl:grid-cols-3 3xl:grid-cols-4 gap-3">
        {finalFiles.map((file: any) => (
          <div key={file.id} className="">
            <div className="text-sm text-gray-600">{file.category || ""}</div>
            {file.download_url ? (
              <FileCard
                file={file}
                onDeleteFile={onDeleteFile}
                onDeletePlaceHolder={onDeletePlaceHolder}
                rejAppDialog={rejAppDialog}
                onApprove={onApprove}
                getCaseFilesFetcher={getCaseFilesFetcher}
                loading2={loading2}
                setLoading2={setLoading2}
                isUser={isUser}
                isB2CManager={isB2CManager}
                isB2CLegalAdvisor={isB2CLegalAdvisor}
                case_sub_stage={case_sub_stage}
                ApproveOrRejectDocument={ApproveOrRejectDocument}
                isCurrentStageCompleted={isCurrentStageCompleted}
              />
            ) : (
              <PlaceholderCard
                file={file}
                getCaseFilesFetcher={getCaseFilesFetcher}
                loading2={loading2}
                setLoading2={setLoading2}
                isCurrentStageCompleted={isCurrentStageCompleted}
              />
            )}
          </div>
        ))}

        {showPlaceholder &&
          !showPlaceholderforLegalNotice &&
          !noticeDraftKey &&
          !userUploadNotice && (
            <div className="w-56 rounded-none overflow-hidden">
              <FileUpload
                refetch={getCaseFilesFetcher}
                setLoading2={setLoading2}
                loading2={loading2}
              >
                <div className="py-11 w-full border border-dashed bg-slate-100 border-gray-400 px-2 flex flex-col gap-2.5 items-center justify-center">
                  <UploadFileIcon />
                  <div className="text-[11px]">
                    Drop Files here or Click to upload
                  </div>
                  <div className="text-[10px]">Maximum file size: 50MB</div>
                </div>
              </FileUpload>
            </div>
          )}
      </div>
    </div>
  );
};

export default FileList;
