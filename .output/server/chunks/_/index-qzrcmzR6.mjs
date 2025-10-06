import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { D as DisposalCallLogo } from './disposal-call-logo-CWTLh5rA.mjs';
import { S as SubmitCaseIcon } from './submit-case-icon-Ln9ZnlEX.mjs';
import { B as Button } from './router-e7zdrxGz.mjs';
import { g as getSingleReviewAPI, n as getCaseReviewStatusAPI, s as sendReviewLinkAPI } from './manage-tW0NLyej.mjs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { toast } from 'sonner';
import { M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import { F as FeedbackCard } from './FeedbackCard-Bc0eS10N.mjs';
import '@tanstack/react-router-ssr-query';
import 'react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'framer-motion';
import 'react-error-boundary';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './index-Bb_5490h.mjs';
import './Provider-DRuE0d-A.mjs';
import './litigations-2Q1m8RsY.mjs';
import './CaseFilingIcon-Dywh8hPV.mjs';
import './legal-notice-icon-ivaufGCR.mjs';
import './notes-edit-icon-B2gT4vHe.mjs';
import '@radix-ui/react-accordion';
import './tooltip-BKF0DBvK.mjs';
import '@radix-ui/react-tooltip';
import './manage-CWSyPq63.mjs';
import 'dayjs';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/utc.js';
import './useUserPermissions-IrViIWLA.mjs';
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';
import 'lucide-react';
import './pending-icon-C39HKFOC.mjs';
import './approved-Icon-D4Mj_64A.mjs';
import './current-icon-PhyH9fHB.mjs';
import './complete-logo-DwVwh2_J.mjs';
import './notes-close-icon-FqM48RJz.mjs';
import '@radix-ui/react-alert-dialog';
import './textarea-BfKn0GZN.mjs';
import 'vaul';
import './notification-kzFgGftV.mjs';
import './service-1g9dZr4o.mjs';
import './fileUpload-BBm5-XTb.mjs';
import 'axios';
import '@radix-ui/react-progress';
import 'react-dropzone';
import './default-user-EV710LEP.mjs';
import './notes-delete-icon-CyozBLV8.mjs';
import './notes-head-icon-BuoOTi3l.mjs';
import './summary-icon-card-CWzIqgof.mjs';
import './avatar-xL-W5RbG.mjs';
import '@radix-ui/react-avatar';
import './input-CcfBn-WR.mjs';
import './sheet-vrO17VYZ.mjs';
import '@radix-ui/react-dialog';
import './skeleton-BAyQx-Zm.mjs';
import './nyaya-tech-logo-D_OdneNH.mjs';
import './UnOrderList-d57FwHYj.mjs';

const DisposalCall = ({ stage, subStage }) => {
  const { service_id } = useParams({ strict: false });
  const { isFetching, data: reviewDetails } = useQuery({
    queryKey: ["review-details", service_id],
    enabled: !!service_id,
    queryFn: async () => {
      var _a;
      try {
        if (!service_id) return;
        const response = await getSingleReviewAPI(Number(service_id));
        if (response.status === 200 || response.status === 201) {
          const data = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data;
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
          const { data } = response == null ? void 0 : response.data;
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
      return response == null ? void 0 : response.data;
    },
    onSuccess: (data) => {
      refetchStatus();
      toast.success(data == null ? void 0 : data.message, {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
    },
    onError: () => {
      toast.error("Failed to send Review link", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
    }
  });
  const NyayatechFeedback = reviewDetails == null ? void 0 : reviewDetails.filter((review) => {
    return (review == null ? void 0 : review.feedback_type) === "NYAYA_TECH";
  });
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        showNoteButton: false,
        showActionButton: (reviewDetails == null ? void 0 : reviewDetails.length) !== 0,
        showSummaryButton: false,
        showUploadButton: false,
        caseStage: stage,
        caseSubStage: subStage
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "h-[calc(100%-55px)] overflow-auto relative  p-2", children: (reviewDetails == null ? void 0 : reviewDetails.length) === 0 || void 0 ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "my-4", children: /* @__PURE__ */ jsx(DisposalCallLogo, {}) }),
        /* @__PURE__ */ jsx("div", { className: "font-medium text-xl", children: "Case Status Update" }),
        /* @__PURE__ */ jsx("div", { className: "w-2/3 text-center my-2", children: "This case is in the final stage and waiting for the user\u2019s review to complete ." })
      ] }),
      (caseReviewStatus == null ? void 0 : caseReviewStatus.is_review_link_sent) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 justify-center", children: [
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
    ] }) : isFetching ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isFetching }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-auto space-y-4 flex flex-col", children: /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 flex flex-col ", children: /* @__PURE__ */ jsx("div", { className: " overflow-auto shrink-0", children: NyayatechFeedback == null ? void 0 : NyayatechFeedback.map((review) => /* @__PURE__ */ jsx(FeedbackCard, { review }, review.id)) }) }) }) }) })
  ] }) });
};

export { DisposalCall as default };
//# sourceMappingURL=index-qzrcmzR6.mjs.map
