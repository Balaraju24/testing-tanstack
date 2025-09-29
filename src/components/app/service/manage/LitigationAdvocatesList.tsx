import OverflowContentTooltip from "@/components/core/OverflowContentTooltip";
import AddressIcon from "@/components/icons/address-icon";
import DefaultUserIcon from "@/components/icons/default-user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LitigationAdvocatesListProps } from "@/lib/interfaces/getcasefiles";
import { Mail, Smartphone } from "lucide-react";

export function LitigationAdvocatesList({
  advocateCases,
  onAdvocateSelect,
  selectedAdvocateIndex = 0,
}: LitigationAdvocatesListProps) {
  const assignedAdvocates = advocateCases.filter(
    (advocateCase) => advocateCase.is_advocate_assigned
  );
  if (assignedAdvocates.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No advocates assigned
      </div>
    );
  }

  return (
    <div className="max-h-72 overflow-y-auto scrollbar-hide space-y-2">
      {assignedAdvocates.map((advocateCase, index) => {
        const advocate = advocateCase.advocate;
        const fullName =
          `${advocate.first_name || ""} ${advocate.last_name || ""}`.trim();

        return (
          <div
            key={advocate.id + String(index)}
            className={`cursor-pointer border-gray-300 border-b last:border-none rounded-none hover:bg-gray-100 p-2 transition-colors  `}
            onClick={() => onAdvocateSelect?.(advocate, index)}
          >
            <div className="space-y-0 w-full font-light ">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-0 items-center">
                  <Avatar className="flex items-center justify-center mx-1 mb-1">
                    {advocate.profile_pic ? (
                      <AvatarImage
                        src={advocate.profile_pic}
                        className="rounded-full h-7 w-7 object-top object-cover"
                      />
                    ) : (
                      <DefaultUserIcon className="h-4 w-4" />
                    )}
                  </Avatar>
                  <div className="flex flex-col font-light">
                    <div className="leading-2 w-24">
                      <OverflowContentTooltip text={fullName} />
                    </div>
                    {advocate.designation && (
                      <div className="text-gray-400 text-sm">
                        {advocate.designation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="ml-3 space-y-1 xl:text-[10px] 2xl:text-xs 3xl:text-sm">
                <div className="flex gap-2 items-center">
                  <Smartphone strokeWidth={1} className="flex-none w-4 h-4" />
                  {advocate.phone?.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3")}
                </div>
                {advocate.email && (
                  <div
                    className="flex gap-2 items-center w-56 overflow-hidden"
                    title={advocate.email}
                  >
                    <Mail
                      strokeWidth={1}
                      size={20}
                      className="flex-none w-4 h-4"
                    />
                    <span className="truncate block whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
                      {advocate.email}
                    </span>
                  </div>
                )}
                {advocate.address && (
                  <div className="flex gap-2 items-center overflow-auto">
                    <AddressIcon />
                    {advocate.address}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
