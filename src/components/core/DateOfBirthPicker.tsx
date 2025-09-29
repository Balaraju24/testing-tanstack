import * as React from "react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import {
  CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MONTHS } from "@/lib/constants/dashboard";
import { DateOfBirthPickerProps } from "@/lib/interfaces/core";
import { generateYears, getDaysInMonth } from "@/utils/helpers/app";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function DateOfBirthPicker({
  value,
  onDateSelect,
}: DateOfBirthPickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value ?? undefined);
  const [isOpen, setIsOpen] = React.useState(false);

  const [selectedYear, setSelectedYear] = React.useState<number>(
    value ? value.getFullYear() : 1990
  );
  const [selectedMonth, setSelectedMonth] = React.useState<number>(
    value ? value.getMonth() : 0
  );
  const [selectedDay, setSelectedDay] = React.useState<number>(
    value ? value.getDate() : 1
  );

  const [yearDropdownOpen, setYearDropdownOpen] = React.useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = React.useState(false);

  const years = generateYears(1955, 2005);

  React.useEffect(() => {
    if (value) {
      setDate(value);
      setSelectedYear(value.getFullYear());
      setSelectedMonth(value.getMonth());
      setSelectedDay(value.getDate());
    }
  }, [value]);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    const daysInMonth = getDaysInMonth(
      selectedMonth === 0 ? selectedYear - 1 : selectedYear,
      selectedMonth === 0 ? 11 : selectedMonth - 1
    );
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    const daysInMonth = getDaysInMonth(
      selectedMonth === 11 ? selectedYear + 1 : selectedYear,
      selectedMonth === 11 ? 0 : selectedMonth + 1
    );
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    setDate(newDate);
    onDateSelect(newDate);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
    onDateSelect(undefined);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
    const daysInMonth = getDaysInMonth(year, selectedMonth);
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setMonthDropdownOpen(false);
    const daysInMonth = getDaysInMonth(selectedYear, month);
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };

  const renderDays = (): React.ReactElement[] => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const days: React.ReactElement[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          className={cn(
            "w-8 h-8 text-sm xl:text-xs rounded flex items-center justify-center relative",
            selectedDay === day ? "bg-black text-white" : "hover:bg-gray-100"
          )}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full p-2 justify-between text-left font-normal rounded-none bg-slate-100 cursor-pointer border border-gray-300",
            !date && "text-muted-foreground"
          )}
        >
          {!date ? (
            <div className="flex justify-between items-center w-full ">
              <span className="text-xs">Select Date of Birth</span>
              <CalendarIcon className="mr-2 h-4 w-4" />
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <span>{dayjs(date).format("DD-MM-YYYY")}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 cursor-pointer"
                onClick={handleClear}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-80 p-4 bg-white border border-gray-300"
      >
        {/* Month and Year Header with Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {/* Month Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
                className="px-3 py-1 text-sm xl:text-xs text-black border-gray-300 border rounded flex items-center gap-1"
              >
                <span>{MONTHS[selectedMonth].slice(0, 3)}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {monthDropdownOpen && (
                <div className="absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-48 overflow-y-auto mt-1 min-w-24">
                  {MONTHS.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => handleMonthChange(index)}
                      className="w-full p-2 text-left text-sm xl:text-xs hover:bg-gray-100"
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Year Dropdown */}
            <div className="relative">
              <button
                onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                className="px-3 py-1 text-sm xl:text-xs text-black rounded border-gray-300 border flex items-center gap-1"
              >
                <span>{selectedYear}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {yearDropdownOpen && (
                <div className="absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-48 overflow-y-auto mt-1 min-w-16">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearChange(year)}
                      className="w-full p-2 text-left text-sm xl:text-xs hover:bg-gray-100"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Days Grid */}
        <div className="mb-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="w-8 h-8 text-xs font-medium text-gray-500 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end">
          <Button
            size="sm"
            className="bg-black text-white hover:bg-black cursor-pointer"
            onClick={handleConfirm}
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
