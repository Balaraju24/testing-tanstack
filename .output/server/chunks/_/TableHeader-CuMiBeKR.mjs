import { jsx, jsxs } from 'react/jsx-runtime';

const SkeletonRow = ({ index }) => /* @__PURE__ */ jsxs("tr", { className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`, children: [
  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 w-24", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded animate-pulse w-20" }) }),
  /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded animate-pulse w-32" }) }),
  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 w-32", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded animate-pulse w-24" }) }),
  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 w-40", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-gray-300 rounded animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-gray-300 rounded animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "w-20 h-8 bg-gray-300 rounded animate-pulse" })
  ] }) })
] });
const TableHeader = () => /* @__PURE__ */ jsx("thead", { className: "bg-black sticky top-0 z-10", children: /* @__PURE__ */ jsxs("tr", { children: [
  /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-normal text-white uppercase tracking-wider", children: "Date" }),
  /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-normal text-white uppercase tracking-wider", children: "Document Name" }),
  /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-normal text-white uppercase tracking-wider", children: "Type" }),
  /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-normal text-white uppercase tracking-wider", children: "Actions" })
] }) });

export { SkeletonRow as S, TableHeader as T };
//# sourceMappingURL=TableHeader-CuMiBeKR.mjs.map
