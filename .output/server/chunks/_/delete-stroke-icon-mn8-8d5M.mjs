import { jsxs, jsx } from 'react/jsx-runtime';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const DeleteStrokeIcon = forwardRef(({ className, size = 14, ...props }, ref) => {
  const lidVariants = {
    normal: { y: 0, rotate: 0 },
    hover: {
      y: -3,
      rotate: -15,
      transition: { type: "spring", stiffness: 400, damping: 15 }
    }
  };
  const canVariants = {
    normal: { scale: 1 },
    hover: {
      scale: [1, 0.95, 1.05, 1],
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  const smokeVariants = {
    normal: { opacity: 0, scale: 0, y: 0 },
    hover: {
      opacity: [0, 0.6, 0],
      scale: [0, 1.2, 1.8],
      y: [0, -6, -12],
      transition: { duration: 1, ease: "easeOut" }
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      style: { overflow: "visible" },
      whileHover: "hover",
      initial: "normal",
      animate: "normal",
      ...props,
      children: [
        /* @__PURE__ */ jsxs(
          motion.svg,
          {
            width: size,
            height: size,
            viewBox: "0 0 20 20",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className,
            style: { overflow: "visible" },
            children: [
              /* @__PURE__ */ jsx(
                motion.path,
                {
                  d: "M4.94449 16.1669L4.94451 16.1669L4.94411 16.162C4.89652 15.5911 4.84974 14.8991 4.80269 14.2032C4.76518 13.6484 4.7275 13.0911 4.68913 12.5909V7.21159H15.31C15.3129 7.73691 15.3203 8.3004 15.3278 8.86504C15.3468 10.2959 15.3658 11.7342 15.3099 12.577C15.2711 13.0816 15.233 13.645 15.195 14.2059C15.1481 14.9008 15.1013 15.5917 15.0538 16.1621L15.0538 16.162L15.0535 16.1669C14.9838 17.1422 14.1426 17.9167 13.1613 17.9167H6.83657C5.85529 17.9167 5.01414 17.1422 4.94449 16.1669Z",
                  stroke: "currentColor",
                  strokeWidth: "0.833333",
                  variants: canVariants
                }
              ),
              /* @__PURE__ */ jsx(
                motion.path,
                {
                  d: "M13.4772 4.42619L13.5949 4.64678H13.8449H15.9816C16.0512 4.64678 16.1209 4.67377 16.1701 4.71889C16.214 4.75907 16.2487 4.81931 16.2487 4.91388C16.2487 5.00845 16.214 5.06869 16.1701 5.10887C16.1209 5.15399 16.0512 5.18097 15.9816 5.18097H4.01579C3.98037 5.18097 3.91006 5.15907 3.84034 5.08934C3.77061 5.01961 3.7487 4.9493 3.7487 4.91388C3.7487 4.87845 3.77061 4.80815 3.84034 4.73842C3.91007 4.66869 3.98037 4.64678 4.01579 4.64678H6.15255H6.37554L6.49924 4.46124L7.35394 3.17919L7.3736 3.14969L7.388 3.11729C7.65693 2.51221 8.35298 2.08268 9.05853 2.08268H11.1098C11.7904 2.08268 12.4299 2.492 12.7952 3.14742L13.4772 4.42619ZM7.25221 4.00928L6.85377 4.64678H7.60554H12.3919H13.1436L12.7452 4.00929L12.3361 3.35474C12.2197 3.08311 12.0405 2.87103 11.805 2.72967C11.5637 2.58489 11.292 2.5314 11.0244 2.5314H8.97303C8.37437 2.5314 7.90447 2.88764 7.66989 3.34099L7.25221 4.00928Z",
                  stroke: "currentColor",
                  strokeWidth: "0.833333",
                  style: { transformOrigin: "center center" },
                  variants: lidVariants
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute",
            style: {
              top: "35%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%"
            },
            variants: smokeVariants,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: size * 0.4,
                  height: size * 0.4,
                  borderRadius: "50%",
                  background: "rgba(128,128,128,0.4)",
                  filter: "blur(1px)"
                }
              }
            )
          }
        )
      ]
    }
  );
});
DeleteStrokeIcon.displayName = "DeleteStrokeIcon";

export { DeleteStrokeIcon as D };
//# sourceMappingURL=delete-stroke-icon-mn8-8d5M.mjs.map
