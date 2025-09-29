import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Loader2, User } from "lucide-react";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";
import CustomDateRangePicker from "@/components/core/CustomDateRangePicker";
import NoHearingDateIcon from "@/components/icons/no-hearing-date-icon";
import NoDueDateIcon from "@/components/icons/no-due-date-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HearingCardProps {
  title: string;
  bg: string;
  data: any[];
  isLoading: boolean;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  dateField: "next_hearing_date" | "due_date";
  emptyState: React.ReactNode;
  label: string;
  showOverdue?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  handleRoute?: (id: number) => void;
}

const HearingCard = ({
  title,
  bg,
  data,
  isLoading,
  dateRange,
  setDateRange,
  dateField,
  emptyState,
  label,
  showOverdue = false,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  scrollRef,
  handleRoute,
}: HearingCardProps) => {
  return (
    <div className={`h-full ${bg} p-2`}>
      <div className="flex mb-2 justify-between items-center">
        <div className="text-xs">{title}</div>
        <CustomDateRangePicker
          date={dateRange}
          setDate={setDateRange}
          mode="day-month"
        />
      </div>

      <div className="h-[calc(100%-40px)]  p-2 space-y-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        ) : data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            {emptyState}
          </div>
        ) : (
          <div className="h-full space-y-1.5 overflow-auto ">
            {data?.map((item, index) => {
              const dateVal = item?.[dateField]
                ? new Date(item?.[dateField])
                : null;
              const isValidDate = dateVal && !isNaN(dateVal.getTime());

              let month = "--",
                day = "--",
                time = "--";
              if (isValidDate) {
                const dayjsDate = dayjs(dateVal).tz("Asia/Kolkata");
                month = dayjsDate.format("MMM");
                day = dayjsDate.format("DD");
                time = dayjsDate.format("hh:mm A");
              }

              const userName = item?.user
                ? `${item?.user.first_name || ""} ${item?.user.last_name || ""}`.trim()
                : "--";

              return (
                <div
                  key={index}
                  className="bg-white cursor-pointer flex items-center border border-gray-300"
                  onClick={() => {
                    if (handleRoute) {
                      handleRoute(item?.id);
                    }
                  }}
                >
                  <div className="flex flex-col items-center min-w-[60px]">
                    {showOverdue && item?.status === "OVERDUE" && (
                      <div className="bg-red-500 w-full text-center text-xs text-white">
                        Overdue
                      </div>
                    )}
                    <div className="p-2 flex flex-col items-center justify-center">
                      <div className="text-xs">{month}</div>
                      <div className="text-lg font-medium">{day}</div>
                      <div className="text-xs">{time}</div>
                    </div>
                  </div>

                  <div className="h-16 mr-2 w-[0.5px] bg-gray-300" />

                  <div className="flex justify-between flex-1 p-2">
                    <div className="space-y-1  flex flex-col justify-between">
                      <div className="text-xs">
                        {item?.organisation_name || "--"}
                      </div>
                      <div>
                        <div className="text-xs">{userName}</div>
                        <div className="text-xs text-gray-400 font-light">
                          Client
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1  flex flex-col items-center">
                      <div className="text-xs">{label}</div>
                      <div className="flex items-center">
                        {item?.advocate_cases?.length > 0 ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex -space-x-2">
                                  {item.advocate_cases
                                    .slice(0, 2)
                                    .map((advocate: any, idx: string) => {
                                      const firstName =
                                        advocate?.advocate.first_name || "";
                                      const lastName =
                                        advocate?.advocate.last_name || "";
                                      const advocateName =
                                        `${firstName} ${lastName}`.trim();
                                      const initials =
                                        (
                                          firstName.charAt(0) || ""
                                        ).toUpperCase() +
                                        (
                                          lastName.charAt(0) || ""
                                        ).toUpperCase();

                                      return (
                                        <Avatar
                                          key={idx}
                                          className="border size-6"
                                        >
                                          <AvatarImage
                                            src={advocate?.advocate.profile_pic}
                                            alt={firstName}
                                          />
                                          <AvatarFallback className="bg-gray-100 text-xs">
                                            {initials || (
                                              <User className="w-3 h-3" />
                                            )}
                                          </AvatarFallback>
                                        </Avatar>
                                      );
                                    })}

                                  {item.advocate_cases.length > 2 && (
                                    <Avatar className="border size-6 bg-gray-200 text-[10px] flex items-center justify-center">
                                      +{item.advocate_cases.length - 2}
                                    </Avatar>
                                  )}
                                </div>
                              </TooltipTrigger>

                              <TooltipContent className="bg-white shadow-lg p-2 rounded text-sm">
                                <div className="space-y-1">
                                  {item.advocate_cases.map(
                                    (adv: any, i: string) => (
                                      <div
                                        key={i}
                                        className="flex items-center gap-2"
                                      >
                                        <Avatar className="size-5 border">
                                          <AvatarImage
                                            src={adv?.advocate.profile_pic}
                                          />
                                          <AvatarFallback className="bg-gray-100 text-xs">
                                            {(adv?.advocate.first_name?.[0] ||
                                              "") +
                                              (adv?.advocate.last_name?.[0] ||
                                                "")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span>
                                          {`${adv?.advocate.first_name || ""} ${
                                            adv?.advocate.last_name || ""
                                          }`}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Avatar className="size-6">
                              <AvatarFallback className="flex items-center bg-gray-100 text-gray-500 text-xs">
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-gray-400 font-light">
                        {item?.advocate_cases?.length == 0
                          ? "No Advocate"
                          : "Advocate"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {hasNextPage && (
              <div
                ref={scrollRef}
                className="h-8 flex justify-center items-center"
              >
                {isFetchingNextPage && (
                  <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HearingCard;
