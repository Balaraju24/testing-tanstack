import { jsx, jsxs } from 'react/jsx-runtime';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { useRef, useState, useEffect } from 'react';
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from './tooltip-BKF0DBvK.mjs';

const OverflowContentTooltip = ({ text }) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.offsetWidth);
    }
  }, [text]);
  const content = /* @__PURE__ */ jsx(
    "div",
    {
      ref: textRef,
      className: "whitespace-nowrap overflow-hidden text-ellipsis w-full text-xs 3xl:text-base font-medium ",
      children: text
    }
  );
  if (!isTruncated) return content;
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, className: "cursor-pointer", children: content }),
    /* @__PURE__ */ jsxs(TooltipContent, { className: "max-w-sm bg-white   ", children: [
      text,
      " ",
      /* @__PURE__ */ jsx(TooltipArrow, { className: "fill-white" })
    ] })
  ] }) });
};

export { OverflowContentTooltip as O };
//# sourceMappingURL=OverflowContentTooltip-CDqdkYzJ.mjs.map
