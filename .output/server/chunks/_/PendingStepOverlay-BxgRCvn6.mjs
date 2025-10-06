import { jsxs, jsx } from 'react/jsx-runtime';
import { LockIcon } from 'lucide-react';

const PendingStepOverlay = ({ title }) => {
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-transparent relative", children: [
    /* @__PURE__ */ jsx("div", { className: "h-full bg-gray-200 absolute w-full top-0 opacity-40 z-10" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-[calc(100%-60px)] z-20 relative py-2 px-2", children: /* @__PURE__ */ jsxs("div", { className: "p-6 border border-gray-300 bg-white space-y-2 shadow-xl w-4/6", children: [
      /* @__PURE__ */ jsxs("div", { className: "font-normal flex gap-2 text-base items-center justify-center w-full ", children: [
        /* @__PURE__ */ jsx("div", { className: "flex ", children: /* @__PURE__ */ jsx(LockIcon, { className: "w-5 h-5 " }) }),
        `${title} is pending`
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: `You can access this step once ${title} is completed` })
    ] }) })
  ] });
};

export { PendingStepOverlay as P };
//# sourceMappingURL=PendingStepOverlay-BxgRCvn6.mjs.map
