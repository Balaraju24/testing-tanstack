import { jsx, jsxs } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { A as AdvocateAssignIcon, E as ExperienceIcon } from "./experience-icon-Elb_pb4R.js";
import { D as DefaultUserIcon } from "./default-user-EV710LEP.js";
import { P as PhoneIcon } from "./phone-icon-D-QqyU6p.js";
import { A as Avatar, a as AvatarImage } from "./avatar-xL-W5RbG.js";
import { M as ManageCaseHeader } from "./ManageCaseHeader-BFRej4X3.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./manage-tW0NLyej.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "@radix-ui/react-avatar";
import "./router-e7zdrxGz.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "framer-motion";
import "react-error-boundary";
import "./index-Bb_5490h.js";
import "./Loading-DQypZbMn.js";
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
import "./notes-delete-icon-CyozBLV8.js";
import "./notes-head-icon-BuoOTi3l.js";
import "./summary-icon-card-CWzIqgof.js";
import "./input-CcfBn-WR.js";
import "./sheet-vrO17VYZ.js";
import "@radix-ui/react-dialog";
import "./skeleton-BAyQx-Zm.js";
const UserAssignAdvocate = ({ stage, subStage }) => {
  const { serviceData } = UseContextAPI();
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx("div", { className: "h-full px-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full relative", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: false,
        showUploadButton: false
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "p-2 w-full h-[calc(100%-60px)] overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white relative", children: serviceData?.advocate_cases?.length === 0 || !serviceData?.advocate_cases ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx(AdvocateAssignIcon, {}),
      /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal text-base", children: "Advocate not assigned" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "pt-2 px-2 pb-6", children: /* @__PURE__ */ jsx("div", { className: "grid xl:grid-cols-2 3xl:grid-cols-3 gap-4 max-w-4xl", children: serviceData?.advocate_cases?.filter(
      (advocateCase) => advocateCase.is_advocate_assigned
    ).map((advocateCase) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white border border-gray-200 rounded-md shadow-md ",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-start gap-2 mb-2", children: [
            /* @__PURE__ */ jsx(Avatar, { className: "h-6 w-6 rounded-full bg-[#F7F7F7] border-grey-800 flex items-center justify-center", children: advocateCase.advocate?.profile_pic ? /* @__PURE__ */ jsx(
              AvatarImage,
              {
                src: advocateCase.advocate.profile_pic,
                className: "w-6 h-6 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
              "h3",
              {
                className: "text-xs font-normal text-gray-900 leading-tight pt-1 w-32 overflow-ellipsis whitespace-nowrap overflow-hidden cursor-pointer",
                title: `${advocateCase.advocate?.first_name} ${advocateCase.advocate?.last_name}`,
                children: [
                  advocateCase.advocate?.first_name,
                  " ",
                  advocateCase.advocate?.last_name
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2 bg-gray-100 p-2 justify-end rounded-b-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 ml-2", children: advocateCase.advocate?.phone?.replace(
              /^(\+91)(\d{5})(\d{5})$/,
              "$1 $2$3"
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-auto flex", children: [
              /* @__PURE__ */ jsx(ExperienceIcon, { className: "w-4 h-4 text-gray-400" }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-600 ml-1", children: [
                advocateCase.advocate?.experience || "5",
                " Yrs"
              ] })
            ] })
          ] }) })
        ]
      },
      advocateCase.id
    )) }) }) }) })
  ] }) }) });
};
export {
  UserAssignAdvocate as default
};
