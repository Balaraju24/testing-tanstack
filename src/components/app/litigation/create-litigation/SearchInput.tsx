import { SearchInputProps } from "@/lib/interfaces/litigation";
import { Search, X } from "lucide-react";

export const SearchInput = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
}: SearchInputProps) => {
  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2 text-xs border border-gray-300 bg-gray-100 placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-none focus:border-none"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
        >
          <X className="h-4 w-4 cursor-pointer" />
        </button>
      )}
    </div>
  );
};
