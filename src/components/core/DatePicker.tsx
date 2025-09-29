import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { DatePickerProps } from "@/lib/interfaces/core";

export function DatePicker({ onDateSelect, caseDetails }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>();
  const [tempDate, setTempDate] = React.useState<Date | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [hours, setHours] = React.useState<number>(12);
  const [minutes, setMinutes] = React.useState<number>(0);
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM");

  const [hoursDisplay, setHoursDisplay] = React.useState<string>("12");
  const [minutesDisplay, setMinutesDisplay] = React.useState<string>("00");

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setTempDate(selectedDate);
  };

  const handleConfirm = () => {
    if (tempDate) {
      const fullDateTime = new Date(tempDate);

      let adjustedHours = hours;
      if (period === "PM" && hours !== 12) {
        adjustedHours += 12;
      } else if (period === "AM" && hours === 12) {
        adjustedHours = 0;
      }
      fullDateTime.setHours(adjustedHours, minutes);

      setDate(fullDateTime);
      onDateSelect(fullDateTime);
      setIsOpen(false);
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHoursDisplay(value);

    const numValue = Number(value);
    if (numValue >= 1 && numValue <= 12) {
      setHours(numValue);
    } else if (value === "") {
    } else {
      setHoursDisplay(hours.toString());
    }
  };

  const handleHourBlur = () => {
    const numValue = Number(hoursDisplay);
    if (
      numValue < 1 ||
      numValue > 12 ||
      hoursDisplay === "" ||
      isNaN(numValue)
    ) {
      setHoursDisplay(hours.toString());
    } else {
      setHours(numValue);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinutesDisplay(value);

    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 59) {
      setMinutes(numValue);
    } else if (value === "") {
    } else {
      setMinutesDisplay(minutes.toString().padStart(2, "0"));
    }
  };

  const handleMinuteBlur = () => {
    const numValue = Number(minutesDisplay);
    if (
      numValue < 0 ||
      numValue > 59 ||
      minutesDisplay === "" ||
      isNaN(numValue)
    ) {
      setMinutesDisplay(minutes.toString().padStart(2, "0"));
    } else {
      setMinutes(numValue);
      setMinutesDisplay(numValue.toString().padStart(2, "0"));
    }
  };

  const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newHour = hours < 12 ? hours + 1 : 1;
      setHours(newHour);
      setHoursDisplay(newHour.toString());
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newHour = hours > 1 ? hours - 1 : 12;
      setHours(newHour);
      setHoursDisplay(newHour.toString());
    }
  };

  const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newMinute = minutes < 59 ? minutes + 1 : 0;
      setMinutes(newMinute);
      setMinutesDisplay(newMinute.toString().padStart(2, "0"));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newMinute = minutes > 0 ? minutes - 1 : 59;
      setMinutes(newMinute);
      setMinutesDisplay(newMinute.toString().padStart(2, "0"));
    }
  };

  const isTimeValid = () => {
    const hourNum = Number(hoursDisplay);
    const minuteNum = Number(minutesDisplay);
    return (
      hoursDisplay !== "" &&
      minutesDisplay !== "" &&
      !isNaN(hourNum) &&
      !isNaN(minuteNum) &&
      hourNum >= 1 &&
      hourNum <= 12 &&
      minuteNum >= 0 &&
      minuteNum <= 59
    );
  };

  React.useEffect(() => {
    setHoursDisplay(hours.toString());
    setMinutesDisplay(minutes.toString().padStart(2, "0"));
  }, [hours, minutes]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {caseDetails?.status === "CLOSURE" ? (
        <span className="text-xs">Next hearing</span>
      ) : (
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-26 p-1 justify-start text-left font-normal border border-gray-300 cursor-pointer text-xs",
              !date && "text-muted-foreground"
            )}
            aria-label={date ? "Change hearing date" : "Select hearing date"}
          >
            <CalendarIcon className="h-3.5 w-3 mr-0" />
            <span>Next Hearing</span>
          </Button>
        </PopoverTrigger>
      )}

      <PopoverContent
        side="top"
        align="start"
        sideOffset={5}
        className="w-auto p-0 bg-white border border-gray-300 max-h-[60vh] overflow-auto text-xs"
        avoidCollisions={true}
        collisionPadding={10}
      >
        <div className="p-1.5">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={tempDate}
            onSelect={handleDateSelect}
            fromYear={new Date().getFullYear()}
            toYear={new Date().getFullYear() + 5}
            disabled={(date) => date < new Date()}
            initialFocus
            numberOfMonths={1}
            className={cn("w-full text-xs p-1.5 [--cell-size:30px]")}
            classNames={{
              months: "flex gap-2 flex-col md:flex-row relative",
              month: "flex flex-col w-full gap-1.5",
              nav: "flex items-center gap-0.5 w-full absolute top-0 inset-x-0 justify-between",
              button_previous:
                "size-[--cell-size] aria-disabled:opacity-50 p-0 select-none",
              button_next:
                "size-[--cell-size] aria-disabled:opacity-50 p-0 select-none",
              month_caption:
                "flex items-center justify-center h-[--cell-size] w-full px-[--cell-size]",
              dropdowns:
                "w-full flex items-center text-[0.7rem] font-medium justify-center h-[--cell-size] gap-0.5",
              dropdown_root:
                "relative border border-gray-300 shadow-xs rounded-md",
              dropdown:
                "absolute bg-white inset-0 opacity-0 border border-gray-300",
              caption_label:
                "select-none font-medium text-[0.7rem] rounded-md pl-1 pr-0.5 flex items-center gap-0.5 h-6 [&>svg]:text-gray-500 [&>svg]:size-2.5",
              weekday:
                "text-gray-600 rounded-md flex-1 font-normal text-[0.65rem] select-none",
              week: "flex w-full mt-0.5",
              week_number: "text-[0.65rem] select-none text-gray-600",
              day: "relative w-full h-full p-0 text-center aspect-square text-[0.75rem]",
              selected: "bg-black text-white rounded-md !important",
              range_start: "rounded-l-md bg-black text-white",
              range_middle: "rounded-none bg-blue-100",
              range_end: "rounded-r-md bg-black text-white",
              today:
                "bg-blue-100 text-blue-800 rounded-md data-[selected=true]:rounded-none",
              outside: "text-gray-400 aria-selected:text-gray-400 font-normal",
              disabled: "text-gray-800 opacity-50",
            }}
          />
        </div>

        <div className="px-2 pb-2 border-t border-t-gray-300">
          <div className="mb-1.5">
            <label className="text-[0.7rem] font-medium text-gray-700 block mb-0.5">
              Time
            </label>
            <div className="flex gap-0.5 items-center justify-center">
              <input
                type="text"
                value={hoursDisplay}
                onChange={handleHourChange}
                onBlur={handleHourBlur}
                onKeyDown={handleHourKeyDown}
                maxLength={2}
                className="w-10 h-7 border border-gray-300 px-1 rounded text-[0.7rem] text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="12"
              />
              <span className="text-[0.7rem]">:</span>
              <input
                type="text"
                value={minutesDisplay}
                onChange={handleMinuteChange}
                onBlur={handleMinuteBlur}
                onKeyDown={handleMinuteKeyDown}
                maxLength={2}
                className="w-10 h-7 border border-gray-300 px-1 rounded text-[0.7rem] text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="00"
              />
              <div className="flex ml-0.5">
                <Button
                  size="sm"
                  variant={period === "AM" ? "default" : "outline"}
                  onClick={() => setPeriod("AM")}
                  className={cn(
                    "h-7 px-1.5 text-[0.7rem] rounded-l rounded-r-none cursor-pointer",
                    period === "AM" && "bg-black text-white hover:bg-black"
                  )}
                >
                  AM
                </Button>
                <Button
                  size="sm"
                  variant={period === "PM" ? "default" : "outline"}
                  onClick={() => setPeriod("PM")}
                  className={cn(
                    "h-7 px-1.5 text-[0.7rem] rounded-r rounded-l-none cursor-pointer",
                    period === "PM" && "bg-black text-white hover:bg-black"
                  )}
                >
                  PM
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              className="bg-black text-white hover:bg-black h-7 px-2.5 text-[0.7rem] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleConfirm}
              disabled={!tempDate || !isTimeValid()}
            >
              OK
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
