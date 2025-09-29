import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";

import { addReviewAPI } from "@/http/services/manage";

import ApprovedIcon from "@/components/icons/approved-Icon";
import SubmitCaseIcon from "@/components/icons/submit-case-icon";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/star-tating";
import { Textarea } from "@/components/ui/textarea";

import Logo from "@/assets/nyaya-tech-logo.svg";
import NyayatechAvatar from "@/assets/tech.svg";

const UserReview = () => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const [feedbackNyayaTech, setFeedbackNyayaTech] = useState("");
  const [suggestionNyayaTech, setSuggestionNyayaTech] = useState("");

  const [ratingNyayaTech, setRatingNyayaTech] = useState<number | undefined>(
    undefined
  );

  const [Nyayatech, setNyayatech] = useState(false);
  const [Advocate, setAdvocate] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  const { service_id } = useParams({ strict: false });

  // Submit review

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: async () => {
      const data = {
        review: [
          {
            case_id: Number(service_id),
            feedback_type: "NYAYA_TECH",
            rating: ratingNyayaTech ?? null,
            feedback: feedbackNyayaTech || null,
            is_recommended: true,
            suggestion: suggestionNyayaTech,
            case_stage: "CSCR",
            case_sub_stage: "CSCR#DSCL",
          },
        ],
      };
      const response = addReviewAPI(data);
      return response;
    },
    onSuccess: () => {
      setError("");
      setShowSuccessPopup(true);
    },
    onError: (error: any) => {
      if (error?.status === 404 || error?.status === 401) {
        setError(error.message);
      } else if (error.status == 422) {
        let errorsData = error.data.errData;
        let formattedErrors: Record<string, string> = {};
        Object.keys(errorsData).forEach((key) => {
          formattedErrors[key] = errorsData[key][0];
        });
        setErrors(formattedErrors);
      } else if (error.status === 409) {
        toast.error(error?.data?.message);
      }
    },
  });

  const handleSubmit = () => {
    submitReview();
  };

  return (
    <>
      {!showSuccessPopup && (
        <>
          <div className="flex bg-[#F0F4FA] justify-between items-center  px-6 border-b-2 border-gray-300  h-12 3xl:h-16">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="" className="w-40" />
            </div>
          </div>
          <div className=" bg-gray-100 flex justify-center p-3 h-[calc(100vh-48px)] overflow-auto 3xl:h-[calc(100vh-64px)]">
            <div className=" xl:w-3/5 space-y-4">
              <div className=" items-center hidden xl:flex">
                <div className="p-2 bg-white grow flex justify-between items-center w-1/5">
                  <div className="flex gap-2">
                    <Avatar className="w-7 h-7 bg-black flex items-center justify-center">
                      <AvatarImage src={NyayatechAvatar} className="w-5" />
                    </Avatar>
                    Nyayatech
                  </div>
                  {Nyayatech && (
                    <div className="text-green-700">
                      <ApprovedIcon />
                    </div>
                  )}
                </div>
              </div>

              {!Nyayatech && (
                <div className="space-y-4">
                  <div className="border border-gray-300 p-3 space-y-1 bg-white">
                    <img src={Logo} alt="" className="w-40" />
                    <div className="p-2 border  border-gray-300 space-y-2">
                      <h5 className="text-md font-medium">
                        {" "}
                        Rating{" "}
                        <span className="text-sm text-red-600">&#42;</span>
                      </h5>
                      <StarRating
                        initialRating={ratingNyayaTech}
                        onRatingChange={setRatingNyayaTech}
                      />
                    </div>
                    {errors["review.0.rating"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["review.0.rating"]}
                      </p>
                    )}
                    <div className="border border-gray-300 p-3">
                      <h5 className="text-md font-medium">
                        {" "}
                        Feedback{" "}
                        <span className="text-sm text-red-600">&#42;</span>
                      </h5>
                      <Textarea
                        className="border-0  border-gray-300 h-16 resize-none px-1 py-1 "
                        placeholder="Your feedback"
                        value={
                          feedbackNyayaTech.charAt(0).toUpperCase() +
                          feedbackNyayaTech.slice(1)
                        }
                        onChange={(e) => setFeedbackNyayaTech(e.target.value)}
                      />
                    </div>
                    {errors["review.0.feedback"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["review.0.feedback"]}
                      </p>
                    )}

                    <div className="border border-gray-300 p-3">
                      <h5 className="text-md font-medium">
                        {" "}
                        Suggestions for improvement
                      </h5>
                      <Textarea
                        className="border-0  border-gray-300 h-16 resize-none px-1 py-1 "
                        placeholder="Your feedback"
                        value={
                          suggestionNyayaTech.charAt(0).toUpperCase() +
                          suggestionNyayaTech.slice(1)
                        }
                        onChange={(e) => setSuggestionNyayaTech(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-x-2 flex justify-end ">
                    <Button
                      className="rounded-none text-white text-sm bg-black h-8 py-2 px-5 font-normal hover:bg-black"
                      onClick={handleSubmit}
                      disabled={
                        isPending || !ratingNyayaTech || !feedbackNyayaTech
                      }
                    >
                      {isPending ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {showSuccessPopup && (
        <div className="flex flex-col items-center gap-2 justify-center h-screen">
          <div>
            <SubmitCaseIcon />
          </div>
          <div className="text-3xl 3xl:text-6xl text-green-600">Done</div>
          <div className="text-center space-y-1">
            <div className="text-xl 3xl:text-2xl font-medium">
              Thank You For Submitting Your Review!
            </div>
            <div className="text-sm">
              Your feedback has been successfully submitted
            </div>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default UserReview;
