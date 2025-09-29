import { Input } from "@/components/ui/input";
import { ISearchFilters } from "@/lib/interfaces/core";
import { SearchIcon, X } from "lucide-react";
const SearchFilter: React.FC<ISearchFilters> = ({
  searchString,
  setSearchString,
  title,
}) => {
  return (
    <div className="relative w-52 flex items-center group">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent text-black text-opacity-60 rounded-none w-[25px] h-[25px] p-1 transition-transform duration-200 ease-in-out group-hover:scale-110 " />
      <Input
        placeholder={title}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="pl-8 !h-9  bg-gray-100 !py-0 hover:bg-opacity-80 transition-all duration-300 ease-in-out focus:bg-white focus:border-black focus:shadow-md  w-full placeholder:text-black placeholder:text-xs placeholder:text-opacity-60 text-black rounded-none text-xs  2xl:text-sm font-normal border border-gray-200"
      />
      {searchString && (
        <button
          onClick={() => setSearchString("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent text-black transition-all duration-200 ease-in-out hover:scale-125 hover:text-opacity-80 active:scale-90"
        >
          <X className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:rotate-90" />
        </button>
      )}
    </div>
  );
};
export default SearchFilter;
