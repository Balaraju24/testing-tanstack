import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import * as React from 'react';
import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from './popover-8VPYQ3UR.mjs';
import { B as Button, c as cn } from './router-e7zdrxGz.mjs';
import { C as Calendar } from './calendar-BN2MwFmY.mjs';
import { ArrowLeft, Loader2, ChevronRight, CalendarIcon as CalendarIcon$1, Loader, Upload, Smartphone, Mail } from 'lucide-react';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from './dialog-CbaK730S.mjs';
import { T as Textarea } from './textarea-BfKn0GZN.mjs';
import { C as CalendarIcon } from './calendar-icon-LEoQxdpF.mjs';
import { T as Todo } from './Todo-9fPLLx5K.mjs';
import { c as caseViewNotesAPI } from './manage-tW0NLyej.mjs';
import { s as singleServiceAPI, c as caseNextHearingDateAPI, a as sendPaymentLink, b as casePaymentDocAPI } from './service-1g9dZr4o.mjs';
import { a as formatDate, s as sliceFilename } from './manage-CWSyPq63.mjs';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useParams, useLocation, useNavigate, Outlet } from '@tanstack/react-router';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import { toast } from 'sonner';
import { L as Litigation } from './litigation-icon-CGSJaxzX.mjs';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-DdHLlHy_.mjs';
import { i as issueIcons } from './litigation-b6202F6J.mjs';
import { O as OverflowContentTooltip } from './OverflowContentTooltip-CDqdkYzJ.mjs';
import { D as DefaultUserIcon } from './default-user-EV710LEP.mjs';
import { A as Avatar, a as AvatarImage } from './avatar-xL-W5RbG.mjs';
import { N as NotesCloseIcon } from './notes-close-icon-FqM48RJz.mjs';
import { N as NotesHeadIcon } from './notes-head-icon-BuoOTi3l.mjs';
import { S as Sheet, a as SheetTrigger, b as SheetContent, e as SheetClose, c as SheetHeader, d as SheetTitle } from './sheet-vrO17VYZ.mjs';
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from './tooltip-BKF0DBvK.mjs';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { S as Skeleton } from './skeleton-BAyQx-Zm.mjs';
import { U as UnOrderList } from './UnOrderList-d57FwHYj.mjs';
import { S as SendIcon } from './send-icon-CzKPEiSG.mjs';
import { I as Input } from './input-CcfBn-WR.mjs';
import { L as Label } from './label-Btl29BJR.mjs';
import { f as fileUploadAPI, u as uploadToS3API } from './fileUpload-BBm5-XTb.mjs';
import { useDropzone } from 'react-dropzone';

