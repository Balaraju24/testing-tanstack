import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import dayjs from "dayjs";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { L as LoadingComponent } from "./Loading-CtQhAIXf.js";
import { i as isSubStageCompleted, M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "./router-o2MrkizZ.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./index-oJQ5f2gj.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./tooltip-D8srg3RR.js";
import "@radix-ui/react-tooltip";
import "./manage-CWSyPq63.js";
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
const UserRaiseQueries = ({ stage, subStage }) => {
  const { allDocsData, caseStagesData, allDocsIsFetching } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const isQueriesStageCompleted = caseStagesData?.stages?.find((sub) => sub.code === "QURI")?.status === "completed";
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-full", children: allDocsIsFetching ? /* @__PURE__ */ jsx("div", { className: "relative h-[calc(100%-43px)] flex items-center justify-center", children: /* @__PURE__ */ jsx(
    LoadingComponent,
    {
      loading: allDocsIsFetching,
      message: "Docs loading..."
    }
  ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: false,
        showNoteButton: false,
        showUploadButton: false
      }
    ),
    isQueriesStageCompleted && allDocsData?.length === 0 && /* @__PURE__ */ jsx("div", { className: "h-[calc(100%-100px)]  flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "text-center text-base text-gray-500 flex items-center justify-center", children: "The advocate has reviewed your case and did not raise any queries." }) }),
    !isQueriesStageCompleted && allDocsData?.length === 0 && /* @__PURE__ */ jsx("div", { className: "h-[calc(100%-100px)]  flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "text-center text-base text-gray-500 flex items-center justify-center", children: "No queries have been raised at this moment" }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `p-2 space-y-2 ${!isCurrentStageCompleted ? "overflow-y-auto h-[calc(100vh-100px)] " : " overflow-y-auto h-[calc(100vh-250px)]"}`,
        children: Array.isArray(allDocsData) && allDocsData?.map((item) => {
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `flex flex-cols w-full border p-2 gap-4 ${"border-gray-200"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm flex-1 self-center", children: item?.category }),
                /* @__PURE__ */ jsx("div", { className: "text-xs bg-gray-200 font-normal p-1 flex  self-center", children: dayjs(item?.created_at).format("DD MMM YYYY") })
              ]
            },
            item?.id
          );
        })
      }
    )
  ] }) });
};
export {
  UserRaiseQueries as default
};
