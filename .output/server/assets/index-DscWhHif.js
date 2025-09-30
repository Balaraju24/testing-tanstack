import { jsx, jsxs } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { I as Input } from "./input-G3xZAzeG.js";
import { q as AddCNRNumberAPI } from "./manage-tW0NLyej.js";
import { i as isSubStageCompleted, M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { G as GetCaseNotes } from "./GetCaseNotes-CcN4R54R.js";
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
import "./index-oJQ5f2gj.js";
import "./Loading-CtQhAIXf.js";
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
import "./sheet-BXmbu-1p.js";
import "@radix-ui/react-dialog";
import "./skeleton-CElu2WzA.js";
const CNRNumberAllotment = ({ stage, subStage }) => {
  const { service_id } = useParams({ strict: false });
  const [cnrError, setCnrError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [cnrNumber, setCnrNumber] = useState("");
  const { caseStagesData, serviceData, setServiceData } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const { mutate: mutateAddCNRNumber, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await AddCNRNumberAPI(service_id, data);
      return response;
    },
    onSuccess: () => {
      setServiceData((prev) => ({
        ...prev,
        cnr_number: cnrNumber
      }));
      setIsEditing(false);
    },
    onError: (error) => {
      if (error?.status === 404 || error?.status === 401) {
        setCnrError(error.message);
      } else if (error.status == 422) {
        let errors = error.data.errData;
        setCnrError(errors?.cnr_number[0]);
      } else if (error.status == 409) {
        let errors = error.message;
        setCnrError(errors);
      }
    }
  });
  const handleCNRNumberSubmit = () => {
    if (!cnrNumber?.trim()) {
      setCnrError("CNR Number is required");
      return;
    }
    mutateAddCNRNumber({
      cnr_number: cnrNumber,
      stage,
      sub_stage: subStage
    });
  };
  const handleCNRNumberClose = () => {
    setCnrNumber(serviceData?.cnr_number ?? "");
    setIsEditing(false);
    setCnrError("");
  };
  const handleCnrKeyDown = (event) => {
    if (event.key === "Enter" && cnrNumber.length > 0) {
      handleCNRNumberSubmit();
    }
  };
  useEffect(() => {
    if (serviceData && typeof serviceData.cnr_number === "string") {
      setCnrNumber(serviceData.cnr_number);
    }
  }, [serviceData]);
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        showActionButton: !isEditing && !!serviceData?.cnr_number,
        caseStage: stage,
        caseSubStage: subStage,
        showUploadButton: false
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-2 relative w-full  h-[calc(100%-60px)] overflow-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "py-2 px-2 flex  gap-4 w-full", children: /* @__PURE__ */ jsxs("div", { className: "w-full space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-800", children: [
          "CNR Number ",
          /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600 -mt-0", children: "*" })
        ] }),
        !isEditing && serviceData?.cnr_number ? /* @__PURE__ */ jsxs("div", { className: "flex bg-slate-100 justify-between items-center text-gray-600 text-sm gap-2 border-none p-2", children: [
          /* @__PURE__ */ jsx("p", { children: serviceData?.cnr_number }),
          !isCurrentStageCompleted && /* @__PURE__ */ jsx(
            Button,
            {
              className: "bg-transparent h-fit py-0 cursor-pointer font-semibold underline text-xs",
              onClick: () => setIsEditing(true),
              children: "Edit"
            }
          )
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full mt-1", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Enter CNR Number",
              value: cnrNumber,
              onChange: (e) => {
                const value = e.target.value.toUpperCase().trim();
                if (/^[A-Z0-9]*$/.test(value)) {
                  setCnrNumber(value);
                  setCnrError("");
                }
              },
              onKeyDown: handleCnrKeyDown,
              maxLength: 16,
              disabled: isPending || isCurrentStageCompleted,
              className: "w-full rounded-none border  border-gray-300 h-fit  focus:outline-none focus-visible:outline-none bg-gray-100 text-black"
            }
          ),
          cnrError && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs block mt-1", children: cnrError }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
            isEditing && /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleCNRNumberClose,
                disabled: isPending,
                variant: "outline",
                className: "rounded-none text-red-500 text-xs  cursor-pointer h-8 py-1.5 font-normal",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleCNRNumberSubmit,
                disabled: isPending || isCurrentStageCompleted,
                className: "rounded-none text-white text-xs cursor-pointer bg-black h-8 py-1.5 font-normal hover:bg-black",
                children: isPending ? /* @__PURE__ */ jsxs("div", { className: "flex", children: [
                  "Submitting...",
                  /* @__PURE__ */ jsx(Loader2, { className: "animate-spin mx-1" })
                ] }) : "Submit"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(GetCaseNotes, {})
    ] })
  ] }) }) });
};
export {
  CNRNumberAllotment as default
};
