import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import {
  getCaseReviewStatusAPI,
  getSingleReviewAPI,
} from "@/http/services/manage";

import { Button } from "@/components/ui/button";
import LoadingComponent from "@/components/core/Loading";
import DisposalCallLogo from "@/components/icons/disposal-call-logo";
import SubmitCaseIcon from "@/components/icons/submit-case-icon";
import ManageCaseHeader from "../../ManageCaseHeader";

const UserDisposalCall = () => {
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

  // Case Review Status

  const { data: caseReviewStatus } = useQuery({
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

  const handleClick = () => {
    window.open(`/review/${service_id}`, "_blank");
  };

  return (
    <div className="h-full">
      <div className="">
        <ManageCaseHeader
          showNoteButton={false}
          showSummaryButton={false}
          showUploadButton={false}
        />
      </div>
      <div className="p-4 relative h-[calc(100%-43px)] overflow-auto flex items-center justify-center">
        {isFetching ? (
          <LoadingComponent loading={isFetching} message="Files..." />
        ) : (
          <>
            {reviewDetails?.length > 0 ? (
              <div className="flex flex-col items-center gap-2 justify-center">
                <div className="mt-8 my-6">
                  <SubmitCaseIcon />
                </div>

                <div className="text-center space-y-1">
                  <div className="text-xl 3xl:text-2xl font-medium">
                    Thank You For Submitting Your Review!
                  </div>
                  <div className="text-sm">
                    Your feedback has been successfully submitted
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 justify-center">
                <div className="my-6">
                  <DisposalCallLogo />
                </div>
                <div className="font-normal text-base 2xl:text-xl">
                  Case Status Update
                </div>
                <div className="w-full text-center my-2 text-sm 3xl:text-base text-gray-600">
                  Your case has reached the final stages but requires important
                  closing procedures we need your input to proceed with the next
                  steps
                </div>

                <div>
                  <Button
                    className="rounded-none bg-black cursor-pointer text-white h-fit font-normal hover:bg-black"
                    onClick={handleClick}
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDisposalCall;
