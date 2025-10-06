import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { createRouter, createRootRoute, createFileRoute, lazyRouteComponent, redirect, Outlet, HeadContent, Scripts } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Toaster as Toaster$1, toast } from 'sonner';
import { motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';

const SomethingWentWrong = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "500",
    height: "300",
    viewBox: "0 0 900 600",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_15999_29445)", children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M451.426 562.123C596.192 562.123 713.549 444.766 713.549 300C713.549 155.233 596.192 37.877 451.426 37.877C306.659 37.877 189.303 155.233 189.303 300C189.303 444.766 306.659 562.123 451.426 562.123Z",
            fill: "url(#paint0_linear_15999_29445)"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M708.475 240.202C695.848 262.737 668.194 265.833 623.89 261.551C590.57 258.324 560.185 255.827 526.863 237.659C503.54 224.952 485.078 207.76 471.603 191.062C457.001 172.973 436.62 152.328 446.611 131.817C460.341 103.643 539.744 79.913 616.847 118.718C701.545 161.359 720.828 218.177 708.475 240.202Z",
            fill: "url(#paint1_linear_15999_29445)"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M793.833 287.316C770.045 299.116 738.473 283.943 738.473 283.943C738.473 283.943 745.489 249.646 769.29 237.862C793.077 226.062 824.637 241.218 824.637 241.218C824.637 241.218 817.62 275.516 793.833 287.316Z",
            fill: "url(#paint2_linear_15999_29445)"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M118.142 373.556C149.223 392.184 193.815 374.964 193.815 374.964C193.815 374.964 187.984 327.548 156.884 308.941C125.803 290.312 81.2305 307.512 81.2305 307.512C81.2305 307.512 87.0605 354.928 118.142 373.556Z",
            fill: "url(#paint3_linear_15999_29445)"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M747.029 195.257C739.855 195.257 734.04 201.073 734.04 208.246C734.04 215.42 739.855 221.235 747.029 221.235C754.202 221.235 760.018 215.42 760.018 208.246C760.018 201.073 754.202 195.257 747.029 195.257Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M257.822 267.205C249.752 267.205 243.21 273.747 243.21 281.817C243.21 289.887 249.752 296.429 257.822 296.429C265.892 296.429 272.434 289.887 272.434 281.817C272.434 273.747 265.892 267.205 257.822 267.205Z",
            fill: "#E6E6E6"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M159.928 208.109C153.203 208.109 147.751 202.657 147.751 195.932C147.751 189.207 153.203 183.755 159.928 183.755C166.654 183.755 172.105 189.207 172.105 195.932C172.105 202.657 166.654 208.109 159.928 208.109Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M635.635 264.934C632.497 264.934 629.952 262.39 629.952 259.251C629.952 256.113 632.497 253.568 635.635 253.568C638.774 253.568 641.318 256.113 641.318 259.251C641.318 262.39 638.774 264.934 635.635 264.934Z",
            fill: "#E6E6E6"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M668.43 520.116C664.395 520.116 661.124 516.845 661.124 512.81C661.124 508.775 664.395 505.504 668.43 505.504C672.465 505.504 675.736 508.775 675.736 512.81C675.736 516.845 672.465 520.116 668.43 520.116Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M157.752 447.501C151.923 447.501 147.199 442.776 147.199 436.948C147.199 431.119 151.923 426.395 157.752 426.395C163.58 426.395 168.305 431.119 168.305 436.948C168.305 442.776 163.58 447.501 157.752 447.501Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M279.792 175.335C275.356 175.335 271.76 171.739 271.76 167.303C271.76 162.868 275.356 159.271 279.792 159.271C284.228 159.271 287.824 162.868 287.824 167.303C287.824 171.739 284.228 175.335 279.792 175.335Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M669.744 177.723C664.812 177.723 660.814 173.725 660.814 168.793C660.814 163.861 664.812 159.863 669.744 159.863C674.676 159.863 678.674 163.861 678.674 168.793C678.674 173.725 674.676 177.723 669.744 177.723Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M189.678 268.053C190.825 272.331 188.286 276.728 184.008 277.874C179.73 279.02 175.333 276.482 174.187 272.204C173.041 267.926 175.579 263.529 179.857 262.383C184.135 261.236 188.532 263.775 189.678 268.053Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M385.553 110.589C379.661 110.589 374.885 105.813 374.885 99.9209C374.885 94.0292 379.661 89.2529 385.553 89.2529C391.444 89.2529 396.221 94.0292 396.221 99.9209C396.221 105.813 391.444 110.589 385.553 110.589Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M725.743 379.164C721.211 379.164 717.537 376.225 717.537 372.599C717.537 368.973 721.211 366.034 725.743 366.034C730.275 366.034 733.949 368.973 733.949 372.599C733.949 376.225 730.275 379.164 725.743 379.164Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M587.091 95.1094C589.477 104.012 584.193 113.164 575.29 115.549C566.387 117.935 557.236 112.651 554.851 103.748C552.465 94.8452 557.749 85.6941 566.652 83.3085C575.555 80.9229 584.706 86.2064 587.091 95.1094Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M787.974 327.261H788.188C789.459 345.272 802.854 345.549 802.854 345.549C802.854 345.549 788.083 345.837 788.083 366.649C788.083 345.837 773.312 345.549 773.312 345.549C773.312 345.549 786.702 345.272 787.974 327.261ZM248.446 502.359H248.635C249.763 518.66 261.649 518.911 261.649 518.911C261.649 518.911 248.544 519.172 248.544 538.007C248.544 519.172 235.438 518.911 235.438 518.911C235.438 518.911 247.318 518.66 248.446 502.359Z",
            fill: "#E1E4E5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M678.727 128.304H225.323C223.007 128.304 221.129 130.181 221.129 132.498V468.452C221.129 470.768 223.007 472.646 225.323 472.646H678.727C681.043 472.646 682.921 470.768 682.921 468.452V132.498C682.921 130.181 681.043 128.304 678.727 128.304Z",
            fill: "white",
            stroke: "#E1E4E5",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M404.575 247.969V271.961M500.553 247.969V271.961M536.354 380.341C536.354 380.341 504.912 350.196 452.475 350.196C400.039 350.196 368.596 380.341 368.596 380.341",
            stroke: "#E6E6E6",
            strokeWidth: "33.798",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M678.727 128.304H225.323C223.007 128.304 221.129 130.181 221.129 132.498V164.15C221.129 166.466 223.007 168.344 225.323 168.344H678.727C681.043 168.344 682.921 166.466 682.921 164.15V132.498C682.921 130.181 681.043 128.304 678.727 128.304Z",
            fill: "white",
            stroke: "#E1E4E5",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M243.819 141.65H243.818C240.132 141.65 237.145 144.638 237.145 148.323V148.324C237.145 152.01 240.132 154.997 243.818 154.997H243.819C247.504 154.997 250.492 152.01 250.492 148.324V148.323C250.492 144.638 247.504 141.65 243.819 141.65Z",
            fill: "white",
            stroke: "#E1E4E5",
            strokeWidth: "4.194"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M267.842 141.65H267.841C264.156 141.65 261.168 144.638 261.168 148.323V148.324C261.168 152.01 264.156 154.997 267.841 154.997H267.842C271.527 154.997 274.515 152.01 274.515 148.324V148.323C274.515 144.638 271.527 141.65 267.842 141.65Z",
            fill: "white",
            stroke: "#E1E4E5",
            strokeWidth: "4.194"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M291.865 141.65H291.864C288.179 141.65 285.191 144.638 285.191 148.323V148.324C285.191 152.01 288.179 154.997 291.864 154.997H291.865C295.551 154.997 298.538 152.01 298.538 148.324V148.323C298.538 144.638 295.551 141.65 291.865 141.65Z",
            fill: "white",
            stroke: "#E1E4E5",
            strokeWidth: "4.194"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "paint0_linear_15999_29445",
            x1: "462.603",
            y1: "856.045",
            x2: "446.439",
            y2: "-532.412",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
              /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "paint1_linear_15999_29445",
            x1: "623.412",
            y1: "386.251",
            x2: "510.865",
            y2: "-119.486",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
              /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "paint2_linear_15999_29445",
            x1: "702.485",
            y1: "324.123",
            x2: "898.687",
            y2: "168.927",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
              /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "paint3_linear_15999_29445",
            x1: "238.418",
            y1: "433.519",
            x2: "-11.6725",
            y2: "201.151",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
              /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("clipPath", { id: "clip0_15999_29445", children: /* @__PURE__ */ jsx("rect", { width: "900", height: "600", fill: "white" }) })
      ] })
    ]
  }
);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function NetworkErrorFallback({
  error,
  onRetry
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center text-center text-red-600 p-6 space-y-4 min-h-screen", children: [
    /* @__PURE__ */ jsx(SomethingWentWrong, {}),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Oops! Something went wrong." }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-md", children: error.message }),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: onRetry,
        className: "mt-2 rounded bg-black transition px-5 py-2 text-white",
        children: "Retry"
      }
    )
  ] });
}
const OfflineIllustration = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "400",
    height: "300",
    viewBox: "0 0 900 600",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_3453_5798)", children: [
        /* @__PURE__ */ jsx(
          "mask",
          {
            id: "mask0_3453_5798",
            style: { maskType: "luminance" },
            maskUnits: "userSpaceOnUse",
            x: 0,
            y: 0,
            width: 900,
            height: 600,
            children: /* @__PURE__ */ jsx("path", { d: "M900 0H0V600H900V0Z", fill: "white" })
          }
        ),
        /* @__PURE__ */ jsxs("g", { mask: "url(#mask0_3453_5798)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M630.602 452.812C620.874 452.812 612.989 460.699 612.989 470.426C612.989 480.153 620.874 488.039 630.602 488.039C640.329 488.039 648.215 480.153 648.215 470.426C648.215 460.699 640.329 452.812 630.602 452.812Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M653.564 111.35C646.041 111.35 639.944 117.448 639.944 124.97C639.944 132.492 646.041 138.59 653.564 138.59C661.086 138.59 667.184 132.492 667.184 124.97C667.184 117.448 661.086 111.35 653.564 111.35Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M350.481 288.705C342.474 288.705 335.982 295.197 335.982 303.204C335.982 311.212 342.474 317.703 350.481 317.703C358.489 317.703 364.98 311.212 364.98 303.204C364.98 295.197 358.489 288.705 350.481 288.705Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M181.511 372.969C172.392 372.969 164.999 365.577 164.999 356.457C164.999 347.338 172.392 339.945 181.511 339.945C190.631 339.945 198.023 347.338 198.023 356.457C198.023 365.577 190.631 372.969 181.511 372.969Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M672.642 418.435C675.377 413.697 681.436 412.073 686.175 414.809C690.913 417.545 692.537 423.604 689.801 428.342C687.065 433.081 681.006 434.703 676.268 431.967C671.529 429.232 669.906 423.174 672.642 418.435Z",
              fill: "#CDD0D1"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M372.41 515.829C375.417 510.62 382.078 508.836 387.287 511.843C392.496 514.851 394.281 521.511 391.274 526.72C388.266 531.93 381.605 533.714 376.396 530.707C371.187 527.699 369.402 521.039 372.41 515.829Z",
              fill: "#CDD0D1"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M718.645 236.827C711.957 236.827 706.536 231.406 706.536 224.718C706.536 218.031 711.957 212.609 718.645 212.609C725.333 212.609 730.754 218.031 730.754 224.718C730.754 231.406 725.333 236.827 718.645 236.827Z",
              fill: "#CDD0D1"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M556.659 373.92C558.213 379.72 554.771 385.683 548.971 387.237C543.17 388.791 537.208 385.35 535.654 379.549C534.1 373.749 537.542 367.786 543.342 366.232C549.143 364.678 555.105 368.12 556.659 373.92Z",
              fill: "#CDD0D1"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M207.207 155.815C199.218 155.815 192.742 149.339 192.742 141.35C192.742 133.361 199.218 126.885 207.207 126.885C215.196 126.885 221.672 133.361 221.672 141.35C221.672 149.339 215.196 155.815 207.207 155.815Z",
              fill: "#CDD0D1"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M537.871 511.597C540.944 506.275 546.886 503.953 551.144 506.411C555.402 508.869 556.363 515.177 553.29 520.499C550.217 525.82 544.275 528.142 540.017 525.684C535.759 523.226 534.799 516.918 537.871 511.597Z",
              fill: "#CDD0D1"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M192.47 236.744H192.628C193.567 250.043 203.457 250.248 203.457 250.248C203.457 250.248 192.551 250.461 192.551 265.828C192.551 250.461 181.645 250.248 181.645 250.248C181.645 250.248 191.531 250.043 192.47 236.744ZM244.193 442.036H244.345C245.246 455.295 254.742 455.5 254.742 455.5C254.742 455.5 244.271 455.712 244.271 471.033C244.271 455.712 233.8 455.5 233.8 455.5C233.8 455.5 243.292 455.295 244.193 442.036ZM723.577 299.996H723.729C724.63 313.256 734.126 313.46 734.126 313.46C734.126 313.46 723.655 313.672 723.655 328.994C723.655 313.672 713.184 313.46 713.184 313.46C713.184 313.46 722.676 313.256 723.577 299.996Z",
              fill: "#CDD0D1"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M257.905 199.662C246.437 229.13 241.35 261.824 244.327 296.059C245.372 308.063 247.471 319.952 250.6 331.588L287.442 321.031C291.555 319.852 295.911 319.812 300.045 320.915C304.18 322.017 307.937 324.221 310.917 327.291L370.337 388.503C372.355 390.581 374.797 392.201 377.496 393.252C380.196 394.303 383.09 394.76 385.982 394.593L408.593 393.285C423.311 392.433 435.209 405.112 433.426 419.746L425.233 486.975C428.975 487.511 432.746 487.945 436.544 488.276C447.489 489.232 458.49 489.366 469.454 488.676L464.083 483.322C461.11 480.358 458.98 476.655 457.912 472.595C456.843 468.535 456.875 464.264 458.004 460.221L472.898 406.884C476.001 395.772 486.671 388.523 498.144 389.732L571.441 397.453C589.118 399.315 598.494 419.287 588.634 434.077L577.38 450.959C588.963 442.861 599.71 433.629 609.46 423.399L583.064 346.095C582.097 343.262 580.512 340.68 578.423 338.536C576.335 336.392 573.795 334.739 570.989 333.698L500.317 307.469C484.076 301.441 479.619 280.569 491.982 268.434L619.905 142.867C600.511 119.226 576.155 99.7416 548.562 86.1386L515.263 193.145C513.992 197.23 511.636 200.894 508.446 203.745C505.256 206.597 501.352 208.529 497.15 209.337L402.735 227.474C399.892 228.02 397.199 229.172 394.84 230.851C392.481 232.53 390.511 234.697 389.064 237.206L374.83 261.876C367.471 274.63 350.37 277.627 339.114 268.135L257.905 199.662ZM421.809 486.455L429.99 419.327C431.512 406.836 421.356 396.014 408.793 396.741L386.182 398.049C382.794 398.245 379.403 397.709 376.241 396.478C373.078 395.247 370.217 393.349 367.853 390.914L308.433 329.702C305.889 327.081 302.682 325.2 299.153 324.259C295.624 323.318 291.906 323.353 288.395 324.359L251.527 334.923C273.865 412.795 340.765 473.445 421.809 486.455ZM667.129 257.691C672.606 320.696 650.78 378.471 612.14 420.535L586.34 344.976C585.207 341.657 583.35 338.632 580.903 336.12C578.456 333.608 575.481 331.672 572.193 330.452L501.521 304.223C487.658 299.078 483.854 281.263 494.407 270.904L622.089 145.574C647.159 177.154 663.49 215.844 667.129 257.691ZM259.257 196.274L341.345 265.489C350.954 273.59 365.55 271.032 371.831 260.146L386.065 235.476C387.761 232.537 390.069 229.998 392.832 228.031C395.596 226.063 398.751 224.714 402.082 224.074L496.497 205.937C500.084 205.248 503.416 203.598 506.139 201.164C508.862 198.73 510.873 195.603 511.958 192.116L545.41 84.6166C523.583 74.3016 499.807 67.6436 474.912 65.4736C377.839 57.0336 293.159 113.428 259.257 196.274ZM474.018 488.337C509.134 485.357 541.773 473.882 569.881 455.966L585.754 432.157C594.17 419.533 586.167 402.485 571.078 400.896L497.781 393.174C487.988 392.143 478.88 398.331 476.232 407.815L461.338 461.152C460.375 464.603 460.347 468.249 461.259 471.714C462.171 475.18 463.99 478.34 466.527 480.87L474.018 488.337Z",
              fill: "#CDD0D1"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M444.196 95.8042C487.935 139.543 487.935 210.457 444.196 254.196C400.457 297.935 329.543 297.935 285.804 254.196C242.065 210.457 242.065 139.543 285.804 95.8042C329.543 52.0653 400.457 52.0653 444.196 95.8042Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M444.196 95.8042C487.935 139.543 487.935 210.457 444.196 254.196C400.457 297.935 329.543 297.935 285.804 254.196C242.065 210.457 242.065 139.543 285.804 95.8042C329.543 52.0653 400.457 52.0653 444.196 95.8042Z",
              stroke: "black",
              strokeWidth: "10.562",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.g,
            {
              animate: {
                scale: [1, 1.1, 1],
                opacity: [1, 0.9, 1]
              },
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              style: { transformOrigin: "center" },
              children: [
                /* @__PURE__ */ jsx(
                  motion.path,
                  {
                    d: "M425.666 154.756C390.286 127.141 339.712 127.141 304.332 154.756",
                    stroke: "#F9F9F9",
                    strokeWidth: "14",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    initial: { stroke: "#D1D5DB" },
                    animate: { stroke: ["#D1D5DB", "#F9F9F9", "#D1D5DB"] },
                    transition: {
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.path,
                  {
                    d: "M329.62 190.082C350.253 173.992 379.746 173.992 400.391 190.082",
                    stroke: "#F9F9F9",
                    strokeWidth: "14",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    initial: { stroke: "#D1D5DB" },
                    animate: { stroke: ["#D1D5DB", "#F9F9F9", "#D1D5DB"] },
                    transition: {
                      duration: 1.8,
                      delay: 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.circle,
                  {
                    cx: "364.999",
                    cy: "224.753",
                    r: "4.5",
                    fill: "#F9F9F9",
                    initial: { fill: "#D1D5DB" },
                    animate: { fill: ["#D1D5DB", "#F9F9F9", "#D1D5DB"] },
                    transition: {
                      duration: 1.6,
                      delay: 0.4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                )
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_3453_5798", children: /* @__PURE__ */ jsx("rect", { width: "900", height: "600", fill: "white" }) }) })
    ]
  }
);
function NetworkStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const handleRetry = () => {
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      toast.error("Still offline. Check your connection.", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
    }
  };
  useEffect(() => {
    const onlineStatus = navigator.onLine;
    setIsOnline(onlineStatus);
    setHasMounted(true);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  if (!hasMounted || isOnline) return null;
  return !isOnline && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-4 z-9999", children: [
    /* @__PURE__ */ jsx(OfflineIllustration, {}),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold mb-2 text-gray-900", children: "Connect to the internet" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "You're offline. Check your connection." }),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: handleRetry,
        className: "px-6 py-2 bg-black hover:bg-black text-white font-medium rounded transition-colors",
        children: "Retry"
      }
    )
  ] });
}
const NotFound = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "800",
    height: "500",
    viewBox: "0 0 900 600",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ jsx("path", { fill: "transparent", d: "M0 0h900v600H0z" }),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "179.031",
          y: "138.913",
          width: "588.237",
          height: "369.687",
          rx: "28",
          fill: "#fff",
          stroke: "#E1E4E5",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "630.851",
          y: "166.091",
          width: "63.943",
          height: "23.177",
          rx: "11.589",
          fill: "#fff",
          stroke: "#E1E4E5",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "544.79",
          y: "166.091",
          width: "63.943",
          height: "23.177",
          rx: "11.589",
          fill: "#fff",
          stroke: "#E1E4E5",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "499.495",
          y: "166.091",
          width: "23.177",
          height: "23.177",
          rx: "11.589",
          fill: "#fff",
          stroke: "#E1E4E5",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M252.553 381.315h79.058v28.953h33.296v-28.953h20.428v-27.908h-20.428v-107.85h-43.591L252.553 353.89v27.425zm79.701-27.908h-44.636v-1.287l43.349-68.602h1.287v69.889zm140.864 60.48c41.419 0 66.431-31.527 66.512-85.814.08-53.884-25.254-84.768-66.512-84.768-41.338 0-66.431 30.803-66.511 84.768-.161 54.126 25.012 85.733 66.511 85.814zm0-28.873c-18.899 0-31.124-18.98-31.044-56.941.081-37.397 12.225-56.217 31.044-56.217 18.739 0 30.964 18.82 30.964 56.217.08 37.961-12.144 56.941-30.964 56.941zm88.85-3.699h79.058v28.953h33.296v-28.953h20.428v-27.908h-20.428v-107.85h-43.591L561.968 353.89v27.425zm79.701-27.908h-44.636v-1.287l43.349-68.602h1.287v69.889z",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "216.399",
          y: "166.091",
          width: "18.648",
          height: "18.648",
          rx: "9.324",
          fill: "#fff",
          stroke: "#E1E4E5",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "11.833",
          transform: "matrix(1 0 0 -1 186.698 399.545)",
          fill: "#7f7f7f"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "16.569",
          transform: "scale(-1 1) rotate(30 -842.37 -1310.527)",
          fill: "#7f7f7f"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "12.349",
          transform: "matrix(-1 0 0 1 466.813 177.572)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx("circle", { cx: "319.16", cy: "131.833", r: "16.435", fill: "#7f7f7f" }),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "554.114",
          cy: "443.789",
          r: "13.589",
          transform: "rotate(180 554.114 443.789)",
          fill: "#7f7f7f"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "12.49",
          transform: "matrix(-1 0 0 1 302.76 469.868)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: "9.36",
          transform: "scale(1 -1) rotate(-30 -593.95 -1005.323)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "718.31",
          y: "181.625",
          width: "27.252",
          height: "3.175",
          rx: "1.588",
          transform: "rotate(-45 718.31 181.625)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "728.759",
          y: "181.7",
          width: "10.119",
          height: "3.175",
          rx: "1.588",
          transform: "rotate(-45 728.759 181.7)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "195.148",
          y: "480.282",
          width: "24.384",
          height: "2.841",
          rx: "1.42",
          transform: "rotate(-45 195.148 480.282)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "204.497",
          y: "480.348",
          width: "9.054",
          height: "2.841",
          rx: "1.42",
          transform: "rotate(-45 204.497 480.348)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "168.95",
          y: "136.396",
          width: "47.139",
          height: "5.492",
          rx: "2.746",
          transform: "rotate(135 168.95 136.396)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "150.878",
          y: "136.267",
          width: "17.503",
          height: "5.492",
          rx: "2.746",
          transform: "rotate(135 150.878 136.267)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "744.509",
          y: "462.467",
          width: "33.185",
          height: "3.866",
          rx: "1.933",
          transform: "rotate(135 744.509 462.467)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "731.786",
          y: "462.377",
          width: "12.322",
          height: "3.866",
          rx: "1.933",
          transform: "rotate(135 731.786 462.377)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M180.882 325.922c-24.64 0-44.617-20.259-44.617-45.246 0-24.987 19.977-45.245 44.617-45.245 24.64 0 44.617 20.258 44.617 45.245s-19.977 45.246-44.617 45.246z",
          fill: "#7f7f7f"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "m198.857 261.476-18.848 20.109-11.316-12.064",
          stroke: "#fff",
          strokeWidth: "7.405",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "m161.178 300.835 18.848-20.109 11.316 12.064",
          stroke: "#fff",
          strokeWidth: "7.405",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ]
  }
);
function NotFoundComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-4 z-9999", children: [
    /* @__PURE__ */ jsx(NotFound, {}),
    /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold mb-2 text-gray-900", children: "This Page isn't available" })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      duration: 2500,
      className: "fixed top-10  z-60",
      toastOptions: {
        classNames: {
          toast: "bg-white text-black shadow-lg flex gap-2 border border-gray-200 rounded-lg p-4",
          description: "text-gray-600",
          actionButton: "!bg-transparent  !border-none !text-black  rounded",
          cancelButton: "bg-gray-300 text-gray-700  rounded"
        }
      },
      ...props
    }
  );
};
const authMiddleware = async ({ location }) => {
  return;
};
const appCss = "/assets/app-eifVq1oC.css";
const favIconUrl = "data:image/svg+xml,%3csvg%20width='1024'%20height='1024'%20viewBox='0%200%201024%201024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='1024'%20height='1024'%20fill='black'/%3e%3cpath%20d='M622.457%20204H405.6V234.504H622.457V204Z'%20fill='white'/%3e%3cpath%20d='M616.556%20209.881H411.48V228.602H616.556V209.881Z'%20fill='white'/%3e%3cpath%20d='M340.461%20287.255C361.988%20295.768%20381.3%20305.714%20399.477%20315.086C437.294%20334.583%20469.942%20351.41%20511.797%20351.41C553.654%20351.41%20586.302%20334.582%20624.104%20315.092C642.288%20305.715%20661.605%20295.768%20683.134%20287.255C672.559%20276.225%20662.028%20262.371%20659.312%20248.76H364.283C361.566%20262.371%20351.035%20276.225%20340.461%20287.255Z'%20fill='white'/%3e%3cpath%20d='M511.796%20345.507C471.366%20345.507%20439.304%20328.978%20402.175%20309.837C386.667%20301.84%20369.338%20292.906%20350.5%20284.977C359.771%20274.253%20365.921%20264.093%20368.85%20254.641H654.746C657.677%20264.088%20663.824%20274.253%20673.098%20284.977C654.197%20292.928%20636.894%20301.851%20621.404%20309.842C584.289%20328.978%20552.238%20345.507%20511.796%20345.507Z'%20fill='white'/%3e%3cpath%20d='M706.764%20653.898C716.036%20684.708%20757.353%20679.206%20804.6%20679.206C851.847%20679.206%20889.345%20684.707%20898.617%20653.898L899.223%20653.744L898.966%20652.73C899.827%20649.589%20900.386%20646.375%20900.6%20643.099H896.526L815.754%20324.271C826.686%20318.952%20834.24%20307.77%20834.24%20294.796C834.24%20276.683%20819.557%20262%20801.444%20262C786.879%20262%20774.548%20271.502%20770.27%20284.641C713.026%20289.627%20670.481%20311.552%20632.413%20331.181C594.173%20350.897%20558.053%20369.521%20511.8%20369.521C465.548%20369.521%20429.428%20350.897%20391.188%20331.181C353.119%20311.553%20310.573%20289.629%20253.33%20284.641C249.052%20271.502%20236.721%20262%20222.155%20262C204.043%20262%20189.36%20276.684%20189.36%20294.796C189.36%20307.77%20196.914%20318.952%20207.846%20324.271L127.074%20643.099H123C123.214%20646.376%20123.772%20649.591%20124.635%20652.73L124.378%20653.744L124.985%20653.898C134.257%20684.708%20172.963%20679.206%20220.209%20679.206C267.456%20679.206%20307.566%20684.707%20316.838%20653.898L317.445%20653.744L317.188%20652.73C318.05%20649.589%20318.608%20646.375%20318.822%20643.099H314.748L234.234%20325.288C242.558%20321.983%20249.206%20315.365%20252.559%20307.063C304.666%20311.799%20343.352%20331.737%20380.917%20351.105C406.006%20364.042%20430.249%20376.518%20457.244%20384.206H315.607C315.607%20384.206%20358.385%20415.117%20364.287%20444.708H659.317C665.218%20415.117%20707.997%20384.206%20707.997%20384.206H566.36C593.355%20376.519%20617.598%20364.042%20642.688%20351.105C680.252%20331.738%20718.938%20311.799%20771.046%20307.063C774.4%20315.366%20781.047%20321.983%20789.37%20325.29L708.856%20643.099H704.782C704.996%20646.376%20705.554%20649.591%20706.416%20652.73L706.159%20653.744L706.764%20653.898ZM804.6%20328.806L886.248%20643.099H803.011L804.6%20328.806ZM220.209%20643.099H137.352L223.8%20328.806L220.209%20643.099ZM304.466%20643.099H220.209L223.8%20328.806L304.466%20643.099ZM804.6%20328.806L803.011%20643.099H719.134L804.6%20328.806Z'%20fill='white'/%3e%3cpath%20d='M363.002%20818.402V482.402H435.002L582.362%20703.202V482.402H654.362V818.402H582.362L435.002%20598.562V818.402H363.002Z'%20fill='white'/%3e%3crect%20x='61.12'%20y='61.12'%20width='900.76'%20height='900.76'%20stroke='white'%20strokeWidth='10.24'/%3e%3c/svg%3e";
const queryClient = new QueryClient();
const Route$N = createRootRoute({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      title: "Nyaya Tech"
    }],
    links: [{
      rel: "stylesheet",
      href: appCss
    }, {
      rel: "icon",
      type: "image/svg+xml",
      href: favIconUrl
    }]
  }),
  notFoundComponent: () => {
    return /* @__PURE__ */ jsx(NotFoundComponent, {});
  },
  component: RootComponent,
  beforeLoad: authMiddleware
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(QueryErrorResetBoundary, { children: ({
      reset
    }) => /* @__PURE__ */ jsxs(ErrorBoundary, { onReset: reset, fallbackRender: ({
      error,
      resetErrorBoundary
    }) => /* @__PURE__ */ jsx(NetworkErrorFallback, { error, onRetry: resetErrorBoundary }), children: [
      /* @__PURE__ */ jsx(NetworkStatusIndicator, {}),
      /* @__PURE__ */ jsx(Outlet, {})
    ] }) }),
    /* @__PURE__ */ jsx(Toaster, { position: "top-center" })
  ] }) });
}
function RootDocument({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$L = () => import('./login-D-EHQbxy.mjs');
const Route$M = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$L, "component")
});
const $$splitComponentImporter$K = () => import('./_app-DT-60T8h.mjs');
const Route$L = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$K, "component")
});
const Route$K = createFileRoute("/")({
  beforeLoad: async () => {
    throw redirect({
      to: "/login"
    });
  }
});
const $$splitComponentImporter$J = () => import('./index-BNI-9adb.mjs');
const Route$J = createFileRoute("/review/$service_id/")({
  component: lazyRouteComponent($$splitComponentImporter$J, "component")
});
const $$splitComponentImporter$I = () => import('./index-D5tryBuL.mjs');
const Route$I = createFileRoute("/_app/reviews/")({
  component: lazyRouteComponent($$splitComponentImporter$I, "component")
});
const $$splitComponentImporter$H = () => import('./index-BkvgVt9J.mjs');
const Route$H = createFileRoute("/_app/revenue-statistics/")({
  component: lazyRouteComponent($$splitComponentImporter$H, "component")
});
const $$splitComponentImporter$G = () => import('./index-DpoUT82Z.mjs');
const Route$G = createFileRoute("/_app/payments/")({
  component: lazyRouteComponent($$splitComponentImporter$G, "component")
});
const $$splitComponentImporter$F = () => import('./index-CVbReJC8.mjs');
const Route$F = createFileRoute("/_app/organizations/")({
  component: lazyRouteComponent($$splitComponentImporter$F, "component")
});
const $$splitComponentImporter$E = () => import('./index-B4U1qJTY.mjs');
const Route$E = createFileRoute("/_app/managers/")({
  component: lazyRouteComponent($$splitComponentImporter$E, "component")
});
const $$splitComponentImporter$D = () => import('./index-Dbz8gfsp.mjs');
const Route$D = createFileRoute("/_app/locations/")({
  component: lazyRouteComponent($$splitComponentImporter$D, "component")
});
const $$splitComponentImporter$C = () => import('./index-BiY2de77.mjs');
const Route$C = createFileRoute("/_app/litigations/")({
  component: lazyRouteComponent($$splitComponentImporter$C, "component")
});
const $$splitComponentImporter$B = () => import('./index-Bipkupn9.mjs');
const Route$B = createFileRoute("/_app/legal-opinion/")({
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const $$splitComponentImporter$A = () => import('./index-IAHY3FBp.mjs');
const Route$A = createFileRoute("/_app/engineer-property-valuation/")({
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const $$splitComponentImporter$z = () => import('./index-C00Q2VW0.mjs');
const Route$z = createFileRoute("/_app/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import('./index-DMcygVht.mjs');
const Route$y = createFileRoute("/_app/create-organization/")({
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import('./index-DU-YmavN.mjs');
const Route$x = createFileRoute("/_app/create-manager/")({
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import('./index-CjwtbvZ3.mjs');
const Route$w = createFileRoute("/_app/create-litigation/")({
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import('./index-mSaTHvVV.mjs');
const Route$v = createFileRoute("/_app/create-legal-opinion/")({
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import('./index-BdZkyjqD.mjs');
const Route$u = createFileRoute("/_app/create-advocate/")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import('./index-B0wlEYY_.mjs');
const Route$t = createFileRoute("/_app/advocates/")({
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import('./_service-layout-CziZ_ppy.mjs');
const Route$s = createFileRoute("/_app/litigations/_service-layout")({
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import('./_service-layout-CHF1reVu.mjs');
const Route$r = createFileRoute("/_app/legal-opinion/_service-layout")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import('./index-CnpARg1L.mjs');
const Route$q = createFileRoute("/_app/view-manager/$manager_id/")({
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import('./index-D74BBYgZ.mjs');
const Route$p = createFileRoute("/_app/view-advocate/$advocate_id/")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import('./index-oMVSsaRz.mjs');
const Route$o = createFileRoute("/_app/litigations/add-sub-stage/")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import('./index-BvnZqAcu.mjs');
const Route$n = createFileRoute("/_app/edit-organization/$organization_id/")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import('./index-B181nqng.mjs');
const Route$m = createFileRoute("/_app/edit-manager/$manager_id/")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import('./index-U42jAHM2.mjs');
const Route$l = createFileRoute("/_app/edit-advocate/$advocate_id/")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import('./notes-K_Iu0O9u.mjs');
const Route$k = createFileRoute("/_app/_service-layout/service/$service_id/notes")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import('./logs-auabFbUb.mjs');
const Route$j = createFileRoute("/_app/_service-layout/service/$service_id/logs")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import('./files-CcyY_7BB.mjs');
const Route$i = createFileRoute("/_app/_service-layout/service/$service_id/files")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import('./chat-C1jzkhhh.mjs');
const Route$h = createFileRoute("/_app/_service-layout/service/$service_id/chat")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import('./case-history-s6cNGGma.mjs');
const Route$g = createFileRoute("/_app/_service-layout/service/$service_id/case-history")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import('./index-BEckUKCR.mjs');
const Route$f = createFileRoute("/_app/_service-layout/service/$service_id/manage/")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import('./notes-B_FIGMrc.mjs');
const Route$e = createFileRoute("/_app/litigations/_service-layout/service/$service_id/notes")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import('./logs-BKxZH8PB.mjs');
const Route$d = createFileRoute("/_app/litigations/_service-layout/service/$service_id/logs")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import('./files-DPI64VM4.mjs');
const Route$c = createFileRoute("/_app/litigations/_service-layout/service/$service_id/files")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import('./chat-DtFpX2Ht.mjs');
const Route$b = createFileRoute("/_app/litigations/_service-layout/service/$service_id/chat")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import('./case-history-DxyvTWzW.mjs');
const Route$a = createFileRoute("/_app/litigations/_service-layout/service/$service_id/case-history")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import('./notes-QqP6VgoC.mjs');
const Route$9 = createFileRoute("/_app/legal-opinion/_service-layout/service/$service_id/notes")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import('./logs-DXWEZhXP.mjs');
const Route$8 = createFileRoute("/_app/legal-opinion/_service-layout/service/$service_id/logs")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import('./files-CCXb-6mA.mjs');
const Route$7 = createFileRoute("/_app/legal-opinion/_service-layout/service/$service_id/files")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import('./chat-C4DJxpug.mjs');
const Route$6 = createFileRoute("/_app/legal-opinion/_service-layout/service/$service_id/chat")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import('./case-history-B8FsfnkU.mjs');
const Route$5 = createFileRoute("/_app/legal-opinion/_service-layout/service/$service_id/case-history")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import('./index-Befe01eh.mjs');
const Route$4 = createFileRoute("/_app/litigations/_service-layout/service/$service_id/manage/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import('./index-DBnxy24Z.mjs');
const Route$3 = createFileRoute("/_app/legal-opinion/_service-layout/service/$service_id/manage/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import('./index-DT5Ya8i7.mjs');
const Route$2 = createFileRoute("/_app/_service-layout/service/$service_id/user/manage/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import('./index-ZBIr-r8-.mjs');
const Route$1 = createFileRoute("/_app/litigations/_service-layout/service/$service_id/user/manage/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import('./index-DU6GjupO.mjs');
const Route = createFileRoute("/_app/legal-opinion/_service-layout/service/$service_id/user/manage/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AppLitigationsRouteImport = createFileRoute("/_app/litigations")();
const AppLegalOpinionRouteImport = createFileRoute("/_app/legal-opinion")();
const LoginRoute = Route$M.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$N
});
const AppRoute = Route$L.update({
  id: "/_app",
  getParentRoute: () => Route$N
});
const IndexRoute = Route$K.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$N
});
const AppLitigationsRoute = AppLitigationsRouteImport.update({
  id: "/litigations",
  path: "/litigations",
  getParentRoute: () => AppRoute
});
const AppLegalOpinionRoute = AppLegalOpinionRouteImport.update({
  id: "/legal-opinion",
  path: "/legal-opinion",
  getParentRoute: () => AppRoute
});
const ReviewService_idIndexRoute = Route$J.update({
  id: "/review/$service_id/",
  path: "/review/$service_id/",
  getParentRoute: () => Route$N
});
const AppReviewsIndexRoute = Route$I.update({
  id: "/reviews/",
  path: "/reviews/",
  getParentRoute: () => AppRoute
});
const AppRevenueStatisticsIndexRoute = Route$H.update({
  id: "/revenue-statistics/",
  path: "/revenue-statistics/",
  getParentRoute: () => AppRoute
});
const AppPaymentsIndexRoute = Route$G.update({
  id: "/payments/",
  path: "/payments/",
  getParentRoute: () => AppRoute
});
const AppOrganizationsIndexRoute = Route$F.update({
  id: "/organizations/",
  path: "/organizations/",
  getParentRoute: () => AppRoute
});
const AppManagersIndexRoute = Route$E.update({
  id: "/managers/",
  path: "/managers/",
  getParentRoute: () => AppRoute
});
const AppLocationsIndexRoute = Route$D.update({
  id: "/locations/",
  path: "/locations/",
  getParentRoute: () => AppRoute
});
const AppLitigationsIndexRoute = Route$C.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppLitigationsRoute
});
const AppLegalOpinionIndexRoute = Route$B.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppLegalOpinionRoute
});
const AppEngineerPropertyValuationIndexRoute = Route$A.update({
  id: "/engineer-property-valuation/",
  path: "/engineer-property-valuation/",
  getParentRoute: () => AppRoute
});
const AppDashboardIndexRoute = Route$z.update({
  id: "/dashboard/",
  path: "/dashboard/",
  getParentRoute: () => AppRoute
});
const AppCreateOrganizationIndexRoute = Route$y.update({
  id: "/create-organization/",
  path: "/create-organization/",
  getParentRoute: () => AppRoute
});
const AppCreateManagerIndexRoute = Route$x.update({
  id: "/create-manager/",
  path: "/create-manager/",
  getParentRoute: () => AppRoute
});
const AppCreateLitigationIndexRoute = Route$w.update({
  id: "/create-litigation/",
  path: "/create-litigation/",
  getParentRoute: () => AppRoute
});
const AppCreateLegalOpinionIndexRoute = Route$v.update({
  id: "/create-legal-opinion/",
  path: "/create-legal-opinion/",
  getParentRoute: () => AppRoute
});
const AppCreateAdvocateIndexRoute = Route$u.update({
  id: "/create-advocate/",
  path: "/create-advocate/",
  getParentRoute: () => AppRoute
});
const AppAdvocatesIndexRoute = Route$t.update({
  id: "/advocates/",
  path: "/advocates/",
  getParentRoute: () => AppRoute
});
const AppLitigationsServiceLayoutRoute = Route$s.update({
  id: "/_service-layout",
  getParentRoute: () => AppLitigationsRoute
});
const AppLegalOpinionServiceLayoutRoute = Route$r.update({
  id: "/_service-layout",
  getParentRoute: () => AppLegalOpinionRoute
});
const AppViewManagerManager_idIndexRoute = Route$q.update({
  id: "/view-manager/$manager_id/",
  path: "/view-manager/$manager_id/",
  getParentRoute: () => AppRoute
});
const AppViewAdvocateAdvocate_idIndexRoute = Route$p.update({
  id: "/view-advocate/$advocate_id/",
  path: "/view-advocate/$advocate_id/",
  getParentRoute: () => AppRoute
});
const AppLitigationsAddSubStageIndexRoute = Route$o.update({
  id: "/add-sub-stage/",
  path: "/add-sub-stage/",
  getParentRoute: () => AppLitigationsRoute
});
const AppEditOrganizationOrganization_idIndexRoute = Route$n.update({
  id: "/edit-organization/$organization_id/",
  path: "/edit-organization/$organization_id/",
  getParentRoute: () => AppRoute
});
const AppEditManagerManager_idIndexRoute = Route$m.update({
  id: "/edit-manager/$manager_id/",
  path: "/edit-manager/$manager_id/",
  getParentRoute: () => AppRoute
});
const AppEditAdvocateAdvocate_idIndexRoute = Route$l.update({
  id: "/edit-advocate/$advocate_id/",
  path: "/edit-advocate/$advocate_id/",
  getParentRoute: () => AppRoute
});
const AppServiceLayoutServiceService_idNotesRoute = Route$k.update({
  id: "/_service-layout/service/$service_id/notes",
  path: "/service/$service_id/notes",
  getParentRoute: () => AppRoute
});
const AppServiceLayoutServiceService_idLogsRoute = Route$j.update({
  id: "/_service-layout/service/$service_id/logs",
  path: "/service/$service_id/logs",
  getParentRoute: () => AppRoute
});
const AppServiceLayoutServiceService_idFilesRoute = Route$i.update({
  id: "/_service-layout/service/$service_id/files",
  path: "/service/$service_id/files",
  getParentRoute: () => AppRoute
});
const AppServiceLayoutServiceService_idChatRoute = Route$h.update({
  id: "/_service-layout/service/$service_id/chat",
  path: "/service/$service_id/chat",
  getParentRoute: () => AppRoute
});
const AppServiceLayoutServiceService_idCaseHistoryRoute = Route$g.update({
  id: "/_service-layout/service/$service_id/case-history",
  path: "/service/$service_id/case-history",
  getParentRoute: () => AppRoute
});
const AppServiceLayoutServiceService_idManageIndexRoute = Route$f.update({
  id: "/_service-layout/service/$service_id/manage/",
  path: "/service/$service_id/manage/",
  getParentRoute: () => AppRoute
});
const AppLitigationsServiceLayoutServiceService_idNotesRoute = Route$e.update({
  id: "/service/$service_id/notes",
  path: "/service/$service_id/notes",
  getParentRoute: () => AppLitigationsServiceLayoutRoute
});
const AppLitigationsServiceLayoutServiceService_idLogsRoute = Route$d.update({
  id: "/service/$service_id/logs",
  path: "/service/$service_id/logs",
  getParentRoute: () => AppLitigationsServiceLayoutRoute
});
const AppLitigationsServiceLayoutServiceService_idFilesRoute = Route$c.update({
  id: "/service/$service_id/files",
  path: "/service/$service_id/files",
  getParentRoute: () => AppLitigationsServiceLayoutRoute
});
const AppLitigationsServiceLayoutServiceService_idChatRoute = Route$b.update({
  id: "/service/$service_id/chat",
  path: "/service/$service_id/chat",
  getParentRoute: () => AppLitigationsServiceLayoutRoute
});
const AppLitigationsServiceLayoutServiceService_idCaseHistoryRoute = Route$a.update({
  id: "/service/$service_id/case-history",
  path: "/service/$service_id/case-history",
  getParentRoute: () => AppLitigationsServiceLayoutRoute
});
const AppLegalOpinionServiceLayoutServiceService_idNotesRoute = Route$9.update({
  id: "/service/$service_id/notes",
  path: "/service/$service_id/notes",
  getParentRoute: () => AppLegalOpinionServiceLayoutRoute
});
const AppLegalOpinionServiceLayoutServiceService_idLogsRoute = Route$8.update({
  id: "/service/$service_id/logs",
  path: "/service/$service_id/logs",
  getParentRoute: () => AppLegalOpinionServiceLayoutRoute
});
const AppLegalOpinionServiceLayoutServiceService_idFilesRoute = Route$7.update({
  id: "/service/$service_id/files",
  path: "/service/$service_id/files",
  getParentRoute: () => AppLegalOpinionServiceLayoutRoute
});
const AppLegalOpinionServiceLayoutServiceService_idChatRoute = Route$6.update({
  id: "/service/$service_id/chat",
  path: "/service/$service_id/chat",
  getParentRoute: () => AppLegalOpinionServiceLayoutRoute
});
const AppLegalOpinionServiceLayoutServiceService_idCaseHistoryRoute = Route$5.update({
  id: "/service/$service_id/case-history",
  path: "/service/$service_id/case-history",
  getParentRoute: () => AppLegalOpinionServiceLayoutRoute
});
const AppLitigationsServiceLayoutServiceService_idManageIndexRoute = Route$4.update({
  id: "/service/$service_id/manage/",
  path: "/service/$service_id/manage/",
  getParentRoute: () => AppLitigationsServiceLayoutRoute
});
const AppLegalOpinionServiceLayoutServiceService_idManageIndexRoute = Route$3.update({
  id: "/service/$service_id/manage/",
  path: "/service/$service_id/manage/",
  getParentRoute: () => AppLegalOpinionServiceLayoutRoute
});
const AppServiceLayoutServiceService_idUserManageIndexRoute = Route$2.update({
  id: "/_service-layout/service/$service_id/user/manage/",
  path: "/service/$service_id/user/manage/",
  getParentRoute: () => AppRoute
});
const AppLitigationsServiceLayoutServiceService_idUserManageIndexRoute = Route$1.update(
  {
    id: "/service/$service_id/user/manage/",
    path: "/service/$service_id/user/manage/",
    getParentRoute: () => AppLitigationsServiceLayoutRoute
  }
);
const AppLegalOpinionServiceLayoutServiceService_idUserManageIndexRoute = Route.update(
  {
    id: "/service/$service_id/user/manage/",
    path: "/service/$service_id/user/manage/",
    getParentRoute: () => AppLegalOpinionServiceLayoutRoute
  }
);
const AppLegalOpinionServiceLayoutRouteChildren = {
  AppLegalOpinionServiceLayoutServiceService_idCaseHistoryRoute,
  AppLegalOpinionServiceLayoutServiceService_idChatRoute,
  AppLegalOpinionServiceLayoutServiceService_idFilesRoute,
  AppLegalOpinionServiceLayoutServiceService_idLogsRoute,
  AppLegalOpinionServiceLayoutServiceService_idNotesRoute,
  AppLegalOpinionServiceLayoutServiceService_idManageIndexRoute,
  AppLegalOpinionServiceLayoutServiceService_idUserManageIndexRoute
};
const AppLegalOpinionServiceLayoutRouteWithChildren = AppLegalOpinionServiceLayoutRoute._addFileChildren(
  AppLegalOpinionServiceLayoutRouteChildren
);
const AppLegalOpinionRouteChildren = {
  AppLegalOpinionServiceLayoutRoute: AppLegalOpinionServiceLayoutRouteWithChildren,
  AppLegalOpinionIndexRoute
};
const AppLegalOpinionRouteWithChildren = AppLegalOpinionRoute._addFileChildren(
  AppLegalOpinionRouteChildren
);
const AppLitigationsServiceLayoutRouteChildren = {
  AppLitigationsServiceLayoutServiceService_idCaseHistoryRoute,
  AppLitigationsServiceLayoutServiceService_idChatRoute,
  AppLitigationsServiceLayoutServiceService_idFilesRoute,
  AppLitigationsServiceLayoutServiceService_idLogsRoute,
  AppLitigationsServiceLayoutServiceService_idNotesRoute,
  AppLitigationsServiceLayoutServiceService_idManageIndexRoute,
  AppLitigationsServiceLayoutServiceService_idUserManageIndexRoute
};
const AppLitigationsServiceLayoutRouteWithChildren = AppLitigationsServiceLayoutRoute._addFileChildren(
  AppLitigationsServiceLayoutRouteChildren
);
const AppLitigationsRouteChildren = {
  AppLitigationsServiceLayoutRoute: AppLitigationsServiceLayoutRouteWithChildren,
  AppLitigationsIndexRoute,
  AppLitigationsAddSubStageIndexRoute
};
const AppLitigationsRouteWithChildren = AppLitigationsRoute._addFileChildren(
  AppLitigationsRouteChildren
);
const AppRouteChildren = {
  AppLegalOpinionRoute: AppLegalOpinionRouteWithChildren,
  AppLitigationsRoute: AppLitigationsRouteWithChildren,
  AppAdvocatesIndexRoute,
  AppCreateAdvocateIndexRoute,
  AppCreateLegalOpinionIndexRoute,
  AppCreateLitigationIndexRoute,
  AppCreateManagerIndexRoute,
  AppCreateOrganizationIndexRoute,
  AppDashboardIndexRoute,
  AppEngineerPropertyValuationIndexRoute,
  AppLocationsIndexRoute,
  AppManagersIndexRoute,
  AppOrganizationsIndexRoute,
  AppPaymentsIndexRoute,
  AppRevenueStatisticsIndexRoute,
  AppReviewsIndexRoute,
  AppEditAdvocateAdvocate_idIndexRoute,
  AppEditManagerManager_idIndexRoute,
  AppEditOrganizationOrganization_idIndexRoute,
  AppViewAdvocateAdvocate_idIndexRoute,
  AppViewManagerManager_idIndexRoute,
  AppServiceLayoutServiceService_idCaseHistoryRoute,
  AppServiceLayoutServiceService_idChatRoute,
  AppServiceLayoutServiceService_idFilesRoute,
  AppServiceLayoutServiceService_idLogsRoute,
  AppServiceLayoutServiceService_idNotesRoute,
  AppServiceLayoutServiceService_idManageIndexRoute,
  AppServiceLayoutServiceService_idUserManageIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  LoginRoute,
  ReviewService_idIndexRoute
};
const routeTree = Route$N._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient2 = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient: queryClient2 },
    defaultPreload: "intent"
  });
  setupRouterSsrQueryIntegration({
    router: router2,
    queryClient: queryClient2
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));

export { Button as B, buttonVariants as b, cn as c, router as r };
//# sourceMappingURL=router-e7zdrxGz.mjs.map
