import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EmptyCaseCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="bg-white border pt-1 border-gray-200 max-w-md rounded-none animate-pulse"
        >
          <CardHeader className="p-2 bg-gray-100">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24 bg-gray-300" />
              <Skeleton className="h-5 w-16 bg-gray-300" />
            </div>
          </CardHeader>
          <CardContent className="p-2 space-y-2">
            <Skeleton className="h-6 w-full bg-gray-300" />

            <div className="space-y-4 bg-gray-100 p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 bg-gray-300 rounded-full" />
                  <Skeleton className="h-5 w-20 bg-gray-300" />
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 bg-gray-300 rounded-full" />
                  <Skeleton className="h-5 w-24 bg-gray-300" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 bg-gray-300 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-28 bg-gray-300 mb-1" />
                    <Skeleton className="h-4 w-16 bg-gray-300" />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 bg-gray-300 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-28 bg-gray-300 mb-1" />
                    <Skeleton className="h-4 w-16 bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-1 px-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 bg-gray-300 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-24 bg-gray-300 mb-1" />
                  <Skeleton className="h-5 w-20 bg-gray-300" />
                </div>
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-16 bg-gray-300 rounded" />
                <Skeleton className="h-8 w-16 bg-gray-300 rounded" />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EmptyCaseCard;
