import { jsxs, jsx } from 'react/jsx-runtime';
import { I as Input } from './input-CcfBn-WR.mjs';
import { SearchIcon, X } from 'lucide-react';

const SearchFilter = ({
  searchString,
  setSearchString,
  title
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative w-52 flex items-center group", children: [
    /* @__PURE__ */ jsx(SearchIcon, { className: "absolute left-2 top-1/2 -translate-y-1/2 bg-transparent text-black text-opacity-60 rounded-none w-[25px] h-[25px] p-1 transition-transform duration-200 ease-in-out group-hover:scale-110 " }),
    /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: title,
        value: searchString,
        onChange: (e) => setSearchString(e.target.value),
        className: "pl-8 !h-9  bg-gray-100 !py-0 hover:bg-opacity-80 transition-all duration-300 ease-in-out focus:bg-white focus:border-black focus:shadow-md  w-full placeholder:text-black placeholder:text-xs placeholder:text-opacity-60 text-black rounded-none text-xs  2xl:text-sm font-normal border border-gray-200"
      }
    ),
    searchString && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setSearchString(""),
        className: "absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent text-black transition-all duration-200 ease-in-out hover:scale-125 hover:text-opacity-80 active:scale-90",
        children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 transition-transform duration-200 ease-in-out group-hover:rotate-90" })
      }
    )
  ] });
};

export { SearchFilter as S };
//# sourceMappingURL=SearchFilter-BoKc3EM1.mjs.map
