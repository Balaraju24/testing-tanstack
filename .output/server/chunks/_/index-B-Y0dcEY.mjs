import { jsx, jsxs } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { A as AdvocateAssignIcon, E as ExperienceIcon } from './experience-icon-Elb_pb4R.mjs';
import { D as DefaultUserIcon } from './default-user-EV710LEP.mjs';
import { P as PhoneIcon } from './phone-icon-D-QqyU6p.mjs';
import { A as Avatar, a as AvatarImage } from './avatar-xL-W5RbG.mjs';
import { M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
import '@tanstack/react-query';
import '@tanstack/react-router';
import 'react';
import '@radix-ui/react-avatar';
import './router-e7zdrxGz.mjs';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'sonner';
import 'framer-motion';
import 'react-error-boundary';
import './index-Bb_5490h.mjs';
import './Loading-DQypZbMn.mjs';
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
import './notes-delete-icon-CyozBLV8.mjs';
import './notes-head-icon-BuoOTi3l.mjs';
import './summary-icon-card-CWzIqgof.mjs';
import './input-CcfBn-WR.mjs';
import './sheet-vrO17VYZ.mjs';
import '@radix-ui/react-dialog';
import './skeleton-BAyQx-Zm.mjs';

const UserAssignAdvocate = ({ stage, subStage }) => {
  var _a, _b;
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
    /* @__PURE__ */ jsx("div", { className: "p-2 w-full h-[calc(100%-60px)] overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white relative", children: ((_a = serviceData == null ? void 0 : serviceData.advocate_cases) == null ? void 0 : _a.length) === 0 || !(serviceData == null ? void 0 : serviceData.advocate_cases) ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx(AdvocateAssignIcon, {}),
      /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal text-base", children: "Advocate not assigned" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "pt-2 px-2 pb-6", children: /* @__PURE__ */ jsx("div", { className: "grid xl:grid-cols-2 3xl:grid-cols-3 gap-4 max-w-4xl", children: (_b = serviceData == null ? void 0 : serviceData.advocate_cases) == null ? void 0 : _b.filter(
      (advocateCase) => advocateCase.is_advocate_assigned
    ).map((advocateCase) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white border border-gray-200 rounded-md shadow-md ",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-between p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-start gap-2 mb-2", children: [
              /* @__PURE__ */ jsx(Avatar, { className: "h-6 w-6 rounded-full bg-[#F7F7F7] border-grey-800 flex items-center justify-center", children: ((_a2 = advocateCase.advocate) == null ? void 0 : _a2.profile_pic) ? /* @__PURE__ */ jsx(
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
                  title: `${(_b2 = advocateCase.advocate) == null ? void 0 : _b2.first_name} ${(_c = advocateCase.advocate) == null ? void 0 : _c.last_name}`,
                  children: [
                    (_d = advocateCase.advocate) == null ? void 0 : _d.first_name,
                    " ",
                    (_e = advocateCase.advocate) == null ? void 0 : _e.last_name
                  ]
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 bg-gray-100 p-2 justify-end rounded-b-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4 text-gray-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 ml-2", children: (_g = (_f = advocateCase.advocate) == null ? void 0 : _f.phone) == null ? void 0 : _g.replace(
                /^(\+91)(\d{5})(\d{5})$/,
                "$1 $2$3"
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-auto flex", children: [
                /* @__PURE__ */ jsx(ExperienceIcon, { className: "w-4 h-4 text-gray-400" }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-600 ml-1", children: [
                  ((_h = advocateCase.advocate) == null ? void 0 : _h.experience) || "5",
                  " Yrs"
                ] })
              ] })
            ] }) })
          ]
        },
        advocateCase.id
      );
    }) }) }) }) })
  ] }) }) });
};

export { UserAssignAdvocate as default };
//# sourceMappingURL=index-B-Y0dcEY.mjs.map
