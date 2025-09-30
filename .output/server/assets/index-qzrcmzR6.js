import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { D as DisposalCallLogo } from "./disposal-call-logo-CWTLh5rA.js";
import { S as SubmitCaseIcon } from "./submit-case-icon-Ln9ZnlEX.js";
import { B as Button } from "./router-e7zdrxGz.js";
import { g as getSingleReviewAPI, n as getCaseReviewStatusAPI, s as sendReviewLinkAPI } from "./manage-tW0NLyej.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import { M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import { F as FeedbackCard } from "./FeedbackCard-Bc0eS10N.js";
import "@tanstack/react-router-ssr-query";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "js-cookie";
import "react-error-boundary";
import "./fetch-Cpm1bFFM.js";
import "./index-Bb_5490h.js";
import "./Provider-DRuE0d-A.js";
import "./litigations-2Q1m8RsY.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-BKF0DBvK.js";
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
import "./input-CcfBn-WR.js";
import "./sheet-vrO17VYZ.js";
import "@radix-ui/react-dialog";
import "./skeleton-BAyQx-Zm.js";
import "./nyaya-tech-logo-D_OdneNH.js";
import "./UnOrderList-d57FwHYj.js";
const DisposalCall = ({ stage, subStage }) => {
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
  const { data: caseReviewStatus, refetch: refetchStatus } = useQuery({
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
  const { mutate: mutateSendReviewLink, isPending } = useMutation({
    mutationFn: async () => {
      const payload = { caseId: Number(service_id) };
      const response = await sendReviewLinkAPI(service_id, payload);
      return response?.data;
    },
    onSuccess: (data) => {
      refetchStatus();
      toast.success(data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
    },
    onError: () => {
      toast.error("Failed to send Review link", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
    }
  });
  const NyayatechFeedback = reviewDetails?.filter((review) => {
    return review?.feedback_type === "NYAYA_TECH";
  });
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        showNoteButton: false,
        showActionButton: reviewDetails?.length !== 0,
        showSummaryButton: false,
        showUploadButton: false,
        caseStage: stage,
        caseSubStage: subStage
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "h-[calc(100%-55px)] overflow-auto relative  p-2", children: reviewDetails?.length === 0 || void 0 ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "my-4", children: /* @__PURE__ */ jsx(DisposalCallLogo, {}) }),
        /* @__PURE__ */ jsx("div", { className: "font-medium text-xl", children: "Case Status Update" }),
        /* @__PURE__ */ jsx("div", { className: "w-2/3 text-center my-2", children: "This case is in the final stage and waiting for the user’s review to complete ." })
      ] }),
      caseReviewStatus?.is_review_link_sent && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mt-10 my-6", children: /* @__PURE__ */ jsx(SubmitCaseIcon, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl 3xl:text-2xl text-green-600", children: "Review Link Sent" }),
          /* @__PURE__ */ jsx("div", { className: "3xl:text-base", children: "We are waiting for the user to submit their review" })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "underline 3xl:text-base cursor-pointer bg-transparent",
            onClick: () => {
              mutateSendReviewLink();
            },
            disabled: isPending,
            children: "Resend Link"
          }
        )
      ] })
    ] }) : isFetching ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isFetching }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-auto space-y-4 flex flex-col", children: /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 flex flex-col ", children: /* @__PURE__ */ jsx("div", { className: " overflow-auto shrink-0", children: NyayatechFeedback?.map((review) => /* @__PURE__ */ jsx(FeedbackCard, { review }, review.id)) }) }) }) }) })
  ] }) });
};
export {
  DisposalCall as default
};
