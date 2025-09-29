import LoadingIcon from "@/assets/loading-icon.svg";
import { LoadingComponentProps } from "@/lib/interfaces/core";
import { cn } from "@/lib/utils";

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  loading,
  message,
  className,
}) => {
  if (!loading) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center  z-50",
        className
      )}
    >
      <img src={LoadingIcon} alt="loading" className="w-36 h-36" />
    </div>
  );
};

export default LoadingComponent;
