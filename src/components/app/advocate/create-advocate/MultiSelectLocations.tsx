import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MultiSelectLocationProps } from "@/lib/interfaces/organization";
import { getColorByFirstLetter } from "@/utils/helpers/getColorByFirstLetter";
import { useLocation } from "@tanstack/react-router";
import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const MultiSelectLocations = ({
  value,
  onValueChange,
  locations,
  isAdmin,
}: MultiSelectLocationProps & { isAdmin?: () => boolean }) => {
  const location = useLocation();
  const shouldUseSingleSelection =
    location.pathname.includes("/create-manager") ||
    location.pathname.includes("/edit-manager");
  const [open, setOpen] = useState<boolean>(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [tempClearedForManagers, setTempClearedForManagers] = useState(false);
  const shouldShowClearForManagers =
    shouldUseSingleSelection && value.length > 0 && !tempClearedForManagers;
  const filteredLocations = locations?.filter((location: any) =>
    location?.name?.toLowerCase()?.includes(locationSearch.toLowerCase())
  );

  const toggleValue = (itemValue: number): void => {
    if (shouldUseSingleSelection) {
      const newValue = value.includes(itemValue) ? [] : [itemValue];
      onValueChange(newValue);
      setTempClearedForManagers(false);
    } else {
      const newValue = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];
      onValueChange(newValue);
    }
  };

  const confirmSelection = () => {
    setLocationSearch("");
    setOpen(false);
  };

  const handleManagerClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (shouldUseSingleSelection) {
      setLocationSearch("");
      setTempClearedForManagers(true);
    } else {
      onValueChange([]);
      setLocationSearch("");
    }
  };

  const handlePopoverClear = () => {
    if (shouldUseSingleSelection) {
      setLocationSearch("");
      setTempClearedForManagers(true);
    } else {
      setLocationSearch("");
      onValueChange([]);
    }
    setOpen(false);
  };

  const getSelectedLocationText = () => {
    if (tempClearedForManagers || value.length === 0)
      return "Select Work Location";
    if (shouldUseSingleSelection && value.length > 0) {
      const selectedLocation = locations.find((l: any) => l.id === value[0]);
      return selectedLocation?.name || "Unknown Location";
    }
    return "Select Work Location";
  };

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="w-full justify-between bg-slate-100 items-center px-2 py-2 min-h-9 text-xs rounded-none flex cursor-pointer">
            <div className="flex flex-1 flex-wrap gap-1 h-full overflow-y-auto">
              {shouldUseSingleSelection ? (
                // For managers: Show plain text
                <span className="text-gray-700">
                  {getSelectedLocationText()}
                </span>
              ) : (
                // For advocates: Show badges
                <>
                  {value.length === 0
                    ? "Select Work Location"
                    : value.slice(0, 4).map((id) => {
                        const item = locations.find((l: any) => l.id === id);
                        const { background, color } = getColorByFirstLetter(
                          item?.name || ""
                        );
                        return (
                          <span
                            key={id}
                            title={item?.name}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium w-20 flex items-center gap-1"
                            style={{ backgroundColor: background }}
                          >
                            <span className="truncate flex-1">
                              {item?.name || "Unknown"}
                            </span>
                            <X
                              className="cursor-pointer text-red-600 w-4 h-4 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleValue(id);
                              }}
                            />
                          </span>
                        );
                      })}
                  {value.length > 4 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer flex items-center gap-1"
                          style={{
                            backgroundColor: "#D3D3D3",
                            color: "#333333",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          +{value.length - 4}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        className="w-auto p-2 bg-white border rounded shadow-lg"
                        style={{ maxHeight: "350px", overflowY: "auto" }}
                      >
                        {value.slice(4).map((id) => {
                          const item = locations.find((l: any) => l.id === id);
                          const { background, color } = getColorByFirstLetter(
                            item?.name || ""
                          );
                          return (
                            <span
                              key={id}
                              className="px-2 py-1 rounded-full text-xs font-medium mb-1 w-32 flex items-center gap-1"
                              style={{ backgroundColor: background }}
                              title={item?.name}
                            >
                              <span className="truncate flex-1">
                                {item?.name || "Unknown"}
                              </span>
                              <X
                                className="cursor-pointer text-red-600 w-4 h-4 flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleValue(id);
                                }}
                              />
                            </span>
                          );
                        })}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              {/* Show clear button for managers when location is selected */}
              {shouldShowClearForManagers && (
                <X
                  className="cursor-pointer text-gray-400 hover:text-red-600 w-4 h-4"
                  onClick={handleManagerClear}
                />
              )}
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300 rounded-sm">
          <Command>
            <CommandInput
              placeholder="Select Work Location"
              value={locationSearch}
              onValueChange={setLocationSearch}
            />
            <CommandList className="max-h-[220px]">
              <CommandGroup>
                {filteredLocations.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => !item.assigned && toggleValue(item.id)}
                    className={`${item.assigned ? "cursor-not-allowed opacity-50" : "cursor-pointer"} flex justify-between items-center`}
                    disabled={isAdmin?.() && item.assigned}
                  >
                    <p>{item.name}</p>
                    <Check
                      className={`ml-2 h-4 w-4 ${
                        value.includes(item.id) && !tempClearedForManagers
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>No items found.</CommandEmpty>
            </CommandList>
            <div className="flex justify-end space-x-2 p-2 border-t border-t-gray-300">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePopoverClear}
                className="cursor-pointer "
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

export default MultiSelectLocations;
