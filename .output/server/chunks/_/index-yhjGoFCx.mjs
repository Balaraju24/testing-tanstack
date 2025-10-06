import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { A as AdvocateAssignIcon, E as ExperienceIcon } from './experience-icon-Elb_pb4R.mjs';
import { D as DefaultUserIcon } from './default-user-EV710LEP.mjs';
import { P as PhoneIcon } from './phone-icon-D-QqyU6p.mjs';
import { A as Avatar, a as AvatarImage } from './avatar-xL-W5RbG.mjs';
import { g as getAllAdvocateAPI } from './advocate-Cvw6EtWS.mjs';
import { m as assignAdvocatesAPI } from './service-1g9dZr4o.mjs';
import { i as isSubStageCompleted, M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
import './router-e7zdrxGz.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'framer-motion';
import 'react-error-boundary';
import '@radix-ui/react-avatar';
import './index-Bb_5490h.mjs';
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
import './fileUpload-BBm5-XTb.mjs';
import 'axios';
import '@radix-ui/react-progress';
import 'react-dropzone';
import './notes-delete-icon-CyozBLV8.mjs';
import './notes-head-icon-BuoOTi3l.mjs';
import './summary-icon-card-CWzIqgof.mjs';
import './input-CcfBn-WR.mjs';
import './sheet-vrO17VYZ.mjs';
import '@radix-ui/react-dialog';
import './skeleton-BAyQx-Zm.mjs';

const AssignAdvocates = ({ stage, subStage }) => {
  var _a, _b, _c;
  const { service_id } = useParams({ strict: false });
  const [selectedAdvocateIds, setSelectedAdvocateIds] = useState([]);
  const [reassignMode, setReassignMode] = useState(false);
  const { serviceData, setServiceData, caseStagesData } = UseContextAPI();
  const serviceId = service_id;
  const isLegalOpinion = (serviceData == null ? void 0 : serviceData.service_type) === "Legal opinion";
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData == null ? void 0 : caseStagesData.sub_stages,
    subStage
  );
  const getAssignedAdvocateIds = () => {
    if ((serviceData == null ? void 0 : serviceData.advocate_cases) && Array.isArray(serviceData.advocate_cases)) {
      return serviceData.advocate_cases.filter((advocateCase) => advocateCase.is_advocate_assigned).map((advocateCase) => advocateCase.advocate.id);
    }
    if ((serviceData == null ? void 0 : serviceData.advocate_ids) && Array.isArray(serviceData.advocate_ids)) {
      return serviceData.advocate_ids;
    } else if (serviceData == null ? void 0 : serviceData.advocate_id) {
      return [serviceData.advocate_id];
    }
    return [];
  };
  const assignedAdvocateIds = getAssignedAdvocateIds();
  const hasAssignedAdvocates = assignedAdvocateIds.length > 0;
  const hasLength = (_a = serviceData == null ? void 0 : serviceData.advocate_cases) == null ? void 0 : _a.length;
  const { isLoading, data: lawyersData } = useQuery({
    queryKey: ["advocate"],
    queryFn: async () => {
      var _a2;
      let queryParams = {
        user_type: "ADVOCATE",
        location_id: serviceData == null ? void 0 : serviceData.location_id
      };
      const response = await getAllAdvocateAPI(queryParams);
      if (response.status === 200 || response.status === 201) {
        const { records } = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.data;
        return { records };
      }
    },
    enabled: true,
    refetchOnWindowFocus: false
  });
  const displayedAdvocates = hasAssignedAdvocates ? ((_b = serviceData == null ? void 0 : serviceData.advocate_cases) == null ? void 0 : _b.map((item) => item.advocate)) || [] : (lawyersData == null ? void 0 : lawyersData.records) || [];
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
        return response == null ? void 0 : response.data;
      },
      onSuccess: (data) => {
        toast.success(data == null ? void 0 : data.message);
        const assignedAdvocateCases = selectedAdvocateIds.map((advocateId) => {
          var _a2;
          const advocate = (_a2 = lawyersData == null ? void 0 : lawyersData.records) == null ? void 0 : _a2.find(
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
          (error == null ? void 0 : error.message) || "Failed to assign advocates. Please try again."
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
    serviceData == null ? void 0 : serviceData.advocate_cases,
    serviceData == null ? void 0 : serviceData.advocate_ids,
    serviceData == null ? void 0 : serviceData.advocate_id
  ]);
  return /* @__PURE__ */ jsx("div", { className: "h-full relative", children: isLoading ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isLoading, message: "Loading advocates..." }) : /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: ((_c = lawyersData == null ? void 0 : lawyersData.records) == null ? void 0 : _c.length) === 0 ? false : hasAssignedAdvocates && !reassignMode,
        showUploadButton: false,
        showNoteButton: false
      }
    ),
    (displayedAdvocates == null ? void 0 : displayedAdvocates.length) !== 0 && !isCurrentStageCompleted && /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-10 bg-white p-2 flex justify-end", children: hasAssignedAdvocates && !reassignMode ? /* @__PURE__ */ jsx(Fragment, {}) : /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx("div", { className: "p-2 w-full h-[calc(100%-100px)] overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white", children: (displayedAdvocates == null ? void 0 : displayedAdvocates.length) === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx(AdvocateAssignIcon, {}),
      /* @__PURE__ */ jsx("span", { className: " text-gray-400 font-normal text-base", children: "No advocates available" })
    ] }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pt-4 px-2 pb-6", children: /* @__PURE__ */ jsx("div", { className: "grid xl:grid-cols-2 3xl:grid-cols-3 gap-4 max-w-4xl", children: displayedAdvocates == null ? void 0 : displayedAdvocates.map((advocate) => {
      var _a2;
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
                /* @__PURE__ */ jsx(Avatar, { className: "h-6 w-6 rounded-full bg-[#F7F7F7] border-grey-800 flex items-center justify-center", children: (advocate == null ? void 0 : advocate.profile_pic) ? /* @__PURE__ */ jsx(
                  AvatarImage,
                  {
                    src: advocate == null ? void 0 : advocate.profile_pic,
                    className: "w-6 h-6 rounded-full object-cover"
                  }
                ) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
                  "h3",
                  {
                    className: "text-xs font-normal text-gray-900 leading-tight pt-1 w-40 overflow-ellipsis whitespace-nowrap overflow-hidden cursor-pointer",
                    title: `${advocate == null ? void 0 : advocate.first_name} ${advocate == null ? void 0 : advocate.last_name}`,
                    children: [
                      advocate == null ? void 0 : advocate.first_name,
                      " ",
                      advocate == null ? void 0 : advocate.last_name
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
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 ml-2", children: (_a2 = advocate == null ? void 0 : advocate.phone) == null ? void 0 : _a2.replace(
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

export { AssignAdvocates as default };
//# sourceMappingURL=index-yhjGoFCx.mjs.map
