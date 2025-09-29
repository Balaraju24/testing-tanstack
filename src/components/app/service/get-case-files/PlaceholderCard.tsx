import { Card, CardHeader } from "@/components/ui/card";
import UploadFileIcon from "@/components/icons/upload-file-icon";
import FileUpload from "./FileUpload";
import { PlaceholderCardProps } from "@/lib/interfaces/verification";

const PlaceholderCard = ({
  file,
  getCaseFilesFetcher,
  loading2,
  setLoading2,
  isCurrentStageCompleted,
}: PlaceholderCardProps) => {
  const UploadContent = (
    <Card className="rounded-none border-0 w-56 cursor-pointer">
      <CardHeader className="bg-gray-100 border  border-black flex items-center justify-center min-h-44 w-full group p-2">
        <div className="flex flex-col gap-1 items-center transition-all duration-100">
          <UploadFileIcon />
          <div className="text-sm font-normal">
            Drop file here or Click to upload
          </div>
          <div className="font-light text-xs">Maximum File Size:50MB</div>
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <div className="w-56 cursor-pointer">
      {isCurrentStageCompleted ? (
        <div className="w-full">{UploadContent}</div>
      ) : (
        <FileUpload
          refetch={getCaseFilesFetcher}
          documentId={file.id}
          loading2={loading2}
          setLoading2={setLoading2}
        >
          {UploadContent}
        </FileUpload>
      )}
    </div>
  );
};

export default PlaceholderCard;
