import { HearingHistoryListProps } from "@/lib/interfaces/service";
import HearingHistoryItem from "./HearingHistoryItem";
import HearingHistorySkeleton from "./HearingHistorySkeleton";

const HearingHistoryList = ({
  allRecords,
  isLoading,
  isFetchingNextPage,
  lastHearingSummaryRef,
}: HearingHistoryListProps) => {
  if (isLoading && !isFetchingNextPage) {
    return <HearingHistorySkeleton />;
  }

  if (allRecords.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm h-full flex items-center justify-center">
        No Hearing history available
      </div>
    );
  }

  return (
    <>
      {allRecords.map((record, index) => {
        const isLastLog = index === allRecords.length - 1;
        return (
          <HearingHistoryItem
            key={index}
            record={record}
            ref={isLastLog ? lastHearingSummaryRef : null}
          />
        );
      })}
      {isFetchingNextPage && (
        <div className="flex justify-center py-2">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default HearingHistoryList;
