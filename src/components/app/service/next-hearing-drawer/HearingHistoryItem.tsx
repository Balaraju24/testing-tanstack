import { HearingHistoryItemProps } from "@/lib/interfaces/service";
import { formatDate } from "@/utils/helpers/manage";
import dayjs from "dayjs";
import { forwardRef } from "react";

const HearingHistoryItem = forwardRef<HTMLDivElement, HearingHistoryItemProps>(
  ({ record }, ref) => {
    return (
      <div ref={ref} className="bg-gray-100 p-2">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <div className="flex items-center text-xs border border-gray-400 gap-1 p-1 bg-white">
              Next Hearing :<div>{formatDate(record?.next_hearing_date)}</div>
            </div>
            <div className="text-xs">
              {dayjs(record?.next_hearing_date).format("h:mm a")}
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="text-xs text-black">
              {record?.updated_at === null
                ? formatDate(record?.created_at)
                : formatDate(record?.updated_at)}
            </div>
          </div>
        </div>

        <div className="space-y-1 my-2">
          <div className="text-xs 3xl:text-sm text-gray-600 list-none font-normal">
            {record?.note.split("\n").map((note: any, index: any) => (
              <div
                key={index}
                className="text-black capitalize text-opacity-60"
              >
                {note.trim()}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

HearingHistoryItem.displayName = "HearingHistoryItem";

export default HearingHistoryItem;
