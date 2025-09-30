import { jsx, jsxs } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { B as Button } from "./router-e7zdrxGz.js";
import { I as Input } from "./input-CcfBn-WR.js";
import { A as AddCMPNumberAPI } from "./manage-tW0NLyej.js";
import { a as labelSubStages } from "./statusConstants-t7T05Rlh.js";
import { i as isSubStageCompleted, M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import { c as getSubStageStatuses } from "./manage-CWSyPq63.js";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { G as GetCaseNotes } from "./GetCaseNotes-DSbNb1Jm.js";
import { P as PendingStepOverlay } from "./PendingStepOverlay-BxgRCvn6.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./index-Bb_5490h.js";
import "./Loading-DQypZbMn.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-BKF0DBvK.js";
import "@radix-ui/react-tooltip";
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "./pending-icon-C39HKFOC.js";
import "./approved-Icon-D4Mj_64A.js";
import "./current-icon-PhyH9fHB.js";
import "./complete-logo-DwVwh2_J.js";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-BfKn0GZN.js";
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
import "./avatar-xL-W5RbG.js";
import "@radix-ui/react-avatar";
import "./sheet-vrO17VYZ.js";
import "@radix-ui/react-dialog";
import "./skeleton-BAyQx-Zm.js";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
const CMPNumberAllotment = ({
  stage,
  subStage,
  mappedCaseStagesData
}) => {
  const { service_id } = useParams({ strict: false });
  const [cmpError, setCmpError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [cmpNumber, setCmpNumber] = useState("");
  const { caseStagesData, serviceData, setServiceData } = UseContextAPI();
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
  const { mutate: mutateAddCMPNumber, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await AddCMPNumberAPI(service_id, data);
      return response;
    },
    onSuccess: () => {
      setServiceData((prev) => ({
        ...prev,
        cmp_number: cmpNumber
      }));
      setIsEditing(false);
    },
    onError: (error) => {
      if (error?.status === 404 || error?.status === 401) {
        setCmpError(error.message);
      } else if (error.status == 422) {
        let errors = error.data.errData;
        setCmpError(errors?.cmp_number[0]);
      } else if (error.status == 409) {
        let errors = error.message;
        setCmpError(errors);
      }
    }
  });
  const handleCMPNumberSubmit = () => {
    if (!cmpNumber?.trim()) {
      setCmpError("CMP Number is required");
      return;
    }
    mutateAddCMPNumber({ cmp_number: cmpNumber });
  };
  const handleCMPNumberClose = () => {
    setCmpNumber(serviceData?.cmp_number ?? "");
    setIsEditing(false);
    setCmpError("");
  };
  const handleCmpKeyDown = (event) => {
    if (event.key === "Enter" && cmpNumber.length > 0) {
      handleCMPNumberSubmit();
    }
  };
  useEffect(() => {
    if (serviceData && typeof serviceData.cmp_number === "string") {
      setCmpNumber(serviceData.cmp_number);
    }
  }, [serviceData]);
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: isPrevSubStageCompleted ? /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        showActionButton: !isEditing && !!serviceData?.cmp_number,
        caseStage: stage,
        caseSubStage: subStage,
        showUploadButton: false
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-2 relative w-full  h-[calc(100%-60px)] overflow-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "py-4 px-2 flex  gap-4 w-full", children: /* @__PURE__ */ jsxs("div", { className: "w-full space-y-1", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "CMP Number",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600 -mt-0", children: "*" })
        ] }),
        !isEditing && serviceData?.cmp_number ? /* @__PURE__ */ jsxs("div", { className: "flex bg-slate-100 justify-between items-center text-sm gap-2 border-none p-2", children: [
          /* @__PURE__ */ jsx("p", { children: serviceData?.cmp_number }),
          !isCurrentStageCompleted && /* @__PURE__ */ jsx(
            Button,
            {
              className: "bg-transparent h-fit py-0 font-semibold underline text-xs cursor-pointer",
              onClick: () => setIsEditing(true),
              children: "Edit"
            }
          )
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full mt-1", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Enter CMP Number",
              value: cmpNumber,
              onChange: (e) => {
                const value = e.target.value.toUpperCase().trim();
                if (/^[A-Z0-9]*$/.test(value)) {
                  setCmpNumber(value);
                  setCmpError("");
                }
              },
              onKeyDown: handleCmpKeyDown,
              maxLength: 16,
              disabled: isPending || isCurrentStageCompleted,
              className: "w-full rounded-none border h-fit border-gray-200 focus:outline-none focus-visible:outline-none bg-gray-100 text-black"
            }
          ),
          cmpError && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs block mt-1", children: cmpError }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
            isEditing && /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleCMPNumberClose,
                disabled: isPending,
                variant: "outline",
                className: "rounded-none text-red-500 text-xs h-8 py-1.5 font-normal cursor-pointer",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleCMPNumberSubmit,
                disabled: isPending || isCurrentStageCompleted,
                className: "rounded-none text-white text-xs bg-black h-8 py-1.5 font-normal hover:bg-black cursor-pointer",
                children: isPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Submit"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] })
  ] }) }) : /* @__PURE__ */ jsx(PendingStepOverlay, { title: prevSubStage }) });
};
export {
  CMPNumberAllotment as default
};
