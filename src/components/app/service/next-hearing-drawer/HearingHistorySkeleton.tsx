import { Skeleton } from "@/components/ui/skeleton";

const HearingHistorySkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-3/4 bg-gray-200" />
          <Skeleton className="h-3 w-full bg-gray-200" />
          <div className="flex justify-end space-x-2">
            <Skeleton className="h-6 w-6 bg-gray-200" />
            <Skeleton className="h-6 w-6 bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HearingHistorySkeleton;
