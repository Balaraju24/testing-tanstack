import MoveDownIcon from "@/components/icons/arrow-move-down";
import { StepHeaderProps } from "@/lib/interfaces/litigation";
import { ArrowLeftIcon } from "lucide-react";

export const StepHeader = ({
  onBackClick,
  currentStep,
  totalSteps,
  title,
  searchComponent,
}: StepHeaderProps) => {
  return (
    <>
      <div className="max-w-6xl flex items-center justify-between">
        <button
          className="p-1.5 px-2 border border-gray-300 rounded-none cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={onBackClick}
        >
          <ArrowLeftIcon className="h-4 w-5 text-gray-600" />
        </button>

        <div className="flex justify-center pt-1 items-center gap-2">
          <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm 2xl:text-base font-normal">
            {currentStep}
          </div>
          <span className="text-sm 2xl:text-base text-yellow-600 font-light">
            Step {currentStep}/{totalSteps}
          </span>
        </div>
      </div>

      <div className="max-w-6xl flex items-center justify-between mt-16 mb-2">
        <h1 className="text-lg font-light text-yellow-600 gap-2 flex">
          {title}
          <MoveDownIcon className="animate-bounce mt-1" />
        </h1>
        {searchComponent && (
          <div className="flex-shrink-0">{searchComponent}</div>
        )}
      </div>
    </>
  );
};
