import { jsx, jsxs } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { C as Checkbox } from "./checkbox-DwAU5kG6.js";
import { l as sendingNoticeAPI } from "./service-1g9dZr4o.js";
import { i as isSubStageCompleted, M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import { u as useDocsApproval } from "./useDocsApproval-CzCEMiQ5.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { G as GetCaseFiles } from "./GetCaseFiles-DxxxDQtF.js";
import { G as GetCaseNotes } from "./GetCaseNotes-DSbNb1Jm.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "./router-e7zdrxGz.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "react-error-boundary";
import "@radix-ui/react-checkbox";
import "lucide-react";
import "./index-Bb_5490h.js";
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
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "./ApproveRejectDialog-CbjX-vD1.js";
import "pdfjs-dist";
import "./dialog-CbaK730S.js";
import "./approve-logo-BtPutrSX.js";
import "./apiHelpers-QKbVsPE7.js";
import "./getCaseFilesConstants-BRQFWmkt.js";
import "./upload-file-icon-D1lM9Y8S.js";
import "./delete-stroke-icon-mn8-8d5M.js";
import "./view-icon-BDRfyII2.js";
import "./card-CfZVGcIr.js";
import "./separator-BzkEE94Y.js";
import "@radix-ui/react-separator";
import "./edit-icon-DqCvL3Yg.js";
import "./reject-icon-B4PaiBZt.js";
import "./FileIcon-DM2CMkXH.js";
import "./DocsCommentsSection-1v4F6eR1.js";
import "./pdf.worker-CIugw0DL.js";
import "./statusConstants-t7T05Rlh.js";
function SendingNotice({
  stage,
  subStage
}) {
  const { service_id } = useParams({ strict: false });
  const [markedStatus, setMarkedStatus] = useState("");
  const { isUser } = useUserDetails();
  const {
    isLoadingCaseNote,
    allDocsIsLoading,
    caseStagesData,
    allDocsData,
    serviceData,
    setServiceData
  } = UseContextAPI();
  const docsApprove = useDocsApproval();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const { mutate: mutateSendingNotice, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await sendingNoticeAPI(service_id, data);
      return response;
    },
    onSuccess: (data, variables) => {
      setServiceData((prev) => ({
        ...prev,
        confirmation_boxes: {
          ...prev?.confirmation_boxes,
          legal_notice: {
            sent_by_post: variables.status === "sent_by_post" ? variables.is_marked : false,
            sent_by_mail: variables.status === "sent_by_mail" ? variables.is_marked : false,
            sent_by_Both: variables.status === "sent_by_Both" ? variables.is_marked : false
          }
        }
      }));
    },
    onError: (error) => {
      toast.error(error?.message);
    }
  });
  const handleMarkChange = (status) => {
    const isSame = markedStatus === status;
    const newMarkedStatus = isSame ? "" : status;
    setMarkedStatus(newMarkedStatus);
    mutateSendingNotice({
      status,
      is_marked: !isSame,
      case_stage: stage,
      case_sub_stage: subStage
    });
  };
  useEffect(() => {
    const legalNotice = serviceData?.confirmation_boxes?.legal_notice;
    if (legalNotice) {
      const activeStatus = Object.entries(legalNotice).find(
        ([, value]) => value === true
      )?.[0];
      setMarkedStatus(activeStatus || "");
    }
  }, [serviceData]);
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: isUser() ? false : !!docsApprove,
        showUploadButton: false
      }
    ),
    /* @__PURE__ */ jsx("div", { className: " p-2  w-full h-[calc(100%-60px)] relative overflow-auto ", children: allDocsIsLoading && isLoadingCaseNote ? /* @__PURE__ */ jsx(
      LoadingComponent,
      {
        loading: allDocsIsLoading && isLoadingCaseNote
      }
    ) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(GetCaseFiles, { NoticeDraftKey: "Notice Draft" }),
      !(isCurrentStageCompleted && allDocsData?.length === 0) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 mt-2 mb-2", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "font-medium text-base", children: [
          "Notice Sent",
          " "
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                id: "post",
                className: "w-4 h-4 mr-2 border-black cursor-pointer",
                disabled: isCurrentStageCompleted || isUser() || isPending,
                checked: markedStatus === "sent_by_post",
                onChange: () => {
                },
                onClick: () => handleMarkChange("sent_by_post")
              }
            ),
            "Sent By Post"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                id: "mail",
                className: "w-4 h-4 mr-2 border-black cursor-pointer",
                disabled: isCurrentStageCompleted || isUser() || isPending,
                checked: markedStatus === "sent_by_mail",
                onChange: () => {
                },
                onClick: () => handleMarkChange("sent_by_mail")
              }
            ),
            "Sent By Mail"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                id: "both",
                className: "w-4 h-4 mr-2 border-black cursor-pointer",
                disabled: isCurrentStageCompleted || isUser() || isPending,
                checked: markedStatus === "sent_by_Both",
                onChange: () => {
                },
                onClick: () => handleMarkChange("sent_by_Both")
              }
            ),
            "Sent By Both"
          ] })
        ] })
      ] }),
      markedStatus && /* @__PURE__ */ jsx(GetCaseFiles, { NoticeSentKey: "Notice Sent" }),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] }) })
  ] }) }) });
}
export {
  SendingNotice as default
};
