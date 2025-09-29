// src/constants/tabs.ts
import ChatIcon from "@/components/icons/chat-icon";
import FileIcon from "@/components/icons/file-icon";
import LogIcon from "@/components/icons/log-icon";
import NotesIcon from "@/components/icons/notes-icon";
import SummaryIcon from "@/components/icons/summary-icon";
import { TabItem } from "../interfaces/service";

export const TABS_CONFIG: TabItem[] = [
  { value: "case-history", icon: SummaryIcon, label: "Case History" },
  { value: "notes", icon: NotesIcon, label: "Notes" },
  { value: "chat", icon: ChatIcon, label: "Chat Box" },
  { value: "files", icon: FileIcon, label: "Files" },
  { value: "logs", icon: LogIcon, label: "Logs" },
];
