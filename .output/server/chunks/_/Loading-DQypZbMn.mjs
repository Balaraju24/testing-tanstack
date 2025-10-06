import { jsx } from 'react/jsx-runtime';
import { c as cn } from './router-e7zdrxGz.mjs';

const LoadingIcon = "/assets/loading-icon-BtZ7VRYd.svg";
const LoadingComponent = ({
  loading,
  message,
  className
}) => {
  if (!loading) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "alert",
      "aria-live": "assertive",
      className: cn(
        "absolute inset-0 flex flex-col items-center justify-center  z-50",
        className
      ),
      children: /* @__PURE__ */ jsx("img", { src: LoadingIcon, alt: "loading", className: "w-36 h-36" })
    }
  );
};

export { LoadingComponent as L };
//# sourceMappingURL=Loading-DQypZbMn.mjs.map
