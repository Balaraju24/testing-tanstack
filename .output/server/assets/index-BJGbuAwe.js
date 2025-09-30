import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { a as singleServiceAPI } from "./service-1g9dZr4o.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import { G as GetCaseNotes } from "./GetCaseNotes-DSbNb1Jm.js";
import { P as PendingStepOverlay } from "./PendingStepOverlay-BxgRCvn6.js";
import { c as getSubStageStatuses } from "./manage-CWSyPq63.js";
import { a as labelSubStages } from "./statusConstants-t7T05Rlh.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./index-Bb_5490h.js";
import "react";
import "./Provider-DRuE0d-A.js";
import "./litigations-2Q1m8RsY.js";
import "./manage-tW0NLyej.js";
import "./Loading-DQypZbMn.js";
import "./router-e7zdrxGz.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-BKF0DBvK.js";
import "@radix-ui/react-tooltip";
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "lucide-react";
import "./pending-icon-C39HKFOC.js";
import "./approved-Icon-D4Mj_64A.js";
import "./current-icon-PhyH9fHB.js";
import "./complete-logo-DwVwh2_J.js";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-BfKn0GZN.js";
import "vaul";
import "./notification-kzFgGftV.js";
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
import "./input-CcfBn-WR.js";
import "./sheet-vrO17VYZ.js";
import "@radix-ui/react-dialog";
import "./skeleton-BAyQx-Zm.js";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
const UserCMPNumberAllotment = ({
  stage,
  subStage,
  mappedCaseStagesData
}) => {
  const { service_id } = useParams({ strict: false });
  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData
  });
  const prevSubStage = labelSubStages[subStageLabel];
  const { data: caseDetails } = useQuery({
    queryKey: ["case-details", service_id],
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await singleServiceAPI(service_id);
        if (response.status === 200 || response.status === 201) {
          const { data } = response?.data;
          return data;
        }
      } catch {
        throw new Error("Failed to fetch case data");
      }
    }
  });
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: isPrevSubStageCompleted ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showUploadButton: false,
        showNoteButton: false
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "p-2 relative w-full h-[calc(100%-60px)] overflow-auto", children: [
      caseDetails?.cmp_number ? /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: caseDetails?.cmp_number && /* @__PURE__ */ jsxs("div", { className: "p-2 inline-block bg-gray-100 border border-gray-200", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "CMP Number :" }),
        " ",
        caseDetails?.cmp_number
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "text-center  text-lg h-[calc(100%-80px)] flex items-center justify-center ", children: /* @__PURE__ */ jsxs("div", { children: [
        "Currently, this case ",
        /* @__PURE__ */ jsx("strong", { children: " cmp " }),
        " number is not alloted."
      ] }) }),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] })
  ] }) : /* @__PURE__ */ jsx(PendingStepOverlay, { title: prevSubStage }) });
};
export {
  UserCMPNumberAllotment as default
};
