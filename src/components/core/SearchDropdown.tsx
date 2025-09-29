// SearchDropdown.jsx
import { Input } from "@/components/ui/input";
import { SearchDropdownProps } from "@/lib/interfaces/core";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  placeholder,
  options,
  value,
  searchValue,
  onSearchChange,
  onSelect,
  onClear,
  getOptionLabel,
  getOptionKey,
  isSelected,
  renderOption,
  isLoading = false,
  loadingText = "Loading...",
  noOptionsText = "No options found",
  width = "w-80",
  maxHeight = "max-h-48",
  className,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: any) => {
    onSelect(option);
    setShowDropdown(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClear();
    onSearchChange("");
  };

  return (
    <div className={`relative overflow-visible ${width}`} ref={dropdownRef}>
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className={`${width} rounded-none bg-gray-100 border border-gray-300 pr-18 ${className}`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {(value || searchValue) && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 rounded mr-1"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </button>
          )}
          <div className="flex items-center pr-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center pr-2"
          >
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {showDropdown && (
        <div
          className={`absolute z-50 ${width} mt-1 bg-white border border-gray-300 rounded-md shadow-lg ${maxHeight} overflow-y-auto left-0 top-full`}
        >
          {options.length > 0 ? (
            options.map((option) => {
              const key = getOptionKey(option);
              const selected = isSelected(option);

              return (
                <div
                  key={key}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm",
                    selected && "bg-gray-50"
                  )}
                >
                  {renderOption ? (
                    renderOption(option, selected)
                  ) : (
                    <>
                      <span className="flex-1">{getOptionLabel(option)}</span>
                      {selected && <Check className="h-4 w-4 text-green-600" />}
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              {isLoading ? loadingText : noOptionsText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
