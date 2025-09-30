import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AdvocateIcon, M as ManagerIcon } from "./ManagerIcon-_z3rIyGq.js";
import { E as EngineerValuationIcon } from "./engineer-property-valuation-icon-DvwJZRaE.js";
import { L as Litigation } from "./litigation-icon-CGSJaxzX.js";
import { L as LocationIcon } from "./location-icon-BjUVjaW-.js";
import { u as userStore } from "./userDetails-Dbr9T6uw.js";
import { useStore } from "@tanstack/react-store";
import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { c as cn, B as Button } from "./router-e7zdrxGz.js";
import "./input-CcfBn-WR.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle, d as SheetDescription, e as SheetTrigger, f as SheetClose } from "./sheet-vrO17VYZ.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-BKF0DBvK.js";
import { useLocation, Link, useNavigate, Outlet } from "@tanstack/react-router";
import { C as CaseStagesProvider } from "./Provider-DRuE0d-A.js";
import { L as LogoPath } from "./nyaya-tech-logo-D_OdneNH.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import Cookies from "js-cookie";
import { ChevronDown, LogOutIcon, Bell } from "lucide-react";
import { D as DefaultUserIcon } from "./default-user-EV710LEP.js";
import { A as Avatar, a as AvatarImage } from "./avatar-xL-W5RbG.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { g as getAllNotificationsCountsAPI, m as markAsReadAllAPI, a as markAsReadAPI, b as getAllNotificationsAPI } from "./notification-kzFgGftV.js";
import { f as formatDateWithTime } from "./manage-CWSyPq63.js";
import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { N as NotesCloseIcon } from "./notes-close-icon-FqM48RJz.js";
import { S as Skeleton } from "./skeleton-BAyQx-Zm.js";
import { T as Todo } from "./Todo-9fPLLx5K.js";
import { r as routesWithCustomBg } from "./noDataConstants-CAKRQRCT.js";
import "@tanstack/react-router-ssr-query";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "react-error-boundary";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "./manage-tW0NLyej.js";
import "@radix-ui/react-avatar";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
import "./statusConstants-t7T05Rlh.js";
import "./todo-icon-DEoezyPT.js";
function DashboardIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9.59999 11.28H4.80023C4.35143 11.28 3.92928 11.1048 3.61176 10.7863C3.3 10.4772 3.12 10.0442 3.12 9.59999V4.8C3.12 4.3512 3.29472 3.92904 3.61176 3.61128C3.92784 3.29448 4.34999 3.12 4.80023 3.12H9.59999C10.05 3.12 10.4722 3.29448 10.7885 3.61128C11.1055 3.92928 11.28 4.3512 11.28 4.8V9.59999C11.28 10.044 11.1002 10.477 10.7868 10.788C10.4705 11.1048 10.0486 11.28 9.59999 11.28ZM4.80023 4.08C4.60679 4.08 4.42608 4.15439 4.29144 4.28951C4.15488 4.42583 4.08 4.60728 4.08 4.8V9.59999C4.08 9.78983 4.15631 9.9744 4.28951 10.1064C4.42775 10.2449 4.60847 10.32 4.80023 10.32H9.59999C9.79175 10.32 9.97247 10.2449 10.109 10.1081C10.2437 9.97464 10.32 9.78983 10.32 9.59999V4.8C10.32 4.60728 10.2451 4.42583 10.1088 4.28951C9.97415 4.15439 9.79343 4.08 9.59999 4.08H4.80023Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9.59999 20.88H4.80023C4.35143 20.88 3.92928 20.7048 3.61176 20.3863C3.3 20.0772 3.12 19.6442 3.12 19.2V14.4C3.12 13.9512 3.29472 13.529 3.61176 13.2113C3.92784 12.8945 4.34999 12.72 4.80023 12.72H9.59999C10.05 12.72 10.4722 12.8945 10.7885 13.2113C11.1055 13.5293 11.28 13.9512 11.28 14.4V19.2C11.28 19.644 11.1002 20.0769 10.7868 20.388C10.4705 20.7048 10.0486 20.88 9.59999 20.88ZM4.80023 13.68C4.60679 13.68 4.42608 13.7544 4.29144 13.8895C4.15488 14.0258 4.08 14.2073 4.08 14.4V19.2C4.08 19.3898 4.15631 19.5744 4.28951 19.7064C4.42775 19.8449 4.60847 19.92 4.80023 19.92H9.59999C9.79175 19.92 9.97247 19.8448 10.109 19.708C10.2437 19.5746 10.32 19.3898 10.32 19.2V14.4C10.32 14.2073 10.2451 14.0258 10.1088 13.8895C9.97415 13.7544 9.79343 13.68 9.59999 13.68H4.80023Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M19.2 11.28H14.4002C13.9514 11.28 13.5293 11.1048 13.2117 10.7863C12.9 10.4772 12.72 10.0442 12.72 9.59999V4.8C12.72 4.3512 12.8947 3.92904 13.2117 3.61128C13.5278 3.29448 13.95 3.12 14.4002 3.12H19.2C19.65 3.12 20.0721 3.29448 20.3885 3.61128C20.7055 3.92928 20.88 4.3512 20.88 4.8V9.59999C20.88 10.044 20.7002 10.477 20.3868 10.788C20.0705 11.1048 19.6485 11.28 19.2 11.28ZM14.4002 4.08C14.2068 4.08 14.0261 4.15439 13.8914 4.28951C13.7549 4.42583 13.68 4.60728 13.68 4.8V9.59999C13.68 9.78983 13.7563 9.9744 13.8895 10.1064C14.0277 10.2449 14.2085 10.32 14.4002 10.32H19.2C19.3917 10.32 19.5725 10.2449 19.709 10.1081C19.8437 9.97464 19.92 9.78983 19.92 9.59999V4.8C19.92 4.60728 19.8451 4.42583 19.7088 4.28951C19.5741 4.15439 19.3934 4.08 19.2 4.08H14.4002Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M19.2 20.88H14.4002C13.9514 20.88 13.5293 20.7048 13.2117 20.3863C12.9 20.0772 12.72 19.6442 12.72 19.2V14.4C12.72 13.9512 12.8947 13.529 13.2117 13.2113C13.5278 12.8945 13.95 12.72 14.4002 12.72H19.2C19.65 12.72 20.0721 12.8945 20.3885 13.2113C20.7055 13.5293 20.88 13.9512 20.88 14.4V19.2C20.88 19.644 20.7002 20.0769 20.3868 20.388C20.0705 20.7048 19.6485 20.88 19.2 20.88ZM14.4002 13.68C14.2068 13.68 14.0261 13.7544 13.8914 13.8895C13.7549 14.0258 13.68 14.2073 13.68 14.4V19.2C13.68 19.3898 13.7563 19.5744 13.8895 19.7064C14.0277 19.8449 14.2085 19.92 14.4002 19.92H19.2C19.3917 19.92 19.5725 19.8448 19.709 19.708C19.8437 19.5746 19.92 19.3898 19.92 19.2V14.4C19.92 14.2073 19.8451 14.0258 19.7088 13.8895C19.5741 13.7544 19.3934 13.68 19.2 13.68H14.4002Z"
          }
        )
      ]
    }
  );
}
function paymentIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "12",
      viewBox: "0 0 16 12",
      fill: className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M14.625 0H1.125C0.826631 0 0.540483 0.118526 0.329505 0.329505C0.118526 0.540483 0 0.826631 0 1.125V10.125C0 10.4234 0.118526 10.7095 0.329505 10.9205C0.540483 11.1315 0.826631 11.25 1.125 11.25H14.625C14.9234 11.25 15.2095 11.1315 15.4205 10.9205C15.6315 10.7095 15.75 10.4234 15.75 10.125V1.125C15.75 0.826631 15.6315 0.540483 15.4205 0.329505C15.2095 0.118526 14.9234 0 14.625 0ZM14.625 1.125V2.8125H1.125V1.125H14.625ZM14.625 10.125H1.125V3.9375H14.625V10.125ZM13.5 8.4375C13.5 8.58668 13.4407 8.72976 13.3352 8.83525C13.2298 8.94074 13.0867 9 12.9375 9H10.6875C10.5383 9 10.3952 8.94074 10.2898 8.83525C10.1843 8.72976 10.125 8.58668 10.125 8.4375C10.125 8.28832 10.1843 8.14524 10.2898 8.03975C10.3952 7.93426 10.5383 7.875 10.6875 7.875H12.9375C13.0867 7.875 13.2298 7.93426 13.3352 8.03975C13.4407 8.14524 13.5 8.28832 13.5 8.4375ZM9 8.4375C9 8.58668 8.94074 8.72976 8.83525 8.83525C8.72976 8.94074 8.58668 9 8.4375 9H7.3125C7.16332 9 7.02024 8.94074 6.91475 8.83525C6.80926 8.72976 6.75 8.58668 6.75 8.4375C6.75 8.28832 6.80926 8.14524 6.91475 8.03975C7.02024 7.93426 7.16332 7.875 7.3125 7.875H8.4375C8.58668 7.875 8.72976 7.93426 8.83525 8.03975C8.94074 8.14524 9 8.28832 9 8.4375Z",
          fill: "currentColor"
        }
      )
    }
  );
}
const RevenueStatisticsIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "12",
      viewBox: "0 0 20 12",
      fill: "none",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M9.87467 2.56944C9.27034 2.56944 8.67958 2.74865 8.1771 3.0844C7.67461 3.42015 7.28298 3.89736 7.05171 4.45569C6.82044 5.01402 6.75993 5.62839 6.87783 6.22111C6.99573 6.81383 7.28674 7.35828 7.71407 7.7856C8.1414 8.21293 8.68584 8.50394 9.27856 8.62184C9.87128 8.73974 10.4857 8.67923 11.044 8.44797C11.6023 8.2167 12.0795 7.82506 12.4153 7.32258C12.751 6.82009 12.9302 6.22933 12.9302 5.625C12.9302 4.81462 12.6083 4.03742 12.0353 3.4644C11.4622 2.89137 10.6851 2.56944 9.87467 2.56944ZM9.87467 7.45833C9.51207 7.45833 9.15762 7.35081 8.85613 7.14936C8.55464 6.94791 8.31965 6.66158 8.18089 6.32659C8.04213 5.99159 8.00583 5.62297 8.07657 5.26733C8.14731 4.9117 8.32191 4.58503 8.57831 4.32864C8.83471 4.07224 9.16138 3.89763 9.51701 3.82689C9.87264 3.75615 10.2413 3.79246 10.5763 3.93122C10.9113 4.06998 11.1976 4.30496 11.399 4.60645C11.6005 4.90794 11.708 5.2624 11.708 5.625C11.708 6.11123 11.5149 6.57755 11.171 6.92136C10.8272 7.26518 10.3609 7.45833 9.87467 7.45833ZM18.4302 0.125H1.31912C1.15704 0.125 1.0016 0.189385 0.886998 0.30399C0.772393 0.418596 0.708008 0.574034 0.708008 0.736111V10.5139C0.708008 10.676 0.772393 10.8314 0.886998 10.946C1.0016 11.0606 1.15704 11.125 1.31912 11.125H18.4302C18.5923 11.125 18.7477 11.0606 18.8623 10.946C18.977 10.8314 19.0413 10.676 19.0413 10.5139V0.736111C19.0413 0.574034 18.977 0.418596 18.8623 0.30399C18.7477 0.189385 18.5923 0.125 18.4302 0.125ZM14.8896 9.90278H4.85974C4.65457 9.20886 4.27904 8.57731 3.76737 8.06564C3.2557 7.55397 2.62414 7.17844 1.93023 6.97326V4.27674C2.62414 4.07156 3.2557 3.69603 3.76737 3.18436C4.27904 2.67269 4.65457 2.04114 4.85974 1.34722H14.8896C15.0948 2.04114 15.4703 2.67269 15.982 3.18436C16.4936 3.69603 17.1252 4.07156 17.8191 4.27674V6.97326C17.1252 7.17844 16.4936 7.55397 15.982 8.06564C15.4703 8.57731 15.0948 9.20886 14.8896 9.90278ZM17.8191 2.97965C17.0861 2.66447 16.5019 2.08022 16.1867 1.34722H17.8191V2.97965ZM3.56266 1.34722C3.24747 2.08022 2.66323 2.66447 1.93023 2.97965V1.34722H3.56266ZM1.93023 8.27035C2.66323 8.58553 3.24747 9.16978 3.56266 9.90278H1.93023V8.27035ZM16.1867 9.90278C16.5019 9.16978 17.0861 8.58553 17.8191 8.27035V9.90278H16.1867Z",
          fill: "currentColor"
        }
      )
    }
  );
};
function ReviewIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "28",
      height: "28",
      viewBox: "0 0 22 22",
      fill: "currentColor",
      className,
      children: /* @__PURE__ */ jsx("path", { d: "M21.5979 9.77162C21.5146 9.51539 21.3573 9.28956 21.1458 9.12258C20.9343 8.9556 20.6782 8.85494 20.4096 8.83328L15.4929 8.43661L13.5945 3.84573C13.4919 3.59557 13.3171 3.3816 13.0925 3.231C12.8679 3.08041 12.6037 3 12.3333 3C12.0629 3 11.7986 3.08041 11.574 3.231C11.3494 3.3816 11.1747 3.59557 11.072 3.84573L9.1753 8.43578L4.25609 8.83328C3.98706 8.85603 3.73074 8.95767 3.51922 9.12545C3.30771 9.29324 3.15041 9.51971 3.06704 9.7765C2.98367 10.0333 2.97793 10.309 3.05054 10.569C3.12316 10.829 3.27089 11.0619 3.47524 11.2383L7.22528 14.4742L6.08277 19.3126C6.01887 19.5754 6.03452 19.8513 6.12772 20.1053C6.22092 20.3592 6.38748 20.5798 6.60624 20.7389C6.82501 20.898 7.08612 20.9885 7.35643 20.999C7.62674 21.0094 7.89406 20.9393 8.12446 20.7976L12.3328 18.2075L16.5437 20.7976C16.7742 20.9377 17.041 21.0064 17.3104 20.9952C17.5799 20.9839 17.84 20.8932 18.0581 20.7344C18.2761 20.5757 18.4423 20.3559 18.5356 20.1029C18.629 19.8499 18.6455 19.5749 18.5829 19.3126L17.4362 14.4733L21.1863 11.2375C21.3923 11.0613 21.5414 10.828 21.6146 10.567C21.6879 10.3061 21.6821 10.0293 21.5979 9.77162ZM20.3196 10.2275L16.2612 13.7275C16.1687 13.8073 16.0998 13.9109 16.0622 14.0272C16.0246 14.1434 16.0196 14.2678 16.0479 14.3867L17.2879 19.6201C17.2911 19.6273 17.2914 19.6354 17.2888 19.6429C17.2861 19.6503 17.2808 19.6565 17.2737 19.6601C17.2587 19.6717 17.2546 19.6692 17.2421 19.6601L12.682 16.8559C12.577 16.7913 12.4561 16.7571 12.3328 16.7571C12.2096 16.7571 12.0887 16.7913 11.9837 16.8559L7.42362 19.6617C7.41112 19.6692 7.40779 19.6717 7.39195 19.6617C7.38492 19.6581 7.37953 19.652 7.37689 19.6446C7.37426 19.6371 7.37458 19.6289 7.37778 19.6217L8.6178 14.3883C8.64606 14.2695 8.64111 14.1451 8.60348 14.0289C8.56586 13.9126 8.49701 13.8089 8.40446 13.7292L4.34609 10.2291C4.33609 10.2208 4.32692 10.2133 4.33525 10.1875C4.34359 10.1616 4.35025 10.165 4.36275 10.1633L9.68948 9.73329C9.81165 9.72281 9.92857 9.67884 10.0274 9.60621C10.1262 9.53358 10.203 9.4351 10.2495 9.32162L12.3012 4.35407C12.3078 4.3399 12.3103 4.33323 12.3303 4.33323C12.3503 4.33323 12.3528 4.3399 12.3595 4.35407L14.4162 9.32162C14.4631 9.43515 14.5404 9.53351 14.6397 9.60586C14.7389 9.67821 14.8563 9.72173 14.9787 9.73162L20.3054 10.1616C20.3179 10.1616 20.3254 10.1616 20.3329 10.1858C20.3404 10.21 20.3329 10.2191 20.3196 10.2275Z" })
    }
  );
}
const LegalOpinionIcon = ({ className }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: className,
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        d: "M23.0273 12.1291L19.8606 4.2124C19.7909 4.03802 19.6614 3.89411 19.4954 3.80638C19.3293 3.71864 19.1375 3.69279 18.9541 3.73344L12.792 5.10303V2.92594C12.792 2.71598 12.7086 2.51462 12.5601 2.36615C12.4117 2.21768 12.2103 2.13428 12.0003 2.13428C11.7904 2.13428 11.589 2.21768 11.4405 2.36615C11.2921 2.51462 11.2087 2.71598 11.2087 2.92594V5.4573L4.70315 6.90308C4.57772 6.93079 4.46092 6.9886 4.36282 7.07152C4.26472 7.15445 4.18828 7.26 4.14008 7.37907V7.38501L0.973414 15.2957C0.935532 15.3901 0.916373 15.4909 0.917007 15.5926C0.917007 17.8993 3.34544 18.7593 4.87534 18.7593C6.40524 18.7593 8.83367 17.8993 8.83367 15.5926C8.83431 15.4909 8.81515 15.3901 8.77727 15.2957L5.95597 8.24693L11.2087 7.08219V19.5509H9.62534C9.41538 19.5509 9.21401 19.6344 9.06555 19.7828C8.91708 19.9313 8.83367 20.1326 8.83367 20.3426C8.83367 20.5526 8.91708 20.7539 9.06555 20.9024C9.21401 21.0509 9.41538 21.1343 9.62534 21.1343H14.3753C14.5853 21.1343 14.7867 21.0509 14.9351 20.9024C15.0836 20.7539 15.167 20.5526 15.167 20.3426C15.167 20.1326 15.0836 19.9313 14.9351 19.7828C14.7867 19.6344 14.5853 19.5509 14.3753 19.5509H12.792V6.72792L17.8389 5.60771L15.2234 12.1291C15.1855 12.2234 15.1664 12.3243 15.167 12.4259C15.167 14.7327 17.5954 15.5926 19.1253 15.5926C20.6552 15.5926 23.0837 14.7327 23.0837 12.4259C23.0843 12.3243 23.0651 12.2234 23.0273 12.1291ZM4.87534 17.1759C4.13018 17.1759 2.62305 16.8187 2.50727 15.7272L4.87534 9.80751L7.24341 15.7272C7.12763 16.8187 5.6205 17.1759 4.87534 17.1759ZM19.1253 14.0093C18.3802 14.0093 16.873 13.652 16.7573 12.5605L19.1253 6.64084L21.4934 12.5605C21.3776 13.652 19.8705 14.0093 19.1253 14.0093Z",
        fill: "currentColor"
      }
    )
  }
);
const OrganizationIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      stroke: className,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "mask",
          {
            id: "mask0_19136_28748",
            style: { maskType: "luminance" },
            maskUnits: "userSpaceOnUse",
            x: "1",
            y: "1",
            width: "22",
            height: "22",
            children: /* @__PURE__ */ jsx("path", { d: "M1 1H23V23H1V1Z", fill: "white" })
          }
        ),
        /* @__PURE__ */ jsxs("g", { mask: "url(#mask0_19136_28748)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M12 18.918C10.5761 18.918 9.42188 20.0722 9.42188 21.4961V22.3555H14.5781V21.4961C14.5781 20.0722 13.4239 18.918 12 18.918Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M13.5039 17.4141C13.5039 16.5835 12.8306 15.9102 12 15.9102C11.1694 15.9102 10.4961 16.5835 10.4961 17.4141C10.4961 18.2446 11.1694 18.918 12 18.918C12.8306 18.918 13.5039 18.2446 13.5039 17.4141Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M19.7773 18.918C18.3535 18.918 17.1992 20.0722 17.1992 21.4961V22.3555H22.3555V21.4961C22.3555 20.0722 21.2012 18.918 19.7773 18.918Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M21.2812 17.4141C21.2812 16.5835 20.6079 15.9102 19.7773 15.9102C18.9468 15.9102 18.2734 16.5835 18.2734 17.4141C18.2734 18.2446 18.9468 18.918 19.7773 18.918C20.6079 18.918 21.2812 18.2446 21.2812 17.4141Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M4.22266 18.918C2.7988 18.918 1.64453 20.0722 1.64453 21.4961V22.3555H6.80078V21.4961C6.80078 20.0722 5.64651 18.918 4.22266 18.918Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M5.72656 17.4141C5.72656 16.5835 5.05324 15.9102 4.22266 15.9102C3.39207 15.9102 2.71875 16.5835 2.71875 17.4141C2.71875 18.2446 3.39207 18.918 4.22266 18.918C5.05324 18.918 5.72656 18.2446 5.72656 17.4141Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M9.42188 1.64453H14.5781V10.668H9.42188V1.64453Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M9.42188 4.22266L6.84375 5.51172V10.668H9.42188V4.22266Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M14.5781 4.22266L17.1563 5.51172V10.668H14.5781V4.22266Z",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M12 15.9102V10.668",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M12 10.668V9.37891",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M4.22266 15.9102V14.6211C4.22266 13.9092 4.79981 13.332 5.51172 13.332H18.4883C19.2002 13.332 19.7773 13.9092 19.7773 14.6211V15.9102",
              stroke: "currentColor",
              strokeWidth: "1.28906",
              strokeMiterlimit: "10",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M11.3555 4.22266C11.3555 3.8667 11.644 3.57812 12 3.57812C12.356 3.57812 12.6445 3.8667 12.6445 4.22266C12.6445 4.57861 12.356 4.86719 12 4.86719C11.644 4.86719 11.3555 4.57861 11.3555 4.22266Z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M11.3555 6.80078C11.3555 6.44483 11.644 6.15625 12 6.15625C12.356 6.15625 12.6445 6.44483 12.6445 6.80078C12.6445 7.15673 12.356 7.44531 12 7.44531C11.644 7.44531 11.3555 7.15673 11.3555 6.80078Z",
              fill: "currentColor"
            }
          )
        ] })
      ]
    }
  );
};
const items = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
      activePaths: ["/dashboard"],
      userTypes: ["MANAGER", "ADMIN", "ADVOCATE", "CUSTOMER"]
    },
    {
      title: "Legal Opinion",
      url: "/legal-opinion",
      activePaths: ["/legal-opinion", "/create-legal-opinion"],
      icon: LegalOpinionIcon,
      userTypes: ["MANAGER", "ADVOCATE", "CUSTOMER", "ADMIN"]
    },
    {
      title: "Engineer Property Valuation",
      fullTitle: "Engineer Property Valuation",
      url: "/engineer-property-valuation",
      icon: EngineerValuationIcon,
      activePaths: ["/engineer-property-valuation"],
      userTypes: ["MANAGER", "ADVOCATE", "CUSTOMER", "ADMIN"]
    },
    {
      title: "Litigation",
      url: "/litigations",
      icon: Litigation,
      activePaths: ["/litigation", "/create-litigation"],
      userTypes: ["MANAGER", "ADVOCATE", "CUSTOMER", "ADMIN"]
    },
    {
      title: "Organizations",
      url: "/organizations",
      icon: OrganizationIcon,
      activePaths: [
        "/organizations",
        "/create-organization",
        "/edit-organization"
      ],
      userTypes: ["MANAGER", "ADMIN"]
    },
    {
      title: "Advocates",
      url: "/advocates",
      icon: AdvocateIcon,
      activePaths: [
        "/advocates",
        "/view-advocate",
        "/edit-advocate",
        "/create-advocate"
      ],
      userTypes: ["MANAGER", "ADMIN"]
    },
    {
      title: "Managers",
      url: "/managers",
      icon: ManagerIcon,
      activePaths: [
        "/managers",
        "/create-manager",
        "/edit-manager",
        "/view-manager"
      ],
      userTypes: ["ADMIN"]
    },
    {
      title: "Locations",
      url: "/locations",
      icon: LocationIcon,
      activePaths: ["/locations"],
      userTypes: ["ADMIN"]
    },
    {
      title: "Reviews",
      url: "/reviews",
      icon: ReviewIcon,
      activePaths: ["/reviews"],
      userTypes: ["MANAGER", "ADMIN"]
    },
    {
      title: "Payments",
      url: "/payments",
      icon: paymentIcon,
      activePaths: ["/payments"],
      userTypes: ["MANAGER", "ADMIN"]
    },
    {
      title: "Revenue and Statistics",
      url: "/revenue-statistics",
      icon: RevenueStatisticsIcon,
      activePaths: ["/revenue-statistics"],
      userTypes: ["ADMIN"]
    }
  ]
};
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-54 flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function NavMain({ items: items2 }) {
  const location = useLocation();
  const { state } = useSidebar();
  const isActive = (activeLinks) => {
    return activeLinks.some((link) => location.pathname.startsWith(link));
  };
  const isCollapsed = state === "collapsed";
  const linkBaseClass = `w-full flex items-center gap-2 text-black [&>svg]:size-5 !no-underline !hover:no-underline !focus:no-underline !active:no-underline py-2 px-3 ${isCollapsed ? "justify-center !gap-0" : "justify-start"}`;
  return /* @__PURE__ */ jsx(SidebarGroup, { className: "bg-[#F0F4FA] h-full", children: /* @__PURE__ */ jsx(SidebarMenu, { className: "space-y-1 2xl:space-y-2", children: items2.map((item) => {
    const activeLinks = item.activePaths || [item.url];
    const activeClass = isActive(activeLinks) ? "bg-black text-white font-normal !rounded-none !py-0.5 xl:!py-2" : "bg-transparent hover:bg-gray-200 !rounded-none";
    const Icon = item.icon;
    return /* @__PURE__ */ jsx(SidebarMenuItem, { className: "w-full", children: /* @__PURE__ */ jsx(
      SidebarMenuButton,
      {
        asChild: true,
        className: "rounded-none text-normal h-auto min-h-fit overflow-visible p-0 w-full",
        children: /* @__PURE__ */ jsx(Tooltip, { children: /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Link,
          {
            to: item.url,
            activeOptions: { exact: true },
            className: `${linkBaseClass} ${activeClass} rounded-md`,
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex items-center w-full ${isCollapsed ? "justify-center" : "gap-2"}`,
                title: `${isCollapsed ? item.title : ""}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
                  !isCollapsed && /* @__PURE__ */ jsx("span", { className: "text-xs lg:text-sm leading-4 2xl:leading-5 min-w-0 flex-1 whitespace-normal break-words hyphens-auto", children: item.title })
                ]
              }
            )
          }
        ) }) })
      }
    ) }, item.title);
  }) }) });
}
function AppSidebar({ ...props }) {
  const [userType, setUserType] = useState(null);
  const userDetails = useStore(userStore, (state2) => state2["user"]);
  const { state } = useSidebar();
  const [is2xlOrBelow, setIs2xlOrBelow] = useState(false);
  useEffect(() => {
    setUserType(userDetails?.user_type ?? null);
  }, []);
  const filteredNavMain = items.navMain.filter(
    (item) => item.userTypes?.includes(userType)
  );
  const sidebarWidth = state === "collapsed" ? "60px" : is2xlOrBelow ? "190px" : "200px";
  useEffect(() => {
    setIs2xlOrBelow(window.innerWidth <= 1536);
  }, []);
  return /* @__PURE__ */ jsx(
    Sidebar,
    {
      className: "h-full !border-r !border-gray-300 bg-[#F0F4FA] flex-shrink-0",
      style: {
        position: "relative",
        borderRight: "1px solid #e5e7eb",
        width: sidebarWidth,
        minWidth: sidebarWidth,
        maxWidth: sidebarWidth
      },
      collapsible: "icon",
      ...props,
      children: /* @__PURE__ */ jsx(SidebarContent, { className: "overflow-visible", children: /* @__PURE__ */ jsx(NavMain, { items: filteredNavMain }) })
    }
  );
}
const ClientOnly = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return /* @__PURE__ */ jsx(Fragment, { children });
};
const MenuOne = ({ className = "" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "48",
    height: "48",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        d: "M27.9998 16.0001C27.9998 16.2653 27.8945 16.5196 27.7069 16.7072C27.5194 16.8947 27.265 17.0001 26.9998 17.0001H13.9998C13.7346 17.0001 13.4802 16.8947 13.2927 16.7072C13.1052 16.5196 12.9998 16.2653 12.9998 16.0001C12.9998 15.7349 13.1052 15.4805 13.2927 15.293C13.4802 15.1054 13.7346 15.0001 13.9998 15.0001H26.9998C27.265 15.0001 27.5194 15.1054 27.7069 15.293C27.8945 15.4805 27.9998 15.7349 27.9998 16.0001ZM13.9998 9.00007H26.9998C27.265 9.00007 27.5194 8.89471 27.7069 8.70717C27.8945 8.51964 27.9998 8.26528 27.9998 8.00007C27.9998 7.73485 27.8945 7.4805 27.7069 7.29296C27.5194 7.10542 27.265 7.00007 26.9998 7.00007H13.9998C13.7346 7.00007 13.4802 7.10542 13.2927 7.29296C13.1052 7.4805 12.9998 7.73485 12.9998 8.00007C12.9998 8.26528 13.1052 8.51964 13.2927 8.70717C13.4802 8.89471 13.7346 9.00007 13.9998 9.00007ZM26.9998 23.0001H4.99981C4.73459 23.0001 4.48024 23.1054 4.2927 23.293C4.10517 23.4805 3.99981 23.7349 3.99981 24.0001C3.99981 24.2653 4.10517 24.5196 4.2927 24.7072C4.48024 24.8947 4.73459 25.0001 4.99981 25.0001H26.9998C27.265 25.0001 27.5194 24.8947 27.7069 24.7072C27.8945 24.5196 27.9998 24.2653 27.9998 24.0001C27.9998 23.7349 27.8945 23.4805 27.7069 23.293C27.5194 23.1054 27.265 23.0001 26.9998 23.0001ZM8.99981 18.0001C9.19771 18.0002 9.3912 17.9417 9.55579 17.8318C9.72039 17.7219 9.84868 17.5657 9.92443 17.3829C10.0002 17.2 10.02 16.9988 9.98134 16.8048C9.94269 16.6107 9.84732 16.4324 9.70731 16.2926L5.41356 12.0001L9.70731 7.70757C9.89495 7.51993 10.0004 7.26543 10.0004 7.00007C10.0004 6.7347 9.89495 6.48021 9.70731 6.29257C9.51967 6.10493 9.26517 5.99951 8.99981 5.99951C8.73445 5.99951 8.47995 6.10493 8.29231 6.29257L3.29231 11.2926C3.19933 11.3854 3.12557 11.4957 3.07525 11.6171C3.02493 11.7385 2.99902 11.8687 2.99902 12.0001C2.99902 12.1315 3.02493 12.2616 3.07525 12.383C3.12557 12.5044 3.19933 12.6147 3.29231 12.7076L8.29231 17.7076C8.38525 17.8004 8.49557 17.874 8.61696 17.9242C8.73836 17.9744 8.86845 18.0002 8.99981 18.0001Z",
        fill: "black"
      }
    )
  }
);
const MenuTwo = ({ className = "" }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "42",
      height: "42",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M4.00019 16.0001C4.00019 16.2653 4.10555 16.5196 4.29308 16.7072C4.48062 16.8947 4.73497 17.0001 5.00019 17.0001H18.0002C18.2654 17.0001 18.5198 16.8947 18.7073 16.7072C18.8948 16.5196 19.0002 16.2653 19.0002 16.0001C19.0002 15.7349 18.8948 15.4805 18.7073 15.293C18.5198 15.1054 18.2654 15.0001 18.0002 15.0001H5.00019C4.73497 15.0001 4.48062 15.1054 4.29308 15.293C4.10555 15.4805 4.00019 15.7349 4.00019 16.0001ZM18.0002 9.00007H5.00019C4.73497 9.00007 4.48062 8.89471 4.29308 8.70717C4.10555 8.51964 4.00019 8.26528 4.00019 8.00007C4.00019 7.73485 4.10555 7.4805 4.29308 7.29296C4.48062 7.10542 4.73497 7.00007 5.00019 7.00007H18.0002C18.2654 7.00007 18.5198 7.10542 18.7073 7.29296C18.8948 7.4805 19.0002 7.73485 19.0002 8.00007C19.0002 8.26528 18.8948 8.51964 18.7073 8.70717C18.5198 8.89471 18.2654 9.00007 18.0002 9.00007ZM5.00019 23.0001H27.0002C27.2654 23.0001 27.5198 23.1054 27.7073 23.293C27.8948 23.4805 28.0002 23.7349 28.0002 24.0001C28.0002 24.2653 27.8948 24.5196 27.7073 24.7072C27.5198 24.8947 27.2654 25.0001 27.0002 25.0001H5.00019C4.73497 25.0001 4.48062 24.8947 4.29308 24.7072C4.10555 24.5196 4.00019 24.2653 4.00019 24.0001C4.00019 23.7349 4.10555 23.4805 4.29308 23.293C4.48062 23.1054 4.73497 23.0001 5.00019 23.0001ZM23.0002 18.0001C22.8023 18.0002 22.6088 17.9417 22.4442 17.8318C22.2796 17.7219 22.1513 17.5657 22.0756 17.3829C21.9998 17.2 21.98 16.9988 22.0187 16.8048C22.0573 16.6107 22.1527 16.4324 22.2927 16.2926L26.5864 12.0001L22.2927 7.70757C22.105 7.51993 21.9996 7.26543 21.9996 7.00007C21.9996 6.7347 22.105 6.48021 22.2927 6.29257C22.4803 6.10493 22.7348 5.99951 23.0002 5.99951C23.2656 5.99951 23.52 6.10493 23.7077 6.29257L28.7077 11.2926C28.8007 11.3854 28.8744 11.4957 28.9247 11.6171C28.9751 11.7385 29.001 11.8687 29.001 12.0001C29.001 12.1315 28.9751 12.2616 28.9247 12.383C28.8744 12.5044 28.8007 12.6147 28.7077 12.7076L23.7077 17.7076C23.6148 17.8004 23.5044 17.874 23.383 17.9242C23.2616 17.9744 23.1316 18.0002 23.0002 18.0001Z",
          fill: "black"
        }
      )
    }
  );
};
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
const DropDownMenu = () => {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const userDetails = useStore(userStore, (state) => state["user"]);
  const displayName = isClient ? `${userDetails?.first_name || ""} ${userDetails?.last_name || ""}`?.trim() : "";
  const getUserTypeDisplay = (userType) => {
    if (!userType) return "";
    if (userType?.toLowerCase() === "customer") {
      return "Point of Contact";
    }
    return userType?.charAt(0)?.toUpperCase() + userType?.slice(1)?.toLowerCase();
  };
  const handleLogOut = () => {
    const clearCookies = ["token", "refreshToken", "userData"];
    clearCookies.forEach((cookie) => Cookies.remove(cookie, { path: "/" }));
    localStorage.clear();
    localStorage.removeItem("userDetails");
    localStorage.removeItem("device_token");
    navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 cursor-pointer  bg-white pr-2 rounded-full", children: [
      /* @__PURE__ */ jsx(Avatar, { className: "h-9 w-9 rounded-full bg-[#F7F7F7] border border-gray-300 flex items-center justify-center", children: userDetails?.avatar ? /* @__PURE__ */ jsx(AvatarImage, { src: isClient ? userDetails?.avatar : "" }) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "capitalize text-sm truncate max-w-40",
            title: displayName,
            children: displayName
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-[11px]", children: getUserTypeDisplay(userDetails?.user_type) })
      ] }),
      /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
    ] }) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        className: "min-w-56 rounded-lg bg-white border border-gray-200",
        align: "end",
        sideOffset: 4,
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 rounded-full bg-[#e7e7e7] flex justify-center items-center", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: userDetails?.avatar, alt: "admin" }),
              /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start text-left text-sm leading-tight", children: [
              /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `font-semibold ${displayName.length > 15 ? "truncate" : ""}`,
                    children: displayName
                  }
                ) }),
                displayName.length > 15 && /* @__PURE__ */ jsx(TooltipContent, { className: "bg-white", children: displayName })
              ] }),
              /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `truncate text-xs ${userDetails?.email?.length > 15 ? "tooltip-active" : ""}`,
                    children: userDetails?.email || "--"
                  }
                ) }),
                userDetails?.email?.length > 15 && /* @__PURE__ */ jsx(TooltipContent, { className: "bg-white", children: userDetails?.email })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, { className: "my-0" }),
          /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              className: "text-red-500 hover:bg-red-500 cursor-pointer hover:text-white",
              onClick: handleLogOut,
              children: [
                /* @__PURE__ */ jsx(LogOutIcon, {}),
                " Log Out"
              ]
            }
          )
        ]
      }
    )
  ] });
};
function NoGeneralNotifications() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "241",
      height: "160",
      viewBox: "0 0 241 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_11943_27187)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M120.532 139.466C153.301 139.466 179.865 112.901 179.865 80.1328C179.865 47.3642 153.301 20.8 120.532 20.8C87.7634 20.8 61.1992 47.3642 61.1992 80.1328C61.1992 112.901 87.7634 139.466 120.532 139.466Z",
              fill: "url(#paint0_linear_11943_27187)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M111.221 119.204V120.784C111.221 126.261 115.663 130.703 121.144 130.703C126.625 130.703 131.067 126.261 131.067 120.78V119.2",
              fill: "white"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M111.221 119.204V120.784C111.221 126.261 115.663 130.703 121.144 130.703C126.625 130.703 131.067 126.261 131.067 120.78V119.2",
              stroke: "#E1E4E5",
              strokeWidth: "1.32453",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M130.004 39.9514V35.5316C130.004 30.6591 126.004 26.7063 121.063 26.7063C116.123 26.7063 112.123 30.6591 112.123 35.5316V39.9514",
              fill: "white"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M130.004 39.9514V35.5316C130.004 30.6591 126.004 26.7063 121.063 26.7063C116.123 26.7063 112.123 30.6591 112.123 35.5316V39.9514",
              stroke: "#E1E4E5",
              strokeWidth: "1.32453",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M87.1876 68.3696C87.1876 52.7378 99.8591 40.0725 115.484 40.0725H126.807C142.439 40.0725 155.104 52.744 155.104 68.3696V85.8373C155.105 89.1496 156.421 92.3259 158.764 94.668L162.767 98.6712C165.109 101.013 166.425 104.19 166.426 107.502C166.426 114.022 161.143 119.305 154.623 119.305H87.6684C81.1484 119.305 75.8652 114.022 75.8652 107.502C75.8663 104.19 77.1826 101.013 79.5247 98.6712L83.5279 94.668C85.8701 92.3259 87.1864 89.1496 87.1876 85.8373V68.3696Z",
              fill: "white",
              stroke: "#E1E4E5",
              strokeWidth: "1.32453",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M111.263 58.1628H56.1634C52.506 58.1628 49.541 61.1278 49.541 64.7852V77.7503C49.541 81.4078 52.506 84.3727 56.1634 84.3727H111.263C114.921 84.3727 117.886 81.4078 117.886 77.7503V64.7852C117.886 61.1278 114.921 58.1628 111.263 58.1628Z",
              fill: "white",
              stroke: "#E1E4E5",
              strokeWidth: "1.32453"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M109.366 66.3208H74.0148C73.1566 66.3208 72.4609 67.0165 72.4609 67.8747C72.4609 68.7328 73.1566 69.4285 74.0148 69.4285H109.366C110.224 69.4285 110.92 68.7328 110.92 67.8747C110.92 67.0165 110.224 66.3208 109.366 66.3208Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M95.7692 72.925H74.0148C73.1566 72.925 72.4609 73.6207 72.4609 74.4789C72.4609 75.3371 73.1566 76.0328 74.0148 76.0328H95.7692C96.6274 76.0328 97.3231 75.3371 97.3231 74.4789C97.3231 73.6207 96.6274 72.925 95.7692 72.925Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M60.3725 77.8748C56.7498 77.8748 53.8125 74.8962 53.8125 71.2226C53.8125 67.5487 56.7498 64.5703 60.3725 64.5703C63.9952 64.5703 66.9322 67.5487 66.9322 71.2226C66.9322 74.8962 63.9952 77.8748 60.3725 77.8748Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M62.683 70.114L59.9118 73.0705L58.248 71.2969",
              stroke: "white",
              strokeWidth: "1.1816",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M139.44 55.183C132.034 55.183 126.029 48.9561 126.029 41.2758C126.029 33.5958 132.034 27.3689 139.44 27.3689C146.846 27.3689 152.85 33.5958 152.85 41.2758C152.85 48.9561 146.846 55.183 139.44 55.183Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M107.722 96.2666H52.6224C48.9649 96.2666 46 99.2316 46 102.889V115.854C46 119.512 48.9649 122.476 52.6224 122.476H107.722C111.38 122.476 114.345 119.512 114.345 115.854V102.889C114.345 99.2316 111.38 96.2666 107.722 96.2666Z",
              fill: "white",
              stroke: "#E1E4E5",
              strokeWidth: "1.32453"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M105.825 104.425H70.4738C69.6156 104.425 68.9199 105.12 68.9199 105.978C68.9199 106.837 69.6156 107.532 70.4738 107.532H105.825C106.683 107.532 107.379 106.837 107.379 105.978C107.379 105.12 106.683 104.425 105.825 104.425Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M92.2282 111.029H70.4738C69.6156 111.029 68.9199 111.724 68.9199 112.582C68.9199 113.441 69.6156 114.136 70.4738 114.136H92.2282C93.0864 114.136 93.7821 113.441 93.7821 112.582C93.7821 111.724 93.0864 111.029 92.2282 111.029Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M56.8312 115.978C53.2086 115.978 50.2715 113 50.2715 109.326C50.2715 105.652 53.2086 102.674 56.8312 102.674C60.4539 102.674 63.3912 105.652 63.3912 109.326C63.3912 113 60.4539 115.978 56.8312 115.978Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M59.142 108.218L56.3708 111.174L54.707 109.4",
              stroke: "white",
              strokeWidth: "1.1816",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M194.045 70.0835H138.945C135.287 70.0835 132.322 73.0484 132.322 76.7059V89.671C132.322 93.3284 135.287 96.2934 138.945 96.2934H194.045C197.702 96.2934 200.667 93.3284 200.667 89.671V76.7059C200.667 73.0484 197.702 70.0835 194.045 70.0835Z",
              fill: "white",
              stroke: "#E1E4E5",
              strokeWidth: "1.32453"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M192.147 78.2415H156.796C155.938 78.2415 155.242 78.9371 155.242 79.7953C155.242 80.6535 155.938 81.3492 156.796 81.3492H192.147C193.005 81.3492 193.701 80.6535 193.701 79.7953C193.701 78.9371 193.005 78.2415 192.147 78.2415Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M178.55 84.8452H156.796C155.938 84.8452 155.242 85.5409 155.242 86.3991C155.242 87.2573 155.938 87.9529 156.796 87.9529H178.55C179.409 87.9529 180.104 87.2573 180.104 86.3991C180.104 85.5409 179.409 84.8452 178.55 84.8452Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M143.154 89.7953C139.531 89.7953 136.594 86.8169 136.594 83.143C136.594 79.4694 139.531 76.4907 143.154 76.4907C146.776 76.4907 149.713 79.4694 149.713 83.143C149.713 86.8169 146.776 89.7953 143.154 89.7953Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M145.462 82.0344L142.691 84.991L141.027 83.2174",
              stroke: "white",
              strokeWidth: "1.1816",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M141.475 35.8862H139.226L136.424 37.6604V39.7825L139.016 38.1577H139.082V47.2046H141.475V35.8862Z",
              fill: "white"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint0_linear_11943_27187",
              x1: "123.062",
              y1: "205.997",
              x2: "119.403",
              y2: "-108.288",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("clipPath", { id: "clip0_11943_27187", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "240",
              height: "160",
              fill: "white",
              transform: "translate(0.400391)"
            }
          ) })
        ] })
      ]
    }
  );
}
const GeneralNotifications = () => {
  const observer = useRef(null);
  const navigate = useNavigate();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { isUser } = useUserDetails();
  const { data: notificationCounts, refetch } = useQuery({
    queryKey: ["notificationCounts"],
    queryFn: async () => {
      const response = await getAllNotificationsCountsAPI();
      return response?.data?.data?.count || 0;
    },
    enabled: true,
    refetchOnWindowFocus: false
  });
  const fetchNotifications = async ({ pageParam = 1 }) => {
    const queryParams = { page: pageParam, page_size: 10 };
    const response = await getAllNotificationsAPI(queryParams);
    return {
      data: response?.data?.data?.records || [],
      nextCursor: response?.data?.data?.pagination_info?.next_page ? response?.data?.data?.pagination_info?.current_page + 1 : null,
      prevCursor: response?.data?.data?.pagination_info?.current_page !== 1 ? response?.data?.data?.pagination_info?.current_page - 1 : null,
      totalRecords: response?.data?.data?.pagination_info?.total_records
    };
  };
  const {
    data: notificationsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["getAllNotifications"],
    queryFn: fetchNotifications,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    refetchOnWindowFocus: false,
    enabled: isNotificationOpen
  });
  const lastNotificationRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  const allNotifications = notificationsData?.pages.map((page) => page.data).flat() || [];
  const { mutate: notificationReadAll, isPending: isReadAllNotifiPending } = useMutation({
    mutationFn: async () => await markAsReadAllAPI(),
    onSuccess: (response) => {
      toast.success(response?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
      setNotificationOpen(false);
      refetch();
    }
  });
  const { mutate: markAsRead } = useMutation({
    mutationFn: async (markID) => {
      const response = await markAsReadAPI(markID);
      return response?.data;
    },
    onSuccess: (data, markID) => {
      if (data) {
        setNotificationOpen(false);
        refetch();
      }
    }
  });
  const handlePopoverToggle = () => {
    setNotificationOpen((prev) => !prev);
  };
  const handleNotificationClick = (notification) => {
    if (!notification.is_marked) {
      markAsRead(notification.id);
    }
    const {
      case_id,
      message,
      case_stage,
      case_sub_stage,
      case: Case
    } = notification;
    const isUserPath = isUser() ? "/user/manage" : "/manage";
    let path = "";
    let basePath = "";
    if (Case.service_type === "Litigation") {
      basePath = `/litigations/service/${case_id}`;
    } else if (Case.service_type === "Legal opinion") {
      basePath = `/legal-opinion/service/${case_id}`;
    }
    if (message?.includes("NOTE")) {
      path = `${basePath}/notes`;
    } else if (case_stage === "chat" && case_sub_stage === "case-chat") {
      path = `${basePath}/chat`;
    } else if (message?.includes("SUMMARY") || message?.includes("next hearing date")) {
      path = `${basePath}/case-history`;
    } else {
      const encodedStage = encodeURIComponent(case_stage);
      const encodedSubStage = encodeURIComponent(case_sub_stage);
      path = `${basePath}${isUserPath}?stage=${encodedStage}&sub_stage=${encodedSubStage}`;
    }
    setNotificationOpen(false);
    navigate({ to: path });
  };
  return /* @__PURE__ */ jsxs(Sheet, { open: isNotificationOpen, onOpenChange: setNotificationOpen, children: [
    /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        className: "relative cursor-pointer h-7  w-7 rounded-full py-1 pl-1 px-0 bg-white hover:bg-white flex items-center justify-center border border-gray-300 [&_svg]:size-4",
        onClick: handlePopoverToggle,
        children: [
          /* @__PURE__ */ jsx(Bell, {}),
          notificationCounts > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-1 text-xs bg-red-500 text-white rounded-full text-[10px] h-fit w-fit px-1.5 flex items-center justify-center", children: notificationCounts < 999 ? notificationCounts : "999+" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(SheetContent, { className: "w-2/6 max-w-md  bottom-0 bg-white p-0 font-primary shadow-md rounded-md space-y-1 border border-gray-200", children: [
      /* @__PURE__ */ jsxs(SheetHeader, { className: "flex flex-row justify-between px-2 !pt-3  !pb-0 items-center space-y-0", children: [
        /* @__PURE__ */ jsx(SheetTitle, { className: "!text-md !3xl:text-base font-light leading-none text-[#141414] ", children: "General Notifications" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1 items-center", children: [
          allNotifications?.length > 0 && notificationCounts > 0 && /* @__PURE__ */ jsx(
            Button,
            {
              className: "text-blue-500 bg-transparent hover:bg-transparent h-fit px-2 py-0 text-xs 3xl:text-sm font-medium hover:underline",
              onClick: () => {
                notificationReadAll();
              },
              disabled: isReadAllNotifiPending,
              children: "Mark all as read"
            }
          ),
          /* @__PURE__ */ jsx(SheetClose, { children: /* @__PURE__ */ jsx(NotesCloseIcon, { className: "w-5 h-5 cursor-pointer" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-[calc(100vh-80px)]", children: isLoading && !isFetchingNextPage ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxs("div", { className: "h-20 mb-1 px-3 py-2 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3  w-32 bg-gray-200 " }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20 bg-gray-200" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-2 px-2 border border-gray-200 space-y-4", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3  w-40 bg-gray-200 " }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3  w-52 bg-gray-200 " })
        ] })
      ] }, index)) }) : allNotifications?.length ? /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
        /* @__PURE__ */ jsx("ul", { className: "h-full overflow-auto  ", children: allNotifications.map(
          (notification, index) => {
            const isLastNotification = index === allNotifications.length - 1;
            return /* @__PURE__ */ jsx(
              "li",
              {
                ref: isLastNotification ? lastNotificationRef : null,
                className: `py-2 border-b border-b-gray-300  px-2  last:border-none hover:bg-slate-200 transition-all duration-300 ease-in-out space-y-1 cursor-pointer ${notification.is_marked ? "!font-normal bg-white " : "bg-blue-100  "}  `,
                onClick: () => handleNotificationClick(notification),
                children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  !notification?.is_marked && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 mt-2 bg-sky-500 rounded-full" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 grow", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-sm px-1  border border-gray-300 bg-gray-100", children: notification?.case?.cnr_number || notification?.case?.cmp_number || notification?.case?.ref_id || notification?.case?.temp_id || "--" }),
                      /* @__PURE__ */ jsx("div", { className: "text-xs font-light 3xl:text-sm text-gray-500", children: formatDateWithTime(notification.created_at) })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `text-sm 3xl:text-base text-gray-500  leading-snug  `,
                        children: notification.message
                      }
                    )
                  ] })
                ] })
              },
              notification.id
            );
          }
        ) }),
        isFetchingNextPage && /* @__PURE__ */ jsx("div", { className: "text-center text-xs text-gray-500 mt-2", children: "Loading more notifications..." })
      ] }) : isLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-2", children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxs("div", { className: "h-20 mb-2 px-3 py-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3  w-32 bg-gray-200 " }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20 bg-gray-200" })
        ] }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 my-4 rounded-none  w-full bg-gray-200 " })
      ] })) }) : /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx(NoGeneralNotifications, {}),
        /* @__PURE__ */ jsx("div", { className: "text-lg", children: "No Notifications" }),
        /* @__PURE__ */ jsx("div", { className: "text-center", children: "You're all caught up! Check back later for any new updates." })
      ] }) })
    ] })
  ] });
};
function NavTop(className) {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAdmin } = useUserDetails();
  const handleToggleSidebar = () => {
    toggleSidebar?.();
    setIsSidebarOpen((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex bg-[#F0F4FA] justify-between !h-14 items-center !px-2 border-b border-gray-300  w-full ${className}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              onClick: handleToggleSidebar,
              className: "rounded-md p-0 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent shadow-none cursor-pointer",
              children: isSidebarOpen ? /* @__PURE__ */ jsx(MenuTwo, { className: "w-12 !h-6" }) : /* @__PURE__ */ jsx(MenuOne, { className: "w-12 !h-6" })
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: LogoPath,
              alt: "Logo",
              className: "w-36 2xl:w-40 cursor-pointer ",
              onClick: () => navigate({ to: "/dashboard" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs(ClientOnly, { children: [
          /* @__PURE__ */ jsxs(Fragment, { children: [
            !isAdmin() && /* @__PURE__ */ jsx(Todo, {}),
            /* @__PURE__ */ jsx(GeneralNotifications, {})
          ] }),
          /* @__PURE__ */ jsx(DropDownMenu, {})
        ] }) })
      ]
    }
  );
}
const getSidebarWidth = (sidebarState, is2xlOrBelow) => {
  return sidebarState === "collapsed" ? "60px" : is2xlOrBelow ? "190px" : "200px";
};
function MainLayoutContent() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const { state } = useSidebar();
  const [is2xlOrBelow, setIs2xlOrBelow] = useState(false);
  const isActive = (routes) => {
    return routes.some(
      (route) => location.pathname === route || location.pathname.includes(route)
    );
  };
  const routesWithoutPadding = ["/checklist/create-new"];
  const sidebarWidth = getSidebarWidth(state, is2xlOrBelow);
  useEffect(() => {
    const handleResize = () => {
      setIs2xlOrBelow(window.innerWidth <= 1536);
    };
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-screen overflow-hidden w-full font-primary", children: [
    /* @__PURE__ */ jsx(NavTop, { className: "w-full !px-0 h-16 flex-shrink-0" }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex-shrink-0 bg-[#F0F4FA]",
          style: {
            width: sidebarWidth,
            minWidth: sidebarWidth,
            maxWidth: sidebarWidth
          },
          children: /* @__PURE__ */ jsx(AppSidebar, { className: "!h-full w-full" })
        }
      ),
      /* @__PURE__ */ jsx(
        "main",
        {
          className: `flex-1 overflow-y-auto min-w-0
            ${isActive(routesWithCustomBg) ? "bg-[#f8f8f8]" : "bg-white"}
            ${routesWithoutPadding.includes(currentRoute) ? "p-0" : "p-2"}
          `,
          style: {
            width: `calc(100% - ${sidebarWidth})`
          },
          children: /* @__PURE__ */ jsx(Outlet, {})
        }
      )
    ] })
  ] });
}
function MainComponent() {
  return /* @__PURE__ */ jsx(CaseStagesProvider, { children: /* @__PURE__ */ jsx(SidebarProvider, { children: /* @__PURE__ */ jsx(MainLayoutContent, {}) }) });
}
const SplitComponent = MainComponent;
export {
  SplitComponent as component
};
