import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const YearDropdown = ({
  startYear = 2000,
  endYear = new Date().getFullYear(),
  onChange,
}: any) => {
  const years: number[] = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  const handleChange = (value: string) => {
    const selectedYear = Number(value);
    if (!selectedYear) return;

    const today = new Date();
    const from = new Date(selectedYear, 0, 1);

    let to;
    if (selectedYear === today.getFullYear()) {
      to = today; // if current year → today
    } else {
      to = new Date(selectedYear, 11, 31); // else → Dec 31
    }

    const selectedRange = { from, to };

    if (onChange) {
      onChange(selectedRange);
    }
  };

  return (
    <Select defaultValue={String(endYear)} onValueChange={handleChange}>
      <SelectTrigger className="w-[100px] h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white h-40">
        {years.map((year) => (
          <SelectItem key={year} value={String(year)}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearDropdown;
