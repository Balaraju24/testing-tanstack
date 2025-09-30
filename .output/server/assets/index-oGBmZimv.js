import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { C as Calendar } from "./calendar-Dtf51Yqv.js";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-CzRIlGkS.js";
import { d as updateDueDateAPI } from "./legalOpinion-qNiAW4Gj.js";
import { a as labelSubStages } from "./statusConstants-t7T05Rlh.js";
import { i as isSubStageCompleted, M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import { c as getSubStageStatuses } from "./manage-CWSyPq63.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { P as PendingStepOverlay } from "./PendingStepOverlay-BxgRCvn6.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "react-error-boundary";
import "react-day-picker";
import "@radix-ui/react-popover";
import "./index-oJQ5f2gj.js";
import "./Loading-CtQhAIXf.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-D8srg3RR.js";
import "@radix-ui/react-tooltip";
import "./pending-icon-C39HKFOC.js";
import "./approved-Icon-D4Mj_64A.js";
import "./current-icon-PhyH9fHB.js";
import "./complete-logo-BunEj7SL.js";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-Bgbbi7bt.js";
import "vaul";
import "./notification-kzFgGftV.js";
import "./service-1g9dZr4o.js";
import "./fileUpload-BBm5-XTb.js";
import "axios";
import "@radix-ui/react-progress";
import "react-dropzone";
import "./default-user-EV710LEP.js";
import "./notes-delete-icon-CyozBLV8.js";
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./avatar-DZ-dXD0g.js";
import "@radix-ui/react-avatar";
import "./input-G3xZAzeG.js";
import "./sheet-BXmbu-1p.js";
import "@radix-ui/react-dialog";
import "./skeleton-CElu2WzA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
const DueDateIcon = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: 320,
    height: 310,
    viewBox: "0 0 900 600",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ jsx("path", { fill: "transparent", d: "M0 0h900v600H0z" }),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M368.925 74.138v67.707m180.553-67.707v67.707m-282.112 92.304h383.673m11.283-13.313v191.837c0 67.707-33.853 112.845-112.845 112.845H368.925c-78.991 0-112.845-45.138-112.845-112.845V220.836c0-67.707 33.854-112.845 112.845-112.845h180.552c78.992 0 112.845 45.138 112.845 112.845z",
          stroke: "#E1E4E5",
          strokeWidth: 24,
          strokeMiterlimit: 10,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M542.587 338.2h.203m-.203 67.707h.203M459.1 338.2h.203m-.203 67.707h.203M375.569 338.2h.202m-.202 67.707h.202",
          stroke: "#E1E4E5",
          strokeWidth: 48,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "m239.015 144.656-57.1 21.473C168.756 171.066 158 186.682 158 200.805v85.314c0 13.55 8.926 31.347 19.796 39.5L227 362.477c16.135 12.172 42.682 12.172 58.816 0l49.204-36.858c10.871-8.153 19.796-25.95 19.796-39.5v-85.314c0-14.123-10.756-29.739-23.915-34.676l-57.1-21.473c-9.726-3.559-25.288-3.559-34.786 0z",
          fill: "#aeaeae"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M256.26 300.849c-27.781 0-50.301-22.521-50.301-50.301 0-27.781 22.52-50.301 50.301-50.301 27.78 0 50.301 22.52 50.301 50.301 0 27.78-22.521 50.301-50.301 50.301z",
          stroke: "#fff",
          strokeWidth: 11,
          strokeMiterlimit: 10,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M253.117 234.829v11.695c0 4.401 2.264 8.551 6.162 10.815l9.557 5.784",
          stroke: "#fff",
          strokeWidth: 11,
          strokeMiterlimit: 10,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M222.635 120.378c15.96 7.917 37.144-2.263 37.144-2.263s-4.708-23.011-20.677-30.917c-15.96-7.917-37.135 2.251-37.135 2.251s4.708 23.012 20.668 30.929z",
          fill: "url(#a)"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: 11.515,
          transform: "matrix(1 0 0 -1 209.879 461.175)",
          fill: "#aeaeae"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          r: 17.718,
          transform: "matrix(1 0 0 -1 668.35 91.494)",
          fill: "#aeaeae"
        }
      ),
      /* @__PURE__ */ jsx("circle", { cx: 718.423, cy: 237.046, r: 11.51, fill: "#aeaeae" }),
      /* @__PURE__ */ jsx("circle", { cx: 726.197, cy: 349.344, r: 16.268, fill: "#E1E4E5" }),
      /* @__PURE__ */ jsx("circle", { cx: 695.878, cy: 494.907, r: 14.09, fill: "#E1E4E5" }),
      /* @__PURE__ */ jsx("ellipse", { cx: 197.861, cy: 387.348, rx: 8.543, ry: 7.035, fill: "#E1E4E5" }),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: 246.606,
          cy: 535.089,
          r: 10.05,
          transform: "rotate(90 246.606 535.089)",
          fill: "#E1E4E5"
        }
      ),
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
        "linearGradient",
        {
          id: "a",
          x1: 283.924,
          y1: 145.073,
          x2: 152.284,
          y2: 40.946,
          gradientUnits: "userSpaceOnUse",
          children: [
            /* @__PURE__ */ jsx("stop", { stopColor: "#fff" }),
            /* @__PURE__ */ jsx("stop", { offset: 1, stopColor: "#EEE" })
          ]
        }
      ) })
    ]
  }
);
const SetDueDate = ({
  stage,
  subStage,
  mappedCaseStagesData
}) => {
  const { service_id } = useParams({ strict: false });
  const [selectedDate, setSelectedDate] = useState(void 0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { isUser } = useUserDetails();
  const { serviceData, setServiceData, caseStagesData } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData
  });
  const prevSubStage = labelSubStages[subStageLabel];
  const disabledDays = { before: /* @__PURE__ */ new Date() };
  const updateDueDateMutation = useMutation({
    mutationFn: async ({
      service_id: service_id2,
      payload
    }) => {
      return await updateDueDateAPI(service_id2, payload);
    },
    onSuccess: (data) => {
      setServiceData((prev) => ({
        ...prev,
        due_date: dayjs(selectedDate).format("DD MMM YYYY")
      }));
      toast.success("Due date updated successfully");
      setApiError("");
      setIsEditing(false);
    },
    onError: (response) => {
      let errorMessage = "Failed to update due date";
      if (response?.data?.errData) {
        errorMessage = response?.data?.errData.due_date[0];
      } else if (response?.response?.data?.message) {
        errorMessage = response.response.data.message;
      } else if (response?.message) {
        errorMessage = response.message;
      }
      setApiError(errorMessage);
    }
  });
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsPopoverOpen(false);
  };
  const handleSubmit = () => {
    const formattedDate = selectedDate ? dayjs(selectedDate).format("DD MMM YYYY") : "";
    const payload = {
      due_date: formattedDate,
      stage,
      sub_stage: subStage
    };
    setApiError("");
    updateDueDateMutation.mutate({ service_id, payload });
  };
  useEffect(() => {
    if (serviceData?.due_date) {
      const existingDate = serviceData.due_date;
      setSelectedDate(existingDate);
    }
    if (serviceData?.due_date === null) {
      setIsEditing(true);
    }
  }, [serviceData?.due_date]);
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: isPrevSubStageCompleted ? /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: isUser() ? false : serviceData?.due_date !== null && !isEditing,
        showUploadButton: false,
        showNoteButton: false
      }
    ),
    isUser() ? /* @__PURE__ */ jsx("div", { className: "p-4", children: serviceData?.due_date ? /* @__PURE__ */ jsx("div", { className: "flex bg-slate-100 justify-between items-center gap-2 border p-2", children: /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
      "Due Date :",
      " ",
      dayjs(serviceData?.due_date).format("DD MMM YYYY")
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: " flex flex-col items-center justify-center text-center text-base", children: [
      /* @__PURE__ */ jsx(DueDateIcon, { className: "" }),
      /* @__PURE__ */ jsx("span", { className: " text-gray-400 font-normal text-base", children: "Due date not assigned" })
    ] }) }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "p-2 w-full h-[calc(100%-60px)] overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white relative p-2", children: !isEditing ? /* @__PURE__ */ jsxs("div", { className: "flex bg-slate-100 justify-between items-center gap-2 border border-gray-300 p-2", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        "Due Date :",
        " ",
        dayjs(serviceData?.due_date).format("DD MMM YYYY")
      ] }),
      !isCurrentStageCompleted && /* @__PURE__ */ jsx(
        Button,
        {
          className: "bg-transparent h-fit py-0 font-semibold underline text-xs !shadow-none cursor-pointer",
          onClick: () => setIsEditing(true),
          children: "Edit"
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 max-w-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
          Popover,
          {
            open: isPopoverOpen,
            onOpenChange: setIsPopoverOpen,
            children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  id: "due-date",
                  className: "w-full justify-start  border border-gray-300 text-left font-normal !rounded-none  cursor-pointer pr-10",
                  children: [
                    /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                    selectedDate ? dayjs(selectedDate).format("DD MMM YYYY") : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Select a date" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx(
                PopoverContent,
                {
                  className: "w-auto p-0 bg-white",
                  align: "start",
                  children: /* @__PURE__ */ jsx(
                    Calendar,
                    {
                      mode: "single",
                      selected: selectedDate,
                      onSelect: handleDateSelect,
                      captionLayout: "dropdown",
                      disabled: disabledDays,
                      fromYear: 2025,
                      toYear: 2030,
                      className: "[&>div>button.bg-accent]:!bg-transparent [&>div>button.bg-accent]:!text-current",
                      modifiers: {
                        today: /* @__PURE__ */ new Date()
                      },
                      modifiersClassNames: {
                        today: "text-blue-900 "
                      }
                    }
                  )
                }
              )
            ]
          }
        ) }),
        apiError && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: apiError })
      ] }),
      serviceData?.due_date === null ? /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleSubmit,
          disabled: updateDueDateMutation.isPending,
          className: " w-full bg-black hover:bg-black  text-white cursor-pointer font-medium active:scale-95 duration-300 transition-all text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none",
          children: updateDueDateMutation.isPending ? "Adding..." : "Add"
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => setIsEditing(false),
            disabled: updateDueDateMutation.isPending,
            className: " flex-1 bg-transparent cursor-pointer border rounded-none active:scale-95 duration-300 transition-all  text-black font-medium text-sm 3xl:text-base px-4 py-0 h-8 outline-none focus:outline-none hover:bg-transparent",
            children: "Close"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleSubmit,
            disabled: updateDueDateMutation.isPending,
            className: "flex-1 bg-black hover:bg-black  text-white cursor-pointer font-medium active:scale-95 duration-300 transition-all text-sm 3xl:text-base px-4 py-0 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-none  outline-none focus:outline-none",
            children: updateDueDateMutation.isPending ? "Updating..." : "Update"
          }
        )
      ] })
    ] }) }) }) })
  ] }) }) : /* @__PURE__ */ jsx(PendingStepOverlay, { title: prevSubStage }) });
};
export {
  SetDueDate as default
};
