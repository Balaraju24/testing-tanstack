import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { L as LoadingComponent } from "./Loading-CtQhAIXf.js";
import { A as AdvocateAssignIcon, E as ExperienceIcon } from "./experience-icon-Elb_pb4R.js";
import { D as DefaultUserIcon } from "./default-user-EV710LEP.js";
import { P as PhoneIcon } from "./phone-icon-D-QqyU6p.js";
import { A as Avatar, a as AvatarImage } from "./avatar-DZ-dXD0g.js";
import { g as getAllAdvocateAPI } from "./advocate-Cvw6EtWS.js";
import { m as assignAdvocatesAPI } from "./service-1g9dZr4o.js";
import { i as isSubStageCompleted, M as ManageCaseHeader } from "./ManageCaseHeader-B1x76cDH.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "./router-o2MrkizZ.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "react-error-boundary";
import "@radix-ui/react-avatar";
import "./index-oJQ5f2gj.js";
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
import "./notes-delete-icon-CyozBLV8.js";
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./input-G3xZAzeG.js";
import "./sheet-BXmbu-1p.js";
import "@radix-ui/react-dialog";
import "./skeleton-CElu2WzA.js";
const AssignAdvocates = ({ stage, subStage }) => {
  const { service_id } = useParams({ strict: false });
  const [selectedAdvocateIds, setSelectedAdvocateIds] = useState([]);
  const [reassignMode, setReassignMode] = useState(false);
  const { serviceData, setServiceData, caseStagesData } = UseContextAPI();
  const serviceId = service_id;
  const isLegalOpinion = serviceData?.service_type === "Legal opinion";
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const getAssignedAdvocateIds = () => {
    if (serviceData?.advocate_cases && Array.isArray(serviceData.advocate_cases)) {
      return serviceData.advocate_cases.filter((advocateCase) => advocateCase.is_advocate_assigned).map((advocateCase) => advocateCase.advocate.id);
    }
    if (serviceData?.advocate_ids && Array.isArray(serviceData.advocate_ids)) {
      return serviceData.advocate_ids;
    } else if (serviceData?.advocate_id) {
      return [serviceData.advocate_id];
    }
    return [];
  };
  const assignedAdvocateIds = getAssignedAdvocateIds();
  const hasAssignedAdvocates = assignedAdvocateIds.length > 0;
  const hasLength = serviceData?.advocate_cases?.length;
  const { isLoading, data: lawyersData } = useQuery({
    queryKey: ["advocate"],
    queryFn: async () => {
      let queryParams = {
        user_type: "ADVOCATE",
        location_id: serviceData?.location_id
      };
      const response = await getAllAdvocateAPI(queryParams);
      if (response.status === 200 || response.status === 201) {
        const { records } = response?.data?.data;
        return { records };
      }
    },
    enabled: true,
    refetchOnWindowFocus: false
  });
  const displayedAdvocates = hasAssignedAdvocates ? serviceData?.advocate_cases?.map((item) => item.advocate) || [] : lawyersData?.records || [];
  const { mutate: mutateAssignAdvocates, isPending: isAssigning } = useMutation(
    {
      mutationKey: ["assign-advocates", serviceId],
      mutationFn: async () => {
        if (!serviceId || selectedAdvocateIds.length === 0) {
          throw new Error("File ID is missing or no advocates selected");
        }
        const payload = {
          advocate_id: selectedAdvocateIds,
          stage,
          sub_stage: subStage
        };
        const response = await assignAdvocatesAPI(
          serviceId.toString(),
          payload
        );
        return response?.data;
      },
      onSuccess: (data) => {
        toast.success(data?.message);
        const assignedAdvocateCases = selectedAdvocateIds.map((advocateId) => {
          const advocate = lawyersData?.records?.find(
            (adv) => adv.id === advocateId
          );
          return {
            id: Date.now() + advocateId,
            is_advocate_assigned: true,
            advocate_assigned_at: (/* @__PURE__ */ new Date()).toISOString(),
            advocate,
            assigned_by: null
          };
        });
        setServiceData({
          ...serviceData,
          advocate_cases: assignedAdvocateCases,
          advocate_ids: selectedAdvocateIds,
          advocate_id: selectedAdvocateIds[0]
        });
        setReassignMode(false);
      },
      onError: (error) => {
        toast.error(
          error?.message || "Failed to assign advocates. Please try again."
        );
      }
    }
  );
  const handleAdvocateClick = (advocateId) => {
    if (isAssigning) return;
    setSelectedAdvocateIds((prev) => {
      if (isLegalOpinion) {
        return [advocateId];
      } else {
        if (prev.includes(advocateId)) {
          return prev.filter((id) => id !== advocateId);
        } else {
          return [...prev, advocateId];
        }
      }
    });
  };
  const handleAssignAdvocates = () => {
    mutateAssignAdvocates();
  };
  useEffect(() => {
    const assignedIds = getAssignedAdvocateIds();
    setSelectedAdvocateIds(assignedIds);
    if (assignedIds.length === 0) {
      setReassignMode(false);
    }
  }, [
    serviceData?.advocate_cases,
    serviceData?.advocate_ids,
    serviceData?.advocate_id
  ]);
  return /* @__PURE__ */ jsx("div", { className: "h-full relative", children: isLoading ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isLoading, message: "Loading advocates..." }) : /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: lawyersData?.records?.length === 0 ? false : hasAssignedAdvocates && !reassignMode,
        showUploadButton: false,
        showNoteButton: false
      }
    ),
    displayedAdvocates?.length !== 0 && !isCurrentStageCompleted && /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-10 bg-white p-2 flex justify-end", children: hasAssignedAdvocates && !reassignMode ? /* @__PURE__ */ jsx(Fragment, {}) : /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-black text-white px-3 py-1 text-xs font-normal cursor-pointer disabled:bg-gray-400 flex items-center",
        onClick: handleAssignAdvocates,
        disabled: selectedAdvocateIds.length === 0 || isAssigning,
        "aria-busy": isAssigning,
        "aria-label": isAssigning ? "Assigning advocates" : "Assign advocates",
        children: isAssigning ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }),
          "Assigning..."
        ] }) : "Assign Advocate"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "p-2 w-full h-[calc(100%-100px)] overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white", children: displayedAdvocates?.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx(AdvocateAssignIcon, {}),
      /* @__PURE__ */ jsx("span", { className: " text-gray-400 font-normal text-base", children: "No advocates available" })
    ] }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pt-4 px-2 pb-6", children: /* @__PURE__ */ jsx("div", { className: "grid xl:grid-cols-2 3xl:grid-cols-3 gap-4 max-w-4xl", children: displayedAdvocates?.map((advocate) => {
      const isSelected = selectedAdvocateIds.includes(
        advocate.id
      );
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `bg-white border border-gray-200 transform transition duration-300
                                ${!hasAssignedAdvocates ? " hover:shadow-xl" : ""} 
                                ${isAssigning ? "opacity-50" : hasAssignedAdvocates ? "" : "cursor-pointer"} 
                                ${isSelected && !hasLength ? "border rounded-none border-gray-500" : ""}
                              `,
          onClick: hasAssignedAdvocates || isAssigning ? void 0 : () => handleAdvocateClick(advocate.id),
          "aria-disabled": isAssigning,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-start gap-2 mb-2", children: [
                /* @__PURE__ */ jsx(Avatar, { className: "h-6 w-6 rounded-full bg-[#F7F7F7] border-grey-800 flex items-center justify-center", children: advocate?.profile_pic ? /* @__PURE__ */ jsx(
                  AvatarImage,
                  {
                    src: advocate?.profile_pic,
                    className: "w-6 h-6 rounded-full object-cover"
                  }
                ) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
                  "h3",
                  {
                    className: "text-xs font-normal text-gray-900 leading-tight pt-1 w-40 overflow-ellipsis whitespace-nowrap overflow-hidden cursor-pointer",
                    title: `${advocate?.first_name} ${advocate?.last_name}`,
                    children: [
                      advocate?.first_name,
                      " ",
                      advocate?.last_name
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "ml-3 flex justify-between" })
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `space-y-2 bg-gray-100 p-2 justify-end ${isSelected ? "rounded-b-md" : ""}`,
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 ml-2", children: advocate?.phone?.replace(
                    /^(\+91)(\d{5})(\d{5})$/,
                    "$1 $2$3"
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "ml-auto flex justify-center items-center", children: [
                    /* @__PURE__ */ jsx(ExperienceIcon, { className: "w-4 h-4 text-gray-400" }),
                    /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-600 ml-1 mt-0.5", children: [
                      advocate.experience,
                      " Yrs"
                    ] })
                  ] })
                ] })
              }
            )
          ]
        },
        advocate.id
      );
    }) }) }) }) }) })
  ] }) }) });
};
export {
  AssignAdvocates as default
};
