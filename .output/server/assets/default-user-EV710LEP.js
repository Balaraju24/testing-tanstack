import { jsxs, jsx } from "react/jsx-runtime";
const DefaultUserIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "512",
      height: "512",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "7", r: "4" })
      ]
    }
  );
};
export {
  DefaultUserIcon as D
};
