import { jsxs, jsx } from 'react/jsx-runtime';

const ViewIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      children: [
        /* @__PURE__ */ jsx("rect", { width: "256", height: "256", fill: "none" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "16"
          }
        ),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "128",
            cy: "128",
            r: "40",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "16"
          }
        )
      ]
    }
  );
};

export { ViewIcon as V };
//# sourceMappingURL=view-icon-BDRfyII2.mjs.map
