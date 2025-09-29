import { issueIcons } from "@/lib/constants/litigation";
import { IssueGridProps, LitigationService } from "@/lib/interfaces/litigation";

export const IssueGrid = ({
  issues,
  selectedIssue,
  onIssueSelect,
}: IssueGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
      {issues.map((litigation: LitigationService, index: number) => {
        const isSelected = selectedIssue?.id === litigation.id;
        const icon = issueIcons[litigation.issue]?.({
          className: `h-7 w-7 ${isSelected ? "text-white" : "text-black"}`,
        }) ?? (
          <span role="img" aria-label="icon" className="text-xl">
            📄
          </span>
        );

        return (
          <div
            key={index}
            onClick={() => onIssueSelect(litigation)}
            className={`p-2 max-w-72 cursor-pointer transition-all duration-200 ${
              isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">{icon}</div>
              <div className="flex-1 min-h-[40px] flex flex-col justify-center">
                <div className="font-normal text-base 2xl:text-lg uppercase leading-relaxed">
                  {litigation.issue}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
