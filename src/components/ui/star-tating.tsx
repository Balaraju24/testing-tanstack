import { useState } from "react";

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  totalStars = 5,
  onRatingChange,
  disabled = false,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hover, setHover] = useState<number>(0);

  const handleClick = (value: number): void => {
    if (disabled) return;
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number): void => {
    if (!disabled) setHover(value);
  };

  const handleMouseLeave = (): void => {
    if (!disabled) setHover(0);
  };

  interface StarSVGProps {
    filled: boolean;
    size?: number;
  }

  const StarSVG: React.FC<StarSVGProps> = ({ filled, size = 32 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#facc15" : "none"} // Yellow fill when filled, transparent otherwise
      stroke="black" // Always show black border
      strokeWidth="1" // Increased stroke width for visibility
      strokeLinejoin="round" // Smoother corners
      strokeLinecap="round" // Smoother line ends
      className="transition-colors duration-200"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  return (
    <div
      className={`flex space-x-1 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      role="radiogroup"
      aria-label="Star rating"
    >
      {Array.from({ length: totalStars }, (_, index) => index + 1).map(
        (star) => (
          <span
            key={star}
            className={`cursor-pointer ${disabled ? "pointer-events-none" : ""}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            role="radio"
            aria-checked={star === rating}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
          >
            <StarSVG filled={star <= (hover || rating)} />
          </span>
        )
      )}
    </div>
  );
};

export default StarRating;
