import { jsxs, jsx } from "react/jsx-runtime";
const ActiveStatus = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      height: "30",
      width: "30",
      viewBox: "0 -0.5 25 25",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      stroke: "currentColor",
      children: [
        /* @__PURE__ */ jsx("g", { id: "SVGRepo_bgCarrier", strokeWidth: "0" }),
        /* @__PURE__ */ jsx(
          "g",
          {
            id: "SVGRepo_tracerCarrier",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxs("g", { id: "SVGRepo_iconCarrier", children: [
          " ",
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M5.5 12.5L10.167 17L19.5 8",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          " "
        ] })
      ]
    }
  );
};
function PendingIcon({ className }) {
  return /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "7.2", stroke: "#4F4F4F", strokeWidth: "1.6" }),
    /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "5", fill: "#4F4F4F" })
  ] });
}
export {
  ActiveStatus as A,
  PendingIcon as P
};
