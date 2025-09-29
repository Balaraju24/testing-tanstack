import LoadingComponent from "@/components/core/Loading";
import NoHearingDateIcon from "@/components/icons/no-hearing-date-icon";
import {
  getDueDateAPI,
  getNextHearingDateAPI,
} from "@/http/services/dashboard";
import { DueDate, Hearing } from "@/lib/interfaces/dashboard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useMemo, useRef, useState } from "react";
import CustomCalendar from "./CustomCalendar";
import { Separator } from "@/components/ui/separator";
import CustomDateRangePicker from "@/components/core/CustomDateRangePicker";
import { DateRange } from "react-day-picker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Loader2, User } from "lucide-react";
import NoDueDateIcon from "@/components/icons/no-due-date-icon";
import HearingCard from "./HearingCard";
import { useNavigate } from "@tanstack/react-router";

dayjs.extend(utc);
dayjs.extend(timezone);

const CalendarHearingsSection = () => {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const [dueDateRange, setDueDateRange] = useState<DateRange | undefined>();

  const [isMarqueeActive, setIsMarqueeActive] = useState(true);
  const [calendarWeeks, setCalendarWeeks] = useState<number>(6);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    isLoading,
    data: hearingData,
    refetch: refetchHearingDate,
  } = useQuery({
    queryKey: ["getAllNextHearingDetails", selectedDate],
    queryFn: async () => {
      try {
        let queryParams = {};

        if (selectedDate) {
          queryParams = {
            from_date: dayjs(selectedDate?.from).format("YYYY-MM-DD"),
            to_date: dayjs(selectedDate?.to).format("YYYY-MM-DD"),
          };
        }

        const response = await getNextHearingDateAPI(queryParams);
        if (response.status == 200 || response.status == 201) {
          const data = response?.data?.data?.records;
          return data;
        } else {
          throw new Error("Failed to fetch next hearing details");
        }
      } catch (err) {
        console.error("API Error:", err);
        return null;
      }
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const {
    data: dueDateData,
    isLoading: dueDateLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getDueDate", dueDateRange],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        let queryParams: { from_date?: string; to_date?: string } = {};
        if (dueDateRange) {
          queryParams.from_date = dayjs(dueDateRange?.from).format(
            "YYYY-MM-DD"
          );
          queryParams.to_date = dayjs(dueDateRange?.to).format("YYYY-MM-DD");
        }
        const response = await getDueDateAPI(queryParams);
        if (response.status == 200 || response.status == 201) {
          const data = response?.data?.data;

          return data;
        } else {
          throw new Error("Failed to fetch next hearing details");
        }
      } catch (err) {
        console.error("API Error:", err);
        return null;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pagination_info?.current_page;
      const totalPages = lastPage?.pagination_info?.total_pages;
      return currentPage && currentPage < totalPages ? currentPage + 1 : null;
    },
  });

  const allDueDateData =
    dueDateData?.pages?.flatMap((page) => page?.records) || [];

  const hearingDates = useMemo((): string[] => {
    let hearingsToProcess: any[] = [];

    if (Array.isArray(hearingData)) {
      hearingsToProcess = hearingData;
    } else if (hearingData?.records) {
      hearingsToProcess = hearingData.records;
    }

    if (hearingsToProcess.length === 0) {
      return [];
    }

    return hearingsToProcess.map((record: any) =>
      dayjs(record.next_hearing_date).format("YYYY-MM-DD")
    );
  }, [hearingData]);

  const currentHearings = useMemo(() => {
    if (Array.isArray(hearingData)) {
      return hearingData;
    }
    if (!hearingData?.records) return [];
    return hearingData.records;
  }, [hearingData]);

  const duplicatedHearings = currentHearings || [];

  const shouldAutoScroll = duplicatedHearings.length > 5 && isMarqueeActive;
  const shouldShowScrollbar =
    duplicatedHearings.length >= 2 && duplicatedHearings.length <= 5;

  const containerHeight =
    calendarWeeks === 6
      ? "h-[calc(100vh-435px)]"
      : calendarWeeks === 4
        ? "h-[calc(100vh-355px)]"
        : "h-[calc(100vh-400px)]";

  const handleHearingRoute = (id: number) => {
    navigate({
      to: `/litigations/service/${id}/case-history`,
    });
  };

  const handleDueDateRoute = (id: number) => {
    navigate({
      to: `/legal-opinion/service/${id}/notes`,
    });
  };

  useEffect(() => {
    if (!scrollRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <style>{`
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .marquee-container {
          ${containerHeight};
          overflow: hidden;
          position: relative;
        }
        .scroll-container {
          ${containerHeight};
          overflow-y: auto;
          position: relative;
        }
        .marquee-content {
          animation: ${shouldAutoScroll ? "marquee-vertical 20s linear infinite" : "none"};
          display: flex;
          flex-direction: column;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="col-span-3 bg-white p-2 ">
        <div className=" h-[calc((100vh-85px)/2)] ">
          <HearingCard
            title="Next Hearing"
            bg="bg-slate-50"
            data={currentHearings}
            isLoading={isLoading}
            dateRange={selectedDate}
            setDateRange={setSelectedDate}
            dateField="next_hearing_date"
            emptyState={
              <>
                <NoHearingDateIcon />
                <span className="text-sm text-gray-500 mt-2">
                  No Upcoming Hearings
                </span>
              </>
            }
            label="Litigation"
            handleRoute={handleHearingRoute}
          />
        </div>

        <div className="  h-[calc((100vh-85px)/2)] ">
          <HearingCard
            title="Due Dates"
            bg="bg-red-50"
            data={allDueDateData}
            isLoading={dueDateLoading}
            dateRange={dueDateRange}
            setDateRange={setDueDateRange}
            dateField="due_date"
            emptyState={
              <>
                <NoDueDateIcon className="w-20" />
                <span className="text-sm text-gray-500 mt-2">No Due Dates</span>
              </>
            }
            label="Legal Notices"
            showOverdue
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            scrollRef={scrollRef}
            handleRoute={handleDueDateRoute}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarHearingsSection;
