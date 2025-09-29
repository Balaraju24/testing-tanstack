import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon, X, XIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Separator } from "../ui/separator";
import DropdownIcon from "../icons/dropdown-icon";
import { DateRange, DropdownProps } from "react-day-picker";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import OverflowContentTooltip from "./OverflowContentTooltip";

interface CustomDateRangePickerProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  mode?: "day" | "day-month" | "day-year" | "month" | "year" | "month-year";
  align?: "start" | "center" | "end";
}

export function CustomSelectDropdown(props: DropdownProps) {
  const { options, value, onChange } = props;

  const handleValueChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: newValue,
        },
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <Select value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className=" h-fit py-1  ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white border-gray-200 h-[40vh]">
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const CustomDateRangePicker = ({
  date,
  setDate,
  mode = "day",
  align,
}: CustomDateRangePickerProps) => {
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(
    date
  );
  const today = dayjs();

  const [open, setOpen] = React.useState(false);

  const formatLabel = () => {
    if (!date?.from) return "Date";
    if (date.to) {
      if (dayjs(date.from).isSame(date.to, "day")) {
        return dayjs(date.from).format("DD/MM/YYYY");
      }
      return `${dayjs(date.from).format("DD/MM/YYYY")} - ${dayjs(
        date.to
      ).format("DD/MM/YYYY")}`;
    }
    return dayjs(date.from).format("DD/MM/YYYY");
  };

  const dayPresets = [
    {
      label: "Today",
      action: () =>
        setDate({
          from: dayjs().startOf("day").toDate(),
          to: dayjs().startOf("day").toDate(),
        }),
    },
    {
      label: "Yesterday",
      action: () =>
        setDate({
          from: dayjs().subtract(1, "day").startOf("day").toDate(),
          to: dayjs().subtract(1, "day").endOf("day").toDate(),
        }),
    },
    {
      label: "Tomorrow",
      action: () =>
        setDate({
          from: dayjs().add(1, "day").startOf("day").toDate(),
          to: dayjs().add(1, "day").endOf("day").toDate(),
        }),
    },
  ];

  const monthPresets = [
    {
      label: "This Month",
      action: () =>
        setDate({
          from: dayjs().startOf("month").toDate(),
          to: dayjs().endOf("month").toDate(),
        }),
    },
  ];

  const yearPresets = [
    {
      label: "Last 3 Months",
      action: () =>
        setDate({
          from: dayjs().subtract(3, "month").startOf("day").toDate(),
          to: dayjs().endOf("day").toDate(),
        }),
    },
    {
      label: "Last 6 Months",
      action: () =>
        setDate({
          from: dayjs().subtract(6, "month").startOf("day").toDate(),
          to: dayjs().endOf("day").toDate(),
        }),
    },
    {
      label: "This Year",
      action: () =>
        setDate({
          from: dayjs().startOf("year").toDate(),
          to: dayjs().endOf("year").toDate(),
        }),
    },
    {
      label: "Last Year",
      action: () =>
        setDate({
          from: dayjs().subtract(1, "year").startOf("year").toDate(),
          to: dayjs().subtract(1, "year").endOf("year").toDate(),
        }),
    },
  ];

  let presets: { label: string; action: () => void }[] = [];
  if (mode === "day") presets = dayPresets;
  if (mode === "day-month") presets = [...dayPresets, ...monthPresets];
  if (mode === "day-year")
    presets = [...dayPresets, ...monthPresets, ...yearPresets];
  if (mode === "month") presets = monthPresets;
  if (mode === "year") presets = yearPresets;
  if (mode === "month-year") presets = [...monthPresets, ...yearPresets];

  const handleSubmit = () => {
    setDate(selectedDate);
    setOpen(false);
  };
  const resetDate = () => setDate(undefined);

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button className="border w-fit text-smd font-normal items-center border-gray-300 py-1.5 h-8 rounded-none px-2 ">
          <CalendarIcon className="mr-0.5 h-4 w-4 shrink-0" />
          <span className="text-xs">{formatLabel()}</span>
          {date ? (
            <>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  resetDate();
                }}
              >
                <XIcon className="ml-0.5 h-4 w-4 shrink-0 cursor-pointer" />
              </span>
            </>
          ) : (
            <DropdownIcon className="ml-1 !h-3 !w-3 shrink-0" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align={align}
        sideOffset={4}
        className="flex w-fit mr-2 gap-2 p-2 bg-white  border border-gray-300"
      >
        <div className="flex flex-col justify-between h-68">
          <div className="flex flex-col">
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                className="justify-start py-1.5 hover:bg-gray-100 text-sm font-light h-fit px-1"
                onClick={() => {
                  preset.action();
                  setOpen(false);
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>

          <Button
            variant="destructive"
            size="sm"
            className="mt-2 text-sm bg-gray-200 hover:bg-gray-400  py-1.5 h-fit px-1"
            onClick={handleSubmit}
          >
            OK
          </Button>
        </div>

        <div className="flex-1 h-68 w-[0.5px] bg-gray-300">
          <Separator orientation="vertical" />
        </div>

        <div className="flex flex-col justify-between ">
          <Calendar
            mode="range"
            selected={selectedDate}
            onSelect={setSelectedDate}
            classNames={{
              range_middle: "bg-gray-100 ",
              day: "hover:bg-gray-100 w-full flex items-center justify-center data-[range-start=true]:bg-black",
              weekday: "text-sm flex justify-center font-normal w-full",
            }}
            captionLayout="dropdown"
            components={{
              Dropdown: CustomSelectDropdown,
            }}
            modifiers={{
              today: new Date(),
            }}
            modifiersClassNames={{
              today: "bg-blue-200 text-blue-900 rounded-sm",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomDateRangePicker;
