import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

export function PaymentDatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  const { service_id } = useParams({ strict: false });
  const [open, setOpen] = React.useState(false);
  const caseCreateDate = sessionStorage.getItem(`${service_id}_created_at`);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-slate-100 rounded-none h-8 w-full justify-start text-left font-normal border border-gray-300",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? dayjs(date).format("MMM DD") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white z-[100]" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            setOpen(false);
          }}
          disabled={(date) => date > new Date()}
          initialFocus
          fromDate={caseCreateDate ? new Date(caseCreateDate) : undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
