import { jsxs, jsx } from 'react/jsx-runtime';

function SendIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      stroke: "#ffffff",
      className,
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
              d: "M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5",
              stroke: "#ffffff",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          " "
        ] })
      ]
    }
  );
}

export { SendIcon as S };
//# sourceMappingURL=send-icon-CzKPEiSG.mjs.map
