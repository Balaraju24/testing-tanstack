import { Dispatch, SetStateAction } from "react";
import { ChatMessageData } from "./service";

export interface FileUploadProps {
  refetch: () => void;
  sendAttachment: (
    attachmentKey: string,
    fileName: string,
    file_type: string,
    file_size: number
  ) => void;
  loading2?: boolean;
  setLoading2?: Dispatch<SetStateAction<boolean>>;
}

export interface ChatSendProps {
  message: string | null;
  onMessageChange: (message: string) => void;
  sendMessage: () => void;
  isPending: boolean;
  isEditing: boolean;
  onCancelEdit: () => void;
  disabled?: boolean;
  sendAttachment: (
    attachmentKey: string,
    fileName: string,
    file_type: string,
    file_size: number
  ) => void;
  refetch: () => void;
}

export type ChatData = {
  date: string;
  messages: ChatMessageData[];
};

export type UserDetails = {
  name: string;
  avatar: string;
  phone: string;
  designation?: string;
  email?: string;
  address?: string | null;
};
