import { jsx, jsxs } from "react/jsx-runtime";
import { L as LogoPath } from "./nyaya-tech-logo-D_OdneNH.js";
import { U as UnOrderList } from "./UnOrderList-d57FwHYj.js";
const Rating = ({ rating, className }) => {
  const totalStars = 5;
  return /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [...Array(totalStars)].map((_, index) => {
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `relative ${className ? className : "h-7 w-7"}`,
        children: [
          /* @__PURE__ */ jsx("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
            "path",
            {
              fill: "gray",
              d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            }
          ) }),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "absolute inset-0 w-full h-full",
              viewBox: "0 0 24 24",
              style: { clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` },
              children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: `goldGradient-${index}`,
                    x1: "0",
                    y1: "0",
                    x2: "1",
                    y2: "1",
                    children: [
                      /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#FFF700" }),
                      /* @__PURE__ */ jsx("stop", { offset: "40%", stopColor: "#FFD700" }),
                      /* @__PURE__ */ jsx("stop", { offset: "70%", stopColor: "#FFA500" }),
                      /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#FFD700" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    fill: `url(#goldGradient-${index})`,
                    d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  }
                )
              ]
            }
          )
        ]
      },
      index
    );
  }) });
};
const FeedbackCard = ({ review }) => {
  return /* @__PURE__ */ jsxs("div", { className: "p-2 bg-gray-100 space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("img", { src: LogoPath, alt: "", className: "w-40" }),
      /* @__PURE__ */ jsx(Rating, { rating: parseFloat(review?.rating) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-md leading-none font-medium", children: "Feedback" }),
      /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(UnOrderList, { text: review?.feedback }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-md leading-none font-medium", children: "Suggestions for Improvement" }),
      /* @__PURE__ */ jsx("div", { className: "text-sm", children: review?.suggestion?.trim() ? /* @__PURE__ */ jsx(UnOrderList, { text: review.suggestion }) : "--" })
    ] })
  ] });
};
export {
  FeedbackCard as F
};
