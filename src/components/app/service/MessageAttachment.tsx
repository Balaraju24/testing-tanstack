import { sliceFilename } from "@/utils/helpers/manage";
import { Check, CheckCheck, File } from "lucide-react";

const MessageAttachment = ({
  attachmentName,
  downloadUrl,
  formattedTime,
  userReadStatus,
}: any) => {
  const allSeen =
    userReadStatus?.length > 0 && userReadStatus.every((r: any) => r.is_seen);

  return (
    <div className="p-2 relative bg-blue-100 max-w-full min-w-28">
      <div className="flex p-1 bg-gray-100 bg-opacity-50 mb-2">
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <File className="size-4" />
          {sliceFilename(attachmentName, 25)}
        </a>
      </div>

      <div className="text-[10px] absolute -bottom-1 right-1 flex items-center py-1">
        {formattedTime}
        {allSeen ? (
          <CheckCheck className="w-4 h-4 text-blue-500" />
        ) : (
          <Check className="w-4 h-4 text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default MessageAttachment;