function DatePicker({ onDateSelect, caseDetails }) {
  const [date, setDate] = React.useState();
  const [tempDate, setTempDate] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);
  const [hours, setHours] = React.useState(12);
  const [minutes, setMinutes] = React.useState(0);
  const [period, setPeriod] = React.useState("AM");
  const [hoursDisplay, setHoursDisplay] = React.useState("12");
  const [minutesDisplay, setMinutesDisplay] = React.useState("00");
  const handleDateSelect = (selectedDate) => {
    setTempDate(selectedDate);
  };
  const handleConfirm = () => {
    if (tempDate) {
      const fullDateTime = new Date(tempDate);
      let adjustedHours = hours;
      if (period === "PM" && hours !== 12) {
        adjustedHours += 12;
      } else if (period === "AM" && hours === 12) {
        adjustedHours = 0;
      }
      fullDateTime.setHours(adjustedHours, minutes);
      setDate(fullDateTime);
      onDateSelect(fullDateTime);
      setIsOpen(false);
    }
  };
  const handleHourChange = (e) => {
    const value = e.target.value;
    setHoursDisplay(value);
    const numValue = Number(value);
    if (numValue >= 1 && numValue <= 12) {
      setHours(numValue);
    } else if (value === "") ;
    else {
      setHoursDisplay(hours.toString());
    }
  };
  const handleHourBlur = () => {
    const numValue = Number(hoursDisplay);
    if (numValue < 1 || numValue > 12 || hoursDisplay === "" || isNaN(numValue)) {
      setHoursDisplay(hours.toString());
    } else {
      setHours(numValue);
    }
  };
  const handleMinuteChange = (e) => {
    const value = e.target.value;
    setMinutesDisplay(value);
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 59) {
      setMinutes(numValue);
    } else if (value === "") ;
    else {
      setMinutesDisplay(minutes.toString().padStart(2, "0"));
    }
  };
  const handleMinuteBlur = () => {
    const numValue = Number(minutesDisplay);
    if (numValue < 0 || numValue > 59 || minutesDisplay === "" || isNaN(numValue)) {
      setMinutesDisplay(minutes.toString().padStart(2, "0"));
    } else {
      setMinutes(numValue);
      setMinutesDisplay(numValue.toString().padStart(2, "0"));
    }
  };
  const handleHourKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newHour = hours < 12 ? hours + 1 : 1;
      setHours(newHour);
      setHoursDisplay(newHour.toString());
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newHour = hours > 1 ? hours - 1 : 12;
      setHours(newHour);
      setHoursDisplay(newHour.toString());
    }
  };
  const handleMinuteKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newMinute = minutes < 59 ? minutes + 1 : 0;
      setMinutes(newMinute);
      setMinutesDisplay(newMinute.toString().padStart(2, "0"));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newMinute = minutes > 0 ? minutes - 1 : 59;
      setMinutes(newMinute);
      setMinutesDisplay(newMinute.toString().padStart(2, "0"));
    }
  };
  const isTimeValid = () => {
    const hourNum = Number(hoursDisplay);
    const minuteNum = Number(minutesDisplay);
    return hoursDisplay !== "" && minutesDisplay !== "" && !isNaN(hourNum) && !isNaN(minuteNum) && hourNum >= 1 && hourNum <= 12 && minuteNum >= 0 && minuteNum <= 59;
  };
  React.useEffect(() => {
    setHoursDisplay(hours.toString());
    setMinutesDisplay(minutes.toString().padStart(2, "0"));
  }, [hours, minutes]);
  return /* @__PURE__ */ jsxs(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [
    (caseDetails == null ? void 0 : caseDetails.status) === "CLOSURE" ? /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Next hearing" }) : /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        className: cn(
          "w-26 p-1 justify-start text-left font-normal border border-gray-300 cursor-pointer text-xs",
          !date && "text-muted-foreground"
        ),
        "aria-label": date ? "Change hearing date" : "Select hearing date",
        children: [
          /* @__PURE__ */ jsx(CalendarIcon$1, { className: "h-3.5 w-3 mr-0" }),
          /* @__PURE__ */ jsx("span", { children: "Next Hearing" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      PopoverContent,
      {
        side: "top",
        align: "start",
        sideOffset: 5,
        className: "w-auto p-0 bg-white border border-gray-300 max-h-[60vh] overflow-auto text-xs",
        avoidCollisions: true,
        collisionPadding: 10,
        children: [
          /* @__PURE__ */ jsx("div", { className: "p-1.5", children: /* @__PURE__ */ jsx(
            Calendar,
            {
              mode: "single",
              captionLayout: "dropdown",
              selected: tempDate,
              onSelect: handleDateSelect,
              fromYear: (/* @__PURE__ */ new Date()).getFullYear(),
              toYear: (/* @__PURE__ */ new Date()).getFullYear() + 5,
              disabled: (date2) => date2 < /* @__PURE__ */ new Date(),
              initialFocus: true,
              numberOfMonths: 1,
              className: cn("w-full text-xs p-1.5 [--cell-size:30px]"),
              classNames: {
                months: "flex gap-2 flex-col md:flex-row relative",
                month: "flex flex-col w-full gap-1.5",
                nav: "flex items-center gap-0.5 w-full absolute top-0 inset-x-0 justify-between",
                button_previous: "size-[--cell-size] aria-disabled:opacity-50 p-0 select-none",
                button_next: "size-[--cell-size] aria-disabled:opacity-50 p-0 select-none",
                month_caption: "flex items-center justify-center h-[--cell-size] w-full px-[--cell-size]",
                dropdowns: "w-full flex items-center text-[0.7rem] font-medium justify-center h-[--cell-size] gap-0.5",
                dropdown_root: "relative border border-gray-300 shadow-xs rounded-md",
                dropdown: "absolute bg-white inset-0 opacity-0 border border-gray-300",
                caption_label: "select-none font-medium text-[0.7rem] rounded-md pl-1 pr-0.5 flex items-center gap-0.5 h-6 [&>svg]:text-gray-500 [&>svg]:size-2.5",
                weekday: "text-gray-600 rounded-md flex-1 font-normal text-[0.65rem] select-none",
                week: "flex w-full mt-0.5",
                week_number: "text-[0.65rem] select-none text-gray-600",
                day: "relative w-full h-full p-0 text-center aspect-square text-[0.75rem]",
                selected: "bg-black text-white rounded-md !important",
                range_start: "rounded-l-md bg-black text-white",
                range_middle: "rounded-none bg-blue-100",
                range_end: "rounded-r-md bg-black text-white",
                today: "bg-blue-100 text-blue-800 rounded-md data-[selected=true]:rounded-none",
                outside: "text-gray-400 aria-selected:text-gray-400 font-normal",
                disabled: "text-gray-800 opacity-50"
              }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "px-2 pb-2 border-t border-t-gray-300", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[0.7rem] font-medium text-gray-700 block mb-0.5", children: "Time" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 items-center justify-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: hoursDisplay,
                    onChange: handleHourChange,
                    onBlur: handleHourBlur,
                    onKeyDown: handleHourKeyDown,
                    maxLength: 2,
                    className: "w-10 h-7 border border-gray-300 px-1 rounded text-[0.7rem] text-center focus:outline-none focus:ring-1 focus:ring-blue-500",
                    placeholder: "12"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-[0.7rem]", children: ":" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: minutesDisplay,
                    onChange: handleMinuteChange,
                    onBlur: handleMinuteBlur,
                    onKeyDown: handleMinuteKeyDown,
                    maxLength: 2,
                    className: "w-10 h-7 border border-gray-300 px-1 rounded text-[0.7rem] text-center focus:outline-none focus:ring-1 focus:ring-blue-500",
                    placeholder: "00"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex ml-0.5", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "sm",
                      variant: period === "AM" ? "default" : "outline",
                      onClick: () => setPeriod("AM"),
                      className: cn(
                        "h-7 px-1.5 text-[0.7rem] rounded-l rounded-r-none cursor-pointer",
                        period === "AM" && "bg-black text-white hover:bg-black"
                      ),
                      children: "AM"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "sm",
                      variant: period === "PM" ? "default" : "outline",
                      onClick: () => setPeriod("PM"),
                      className: cn(
                        "h-7 px-1.5 text-[0.7rem] rounded-r rounded-l-none cursor-pointer",
                        period === "PM" && "bg-black text-white hover:bg-black"
                      ),
                      children: "PM"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                className: "bg-black text-white hover:bg-black h-7 px-2.5 text-[0.7rem] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed",
                onClick: handleConfirm,
                disabled: !tempDate || !isTimeValid(),
                children: "OK"
              }
            ) })
          ] })
        ]
      }
    )
  ] });
}
const NextHearingDialog = ({
  removeConfirm,
  setRemoveConfirm,
  onCancel,
  onConfirm,
  isDeleteLoading,
  setApproveRejectReason,
  dialogType,
  appRejError,
  setAppRejError,
  isPending
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setAppRejError("");
    const value = event.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setInputValue(capitalizedValue);
    setApproveRejectReason == null ? void 0 : setApproveRejectReason(capitalizedValue);
  };
  useEffect(() => {
    if (!removeConfirm) {
      setInputValue("");
      setAppRejError("");
    }
  }, [removeConfirm]);
  return /* @__PURE__ */ jsx(Dialog, { open: removeConfirm, onOpenChange: setRemoveConfirm, children: /* @__PURE__ */ jsxs(
    DialogContent,
    {
      className: "w-1/3 p-3 bg-gray-100 rounded-none !shadow-all font-primary",
      "aria-describedby": void 0,
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-base 3xl:text-xl font-normal tracking-wide text-grey-600", children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 font-normal text-md", children: [
              " ",
              "Next hearing"
            ] }) }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                className: " border h-52 rounded-none border-gray-200 resize-none  text-sm 3xl:text-base font-normal  mt-2 focus:!outline-none outline-none ",
                value: inputValue,
                onChange: handleInputChange,
                placeholder: "Enter reason"
              }
            )
          ] }),
          appRejError && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: appRejError })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-5 ", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: onCancel,
              className: "bg-transparent rounded-none border-gray-400  text-red-600 border font-medium text-sm 3xl:text-base px-4 py-1 h-7 outline-none focus:outline-none hover:bg-transparent hover:text-red-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none cursor-pointer",
              children: "Close"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: onConfirm,
              disabled: inputValue.length === 0 || isDeleteLoading,
              className: "bg-black hover:bg-black  h-7 text-white font-medium text-sm 3xl:text-base px-4 py-1  rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none cursor-pointer",
              children: isDeleteLoading ? /* @__PURE__ */ jsx(Loader, { className: "animate-spin" }) : "Submit"
            }
          )
        ] })
      ]
    }
  ) });
};
const ManageCaseIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs("svg", { className, xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: [
    /* @__PURE__ */ jsx("path", { d: "M12.2178 13.7509C12.0589 13.8375 11.8977 13.9269 11.7345 14.0173C10.3536 14.7829 8.78848 15.6508 7.2842 15.5164L1.95697 15.0408C1.95003 15.0402 1.94306 15.0399 1.93609 15.0399H0.469655V12.4036H1.93606C1.99159 12.4036 2.04534 12.3839 2.08771 12.348C2.09187 12.3445 2.51153 11.9919 3.1504 11.6601C3.26549 11.6003 3.31031 11.4585 3.25056 11.3434C3.19074 11.2284 3.04903 11.1835 2.9339 11.2433C2.39521 11.5231 2.00443 11.8145 1.853 11.9339H0.234843C0.105156 11.9339 0 12.0391 0 12.1688V15.2748C0 15.4044 0.105125 15.5096 0.234843 15.5096H1.92559L7.24242 15.9843C7.36252 15.995 7.48233 16.0001 7.60217 16.0001C9.12692 16.0001 10.6273 15.1683 11.9623 14.4281C12.1244 14.3382 12.2846 14.2494 12.4425 14.1633C12.5564 14.1013 12.5984 13.9586 12.5364 13.8448C12.4744 13.7308 12.3318 13.6888 12.2178 13.7509Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { d: "M15.8186 11.1491C15.5689 10.8181 15.1339 10.7038 14.7584 10.861C14.7488 10.7108 14.698 10.5645 14.6089 10.4398C14.3741 10.1111 13.9277 10.0052 13.5705 10.1935L13.012 10.4878C13.0049 10.3566 12.9662 10.2276 12.8972 10.1136C12.6744 9.74526 12.2035 9.61736 11.8253 9.82239L11.4078 10.0487C11.4003 9.88642 11.3453 9.72823 11.2472 9.5947C11.0025 9.26161 10.5593 9.15914 10.1934 9.35105L7.17975 10.9317C6.84084 10.8015 5.76047 10.4496 4.49819 10.6846C4.28044 10.7252 4.0561 10.7838 3.83135 10.859C3.70835 10.9001 3.64197 11.0331 3.68307 11.1561C3.72422 11.2791 3.85732 11.3455 3.98025 11.3044C4.1845 11.2361 4.38766 11.183 4.58413 11.1464C5.93162 10.8955 7.08478 11.3995 7.09593 11.4045C7.12622 11.4181 7.159 11.4251 7.19218 11.4251H10.3291C10.5519 11.4251 10.7332 11.607 10.7332 11.8305C10.7332 12.0342 10.5812 12.2071 10.3797 12.2326L6.40393 12.7362C6.28631 12.7511 6.19825 12.8513 6.19862 12.9698C6.19897 13.0884 6.28765 13.1881 6.40534 13.2023L8.09387 13.4058C9.72952 13.6029 11.3554 13.2839 12.7958 12.4831L14.9059 11.3101C15.0915 11.2134 15.3173 11.2645 15.4436 11.4319C15.6014 11.6311 15.5328 11.9506 15.3068 12.0669L13.0429 13.3007C12.7722 13.4429 13.0042 13.863 13.2676 13.7131L15.5316 12.4793C15.761 12.3543 15.9243 12.136 15.9795 11.8804C16.0348 11.6245 15.9761 11.358 15.8186 11.1491ZM10.4116 9.76695C10.5703 9.68373 10.7625 9.72823 10.8688 9.87283C10.9994 10.0412 10.9401 10.3083 10.7503 10.4052L9.73527 10.9555H8.14556L10.4116 9.76695ZM10.6252 11.0073L12.0491 10.2353C12.2066 10.1499 12.4025 10.2033 12.4954 10.3567C12.5965 10.5156 12.5332 10.745 12.3646 10.829L11.1296 11.4799C11.0336 11.2612 10.8509 11.0889 10.6252 11.0073ZM12.5676 12.0726C11.276 12.7907 9.82555 13.0965 8.36012 12.9618L10.4387 12.6985C10.8244 12.6497 11.1259 12.3516 11.1901 11.9789L13.7895 10.6089C13.9398 10.5297 14.1278 10.5743 14.2267 10.7128C14.3465 10.8719 14.2909 11.1203 14.1144 11.2128L12.5676 12.0726Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { d: "M5.46824 6.38088C5.73346 6.38088 5.98862 6.32351 6.22655 6.21035C6.34368 6.15467 6.39349 6.01454 6.33777 5.89742C6.28208 5.78032 6.14205 5.73048 6.02484 5.7862C5.85043 5.86914 5.66315 5.9112 5.46824 5.9112C4.75259 5.9112 4.17034 5.32895 4.17034 4.61329C4.17034 3.89764 4.75259 3.31542 5.46824 3.31542C6.1839 3.31542 6.76615 3.89764 6.76615 4.61329C6.76615 4.83242 6.71058 5.04889 6.60549 5.23932C6.54283 5.35289 6.58405 5.49573 6.69762 5.55839C6.81121 5.62104 6.95405 5.57979 7.01668 5.46626C7.16002 5.20651 7.2358 4.91157 7.2358 4.61326C7.2358 3.63861 6.44287 2.8457 5.46824 2.8457C4.49362 2.8457 3.70068 3.63861 3.70068 4.61326C3.70068 5.58792 4.49362 6.38088 5.46824 6.38088Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { d: "M1.80142 5.31137L2.28814 5.38452C2.36761 5.71424 2.49701 6.02655 2.67433 6.31636L2.38173 6.71246C2.24348 6.89964 2.26258 7.15489 2.42714 7.31939L2.7622 7.65449C2.92673 7.81902 3.18201 7.83811 3.36917 7.69986L3.76523 7.4073C4.05504 7.58461 4.36732 7.71405 4.69707 7.79352L4.77026 8.28023C4.80485 8.51033 4.99885 8.67733 5.23151 8.67733H5.70535C5.93804 8.67733 6.13204 8.51033 6.1666 8.2802L6.23976 7.79352C6.56951 7.71405 6.88179 7.58461 7.1716 7.4073L7.56769 7.69989C7.75485 7.83811 8.01013 7.81905 8.17463 7.65452L8.50969 7.31946C8.67425 7.15496 8.69335 6.89967 8.5551 6.71249L8.26253 6.31643C8.43985 6.02661 8.56928 5.71433 8.64872 5.38458L9.13541 5.31143C9.3655 5.27683 9.53253 5.08287 9.53253 4.85015V4.84802H10.9262V7.8412C10.9262 8.14317 11.1718 8.38886 11.4738 8.38886H12.4771C12.5845 8.86755 13.0126 9.22639 13.5232 9.22639C14.1145 9.22639 14.5956 8.74533 14.5956 8.15399C14.5956 7.56267 14.1146 7.08158 13.5232 7.08158C13.0126 7.08158 12.5844 7.44045 12.477 7.91917H11.4738C11.4308 7.91917 11.3958 7.8842 11.3958 7.8412V4.84802H12.477C12.5844 5.32674 13.0126 5.68561 13.5232 5.68561C14.1145 5.68561 14.5956 5.20455 14.5956 4.61321C14.5956 4.02187 14.1146 3.54081 13.5232 3.54081C13.0126 3.54081 12.5845 3.89965 12.477 4.37834H11.3959V1.38522C11.3959 1.34222 11.4308 1.30725 11.4738 1.30725H12.4771C12.5845 1.78597 13.0126 2.14481 13.5233 2.14481C14.1146 2.14481 14.5957 1.66375 14.5957 1.0724C14.5957 0.481062 14.1146 0 13.5232 0C13.0126 0 12.5845 0.358843 12.4771 0.837561H11.4738C11.1718 0.837561 10.9262 1.08322 10.9262 1.38519V4.3783H9.53253V4.37624C9.53253 4.14359 9.36553 3.94959 9.13544 3.91499L8.64872 3.84184C8.56925 3.51209 8.43985 3.19981 8.26253 2.90999L8.5551 2.51393C8.69335 2.32675 8.67428 2.07146 8.50972 1.90697L8.17466 1.57187C8.01016 1.40734 7.75488 1.38828 7.56769 1.5265L7.17163 1.81906C6.88179 1.64175 6.56951 1.51231 6.23979 1.43287L6.16663 0.946155C6.13207 0.716061 5.93807 0.54903 5.70538 0.54903H5.23151C4.99885 0.54903 4.80485 0.71603 4.77026 0.946155L4.69707 1.43287C4.36735 1.51234 4.05507 1.64175 3.76523 1.81906L3.36917 1.5265C3.18204 1.38825 2.92673 1.40731 2.7622 1.57187L2.42714 1.9069C2.26258 2.07143 2.24348 2.32671 2.38173 2.51387L2.67429 2.90993C2.49698 3.19974 2.36755 3.51206 2.28811 3.84177L1.80139 3.91493C1.5713 3.94952 1.4043 4.14352 1.4043 4.37618V4.85002C1.4043 5.0828 1.57133 5.27677 1.80142 5.31137ZM13.5232 7.55121C13.8556 7.55121 14.126 7.82158 14.126 8.15392C14.126 8.48627 13.8556 8.75664 13.5232 8.75664C13.1909 8.75664 12.9205 8.48627 12.9205 8.15392C12.9205 7.82158 13.1909 7.55121 13.5232 7.55121ZM13.5232 4.01043C13.8556 4.01043 14.126 4.2808 14.126 4.61315C14.126 4.94549 13.8556 5.21587 13.5232 5.21587C13.1909 5.21587 12.9205 4.94549 12.9205 4.61315C12.9205 4.2808 13.1909 4.01043 13.5232 4.01043ZM13.5232 0.469655C13.8556 0.469655 14.126 0.74003 14.126 1.07237C14.126 1.40472 13.8556 1.67509 13.5232 1.67509C13.1909 1.67509 12.9205 1.40472 12.9205 1.07237C12.9205 0.740061 13.1909 0.469655 13.5232 0.469655ZM1.87395 4.37899L2.51854 4.28209C2.61742 4.26724 2.69604 4.1914 2.71445 4.09315C2.78601 3.71149 2.93376 3.35502 3.15351 3.03362C3.20992 2.95112 3.20795 2.84193 3.14854 2.76153L2.76117 2.23706L3.09232 1.90593L3.61679 2.29334C3.69717 2.35271 3.80632 2.35471 3.88885 2.29831C4.21029 2.07853 4.56676 1.93081 4.94838 1.85922C5.04663 1.84081 5.12245 1.76218 5.13732 1.66331L5.23423 1.01872H5.70254L5.79944 1.66331C5.81432 1.76218 5.89013 1.84081 5.98838 1.85922C6.37001 1.93078 6.72651 2.07853 7.04791 2.29831C7.13044 2.35475 7.2396 2.35271 7.32 2.29334L7.84447 1.90593L8.17563 2.23706L7.78825 2.76156C7.72888 2.84193 7.72688 2.95112 7.78328 3.03365C8.00307 3.35506 8.15078 3.71152 8.22238 4.09321C8.24082 4.19146 8.31944 4.26727 8.41828 4.28215L9.06288 4.37905V4.84737L8.41828 4.94427C8.31944 4.95912 8.24082 5.03496 8.22238 5.13321C8.15078 5.5149 8.00307 5.87136 7.78328 6.19277C7.72688 6.27527 7.72885 6.38446 7.78825 6.46483L8.17566 6.9893L7.8445 7.32046L7.32004 6.93305C7.23966 6.87367 7.13047 6.87167 7.04794 6.92811C6.72654 7.14789 6.37007 7.29561 5.98838 7.36721C5.89013 7.38564 5.81432 7.46427 5.79944 7.56311L5.70254 8.2077H5.23423L5.13732 7.56311C5.12245 7.46427 5.04663 7.38564 4.94838 7.36721C4.5667 7.29561 4.21023 7.14789 3.88882 6.92811C3.80632 6.87171 3.69717 6.87367 3.61676 6.93305L3.09229 7.32046L2.76114 6.9893L3.14854 6.46483C3.20792 6.38446 3.20992 6.27524 3.15351 6.19277C2.93373 5.87136 2.78601 5.5149 2.71445 5.13324C2.69601 5.03499 2.61742 4.95915 2.51854 4.9443L1.87395 4.8474V4.37899Z", fill: "black" })
  ] });
};
function LawyerIcon({ className = "" }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "12",
      height: "12",
      viewBox: "0 0 12 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M11.9818 15.4067L8.93106 5.14294L10.9528 5.6455C11.131 5.68975 11.3256 5.63828 11.4519 5.51356C11.5705 5.39641 11.6165 5.22666 11.5716 5.07141L10.2183 0.38575C10.176 0.166531 9.96985 0 9.7214 0H2.27857C2.03012 0 1.82397 0.166531 1.7817 0.385781L0.4284 5.07141C0.383566 5.22666 0.429545 5.39641 0.548147 5.51356C0.674396 5.63828 0.869056 5.68978 1.04725 5.6455L3.06897 5.14294L0.0181937 15.4067C-0.0237431 15.5477 0.00771797 15.6989 0.10328 15.8153C0.198842 15.9317 0.347524 16 0.505267 16H4.3166C4.56863 16 4.78215 15.8277 4.81698 15.5961L5.99997 7.73669L7.18296 15.5961C7.21779 15.8277 7.43131 16 7.68334 16H11.4947C11.6524 16 11.8011 15.9317 11.8967 15.8153C11.9923 15.6988 12.0237 15.5477 11.9818 15.4067ZM6.9761 3.68637L9.45987 1.38209L10.369 4.52978L6.9761 3.68637ZM6 3.26612L3.48999 0.9375H8.50998L6 3.26612ZM2.54013 1.38209L5.0239 3.68637L1.63096 4.52981L2.54013 1.38209ZM3.87702 15.0625H1.16874L4.20083 4.86156L5.45961 4.54866L3.87702 15.0625ZM8.12298 15.0625L6.54043 4.54866L7.79921 4.86156L10.8313 15.0625H8.12298Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function UserIcon({ className = "" }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12.7427 9.75734C12.0891 9.10386 11.3113 8.62009 10.4626 8.32723C11.3716 7.7012 11.9688 6.65347 11.9688 5.46875C11.9688 3.55609 10.4127 2 8.5 2C6.58734 2 5.03125 3.55609 5.03125 5.46875C5.03125 6.65347 5.62841 7.7012 6.53739 8.32723C5.68872 8.62009 4.91088 9.10386 4.25737 9.75734C3.12412 10.8906 2.5 12.3973 2.5 14H3.4375C3.4375 11.2085 5.70852 8.9375 8.5 8.9375C11.2915 8.9375 13.5625 11.2085 13.5625 14H14.5C14.5 12.3973 13.8759 10.8906 12.7427 9.75734ZM8.5 8C7.10427 8 5.96875 6.8645 5.96875 5.46875C5.96875 4.073 7.10427 2.9375 8.5 2.9375C9.89573 2.9375 11.0312 4.073 11.0312 5.46875C11.0312 6.8645 9.89573 8 8.5 8Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function AddressIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_8102_15215)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M10.08 2.01953C7.0246 2.01953 4.53894 4.50519 4.53894 7.5606C4.53894 8.56647 4.99005 9.64828 5.00895 9.69391C5.15465 10.0397 5.44213 10.5769 5.64944 10.8918L9.44865 16.6483C9.60413 16.8843 9.83425 17.0195 10.08 17.0195C10.3258 17.0195 10.5559 16.8843 10.7114 16.6486L14.5109 10.8918C14.7185 10.5769 15.0057 10.0397 15.1514 9.69391C15.1703 9.64861 15.6211 8.56679 15.6211 7.5606C15.6211 4.50519 13.1354 2.01953 10.08 2.01953ZM14.5503 9.44098C14.4203 9.75095 14.1527 10.2506 13.9666 10.5329L10.167 16.2897C10.0921 16.4035 10.0683 16.4035 9.99331 16.2897L6.19376 10.5329C6.00765 10.2506 5.74005 9.75063 5.61 9.44065C5.60446 9.42729 5.19083 8.43153 5.19083 7.5606C5.19083 4.86471 7.38412 2.67142 10.08 2.67142C12.7759 2.67142 14.9692 4.86471 14.9692 7.5606C14.9692 8.43283 14.5546 9.4312 14.5503 9.44098Z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M10.0799 4.62695C8.46226 4.62695 7.14642 5.94312 7.14642 7.56046C7.14642 9.1778 8.46226 10.494 10.0799 10.494C11.6976 10.494 13.0134 9.1778 13.0134 7.56046C13.0134 5.94312 11.6976 4.62695 10.0799 4.62695ZM10.0799 9.84208C8.82211 9.84208 7.79831 8.81861 7.79831 7.56046C7.79831 6.30231 8.82211 5.27884 10.0799 5.27884C11.3378 5.27884 12.3615 6.30231 12.3615 7.56046C12.3615 8.81861 11.3378 9.84208 10.0799 9.84208Z",
              fill: "currentColor"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_8102_15215", children: /* @__PURE__ */ jsx(
          "rect",
          {
            width: "15",
            height: "15",
            fill: "white",
            transform: "translate(2.58008 2.01953)"
          }
        ) }) })
      ]
    }
  );
}
function LitigationAdvocatesList({
  advocateCases,
  onAdvocateSelect,
  selectedAdvocateIndex = 0
}) {
  const assignedAdvocates = advocateCases.filter(
    (advocateCase) => advocateCase.is_advocate_assigned
  );
  if (assignedAdvocates.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 py-4", children: "No advocates assigned" });
  }
  return /* @__PURE__ */ jsx("div", { className: "max-h-72 overflow-y-auto scrollbar-hide space-y-2", children: assignedAdvocates.map((advocateCase, index) => {
    var _a;
    const advocate = advocateCase.advocate;
    const fullName = `${advocate.first_name || ""} ${advocate.last_name || ""}`.trim();
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `cursor-pointer border-gray-300 border-b last:border-none rounded-none hover:bg-gray-100 p-2 transition-colors  `,
        onClick: () => onAdvocateSelect == null ? void 0 : onAdvocateSelect(advocate, index),
        children: /* @__PURE__ */ jsxs("div", { className: "space-y-0 w-full font-light ", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-0 items-center", children: [
            /* @__PURE__ */ jsx(Avatar, { className: "flex items-center justify-center mx-1 mb-1", children: advocate.profile_pic ? /* @__PURE__ */ jsx(
              AvatarImage,
              {
                src: advocate.profile_pic,
                className: "rounded-full h-7 w-7 object-top object-cover"
              }
            ) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col font-light", children: [
              /* @__PURE__ */ jsx("div", { className: "leading-2 w-24", children: /* @__PURE__ */ jsx(OverflowContentTooltip, { text: fullName }) }),
              advocate.designation && /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm", children: advocate.designation })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "ml-3 space-y-1 xl:text-[10px] 2xl:text-xs 3xl:text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(Smartphone, { strokeWidth: 1, className: "flex-none w-4 h-4" }),
              (_a = advocate.phone) == null ? void 0 : _a.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3")
            ] }),
            advocate.email && /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex gap-2 items-center w-56 overflow-hidden",
                title: advocate.email,
                children: [
                  /* @__PURE__ */ jsx(
                    Mail,
                    {
                      strokeWidth: 1,
                      size: 20,
                      className: "flex-none w-4 h-4"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "truncate block whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer", children: advocate.email })
                ]
              }
            ),
            advocate.address && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center overflow-auto", children: [
              /* @__PURE__ */ jsx(AddressIcon, {}),
              advocate.address
            ] })
          ] })
        ] })
      },
      advocate.id + String(index)
    );
  }) });
}
function UserCardMini({
  name,
  avatar,
  phone,
  email,
  designation,
  address
}) {
  const { serviceData } = UseContextAPI();
  const isLitigation = (serviceData == null ? void 0 : serviceData.service_type) === "Litigation";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-0 w-full font-light", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center w-full", children: /* @__PURE__ */ jsxs("div", { className: " flex gap-0 items-center", children: [
      /* @__PURE__ */ jsx(Avatar, { className: "flex items-center justify-center mx-1 mb-1", children: avatar ? /* @__PURE__ */ jsx(
        AvatarImage,
        {
          src: avatar,
          className: "rounded-full h-7 w-7 object-top object-cover"
        }
      ) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col font-light", children: [
        /* @__PURE__ */ jsx("div", { className: "leading-2 w-24", children: /* @__PURE__ */ jsx(OverflowContentTooltip, { text: name }) }),
        designation && /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm", children: designation })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "ml-3 space-y-1 xl:text-[10px] 2xl:text-xs 3xl:text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsx(Smartphone, { strokeWidth: 1, className: "flex-none w-4 h-4" }),
        phone == null ? void 0 : phone.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3")
      ] }),
      email && /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex gap-2 items-center overflow-hidden ${isLitigation ? "w-56" : "w-32"}`,
          title: email,
          children: [
            /* @__PURE__ */ jsx(Mail, { strokeWidth: 1, size: 20, className: "flex-none w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { className: "truncate block whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer", children: email })
          ]
        }
      ),
      address && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center overflow-auto", children: [
        /* @__PURE__ */ jsx(AddressIcon, {}),
        address
      ] })
    ] })
  ] });
}
const DetailsCard = ({ details }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
  const [selectedAdvocateIndex, setSelectedAdvocateIndex] = useState(0);
  const { isManager, isAdvocate, isUser, isAdmin } = useUserDetails();
  const { serviceData } = UseContextAPI();
  const isLitigation = (serviceData == null ? void 0 : serviceData.service_type) === "Litigation";
  const assignedAdvocates = ((_a = details == null ? void 0 : details.advocate_cases) == null ? void 0 : _a.filter(
    (advocateCase) => advocateCase.is_advocate_assigned
  )) || [];
  const selectedAdvocate = ((_b = assignedAdvocates[selectedAdvocateIndex]) == null ? void 0 : _b.advocate) || null;
  const createIcon = (iconKey) => {
    var _a2, _b2, _c2;
    return (_c2 = (_b2 = (_a2 = issueIcons)[iconKey]) == null ? void 0 : _b2.call(_a2, { className: "h-5 w-5 text-black mx-1" })) != null ? _c2 : /* @__PURE__ */ jsx("span", { role: "img", "aria-label": "icon", children: "\u{1F4C4}" });
  };
  const icon = createIcon((_c = details == null ? void 0 : details.service) == null ? void 0 : _c.issue);
  const SubIssueicon = createIcon((_d = details == null ? void 0 : details.service) == null ? void 0 : _d.sub_issue);
  const IssueTypeIcon = createIcon((_e = details == null ? void 0 : details.service) == null ? void 0 : _e.issue_type);
  const handleAdvocateSelect = (advocate, index) => {
    setSelectedAdvocateIndex(index);
  };
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 rounded-none bg-white overflow-hidden text-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-[#F0F4FA] p-3 space-y-1 border border-gray-300 ", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-800 font-normal", children: [
          /* @__PURE__ */ jsx(Litigation, { className: "w-4 h-4 text-gray-700" }),
          ((_f = details == null ? void 0 : details.service) == null ? void 0 : _f.category) || "--"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: (details == null ? void 0 : details.created_at) ? dayjs(details == null ? void 0 : details.created_at).format("DD MMM YYYY") : null })
      ] }),
      isLitigation && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1", children: [
        { icon, value: (_g = details == null ? void 0 : details.service) == null ? void 0 : _g.issue },
        { icon: IssueTypeIcon, value: (_h = details == null ? void 0 : details.service) == null ? void 0 : _h.issue_type },
        { icon: SubIssueicon, value: (_i = details == null ? void 0 : details.service) == null ? void 0 : _i.sub_issue }
      ].filter(({ value }) => value).map(({ icon: icon2, value }, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center text-gray-700 font-normal mt-2",
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-black", children: icon2 }),
            /* @__PURE__ */ jsx("div", { className: "mt-0.5 font-light", children: value || "--" })
          ]
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex w-full p-1 mt-2", children: /* @__PURE__ */ jsx(
      Tabs,
      {
        defaultValue: isManager() || isAdmin() ? "client" : isUser() ? "lawyer" : isAdvocate() ? "client" : void 0,
        className: "w-full flex",
        children: isLitigation ? /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "flex w-full h-auto rounded-none bg-gray-50 p-0 mb-4", children: [
            (isManager() || isUser() || isAdmin()) && /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "lawyer",
                className: "flex-1 px-4 py-1 border-none border-gray-200 cursor-pointer bg-white \r\n                    data-[state=active]:bg-gray-100 \r\n                    data-[state=active]:border-gray-300 \r\n                    shadow-none text-black text-opacity-60 \r\n                    data-[state=active]:text-opacity-100 \r\n                    text-xs 3xl:text-sm font-normal \r\n                    flex justify-center items-center gap-2 rounded-none",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "p-1 bg-gray-200 rounded-full", children: /* @__PURE__ */ jsx(LawyerIcon, { className: "w-4 h-4" }) }),
                  "Advocate",
                  isLitigation ? assignedAdvocates.length > 1 ? `(${assignedAdvocates.length})` : "" : ""
                ]
              }
            ),
            (isManager() || isAdvocate() || isAdmin()) && /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "client",
                className: "flex-1 px-4 py-1 border-none border-gray-200 cursor-pointer bg-white \r\n                    data-[state=active]:bg-gray-100 \r\n                    data-[state=active]:border-gray-300 \r\n                    shadow-none text-black text-opacity-60 \r\n                    data-[state=active]:text-opacity-100 \r\n                    text-xs 3xl:text-sm font-normal \r\n                    flex justify-center items-center gap-2 rounded-none",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "p-1 bg-gray-200 rounded-full", children: /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }) }),
                  "POC"
                ]
              }
            )
          ] }),
          (isManager() || isUser() || isAdmin()) && /* @__PURE__ */ jsx(TabsContent, { value: "lawyer", className: "mt-0", children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsx(
            LitigationAdvocatesList,
            {
              advocateCases: (details == null ? void 0 : details.advocate_cases) || [],
              onAdvocateSelect: handleAdvocateSelect,
              selectedAdvocateIndex
            }
          ) }) }),
          (isManager() || isAdvocate() || isAdmin()) && /* @__PURE__ */ jsx(TabsContent, { value: "client", className: "mt-0", children: /* @__PURE__ */ jsx(
            UserCardMini,
            {
              name: ((_k = (_j = details == null ? void 0 : details.user) == null ? void 0 : _j.first_name) != null ? _k : "") + (((_l = details == null ? void 0 : details.user) == null ? void 0 : _l.last_name) ? " " + ((_m = details == null ? void 0 : details.user) == null ? void 0 : _m.last_name) : ""),
              phone: ((_n = details == null ? void 0 : details.user) == null ? void 0 : _n.phone) || "--",
              avatar: (_p = (_o = details == null ? void 0 : details.user) == null ? void 0 : _o.profile_pic) != null ? _p : null,
              email: ((_q = details == null ? void 0 : details.user) == null ? void 0 : _q.email) || "--"
            }
          ) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(TabsList, { className: "flex flex-col items-start gap-0 pt-1 h-auto rounded-none transition-all duration-500 ease-in-out py-0", children: [
            (isManager() || isUser() || isAdmin()) && /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "lawyer",
                className: "w-28 px-2 group border cursor-pointer bg-white border-white \r\n                data-[state=active]:bg-gray-100 \r\n                data-[state=active]:border-gray-100 \r\n                shadow-none text-black text-opacity-60 \r\n                data-[state=active]:text-opacity-100 \r\n                text-xs 3xl:text-sm font-normal \r\n                flex justify-start items-center gap-2 rounded-none",
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "p-1 bg-gray-200 rounded-full \r\n                data-[state=active]:bg-white \r\n                data-[state=active]:text-black",
                      children: /* @__PURE__ */ jsx(LawyerIcon, { className: "w-4 h-4" })
                    }
                  ),
                  "Advocate"
                ]
              }
            ),
            (isManager() || isAdvocate() || isAdmin()) && /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "client",
                className: "w-28 px-2 group border  cursor-pointer bg-white border-white \r\n                data-[state=active]:bg-gray-100 \r\n                data-[state=active]:border-gray-100 \r\n                shadow-none text-black text-opacity-60 \r\n                data-[state=active]:text-opacity-100 \r\n                text-xs 3xl:text-sm font-normal \r\n                flex justify-start items-center gap-2 rounded-none",
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "p-1 bg-gray-200 rounded-full \r\n                data-[state=active]:bg-white \r\n                data-[state=active]:text-black",
                      children: /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" })
                    }
                  ),
                  "POC"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            (isManager() || isUser() || isAdmin()) && /* @__PURE__ */ jsx(TabsContent, { value: "lawyer", className: "", children: /* @__PURE__ */ jsx("div", { className: "space-y-3 text-sm text-gray-800", children: /* @__PURE__ */ jsx(
              UserCardMini,
              {
                name: selectedAdvocate ? `${(_r = selectedAdvocate == null ? void 0 : selectedAdvocate.first_name) != null ? _r : ""} ${(_s = selectedAdvocate == null ? void 0 : selectedAdvocate.last_name) != null ? _s : ""}`.trim() || "--" : "Not assigned",
                phone: (selectedAdvocate == null ? void 0 : selectedAdvocate.phone) || "--",
                email: (selectedAdvocate == null ? void 0 : selectedAdvocate.email) || "--",
                avatar: (_t = selectedAdvocate == null ? void 0 : selectedAdvocate.profile_pic) != null ? _t : null
              }
            ) }) }),
            (isManager() || isAdvocate() || isAdmin()) && /* @__PURE__ */ jsx(TabsContent, { value: "client", className: "space-y-1", children: /* @__PURE__ */ jsx(
              UserCardMini,
              {
                name: ((_v = (_u = details == null ? void 0 : details.user) == null ? void 0 : _u.first_name) != null ? _v : "") + (((_w = details == null ? void 0 : details.user) == null ? void 0 : _w.last_name) ? " " + ((_x = details == null ? void 0 : details.user) == null ? void 0 : _x.last_name) : ""),
                phone: ((_y = details == null ? void 0 : details.user) == null ? void 0 : _y.phone) || "--",
                avatar: (_A = (_z = details == null ? void 0 : details.user) == null ? void 0 : _z.profile_pic) != null ? _A : null,
                email: ((_B = details == null ? void 0 : details.user) == null ? void 0 : _B.email) || "--"
              }
            ) })
          ] })
        ] })
      }
    ) })
  ] });
};
function EyeIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M20.7971 11.7574C20.7713 11.6992 20.1468 10.3137 18.7584 8.92533C16.9084 7.07536 14.5718 6.09766 12 6.09766C9.42816 6.09766 7.09155 7.07536 5.24157 8.92533C3.85318 10.3137 3.2257 11.7014 3.20285 11.7574C3.16931 11.8329 3.15198 11.9145 3.15198 11.9971C3.15198 12.0796 3.16931 12.1613 3.20285 12.2367C3.22865 12.2949 3.85318 13.6797 5.24157 15.0681C7.09155 16.9173 9.42816 17.895 12 17.895C14.5718 17.895 16.9084 16.9173 18.7584 15.0681C20.1468 13.6797 20.7713 12.2949 20.7971 12.2367C20.8306 12.1613 20.848 12.0796 20.848 11.9971C20.848 11.9145 20.8306 11.8329 20.7971 11.7574ZM12 16.7153C9.73046 16.7153 7.74777 15.8902 6.10647 14.2636C5.43302 13.5939 4.86007 12.8302 4.40544 11.9963C4.85995 11.1624 5.43291 10.3987 6.10647 9.72903C7.74777 8.10247 9.73046 7.27739 12 7.27739C14.2695 7.27739 16.2522 8.10247 17.8935 9.72903C18.5682 10.3985 19.1424 11.1622 19.5982 11.9963C19.0666 12.9888 16.7506 16.7153 12 16.7153ZM12 8.45712C11.3 8.45712 10.6157 8.6647 10.0337 9.05359C9.45168 9.44248 8.99805 9.99523 8.73018 10.6419C8.46231 11.2886 8.39222 12.0003 8.52878 12.6868C8.66534 13.3733 9.00242 14.004 9.49738 14.4989C9.99235 14.9939 10.623 15.331 11.3095 15.4675C11.9961 15.6041 12.7077 15.534 13.3544 15.2661C14.0011 14.9983 14.5538 14.5446 14.9427 13.9626C15.3316 13.3806 15.5392 12.6963 15.5392 11.9963C15.5382 11.058 15.165 10.1583 14.5015 9.49481C13.838 8.83129 12.9383 8.4581 12 8.45712ZM12 14.3558C11.5333 14.3558 11.0771 14.2174 10.6891 13.9582C10.3011 13.6989 9.9987 13.3304 9.82011 12.8993C9.64153 12.4681 9.5948 11.9937 9.68585 11.536C9.77689 11.0783 10.0016 10.6579 10.3316 10.3279C10.6616 9.99795 11.082 9.77324 11.5397 9.6822C11.9974 9.59115 12.4718 9.63788 12.9029 9.81646C13.334 9.99505 13.7025 10.2975 13.9618 10.6855C14.2211 11.0735 14.3594 11.5297 14.3594 11.9963C14.3594 12.6221 14.1109 13.2222 13.6684 13.6647C13.2259 14.1072 12.6257 14.3558 12 14.3558Z",
          fill: "currentColor"
        }
      )
    }
  );
}
const HearingHistoryItem = forwardRef(
  ({ record }, ref) => {
    return /* @__PURE__ */ jsxs("div", { ref, className: "bg-gray-100 p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs border border-gray-400 gap-1 p-1 bg-white", children: [
            "Next Hearing :",
            /* @__PURE__ */ jsx("div", { children: formatDate(record == null ? void 0 : record.next_hearing_date) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs", children: dayjs(record == null ? void 0 : record.next_hearing_date).format("h:mm a") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: /* @__PURE__ */ jsx("div", { className: "text-xs text-black", children: (record == null ? void 0 : record.updated_at) === null ? formatDate(record == null ? void 0 : record.created_at) : formatDate(record == null ? void 0 : record.updated_at) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-1 my-2", children: /* @__PURE__ */ jsx("div", { className: "text-xs 3xl:text-sm text-gray-600 list-none font-normal", children: record == null ? void 0 : record.note.split("\n").map((note, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "text-black capitalize text-opacity-60",
          children: [
            note.trim(),
            " "
          ]
        },
        index
      )) }) })
    ] });
  }
);
HearingHistoryItem.displayName = "HearingHistoryItem";
const HearingHistorySkeleton = () => {
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [...Array(10)].map((_, index) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4 bg-gray-200" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-full bg-gray-200" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-6 bg-gray-200" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-6 bg-gray-200" })
    ] })
  ] }, index)) });
};
const HearingHistoryList = ({
  allRecords,
  isLoading,
  isFetchingNextPage,
  lastHearingSummaryRef
}) => {
  if (isLoading && !isFetchingNextPage) {
    return /* @__PURE__ */ jsx(HearingHistorySkeleton, {});
  }
  if (allRecords.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 text-sm h-full flex items-center justify-center", children: "No Hearing history available" });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    allRecords.map((record, index) => {
      const isLastLog = index === allRecords.length - 1;
      return /* @__PURE__ */ jsx(
        HearingHistoryItem,
        {
          record,
          ref: isLastLog ? lastHearingSummaryRef : null
        },
        index
      );
    }),
    isFetchingNextPage && /* @__PURE__ */ jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" }) })
  ] });
};
const NextHearingDrawer = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  caseNotes,
  isLoadingCaseNote
}) => {
  const observer = useRef(null);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);
  const [isEditNotesOpen, setIsEditNotesOpen] = useState(false);
  const lastHearingSummaryRef = useCallback(
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
  const allRecords = (caseNotes == null ? void 0 : caseNotes.pages.map((e) => e.data).flat()) || [];
  return /* @__PURE__ */ jsxs(
    Sheet,
    {
      open: isNotesOpen,
      onOpenChange: (isOpen) => {
        setIsNotesOpen(isOpen);
        setIsAddNotesOpen(false);
        setIsEditNotesOpen(false);
      },
      children: [
        /* @__PURE__ */ jsx(SheetTrigger, { children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("span", { className: "border-gray-200 py-2 bg-transparent hover:bg-transparent border-0 flex items-center justify-center cursor-pointer", children: /* @__PURE__ */ jsx(EyeIcon, {}) }) }),
          /* @__PURE__ */ jsxs(TooltipContent, { className: "bg-black text-white text-xs rounded-none", children: [
            "Hearing history",
            /* @__PURE__ */ jsx(TooltipArrow, {})
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxs(SheetContent, { className: "bg-white w-4/12 p-2 font-primary", children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "flex flex-row p-2 pb-4 items-center justify-between border-b border-b-gray-300", children: [
            /* @__PURE__ */ jsxs(SheetTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(NotesHeadIcon, { className: "w-7 h-7" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-smd 3xl:text-base text-black", children: "Hearing history" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-6 cursor-pointer", children: /* @__PURE__ */ jsx(
              SheetClose,
              {
                onClick: () => {
                  setIsAddNotesOpen(false);
                  setIsEditNotesOpen(false);
                },
                children: /* @__PURE__ */ jsx(NotesCloseIcon, { className: "w-7 h-7 cursor-pointer" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2 h-[calc(100vh-80px)] overflow-y-auto", children: !isAddNotesOpen && !isEditNotesOpen && /* @__PURE__ */ jsx(
            HearingHistoryList,
            {
              allRecords,
              isLoading: isLoadingCaseNote,
              isFetchingNextPage,
              lastHearingSummaryRef
            }
          ) })
        ] })
      ]
    }
  );
};
function NoteWithShowMore({ notes }) {
  const [showMore, setShowMore] = useState(false);
  const characterLimit = 150;
  const shouldTruncate = notes.length > characterLimit;
  const displayText = showMore ? notes : notes == null ? void 0 : notes.slice(0, characterLimit);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("span", { className: "font-normal ", children: "Hearing Reason :" }),
    /* @__PURE__ */ jsxs("div", { className: "text-black text-opacity-60 my-2 mx-1", children: [
      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(UnOrderList, { text: displayText }) }),
      shouldTruncate && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowMore(!showMore),
          className: "text-black cursor-pointer text-xs font-semibold hover:underline",
          children: showMore ? "Show less" : "Show more"
        }
      )
    ] })
  ] });
}
const DeleteIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("path", { d: "M1.12756 6.15332V13.1277C1.23013 14.461 1.33269 16.2046 1.43526 17.4354C1.53782 18.8713 2.76859 19.9995 4.20449 19.9995H11.7942C13.2301 19.9995 14.4609 18.8713 14.5635 17.4354C14.666 16.2046 14.7686 14.461 14.8712 13.1277C14.9737 11.5892 14.8712 8.40967 14.8712 6.15332H1.12756Z", fill: "#EB5757" }),
    /* @__PURE__ */ jsx("path", { d: "M15.1795 3.07692H12.6154L11.7949 1.53846C11.2821 0.61539 10.359 0 9.3333 0H6.8718C5.84615 0 4.82051 0.61539 4.41026 1.53846L3.38462 3.07692H0.82051C0.41026 3.07692 0 3.48718 0 3.89744C0 4.30769 0.41026 4.71795 0.82051 4.71795H15.1795C15.5897 4.71795 16 4.41026 16 3.89744C16 3.38462 15.5897 3.07692 15.1795 3.07692ZM5.12821 3.07692L5.64103 2.25641C5.84615 1.84615 6.2564 1.53846 6.7692 1.53846H9.2308C9.7436 1.53846 10.1538 1.74359 10.359 2.25641L10.8718 3.07692H5.12821Z", fill: "#EB5757" })
  ] });
};
function OfflineModeIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "404",
      height: "363",
      viewBox: "0 0 404 363",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: [
        /* @__PURE__ */ jsx("rect", { width: "404", height: "363", fill: "white" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M379.814 223.996C372.33 306.725 298.957 311.533 222.772 283.53C195.409 273.475 156.626 272.819 115.169 289.483C77.2522 304.73 17.7441 287.995 23.5605 253.763C32.4015 201.732 67.3276 216.185 43.8736 164.676C26.7725 127.119 35.9316 73.7316 87.9511 85.4481C126.964 94.2359 143.648 76.9679 149.55 67.7848C153.638 61.4247 159.05 55.8665 165.59 51.6561C214.968 19.8718 241.657 80.5084 268.917 65.6366C320.248 37.6342 371.863 66.1525 345.599 111.853C323.709 149.946 384.097 176.642 379.814 223.996Z",
            fill: "#D1EEF7"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M307.712 94.7087L318.707 145.753C293.135 166.922 284.511 174.103 284.482 174.109C282.731 174.799 274.023 177.891 270.983 180.29C265.996 175.228 263.32 172.512 261.198 170.362C261.161 170.35 212.216 154.735 212.209 154.704C214.777 153.731 263.862 137.785 276.144 126.477C276.144 126.477 276.143 126.475 276.145 126.474C276.589 126.071 276.41 126.186 276.549 126.157C278.029 125.841 290.667 112.065 305.841 95.1076L307.712 94.7087Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M225.148 151.882C225.253 152.547 223.133 166.176 225.273 165.408C233.625 162.408 244.153 164.435 246.941 167.851C252.282 174.395 246.663 181.498 246.001 182.247L273.208 168.121C276.118 162.722 288.471 131.733 286.529 131.101C278.563 128.51 224.881 150.186 225.148 151.882Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M266.983 153.873C266.983 153.873 218.2 152.553 212.227 154.665C206.254 156.776 201.608 173.961 200.742 179.512C199.876 185.062 208.768 199.631 212.37 200.87C216.789 202.39 216.901 192.349 214.759 185.235C212.791 178.7 217.549 171.869 218.451 169.275C219.056 167.535 227.067 164.014 232.561 163.918C243.088 163.733 248.673 177.376 248.673 177.376L266.983 153.873Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M240.366 143.073C240.366 143.073 207.967 147.816 202.022 154.064C196.078 160.312 190.694 168.051 191.746 174.013C192.798 179.975 198.036 192.095 199.772 192.437C201.507 192.778 204.49 184.861 204.239 178.782C203.987 172.702 215.402 160.523 215.402 160.523L238.555 150.822L240.366 143.073Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M283.513 121.185C283.513 121.185 269.393 132.768 255.717 135.558C236.706 139.438 214.479 141.356 211.563 142.734C206.551 145.102 194.992 154.497 193.504 157.63C192.017 160.762 186.512 170.691 186.598 173.117C186.684 175.544 196.39 171.742 203.486 165.247C210.583 158.753 221.024 152.748 221.024 152.748L265.6 153.843L283.513 121.185Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M308.572 70.3301C296.475 83.8784 262.73 126.962 266.581 130.209C266.855 130.434 267.204 130.606 267.595 130.727C275.356 133.015 284.333 137.876 288.43 143.6C288.619 143.833 288.972 144.363 288.974 144.37C291.632 148.041 294.712 153.867 294.738 153.986C295.775 156.111 299.087 161.969 299.141 162.002C300.311 163.792 302.091 166.356 304.138 167.021C306.748 167.587 369.43 131.497 377.286 125.202L379.561 73.3112L308.572 70.3301Z",
            fill: "#00ADC8"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M203.67 188.787C203.428 189.208 202.809 189.183 202.601 188.746C201.222 185.851 199.733 181.976 200.135 179.401C200.96 174.114 204.99 158.935 210.579 154.858C210.988 154.56 211.562 154.862 211.54 155.365L211.539 155.377C211.531 155.56 211.44 155.727 211.292 155.835C206.366 159.389 202.237 173.861 201.344 179.585C201.063 181.387 201.943 184.545 203.696 188.222C203.781 188.399 203.774 188.606 203.676 188.776C203.674 188.78 203.672 188.783 203.67 188.787Z",
            fill: "#E5967E"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M238.336 165.399C238.336 165.399 241.278 166.379 243.996 169.901C247.828 174.867 248.177 176.302 248.177 176.302L246.252 165.304L238.336 165.399Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M205.847 148.628C205.847 148.628 248.338 176.834 254.723 189.949C254.723 189.949 242.058 211.343 228.238 222.86C214.418 234.377 195.165 261.215 193.831 266.182C193.831 266.182 161.926 235.445 148.823 234.388C148.823 234.388 161.658 204.53 176.06 194.762C190.462 184.993 205.847 148.628 205.847 148.628Z",
            fill: "#B67AB7"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M185.43 250.824C188.252 248.722 191.815 248.027 195.217 248.923C195.893 249.101 196.552 249.345 197.175 249.633L198.317 250.184L199.066 249.154C205.751 239.934 216.639 226.608 225.303 219.394C232.674 213.246 239.794 203.991 244.467 197.313L245.116 196.389L244.408 195.507C242.146 192.708 241.347 188.972 242.278 185.505C242.411 185.009 242.585 184.507 242.795 184.016L243.211 183.055L242.445 182.329C234.219 174.606 222.425 165.834 216.123 161.291L215.061 160.527L214.14 161.465C211.609 164.034 207.979 165.274 204.421 164.783L203.351 164.634L202.86 165.583C196.853 177.17 187.782 192.289 178.632 198.499C171.849 203.098 165.149 213.253 160.726 220.966L160.21 221.862L160.86 222.666C163.138 225.462 163.943 229.207 163.008 232.688C162.897 233.104 162.775 233.471 162.633 233.824L162.166 235.006L163.255 235.668C169.091 239.222 175.912 244.3 183.526 250.76L184.454 251.551L185.43 250.824ZM164.051 234.378C164.22 233.953 164.36 233.521 164.479 233.076C165.584 228.959 164.548 224.786 162.045 221.712C166.939 213.185 173.3 203.941 179.485 199.747C188.886 193.368 198.081 178.111 204.209 166.275C208.359 166.851 212.424 165.366 215.227 162.517C224.556 169.241 234.565 177.011 241.395 183.429C241.163 183.969 240.964 184.534 240.808 185.119C239.706 189.221 240.736 193.384 243.218 196.452C238.443 203.276 231.481 212.267 224.323 218.237C216.104 225.083 205.5 237.703 197.83 248.274C197.133 247.942 196.388 247.668 195.609 247.462C191.625 246.413 187.578 247.333 184.519 249.614C178.334 244.367 170.962 238.589 164.051 234.378Z",
            fill: "#8F5C93"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M209.42 220.262L205.946 224.03L206.798 227.455L219.839 213.308L218.987 209.883L216.723 212.338C214.43 214.825 212.121 216.946 209.182 215.963L215.371 209.249L214.519 205.824L206.75 214.252C206.745 214.247 206.741 214.243 206.736 214.239C205.168 212.814 203.957 209.334 207.9 205.056L209.81 202.988L207.77 201.138L189.707 199.961L186.304 203.652L204.995 204.867C201.931 208.573 200.863 213.689 203.91 217.334L201.479 219.971L202.331 223.396L206.126 219.278C207.12 219.876 208.266 220.254 209.42 220.262Z",
            fill: "#8F5C93"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M289.664 170.573C281.748 184.44 258.414 195.441 251.335 197.431C238.097 201.153 229.109 210.294 227.059 209.528C225.009 208.762 222.179 202.625 230.032 194.382C237.492 186.55 247.598 182.429 248.786 176.328C249.256 173.915 256.034 171.792 256.034 171.792C256.034 171.792 292.688 165.275 289.664 170.573Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M229.519 207.464C228.689 207.214 229.601 206.3 229.895 206.076C230.113 205.909 230.355 205.767 230.588 205.621C231.123 205.285 231.669 204.967 232.214 204.647C233.177 204.083 234.92 202.586 235.732 204.089C235.955 204.501 236.555 204.081 236.335 203.673C235.142 201.466 232.54 203.607 231.165 204.42C230.291 204.938 228.947 205.505 228.566 206.527C228.293 207.257 228.678 207.965 229.397 208.181C229.847 208.317 229.965 207.598 229.519 207.464Z",
            fill: "#E79780"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M206.194 149.136C203.384 153.468 199.011 156.303 195.875 160.345C193.352 163.597 190.661 167.99 191.173 172.272C191.244 172.863 192.181 172.825 192.11 172.23C191.591 167.888 194.555 163.349 197.222 160.16C198.693 158.4 200.429 156.898 202.096 155.329C203.956 153.577 205.638 151.702 207.029 149.558C207.356 149.055 206.518 148.636 206.194 149.136Z",
            fill: "#E5967E"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M288.729 172.873C290.026 169.762 290.627 166.46 290.516 163.098C290.494 162.436 289.465 162.536 289.486 163.194C289.591 166.377 289.014 169.508 287.787 172.453C287.533 173.061 288.474 173.486 288.729 172.873Z",
            fill: "#EF9F8A"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M95.685 322.871L90.2745 270.93C117.99 252.648 127.341 246.441 127.371 246.439C129.186 245.942 138.179 243.81 141.461 241.753C145.872 247.326 148.238 250.316 150.116 252.683C150.151 252.699 197.128 273.518 197.131 273.55C194.472 274.24 143.944 284.785 130.509 294.7C130.509 294.7 130.509 294.702 130.507 294.702C130.022 295.055 130.212 294.96 130.072 294.974C128.565 295.128 114.51 307.458 97.5883 322.677L95.685 322.871Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M183.969 274.942C183.937 274.27 187.519 260.948 185.308 261.481C176.68 263.56 166.431 260.406 164.029 256.708C159.426 249.623 165.781 243.169 166.52 242.496L137.941 253.599C134.463 258.651 118.829 288.127 120.692 288.965C128.332 292.403 184.051 276.657 183.969 274.942Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M142.597 268.414C142.597 268.414 190.962 275.004 197.13 273.551C203.297 272.097 209.776 255.512 211.238 250.087C212.699 244.661 205.434 229.213 201.986 227.591C197.757 225.602 196.559 235.574 197.919 242.879C199.169 249.59 193.699 255.868 192.522 258.35C191.732 260.015 183.385 262.649 177.911 262.15C167.424 261.195 163.347 247.025 163.347 247.025L142.597 268.414Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M167.883 282.02C167.883 282.02 200.617 280.808 207.205 275.238C213.792 269.667 219.984 262.554 219.583 256.511C219.182 250.468 215.284 237.848 213.595 237.32C211.906 236.793 208.083 244.344 207.675 250.417C207.267 256.49 194.597 267.367 194.597 267.367L170.522 274.509L167.883 282.02Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M122.606 299.134C122.606 299.134 137.901 289.144 151.802 287.849C171.127 286.048 193.437 286.545 196.485 285.49C201.726 283.678 214.237 275.586 216.055 272.632C217.873 269.677 224.421 260.4 224.598 257.978C224.775 255.556 214.712 258.287 206.953 263.977C199.193 269.667 188.161 274.509 188.161 274.509L143.952 268.597L122.606 299.134Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M92.1772 347.063C105.671 334.901 143.883 295.714 140.405 292.07C140.157 291.816 139.828 291.607 139.453 291.445C131.984 288.33 123.584 282.526 120.13 276.392C119.967 276.139 119.673 275.575 119.673 275.567C117.427 271.63 114.995 265.504 114.981 265.383C114.18 263.158 111.521 256.976 111.471 256.937C110.502 255.03 109.008 252.288 107.046 251.406C104.511 250.561 38.2849 279.663 29.7932 285.073L21.9183 336.42L92.1772 347.063Z",
            fill: "#FF8F65"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M209.329 240.528C209.615 240.136 210.228 240.227 210.388 240.685C211.445 243.713 212.507 247.727 211.829 250.245C210.437 255.412 204.786 270.071 198.787 273.52C198.349 273.772 197.81 273.41 197.887 272.912L197.889 272.9C197.916 272.719 198.025 272.563 198.185 272.472C203.468 269.471 209.139 255.526 210.646 249.931C211.121 248.169 210.587 244.933 209.241 241.087C209.177 240.902 209.206 240.698 209.322 240.539C209.324 240.535 209.327 240.532 209.329 240.528Z",
            fill: "#E5967E"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M172.33 260.066C172.33 260.066 169.512 258.774 167.192 254.98C163.92 249.629 163.729 248.166 163.729 248.166L164.453 259.305L172.33 260.066Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M121.869 249.385C131.241 236.452 155.637 228.036 162.892 226.823C176.46 224.554 186.387 216.436 188.343 217.42C190.298 218.403 192.449 224.812 183.748 232.161C175.481 239.142 164.985 242.146 163.143 248.085C162.415 250.434 155.445 251.812 155.445 251.812C155.445 251.812 118.289 254.327 121.869 249.385Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M185.68 219.192C186.478 219.53 185.473 220.34 185.156 220.531C184.921 220.673 184.665 220.788 184.418 220.909C183.85 221.185 183.272 221.442 182.696 221.701C181.677 222.158 179.782 223.458 179.137 221.876C178.96 221.441 178.317 221.794 178.492 222.223C179.44 224.548 182.259 222.7 183.714 222.04C184.64 221.62 186.037 221.202 186.527 220.227C186.877 219.53 186.57 218.784 185.879 218.491C185.447 218.308 185.251 219.01 185.68 219.192Z",
            fill: "#E79780"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M202.514 279.676C205.778 275.672 210.436 273.325 213.993 269.643C216.855 266.681 220.007 262.603 219.961 258.288C219.954 257.692 219.018 257.63 219.024 258.229C219.071 262.604 215.631 266.798 212.632 269.682C210.978 271.273 209.089 272.579 207.261 273.959C205.221 275.5 203.345 277.184 201.729 279.166C201.35 279.631 202.137 280.138 202.514 279.676Z",
            fill: "#E5967E"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M123.042 247.223C121.416 250.177 120.462 253.395 120.208 256.751C120.158 257.411 121.193 257.423 121.242 256.767C121.482 253.59 122.395 250.539 123.934 247.744C124.252 247.166 123.363 246.642 123.042 247.223Z",
            fill: "#EF9F8A"
          }
        )
      ]
    }
  );
}
function OnlineModeIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "404",
      height: "363",
      viewBox: "0 0 404 363",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: [
        /* @__PURE__ */ jsx("rect", { width: "404", height: "363", fill: "white" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M308.331 58.7652L318.731 111.912C292.981 134.298 284.296 141.89 284.267 141.897C282.513 142.637 273.79 145.964 270.73 148.502C265.81 143.276 263.171 140.472 261.078 138.252C261.041 138.24 212.381 122.504 212.375 122.471C214.948 121.427 264.099 104.223 276.48 92.2811C276.48 92.2811 276.479 92.2788 276.481 92.2785C276.928 91.8519 276.749 91.9746 276.887 91.9422C278.368 91.5957 291.131 77.0738 306.46 59.2028L308.331 58.7652Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M225.397 119.177C225.495 119.87 223.227 134.118 225.371 133.291C233.737 130.066 244.219 132.061 246.963 135.594C252.219 142.363 246.533 149.84 245.864 150.629L273.168 135.575C276.132 129.908 288.803 97.4233 286.872 96.7861C278.953 94.1731 225.15 117.41 225.397 119.177Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M267.197 120.464C267.197 120.464 218.585 119.645 212.608 121.914C206.631 124.184 201.808 142.156 200.883 147.954C199.958 153.752 208.659 168.842 212.235 170.093C216.623 171.627 216.847 161.156 214.791 153.763C212.902 146.97 217.721 139.793 218.649 137.078C219.271 135.256 227.296 131.494 232.774 131.331C243.269 131.018 248.683 145.18 248.683 145.18L267.197 120.464Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M240.593 109.355C240.593 109.355 208.312 114.659 202.33 121.231C196.348 127.802 190.906 135.919 191.886 142.112C192.867 148.306 197.943 160.862 199.666 161.198C201.388 161.534 204.443 153.259 204.261 146.934C204.078 140.609 215.568 127.802 215.568 127.802L238.706 117.441L240.593 109.355Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M283.805 86.2688C283.805 86.2688 269.612 98.4991 255.96 101.563C236.981 105.822 214.821 108.075 211.902 109.543C206.883 112.068 195.265 121.99 193.749 125.271C192.233 128.552 186.64 138.961 186.698 141.488C186.757 144.016 196.466 139.943 203.606 133.095C210.747 126.247 221.214 119.87 221.214 119.87L265.6 120.504L283.805 86.2688Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M203.656 157.339C203.411 157.78 202.795 157.762 202.592 157.309C201.252 154.308 199.812 150.288 200.241 147.601C201.121 142.084 205.303 126.225 210.914 121.914C211.324 121.599 211.892 121.907 211.865 122.431L211.864 122.444C211.854 122.634 211.761 122.81 211.612 122.923C206.668 126.682 202.395 141.806 201.443 147.779C201.143 149.659 201.984 152.94 203.689 156.75C203.771 156.934 203.762 157.149 203.663 157.328C203.661 157.331 203.658 157.335 203.656 157.339Z",
            fill: "#E5967E"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M238.548 132.978C238.548 132.978 241.487 133.973 244.174 137.638C247.962 142.806 248.296 144.307 248.296 144.307L246.488 132.788L238.548 132.978Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M206.511 115.149C206.511 115.149 248.504 144.32 254.736 158.007C254.736 158.007 241.957 180.546 228.118 192.744C214.278 204.942 194.903 233.248 193.534 238.467C193.534 238.467 162.086 206.545 149.07 205.559C149.07 205.559 162.092 174.147 176.494 163.776C190.898 153.405 206.511 115.149 206.511 115.149Z",
            fill: "#B67AB7"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M185.306 222.459C188.131 220.23 191.679 219.469 195.054 220.377C195.724 220.557 196.377 220.806 196.993 221.103L198.125 221.67L198.878 220.584C205.605 210.858 216.547 196.79 225.224 189.148C232.607 182.637 239.766 172.871 244.471 165.828L245.124 164.854L244.428 163.936C242.204 161.022 241.442 157.114 242.398 153.472C242.535 152.95 242.712 152.423 242.926 151.906L243.347 150.895L242.593 150.141C234.481 142.122 222.834 133.037 216.607 128.333L215.559 127.542L214.635 128.533C212.096 131.249 208.477 132.583 204.943 132.101L203.881 131.955L203.384 132.954C197.311 145.155 188.159 161.084 179.007 167.678C172.224 172.561 165.474 183.267 161.008 191.392L160.488 192.336L161.126 193.172C163.367 196.082 164.134 200 163.175 203.658C163.06 204.095 162.936 204.48 162.791 204.852L162.316 206.095L163.393 206.779C169.165 210.449 175.901 215.71 183.414 222.41L184.33 223.231L185.306 222.459ZM164.196 205.419C164.368 204.972 164.511 204.518 164.633 204.05C165.768 199.725 164.775 195.361 162.313 192.161C167.254 183.178 173.659 173.432 179.845 168.979C189.247 162.206 198.523 146.129 204.72 133.666C208.84 134.233 212.895 132.638 215.707 129.626C224.922 136.588 234.805 144.64 241.539 151.303C241.304 151.872 241.101 152.466 240.94 153.08C239.809 157.39 240.796 161.745 243.237 164.937C238.43 172.134 231.429 181.622 224.26 187.945C216.028 195.197 205.375 208.522 197.657 219.672C196.967 219.33 196.228 219.05 195.456 218.842C191.505 217.78 187.473 218.781 184.411 221.2C178.309 215.757 171.03 209.769 164.196 205.419Z",
            fill: "#8F5C93"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M209.492 190.195L205.995 194.189L206.814 197.784L219.944 182.785L219.125 179.191L216.846 181.795C214.537 184.432 212.215 186.683 209.293 185.676L215.524 178.558L214.705 174.964L206.882 183.899C206.878 183.895 206.873 183.89 206.869 183.886C205.317 182.402 204.14 178.753 208.11 174.218L210.034 172.026L208.015 170.1L190.011 169.028L186.585 172.942L205.215 174.046C202.126 177.972 201.016 183.362 204.023 187.167L201.575 189.962L202.394 193.557L206.216 189.191C207.202 189.81 208.342 190.197 209.492 190.195Z",
            fill: "#8F5C93"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M289.89 137.991C281.858 152.52 258.515 164.241 251.448 166.394C238.232 170.419 229.186 180.04 227.154 179.266C225.123 178.492 222.375 172.134 230.281 163.46C237.792 155.221 247.896 150.815 249.146 144.448C249.64 141.93 256.409 139.642 256.409 139.642C256.409 139.642 292.958 132.44 289.89 137.991Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M229.687 176.874C228.864 176.623 229.782 175.659 230.078 175.422C230.297 175.246 230.54 175.096 230.773 174.941C231.309 174.584 231.857 174.246 232.404 173.907C233.37 173.308 235.123 171.727 235.915 173.285C236.133 173.712 236.736 173.268 236.521 172.845C235.356 170.557 232.74 172.819 231.362 173.682C230.484 174.232 229.14 174.838 228.748 175.908C228.468 176.672 228.844 177.406 229.558 177.623C230.004 177.759 230.131 177.009 229.687 176.874Z",
            fill: "#E79780"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M206.407 115.929C203.575 120.456 199.209 123.448 196.057 127.678C193.521 131.082 190.807 135.671 191.268 140.109C191.331 140.722 192.26 140.671 192.197 140.055C191.729 135.554 194.717 130.81 197.395 127.47C198.872 125.628 200.609 124.05 202.278 122.402C204.14 120.563 205.828 118.598 207.229 116.358C207.559 115.831 206.733 115.407 206.407 115.929Z",
            fill: "#E5967E"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M288.901 140.722C290.228 137.464 290.864 134.014 290.791 130.51C290.776 129.821 289.749 129.936 289.764 130.622C289.833 133.939 289.222 137.21 287.967 140.294C287.707 140.931 288.64 141.364 288.901 140.722Z",
            fill: "#EF9F8A"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M95.7496 297.36L90.3516 243.129C118.093 224.031 127.453 217.547 127.483 217.545C129.299 217.025 138.3 214.796 141.585 212.647C145.998 218.465 148.365 221.586 150.243 224.057C150.278 224.074 197.282 245.797 197.285 245.83C194.624 246.551 144.056 257.577 130.608 267.934C130.608 267.934 130.608 267.937 130.606 267.937C130.121 268.306 130.311 268.206 130.17 268.221C128.663 268.382 114.593 281.261 97.6545 297.157L95.7496 297.36Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M184.111 247.294C184.079 246.592 187.667 232.682 185.455 233.239C176.82 235.412 166.565 232.122 164.162 228.262C159.558 220.866 165.92 214.125 166.659 213.422L138.056 225.024C134.574 230.3 118.919 261.082 120.783 261.957C128.428 265.544 184.193 249.085 184.111 247.294Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M142.709 240.5C142.709 240.5 191.106 247.365 197.278 245.845C203.45 244.326 209.939 227.008 211.403 221.342C212.867 215.677 205.602 199.55 202.153 197.858C197.921 195.782 196.719 206.194 198.078 213.821C199.326 220.828 193.85 227.384 192.672 229.976C191.881 231.715 183.527 234.467 178.049 233.948C167.555 232.955 163.48 218.161 163.48 218.161L142.709 240.5Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M168.013 254.703C168.013 254.703 200.769 253.428 207.363 247.61C213.957 241.792 220.155 234.363 219.756 228.054C219.356 221.745 215.459 208.571 213.769 208.02C212.079 207.47 208.252 215.355 207.841 221.696C207.431 228.036 194.75 239.396 194.75 239.396L170.657 246.861L168.013 254.703Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M122.701 272.579C122.701 272.579 138.008 262.144 151.92 260.787C171.258 258.9 193.584 259.412 196.635 258.31C201.88 256.416 214.402 247.963 216.222 244.878C218.042 241.793 224.597 232.105 224.775 229.576C224.953 227.047 214.883 229.901 207.116 235.845C199.35 241.788 188.308 246.847 188.308 246.847L144.071 240.689L122.701 272.579Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M209.498 211.37C209.784 210.961 210.397 211.056 210.557 211.534C211.614 214.695 212.675 218.886 211.996 221.514C210.601 226.91 204.943 242.217 198.938 245.819C198.499 246.083 197.961 245.705 198.037 245.186L198.039 245.172C198.067 244.984 198.176 244.82 198.336 244.726C203.623 241.59 209.303 227.029 210.813 221.187C211.288 219.348 210.756 215.969 209.41 211.954C209.345 211.761 209.375 211.547 209.49 211.381C209.493 211.378 209.495 211.374 209.498 211.37Z",
            fill: "#E5967E"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M172.465 231.77C172.465 231.77 169.645 230.422 167.324 226.46C164.051 220.874 163.859 219.346 163.859 219.346L164.581 230.977L172.465 231.77Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M121.966 220.628C131.348 207.122 155.762 198.327 163.022 197.058C176.6 194.686 186.537 186.207 188.493 187.233C190.45 188.259 192.599 194.95 183.89 202.625C175.616 209.916 165.112 213.056 163.267 219.257C162.538 221.71 155.563 223.151 155.563 223.151C155.563 223.151 118.381 225.789 121.966 220.628Z",
            fill: "#FDBAA0"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M185.826 189.09C186.624 189.442 185.618 190.289 185.301 190.488C185.066 190.637 184.81 190.757 184.563 190.882C183.994 191.171 183.416 191.44 182.839 191.71C181.819 192.188 179.923 193.546 179.278 191.894C179.1 191.441 178.457 191.809 178.633 192.257C179.58 194.684 182.402 192.754 183.858 192.064C184.784 191.625 186.182 191.188 186.673 190.17C187.024 189.442 186.717 188.664 186.025 188.358C185.593 188.167 185.397 188.9 185.826 189.09Z",
            fill: "#E79780"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M202.671 252.247C205.938 248.066 210.6 245.614 214.16 241.77C217.024 238.677 220.179 234.418 220.134 229.914C220.128 229.292 219.191 229.227 219.197 229.852C219.243 234.42 215.8 238.799 212.799 241.811C211.143 243.472 209.252 244.836 207.423 246.278C205.381 247.887 203.503 249.645 201.886 251.715C201.506 252.201 202.295 252.73 202.671 252.247Z",
            fill: "#E5967E"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M123.14 218.36C121.512 221.444 120.556 224.805 120.301 228.308C120.251 228.997 121.287 229.01 121.336 228.325C121.577 225.008 122.492 221.822 124.033 218.903C124.351 218.3 123.461 217.752 123.14 218.36Z",
            fill: "#EF9F8A"
          }
        ),
        /* @__PURE__ */ jsx(
          "mask",
          {
            id: "mask0_13766_20689",
            maskUnits: "userSpaceOnUse",
            x: "33",
            y: "48",
            width: "338",
            height: "257",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M370.753 229.632C363.666 312.255 294.186 317.056 222.043 289.089C196.132 279.047 159.407 278.392 120.149 295.035C84.2442 310.263 27.8935 293.548 33.4013 259.36C41.7732 207.396 74.8462 221.83 52.6366 170.387C36.4429 132.878 45.116 79.559 94.3755 91.2606C131.319 100.037 147.117 82.7912 152.706 73.6199C156.577 67.2679 161.702 61.7169 167.895 57.5118C214.653 25.7681 239.926 86.3272 265.739 71.4745C314.347 43.5079 363.224 71.9897 338.353 117.632C317.624 155.676 374.809 182.338 370.753 229.632Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("g", { mask: "url(#mask0_13766_20689)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M370.753 229.632C363.666 312.255 294.186 317.056 222.043 289.089C196.132 279.047 159.407 278.392 120.149 295.035C84.2442 310.263 27.8935 293.548 33.4013 259.36C41.7732 207.396 74.8462 221.83 52.6366 170.387C36.4429 132.878 45.116 79.559 94.3755 91.2606C131.319 100.037 147.117 82.7912 152.706 73.6199C156.577 67.2679 161.702 61.7169 167.895 57.5118C214.653 25.7681 239.926 86.3272 265.739 71.4745C314.347 43.5079 363.224 71.9897 338.353 117.632C317.624 155.676 374.809 182.338 370.753 229.632Z",
            fill: "#D1EEF7"
          }
        ) }),
        /* @__PURE__ */ jsx(
          "mask",
          {
            id: "mask1_13766_20689",
            maskUnits: "userSpaceOnUse",
            x: "33",
            y: "48",
            width: "338",
            height: "257",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M370.753 229.632C363.666 312.255 294.186 317.056 222.043 289.089C196.132 279.047 159.407 278.392 120.149 295.035C84.2442 310.263 27.8935 293.548 33.4013 259.36C41.7732 207.396 74.8462 221.83 52.6366 170.387C36.4429 132.878 45.116 79.559 94.3755 91.2606C131.319 100.037 147.117 82.7912 152.706 73.6199C156.577 67.2679 161.702 61.7169 167.895 57.5118C214.653 25.7681 239.926 86.3272 265.739 71.4745C314.347 43.5079 363.224 71.9897 338.353 117.632C317.624 155.676 374.809 182.338 370.753 229.632Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("g", { mask: "url(#mask1_13766_20689)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M174.986 209.174V209.177C172.823 218.59 168.031 226.379 161.323 232.658C149.264 243.933 156.903 290.388 154.765 302.87C135.81 306.442 115.143 311.803 87.7876 307.037C89.2772 281.244 99.7185 210.843 96.379 197.292C99.2919 195.986 165.081 166.481 168.358 165.012C170.011 168.079 172.522 174.321 174.099 180.598C176.442 189.834 177.153 199.776 174.986 209.174Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M101.466 227.637C109.312 236.874 115.851 187.805 113.818 176.172C112.442 168.3 112.705 160.434 113.032 155.387C113.647 145.875 112.66 137.249 105.918 135.771C103.16 135.166 102.051 135.835 101.469 138.019C100.983 139.84 100.863 142.715 100.461 146.781C100.165 149.759 99.7173 153.376 98.8616 157.687C95.4356 174.947 89.5514 213.612 101.466 227.637Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M155.164 296.987C155.332 280.8 151.286 247.252 159.468 234.885C159.214 235 142.968 242.39 143.994 253.787C145.029 265.272 149.469 274.896 147.14 283.36C145.011 291.096 149.404 297.877 155.164 296.987Z",
              fill: "#FFD1C3"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M161.04 273.447C160.791 265.078 158.875 263.144 154.315 264.167C152.228 264.634 149.587 265.722 146.297 267.094C143.971 268.066 141.322 269.18 138.313 270.318C124.493 275.548 103.504 259.527 92.7903 257.796C90.6782 257.455 88.9636 257.671 87.7845 258.713C80.6217 265.046 88.794 276.547 83.8114 290.608C81.9371 295.895 80.3057 300.876 79.3462 305.288C82.2315 305.982 85.0438 306.561 87.7879 307.039C115.144 311.806 135.81 306.444 154.766 302.872C158.275 302.21 161.726 301.61 165.148 301.148C163.756 295.343 161.353 283.958 161.04 273.447Z",
              fill: "#FF8F65"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M106.245 259.219C107.644 259.806 109.042 260.394 110.441 260.981C111.322 261.351 111.705 259.859 110.833 259.492C109.435 258.905 108.036 258.318 106.638 257.73C105.757 257.36 105.373 258.853 106.245 259.219Z",
              fill: "#FF8F65"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M159.701 233.294C154.61 236.856 148.404 238.322 142.344 237.356C141.88 237.282 141.679 238.026 142.148 238.101C148.405 239.098 154.808 237.645 160.073 233.96C160.466 233.685 160.097 233.016 159.701 233.294Z",
              fill: "#E79780"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M97.7375 219.738C103.236 225.993 110.045 230.815 117.621 233.877C118.065 234.056 118.257 233.31 117.817 233.132C110.362 230.119 103.668 225.345 98.2595 219.193C97.9373 218.826 97.4163 219.373 97.7375 219.738Z",
              fill: "#E79780"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M118.901 226.391L174.093 224.204C176.439 224.111 178.269 222.046 178.178 219.593L174.491 119.583C174.401 117.132 172.428 115.221 170.084 115.314L114.891 117.501C112.545 117.593 110.715 119.659 110.806 122.112L114.493 222.122C114.584 224.573 116.556 226.484 118.901 226.391Z",
              fill: "#007888"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M118.806 218.45L173.604 216.279C174.51 216.243 175.217 215.446 175.182 214.498L171.683 119.596C171.648 118.649 170.886 117.912 169.981 117.948L115.182 120.119C114.276 120.154 113.57 120.952 113.605 121.899L117.104 216.802C117.138 217.748 117.9 218.486 118.806 218.45Z",
              fill: "#7CCCDB"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M109.686 226.494C109.646 226.494 109.604 226.484 109.566 226.465C100.485 221.683 96.7015 211.536 96.6648 211.435C96.6117 211.291 96.6813 211.128 96.8197 211.073C96.9545 211.021 97.1121 211.092 97.1652 211.236C97.2019 211.335 100.916 221.282 109.806 225.963C109.939 226.034 109.992 226.202 109.925 226.34C109.878 226.438 109.784 226.494 109.686 226.494Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx("g", { opacity: "0.7", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M72.5865 142.26C73.0615 142.26 73.0622 141.488 72.5865 141.488C72.1115 141.488 72.1108 142.26 72.5865 142.26Z",
              fill: "white"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M144.665 220.383C145.467 220.391 146.27 220.398 147.072 220.406C147.438 220.409 147.815 220.383 148.179 220.42C148.743 220.477 150.172 220.729 148.324 221.775C147.743 222.104 146.608 221.952 145.966 221.936C145.586 221.927 145.203 221.916 144.824 221.886C144.62 221.865 144.415 221.844 144.211 221.823C144.049 220.76 144.324 220.288 145.039 220.408C145.513 220.392 145.515 219.62 145.039 219.636C144.02 219.67 142.047 220.306 142.909 221.818C143.242 222.403 143.874 222.552 144.466 222.634C145.607 222.792 146.877 222.787 148.014 222.612C149.018 222.458 150.633 221.489 149.681 220.228C149.357 219.798 148.814 219.703 148.324 219.654C147.124 219.533 145.871 219.623 144.665 219.611C144.19 219.607 144.19 220.379 144.665 220.383Z",
              fill: "#8FD7E3"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M180.009 148.013C179.45 147.928 178.932 148.146 178.613 148.643C178.348 149.057 178.987 149.443 179.25 149.032C179.367 148.851 179.6 148.725 179.813 148.757C180.01 148.787 180.209 148.706 180.267 148.488C180.315 148.306 180.208 148.043 180.009 148.013Z",
              fill: "#E9F4F6"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M156.84 202.088L135.387 203.297C131.368 203.523 127.935 200.301 127.719 196.099L127.661 194.97C127.444 190.769 130.526 187.179 134.544 186.953L155.998 185.744C160.016 185.517 163.449 188.74 163.666 192.941L163.724 194.07C163.94 198.271 160.858 201.861 156.84 202.088Z",
              fill: "#49B2A4"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M136.315 191.984C136.291 191.65 136.53 191.359 136.85 191.335L138.922 191.173C140.469 191.052 141.473 191.939 141.574 193.343C141.685 194.913 140.576 195.818 139.121 195.931L138.615 195.971C138.296 195.995 138.056 196.286 138.08 196.62L138.139 197.446C138.163 197.78 137.923 198.071 137.604 198.095L137.333 198.117C137.014 198.141 136.736 197.891 136.712 197.557L136.315 191.984ZM139.073 194.6C139.786 194.545 140.171 194.066 140.129 193.466C140.081 192.797 139.611 192.473 138.897 192.529L138.373 192.57C138.053 192.595 137.814 192.886 137.838 193.22L137.899 194.084C137.923 194.418 138.201 194.668 138.521 194.643L139.073 194.6Z",
              fill: "white"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M144.416 190.697L144.967 190.654C145.199 190.636 145.419 190.764 145.525 190.98L148.214 196.423C148.405 196.809 148.156 197.274 147.742 197.306L147.513 197.324C147.278 197.342 147.056 197.21 146.951 196.989L146.596 196.244C146.491 196.024 146.269 195.891 146.034 195.91L144.069 196.063C143.834 196.081 143.633 196.246 143.56 196.481L143.315 197.273C143.243 197.507 143.042 197.673 142.807 197.691L142.615 197.706C142.201 197.738 141.889 197.317 142.023 196.906L143.91 191.106C143.985 190.876 144.184 190.715 144.416 190.697ZM145.452 193.832L145.058 193.007C144.963 192.81 144.688 192.832 144.623 193.041L144.345 193.934C144.226 194.317 144.516 194.703 144.9 194.673L144.999 194.665C145.39 194.635 145.627 194.199 145.452 193.832Z",
              fill: "white"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M150.131 194.28L148.076 191.393C147.803 191.009 148.042 190.462 148.498 190.426L148.785 190.404C148.989 190.388 149.186 190.485 149.303 190.661L150.301 192.152C150.552 192.527 151.095 192.487 151.293 192.078L152.089 190.439C152.181 190.25 152.361 190.125 152.563 190.109L152.803 190.091C153.26 190.055 153.574 190.561 153.356 190.983L151.737 194.125C151.685 194.227 151.661 194.343 151.669 194.458L151.806 196.38C151.83 196.714 151.591 197.005 151.271 197.03L151.001 197.051C150.681 197.076 150.403 196.825 150.379 196.491L150.244 194.597C150.236 194.483 150.197 194.373 150.131 194.28Z",
              fill: "white"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M131.229 190.708C131.56 190.154 132.039 189.729 132.639 189.526C133.084 189.375 132.954 188.615 132.503 188.767C131.715 189.034 131.062 189.533 130.621 190.272C130.37 190.693 130.977 191.13 131.229 190.708Z",
              fill: "#9CD9EF"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M134.206 189.071C134.496 189.014 134.786 188.958 135.076 188.901C135.543 188.81 135.408 188.051 134.941 188.142C134.651 188.199 134.361 188.256 134.07 188.313C133.604 188.404 133.739 189.162 134.206 189.071Z",
              fill: "#9CD9EF"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M149.536 201.319C150.211 201.247 150.885 201.176 151.56 201.105C152.033 201.055 151.894 200.296 151.424 200.346C150.75 200.417 150.075 200.489 149.4 200.56C148.928 200.61 149.066 201.368 149.536 201.319Z",
              fill: "#9CD9EF"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M152.823 200.95C153.103 200.98 153.388 200.961 153.66 200.888C153.853 200.837 153.993 200.652 153.955 200.438C153.92 200.243 153.718 200.078 153.524 200.13C153.31 200.187 153.105 200.204 152.886 200.18C152.412 200.129 152.352 200.898 152.823 200.95Z",
              fill: "#9CD9EF"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M154.389 169.556C160.455 163.214 160.455 152.931 154.389 146.588C148.323 140.246 138.488 140.246 132.423 146.588C126.357 152.931 126.357 163.214 132.423 169.556C138.488 175.899 148.323 175.899 154.389 169.556Z",
              fill: "#49B2A4"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M133.784 159.041C135.644 162.26 138.038 165.153 140.856 167.493C141.342 167.896 141.797 168.121 142.43 168.032C143 167.952 143.508 167.631 143.798 167.097C146.159 162.759 148.745 158.558 151.207 154.283C151.83 153.202 152.447 152.118 153.044 151.021C153.528 150.13 153.273 148.839 152.372 148.341C151.482 147.85 150.326 148.093 149.809 149.044C147.448 153.382 144.862 157.583 142.4 161.858C141.778 162.938 141.16 164.023 140.563 165.119C141.544 164.987 142.525 164.855 143.506 164.723C142.176 163.619 140.938 162.398 139.813 161.068C139.544 160.749 139.28 160.424 139.024 160.093C138.91 159.946 138.787 159.711 138.644 159.593C138.924 159.825 138.742 159.725 138.649 159.594C138.581 159.5 138.513 159.405 138.446 159.309C137.939 158.583 137.464 157.834 137.019 157.064C136.512 156.187 135.315 155.782 134.456 156.361C133.614 156.929 133.242 158.103 133.784 159.041Z",
              fill: "#E9F4F6"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "mask",
          {
            id: "mask2_13766_20689",
            maskUnits: "userSpaceOnUse",
            x: "33",
            y: "48",
            width: "338",
            height: "257",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M370.753 229.632C363.666 312.255 294.186 317.056 222.043 289.089C196.132 279.047 159.407 278.392 120.149 295.035C84.2442 310.263 27.8935 293.548 33.4013 259.36C41.7732 207.396 74.8462 221.83 52.6366 170.387C36.4429 132.878 45.116 79.559 94.3755 91.2606C131.319 100.037 147.117 82.7912 152.706 73.6199C156.577 67.2679 161.702 61.7169 167.895 57.5118C214.653 25.7681 239.926 86.3272 265.739 71.4745C314.347 43.5079 363.224 71.9897 338.353 117.632C317.624 155.676 374.809 182.338 370.753 229.632Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("g", { mask: "url(#mask2_13766_20689)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M269.399 54.1289L307.984 87.1452C301.669 119.451 299.565 130.378 299.546 130.401C298.662 132.02 294.056 139.811 293.236 143.56C286.522 142.693 282.921 142.227 280.067 141.861C280.033 141.875 234.469 159.932 234.446 159.912C235.768 157.567 262.612 114.811 264.964 98.4046C264.964 98.4046 264.963 98.4032 264.964 98.4016C265.052 97.8126 264.988 98.0131 265.073 97.9047C265.982 96.7439 267.126 78.1936 268.251 55.5957L269.399 54.1289Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M242.35 149.735C242.824 150.189 249.382 162.127 250.508 160.206C254.905 152.708 263.911 147.785 268.014 148.727C275.872 150.531 275.947 159.542 275.903 160.534L287.629 132.711C286.565 126.703 277.232 94.9051 275.417 95.6122C267.972 98.5123 241.14 148.578 242.35 149.735Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M274.532 125.468C274.532 125.468 237.611 154.576 234.446 159.912C231.281 165.249 238.089 181.522 240.758 186.386C243.427 191.25 258.703 197.12 262.109 195.861C266.289 194.316 260.383 186.416 254.554 182.191C249.199 178.31 248.649 170.042 247.77 167.462C247.18 165.731 251.014 158.036 255.026 154.567C262.713 147.919 274.987 155.11 274.987 155.11L274.532 125.468Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M248.393 133.487C248.393 133.487 227.22 157.205 226.544 165.752C225.867 174.299 226.495 183.662 230.83 187.663C235.166 191.663 246.276 197.881 247.766 197.075C249.255 196.269 246.742 188.251 242.93 183.664C239.117 179.076 240.308 162.523 240.308 162.523L251.674 140.65L248.393 133.487Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M267.289 89.7451C267.289 89.7451 263.739 107.503 255.273 118.129C243.504 132.899 228.184 148.128 226.846 151.004C224.545 155.948 221.587 170.417 222.354 173.779C223.12 177.142 224.965 188.286 226.476 190.126C227.987 191.965 232.908 183.004 234.291 173.554C235.674 164.104 239.827 152.969 239.827 152.969L273.499 126.284L267.289 89.7451Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M255.475 34.5406C254.595 52.5792 255.296 107.024 260.085 107.177C260.422 107.184 260.783 107.102 261.144 106.955C268.257 103.946 277.805 102.191 284.253 104.124C284.532 104.189 285.109 104.384 285.115 104.388C289.273 105.609 295.028 108.25 295.119 108.327C297.154 109.344 303.101 111.866 303.16 111.859C305.094 112.532 307.942 113.432 309.854 112.686C312.126 111.515 337.027 44.6501 339.091 34.888L309.829 -6.98535L255.475 34.5406Z",
              fill: "#00ADC8"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M248.473 191.825C248.544 192.303 248.072 192.666 247.657 192.453C244.908 191.047 241.494 188.944 240.256 186.688C237.714 182.055 231.645 167.725 233.354 161.092C233.479 160.607 234.084 160.488 234.368 160.894L234.375 160.904C234.478 161.051 234.51 161.238 234.464 161.414C232.935 167.229 238.508 181.068 241.261 186.084C242.128 187.664 244.664 189.583 248.156 191.368C248.324 191.454 248.442 191.619 248.471 191.813C248.472 191.817 248.472 191.821 248.473 191.825Z",
              fill: "#E5967E"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M260.177 152.145C260.177 152.145 262.939 151.092 267.051 152.16C272.848 153.665 273.962 154.568 273.962 154.568L265.981 147.184L260.177 152.145Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M295.055 177.046L289.61 190.725L288.016 194.731L266.047 249.934C264.905 252.803 261.757 254.16 259.014 252.966L222.577 237.113C219.834 235.92 218.535 232.628 219.676 229.759L229.372 205.395L232.484 197.573L248.684 156.871C249.826 154.002 252.975 152.645 255.718 153.838L292.155 169.692C294.898 170.885 296.196 174.178 295.055 177.046Z",
              fill: "#FF8F65"
            }
          ),
          /* @__PURE__ */ jsx("g", { opacity: "0.45", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M295.055 177.046L289.61 190.725C272.881 194.222 244.28 196.601 232.484 197.573L248.684 156.871C249.826 154.002 252.975 152.645 255.717 153.838L292.154 169.692C294.898 170.885 296.195 174.179 295.055 177.046Z",
              fill: "#FFB39B"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M243.117 223.013L238.353 234.983C238 235.871 237.025 236.291 236.176 235.922L226.095 231.535C225.246 231.166 224.844 230.147 225.197 229.259L229.961 217.289C230.314 216.402 231.289 215.981 232.138 216.351L242.219 220.737C243.068 221.107 243.47 222.126 243.117 223.013Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M272.076 161.098L238.933 244.377L248.259 248.435L281.402 165.155L272.076 161.098Z",
              fill: "#384955"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M255.932 245.051C257.482 240.892 259.152 236.783 260.94 232.729C261.268 231.986 260.181 231.411 259.852 232.157C258.063 236.211 256.393 240.32 254.843 244.479C254.56 245.237 255.647 245.816 255.932 245.051Z",
              fill: "#384955"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M263.404 226.845C265.186 222.335 266.928 217.808 268.628 213.265C268.912 212.508 267.825 211.928 267.539 212.693C265.839 217.237 264.097 221.763 262.315 226.273C262.018 227.026 263.104 227.604 263.404 226.845Z",
              fill: "#384955"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M259.338 246.535C261.961 239.905 264.79 233.367 267.82 226.929C268.166 226.194 267.078 225.62 266.731 226.357C263.701 232.795 260.872 239.333 258.249 245.963C257.951 246.716 259.038 247.294 259.338 246.535Z",
              fill: "#384955"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M230.539 233.664C230.883 232.574 231.227 231.484 231.571 230.394C231.803 229.656 232.231 228.817 231.823 228.067C231.455 227.39 230.612 227.1 229.972 226.813C228.967 226.362 227.941 225.969 226.901 225.613C226.32 225.415 226.137 226.394 226.715 226.592C227.516 226.866 228.306 227.166 229.085 227.502C229.661 227.749 230.816 228.032 230.966 228.725C231.11 229.393 230.579 230.376 230.377 231.016C230.119 231.834 229.861 232.651 229.603 233.469C229.412 234.076 230.348 234.267 230.539 233.664Z",
              fill: "#FF8F65"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M227.197 223.799C228.416 224.377 229.636 224.954 230.856 225.532C231.466 225.821 232.076 226.11 232.686 226.399C233.299 226.689 234.369 226.962 234.654 227.59C234.946 228.237 234.49 229.072 234.251 229.696C234.004 230.339 233.756 230.983 233.509 231.626C232.994 232.966 232.478 234.306 231.963 235.647C231.736 236.238 232.586 236.691 232.815 236.094C233.434 234.486 234.052 232.878 234.67 231.269C235.098 230.157 236.012 228.53 235.734 227.269C235.602 226.675 235.118 226.463 234.639 226.23C233.829 225.837 233.012 225.46 232.199 225.074C230.674 224.352 229.15 223.63 227.625 222.908C227.067 222.644 226.636 223.533 227.197 223.799Z",
              fill: "#FF8F65"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M229.219 218.991C230.041 219.409 230.869 219.814 231.706 220.197C232.246 220.445 232.882 220.849 233.483 220.594C234.026 220.363 234.402 219.709 234.722 219.231C235.197 218.52 235.583 217.766 235.9 216.965C236.134 216.376 235.284 215.923 235.048 216.517C234.701 217.394 233.999 219.32 233.054 219.528C232.502 219.65 231.856 219.181 231.352 218.941C230.78 218.669 230.212 218.387 229.648 218.1C229.096 217.819 228.666 218.709 229.219 218.991Z",
              fill: "#FF8F65"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M228.416 221.159C229.763 221.857 231.109 222.555 232.456 223.253C233.181 223.629 233.907 224.005 234.632 224.381C235.132 224.641 235.662 224.996 236.23 225.049C237.197 225.14 237.74 224.325 238.2 223.565C239 222.245 239.79 220.918 240.585 219.594C240.911 219.051 240.057 218.607 239.733 219.146C239.144 220.127 238.555 221.107 237.966 222.088C237.675 222.572 237.414 223.108 237.073 223.556C236.529 224.268 235.872 223.911 235.215 223.571C233.092 222.47 230.968 221.369 228.844 220.268C228.295 219.983 227.865 220.873 228.416 221.159Z",
              fill: "#FF8F65"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M244.394 224.742C243.403 224.191 241.601 223.177 240.458 223.719C240.044 223.916 239.829 224.304 239.622 224.703C239.192 225.529 238.827 226.402 238.461 227.261C238.095 228.123 237.747 228.994 237.421 229.874C237.201 230.467 236.826 231.157 236.808 231.798C236.773 233.036 238.356 233.739 239.293 234C239.886 234.165 240.072 233.187 239.48 233.022C238.989 232.885 238.461 232.667 238.087 232.291C237.575 231.775 237.939 231.233 238.151 230.652C238.533 229.605 238.944 228.569 239.383 227.547C239.732 226.732 240.137 225.166 240.91 224.767C241.766 224.326 243.186 225.199 243.966 225.633C244.508 225.935 244.936 225.044 244.394 224.742Z",
              fill: "#FF8F65"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M242.318 182.842C245.004 184.133 247.723 185.344 250.475 186.473C251.237 186.786 251.82 185.591 251.051 185.275C248.299 184.145 245.58 182.935 242.894 181.644C242.146 181.284 241.567 182.481 242.318 182.842Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M243.416 182.175C243.664 181.031 244.164 179.307 245.625 179.981C246.895 180.567 246.325 182.072 245.908 183.07C245.579 183.858 246.723 184.465 247.054 183.673C247.818 181.843 248.151 179.539 245.963 178.687C243.715 177.811 242.582 179.956 242.158 181.913C241.976 182.754 243.234 183.018 243.416 182.175Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M246.948 184.245C247.357 183.462 247.562 182.574 248 181.809C248.52 180.9 249.331 180.711 250.277 180.906C250.699 180.992 251.191 181.099 251.322 181.577C251.428 181.962 251.171 182.468 251.04 182.82C250.69 183.76 250.336 184.699 249.984 185.638C250.318 185.572 250.652 185.507 250.987 185.441C250.912 185.374 250.837 185.308 250.762 185.24C250.248 184.573 249.169 185.299 249.687 185.971C249.838 186.167 249.933 186.287 250.127 186.437C250.429 186.671 250.964 186.682 251.13 186.24C251.85 184.318 254.027 180.642 251.019 179.715C250 179.402 248.843 179.343 247.918 179.964C246.693 180.786 246.453 182.398 245.801 183.642C245.405 184.4 246.552 185.001 246.948 184.245Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M250.566 174.281C249.928 174.898 249.621 176.076 249.835 176.963C250.042 177.819 250.831 178.42 251.619 178.631C252.49 178.864 253.391 178.678 253.91 177.874C254.395 177.121 254.772 176.126 254.145 175.334C253.624 174.675 252.544 175.401 253.069 176.065C253.319 176.381 253.065 176.928 252.805 177.191C252.515 177.484 252.023 177.403 251.674 177.236C251.374 177.093 251.109 176.868 251.065 176.515C251.008 176.049 251.198 175.49 251.518 175.18C252.124 174.593 251.167 173.699 250.566 174.281Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M250.105 174.644C251.011 174.912 254.753 176.899 255.16 175.103C255.35 174.264 254.092 174.001 253.901 174.841C253.895 174.871 253.888 174.901 253.881 174.931C254.024 174.762 254.166 174.594 254.309 174.425C253.775 174.648 252.782 174.216 252.273 174.024C251.636 173.783 251.009 173.522 250.356 173.329C249.562 173.094 249.314 174.41 250.105 174.644Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M251.449 171.106C252.757 171.616 254.024 172.212 255.256 172.898C255.984 173.304 256.56 172.106 255.831 171.7C254.6 171.014 253.333 170.418 252.025 169.908C251.26 169.609 250.676 170.804 251.449 171.106Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M253.604 170.098C253.232 169.515 253.491 168.724 254.22 168.698C254.908 168.673 255.753 169.105 256.379 169.363C257.141 169.678 257.724 168.483 256.955 168.165C255.809 167.692 254.295 166.924 253.122 167.683C252.074 168.362 251.862 169.785 252.528 170.829C252.987 171.548 254.062 170.817 253.604 170.098Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M253.715 165.208C255.025 165.612 256.296 166.149 257.555 166.702C258.312 167.034 258.893 165.839 258.131 165.504C256.767 164.905 255.386 164.331 253.965 163.892C253.175 163.648 252.927 164.965 253.715 165.208Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M256.83 164.812C256.79 163.595 256.16 162.288 255.42 161.37C255.195 161.091 254.85 160.962 254.532 161.173C254.268 161.348 254.121 161.824 254.344 162.101C254.95 162.851 255.517 163.895 255.55 164.897C255.578 165.76 256.859 165.676 256.83 164.812Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M256.467 163.941C257.226 163.779 257.985 163.616 258.743 163.453C259.083 163.381 259.25 162.921 259.151 162.606C259.031 162.229 258.681 162.107 258.34 162.18C257.582 162.343 256.823 162.506 256.064 162.668C255.725 162.741 255.557 163.2 255.657 163.516C255.777 163.893 256.127 164.014 256.467 163.941Z",
              fill: "#FFB39B"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M301.258 124.47C303.666 140.178 292.943 163.176 288.886 169.102C281.299 180.184 280.093 192.868 278.118 193.537C276.143 194.206 270.385 191.167 271.285 179.885C272.14 169.167 277.169 159.708 274.41 154.216C273.319 152.043 277.073 146.199 277.073 146.199C277.073 146.199 300.338 118.469 301.258 124.47Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M278.715 190.424C277.952 190.741 278.082 189.465 278.166 189.109C278.228 188.844 278.323 188.584 278.408 188.326C278.603 187.733 278.818 187.148 279.032 186.562C279.408 185.527 279.806 183.283 281.304 183.953C281.715 184.137 281.91 183.438 281.503 183.257C279.302 182.272 278.652 185.549 278.119 187.033C277.78 187.977 277.123 189.249 277.45 190.282C277.684 191.02 278.391 191.334 279.053 191.059C279.467 190.887 279.126 190.253 278.715 190.424Z",
              fill: "#E79780"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M226.709 159.332C227.211 164.448 225.661 169.364 225.749 174.456C225.82 178.552 226.447 183.643 229.381 186.667C229.787 187.085 230.458 186.475 230.05 186.055C227.075 182.988 226.563 177.615 226.637 173.478C226.678 171.196 227.068 168.952 227.367 166.697C227.7 164.18 227.828 161.678 227.579 159.146C227.521 158.55 226.65 158.742 226.709 159.332Z",
              fill: "#E5967E"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M301.925 126.823C301.03 123.596 299.505 120.649 297.418 118.095C297.007 117.593 296.304 118.306 296.712 118.806C298.689 121.224 300.128 124.023 300.976 127.078C301.151 127.709 302.101 127.459 301.925 126.823Z",
              fill: "#EF9F8A"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "mask",
          {
            id: "mask3_13766_20689",
            maskUnits: "userSpaceOnUse",
            x: "33",
            y: "48",
            width: "338",
            height: "257",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M370.753 229.632C363.666 312.255 294.186 317.056 222.043 289.089C196.132 279.047 159.407 278.392 120.149 295.035C84.2442 310.263 27.8935 293.548 33.4013 259.36C41.7732 207.396 74.8462 221.83 52.6366 170.387C36.4429 132.878 45.116 79.559 94.3755 91.2606C131.319 100.037 147.117 82.7912 152.706 73.6199C156.577 67.2679 161.702 61.7169 167.895 57.5118C214.653 25.7681 239.926 86.3272 265.739 71.4745C314.347 43.5079 363.224 71.9897 338.353 117.632C317.624 155.676 374.809 182.338 370.753 229.632Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("g", { mask: "url(#mask3_13766_20689)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M179.558 140.246C172.966 141.353 166.428 143.151 167.949 151.21C169.462 159.231 183.33 156.887 184.679 150.436C185.381 147.081 184.859 139.355 179.558 140.246Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M180.671 144.71C180.671 144.71 181.743 148.779 180.813 150.174C179.883 151.568 176.411 153.366 176.003 153.076C175.596 152.787 176.02 150.678 175.5 148.26C175.093 146.37 173.507 144.698 174.382 144.075C175.258 143.452 180.221 143.3 180.671 144.71Z",
              fill: "#D44D2C"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M183.499 153.618C176.29 154.465 169.104 156.057 170.346 164.811C171.582 173.524 186.749 171.727 188.54 164.855C189.471 161.281 189.297 152.938 183.499 153.618Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M184.907 158.927C184.907 158.927 186.149 162.624 185.069 164.076C183.99 165.529 179.417 167.574 178.99 167.241C178.562 166.908 179.13 164.661 178.688 162.031C178.342 159.976 176.705 158.093 177.687 157.468C178.669 156.843 184.49 157.385 184.907 158.927Z",
              fill: "#D44D2C"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M179.153 167.953C172.457 169.633 165.869 172.017 168.048 180.184C170.216 188.311 184.303 184.763 185.199 178.016C185.665 174.508 184.539 166.603 179.153 167.953Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M180.824 172.959C180.824 172.959 182.433 176.735 181.583 178.246C180.732 179.757 176.915 181.708 176.474 181.443C176.032 181.179 176.308 178.975 175.589 176.53C175.026 174.619 173.267 173.029 174.12 172.316C174.973 171.604 180.253 171.546 180.824 172.959Z",
              fill: "#D44D2C"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M177.053 182.066C171.88 183.485 166.803 185.45 168.626 191.753C170.439 198.027 181.321 195.03 181.908 189.776C182.214 187.044 181.213 180.925 177.053 182.066Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M178.481 185.782C178.481 185.782 179.47 188.505 178.834 189.693C178.198 190.881 175.534 192.786 175.187 192.589C174.84 192.391 175.019 190.675 174.421 188.789C173.954 187.315 172.562 186.11 173.213 185.542C173.865 184.974 178.015 184.694 178.481 185.782Z",
              fill: "#D44D2C"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M173.992 156.325C173.944 156.325 173.898 156.299 173.875 156.251C173.844 156.184 173.87 156.101 173.935 156.068C176.642 154.671 182.526 153.604 182.585 153.593C182.648 153.591 182.723 153.632 182.735 153.704C182.747 153.778 182.699 153.85 182.629 153.863C182.57 153.872 176.723 154.933 174.049 156.312C174.031 156.321 174.012 156.325 173.992 156.325Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M177.468 170.276C175.898 170.276 174.447 170.148 173.71 169.753C173.647 169.718 173.62 169.636 173.654 169.568C173.686 169.503 173.766 169.481 173.829 169.509C175.807 170.579 183.525 169.586 183.601 169.575C183.673 169.564 183.737 169.62 183.746 169.692C183.754 169.769 183.704 169.836 183.632 169.845C183.427 169.871 180.26 170.276 177.468 170.276Z",
              fill: "#FDBAA0"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M173.541 184.739C172.623 184.739 171.845 184.621 171.384 184.309C171.324 184.27 171.307 184.185 171.346 184.122C171.386 184.061 171.467 184.041 171.526 184.083C173.32 185.296 180.683 183.296 180.756 183.274C180.829 183.244 180.896 183.298 180.915 183.37C180.933 183.444 180.891 183.518 180.822 183.536C180.59 183.601 176.391 184.739 173.541 184.739Z",
              fill: "#FDBAA0"
            }
          )
        ] })
      ]
    }
  );
}
function SelectPaymentIcon({
  className
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "350",
      height: "350",
      viewBox: "0 0 400 400",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.7",
            d: "M54.3444 133.669C54.3444 133.669 32.0428 191.259 63.382 249.271C94.7212 307.284 159.285 337.913 210.957 364.11C262.629 390.307 316.286 377.549 341.784 334.639C367.283 291.73 332.308 261.097 332.267 199.905C332.226 138.713 341.424 122.511 308.296 70.8137C275.168 19.1153 193.849 7.67375 132.376 46.0169C70.9044 84.3601 54.3444 133.669 54.3444 133.669Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M105.635 342.058C124.515 361.99 170.867 354.69 190.944 342.058C256.111 301.054 370.34 232.804 375.51 133.924C377.708 91.895 340.649 69.827 325.164 63.3526C287.978 47.8046 247.182 43.1374 206.917 41.3366C164.861 39.4558 119.747 40.9206 81.8686 61.4398C67.5214 69.2118 53.9862 79.1798 44.7206 92.787C35.3086 106.609 29.8934 123.07 28.4566 139.685C26.1398 166.486 33.3502 193.359 44.2534 217.951C55.1566 242.543 69.6974 265.313 83.043 288.67C91.7502 303.909 89.7286 325.266 105.635 342.058Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.7",
            d: "M105.635 342.058C124.515 361.99 170.867 354.69 190.944 342.058C256.111 301.054 370.34 232.804 375.51 133.924C377.708 91.895 340.649 69.827 325.164 63.3526C287.978 47.8046 247.182 43.1374 206.917 41.3366C164.861 39.4558 119.747 40.9206 81.8686 61.4398C67.5214 69.2118 53.9862 79.1798 44.7206 92.787C35.3086 106.609 29.8934 123.07 28.4566 139.685C26.1398 166.486 33.3502 193.359 44.2534 217.951C55.1566 242.543 69.6974 265.313 83.043 288.67C91.7502 303.909 89.7286 325.266 105.635 342.058Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M104.186 140.066L65.9461 128.478C64.4621 128.028 63.6229 126.46 64.0733 124.975L70.8965 102.459C71.3461 100.975 72.9141 100.136 74.3989 100.587L112.639 112.174C114.123 112.624 114.962 114.192 114.512 115.676L107.689 138.192C107.238 139.676 105.67 140.515 104.186 140.066Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M69.7417 106.269L113.357 119.485",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M68.4141 110.649L112.029 123.866",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M98.7626 132.049C98.5282 132.822 98.6386 133.616 99.0082 134.272C98.3866 134.585 97.6346 134.666 96.9074 134.446C95.4066 133.992 94.5562 132.413 95.0106 130.913C95.465 129.412 97.0514 128.564 98.5522 129.018C99.2794 129.239 99.8578 129.732 100.201 130.337C99.529 130.676 98.9962 131.275 98.7626 132.049Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M104.194 133.691C103.74 135.191 102.156 136.039 100.656 135.584C99.1556 135.13 98.3084 133.546 98.7628 132.046C99.2172 130.546 100.801 129.699 102.301 130.153C103.8 130.608 104.648 132.192 104.194 133.691Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M366.524 190.719L334.805 181.108C333.321 180.658 332.482 179.09 332.933 177.606L338.492 159.26C338.941 157.776 340.509 156.937 341.993 157.387L373.712 166.998C375.196 167.448 376.035 169.016 375.585 170.501L370.025 188.846C369.576 190.33 368.008 191.169 366.524 190.719Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M337.631 162.098L374.724 173.338",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M336.502 165.823L373.596 177.063",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M362.314 184.023C362.115 184.681 362.208 185.356 362.523 185.914C361.994 186.18 361.355 186.249 360.736 186.062C359.46 185.675 358.736 184.332 359.123 183.056C359.51 181.78 360.859 181.059 362.135 181.445C362.754 181.632 363.246 182.051 363.538 182.567C362.966 182.856 362.513 183.366 362.314 184.023Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M366.932 185.42C366.545 186.695 365.198 187.416 363.923 187.029C362.648 186.643 361.927 185.296 362.313 184.021C362.7 182.745 364.047 182.025 365.322 182.411C366.597 182.797 367.318 184.145 366.932 185.42Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M322.935 79.3673L276.627 100.57L287.656 124.658L333.964 103.455L322.935 79.3673Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M329.991 99.9606L322.983 84.6558C321.619 85.2806 320.008 84.6806 319.383 83.3174L281.954 100.456C282.579 101.82 281.979 103.431 280.616 104.056L287.624 119.36C288.988 118.735 290.599 119.335 291.224 120.698L328.653 103.56C328.028 102.197 328.627 100.585 329.991 99.9606Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M309.542 107.532C312.591 105.19 313.164 100.819 310.821 97.7696C308.479 94.7204 304.108 94.1474 301.059 96.4899C298.01 98.8325 297.437 103.203 299.779 106.253C302.122 109.302 306.493 109.875 309.542 107.532Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M307.192 105.391L307.713 106.527L307.219 106.754L306.703 105.627C305.711 106.021 304.638 106.081 303.927 105.809L303.956 105.114C304.614 105.351 305.56 105.325 306.413 104.994L305.222 102.393C304.012 102.624 302.75 102.795 302.152 101.49C301.718 100.54 302.024 99.4074 303.483 98.5954L302.962 97.4578L303.456 97.2314L303.972 98.3586C304.728 98.049 305.568 97.9266 306.26 98.053L306.28 98.7498C305.564 98.6474 304.844 98.7498 304.257 98.9818L305.457 101.603C306.696 101.358 308.019 101.135 308.625 102.461C309.066 103.42 308.724 104.582 307.192 105.391ZM304.905 101.701L303.773 99.229C302.796 99.7842 302.58 100.517 302.865 101.14C303.21 101.891 303.999 101.864 304.905 101.701ZM307.923 102.831C307.565 102.051 306.721 102.114 305.776 102.295L306.908 104.767C307.959 104.191 308.212 103.464 307.923 102.831Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M66.4024 188.676L30.9277 191.741L32.5224 210.193L67.997 207.128L66.4024 188.676Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M66.2027 203.889L65.1891 192.165C64.1443 192.255 63.2243 191.481 63.1339 190.437L34.4619 192.916C34.5523 193.961 33.7787 194.881 32.7339 194.971L33.7475 206.695C34.7923 206.605 35.7123 207.378 35.8027 208.423L64.4747 205.944C64.3843 204.899 65.1587 203.979 66.2027 203.889Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M54.3182 199.01C54.5494 201.689 52.5662 204.047 49.8878 204.279C47.2094 204.51 44.8502 202.527 44.619 199.849C44.387 197.17 46.371 194.811 49.0494 194.58C51.7278 194.349 54.087 196.332 54.3182 199.01Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M49.9175 202.099L49.9927 202.971L49.6143 203.003L49.5399 202.14C48.7943 202.167 48.0735 201.954 47.6695 201.607L47.8519 201.157C48.2295 201.468 48.8583 201.673 49.4983 201.655L49.3263 199.663C48.4751 199.531 47.6047 199.347 47.5183 198.347C47.4551 197.619 47.9239 196.946 49.0751 196.755L48.9999 195.883L49.3783 195.851L49.4527 196.714C50.0231 196.687 50.6055 196.805 51.0311 197.051L50.8807 197.514C50.4327 197.278 49.9359 197.176 49.4943 197.191L49.6679 199.199C50.5415 199.329 51.4639 199.494 51.5519 200.509C51.6143 201.243 51.1159 201.927 49.9175 202.099ZM49.2791 199.133L49.1151 197.239C48.3407 197.375 48.0263 197.807 48.0679 198.284C48.1183 198.859 48.6447 199.027 49.2791 199.133ZM50.9999 200.587C50.9479 199.988 50.3775 199.831 49.7127 199.729L49.8767 201.623C50.7039 201.49 51.0415 201.071 50.9999 200.587Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M355.465 90.1709C359.31 90.1709 362.427 87.0537 362.427 83.2085C362.427 79.3633 359.31 76.2461 355.465 76.2461C351.62 76.2461 348.502 79.3633 348.502 83.2085C348.502 87.0537 351.62 90.1709 355.465 90.1709Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M355.775 87.0703V88.3207H355.231V87.0807C354.165 87.0263 353.165 86.6343 352.631 86.0911L352.947 85.4711C353.447 85.9607 354.318 86.3303 355.231 86.3847V83.5239C354.035 83.2303 352.816 82.8607 352.816 81.4247C352.816 80.3807 353.567 79.4775 355.231 79.3471V78.0967H355.775V79.3367C356.591 79.3695 357.407 79.6087 357.983 80.0111L357.711 80.6527C357.102 80.2615 356.406 80.0551 355.775 80.0223V82.9047C357.004 83.1983 358.299 83.5463 358.299 85.0039C358.299 86.0591 357.504 86.9727 355.775 87.0703ZM355.231 82.7631V80.0439C354.111 80.1423 353.611 80.7183 353.611 81.4039C353.611 82.2303 354.339 82.5343 355.231 82.7631ZM357.504 85.0471C357.504 84.1879 356.711 83.8943 355.775 83.6655V86.3847C356.971 86.2975 357.504 85.7431 357.504 85.0471Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M309.622 176.303C313.364 175.42 315.683 171.671 314.801 167.929C313.919 164.186 310.17 161.867 306.427 162.75C302.685 163.632 300.366 167.381 301.248 171.123C302.13 174.866 305.879 177.185 309.622 176.303Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M306.276 172.986L305.621 174.051L305.158 173.766L305.807 172.71C304.927 172.106 304.279 171.248 304.11 170.506L304.703 170.143C304.873 170.822 305.421 171.593 306.171 172.118L307.669 169.681C306.803 168.804 305.959 167.851 306.711 166.628C307.258 165.738 308.37 165.362 309.855 166.123L310.511 165.058L310.974 165.342L310.325 166.398C311.003 166.854 311.572 167.484 311.852 168.13L311.285 168.534C310.971 167.881 310.486 167.341 309.966 166.982L308.456 169.438C309.349 170.331 310.27 171.306 309.507 172.547C308.955 173.446 307.8 173.808 306.276 172.986ZM308.068 169.032L309.492 166.715C308.487 166.212 307.758 166.441 307.399 167.025C306.967 167.729 307.428 168.37 308.068 169.032ZM308.808 172.168C309.258 171.436 308.735 170.77 308.059 170.086L306.635 172.402C307.699 172.954 308.444 172.761 308.808 172.168Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M208.147 35.188C209.745 38.6856 208.205 42.816 204.708 44.4144C201.21 46.0128 197.08 44.4728 195.481 40.9752C193.883 37.4776 195.423 33.3464 198.92 31.7488C202.418 30.1504 206.549 31.6904 208.147 35.188Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M203.701 41.4643L204.221 42.6019L203.727 42.8283L203.211 41.7003C202.219 42.0939 201.147 42.1531 200.435 41.8803L200.465 41.1851C201.123 41.4227 202.068 41.3971 202.923 41.0667L201.734 38.4651C200.523 38.6955 199.262 38.8651 198.665 37.5595C198.231 36.6099 198.539 35.4763 199.998 34.6667L199.478 33.5291L199.972 33.3027L200.487 34.4307C201.243 34.1219 202.084 34.0003 202.776 34.1267L202.795 34.8227C202.079 34.7203 201.359 34.8211 200.772 35.0539L201.97 37.6755C203.21 37.4323 204.531 37.2107 205.138 38.5363C205.575 39.4955 205.233 40.6563 203.701 41.4643ZM201.416 37.7723L200.286 35.2995C199.307 35.8547 199.091 36.5867 199.376 37.2099C199.72 37.9619 200.51 37.9355 201.416 37.7723ZM204.432 38.9051C204.075 38.1235 203.231 38.1867 202.286 38.3675L203.415 40.8403C204.467 40.2643 204.722 39.5387 204.432 38.9051Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M184.704 317.062C187.104 322.314 184.792 328.517 179.539 330.917C174.287 333.317 168.084 331.004 165.684 325.752C163.284 320.5 165.596 314.297 170.848 311.897C176.101 309.498 182.304 311.81 184.704 317.062Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M178.028 326.487L178.808 328.195L178.066 328.535L177.292 326.841C175.802 327.432 174.192 327.521 173.124 327.111L173.168 326.067C174.156 326.424 175.576 326.386 176.858 325.89L175.073 321.983C173.255 322.328 171.361 322.583 170.465 320.623C169.813 319.196 170.276 317.495 172.467 316.279L171.686 314.571L172.428 314.231L173.202 315.925C174.336 315.461 175.6 315.279 176.639 315.468L176.668 316.514C175.591 316.359 174.512 316.511 173.63 316.86L175.428 320.797C177.29 320.431 179.276 320.099 180.185 322.089C180.843 323.531 180.328 325.275 178.028 326.487ZM174.596 320.943L172.9 317.23C171.431 318.063 171.106 319.163 171.534 320.099C172.05 321.227 173.236 321.188 174.596 320.943ZM179.126 322.645C178.59 321.472 177.323 321.566 175.903 321.838L177.6 325.551C179.179 324.686 179.56 323.595 179.126 322.645Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M34.9245 154.579C30.5869 158.39 23.9805 157.963 20.1693 153.626C16.3581 149.288 16.7853 142.682 21.1229 138.87C25.4605 135.059 32.0669 135.486 35.8781 139.824C39.6901 144.162 39.2629 150.768 34.9245 154.579Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M23.9756 150.902L22.5644 152.142L22.0252 151.528L23.4236 150.299C22.4276 149.043 21.8788 147.526 21.9636 146.385L22.9756 146.127C22.9188 147.175 23.3644 148.524 24.2092 149.609L27.4364 146.774C26.5812 145.132 25.7916 143.392 27.4108 141.969C28.5884 140.934 30.3516 140.887 32.1476 142.635L33.5588 141.395L34.098 142.008L32.6996 143.237C33.4708 144.19 34.01 145.347 34.1268 146.396L33.134 146.725C32.9716 145.65 32.5148 144.659 31.9268 143.916L28.6748 146.773C29.5612 148.451 30.4516 150.256 28.8076 151.7C27.6172 152.746 25.7996 152.755 23.9756 150.902ZM28.2956 146.019L31.3628 143.324C30.142 142.158 28.9956 142.163 28.222 142.843C27.29 143.663 27.6692 144.787 28.2956 146.019ZM27.9716 150.847C28.9404 149.995 28.4852 148.808 27.8164 147.527L24.7492 150.223C26.0324 151.486 27.186 151.537 27.9716 150.847Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M81.1293 239.302C82.9141 241.444 82.6245 244.627 80.4821 246.412C78.3397 248.197 75.1565 247.907 73.3717 245.765C71.5869 243.622 71.8765 240.439 74.0189 238.654C76.1613 236.87 79.3445 237.159 81.1293 239.302Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M79.2157 244.54L79.7965 245.237L79.4933 245.489L78.9173 244.799C78.2981 245.263 77.5589 245.509 77.0093 245.454L76.8973 244.962C77.4029 245.003 78.0597 244.804 78.5941 244.411L77.2661 242.817C76.4629 243.209 75.6125 243.568 74.9461 242.768C74.4613 242.187 74.4605 241.335 75.3269 240.49L74.7461 239.793L75.0493 239.541L75.6245 240.231C76.0941 239.871 76.6597 239.626 77.1677 239.583L77.3141 240.066C76.7933 240.131 76.3093 240.339 75.9429 240.613L77.2805 242.219C78.1013 241.812 78.9845 241.405 79.6605 242.217C80.1517 242.806 80.1333 243.683 79.2157 244.54ZM76.9133 242.393L75.6509 240.878C75.0725 241.452 75.0605 242.006 75.3789 242.387C75.7629 242.848 76.3101 242.679 76.9133 242.393ZM79.2397 242.611C78.8413 242.132 78.2621 242.337 77.6357 242.643L78.8981 244.159C79.5237 243.555 79.5629 242.999 79.2397 242.611Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M238.069 343.333C239.854 345.475 239.564 348.658 237.422 350.443C235.279 352.228 232.096 351.938 230.311 349.796C228.526 347.653 228.816 344.47 230.958 342.685C233.101 340.901 236.284 341.191 238.069 343.333Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M236.155 348.572L236.736 349.269L236.433 349.521L235.858 348.831C235.238 349.295 234.499 349.541 233.95 349.486L233.838 348.994C234.343 349.035 235 348.836 235.534 348.443L234.206 346.849C233.403 347.241 232.554 347.6 231.886 346.8C231.402 346.219 231.401 345.367 232.268 344.522L231.687 343.825L231.99 343.572L232.566 344.263C233.035 343.903 233.601 343.658 234.109 343.615L234.255 344.098C233.734 344.163 233.25 344.371 232.884 344.645L234.222 346.251C235.042 345.844 235.926 345.437 236.602 346.249C237.091 346.838 237.073 347.715 236.155 348.572ZM233.853 346.425L232.59 344.91C232.012 345.484 232 346.038 232.318 346.419C232.702 346.88 233.25 346.711 233.853 346.425ZM236.179 346.643C235.781 346.164 235.202 346.369 234.575 346.675L235.838 348.191C236.463 347.587 236.502 347.031 236.179 346.643Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M98.7679 52.0535C100.553 54.1959 100.263 57.3791 98.1207 59.1639C95.9783 60.9487 92.7951 60.6591 91.0103 58.5167C89.2255 56.3743 89.5151 53.1911 91.6575 51.4063C93.7991 49.6215 96.9831 49.9111 98.7679 52.0535Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M96.8535 57.293L97.4343 57.9898L97.1311 58.2418L96.5559 57.5514C95.9367 58.0162 95.1975 58.2618 94.6479 58.2066L94.5359 57.7146C95.0415 57.7554 95.6983 57.557 96.2327 57.1634L94.9047 55.5698C94.1015 55.9618 93.2511 56.321 92.5847 55.521C92.0999 54.9394 92.0991 54.0882 92.9663 53.2426L92.3855 52.5458L92.6887 52.293L93.2639 52.9842C93.7335 52.6242 94.2991 52.3786 94.8071 52.3354L94.9535 52.8186C94.4319 52.8834 93.9487 53.0914 93.5823 53.3658L94.9199 54.9714C95.7407 54.565 96.6239 54.1578 97.2999 54.9698C97.7903 55.5586 97.7711 56.4362 96.8535 57.293ZM94.5519 55.1458L93.2895 53.6306C92.7111 54.205 92.6991 54.7586 93.0175 55.1402C93.4015 55.601 93.9487 55.4322 94.5519 55.1458ZM96.8775 55.3634C96.4791 54.885 95.8999 55.0898 95.2735 55.3962L96.5359 56.9114C97.1615 56.3074 97.2007 55.7514 96.8775 55.3634Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.2",
            d: "M208.646 262.244C208.646 262.244 202.482 293.555 164.65 300.613C164.65 300.613 154.769 308.493 151.481 313.161C148.193 317.828 130.652 325.754 112.838 350.485C95.0233 375.217 68.4385 296.672 68.4385 296.672L127.141 220.428L208.646 262.244Z",
            fill: "black",
            fillOpacity: "0.7"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M242.273 115.258C242.273 115.258 262.674 105.287 267.163 107.008C271.651 108.73 275.935 119.045 258.798 128.927C241.661 138.808 246.761 157.216 246.761 157.216H259.002C259.002 157.216 266.346 160.208 269.203 164.051C272.059 167.893 274.099 181.022 275.731 185.474C277.363 189.926 276.547 194.374 272.059 195.822C272.059 195.822 269.203 208.272 270.019 213.788C270.835 219.304 270.427 222.863 265.123 223.532C259.819 224.2 254.514 219.696 254.922 213.788L250.842 228.571L253.698 234.253C253.698 234.253 259.002 236.032 264.715 240.928C270.427 245.824 276.139 247.161 274.507 252.613C272.875 258.065 269.611 263.949 252.474 257.131C235.337 250.312 221.056 223.531 221.056 223.531L210.762 130.14L242.273 115.258Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.4",
            d: "M263.746 168.911C254.495 181.521 264.727 196.036 264.727 196.036C264.727 196.036 258.328 199.607 258.147 208.711C258.074 212.493 259.027 217.787 260.161 222.681C256.983 221.139 254.642 217.787 254.925 213.787L250.838 228.571L253.695 234.251C253.695 234.251 257.491 235.523 262.109 238.875C259.571 244.7 258.8 251.899 259.026 259.324C257.106 258.83 254.931 258.117 252.474 257.135C235.334 250.315 221.059 223.531 221.059 223.531L210.762 130.138L242.271 115.259C242.271 115.259 253.419 109.813 261.047 107.66C260.459 114.801 261.862 122.183 262.858 126.299C261.665 127.179 260.312 128.059 258.8 128.931C241.66 138.806 246.758 157.219 246.758 157.219H259.003C259.003 157.219 265.984 160.062 268.973 163.771C267.287 164.847 265.52 166.49 263.746 168.911Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M210.362 247.172C210.362 247.172 188.167 290.687 148.165 300.555C148.165 300.555 146.638 309.165 139.867 312.859C136.253 314.829 121.666 336.696 108.852 356.651L37.9512 313.157C42.3216 308.838 47.296 303.864 52.3856 298.672C67.184 283.582 82.9712 266.632 87.8072 258.305C92.1264 250.866 97.588 237.951 102.351 225.814C108.445 210.296 113.405 196.036 113.405 196.036L137.054 169.748L174.235 128.414L175.842 133.7L210.362 247.172Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.4",
            d: "M174.235 128.414L210.362 247.172C210.362 247.172 188.168 290.688 148.166 300.556C148.166 300.556 146.638 309.166 139.868 312.86C136.625 314.627 124.538 332.428 112.838 350.484C117.173 335.606 129.731 311.885 129.731 311.885C121.674 302.344 124.022 292.288 127.244 295.152C130.364 297.938 138.574 306.06 139.09 306.569C135.527 302.373 134.706 295.807 134.706 295.807C134.706 295.807 144.69 302.446 145.497 291.778C146.304 281.11 139.512 255.142 139.512 255.142L121.718 186.8L174.235 128.414Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M210.762 130.14L242.273 115.258C242.273 115.258 262.674 105.287 267.163 107.008C271.651 108.73 275.935 119.045 258.798 128.927C241.661 138.808 246.761 157.216 246.761 157.216H259.002C259.002 157.216 266.346 160.208 269.203 164.051C272.059 167.893 274.099 181.022 275.731 185.474C277.363 189.926 276.547 194.374 272.059 195.822C272.059 195.822 269.203 208.272 270.019 213.788C270.835 219.304 270.427 222.863 265.123 223.532C259.819 224.2 254.514 219.696 254.922 213.788L250.842 228.571L253.698 234.253C253.698 234.253 259.002 236.032 264.715 240.928C270.427 245.824 276.139 247.161 274.507 252.613C272.875 258.065 269.611 263.949 252.474 257.131C235.337 250.312 221.056 223.531 221.056 223.531",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M272.059 195.822C265.939 197.474 258.798 196.25 256.146 185.438C253.494 174.625 258.799 163.075 262.266 161.977",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M254.922 213.787C254.922 213.787 254.514 199.861 259.614 196.424",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.4",
            d: "M106.097 282.965C106.097 282.965 91.1454 281.103 87.8078 274.413C85.0446 268.879 70.0862 289.582 52.3862 298.672C67.1846 283.582 82.9718 266.632 87.8078 258.306C92.127 250.866 97.5886 237.951 102.352 225.814C102.352 225.822 102.352 225.822 102.352 225.829C102.112 235.894 96.7454 251.302 98.2798 259.323C98.2798 259.323 92.5206 260.749 93.6766 267.119C94.8246 273.482 106.097 282.965 106.097 282.965Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M210.36 247.172C210.36 247.172 188.168 290.689 148.162 300.558C148.162 300.558 146.637 309.166 139.869 312.86C136.256 314.832 121.668 336.695 108.85 356.655",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M37.9512 313.16C55.0352 296.271 81.304 269.494 87.8056 258.304C97.6488 241.363 113.407 196.034 113.407 196.034L174.238 128.416",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M139.514 180.052C139.514 180.052 148.855 188.421 151.481 196.033",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M249.807 282.965H149.267C146.294 282.965 143.884 280.555 143.884 277.582V63.5543C143.884 60.5815 146.294 58.1719 149.267 58.1719H249.807C252.78 58.1719 255.19 60.5815 255.19 63.5543V277.583C255.19 280.555 252.78 282.965 249.807 282.965Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M221.604 64.2913L219.479 68.1937C219.014 69.0489 218.118 69.5817 217.143 69.5817H181.93C180.956 69.5817 180.06 69.0497 179.594 68.1937L177.47 64.2913C177.004 63.4361 176.108 62.9033 175.134 62.9033H150.552C149.083 62.9033 147.892 64.0937 147.892 65.5633V276.01C147.892 277.479 149.083 278.67 150.552 278.67H248.521C249.99 278.67 251.181 277.479 251.181 276.01V65.5633C251.181 64.0945 249.991 62.9033 248.521 62.9033H223.939C222.966 62.9033 222.07 63.4361 221.604 64.2913Z",
            fill: "#DDEBFF",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M191.907 66.1825C192.7 66.1825 193.343 65.5396 193.343 64.7465C193.343 63.9535 192.7 63.3105 191.907 63.3105C191.114 63.3105 190.471 63.9535 190.471 64.7465C190.471 65.5396 191.114 66.1825 191.907 66.1825Z",
            stroke: "white",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M208.602 64.746C208.602 65.2372 208.204 65.6356 207.713 65.6356C207.222 65.6356 206.823 65.2372 206.823 64.746C206.823 64.2548 207.222 63.8564 207.713 63.8564C208.205 63.8564 208.602 64.2548 208.602 64.746Z",
            stroke: "white",
            strokeWidth: "0.8",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M204.613 64.1885H195.916C195.608 64.1885 195.358 64.4381 195.358 64.7461C195.358 65.0541 195.608 65.3037 195.916 65.3037H204.613C204.921 65.3037 205.171 65.0541 205.171 64.7461C205.171 64.4381 204.921 64.1885 204.613 64.1885Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M166.108 68.2549H156.728V72.2421H166.108V68.2549Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M167.564 68.9258H166.108V71.5706H167.564V68.9258Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M232.607 70.7949H230.942V72.2405H232.607V70.7949Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M235.854 69.3408H234.189V72.2408H235.854V69.3408Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M239.101 67.8877H237.436V72.2421H239.101V67.8877Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M242.347 66.4326H240.682V72.2414H242.347V66.4326Z",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.5",
            d: "M250.512 109.409H148.561V206.645H250.512V109.409Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M176.722 93.8756V95.5684C176.722 97.6516 175.717 98.7868 173.671 98.7868H172.704V103.68H170.657V90.6572H173.671C175.717 90.6564 176.722 91.7916 176.722 93.8756ZM172.704 92.5172V96.926H173.671C174.322 96.926 174.676 96.6284 174.676 95.698V93.7444C174.676 92.814 174.322 92.5164 173.671 92.5164L172.704 92.5172Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M184.053 103.68H181.988L181.635 101.317H179.123L178.77 103.68H176.891L178.974 90.6572H181.969L184.053 103.68ZM179.384 99.5492H181.356L180.388 92.9636H180.351L179.384 99.5492Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M186.008 99.3627L183.423 90.6562H185.562L187.106 96.5914H187.143L188.687 90.6562H190.64L188.055 99.3627V103.679H186.008V99.3627Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M195.777 99.9026H195.814L197.191 90.6562H200.037V103.679H198.102V94.3395H198.065L196.688 103.679H194.754L193.266 94.4698H193.228V103.679H191.443V90.6562H194.289L195.777 99.9026Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M203.575 96.1452H206.384V98.0052H203.575V101.82H207.11V103.68H201.528V90.6572H207.11V92.518H203.575V96.1452Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M210.237 94.2476H210.2V103.68H208.357V90.6572H210.925L212.99 98.4524H213.027V90.6572H214.85V103.68H212.748L210.237 94.2476Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M215.726 90.6562H222.051V92.5171H219.911V103.679H217.865V92.5171H215.725L215.726 90.6562Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M225.7 90.5088C227.69 90.5088 228.713 91.6992 228.713 93.7832V94.192H226.779V93.6528C226.779 92.7224 226.407 92.3696 225.756 92.3696C225.105 92.3696 224.733 92.7232 224.733 93.6528C224.733 94.6016 225.142 95.3088 226.482 96.4808C228.194 97.988 228.732 99.0664 228.732 100.555C228.732 102.638 227.691 103.83 225.682 103.83C223.672 103.83 222.631 102.639 222.631 100.555V99.7552H224.565V100.686C224.565 101.616 224.975 101.951 225.625 101.951C226.276 101.951 226.686 101.616 226.686 100.686C226.686 99.7368 226.276 99.0304 224.937 97.8576C223.226 96.3512 222.686 95.272 222.686 93.784C222.685 91.6992 223.709 90.5088 225.7 90.5088Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M216.12 259.02H182.955C178.669 259.02 175.193 255.545 175.193 251.259C175.193 246.972 178.669 243.497 182.955 243.497H216.12C220.406 243.497 223.881 246.972 223.881 251.259C223.881 255.546 220.406 259.02 216.12 259.02Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M198.771 250.364C198.771 251.335 198.067 251.921 196.907 251.921H195.682V253.362H195.199V248.799H196.907C198.067 248.799 198.771 249.385 198.771 250.364ZM198.289 250.364C198.289 249.633 197.806 249.216 196.894 249.216H195.681V251.498H196.894C197.806 251.498 198.289 251.081 198.289 250.364Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M202.272 251.238V253.362H201.829V252.828C201.62 253.18 201.216 253.395 200.649 253.395C199.873 253.395 199.397 252.99 199.397 252.398C199.397 251.87 199.737 251.426 200.721 251.426H201.809V251.218C201.809 250.631 201.477 250.311 200.838 250.311C200.395 250.311 199.977 250.467 199.697 250.715L199.489 250.37C199.834 250.077 200.343 249.907 200.884 249.907C201.769 249.908 202.272 250.35 202.272 251.238ZM201.809 252.333V251.772H200.733C200.069 251.772 199.853 252.033 199.853 252.385C199.853 252.782 200.173 253.03 200.72 253.03C201.241 253.03 201.626 252.782 201.809 252.333Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M206.345 249.933L204.631 253.773C204.345 254.445 203.979 254.659 203.49 254.659C203.171 254.659 202.865 254.555 202.656 254.346L202.871 254.001C203.041 254.17 203.249 254.261 203.497 254.261C203.803 254.261 204.012 254.117 204.207 253.687L204.357 253.355L202.826 249.933H203.309L204.599 252.847L205.889 249.933H206.345V249.933Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M149.35 234.592C150.55 253.034 142.006 273.57 142.006 273.57L95.8575 260.575L87.8071 258.306C95.7919 247.187 99.6167 225.306 97.5295 207.591C97.3695 206.254 97.2679 204.995 97.2023 203.803C96.4391 189.193 102.467 184.917 107.602 178.46C113.165 171.472 125.665 145.067 125.665 138.821C125.665 132.567 141.299 117.282 137.823 99.9161C137.823 99.9161 142.55 96.9857 147.306 99.3921C149.458 100.483 151.618 102.664 153.349 106.708C157.421 116.227 151.706 143.111 146.841 149.707L137.474 188.489C137.474 188.489 140.63 193.935 143.735 203.826C146.15 211.54 148.529 221.946 149.35 234.592Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.4",
            d: "M97.2033 203.803C99.8137 210.959 102.592 215.765 102.352 225.829C102.112 235.894 96.7457 251.303 98.2801 259.324C98.2801 259.324 97.0657 259.622 95.8585 260.575L87.8081 258.306C95.7929 247.188 99.6177 225.306 97.5305 207.592C97.3705 206.253 97.2689 204.996 97.2033 203.803Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.4",
            d: "M146.841 149.706L137.475 188.488C137.475 188.488 140.631 193.934 143.736 203.824C143.729 203.817 143.729 203.81 143.721 203.803C137.388 193.578 132.028 190.546 132.028 190.546C136.253 185.477 139.511 148.441 139.511 148.441C139.511 148.441 152.753 132.88 151.481 116.597C150.892 109.107 149.088 103.384 147.306 99.3916C149.459 100.483 151.618 102.664 153.349 106.708C157.422 116.226 151.706 143.11 146.841 149.706Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M87.8057 258.304C95.7945 247.189 99.6153 225.306 97.5313 207.592C95.4473 189.878 102.046 185.444 107.604 178.456C113.162 171.468 125.666 145.07 125.666 138.818C125.666 132.565 141.296 117.282 137.822 99.9152C137.822 99.9152 147.802 93.7328 153.35 106.71C157.419 116.228 151.706 143.107 146.842 149.706L137.475 188.487C137.475 188.487 147.472 205.725 149.348 234.591C150.546 253.032 142.002 273.57 142.002 273.57",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M118.659 288.325C118.659 288.325 129.162 294.794 135.288 305.017",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M148.163 300.557C148.163 300.557 139.115 301.843 130.937 292.065C125.695 285.797 109.783 282.965 106.12 266.579",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.2",
            d: "M279.661 349.005C256.501 337.927 270.529 329.049 238.665 315.295C206.801 301.542 206.477 289.795 210.321 262.765C214.166 235.735 211.111 207.003 220.387 204.563C229.663 202.123 213.133 164.851 223.937 151.674L277.092 255.065L279.661 349.005Z",
            fill: "black",
            fillOpacity: "0.7"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M365.961 347.928C364.87 344.816 363.765 341.42 362.913 338.344C361.808 334.322 360.943 331.138 358.906 327.429C358.586 326.833 358.237 326.207 357.852 325.538C355.685 321.677 352.718 316.383 350.98 309.889C349.817 305.511 350.958 294.734 352.07 284.306C352.856 276.802 353.597 269.719 353.386 265.705L353.321 264.279C352.775 253.778 351.641 231.919 349.285 225.869C347.009 220.044 344.878 219.171 340.995 217.615C340.595 217.441 340.181 217.281 339.737 217.092C338.282 216.481 335.802 215.202 332.945 213.725C326.501 210.387 318.488 206.234 314.416 205.682C309.042 204.97 303.857 206.024 302.999 206.214C297.981 202.359 289.444 197.4 286.906 197.306C284.819 197.204 280.281 198.506 278.085 199.189C277.577 199.349 277.184 199.472 276.988 199.538C275.155 198.178 273.621 197.159 272.625 196.673C272.516 196.622 272.413 196.578 272.326 196.542C269.505 195.378 265.236 195.334 262.909 195.4C262.204 195.429 261.659 195.473 261.404 195.494C257.019 188.738 252.692 182.012 250.816 179.06C246.897 172.85 234.76 147.303 234.636 147.034C234.607 146.969 234.556 146.926 234.476 146.903C234.476 146.903 234.439 146.882 234.367 146.866C233.421 146.59 226.469 144.823 223.677 151.564C220.623 158.894 224.986 175.002 229.241 180.848C231.291 183.67 236.876 195.152 242.556 207.042C241.094 208.394 229.452 219.157 223.794 221.164C219.162 222.8 220.245 246.543 221.118 265.61C221.445 272.65 221.721 278.707 221.641 282.343C221.481 289.382 234.287 299.083 246.701 308.457C257.921 316.95 269.52 325.728 270.88 332.105C271.258 333.901 272.327 335.355 273.607 336.992C275.745 339.712 278.493 342.918 279.665 349.005C280.006 350.823 282.937 353.208 285.235 357.106H369.349C368.644 355.287 367.321 351.834 365.961 347.928ZM249.428 221.447C253.5 229.978 256.016 235.082 256.613 235.62C257.209 236.166 257.187 238.892 257.165 241.518C257.137 243.838 257.114 246.325 257.405 248.426C256.417 249.298 250.155 254.999 248.89 259.61L243.567 253.341L242.221 233.692C243.028 232.857 248.504 227.076 249.428 221.447Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.4",
            d: "M341.847 276.247C343.822 294.687 343.851 304.686 346.066 310.023C349.806 319.034 355.318 320.858 355.318 320.858C353.722 317.735 352.097 314.063 350.979 309.887C349.816 305.513 350.957 294.735 352.067 284.306C352.853 276.803 353.601 269.716 353.39 265.7L353.319 264.276C352.774 253.775 351.643 231.919 349.284 225.869C347.013 220.043 344.878 219.171 340.998 217.611C340.596 217.439 340.178 217.279 339.737 217.09C338.281 216.483 335.806 215.202 332.945 213.723C326.501 210.389 318.485 206.234 314.418 205.683C309.042 204.972 303.856 206.019 303.001 206.211C297.981 202.359 289.446 197.4 286.904 197.301C284.82 197.203 279.187 198.845 276.99 199.533C286.569 207.369 300.417 217.111 300.417 217.111C311.353 219.286 309.952 224.035 314.372 226.689C318.376 229.092 322.204 222.064 325.545 221.445C329.957 220.628 334.975 225.308 334.751 230.952C334.131 246.595 340.152 260.421 341.847 276.247Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.4",
            d: "M286.569 219.104C286.569 219.104 277.901 211.918 273.751 209.484C269.601 207.049 268.956 198.807 272.22 196.799C272.334 196.729 272.46 196.686 272.623 196.674C272.52 196.624 272.416 196.574 272.325 196.539C269.502 195.374 265.239 195.333 262.91 195.401C267.744 204.34 271.541 211.197 272.577 212.697C276.068 217.744 286.569 219.104 286.569 219.104Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.4",
            d: "M273.425 331.072C273.788 329.159 270.639 323.56 269.258 321.291C266.11 316.106 229.604 283.848 234.898 275.237C240.17 266.605 245.014 273.005 248.359 273.557C250.766 273.957 257.354 270.03 257.318 269.703C256.57 263.071 262.692 258.759 262.692 258.759C262.692 258.759 262.125 232.362 260.722 232.813C259.31 233.263 242.462 193.166 242.462 193.166C242.462 193.166 224.66 169.489 225.663 158.443C226.667 147.412 234.382 147.164 234.382 147.164L234.368 146.865C233.422 146.589 226.47 144.822 223.678 151.563C220.624 158.893 224.987 175.001 229.242 180.847C231.292 183.669 236.877 195.151 242.557 207.041C241.095 208.393 229.453 219.156 223.795 221.163C219.163 222.799 220.246 246.542 221.119 265.609C221.446 272.649 221.722 278.706 221.642 282.342C221.482 289.381 234.288 299.082 246.702 308.456C257.922 316.949 269.521 325.727 270.881 332.104C271.259 333.9 272.328 335.354 273.608 336.991C273.396 334.671 273.236 332.082 273.425 331.072ZM249.428 221.447C253.5 229.977 256.016 235.082 256.613 235.62C257.209 236.165 257.187 238.892 257.166 241.517C257.137 243.837 257.114 246.325 257.406 248.425C256.417 249.298 250.155 254.999 248.89 259.609L243.567 253.341L242.222 233.692C243.028 232.857 248.504 227.076 249.428 221.447Z",
            fill: "#DDEBFF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M281.569 219.001C281.569 219.001 276.227 217.597 272.574 212.701C268.921 207.805 254.561 185.505 250.581 179.211C246.601 172.917 234.383 147.167 234.383 147.167C234.383 147.167 226.863 144.65 223.936 151.676C221.009 158.702 225.018 174.566 229.47 180.681C233.922 186.795 255.117 233.89 256.801 235.413C258.485 236.937 255.96 249.489 259.328 252.526",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M257.715 248.541C257.715 248.541 249.953 255.302 249.043 260.233L243.284 253.456L241.923 233.586C241.923 233.586 248.871 226.627 249.252 220.431",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M242.906 207.108C242.906 207.108 230.019 219.266 223.891 221.437C217.763 223.608 222.229 269.162 221.925 282.358C221.621 295.553 268.29 318.528 271.153 332.037C272.291 337.407 276.991 338.504 279.868 348.8",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M261.25 195.787C261.25 195.787 268.263 195.156 272.216 196.798C276.169 198.439 292.225 212.23 296.086 214.866C299.946 217.502 305.782 218.495 306.889 221.333",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M276.939 199.847C276.939 199.847 284.162 197.463 286.887 197.582C289.612 197.702 299.991 203.826 304.631 207.902C309.271 211.978 313.928 214.231 316.721 215.248",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M302.94 206.52C302.94 206.52 308.53 205.181 314.385 205.969C320.24 206.758 334.947 215.409 339.631 217.361C344.315 219.313 346.562 219.671 349.02 225.977C351.479 232.284 352.614 256.252 353.109 265.721C353.604 275.19 348.672 302.322 350.704 309.957C352.736 317.593 356.424 323.475 358.658 327.561",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M241.923 233.586C241.923 233.586 240.758 228.919 239.217 228.32",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M243.283 253.457C243.283 253.457 244.323 258.659 245.467 261.5C246.612 264.342 244.827 268.448 244.827 268.448",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M249.042 260.233C248.852 264.776 253.376 270.086 254.472 269.337",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M272.059 233.586C272.059 233.586 276.91 225.731 281.569 225.348C286.229 224.965 291.599 231.572 294.476 230.953C297.353 230.335 300.961 226.107 305.791 225.332C310.621 224.558 312.885 226.883 316.722 227.075C320.559 227.267 320.942 222.147 325.545 221.447C330.149 220.746 331.683 223.081 334.751 223.639C337.82 224.198 338.592 221.814 341.08 220.431",
            stroke: "#263238",
            strokeWidth: "0.8",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxs(
          "mask",
          {
            id: "path-95-outside-1_13766_18659",
            maskUnits: "userSpaceOnUse",
            x: "176.8",
            y: "133",
            width: "39",
            height: "14",
            fill: "black",
            children: [
              /* @__PURE__ */ jsx("rect", { fill: "white", x: "176.8", y: "133", width: "39", height: "14" }),
              /* @__PURE__ */ jsx("path", { d: "M180.329 146.141C179.687 146.141 179.162 146.005 178.754 145.733C178.351 145.461 178.054 145.058 177.862 144.523C177.669 143.989 177.573 143.328 177.573 142.541V136.88C177.573 136.168 177.667 135.559 177.854 135.052C178.042 134.546 178.34 134.157 178.747 133.885C179.155 133.613 179.69 133.477 180.351 133.477C180.847 133.477 181.267 133.555 181.609 133.709C181.951 133.864 182.228 134.089 182.439 134.384C182.65 134.675 182.802 135.031 182.896 135.453C182.994 135.87 183.044 136.346 183.044 136.88V142.541C183.044 143.328 182.95 143.989 182.762 144.523C182.579 145.058 182.289 145.461 181.89 145.733C181.492 146.005 180.972 146.141 180.329 146.141ZM180.329 144.509C180.564 144.509 180.74 144.439 180.857 144.298C180.974 144.158 181.051 143.945 181.089 143.659C181.131 143.368 181.152 143.002 181.152 142.562V136.796C181.152 136.257 181.101 135.842 180.997 135.552C180.899 135.256 180.683 135.109 180.351 135.109C180.008 135.109 179.776 135.252 179.654 135.537C179.533 135.819 179.472 136.236 179.472 136.789V142.562C179.472 143.012 179.49 143.382 179.528 143.673C179.57 143.959 179.652 144.17 179.774 144.305C179.901 144.441 180.086 144.509 180.329 144.509ZM185.191 146V133.625H186.668L189.29 141.05L189.157 137.675V133.625H190.851V146H189.515L186.822 138.315L186.928 141.563V146H185.191ZM193.147 146V133.625H195.031V144.397H197.415V146H193.147ZM198.908 146V133.625H200.793V146H198.908ZM203.123 146V133.625H204.6L207.222 141.05L207.089 137.675V133.625H208.783V146H207.447L204.754 138.315L204.86 141.563V146H203.123ZM211.079 146V133.625H215.227V135.249H212.963V138.849H215.114V140.438H212.963V144.376H215.311V146H211.079Z" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M180.329 146.141C179.687 146.141 179.162 146.005 178.754 145.733C178.351 145.461 178.054 145.058 177.862 144.523C177.669 143.989 177.573 143.328 177.573 142.541V136.88C177.573 136.168 177.667 135.559 177.854 135.052C178.042 134.546 178.34 134.157 178.747 133.885C179.155 133.613 179.69 133.477 180.351 133.477C180.847 133.477 181.267 133.555 181.609 133.709C181.951 133.864 182.228 134.089 182.439 134.384C182.65 134.675 182.802 135.031 182.896 135.453C182.994 135.87 183.044 136.346 183.044 136.88V142.541C183.044 143.328 182.95 143.989 182.762 144.523C182.579 145.058 182.289 145.461 181.89 145.733C181.492 146.005 180.972 146.141 180.329 146.141ZM180.329 144.509C180.564 144.509 180.74 144.439 180.857 144.298C180.974 144.158 181.051 143.945 181.089 143.659C181.131 143.368 181.152 143.002 181.152 142.562V136.796C181.152 136.257 181.101 135.842 180.997 135.552C180.899 135.256 180.683 135.109 180.351 135.109C180.008 135.109 179.776 135.252 179.654 135.537C179.533 135.819 179.472 136.236 179.472 136.789V142.562C179.472 143.012 179.49 143.382 179.528 143.673C179.57 143.959 179.652 144.17 179.774 144.305C179.901 144.441 180.086 144.509 180.329 144.509ZM185.191 146V133.625H186.668L189.29 141.05L189.157 137.675V133.625H190.851V146H189.515L186.822 138.315L186.928 141.563V146H185.191ZM193.147 146V133.625H195.031V144.397H197.415V146H193.147ZM198.908 146V133.625H200.793V146H198.908ZM203.123 146V133.625H204.6L207.222 141.05L207.089 137.675V133.625H208.783V146H207.447L204.754 138.315L204.86 141.563V146H203.123ZM211.079 146V133.625H215.227V135.249H212.963V138.849H215.114V140.438H212.963V144.376H215.311V146H211.079Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M178.754 145.733L178.665 145.865L178.666 145.866L178.754 145.733ZM182.439 134.384L182.309 134.477L182.309 134.478L182.439 134.384ZM182.896 135.453L182.74 135.488L182.74 135.49L182.896 135.453ZM182.762 144.523L182.611 144.47L182.611 144.472L182.762 144.523ZM180.857 144.298L180.734 144.196L180.857 144.298ZM181.089 143.659L180.931 143.636L180.93 143.638L181.089 143.659ZM180.997 135.552L180.846 135.602L180.847 135.605L180.997 135.552ZM179.654 135.537L179.801 135.601L179.802 135.6L179.654 135.537ZM179.528 143.673L179.369 143.693L179.37 143.696L179.528 143.673ZM179.774 144.305L179.655 144.412L179.657 144.414L179.774 144.305ZM180.329 145.981C179.709 145.981 179.218 145.849 178.843 145.6L178.666 145.866C179.107 146.16 179.665 146.301 180.329 146.301V145.981ZM178.844 145.6C178.474 145.35 178.195 144.977 178.012 144.469L177.711 144.578C177.913 145.138 178.229 145.572 178.665 145.865L178.844 145.6ZM178.012 144.469C177.828 143.958 177.733 143.316 177.733 142.541H177.413C177.413 143.34 177.511 144.021 177.711 144.578L178.012 144.469ZM177.733 142.541V136.88H177.413V142.541H177.733ZM177.733 136.88C177.733 136.181 177.825 135.592 178.005 135.108L177.704 134.997C177.509 135.525 177.413 136.155 177.413 136.88H177.733ZM178.005 135.108C178.182 134.63 178.459 134.27 178.836 134.018L178.659 133.752C178.22 134.045 177.902 134.462 177.704 134.997L178.005 135.108ZM178.836 134.018C179.21 133.769 179.71 133.637 180.351 133.637V133.317C179.669 133.317 179.101 133.457 178.659 133.752L178.836 134.018ZM180.351 133.637C180.832 133.637 181.227 133.712 181.543 133.855L181.675 133.564C181.307 133.397 180.863 133.317 180.351 133.317V133.637ZM181.543 133.855C181.861 133.999 182.115 134.206 182.309 134.477L182.569 134.291C182.341 133.972 182.042 133.729 181.675 133.564L181.543 133.855ZM182.309 134.478C182.505 134.748 182.65 135.083 182.74 135.488L183.052 135.418C182.955 134.979 182.794 134.602 182.568 134.29L182.309 134.478ZM182.74 135.49C182.835 135.892 182.884 136.356 182.884 136.88H183.204C183.204 136.337 183.153 135.848 183.052 135.416L182.74 135.49ZM182.884 136.88V142.541H183.204V136.88H182.884ZM182.884 142.541C182.884 143.317 182.791 143.958 182.611 144.47L182.913 144.576C183.109 144.02 183.204 143.34 183.204 142.541H182.884ZM182.611 144.472C182.437 144.979 182.165 145.351 181.8 145.601L181.981 145.865C182.412 145.57 182.722 145.137 182.914 144.575L182.611 144.472ZM181.8 145.601C181.436 145.849 180.95 145.981 180.329 145.981V146.301C180.993 146.301 181.548 146.16 181.981 145.865L181.8 145.601ZM180.329 144.669C180.597 144.669 180.824 144.588 180.98 144.401L180.734 144.196C180.655 144.29 180.531 144.349 180.329 144.349V144.669ZM180.98 144.401C181.125 144.227 181.208 143.98 181.248 143.679L180.93 143.638C180.895 143.91 180.824 144.088 180.734 144.196L180.98 144.401ZM181.247 143.682C181.291 143.381 181.312 143.007 181.312 142.562H180.992C180.992 142.998 180.971 143.355 180.931 143.636L181.247 143.682ZM181.312 142.562V136.796H180.992V142.562H181.312ZM181.312 136.796C181.312 136.25 181.26 135.814 181.148 135.498L180.847 135.605C180.941 135.87 180.992 136.264 180.992 136.796H181.312ZM181.149 135.501C181.091 135.327 180.994 135.184 180.852 135.087C180.711 134.991 180.54 134.949 180.351 134.949V135.269C180.494 135.269 180.597 135.3 180.672 135.351C180.745 135.402 180.805 135.481 180.846 135.602L181.149 135.501ZM180.351 134.949C180.157 134.949 179.983 134.989 179.836 135.08C179.688 135.171 179.579 135.306 179.507 135.475L179.802 135.6C179.852 135.483 179.92 135.404 180.004 135.352C180.089 135.3 180.202 135.269 180.351 135.269V134.949ZM179.508 135.474C179.373 135.785 179.312 136.229 179.312 136.789H179.632C179.632 136.243 179.693 135.852 179.801 135.601L179.508 135.474ZM179.312 136.789V142.562H179.632V136.789H179.312ZM179.312 142.562C179.312 143.015 179.331 143.393 179.369 143.693L179.687 143.652C179.65 143.371 179.632 143.008 179.632 142.562H179.312ZM179.37 143.696C179.414 143.996 179.503 144.243 179.655 144.412L179.893 144.199C179.801 144.096 179.726 143.921 179.686 143.649L179.37 143.696ZM179.657 144.414C179.822 144.592 180.056 144.669 180.329 144.669V144.349C180.116 144.349 179.979 144.291 179.891 144.196L179.657 144.414ZM185.191 146H185.031V146.16H185.191V146ZM185.191 133.625V133.465H185.031V133.625H185.191ZM186.668 133.625L186.819 133.572L186.781 133.465H186.668V133.625ZM189.29 141.05L189.14 141.103L189.45 141.044L189.29 141.05ZM189.157 137.675H188.997L188.997 137.681L189.157 137.675ZM189.157 133.625V133.465H188.997V133.625H189.157ZM190.851 133.625H191.011V133.465H190.851V133.625ZM190.851 146V146.16H191.011V146H190.851ZM189.515 146L189.364 146.053L189.402 146.16H189.515V146ZM186.822 138.315L186.973 138.262L186.663 138.32L186.822 138.315ZM186.928 141.563H187.088L187.088 141.558L186.928 141.563ZM186.928 146V146.16H187.088V146H186.928ZM185.351 146V133.625H185.031V146H185.351ZM185.191 133.785H186.668V133.465H185.191V133.785ZM186.517 133.678L189.14 141.103L189.441 140.997L186.819 133.572L186.517 133.678ZM189.45 141.044L189.317 137.669L188.997 137.681L189.131 141.056L189.45 141.044ZM189.317 137.675V133.625H188.997V137.675H189.317ZM189.157 133.785H190.851V133.465H189.157V133.785ZM190.691 133.625V146H191.011V133.625H190.691ZM190.851 145.84H189.515V146.16H190.851V145.84ZM189.666 145.947L186.973 138.262L186.671 138.368L189.364 146.053L189.666 145.947ZM186.663 138.32L186.768 141.568L187.088 141.558L186.982 138.31L186.663 138.32ZM186.768 141.563V146H187.088V141.563H186.768ZM186.928 145.84H185.191V146.16H186.928V145.84ZM193.147 146H192.987V146.16H193.147V146ZM193.147 133.625V133.465H192.987V133.625H193.147ZM195.031 133.625H195.191V133.465H195.031V133.625ZM195.031 144.397H194.871V144.557H195.031V144.397ZM197.415 144.397H197.575V144.237H197.415V144.397ZM197.415 146V146.16H197.575V146H197.415ZM193.307 146V133.625H192.987V146H193.307ZM193.147 133.785H195.031V133.465H193.147V133.785ZM194.871 133.625V144.397H195.191V133.625H194.871ZM195.031 144.557H197.415V144.237H195.031V144.557ZM197.255 144.397V146H197.575V144.397H197.255ZM197.415 145.84H193.147V146.16H197.415V145.84ZM198.908 146H198.748V146.16H198.908V146ZM198.908 133.625V133.465H198.748V133.625H198.908ZM200.793 133.625H200.953V133.465H200.793V133.625ZM200.793 146V146.16H200.953V146H200.793ZM199.068 146V133.625H198.748V146H199.068ZM198.908 133.785H200.793V133.465H198.908V133.785ZM200.633 133.625V146H200.953V133.625H200.633ZM200.793 145.84H198.908V146.16H200.793V145.84ZM203.123 146H202.963V146.16H203.123V146ZM203.123 133.625V133.465H202.963V133.625H203.123ZM204.6 133.625L204.751 133.572L204.713 133.465H204.6V133.625ZM207.222 141.05L207.071 141.103L207.382 141.044L207.222 141.05ZM207.089 137.675H206.929L206.929 137.681L207.089 137.675ZM207.089 133.625V133.465H206.929V133.625H207.089ZM208.783 133.625H208.943V133.465H208.783V133.625ZM208.783 146V146.16H208.943V146H208.783ZM207.447 146L207.296 146.053L207.334 146.16H207.447V146ZM204.754 138.315L204.905 138.262L204.594 138.32L204.754 138.315ZM204.86 141.563H205.02L205.02 141.558L204.86 141.563ZM204.86 146V146.16H205.02V146H204.86ZM203.283 146V133.625H202.963V146H203.283ZM203.123 133.785H204.6V133.465H203.123V133.785ZM204.449 133.678L207.071 141.103L207.373 140.997L204.751 133.572L204.449 133.678ZM207.382 141.044L207.249 137.669L206.929 137.681L207.062 141.056L207.382 141.044ZM207.249 137.675V133.625H206.929V137.675H207.249ZM207.089 133.785H208.783V133.465H207.089V133.785ZM208.623 133.625V146H208.943V133.625H208.623ZM208.783 145.84H207.447V146.16H208.783V145.84ZM207.598 145.947L204.905 138.262L204.603 138.368L207.296 146.053L207.598 145.947ZM204.594 138.32L204.7 141.568L205.02 141.558L204.914 138.31L204.594 138.32ZM204.7 141.563V146H205.02V141.563H204.7ZM204.86 145.84H203.123V146.16H204.86V145.84ZM211.079 146H210.919V146.16H211.079V146ZM211.079 133.625V133.465H210.919V133.625H211.079ZM215.227 133.625H215.387V133.465H215.227V133.625ZM215.227 135.249V135.409H215.387V135.249H215.227ZM212.963 135.249V135.089H212.803V135.249H212.963ZM212.963 138.849H212.803V139.009H212.963V138.849ZM215.114 138.849H215.274V138.689H215.114V138.849ZM215.114 140.438V140.598H215.274V140.438H215.114ZM212.963 140.438V140.278H212.803V140.438H212.963ZM212.963 144.376H212.803V144.536H212.963V144.376ZM215.311 144.376H215.471V144.216H215.311V144.376ZM215.311 146V146.16H215.471V146H215.311ZM211.239 146V133.625H210.919V146H211.239ZM211.079 133.785H215.227V133.465H211.079V133.785ZM215.067 133.625V135.249H215.387V133.625H215.067ZM215.227 135.089H212.963V135.409H215.227V135.089ZM212.803 135.249V138.849H213.123V135.249H212.803ZM212.963 139.009H215.114V138.689H212.963V139.009ZM214.954 138.849V140.438H215.274V138.849H214.954ZM215.114 140.278H212.963V140.598H215.114V140.278ZM212.803 140.438V144.376H213.123V140.438H212.803ZM212.963 144.536H215.311V144.216H212.963V144.536ZM215.151 144.376V146H215.471V144.376H215.151ZM215.311 145.84H211.079V146.16H215.311V145.84Z",
            fill: "#263238",
            mask: "url(#path-95-outside-1_13766_18659)"
          }
        ),
        /* @__PURE__ */ jsxs(
          "mask",
          {
            id: "path-97-outside-2_13766_18659",
            maskUnits: "userSpaceOnUse",
            x: "176.8",
            y: "160.6",
            width: "43",
            height: "14",
            fill: "black",
            children: [
              /* @__PURE__ */ jsx("rect", { fill: "white", x: "176.8", y: "160.6", width: "43", height: "14" }),
              /* @__PURE__ */ jsx("path", { d: "M180.329 173.74C179.687 173.74 179.162 173.604 178.754 173.332C178.351 173.061 178.054 172.657 177.862 172.123C177.669 171.589 177.573 170.928 177.573 170.14V164.48C177.573 163.768 177.667 163.158 177.854 162.652C178.042 162.146 178.34 161.757 178.747 161.485C179.155 161.213 179.69 161.077 180.351 161.077C180.847 161.077 181.267 161.154 181.609 161.309C181.951 161.464 182.228 161.689 182.439 161.984C182.65 162.275 182.802 162.631 182.896 163.053C182.994 163.47 183.044 163.946 183.044 164.48V170.14C183.044 170.928 182.95 171.589 182.762 172.123C182.579 172.657 182.289 173.061 181.89 173.332C181.492 173.604 180.972 173.74 180.329 173.74ZM180.329 172.109C180.564 172.109 180.74 172.039 180.857 171.898C180.974 171.757 181.051 171.544 181.089 171.258C181.131 170.968 181.152 170.602 181.152 170.161V164.396C181.152 163.857 181.101 163.442 180.997 163.151C180.899 162.856 180.683 162.708 180.351 162.708C180.008 162.708 179.776 162.851 179.654 163.137C179.533 163.418 179.472 163.836 179.472 164.389V170.161C179.472 170.611 179.49 170.982 179.528 171.272C179.57 171.558 179.652 171.769 179.774 171.905C179.901 172.041 180.086 172.109 180.329 172.109ZM185.191 173.6V161.225H189.438V162.863H187.076V166.154H189.269V167.799H187.076V173.6H185.191ZM191.192 173.6V161.225H195.439V162.863H193.076V166.154H195.27V167.799H193.076V173.6H191.192ZM197.193 173.6V161.225H199.077V171.996H201.461V173.6H197.193ZM202.954 173.6V161.225H204.839V173.6H202.954ZM207.169 173.6V161.225H208.646L211.268 168.65L211.135 165.275V161.225H212.829V173.6H211.493L208.8 165.914L208.906 169.163V173.6H207.169ZM215.125 173.6V161.225H219.273V162.849H217.009V166.449H219.161V168.038H217.009V171.975H219.357V173.6H215.125Z" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M180.329 173.74C179.687 173.74 179.162 173.604 178.754 173.332C178.351 173.061 178.054 172.657 177.862 172.123C177.669 171.589 177.573 170.928 177.573 170.14V164.48C177.573 163.768 177.667 163.158 177.854 162.652C178.042 162.146 178.34 161.757 178.747 161.485C179.155 161.213 179.69 161.077 180.351 161.077C180.847 161.077 181.267 161.154 181.609 161.309C181.951 161.464 182.228 161.689 182.439 161.984C182.65 162.275 182.802 162.631 182.896 163.053C182.994 163.47 183.044 163.946 183.044 164.48V170.14C183.044 170.928 182.95 171.589 182.762 172.123C182.579 172.657 182.289 173.061 181.89 173.332C181.492 173.604 180.972 173.74 180.329 173.74ZM180.329 172.109C180.564 172.109 180.74 172.039 180.857 171.898C180.974 171.757 181.051 171.544 181.089 171.258C181.131 170.968 181.152 170.602 181.152 170.161V164.396C181.152 163.857 181.101 163.442 180.997 163.151C180.899 162.856 180.683 162.708 180.351 162.708C180.008 162.708 179.776 162.851 179.654 163.137C179.533 163.418 179.472 163.836 179.472 164.389V170.161C179.472 170.611 179.49 170.982 179.528 171.272C179.57 171.558 179.652 171.769 179.774 171.905C179.901 172.041 180.086 172.109 180.329 172.109ZM185.191 173.6V161.225H189.438V162.863H187.076V166.154H189.269V167.799H187.076V173.6H185.191ZM191.192 173.6V161.225H195.439V162.863H193.076V166.154H195.27V167.799H193.076V173.6H191.192ZM197.193 173.6V161.225H199.077V171.996H201.461V173.6H197.193ZM202.954 173.6V161.225H204.839V173.6H202.954ZM207.169 173.6V161.225H208.646L211.268 168.65L211.135 165.275V161.225H212.829V173.6H211.493L208.8 165.914L208.906 169.163V173.6H207.169ZM215.125 173.6V161.225H219.273V162.849H217.009V166.449H219.161V168.038H217.009V171.975H219.357V173.6H215.125Z",
            fill: "#263238"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M178.754 173.332L178.665 173.465L178.666 173.466L178.754 173.332ZM182.439 161.984L182.309 162.077L182.309 162.078L182.439 161.984ZM182.896 163.053L182.74 163.087L182.74 163.089L182.896 163.053ZM182.762 172.123L182.611 172.07L182.611 172.071L182.762 172.123ZM180.857 171.898L180.734 171.796L180.857 171.898ZM181.089 171.258L180.931 171.235L180.93 171.237L181.089 171.258ZM180.997 163.151L180.846 163.202L180.847 163.205L180.997 163.151ZM179.654 163.137L179.801 163.201L179.802 163.2L179.654 163.137ZM179.528 171.272L179.369 171.293L179.37 171.296L179.528 171.272ZM179.774 171.905L179.655 172.012L179.657 172.014L179.774 171.905ZM180.329 173.58C179.709 173.58 179.218 173.449 178.843 173.199L178.666 173.466C179.107 173.76 179.665 173.9 180.329 173.9V173.58ZM178.844 173.2C178.474 172.95 178.195 172.577 178.012 172.069L177.711 172.177C177.913 172.738 178.229 173.171 178.665 173.465L178.844 173.2ZM178.012 172.069C177.828 171.557 177.733 170.916 177.733 170.14H177.413C177.413 170.94 177.511 171.62 177.711 172.177L178.012 172.069ZM177.733 170.14V164.48H177.413V170.14H177.733ZM177.733 164.48C177.733 163.781 177.825 163.191 178.005 162.708L177.704 162.596C177.509 163.125 177.413 163.754 177.413 164.48H177.733ZM178.005 162.708C178.182 162.23 178.459 161.869 178.836 161.618L178.659 161.352C178.22 161.644 177.902 162.062 177.704 162.596L178.005 162.708ZM178.836 161.618C179.21 161.369 179.71 161.237 180.351 161.237V160.917C179.669 160.917 179.101 161.057 178.659 161.352L178.836 161.618ZM180.351 161.237C180.832 161.237 181.227 161.312 181.543 161.455L181.675 161.163C181.307 160.997 180.863 160.917 180.351 160.917V161.237ZM181.543 161.455C181.861 161.598 182.115 161.805 182.309 162.077L182.569 161.891C182.341 161.572 182.042 161.329 181.675 161.163L181.543 161.455ZM182.309 162.078C182.505 162.348 182.65 162.683 182.74 163.087L183.052 163.018C182.955 162.579 182.794 162.202 182.568 161.89L182.309 162.078ZM182.74 163.089C182.835 163.492 182.884 163.955 182.884 164.48H183.204C183.204 163.936 183.153 163.448 183.052 163.016L182.74 163.089ZM182.884 164.48V170.14H183.204V164.48H182.884ZM182.884 170.14C182.884 170.916 182.791 171.558 182.611 172.07L182.913 172.176C183.109 171.619 183.204 170.939 183.204 170.14H182.884ZM182.611 172.071C182.437 172.579 182.165 172.951 181.8 173.2L181.981 173.465C182.412 173.17 182.722 172.736 182.914 172.175L182.611 172.071ZM181.8 173.2C181.436 173.449 180.95 173.58 180.329 173.58V173.9C180.993 173.9 181.548 173.76 181.981 173.465L181.8 173.2ZM180.329 172.269C180.597 172.269 180.824 172.187 180.98 172L180.734 171.796C180.655 171.89 180.531 171.949 180.329 171.949V172.269ZM180.98 172C181.125 171.827 181.208 171.579 181.248 171.279L180.93 171.237C180.895 171.509 180.824 171.688 180.734 171.796L180.98 172ZM181.247 171.281C181.291 170.98 181.312 170.606 181.312 170.161H180.992C180.992 170.598 180.971 170.955 180.931 171.235L181.247 171.281ZM181.312 170.161V164.396H180.992V170.161H181.312ZM181.312 164.396C181.312 163.85 181.26 163.414 181.148 163.098L180.847 163.205C180.941 163.47 180.992 163.863 180.992 164.396H181.312ZM181.149 163.101C181.091 162.926 180.994 162.784 180.852 162.687C180.711 162.59 180.54 162.548 180.351 162.548V162.868C180.494 162.868 180.597 162.9 180.672 162.951C180.745 163.002 180.805 163.081 180.846 163.202L181.149 163.101ZM180.351 162.548C180.157 162.548 179.983 162.589 179.836 162.679C179.688 162.77 179.579 162.905 179.507 163.074L179.802 163.2C179.852 163.083 179.92 163.003 180.004 162.952C180.089 162.899 180.202 162.868 180.351 162.868V162.548ZM179.508 163.073C179.373 163.385 179.312 163.828 179.312 164.389H179.632C179.632 163.843 179.693 163.452 179.801 163.201L179.508 163.073ZM179.312 164.389V170.161H179.632V164.389H179.312ZM179.312 170.161C179.312 170.615 179.331 170.993 179.369 171.293L179.687 171.252C179.65 170.971 179.632 170.608 179.632 170.161H179.312ZM179.37 171.296C179.414 171.596 179.503 171.843 179.655 172.012L179.893 171.798C179.801 171.696 179.726 171.52 179.686 171.249L179.37 171.296ZM179.657 172.014C179.822 172.192 180.056 172.269 180.329 172.269V171.949C180.116 171.949 179.979 171.89 179.891 171.796L179.657 172.014ZM185.191 173.6H185.031V173.76H185.191V173.6ZM185.191 161.225V161.065H185.031V161.225H185.191ZM189.438 161.225H189.598V161.065H189.438V161.225ZM189.438 162.863V163.023H189.598V162.863H189.438ZM187.076 162.863V162.703H186.916V162.863H187.076ZM187.076 166.154H186.916V166.314H187.076V166.154ZM189.269 166.154H189.429V165.994H189.269V166.154ZM189.269 167.799V167.959H189.429V167.799H189.269ZM187.076 167.799V167.639H186.916V167.799H187.076ZM187.076 173.6V173.76H187.236V173.6H187.076ZM185.351 173.6V161.225H185.031V173.6H185.351ZM185.191 161.385H189.438V161.065H185.191V161.385ZM189.278 161.225V162.863H189.598V161.225H189.278ZM189.438 162.703H187.076V163.023H189.438V162.703ZM186.916 162.863V166.154H187.236V162.863H186.916ZM187.076 166.314H189.269V165.994H187.076V166.314ZM189.109 166.154V167.799H189.429V166.154H189.109ZM189.269 167.639H187.076V167.959H189.269V167.639ZM186.916 167.799V173.6H187.236V167.799H186.916ZM187.076 173.44H185.191V173.76H187.076V173.44ZM191.192 173.6H191.032V173.76H191.192V173.6ZM191.192 161.225V161.065H191.032V161.225H191.192ZM195.439 161.225H195.599V161.065H195.439V161.225ZM195.439 162.863V163.023H195.599V162.863H195.439ZM193.076 162.863V162.703H192.916V162.863H193.076ZM193.076 166.154H192.916V166.314H193.076V166.154ZM195.27 166.154H195.43V165.994H195.27V166.154ZM195.27 167.799V167.959H195.43V167.799H195.27ZM193.076 167.799V167.639H192.916V167.799H193.076ZM193.076 173.6V173.76H193.236V173.6H193.076ZM191.352 173.6V161.225H191.032V173.6H191.352ZM191.192 161.385H195.439V161.065H191.192V161.385ZM195.279 161.225V162.863H195.599V161.225H195.279ZM195.439 162.703H193.076V163.023H195.439V162.703ZM192.916 162.863V166.154H193.236V162.863H192.916ZM193.076 166.314H195.27V165.994H193.076V166.314ZM195.11 166.154V167.799H195.43V166.154H195.11ZM195.27 167.639H193.076V167.959H195.27V167.639ZM192.916 167.799V173.6H193.236V167.799H192.916ZM193.076 173.44H191.192V173.76H193.076V173.44ZM197.193 173.6H197.033V173.76H197.193V173.6ZM197.193 161.225V161.065H197.033V161.225H197.193ZM199.077 161.225H199.237V161.065H199.077V161.225ZM199.077 171.996H198.917V172.156H199.077V171.996ZM201.461 171.996H201.621V171.836H201.461V171.996ZM201.461 173.6V173.76H201.621V173.6H201.461ZM197.353 173.6V161.225H197.033V173.6H197.353ZM197.193 161.385H199.077V161.065H197.193V161.385ZM198.917 161.225V171.996H199.237V161.225H198.917ZM199.077 172.156H201.461V171.836H199.077V172.156ZM201.301 171.996V173.6H201.621V171.996H201.301ZM201.461 173.44H197.193V173.76H201.461V173.44ZM202.954 173.6H202.794V173.76H202.954V173.6ZM202.954 161.225V161.065H202.794V161.225H202.954ZM204.839 161.225H204.999V161.065H204.839V161.225ZM204.839 173.6V173.76H204.999V173.6H204.839ZM203.114 173.6V161.225H202.794V173.6H203.114ZM202.954 161.385H204.839V161.065H202.954V161.385ZM204.679 161.225V173.6H204.999V161.225H204.679ZM204.839 173.44H202.954V173.76H204.839V173.44ZM207.169 173.6H207.009V173.76H207.169V173.6ZM207.169 161.225V161.065H207.009V161.225H207.169ZM208.646 161.225L208.797 161.171L208.759 161.065H208.646V161.225ZM211.268 168.65L211.118 168.703L211.428 168.643L211.268 168.65ZM211.135 165.275H210.975L210.975 165.281L211.135 165.275ZM211.135 161.225V161.065H210.975V161.225H211.135ZM212.829 161.225H212.989V161.065H212.829V161.225ZM212.829 173.6V173.76H212.989V173.6H212.829ZM211.493 173.6L211.342 173.653L211.38 173.76H211.493V173.6ZM208.8 165.914L208.951 165.862L208.641 165.92L208.8 165.914ZM208.906 169.163H209.066L209.066 169.158L208.906 169.163ZM208.906 173.6V173.76H209.066V173.6H208.906ZM207.329 173.6V161.225H207.009V173.6H207.329ZM207.169 161.385H208.646V161.065H207.169V161.385ZM208.495 161.278L211.118 168.703L211.419 168.596L208.797 161.171L208.495 161.278ZM211.428 168.643L211.295 165.268L210.975 165.281L211.109 168.656L211.428 168.643ZM211.295 165.275V161.225H210.975V165.275H211.295ZM211.135 161.385H212.829V161.065H211.135V161.385ZM212.669 161.225V173.6H212.989V161.225H212.669ZM212.829 173.44H211.493V173.76H212.829V173.44ZM211.644 173.547L208.951 165.862L208.649 165.967L211.342 173.653L211.644 173.547ZM208.641 165.92L208.746 169.168L209.066 169.158L208.96 165.909L208.641 165.92ZM208.746 169.163V173.6H209.066V169.163H208.746ZM208.906 173.44H207.169V173.76H208.906V173.44ZM215.125 173.6H214.965V173.76H215.125V173.6ZM215.125 161.225V161.065H214.965V161.225H215.125ZM219.273 161.225H219.433V161.065H219.273V161.225ZM219.273 162.849V163.009H219.433V162.849H219.273ZM217.009 162.849V162.689H216.849V162.849H217.009ZM217.009 166.449H216.849V166.609H217.009V166.449ZM219.161 166.449H219.321V166.289H219.161V166.449ZM219.161 168.038V168.198H219.321V168.038H219.161ZM217.009 168.038V167.878H216.849V168.038H217.009ZM217.009 171.975H216.849V172.135H217.009V171.975ZM219.357 171.975H219.517V171.815H219.357V171.975ZM219.357 173.6V173.76H219.517V173.6H219.357ZM215.285 173.6V161.225H214.965V173.6H215.285ZM215.125 161.385H219.273V161.065H215.125V161.385ZM219.113 161.225V162.849H219.433V161.225H219.113ZM219.273 162.689H217.009V163.009H219.273V162.689ZM216.849 162.849V166.449H217.169V162.849H216.849ZM217.009 166.609H219.161V166.289H217.009V166.609ZM219.001 166.449V168.038H219.321V166.449H219.001ZM219.161 167.878H217.009V168.198H219.161V167.878ZM216.849 168.038V171.975H217.169V168.038H216.849ZM217.009 172.135H219.357V171.815H217.009V172.135ZM219.197 171.975V173.6H219.517V171.975H219.197ZM219.357 173.44H215.125V173.76H219.357V173.44Z",
            fill: "#263238",
            mask: "url(#path-97-outside-2_13766_18659)"
          }
        )
      ]
    }
  );
}
function PaymentDatePicker({
  date,
  setDate
}) {
  const { service_id } = useParams({ strict: false });
  const [open, setOpen] = React.useState(false);
  const caseCreateDate = sessionStorage.getItem(`${service_id}_created_at`);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        className: cn(
          "bg-slate-100 rounded-none h-8 w-full justify-start text-left font-normal border border-gray-300",
          !date && "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ jsx(CalendarIcon$1, {}),
          date ? dayjs(date).format("MMM DD") : /* @__PURE__ */ jsx("span", { children: "Pick a date" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0 bg-white z-[100]", align: "start", children: /* @__PURE__ */ jsx(
      Calendar,
      {
        mode: "single",
        selected: date,
        onSelect: (selectedDate) => {
          setDate(selectedDate);
          setOpen(false);
        },
        disabled: (date2) => date2 > /* @__PURE__ */ new Date(),
        initialFocus: true,
        fromDate: caseCreateDate ? new Date(caseCreateDate) : void 0
      }
    ) })
  ] });
}
const RecordFileUpload = ({
  sendAttachment,
  setLoading2
}) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB.", {
        action: {
          label: "\u2715",
          onClick: () => {
            toast.dismiss();
          }
        }
      });
      return;
    }
    handleFileUpload(acceptedFiles[0]);
  };
  const onDropRejected = (rejectedFiles) => {
    const message = rejectedFiles.map(
      ({ file, errors }) => errors.map((error) => {
        if (error.code === "file-invalid-type") {
          return `File "${file.name}" has an unsupported type.`;
        }
        return `File "${file.name}" was rejected. Reason: ${error.message}`;
      })
    ).flat().join(", ");
    toast.error(message, {
      action: {
        label: "\u2715",
        onClick: () => {
          toast.dismiss();
        }
      }
    });
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"]
    },
    multiple: false,
    noClick: true
  });
  const { mutate: getPresignedUrls, isPending: uploadFile } = useMutation({
    mutationFn: async ({ file }) => {
      setLoading2 && setLoading2(true);
      const fileType = file.name.split(".").pop();
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size
      });
      const { target_url, file_key, file_type } = data == null ? void 0 : data.data;
      if (!target_url) {
        throw new Error("Presigned URL is missing");
      }
      await uploadTos3({ url: target_url, file });
      return {
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
        key: file_key
      };
    },
    onSuccess: async ({ key, file_name, file_size, file_type }) => {
      sendAttachment(key, file_name, file_size, file_type);
      setLoading2 && setLoading2(false);
    },
    onError: () => {
      setLoading2 && setLoading2(false);
    }
  });
  const handleFileUpload = (file) => {
    toast.promise(
      new Promise((resolve, reject) => {
        getPresignedUrls(
          { file },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error)
          }
        );
      }),
      {
        loading: "Uploading file...",
        success: () => {
          return "File uploaded successfully";
        },
        error: (err) => {
          var _a, _b, _c, _d;
          if (((_a = err.response) == null ? void 0 : _a.status) === 422 && ((_d = (_c = (_b = err.response) == null ? void 0 : _b.data) == null ? void 0 : _c.errData) == null ? void 0 : _d.file_size)) {
            return err.response.data.errData.file_size[0];
          }
          return "Failed to upload file";
        }
      }
    );
  };
  const uploadTos3 = async ({ url, file }) => {
    try {
      const response = await uploadToS3API(url, file);
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
    } catch (error) {
      throw error;
    }
  };
  return /* @__PURE__ */ jsxs("div", { id: "upload-attachments", className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: " w-full py-0 flex justify-between items-center", children: /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        onClick: open,
        variant: "default",
        size: "default",
        className: "h-fit w-full px-0 py-0 text-sm bg-transparent rounded-none hover:bg-transparent text-white",
        children: [
          /* @__PURE__ */ jsx(Upload, { className: "stroke-black " }),
          /* @__PURE__ */ jsx("span", { className: "font-primary text-black", children: "Upload File" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { ...getRootProps(), className: "hidden", children: /* @__PURE__ */ jsx("input", { ...getInputProps() }) }) })
  ] });
};
const RecordPayment = () => {
  const { service_id } = useParams({ strict: false });
  const [mode, setMode] = useState(null);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(void 0);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [fileDetails, setFileDetails] = useState({
    key: "",
    file_name: "",
    file_size: "",
    file_type: ""
  });
  const { mutate: mutateSendPaymentLink, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        case_id: Number(service_id),
        price: Number(price)
      };
      const response = await sendPaymentLink(service_id, payload);
      return response == null ? void 0 : response.data;
    },
    onSuccess: () => {
      toast.success("Successfully sent payment link", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      setIsLinkSent(true);
      setErrors("");
    },
    onError: (error) => {
      var _a;
      if ((error == null ? void 0 : error.status) === 422) {
        setErrors(((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.errData) || {});
      } else {
        toast.error("Failed to send payment link", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    }
  });
  const { mutate: mutatePaymentDocs, isPending: isPendingPaymentDocs } = useMutation({
    mutationFn: async (data) => {
      const response = await casePaymentDocAPI(data);
      return response == null ? void 0 : response.data;
    },
    onSuccess: () => {
      toast.success("offline payment is done", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      setDate(/* @__PURE__ */ new Date());
      setPrice("");
      setFileName("");
      setFileDetails({
        key: "",
        file_name: "",
        file_size: "",
        file_type: ""
      });
      setErrors("");
      setIsSheetOpen(false);
      setMode(null);
    },
    onError: (error) => {
      var _a;
      if ((error == null ? void 0 : error.status) === 422) {
        setErrors(((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.errData) || {});
      } else {
        toast.error("Failed to pay in offline payment", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    }
  });
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      mutateSendPaymentLink();
    }
  };
  const handleSubmit = () => {
    mutatePaymentDocs({
      ...fileDetails,
      case_id: Number(service_id),
      price: Number(price),
      payment_date: date == null ? void 0 : date.toISOString()
    });
  };
  return /* @__PURE__ */ jsxs(
    Sheet,
    {
      open: isSheetOpen,
      onOpenChange: (open) => {
        if (!open) {
          setMode(null);
          setPrice("");
          setDate(/* @__PURE__ */ new Date());
          setIsLinkSent(false);
          setFileName("");
          setIsSheetOpen(false);
          setFileDetails({
            key: "",
            file_name: "",
            file_size: "",
            file_type: ""
          });
          setErrors("");
        }
      },
      children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "h-fit w-fit text-xs px-2 py-1 rounded-none text-white hover:bg-primary font-normal bg-orange-400 opacity-80",
            onClick: () => setIsSheetOpen(true),
            children: "Record Payment"
          }
        ) }),
        /* @__PURE__ */ jsxs(SheetContent, { className: "w-3/12 bg-white flex flex-col p-3 z-50 font-primary", children: [
          /* @__PURE__ */ jsx(SheetClose, { className: "self-end [&_svg]:size-6", children: /* @__PURE__ */ jsx(NotesCloseIcon, { className: "cursor-pointer" }) }),
          !mode && /* @__PURE__ */ jsxs("div", { className: "self-center flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx(SelectPaymentIcon, { className: "size-full" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-center", children: "Select Payment Method" }),
            /* @__PURE__ */ jsx("div", { className: "text-center text-sm", children: "Choose your preferred payment option below" }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-2 w-full flex border border-gray-300 items-center justify-between my-4 cursor-pointer",
                onClick: () => {
                  setMode("online");
                  setPrice("");
                  setErrors("");
                },
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-medium text-md", children: "Online Payment" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Pay Securely with Credit Card or Digital Wallet" })
                  ] }),
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-2 flex w-full border border-gray-300   items-center justify-between mb-4 cursor-pointer",
                onClick: () => {
                  setMode("offline");
                  setPrice("");
                  setErrors("");
                  setDate(/* @__PURE__ */ new Date());
                },
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-medium  text-md ", children: "Offline Payment" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs ", children: "Pay at our physical locations" })
                  ] }),
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                ]
              }
            )
          ] }),
          mode === "online" && /* @__PURE__ */ jsxs("div", { className: "self-center w-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center", children: [
              " ",
              /* @__PURE__ */ jsx(OnlineModeIcon, { className: "size-60" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-center font-medium text-xl", children: "Proceed to Online" }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs my-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "my-1", children: [
                  "Enter amount",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: " *" })
                ] }),
                /* @__PURE__ */ jsx(Label, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: price === null ? "" : price,
                    className: "bg-slate-100 rounded-none h-8",
                    onChange: (e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setPrice(value);
                      }
                    },
                    onKeyDown: handleKeyDown
                  }
                ) }),
                errors.price && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs block", children: errors.price[0] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => mutateSendPaymentLink(),
                disabled: isPending,
                className: "bg-slate-900 hover:bg-slate-800 w-full mb-4 !text-white rounded-none text-smd font-medium",
                children: [
                  /* @__PURE__ */ jsx(SendIcon, { className: "" }),
                  isPending ? "Sending..." : isLinkSent ? "Link Sent" : "Send Payment Link"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                className: "text-center bg-transparent hover:bg-transparent w-full underline  h-fit py-0 text-smd font-medium text-black flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-80",
                onClick: () => {
                  setMode(null);
                  setPrice("");
                  setDate(/* @__PURE__ */ new Date());
                  setErrors("");
                },
                disabled: isPending,
                children: /* @__PURE__ */ jsx("span", { children: "Change payment mode" })
              }
            )
          ] }),
          mode === "offline" && /* @__PURE__ */ jsxs("div", { className: "self-center w-full", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(OfflineModeIcon, { className: "size-60" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-center font-medium text-xl", children: "Proceed to Offline" }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs my-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "my-1 ", children: [
                  "Enter amount you paid",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: " *" })
                ] }),
                /* @__PURE__ */ jsx(Label, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: price === null ? "" : price,
                    className: "bg-slate-100 rounded-none h-8",
                    maxLength: 8,
                    onChange: (e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setPrice(value);
                      }
                    }
                  }
                ) }),
                errors.price && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs block", children: errors.price[0] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs my-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "my-1", children: [
                  "Select Date you paid",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: " *" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(PaymentDatePicker, { date, setDate }) }),
                errors.payment_date && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs block", children: errors.payment_date[0] })
              ] }),
              /* @__PURE__ */ jsx(Button, { className: "bg-gray-400 justify-between  hover:bg-gray-300 w-full !text-black rounded-none text-smd font-medium", children: fileName ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "justify-self-start", children: sliceFilename(fileName, 25) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    onClick: () => {
                      setFileName("");
                      setFileDetails({
                        key: "",
                        file_name: "",
                        file_size: "",
                        file_type: ""
                      });
                    },
                    className: "text-red-500 hover:text-red-700 ml-2 font-semibold bg-transparent hover:bg-transparent",
                    children: /* @__PURE__ */ jsx(DeleteIcon, {})
                  }
                )
              ] }) : /* @__PURE__ */ jsx(
                RecordFileUpload,
                {
                  sendAttachment: (file_key, file_name, file_size, file_type) => {
                    setFileDetails({
                      key: file_key,
                      file_name,
                      file_size,
                      file_type
                    });
                    setFileName(file_name);
                  },
                  loading2: isPendingPaymentDocs
                }
              ) }),
              errors.key && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs block", children: errors.key[0] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  className: "bg-gray-900 hover:bg-gray-800 w-full mb-4 mt-4 !text-white rounded-none text-smd font-medium",
                  onClick: handleSubmit,
                  children: isPendingPaymentDocs ? "Submitting..." : "Submit"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  className: "text-center w-full py-0 h-fit underline cursor-pointer text-smd font-medium bg-transparent hover:bg-transparent text-black flex items-center justify-center gap-2 disabled:cursor-not-allowed",
                  onClick: () => {
                    setMode(null);
                    setPrice("");
                    setDate(/* @__PURE__ */ new Date());
                    setErrors("");
                    setFileName("");
                    setFileDetails({
                      key: "",
                      file_name: "",
                      file_size: "",
                      file_type: ""
                    });
                  },
                  disabled: isPendingPaymentDocs,
                  children: /* @__PURE__ */ jsx("span", { children: "Change payment mode" })
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
};
dayjs.extend(isSameOrBefore);
const ServiceViewComponent = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const { service_id } = useParams({ strict: false });
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isManage = pathname.includes("/manage");
  const [date, setDate] = useState();
  const [unAuthorized, setUnAuthorized] = useState(false);
  const [showNextHearingDialog, setShowNextHearingDialog] = useState(false);
  const [nextHearingReason, setNextHearingReason] = useState("");
  const [nextHearingError, setNextHearingError] = useState("");
  const [selectedNextHearingDate, setSelectedNextHearingDate] = useState(null);
  const { isUser } = useUserDetails();
  const { caseStagesData, serviceData, setServiceData } = UseContextAPI();
  const isLegalOpinion = (serviceData == null ? void 0 : serviceData.service_type) === "Legal opinion";
  const activateFinalHearing = ((_a = caseStagesData == null ? void 0 : caseStagesData.stages) == null ? void 0 : _a.find((sub) => sub.code === "CSFG")) && ((_c = (_b = caseStagesData == null ? void 0 : caseStagesData.stages) == null ? void 0 : _b.find((sub) => sub.code === "CSFG")) == null ? void 0 : _c.status) === "completed";
  const deactivatedFinalHearing = ((_d = caseStagesData == null ? void 0 : caseStagesData.stages) == null ? void 0 : _d.find(
    (sub) => sub.code === "TRPH"
  )) ? ((_f = (_e = caseStagesData == null ? void 0 : caseStagesData.stages) == null ? void 0 : _e.find((sub) => sub.code === "TRPH")) == null ? void 0 : _f.status) === "completed" : ((_h = (_g = caseStagesData == null ? void 0 : caseStagesData.stages) == null ? void 0 : _g.find((sub) => sub.code === "CTPG")) == null ? void 0 : _h.status) === "completed";
  const {
    isLoading,
    data: singleServiceDetails,
    refetch
  } = useQuery({
    queryKey: ["single-service-details", service_id],
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      var _a2;
      try {
        if (!service_id) return;
        const response = await singleServiceAPI(service_id);
        if (response.status === 200 || response.status === 201) {
          const { data } = response == null ? void 0 : response.data;
          setServiceData(data);
          sessionStorage.setItem(`${service_id}_created_at`, data == null ? void 0 : data.created_at);
          return data;
        }
        if (response.status === 403) {
          setUnAuthorized(true);
          toast.error((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.message, { duration: 4e3 });
        }
      } catch {
        throw new Error("Failed to fetch case data");
      }
    }
  });
  const fetchCaseNotes = async ({ pageParam = 1 }) => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q;
    try {
      if (!service_id) return;
      let queryParams = {};
      queryParams = {
        page: pageParam,
        page_size: 15,
        types: "HEARING_DATE_REASON"
      };
      const response = await caseViewNotesAPI(service_id, queryParams);
      return {
        data: (_b2 = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.data) == null ? void 0 : _b2.records,
        nextCursor: ((_e2 = (_d2 = (_c2 = response == null ? void 0 : response.data) == null ? void 0 : _c2.data) == null ? void 0 : _d2.pagination_info) == null ? void 0 : _e2.next_page) ? ((_h2 = (_g2 = (_f2 = response == null ? void 0 : response.data) == null ? void 0 : _f2.data) == null ? void 0 : _g2.pagination_info) == null ? void 0 : _h2.current_page) + 1 : null,
        prevCursor: ((_k2 = (_j2 = (_i2 = response == null ? void 0 : response.data) == null ? void 0 : _i2.data) == null ? void 0 : _j2.pagination_info) == null ? void 0 : _k2.current_page) !== 1 ? ((_n2 = (_m2 = (_l2 = response == null ? void 0 : response.data) == null ? void 0 : _l2.data) == null ? void 0 : _m2.pagination_info) == null ? void 0 : _n2.current_page) - 1 : null,
        totalRecords: (_q = (_p2 = (_o2 = response == null ? void 0 : response.data) == null ? void 0 : _o2.data) == null ? void 0 : _p2.pagination_info) == null ? void 0 : _q.total_records
      };
    } catch (err) {
      throw new Error("Failed to fetch case notes");
    }
  };
  const {
    data: nextHearingNotes,
    fetchNextPage,
    hasNextPage,
    isFetching: isLoadingCaseNote,
    isFetchingNextPage,
    refetch: refetchCaseSummary
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-hearing-summary", service_id],
    queryFn: fetchCaseNotes,
    getNextPageParam: (lastPage) => {
      var _a2;
      return (_a2 = lastPage == null ? void 0 : lastPage.nextCursor) != null ? _a2 : null;
    },
    getPreviousPageParam: (firstPage) => {
      var _a2;
      return (_a2 = firstPage == null ? void 0 : firstPage.prevCursor) != null ? _a2 : null;
    },
    refetchOnWindowFocus: false
  });
  const {
    mutate: mutateUpdateNextHearingDate,
    isPending: isPendingHearingDate
  } = useMutation({
    mutationKey: ["update_next_hearing_date"],
    mutationFn: async (data) => {
      const response = await caseNextHearingDateAPI(data, service_id);
      return response;
    },
    onSuccess: () => {
      refetch();
      if (selectedNextHearingDate) {
        setDate(selectedNextHearingDate);
      }
      refetchCaseSummary();
      toast.success("Hearing date Updated Successfully", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
    },
    onError: () => {
      toast.error("Failed to update hearing date", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
    }
  });
  const handleConfirmNextHearing = () => {
    if (!nextHearingReason.trim()) {
      setNextHearingError("Please enter a reason");
      return;
    }
    if (selectedNextHearingDate) {
      const formattedDate = dayjs(selectedNextHearingDate).tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ssZ");
      mutateUpdateNextHearingDate({
        next_hearing_date: formattedDate,
        note: nextHearingReason,
        case_stage: singleServiceDetails == null ? void 0 : singleServiceDetails.stage,
        case_sub_stage: "Summons"
      });
    }
    setShowNextHearingDialog(false);
  };
  const handleDateChange = (value) => {
    if (value) {
      setSelectedNextHearingDate(value);
      setShowNextHearingDialog(true);
    }
  };
  const handleManage = () => {
    const basePath = isLegalOpinion ? `/legal-opinion/service/${service_id}${isUser() ? "/user/manage" : "/manage"}` : `/litigations/service/${service_id}${isUser() ? "/user/manage" : "/manage"}`;
    navigate({ to: basePath });
  };
  const handleManageClose = () => {
    if (isLegalOpinion) {
      navigate({
        to: `/legal-opinion/service/${service_id}/notes`
      });
    } else {
      navigate({
        to: `/litigations/service/${service_id}/case-history`
      });
    }
  };
  const handleBack = () => {
    const origin = sessionStorage.getItem("case-origin");
    if (origin === "legal-opinion") {
      navigate({ to: "/legal-opinion" });
    } else if (origin === "litigation") {
      navigate({ to: "/litigations" });
    } else {
      navigate({ to: "/dashboard" });
    }
  };
  useEffect(() => {
    if (singleServiceDetails == null ? void 0 : singleServiceDetails.next_hearing_date) {
      setDate(dayjs(singleServiceDetails.next_hearing_date).toDate());
    }
  }, [singleServiceDetails]);
  return /* @__PURE__ */ jsx(Fragment, { children: isLoading || unAuthorized ? /* @__PURE__ */ jsx(
    LoadingComponent,
    {
      loading: isLoading || unAuthorized,
      message: "Case details..."
    }
  ) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "hover:bg-gray-100 px-0 !shadow-none cursor-pointer border h-7 w-8 bg-gray-50 border-gray-300 rounded-none hover:border-gray-400",
            onClick: handleBack,
            children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 max-w-full overflow-hidden", children: [
          /* @__PURE__ */ jsxs("p", { className: "hidden lg:flex items-center m-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-black text-opacity-80 font-normal text-[11px] 3xl:text-sm", children: "File ID :" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-black font-normal bg-[#F2F2F2] px-1.5 mx-1 text-xs 3xl:text-base ", children: singleServiceDetails == null ? void 0 : singleServiceDetails.temp_id })
          ] }),
          (serviceData == null ? void 0 : serviceData.cnr_number) && /* @__PURE__ */ jsxs("p", { className: "hidden lg:flex items-center m-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-black pr-1 text-opacity-80 font-normal text-[11px] 3xl:text-sm", children: "CNR Number :" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-black font-normal  bg-[#F2F2F2] px-2  text-xs 3xl:text-base", children: serviceData == null ? void 0 : serviceData.cnr_number })
          ] }),
          (serviceData == null ? void 0 : serviceData.cmp_number) && /* @__PURE__ */ jsxs("p", { className: "hidden lg:flex items-center m-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-black pr-1 text-opacity-80 font-normal text-[11px] 3xl:text-sm", children: "CMP Number :" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-black font-normal  bg-[#F2F2F2] px-2  text-xs 3xl:text-base", children: serviceData == null ? void 0 : serviceData.cmp_number })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(RecordPayment, {}),
        /* @__PURE__ */ jsx(Todo, { case_id: service_id, iconType: "alternate" }),
        !isManage ? /* @__PURE__ */ jsxs(
          Button,
          {
            className: "flex items-center gap-2 h-7 py-1 bg-gray-200 cursor-pointer border border-black rounded-none font-normal text-smd 3xl:text-base",
            onClick: handleManage,
            children: [
              /* @__PURE__ */ jsx(ManageCaseIcon, {}),
              /* @__PURE__ */ jsx("span", { children: "Manage Case" })
            ]
          }
        ) : /* @__PURE__ */ jsx(
          Button,
          {
            className: "flex items-center gap-2 h-7 border-red-500 cursor-pointer bg-white border  hover:bg-gray-100 rounded-none font-normal text-sm 3xl:text-base",
            onClick: handleManageClose,
            children: /* @__PURE__ */ jsx("span", { className: "text-red-500 font-medium", children: "Close" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[25%_75%] space-x-4 h-[calc(100vh-135px)] relative", children: [
      /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 h-full overflow-y-auto relative hearingdate", children: [
          /* @__PURE__ */ jsx(DetailsCard, { details: serviceData }),
          (serviceData == null ? void 0 : serviceData.service_type) === "Legal opinion" && /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 border rounded-none border-gray-400 p-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CalendarIcon, { className: "h-4 w-4 text-gray-600" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-normal text-gray-800", children: [
              "Due Date :",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-normal", children: (serviceData == null ? void 0 : serviceData.due_date) ? dayjs(serviceData == null ? void 0 : serviceData.due_date).format("DD MMM YYYY") : "--" })
            ] })
          ] }),
          (serviceData == null ? void 0 : serviceData.service_type) === "Litigation" && /* @__PURE__ */ jsx("div", { children: activateFinalHearing && /* @__PURE__ */ jsxs("div", { className: "p-2 bg-[#F0F4FA] font-normal space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between items-center gap-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 lg:text-xs xl:text-base 2xl:text-lg 3xl:text-xl", children: isUser() || deactivatedFinalHearing ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsx("div", { className: "text-gray-600 text-xs 2xl:text-sm shrink-0", children: "Next Hearing Date" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs 2xl:text-sm truncate max-w-[180px]", children: (singleServiceDetails == null ? void 0 : singleServiceDetails.next_hearing_date) ? dayjs(
                  singleServiceDetails.next_hearing_date
                ).format("DD MMM YYYY h:mm a") : "--" })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  DatePicker,
                  {
                    onDateSelect: handleDateChange,
                    caseDetails: singleServiceDetails
                  }
                ),
                !isPendingHearingDate ? /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm", children: date ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs truncate max-w-[120px]", children: formatDate(String(date)) }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: dayjs(date).format("h:mm a") })
                ] }) : "--" }) : /* @__PURE__ */ jsx(Loader2, { className: "animate-spin h-4 w-4" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "shrink-0 self-start", children: /* @__PURE__ */ jsx(
                NextHearingDrawer,
                {
                  isFetchingNextPage,
                  hasNextPage,
                  fetchNextPage,
                  caseNotes: nextHearingNotes,
                  isLoadingCaseNote
                }
              ) })
            ] }),
            ((_l = (_k = (_j = (_i = nextHearingNotes == null ? void 0 : nextHearingNotes.pages) == null ? void 0 : _i[0]) == null ? void 0 : _j.data) == null ? void 0 : _k[0]) == null ? void 0 : _l.note) && /* @__PURE__ */ jsx("div", { className: "w-full text-xs 3xl:text-sm text-gray-600 font-normal", children: /* @__PURE__ */ jsx(
              NoteWithShowMore,
              {
                notes: ((_p = (_o = (_n = (_m = nextHearingNotes == null ? void 0 : nextHearingNotes.pages) == null ? void 0 : _m[0]) == null ? void 0 : _n.data) == null ? void 0 : _o[0]) == null ? void 0 : _p.note) || ""
              }
            ) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-full ", children: /* @__PURE__ */ jsx(Outlet, {}) })
      ] }),
      /* @__PURE__ */ jsx(
        NextHearingDialog,
        {
          removeConfirm: showNextHearingDialog,
          setRemoveConfirm: setShowNextHearingDialog,
          onCancel: () => setShowNextHearingDialog(false),
          onConfirm: handleConfirmNextHearing,
          isDeleteLoading: isPendingHearingDate,
          setApproveRejectReason: setNextHearingReason,
          dialogType: "approve",
          appRejError: nextHearingError,
          setAppRejError: setNextHearingError,
          isPending: isPendingHearingDate
        }
      )
    ] })
  ] }) });
};

export { ServiceViewComponent as S };
//# sourceMappingURL=index-CcJHPsDE.mjs.map
