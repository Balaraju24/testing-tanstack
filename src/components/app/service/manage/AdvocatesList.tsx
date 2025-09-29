import DefaultUserIcon from "@/components/icons/default-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AdvocateGroupAvatarsProps } from "@/lib/interfaces/getcasefiles";

const getAdvocateColor = (advocateId: number) => {
  const colors = ["#000000"];
  return colors[advocateId % colors.length];
};

const getAdvocateLetters = (advocate: any) => {
  const firstName = advocate.first_name || "";
  const lastName = advocate.last_name || "";
  return firstName || lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    : "?";
};

export function AdvocateGroupAvatars({
  advocateCases,
  id,
}: AdvocateGroupAvatarsProps) {
  const assignedAdvocates = advocateCases.filter(
    (advocateCase) => advocateCase.is_advocate_assigned
  );

  const displayedAdvocates = assignedAdvocates.slice(0, 2);
  const remainingCount = Math.max(assignedAdvocates.length - 2, 0);

  if (assignedAdvocates.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild id={`${id}-advocate-group-tooltip-trigger`}>
          <div
            className="flex -space-x-2 cursor-pointer"
            id={`${id}-advocate-group-list`}
          >
            {displayedAdvocates.map((advocateCase, index) => {
              const advocate = advocateCase.advocate;
              const advocateColor = getAdvocateColor(advocate.id);

              return (
                <Avatar
                  key={advocate.id + String(index)}
                  style={{
                    border: `1px `,
                  }}
                  className="h-7 w-7 rounded-full bg-white border-none"
                  id={`${id}-advocate-avatar-${index}`}
                >
                  <AvatarImage
                    src={advocate?.profile_pic}
                    alt={`${advocate.first_name} ${advocate.last_name}`}
                    className="rounded-full object-cover border-none"
                    id={`${id}-advocate-avatar-image-${index}`}
                  />
                  <AvatarFallback
                    className="text-xs"
                    style={{
                      backgroundColor: advocateColor + "20",
                      color: advocateColor,
                    }}
                    id={`${id}-advocate-avatar-fallback-${index}`}
                  >
                    {getAdvocateLetters(advocate)}
                  </AvatarFallback>
                </Avatar>
              );
            })}

            {remainingCount > 0 && (
              <div className="relative" id={`${id}-advocate-remaining`}>
                <div
                  className="flex items-center justify-center h-7 w-7 text-xs font-normal text-white bg-gray-700 rounded-full border border-background"
                  id={`${id}-advocate-remaining-count`}
                >
                  +{remainingCount}
                </div>
              </div>
            )}
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          align="start"
          className="p-2 border border-gray-200  bg-white max-h-48 min-w-56 shadow-md rounded-md overflow-auto"
          id={`${id}-advocate-tooltip-content`}
        >
          <div
            className="flex flex-col space-y-2"
            id={`${id}-advocate-tooltip-list`}
          >
            {assignedAdvocates.map((advocateCase, index) => {
              const advocate = advocateCase.advocate;
              const fullName =
                `${advocate.first_name} ${advocate.last_name}`.trim();

              return (
                <div
                  key={advocate.id + String(index)}
                  className={`flex items-center gap-2 py-1 px-2 rounded ${
                    index < assignedAdvocates.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                  id={`${id}-advocate-tooltip-user-${index}`}
                >
                  <Avatar className="h-6 w-6 flex items-center justify-center">
                    {advocate.profile_pic ? (
                      <AvatarImage
                        src={advocate.profile_pic}
                        className="rounded-full h-6 w-6 object-cover object-top"
                      />
                    ) : (
                      <DefaultUserIcon className="h-4 w-4" />
                    )}
                  </Avatar>
                  <span className="text-xs font-medium">
                    {fullName || "Unknown Advocate"}
                  </span>
                </div>
              );
            })}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
