import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { g as getSingleReviewAPI, n as getCaseReviewStatusAPI } from "./manage-tW0NLyej.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { L as LoadingComponent } from "./Loading-CtQhAIXf.js";
import { D as DisposalCallLogo } from "./disposal-call-logo-CWTLh5rA.js";
import { S as SubmitCaseIcon } from "./submit-case-icon-Ln9ZnlEX.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "@tanstack/react-router-ssr-query";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./index-oJQ5f2gj.js";
import "./Provider-DRuE0d-A.js";
import "./litigations-2Q1m8RsY.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-D8srg3RR.js";
import "@radix-ui/react-tooltip";
import "./manage-CWSyPq63.js";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "lucide-react";
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
const UserDisposalCall = () => {
  const { service_id } = useParams({ strict: false });
  const { isFetching, data: reviewDetails } = useQuery({
    queryKey: ["review-details", service_id],
    enabled: !!service_id,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await getSingleReviewAPI(Number(service_id));
        if (response.status === 200 || response.status === 201) {
          const data = response?.data?.data;
          return data;
        }
      } catch {
        throw new Error("Failed to fetch Data");
      }
    },
    refetchOnWindowFocus: false
  });
  const { data: caseReviewStatus } = useQuery({
    queryKey: ["case-review-status", service_id],
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await getCaseReviewStatusAPI(service_id);
        if (response.status === 200 || response.status === 201) {
          const { data } = response?.data;
          return data;
        }
      } catch {
        throw new Error("Failed to fetch case data");
      }
    }
  });
  const handleClick = () => {
    window.open(`/review/${service_id}`, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        showNoteButton: false,
        showSummaryButton: false,
        showUploadButton: false
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "p-4 relative h-[calc(100%-43px)] overflow-auto flex items-center justify-center", children: isFetching ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isFetching, message: "Files..." }) : /* @__PURE__ */ jsx(Fragment, { children: reviewDetails?.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mt-8 my-6", children: /* @__PURE__ */ jsx(SubmitCaseIcon, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center space-y-1", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xl 3xl:text-2xl font-medium", children: "Thank You For Submitting Your Review!" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm", children: "Your feedback has been successfully submitted" })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "my-6", children: /* @__PURE__ */ jsx(DisposalCallLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "font-normal text-base 2xl:text-xl", children: "Case Status Update" }),
      /* @__PURE__ */ jsx("div", { className: "w-full text-center my-2 text-sm 3xl:text-base text-gray-600", children: "Your case has reached the final stages but requires important closing procedures we need your input to proceed with the next steps" }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        Button,
        {
          className: "rounded-none bg-black cursor-pointer text-white h-fit font-normal hover:bg-black",
          onClick: handleClick,
          children: "Submit Review"
        }
      ) })
    ] }) }) })
  ] });
};
export {
  UserDisposalCall as default
};
