import { getIssueIcon } from "@/lib/constants/litigation";
import {
  LitigationService,
  SubIssueGridProps,
} from "@/lib/interfaces/litigation";

export const SubIssueGrid = ({
  subIssues,
  selectedSubIssue,
  onSubIssueSelect,
}: SubIssueGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {subIssues.map((subIssue: LitigationService, index: number) => {
        const isSelected = selectedSubIssue?.id === subIssue.id;

        const IconComponent = getIssueIcon(subIssue.sub_issue || "");
        const icon = IconComponent ? (
          <IconComponent
            className={`h-7 w-7 ${isSelected ? "text-white" : "text-black"}`}
          />
        ) : (
          <span role="img" aria-label="icon" className="text-xl">
            📑
          </span>
        );

        return (
          <div
            key={index}
            onClick={() => onSubIssueSelect(subIssue)}
            className={`p-2 max-w-full cursor-pointer transition-all duration-200 ${
              isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">{icon}</div>
              <div className="flex-1 min-h-[40px] flex flex-col justify-center">
                <div className="font-normal text-base 2xl:text-lg uppercase leading-relaxed">
                  {subIssue.sub_issue}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
