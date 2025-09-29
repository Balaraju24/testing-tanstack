import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS, WEEKDAYS } from "@/lib/constants/dashboard";
import { CustomCalendarProps, DayObject } from "@/lib/interfaces/dashboard";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  onDateSelect,
  selectedDate,
  hearingDates,
  upComingCallDates,
  onWeeksChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      );
    }
  }, [selectedDate]);

  const handleMonthChange = (value: string) => {
    const month = MONTHS.indexOf(value);
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
  };

  const handleYearChange = (value: string) => {
    const year = parseInt(value, 10);
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const increment = direction === "prev" ? -1 : 1;
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  // Simplified calendar generation using useMemo for performance
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0

    const days: DayObject[] = [];
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;

    // Generate all days in one loop
    for (let i = 0; i < totalCells; i++) {
      const dayOffset = i - startingDayOfWeek;
      const date = new Date(year, month, dayOffset + 1);
      const isCurrentMonth = dayOffset >= 0 && dayOffset < daysInMonth;

      days.push({
        day: date.getDate(),
        isCurrentMonth,
        date,
      });
    }

    // Convert to weeks and notify parent
    const weeks: DayObject[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    onWeeksChange?.(weeks.length);
    return days;
  }, [currentMonth, onWeeksChange]);

  // Simplified date checking functions
  const isDateSelected = (date: Date): boolean => {
    return selectedDate ? dayjs(selectedDate).isSame(date, "day") : false;
  };

  const getDateStatus = (date: Date) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    return {
      hasHearing: hearingDates.includes(dateString),
      hasCall: upComingCallDates?.includes(dateString) || false,
    };
  };

  // Simplified button class generation
  const getDayButtonClasses = (
    dayObj: DayObject,
    isSelected: boolean
  ): string => {
    const baseClasses =
      "w-7 h-7 text-xs rounded-none flex items-center justify-center p-0 relative";

    if (isSelected) {
      return `${baseClasses} bg-black text-white font-normal hover:bg-black`;
    }

    if (dayObj.isCurrentMonth) {
      return `${baseClasses} text-gray-700 hover:bg-gray-100`;
    }

    return `${baseClasses} text-gray-300 hover:bg-transparent`;
  };

  const DateIndicator: React.FC<{
    hasHearing: boolean;
    hasCall: boolean;
    isSelected: boolean;
    isCurrentMonth: boolean;
  }> = ({ hasHearing, hasCall, isSelected, isCurrentMonth }) => {
    if (!isCurrentMonth || (!hasHearing && !hasCall)) return null;

    const dotColor = hasHearing ? "bg-black" : "bg-green-500";
    const selectedDotColor = isSelected ? "bg-white" : dotColor;

    return (
      <span
        className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full ${selectedDotColor}`}
      />
    );
  };

  const currentMonthName = MONTHS[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  return (
    <div className="bg-white rounded-none shadow-none p-1 mb-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth("prev")}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        </Button>

        <div className="flex items-center space-x-3">
          <Select value={currentMonthName} onValueChange={handleMonthChange}>
            <SelectTrigger className="text-sm font-normal cursor-pointer text-gray-900 bg-transparent border-none focus:outline-none shadow-none h-auto p-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white cursor-pointer h-56 border border-gray-300">
              {MONTHS.map((month) => (
                <SelectItem key={month} value={month}>
                  <span className="cursor-pointer">{month}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={currentYear.toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="text-sm cursor-pointer font-normal text-gray-900 bg-transparent border-none focus:outline-none shadow-none h-auto p-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white cursor-pointer h-56 border border-gray-300">
              {Array.from({ length: 20 }, (_, i) => {
                const year = currentYear - 10 + i;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    <span className="cursor-pointer">{year}</span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth("next")}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-normal text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {calendarDays.map((dayObj, index) => {
          const isSelected = isDateSelected(dayObj.date);
          const { hasHearing, hasCall } = getDateStatus(dayObj.date);

          return (
            <div
              key={index}
              className="h-8 flex items-center justify-center relative"
            >
              <Button
                variant="ghost"
                size="sm"
                className={getDayButtonClasses(dayObj, isSelected)}
                onClick={() =>
                  dayObj.isCurrentMonth && onDateSelect(dayObj.date)
                }
                disabled={!dayObj.isCurrentMonth}
              >
                {dayObj.day}
                <DateIndicator
                  hasHearing={hasHearing}
                  hasCall={hasCall}
                  isSelected={isSelected}
                  isCurrentMonth={dayObj.isCurrentMonth}
                />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
