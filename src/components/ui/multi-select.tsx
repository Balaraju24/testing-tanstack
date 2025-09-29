import { MultiSelectProps } from "@/lib/interfaces/organization";
import { getColorByFirstLetter } from "@/utils/helpers/getColorByFirstLetter";
import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  onValueChange,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(value);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  const fixedItems = [
    { id: "1", label: "Civil", value: "Civil Law" },
    { id: "2", label: "Criminal", value: "Criminal Law" },
    { id: "3", label: "MVOP", value: "MVOP law" },
    { id: "4", label: "Family", value: "Family Law" },
    { id: "5", label: "Constitution", value: "Constitution Law" },
    { id: "6", label: "Corporate", value: "Corporate Law" },
    { id: "7", label: "Banking", value: "Banking Law" },
    { id: "8", label: "Consumer", value: "Consumer Law" },
    { id: "9", label: "Labour Laws", value: "Labour Laws" },
  ];

  const filteredItems = fixedItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleValue = (itemValue: string): void => {
    const newValue = selectedItems.includes(itemValue)
      ? selectedItems.filter((value) => value !== itemValue)
      : [...selectedItems, itemValue];

    setSelectedItems(newValue);
    onValueChange(newValue);
  };

  const confirmSelection = (): void => {
    setOpen(false);
  };

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="cursor-pointer">
          <div className="w-full justify-between bg-slate-100 items-center px-2 py-2 min-h-9 text-xs rounded-none flex">
            <div className="flex flex-1 flex-wrap gap-1 h-full overflow-y-auto">
              {selectedItems.length === 0
                ? "Select Area Of Interest"
                : selectedItems.slice(0, 4).map((value) => {
                    const item = fixedItems.find(
                      (item) => item.value === value
                    );
                    const { background, color } = getColorByFirstLetter(
                      item?.label || ""
                    );
                    return (
                      <span
                        key={value}
                        title={item?.label}
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium w-20 flex items-center gap-1"
                        style={{ backgroundColor: background }}
                      >
                        <span className={`truncate flex-1 ${color} `}>
                          {item?.label}
                        </span>
                        <X
                          className="cursor-pointer text-red-600 w-4 h-4 flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleValue(value);
                          }}
                        />
                      </span>
                    );
                  })}
              {selectedItems.length > 4 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer flex items-center gap-1"
                      style={{ backgroundColor: "#D3D3D3", color: "#333333" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      +{selectedItems.length - 4}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    className="w-auto p-2 bg-white border rounded shadow-lg"
                    style={{ maxHeight: "350px", overflowY: "auto" }}
                  >
                    {selectedItems.slice().map((value) => {
                      const item = fixedItems.find(
                        (item) => item.value === value
                      );
                      const { background, color } = getColorByFirstLetter(
                        item?.label || ""
                      );
                      return (
                        <span
                          key={value}
                          className="px-2 py-1 rounded-full text-xs font-medium mb-1 w-32 flex items-center gap-1"
                          style={{ backgroundColor: background }}
                          title={item?.label}
                        >
                          <span className="truncate flex-1">{item?.label}</span>
                          <X
                            className="cursor-pointer text-red-600 w-4 h-4 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleValue(value);
                            }}
                          />
                        </span>
                      );
                    })}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <div>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300 rounded-sm"
        >
          <Command>
            <CommandInput
              placeholder="Select Area of Interest"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList className="max-h-[220px]">
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.value}
                    onSelect={() => toggleValue(item.value)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${selectedItems.includes(item.value) ? "opacity-100" : "opacity-0"}`}
                    />
                    <p>{item.label}</p>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>No items found.</CommandEmpty>
            </CommandList>
            <div className="flex justify-end space-x-2 p-2 border-t border-t-gray-300">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedItems([]);
                  onValueChange([]);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                Clear
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={confirmSelection}
                className="cursor-pointer"
              >
                Confirm
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default MultiSelect;
