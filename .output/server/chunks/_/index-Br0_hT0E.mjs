import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { g as getSingleReviewAPI, n as getCaseReviewStatusAPI } from './manage-tW0NLyej.mjs';
import { B as Button } from './router-e7zdrxGz.mjs';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { D as DisposalCallLogo } from './disposal-call-logo-CWTLh5rA.mjs';
import { S as SubmitCaseIcon } from './submit-case-icon-Ln9ZnlEX.mjs';
import { M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import '@tanstack/react-router-ssr-query';
import 'react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'sonner';
import 'framer-motion';
import 'react-error-boundary';
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

const UserDisposalCall = () => {
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
  const { data: caseReviewStatus } = useQuery({
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
    /* @__PURE__ */ jsx("div", { className: "p-4 relative h-[calc(100%-43px)] overflow-auto flex items-center justify-center", children: isFetching ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isFetching, message: "Files..." }) : /* @__PURE__ */ jsx(Fragment, { children: (reviewDetails == null ? void 0 : reviewDetails.length) > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 justify-center", children: [
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

export { UserDisposalCall as default };
//# sourceMappingURL=index-Br0_hT0E.mjs.map
