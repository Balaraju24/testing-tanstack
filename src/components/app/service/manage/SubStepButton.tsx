import ApprovedIcon from "@/components/icons/approved-Icon";
import CurrentIcon from "@/components/icons/current-icon";
import PendingIcon from "@/components/icons/pending-icon";
import { Button } from "@/components/ui/button";

export default function SubStepButton({
  subStep,
  isActive,
  status,
  disabled,
  onClick,
}: {
  subStep: any;
  isActive: boolean;
  status: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      asChild
      variant={isActive ? "default" : "ghost"}
      className={`justify-start h-10 px-3 text-xs whitespace-normal ${
        isActive
          ? "bg-white hover:bg-white w-full rounded-none !border !border-gray-400 shadow-sm"
          : "text-gray-700 !border-none "
      } 
      ${disabled ? "cursor-not-allowed opacity-75 border-none " : " "}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className="[&_svg]:size-4 2xl:[&_svg]:size-4 flex items-center justify-center">
          {isActive && status !== "completed" ? (
            <CurrentIcon />
          ) : status === "completed" ? (
            <div className="text-green-700">
              <ApprovedIcon />
            </div>
          ) : (
            <PendingIcon />
          )}
        </div>
        <div
          title={subStep.label}
          className={`text-xs text-left capitalize cursor-pointer w-44
              ${isActive ? "text-gray-700" : "text-gray-500"} break-words `}
        >
          {subStep.label}
        </div>
      </div>
    </Button>
  );
}
