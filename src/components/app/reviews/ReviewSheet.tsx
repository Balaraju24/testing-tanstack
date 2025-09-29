import LoadingComponent from "@/components/core/Loading";
import DefaultUserIcon from "@/components/icons/default-user";
import { Avatar } from "@/components/ui/avatar";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { getSingleReviewAPI } from "@/http/services/manage";
import { formatDate } from "@/utils/helpers/manage";
import { reviewType } from "@/lib/interfaces/manage";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";
import FeedbackCard from "../service/manage/disposal-call-component/FeedbackCard";

const ReviewSheet: React.FC<any> = ({ selectedID, onClose }) => {
  const { isLoading, data: reviewDetails } = useQuery({
    queryKey: ["review-details", selectedID],
    enabled: !!selectedID,
    queryFn: async () => {
      try {
        if (!selectedID) return;
        const response = await getSingleReviewAPI(selectedID);
        if (response.status === 200 || response.status === 201) {
          const data = response?.data?.data;
          return data;
        }
      } catch {
        throw new Error("Failed to fetch Data");
      }
    },
    refetchOnWindowFocus: false,
  });

  const NyayatechFeedback = reviewDetails?.filter((review: reviewType) => {
    return review?.feedback_type === "NYAYA_TECH";
  });

  const LegalAdvisorFeedback = reviewDetails?.filter((review: reviewType) => {
    return review?.feedback_type === "B2C_LEGAL_ADVISOR";
  });

  const AdvocateFeedback = reviewDetails?.filter((review: reviewType) => {
    return review?.feedback_type === "ADVOCATE";
  });

  return (
    <Sheet open={!!selectedID} onOpenChange={onClose}>
      <SheetContent className="bg-white w-4/12 p-2 px-6 font-primary h-full border-0">
        <div className="flex items-center justify-between w-full mt-3 mb-3">
          {/* Left (start) */}
          <span className="font-medium">Point of Contact Review</span>
          {/* Right (end) */}{" "}
          <SheetClose className="cursor-pointer">
            {" "}
            <X />{" "}
          </SheetClose>{" "}
        </div>

        <div className="h-[calc(100vh-60px)]  flex flex-col">
          {isLoading ? (
            <LoadingComponent loading={isLoading} />
          ) : (
            <>
              <div className="flex items-center gap-4 pb-4 shrink-0">
                <div>
                  <div className="bg-gray-200 p-1 text-xs">
                    {NyayatechFeedback?.[0]?.case?.temp_id}
                  </div>
                </div>
                <div className="w-px h-7 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">By</div>{" "}
                  <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-900">
                    <DefaultUserIcon className="w-4 h-4" />
                  </Avatar>
                  <div>
                    <div className="text-sm">
                      {NyayatechFeedback?.[0]?.reviewBy?.first_name}{" "}
                      {NyayatechFeedback?.[0]?.reviewBy?.last_name}
                    </div>
                    <div className="text-xs">
                      {formatDate(NyayatechFeedback?.[0]?.created_at)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 max-h-[80%] overflow-auto shrink-0">
                {NyayatechFeedback?.map((review: reviewType) => (
                  <FeedbackCard key={review.id} review={review} />
                ))}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReviewSheet;
