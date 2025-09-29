import HourGlassIcon from "@/components/icons/hour-glass-icon";
import Litigation from "@/components/icons/litigation-icon";
import RefreshIcon2 from "@/components/icons/refresh-icon-2";
import { Check, TriangleAlert } from "lucide-react";
export const getIcon = (title: string) => {
  switch (title) {
    case "cases":
      return (
        <div className="p-1 bg-green-200">
          <Litigation className="w-3.5 h-3.5 text-green-700" />
        </div>
      );

    case "to_start":
      return (
        <div className="p-1 bg-blue-100">
          <HourGlassIcon className="w-3.5 h-3.5 text-blue-500" />
        </div>
      );
    case "progress":
      return (
        <div className="p-1 bg-orange-100">
          <RefreshIcon2 className="w-3.5 h-3.5 text-orange-500" />
        </div>
      );
    case "completed":
      return (
        <div className="p-1 bg-green-100">
          <Check className="w-4 h-4 text-green-900" />
        </div>
      );
    default:
      return null;
  }
};
