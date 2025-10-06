import { jsx } from 'react/jsx-runtime';

function UnOrderList({ text }) {
  if (!text) return null;
  return /* @__PURE__ */ jsx("ul", { className: "text-black text-opacity-60 space-y-1", children: text.split("\n").filter((note) => note.trim() !== "").map((note, index) => /* @__PURE__ */ jsx(
    "li",
    {
      className: "text-black text-opacity-60 first-letter:capitalize",
      children: note.trim()
    },
    index
  )) });
}

export { UnOrderList as U };
//# sourceMappingURL=UnOrderList-d57FwHYj.mjs.map
