import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { I as Input } from "./input-CcfBn-WR.js";
import { c as cn } from "./router-e7zdrxGz.js";
import { X, Search, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
const SearchDropdown = ({
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
  className
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSelect = (option) => {
    onSelect(option);
    setShowDropdown(false);
  };
  const handleClear = (e) => {
    e.stopPropagation();
    onClear();
    onSearchChange("");
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative overflow-visible ${width}`, ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder,
          value: searchValue,
          onChange: (e) => {
            onSearchChange(e.target.value);
            setShowDropdown(true);
          },
          onFocus: () => setShowDropdown(true),
          className: `${width} rounded-none bg-gray-100 border border-gray-300 pr-18 ${className}`
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center", children: [
        (value || searchValue) && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClear,
            className: "p-1 hover:bg-gray-200 rounded mr-1",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center pr-3 pointer-events-none", children: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-gray-400" }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowDropdown(!showDropdown),
            className: "flex items-center pr-2",
            children: /* @__PURE__ */ jsx(
              ChevronDown,
              {
                className: `h-4 w-4 text-gray-400 transition-transform ${showDropdown ? "rotate-180" : ""}`
              }
            )
          }
        )
      ] })
    ] }),
    showDropdown && /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute z-50 ${width} mt-1 bg-white border border-gray-300 rounded-md shadow-lg ${maxHeight} overflow-y-auto left-0 top-full`,
        children: options.length > 0 ? options.map((option) => {
          const key = getOptionKey(option);
          const selected = isSelected(option);
          return /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => handleSelect(option),
              className: cn(
                "flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm",
                selected && "bg-gray-50"
              ),
              children: renderOption ? renderOption(option, selected) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "flex-1", children: getOptionLabel(option) }),
                selected && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-600" })
              ] })
            },
            key
          );
        }) : /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-sm text-gray-500", children: isLoading ? loadingText : noOptionsText })
      }
    )
  ] });
};
export {
  SearchDropdown as S
};
