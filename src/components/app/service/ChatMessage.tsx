import DeleteStrokeIcon from "@/components/icons/delete-stroke-icon";
import HorizontalDotsIcon from "@/components/icons/dots-horizontal-icon";
import EditPrice from "@/components/icons/edit-price";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteSingleCaseChatAPI } from "@/http/services/service";
import { ChatMessageProps } from "@/lib/interfaces/service";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";
import MessageAttachment from "./MessageAttachment";
import MessageText from "./MessageText";

const ChatMessage = ({ messageData, refetch, onEdit }: ChatMessageProps) => {
  const [open, setOpen] = useState(false);

  const currentTime = dayjs();
  const messageTime = dayjs(messageData.created_at);
  const timeDifferenceInMinutes = currentTime.diff(messageTime, "minute");

  const canEditOrDelete = timeDifferenceInMinutes <= 13;
  const formattedTime = messageTime.format("hh:mm a");

  const { mutateAsync: mutateDeleteChat, isPending: deletingChat } =
    useMutation({
      mutationKey: ["delete-chat-message"],
      mutationFn: async (chatId: string) => {
        const response = await deleteSingleCaseChatAPI(chatId);
        return response?.data;
      },
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        toast.error(
          `Failed to delete message: ${error.message || "Unknown error"}`,
          {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          }
        );
      },
    });

  const handleDelete = () => {
    if (messageData.id) {
      toast.promise(mutateDeleteChat(messageData.id), {
        loading: "Message deleting...",
        success: "Message deleted successfully",
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  const handleEdit = () => {
    if (messageData.id) {
      onEdit(messageData.id, messageData.message, messageData.created_at);
    }
  };

  return (
    <div className="flex items-start justify-self-end group justify-end gap-2 w-3/5 text-sm">
      <div>
        {canEditOrDelete && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <div className="-mt-1 cursor-pointer">
                <HorizontalDotsIcon />
              </div>
            </PopoverTrigger>

            <PopoverContent
              side="left"
              className="flex flex-col w-fit px-1 py-1 items-start mt-14 bg-white border border-gray-300"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleDelete();
                  setOpen(false);
                }}
                disabled={deletingChat}
                className=" bg-transparent hover:bg-gray-100 w-full"
              >
                {deletingChat ? (
                  "Deleting..."
                ) : (
                  <div className="flex gap-1 text-xs">
                    <DeleteStrokeIcon /> Delete
                  </div>
                )}
              </Button>
              {messageData.type === "MESSAGES" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleEdit();
                    setOpen(false);
                  }}
                  className="p-1 bg-transparent hover:bg-gray-100 w-full"
                >
                  <div className="flex gap-1 text-xs">
                    {" "}
                    <EditPrice /> Edit
                  </div>
                </Button>
              )}
            </PopoverContent>
          </Popover>
        )}
      </div>
      {messageData.type === "MESSAGES" && (
        <MessageText
          message={messageData.message}
          formattedTime={formattedTime}
          userReadStatus={messageData?.user_read_status}
        />
      )}
      {messageData.type === "ATTACHMENT" && messageData?.attachment_key && (
        <MessageAttachment
          attachmentName={messageData.attachment_name}
          downloadUrl={messageData.download_url}
          formattedTime={formattedTime}
          userReadStatus={messageData?.user_read_status}
        />
      )}
    </div>
  );
};

export default ChatMessage;
