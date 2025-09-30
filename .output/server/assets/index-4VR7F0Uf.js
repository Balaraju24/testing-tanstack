import { jsxs, jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { a as singleServiceAPI } from "./service-1g9dZr4o.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import { G as GetCaseNotes } from "./GetCaseNotes-CcN4R54R.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./index-oJQ5f2gj.js";
import "react";
import "./Provider-DRuE0d-A.js";
import "./litigations-2Q1m8RsY.js";
import "./manage-tW0NLyej.js";
import "./Loading-CtQhAIXf.js";
import "./router-o2MrkizZ.js";
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
const UserCNRNumberAllotment = () => {
  const { service_id } = useParams({ strict: false });
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
  return /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: "CTPG",
        caseSubStage: "CTPG#CNRA",
        showUploadButton: false,
        showNoteButton: false
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "p-2 relative w-full h-[calc(100%-60px)] overflow-auto", children: [
      caseDetails?.cnr_number ? /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: caseDetails?.cnr_number && /* @__PURE__ */ jsxs("div", { className: "p-2 inline-block text-sm bg-gray-100 w-full", children: [
        /* @__PURE__ */ jsx("span", { className: "text-black ", children: "CNR Number :" }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: caseDetails?.cnr_number })
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "text-center  text-lg h-[calc(100%-80px)] flex items-center justify-center ", children: /* @__PURE__ */ jsxs("div", { children: [
        "Currently, this case ",
        /* @__PURE__ */ jsx("strong", { children: " cnr " }),
        " number is not alloted."
      ] }) }),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] })
  ] });
};
export {
  UserCNRNumberAllotment as default
};
