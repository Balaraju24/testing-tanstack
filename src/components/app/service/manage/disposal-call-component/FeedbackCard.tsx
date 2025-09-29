import Logo from "@/assets/nyaya-tech-logo.svg";
import Rating from "@/components/ui/shadcn-io/rating";
import { FeedbackCardProps } from "@/lib/interfaces/manage";
import UnOrderList from "./UnOrderList";

const FeedbackCard = ({ review }: FeedbackCardProps) => {
  return (
    <div className="p-2 bg-gray-100 space-y-3">
      <div className="flex justify-between">
        <img src={Logo} alt="" className="w-40" />
        <Rating rating={parseFloat(review?.rating)} />
      </div>
      <div className="space-y-1">
        <h4 className="text-md leading-none font-medium">Feedback</h4>
        <div className="text-sm">
          <UnOrderList text={review?.feedback} />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-md leading-none font-medium">
          Suggestions for Improvement
        </h4>
        <div className="text-sm">
          {review?.suggestion?.trim() ? (
            <UnOrderList text={review.suggestion} />
          ) : (
            "--"
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
