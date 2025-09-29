import ChatSendIcon from "@/components/icons/chat-send-icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatSendProps } from "@/lib/interfaces/chat";
import { X } from "lucide-react";
import { useState } from "react";
import ChatFileUpload from "./ChatFileUpload";

const ChatSend = ({
  message,
  onMessageChange,
  sendMessage,
  isPending,
  isEditing,
  onCancelEdit,
  disabled,
  sendAttachment,
  refetch,
}: ChatSendProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const hasMessage = message && message.trim() !== "";
  const showCancelButton = hasMessage && isEditing;
  const showSendButton = hasMessage;

  let rightPadding = "pr-3";
  if (showSendButton && showCancelButton) {
    rightPadding = "pr-20";
  } else if (showSendButton) {
    rightPadding = "pr-12";
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = (
    attachmentKey: string,
    fileName: string,
    file_type: string,
    file_size: number
  ) => {
    sendAttachment(attachmentKey, fileName, file_type, file_size);
  };

  return (
    <div className="w-full bg-indigo-50  ">
      <div className="p-0  px-2  border-gray-200">
        <div className="relative flex items-center bg-white rounded-lg border border-gray-300 transition-colors min-h-[48px]">
          <div className="flex-shrink-0 pl-2">
            <Button
              className="p-1 h-8 w-8 bg-transparent hover:bg-gray-100 text-gray-500 transition-all duration-300"
              disabled={isUploading || disabled}
            >
              <ChatFileUpload
                refetch={refetch}
                sendAttachment={handleFileUpload}
                loading2={isUploading}
                setLoading2={setIsUploading}
              />
            </Button>
          </div>

          <div className="flex-1 relative">
            <Textarea
              className={`border-0 bg-transparent resize-none h-10 py-2 pl-2 ${rightPadding} focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-500 leading-5`}
              placeholder="Type a message..."
              value={message || ""}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyDown={handleKeyDown}
              // disabled={disabled}
            />

            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {showCancelButton && (
                <Button
                  className="h-8 w-8 p-0 bg-transparent hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-all duration-300"
                  onClick={onCancelEdit}
                  disabled={isPending || disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              {showSendButton && (
                <Button
                  type="submit"
                  className="h-9 w-9 p-0 bg-transparent  text-black/60 hover:text-black transition-all duration-300 cursor-pointer"
                  onClick={() => sendMessage()}
                  disabled={isUploading || isPending || disabled}
                >
                  <ChatSendIcon className="h-6 w-6 stroke-current" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSend;
