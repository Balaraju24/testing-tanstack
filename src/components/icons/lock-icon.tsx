import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface LockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LockIconProps extends Omit<HTMLMotionProps<"div">, "size"> {
  size?: number;
  className?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const LockIcon = forwardRef<LockIconHandle, LockIconProps>(
  (
    { onMouseEnter, onMouseLeave, className = "", size = 16, ...props },
    ref
  ) => {
    const controls = useAnimation();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => ({
      startAnimation: () => {
        isControlled.current = true;
        controls.start("shake");
      },
      stopAnimation: () => {
        isControlled.current = true;
        controls.start("normal");
      },
    }));

    const handleEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseEnter?.(e);
        if (!isControlled.current) {
          controls.start("shake");
        }
      },
      [controls, onMouseEnter]
    );

    const handleLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(e);
        if (!isControlled.current) {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    const lockVariants: Variants = {
      normal: { x: 0, rotate: 0 },
      shake: {
        x: [0, -3, 3, -3, 3, 0],
        rotate: [0, -2, 2, -2, 2, 0],
        transition: {
          duration: 0.4,
          ease: "easeInOut",
        },
      },
    };

    return (
      <motion.div
        className={cn(className)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        <motion.svg
          height={size}
          width={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={lockVariants}
          animate={controls}
          initial="normal"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </motion.svg>
      </motion.div>
    );
  }
);

LockIcon.displayName = "LockIcon";

export default LockIcon;
