import { getIssueIcon } from "@/lib/constants/litigation";
import { IssueTypeGridProps } from "@/lib/interfaces/litigation";

export const IssueTypeGrid = ({
  issueTypes,
  selectedIssueType,
  onIssueTypeSelect,
}: IssueTypeGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {issueTypes.map((issueType: string, index: number) => {
        const isSelected = selectedIssueType === issueType;

        const IconComponent = getIssueIcon(issueType);
        const icon = IconComponent ? (
          <IconComponent
            className={`h-6 w-6 ${isSelected ? "text-white" : "text-black"}`}
          />
        ) : (
          <span role="img" aria-label="icon" className="text-xl">
            📋
          </span>
        );

        return (
          <div
            key={index}
            onClick={() => onIssueTypeSelect(issueType)}
            className={`p-2 max-w-96 cursor-pointer transition-all duration-200 ${
              isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">{icon}</div>
              <div className="flex-1 min-h-[40px] flex flex-col justify-center">
                <div className="font-normal text-base 2xl:text-lg uppercase leading-relaxed">
                  {issueType}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
