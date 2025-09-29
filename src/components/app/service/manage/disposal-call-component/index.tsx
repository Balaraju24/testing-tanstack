import LoadingComponent from "@/components/core/Loading";
import DisposalCallLogo from "@/components/icons/disposal-call-logo";
import SubmitCaseIcon from "@/components/icons/submit-case-icon";
import { Button } from "@/components/ui/button";
import {
  getCaseReviewStatusAPI,
  getSingleReviewAPI,
  sendReviewLinkAPI,
} from "@/http/services/manage";
import {
  DynamicComponentProps,
  ReviewLinkResponse,
  reviewType,
} from "@/lib/interfaces/manage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import ManageCaseHeader from "../../ManageCaseHeader";
import FeedbackCard from "./FeedbackCard";

const DisposalCall = ({ stage, subStage }: DynamicComponentProps) => {
  const { service_id } = useParams({ strict: false });

  const { isFetching, data: reviewDetails } = useQuery({
    queryKey: ["review-details", service_id],
    enabled: !!service_id,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await getSingleReviewAPI(Number(service_id));
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

  const { data: caseReviewStatus, refetch: refetchStatus } = useQuery({
    queryKey: ["case-review-status", service_id],
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await getCaseReviewStatusAPI(service_id as string);
        if (response.status === 200 || response.status === 201) {
          const { data } = response?.data;
          return data;
        }
      } catch {
        throw new Error("Failed to fetch case data");
      }
    },
  });

  const { mutate: mutateSendReviewLink, isPending } = useMutation({
    mutationFn: async () => {
      const payload = { caseId: Number(service_id) };
      const response = await sendReviewLinkAPI(service_id, payload);
      return response?.data;
    },
    onSuccess: (data: ReviewLinkResponse) => {
      refetchStatus();
      toast.success(data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: () => {
      toast.error("Failed to send Review link", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

  const NyayatechFeedback = reviewDetails?.filter((review: any) => {
    return review?.feedback_type === "NYAYA_TECH";
  });

  return (
    <div className="h-full">
      <div className="h-full">
        <ManageCaseHeader
          showNoteButton={false}
          showActionButton={reviewDetails?.length !== 0}
          showSummaryButton={false}
          showUploadButton={false}
          caseStage={stage}
          caseSubStage={subStage}
        />
        <div className="h-[calc(100%-55px)] overflow-auto relative  p-2">
          {reviewDetails?.length === 0 || undefined ? (
            <div>
              <div className="flex flex-col items-center gap-2 justify-center">
                <div className="my-4">
                  <DisposalCallLogo />
                </div>
                <div className="font-medium text-xl">Case Status Update</div>
                <div className="w-2/3 text-center my-2">
                  This case is in the final stage and waiting for the user’s
                  review to complete .
                </div>
              </div>

              {caseReviewStatus?.is_review_link_sent && (
                <div className="flex flex-col items-center gap-4 justify-center">
                  <div className="mt-10 my-6">
                    <SubmitCaseIcon />
                  </div>

                  <div className="text-center space-y-1">
                    <div className="text-xl 3xl:text-2xl text-green-600">
                      Review Link Sent
                    </div>
                    <div className="3xl:text-base">
                      We are waiting for the user to submit their review
                    </div>
                  </div>
                  <Button
                    className="underline 3xl:text-base cursor-pointer bg-transparent"
                    onClick={() => {
                      mutateSendReviewLink();
                    }}
                    disabled={isPending}
                  >
                    Resend Link
                  </Button>
                </div>
              )}
            </div>
          ) : isFetching ? (
            <LoadingComponent loading={isFetching} />
          ) : (
            <>
              <div className="h-full overflow-auto space-y-4 flex flex-col">
                <div className="flex-1 min-h-0 flex flex-col ">
                  <div className=" overflow-auto shrink-0">
                    {NyayatechFeedback?.map((review: reviewType) => (
                      <FeedbackCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisposalCall;
