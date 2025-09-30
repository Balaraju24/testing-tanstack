import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useCaseCompletion } from "./index-Bb_5490h.js";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { A as ApproveDialog } from "./complete-logo-DwVwh2_J.js";
import { F as FileUpload, A as ApproveRejectDialog } from "./ApproveRejectDialog-CbjX-vD1.js";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { F as FileDownload, A as ApproveLogo } from "./approve-logo-BtPutrSX.js";
import { b as deleteSingleDocAPI, c as deleteDocPlaceHolderAPI, e as documentApprovalAPI } from "./fileUpload-BBm5-XTb.js";
import { f as getAllManageDocsAPI } from "./manage-tW0NLyej.js";
import { Q as QUERY_KEYS, D as DRAFT_REVIEW_SUB_STAGES, L as LEGAL_NOTICE_SUB_STAGES, a as LEGAL_NOTICE_STAGES, b as TIMEOUT_DURATION, S as STATUS_MESSAGES, T as TOAST_MESSAGES } from "./getCaseFilesConstants-BRQFWmkt.js";
import { a as fileSizeInMB, i as isSubStageCompleted } from "./ManageCaseHeader-BFRej4X3.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation, useSearch } from "@tanstack/react-router";
import { X, Clock, CircleCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { F as FileActions, U as UploadFileIcon } from "./upload-file-icon-D1lM9Y8S.js";
import { B as Button } from "./router-e7zdrxGz.js";
import { C as Card, a as CardHeader, b as CardContent, c as CardFooter } from "./card-CfZVGcIr.js";
import { S as Separator } from "./separator-BzkEE94Y.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-BKF0DBvK.js";
import { A as ApprovedIcon } from "./approved-Icon-D4Mj_64A.js";
import { E as EditIcon } from "./edit-icon-DqCvL3Yg.js";
import { R as RejectIcon } from "./reject-icon-B4PaiBZt.js";
import { s as sliceFilename, f as formatDateWithTime } from "./manage-CWSyPq63.js";
import { g as getFileIcon } from "./FileIcon-DM2CMkXH.js";
import { D as Dialog, d as DialogTrigger, a as DialogContent, c as DialogTitle, e as DialogClose } from "./dialog-CbaK730S.js";
import { D as DocsCommentsSection } from "./DocsCommentsSection-1v4F6eR1.js";
function StageCompleteIcon({
  className
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "320",
      height: "320",
      viewBox: "0 0 375 250",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: [
        /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_17631_25006)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M291.523 77.9713C288.531 83.3109 281.978 84.0447 271.48 83.0301C263.585 82.2655 256.385 81.6738 248.489 77.3688C242.962 74.3576 238.588 70.2838 235.395 66.3272C231.935 62.0405 227.105 57.1488 229.473 52.2888C232.726 45.6126 251.541 39.9897 269.811 49.1847C289.881 59.2888 294.45 72.7522 291.523 77.9713Z",
              fill: "url(#paint0_linear_17631_25006)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M322.29 106.485C315.59 109.809 306.698 105.536 306.698 105.536C306.698 105.536 308.674 95.8755 315.378 92.5563C322.077 89.233 330.966 93.5018 330.966 93.5018C330.966 93.5018 328.99 103.162 322.29 106.485Z",
              fill: "url(#paint1_linear_17631_25006)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M53.5004 148.453C60.9333 152.908 71.5974 148.789 71.5974 148.789C71.5974 148.789 70.2029 137.45 62.7654 133C55.3324 128.546 44.6729 132.659 44.6729 132.659C44.6729 132.659 46.0674 143.998 53.5004 148.453Z",
              fill: "url(#paint2_linear_17631_25006)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M288.128 89.2586C284.764 89.2586 282.037 91.9854 282.037 95.349C282.037 98.7127 284.764 101.439 288.128 101.439C291.491 101.439 294.218 98.7127 294.218 95.349C294.218 91.9854 291.491 89.2586 288.128 89.2586Z",
              fill: "#B8B8B8"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M247.595 170.386C242.315 170.386 238.036 174.665 238.036 179.945C238.036 185.224 242.315 189.504 247.595 189.504C252.874 189.504 257.154 185.224 257.154 179.945C257.154 174.665 252.874 170.386 247.595 170.386Z",
              fill: "#B8B8B8"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M133.687 69.5843C130.918 69.5843 128.673 71.8291 128.673 74.5981C128.673 77.3671 130.918 79.6118 133.687 79.6118C136.456 79.6118 138.7 77.3671 138.7 74.5981C138.7 71.8291 136.456 69.5843 133.687 69.5843Z",
              fill: "#B8B8B8"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M89.2228 169.983C86.0695 169.983 83.5132 167.426 83.5132 164.273C83.5132 161.12 86.0695 158.563 89.2228 158.563C92.3761 158.563 94.9324 161.12 94.9324 164.273C94.9324 167.426 92.3761 169.983 89.2228 169.983Z",
              fill: "#B8B8B8"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M306.164 130.357C304.692 130.357 303.499 129.165 303.499 127.693C303.499 126.221 304.692 125.028 306.164 125.028C307.636 125.028 308.829 126.221 308.829 127.693C308.829 129.165 307.636 130.357 306.164 130.357Z",
              fill: "#B8B8B8"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M320.787 208.339C318.895 208.339 317.361 206.805 317.361 204.913C317.361 203.021 318.895 201.487 320.787 201.487C322.679 201.487 324.213 203.021 324.213 204.913C324.213 206.805 322.679 208.339 320.787 208.339Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M69.682 180.98C66.9491 180.98 64.7337 178.764 64.7337 176.031C64.7337 173.298 66.9491 171.083 69.682 171.083C72.4149 171.083 74.6304 173.298 74.6304 176.031C74.6304 178.764 72.4149 180.98 69.682 180.98Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M320.233 176.827C318.152 176.827 316.466 175.141 316.466 173.061C316.466 170.981 318.152 169.294 320.233 169.294C322.313 169.294 323.999 170.981 323.999 173.061C323.999 175.141 322.313 176.827 320.233 176.827Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M290.615 58.4005C288.302 58.4005 286.428 56.5259 286.428 54.2135C286.428 51.901 288.302 50.0264 290.615 50.0264C292.927 50.0264 294.802 51.901 294.802 54.2135C294.802 56.5259 292.927 58.4005 290.615 58.4005Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M70.7352 111.223C71.2727 113.229 70.0823 115.29 68.0765 115.828C66.0707 116.365 64.0089 115.175 63.4715 113.169C62.934 111.163 64.1243 109.101 66.1302 108.564C68.136 108.026 70.1978 109.217 70.7352 111.223Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M145.44 39.1798C144.576 39.1798 143.875 38.4791 143.875 37.6148C143.875 36.7505 144.576 36.0498 145.44 36.0498C146.304 36.0498 147.005 36.7505 147.005 37.6148C147.005 38.4791 146.304 39.1798 145.44 39.1798Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M296.616 157.565C294.491 157.565 292.768 156.187 292.768 154.487C292.768 152.787 294.491 151.409 296.616 151.409C298.741 151.409 300.464 152.787 300.464 154.487C300.464 156.187 298.741 157.565 296.616 157.565Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M214.672 38.232C215.061 39.6841 214.199 41.1768 212.747 41.5659C211.295 41.955 209.802 41.0932 209.413 39.641C209.024 38.1889 209.886 36.6963 211.338 36.3072C212.79 35.9181 214.283 36.7799 214.672 38.232Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M98.8816 63.3252H98.9366C99.2612 67.9239 102.681 67.9948 102.681 67.9948C102.681 67.9948 98.9099 68.0685 98.9099 73.3823C98.9099 68.0685 95.1383 67.9948 95.1383 67.9948C95.1383 67.9948 98.557 67.9239 98.8816 63.3252ZM96.4966 198.358H96.5495C96.8607 202.943 100.145 203.014 100.145 203.014C100.145 203.014 96.5237 203.087 96.5237 208.385C96.5237 203.087 92.9028 203.014 92.9028 203.014C92.9028 203.014 96.1849 202.943 96.4966 198.358Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M264.467 110.056V100.255C264.467 89.4258 255.695 80.6541 244.866 80.6541H201.106C199.493 80.6543 197.905 80.2564 196.483 79.4956C195.06 78.7348 193.847 77.6347 192.952 76.2929L179.173 55.6233C178.279 54.2795 177.067 53.1774 175.644 52.4149C174.222 51.6524 172.633 51.2531 171.019 51.2524H127.259C116.43 51.2524 107.658 60.0241 107.658 70.8537V196.82C107.658 203.034 112.686 208.061 118.899 208.061M118.899 208.061C123.858 208.061 128.239 204.807 129.66 200.054L152.466 124.031C154.955 115.73 162.59 110.056 171.244 110.056H267.691C280.775 110.056 290.183 122.62 286.498 135.175L269.24 193.978C266.79 202.328 259.135 208.061 250.433 208.061H118.899Z",
              stroke: "#E1E4E5",
              strokeWidth: "1.66667",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M131.435 92.0168L120.955 81.5831C119.563 80.1984 117.679 79.4213 115.715 79.4214H89.1363C85.0413 79.4214 81.7246 82.7231 81.7246 86.8001V138.452C81.7246 142.528 85.0413 145.831 89.1363 145.831H126.195C130.29 145.831 133.607 142.528 133.607 138.452V97.2335C133.607 95.2785 132.825 93.4006 131.435 92.0168Z",
              fill: "white",
              stroke: "#E1E4E5",
              strokeWidth: "1.66667"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M116.214 94.9863H97.7332C92.1393 94.9863 87.6045 99.5211 87.6045 105.115V123.596C87.6045 129.19 92.1393 133.725 97.7332 133.725H116.214C121.808 133.725 126.343 129.19 126.343 123.596V105.115C126.343 99.5211 121.808 94.9863 116.214 94.9863Z",
              fill: "#B8B8B8",
              stroke: "white",
              strokeWidth: "5.06458",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M100.741 106.611C100.892 106.761 100.996 106.953 101.039 107.162C101.081 107.371 101.06 107.588 100.979 107.785C100.898 107.983 100.76 108.152 100.583 108.27C100.405 108.389 100.197 108.453 99.9834 108.453C99.77 108.453 99.5614 108.389 99.3841 108.27C99.2068 108.152 99.0688 107.983 98.9876 107.785C98.9065 107.588 98.8858 107.371 98.9283 107.162C98.9707 106.953 99.0744 106.761 99.2261 106.611C99.4285 106.41 99.7022 106.297 99.9874 106.297C100.273 106.297 100.546 106.41 100.749 106.611M126.343 110.289C123.401 109.838 120.397 110.031 117.537 110.856C114.677 111.68 112.03 113.115 109.779 115.062C107.528 117.009 105.727 119.421 104.499 122.133C103.272 124.844 102.648 127.79 102.67 130.766C102.676 131.756 102.755 132.746 102.907 133.725",
              stroke: "white",
              strokeWidth: "5.06458",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M199.958 43.9705L190.02 34.0764C188.699 32.7632 186.913 32.0262 185.05 32.0264H159.846C155.963 32.0264 152.818 35.1576 152.818 39.0235V88.0043C152.818 91.8705 155.963 95.0018 159.846 95.0018H194.989C198.872 95.0018 202.017 91.8705 202.017 88.0043V48.9176C202.017 47.0635 201.276 45.2826 199.958 43.9705Z",
              fill: "white",
              stroke: "#E1E4E5",
              strokeWidth: "1.66667"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M187.111 68.8095L174.297 76.0612C171.142 77.8445 167.238 75.5524 167.238 71.912V57.4116C167.238 53.7683 171.135 51.4791 174.297 53.2624L187.111 60.5141C190.33 62.3295 190.33 66.9878 187.111 68.8095Z",
              fill: "#B8B8B8"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M268.502 50.2523L259.29 41.0807C258.066 39.8636 256.409 39.1805 254.683 39.1807H231.32C227.721 39.1807 224.805 42.0827 224.805 45.6665V91.0694C224.805 94.6532 227.721 97.5557 231.32 97.5557H263.896C267.495 97.5557 270.411 94.6532 270.411 91.0694V54.8377C270.411 53.119 269.724 51.4682 268.502 50.2523Z",
              fill: "white",
              stroke: "#E1E4E5",
              strokeWidth: "1.66667"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M261.237 60.5808H246.967M261.237 69.2333H246.967M261.237 77.8854H246.967M237.578 60.2212C237.478 60.2212 237.383 60.2608 237.312 60.3312C237.242 60.4017 237.202 60.4972 237.202 60.5968C237.202 60.6964 237.242 60.792 237.312 60.8624C237.383 60.9329 237.478 60.9724 237.578 60.9724C237.677 60.9724 237.773 60.9329 237.843 60.8624C237.914 60.792 237.953 60.6964 237.953 60.5968C237.953 60.4972 237.914 60.4017 237.843 60.3312C237.773 60.2608 237.677 60.2212 237.578 60.2212ZM237.578 68.8579C237.528 68.8578 237.48 68.8675 237.434 68.8863C237.389 68.9052 237.347 68.9328 237.312 68.9676C237.278 69.0024 237.25 69.0438 237.231 69.0893C237.212 69.1348 237.202 69.1836 237.202 69.2329C237.202 69.2821 237.212 69.3309 237.231 69.3765C237.25 69.422 237.277 69.4634 237.312 69.4982C237.347 69.5331 237.388 69.5607 237.434 69.5796C237.479 69.5985 237.528 69.6082 237.577 69.6083C237.677 69.6083 237.772 69.5688 237.843 69.4985C237.913 69.4282 237.953 69.3328 237.953 69.2333C237.953 69.1338 237.913 69.0383 237.843 68.9679C237.773 68.8975 237.677 68.8579 237.578 68.8579ZM237.578 77.4954C237.478 77.4954 237.383 77.5349 237.312 77.6053C237.242 77.6757 237.202 77.7712 237.202 77.8708C237.202 77.9703 237.242 78.0658 237.312 78.1362C237.383 78.2066 237.478 78.2462 237.578 78.2462C237.677 78.2462 237.773 78.2066 237.843 78.1362C237.914 78.0658 237.953 77.9703 237.953 77.8708C237.953 77.7712 237.914 77.6757 237.843 77.6053C237.773 77.5349 237.677 77.4954 237.578 77.4954Z",
              stroke: "#B8B8B8",
              strokeWidth: "3.92917",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint0_linear_17631_25006",
              x1: "271.367",
              y1: "112.579",
              x2: "244.698",
              y2: "-7.2595",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint1_linear_17631_25006",
              x1: "296.562",
              y1: "116.852",
              x2: "351.823",
              y2: "73.1405",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint2_linear_17631_25006",
              x1: "82.2641",
              y1: "162.793",
              x2: "22.4558",
              y2: "107.223",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("clipPath", { id: "clip0_17631_25006", children: /* @__PURE__ */ jsx("rect", { width: "375", height: "250", fill: "white" }) })
        ] })
      ]
    }
  );
}
function PaymentReceipt({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "100",
      height: "26",
      viewBox: "0 0 116 26",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M0 26V0H100.444C101.367 0 102.262 0.319304 102.977 0.903755L114.495 10.3243C115.333 11.0098 115.473 12.2378 114.811 13.0948L106.047 24.4447C105.29 25.4256 104.12 26 102.881 26H0Z",
            fill: "#28A745"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M6.9 17V8.6H9.636C10.3 8.6 10.844 8.712 11.268 8.936C11.7 9.152 12.016 9.444 12.216 9.812C12.424 10.18 12.528 10.6 12.528 11.072C12.528 11.528 12.424 11.944 12.216 12.32C12.016 12.688 11.704 12.984 11.28 13.208C10.856 13.432 10.308 13.544 9.636 13.544H7.908V17H6.9ZM7.908 12.692H9.624C10.296 12.692 10.776 12.544 11.064 12.248C11.352 11.952 11.496 11.56 11.496 11.072C11.496 10.552 11.352 10.152 11.064 9.872C10.776 9.584 10.296 9.44 9.624 9.44H7.908V12.692ZM15.4877 17.144C14.9997 17.144 14.5917 17.06 14.2637 16.892C13.9357 16.716 13.6917 16.488 13.5317 16.208C13.3717 15.92 13.2917 15.608 13.2917 15.272C13.2917 14.864 13.3957 14.52 13.6037 14.24C13.8197 13.952 14.1197 13.736 14.5037 13.592C14.8957 13.44 15.3557 13.364 15.8837 13.364H17.4797C17.4797 12.988 17.4197 12.676 17.2997 12.428C17.1877 12.172 17.0197 11.98 16.7957 11.852C16.5797 11.724 16.3077 11.66 15.9797 11.66C15.5957 11.66 15.2637 11.756 14.9837 11.948C14.7037 12.14 14.5317 12.424 14.4677 12.8H13.4357C13.4837 12.368 13.6277 12.008 13.8677 11.72C14.1157 11.424 14.4277 11.2 14.8037 11.048C15.1797 10.888 15.5717 10.808 15.9797 10.808C16.5397 10.808 17.0037 10.912 17.3717 11.12C17.7477 11.32 18.0277 11.604 18.2117 11.972C18.3957 12.332 18.4877 12.76 18.4877 13.256V17H17.5877L17.5277 15.932C17.4477 16.1 17.3437 16.26 17.2157 16.412C17.0957 16.556 16.9517 16.684 16.7837 16.796C16.6157 16.9 16.4237 16.984 16.2077 17.048C15.9997 17.112 15.7597 17.144 15.4877 17.144ZM15.6437 16.292C15.9237 16.292 16.1757 16.236 16.3997 16.124C16.6317 16.004 16.8277 15.844 16.9877 15.644C17.1477 15.436 17.2677 15.208 17.3477 14.96C17.4357 14.712 17.4797 14.452 17.4797 14.18V14.144H15.9677C15.5757 14.144 15.2597 14.192 15.0197 14.288C14.7797 14.376 14.6077 14.504 14.5037 14.672C14.3997 14.832 14.3477 15.016 14.3477 15.224C14.3477 15.44 14.3957 15.628 14.4917 15.788C14.5957 15.948 14.7437 16.072 14.9357 16.16C15.1357 16.248 15.3717 16.292 15.6437 16.292ZM20.5312 19.64L22.0073 16.328H21.6593L19.2833 10.952H20.3753L22.3433 15.572L24.4073 10.952H25.4513L21.5873 19.64H20.5312ZM26.5392 17V10.952H27.4512L27.5112 11.816C27.7032 11.504 27.9592 11.26 28.2792 11.084C28.6072 10.9 28.9632 10.808 29.3472 10.808C29.6592 10.808 29.9392 10.852 30.1872 10.94C30.4432 11.02 30.6672 11.148 30.8592 11.324C31.0512 11.492 31.2072 11.708 31.3272 11.972C31.5352 11.604 31.8192 11.32 32.1792 11.12C32.5472 10.912 32.9392 10.808 33.3552 10.808C33.8192 10.808 34.2232 10.904 34.5672 11.096C34.9192 11.28 35.1872 11.564 35.3712 11.948C35.5632 12.324 35.6592 12.804 35.6592 13.388V17H34.6632V13.496C34.6632 12.888 34.5392 12.432 34.2912 12.128C34.0432 11.824 33.6952 11.672 33.2472 11.672C32.9352 11.672 32.6552 11.756 32.4072 11.924C32.1592 12.084 31.9632 12.32 31.8192 12.632C31.6752 12.944 31.6032 13.328 31.6032 13.784V17H30.5952V13.496C30.5952 12.888 30.4712 12.432 30.2232 12.128C29.9752 11.824 29.6232 11.672 29.1672 11.672C28.8632 11.672 28.5872 11.756 28.3392 11.924C28.0992 12.084 27.9072 12.32 27.7632 12.632C27.6192 12.944 27.5472 13.328 27.5472 13.784V17H26.5392ZM39.8787 17.144C39.3107 17.144 38.8067 17.012 38.3667 16.748C37.9347 16.484 37.5947 16.116 37.3467 15.644C37.0987 15.164 36.9747 14.608 36.9747 13.976C36.9747 13.336 37.0947 12.78 37.3347 12.308C37.5827 11.836 37.9267 11.468 38.3667 11.204C38.8147 10.94 39.3267 10.808 39.9027 10.808C40.4947 10.808 40.9947 10.94 41.4027 11.204C41.8187 11.468 42.1347 11.816 42.3507 12.248C42.5747 12.672 42.6867 13.14 42.6867 13.652C42.6867 13.732 42.6867 13.816 42.6867 13.904C42.6867 13.992 42.6827 14.092 42.6747 14.204H37.7307V13.424H41.7027C41.6787 12.872 41.4947 12.44 41.1507 12.128C40.8147 11.816 40.3907 11.66 39.8787 11.66C39.5347 11.66 39.2147 11.74 38.9187 11.9C38.6307 12.052 38.3987 12.28 38.2227 12.584C38.0467 12.88 37.9587 13.252 37.9587 13.7V14.036C37.9587 14.532 38.0467 14.948 38.2227 15.284C38.4067 15.62 38.6427 15.872 38.9307 16.04C39.2267 16.208 39.5427 16.292 39.8787 16.292C40.3027 16.292 40.6507 16.2 40.9227 16.016C41.2027 15.824 41.4027 15.568 41.5227 15.248H42.5187C42.4227 15.608 42.2547 15.932 42.0147 16.22C41.7747 16.508 41.4747 16.736 41.1147 16.904C40.7627 17.064 40.3507 17.144 39.8787 17.144ZM44.047 17V10.952H44.959L45.007 12.008C45.199 11.632 45.471 11.34 45.823 11.132C46.183 10.916 46.591 10.808 47.047 10.808C47.519 10.808 47.927 10.904 48.271 11.096C48.615 11.28 48.883 11.564 49.075 11.948C49.267 12.324 49.363 12.804 49.363 13.388V17H48.355V13.496C48.355 12.888 48.219 12.432 47.947 12.128C47.683 11.824 47.307 11.672 46.819 11.672C46.483 11.672 46.183 11.756 45.919 11.924C45.655 12.084 45.443 12.32 45.283 12.632C45.131 12.936 45.055 13.316 45.055 13.772V17H44.047ZM53.3137 17C52.9537 17 52.6417 16.944 52.3777 16.832C52.1137 16.72 51.9097 16.532 51.7657 16.268C51.6297 15.996 51.5617 15.632 51.5617 15.176V11.804H50.5057V10.952H51.5617L51.6937 9.488H52.5697V10.952H54.3217V11.804H52.5697V15.176C52.5697 15.552 52.6457 15.808 52.7977 15.944C52.9497 16.072 53.2177 16.136 53.6017 16.136H54.2497V17H53.3137ZM58.8844 17V8.6H61.5964C62.2524 8.6 62.7884 8.712 63.2044 8.936C63.6204 9.152 63.9284 9.444 64.1284 9.812C64.3284 10.18 64.4284 10.596 64.4284 11.06C64.4284 11.508 64.3244 11.92 64.1164 12.296C63.9164 12.672 63.6044 12.972 63.1804 13.196C62.7564 13.42 62.2124 13.532 61.5484 13.532H59.8924V17H58.8844ZM63.3244 17L61.4764 13.244H62.6044L64.5124 17H63.3244ZM59.8924 12.74H61.5244C62.1644 12.74 62.6324 12.584 62.9284 12.272C63.2324 11.96 63.3844 11.56 63.3844 11.072C63.3844 10.576 63.2364 10.184 62.9404 9.896C62.6524 9.6 62.1764 9.452 61.5124 9.452H59.8924V12.74ZM68.2381 17.144C67.6701 17.144 67.1661 17.012 66.7261 16.748C66.2941 16.484 65.9541 16.116 65.7061 15.644C65.4581 15.164 65.3341 14.608 65.3341 13.976C65.3341 13.336 65.4541 12.78 65.6941 12.308C65.9421 11.836 66.2861 11.468 66.7261 11.204C67.1741 10.94 67.6861 10.808 68.2621 10.808C68.8541 10.808 69.3541 10.94 69.7621 11.204C70.1781 11.468 70.4941 11.816 70.7101 12.248C70.9341 12.672 71.0461 13.14 71.0461 13.652C71.0461 13.732 71.0461 13.816 71.0461 13.904C71.0461 13.992 71.0421 14.092 71.0341 14.204H66.0901V13.424H70.0621C70.0381 12.872 69.8541 12.44 69.5101 12.128C69.1741 11.816 68.7501 11.66 68.2381 11.66C67.8941 11.66 67.5741 11.74 67.2781 11.9C66.9901 12.052 66.7581 12.28 66.5821 12.584C66.4061 12.88 66.3181 13.252 66.3181 13.7V14.036C66.3181 14.532 66.4061 14.948 66.5821 15.284C66.7661 15.62 67.0021 15.872 67.2901 16.04C67.5861 16.208 67.9021 16.292 68.2381 16.292C68.6621 16.292 69.0101 16.2 69.2821 16.016C69.5621 15.824 69.7621 15.568 69.8821 15.248H70.8781C70.7821 15.608 70.6141 15.932 70.3741 16.22C70.1341 16.508 69.8341 16.736 69.4741 16.904C69.1221 17.064 68.7101 17.144 68.2381 17.144ZM75.1304 17.144C74.5624 17.144 74.0504 17.012 73.5944 16.748C73.1464 16.484 72.7944 16.116 72.5384 15.644C72.2824 15.164 72.1544 14.612 72.1544 13.988C72.1544 13.348 72.2824 12.792 72.5384 12.32C72.7944 11.848 73.1464 11.48 73.5944 11.216C74.0504 10.944 74.5624 10.808 75.1304 10.808C75.8504 10.808 76.4504 10.996 76.9304 11.372C77.4104 11.74 77.7144 12.236 77.8424 12.86H76.8104C76.7304 12.484 76.5344 12.192 76.2224 11.984C75.9104 11.776 75.5424 11.672 75.1184 11.672C74.7744 11.672 74.4544 11.76 74.1584 11.936C73.8624 12.104 73.6264 12.36 73.4504 12.704C73.2744 13.048 73.1864 13.472 73.1864 13.976C73.1864 14.352 73.2384 14.688 73.3424 14.984C73.4464 15.272 73.5864 15.512 73.7624 15.704C73.9384 15.896 74.1424 16.044 74.3744 16.148C74.6144 16.244 74.8624 16.292 75.1184 16.292C75.4064 16.292 75.6664 16.248 75.8984 16.16C76.1304 16.064 76.3264 15.924 76.4864 15.74C76.6464 15.556 76.7544 15.34 76.8104 15.092H77.8424C77.7144 15.7 77.4064 16.196 76.9184 16.58C76.4384 16.956 75.8424 17.144 75.1304 17.144ZM81.9256 17.144C81.3576 17.144 80.8536 17.012 80.4136 16.748C79.9816 16.484 79.6416 16.116 79.3936 15.644C79.1456 15.164 79.0216 14.608 79.0216 13.976C79.0216 13.336 79.1416 12.78 79.3816 12.308C79.6296 11.836 79.9736 11.468 80.4136 11.204C80.8616 10.94 81.3736 10.808 81.9496 10.808C82.5416 10.808 83.0416 10.94 83.4496 11.204C83.8656 11.468 84.1816 11.816 84.3976 12.248C84.6216 12.672 84.7336 13.14 84.7336 13.652C84.7336 13.732 84.7336 13.816 84.7336 13.904C84.7336 13.992 84.7296 14.092 84.7216 14.204H79.7776V13.424H83.7496C83.7256 12.872 83.5416 12.44 83.1976 12.128C82.8616 11.816 82.4376 11.66 81.9256 11.66C81.5816 11.66 81.2616 11.74 80.9656 11.9C80.6776 12.052 80.4456 12.28 80.2696 12.584C80.0936 12.88 80.0056 13.252 80.0056 13.7V14.036C80.0056 14.532 80.0936 14.948 80.2696 15.284C80.4536 15.62 80.6896 15.872 80.9776 16.04C81.2736 16.208 81.5896 16.292 81.9256 16.292C82.3496 16.292 82.6976 16.2 82.9696 16.016C83.2496 15.824 83.4496 15.568 83.5696 15.248H84.5656C84.4696 15.608 84.3016 15.932 84.0616 16.22C83.8216 16.508 83.5216 16.736 83.1616 16.904C82.8096 17.064 82.3976 17.144 81.9256 17.144ZM86.1899 17V10.952H87.1979V17H86.1899ZM86.6939 9.668C86.4939 9.668 86.3259 9.604 86.1899 9.476C86.0619 9.34 85.9979 9.172 85.9979 8.972C85.9979 8.772 86.0619 8.612 86.1899 8.492C86.3259 8.364 86.4939 8.3 86.6939 8.3C86.8859 8.3 87.0499 8.364 87.1859 8.492C87.3219 8.612 87.3899 8.772 87.3899 8.972C87.3899 9.172 87.3219 9.34 87.1859 9.476C87.0499 9.604 86.8859 9.668 86.6939 9.668ZM88.9767 19.64V10.952H89.8887L89.9727 11.936C90.1007 11.744 90.2647 11.564 90.4647 11.396C90.6647 11.22 90.9047 11.08 91.1847 10.976C91.4647 10.864 91.7847 10.808 92.1447 10.808C92.7367 10.808 93.2487 10.948 93.6807 11.228C94.1207 11.508 94.4607 11.888 94.7007 12.368C94.9487 12.84 95.0727 13.38 95.0727 13.988C95.0727 14.596 94.9487 15.14 94.7007 15.62C94.4607 16.092 94.1207 16.464 93.6807 16.736C93.2407 17.008 92.7247 17.144 92.1327 17.144C91.6447 17.144 91.2127 17.044 90.8367 16.844C90.4687 16.644 90.1847 16.364 89.9847 16.004V19.64H88.9767ZM92.0247 16.268C92.4167 16.268 92.7647 16.172 93.0687 15.98C93.3727 15.788 93.6087 15.524 93.7767 15.188C93.9527 14.844 94.0407 14.44 94.0407 13.976C94.0407 13.52 93.9527 13.12 93.7767 12.776C93.6087 12.432 93.3727 12.164 93.0687 11.972C92.7647 11.78 92.4167 11.684 92.0247 11.684C91.6247 11.684 91.2727 11.78 90.9687 11.972C90.6647 12.164 90.4287 12.432 90.2607 12.776C90.0927 13.12 90.0087 13.52 90.0087 13.976C90.0087 14.44 90.0927 14.844 90.2607 15.188C90.4287 15.524 90.6647 15.788 90.9687 15.98C91.2727 16.172 91.6247 16.268 92.0247 16.268ZM98.6301 17C98.2701 17 97.9581 16.944 97.6941 16.832C97.4301 16.72 97.2261 16.532 97.0821 16.268C96.9461 15.996 96.8781 15.632 96.8781 15.176V11.804H95.8221V10.952H96.8781L97.0101 9.488H97.8861V10.952H99.6381V11.804H97.8861V15.176C97.8861 15.552 97.9621 15.808 98.1141 15.944C98.2661 16.072 98.5341 16.136 98.9181 16.136H99.5661V17H98.6301Z",
            fill: "white"
          }
        )
      ]
    }
  );
}
const SPECIAL_STAGES = [
  "CSFG#DAPT",
  "CSFG#DROP",
  "CSFG#DROC",
  "CSFG#DRCR",
  "CSFG#DRAP",
  "DLNT#DFNT",
  "NTCE#DFNT"
];
const IMAGE_FILE_TYPES = [
  "image",
  "jpg",
  "jpeg",
  "image/jpeg",
  "image/png",
  "gif",
  "svg",
  "png",
  "webp",
  "image/svg+xml"
];
const STATUS_CLASSES = {
  REJECTED: "bg-red-500 hover:bg-red-500 text-xs px-4 py-2 text-white rounded-none font-primary cursor-pointer",
  APPROVED: "bg-green-500 hover:bg-green-500 text-xs px-4 py-1 text-white rounded-none font-primary cursor-pointer",
  PENDING: "bg-orange-500 hover:bg-orange-500 text-xs px-4 py-1 text-white rounded-none font-primary cursor-pointer",
  DEFAULT: "bg-black hover:bg-black text-xs px-4 py-1 text-white rounded-none font-primary cursor-pointer"
};
const VERIFICATION_STATUS = {
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED"
};
const DIALOG_CONFIG = {
  WIDTH_PERCENTAGE: "90%",
  MAIN_CONTENT_WIDTH: "3/5",
  SIDEBAR_WIDTH: "2/5",
  IMAGE_HEIGHT: "70vh"
};
const BUTTON_CONFIG = {
  REJECT: {
    variant: "outline",
    className: "text-xs h-7 active:scale-95 duration-300 transition-all px-4 rounded-none cursor-pointer text-red-500",
    text: "Reject"
  },
  APPROVE: {
    className: "bg-green-500 active:scale-95 duration-300 transition-all h-7 text-xs px-4 cursor-pointer text-white rounded-none hover:bg-green-500",
    text: "Approve"
  }
};
const FilePreviewDialog = ({
  file,
  children,
  rejAppDialog,
  onApprove,
  isUser,
  isB2CManager,
  isB2CLegalAdvisor,
  case_sub_stage,
  ApproveOrRejectDocument,
  isCurrentStageCompleted
}) => {
  const isPending = file.verification_status === VERIFICATION_STATUS.PENDING;
  const isRejected = file.verification_status === VERIFICATION_STATUS.REJECTED;
  const finalDoc = file?.category === "Final Document";
  const isSpecialStage = case_sub_stage ? SPECIAL_STAGES.includes(case_sub_stage) : false;
  const isManagerOrAdvisor = isB2CManager || isB2CLegalAdvisor;
  const canApproveReject = isPending && !isSpecialStage && !isUser || isSpecialStage && isManagerOrAdvisor;
  const getStatusClass = (status) => {
    return STATUS_CLASSES[status] || STATUS_CLASSES.DEFAULT;
  };
  const statusText = file?.verification_status ? file?.verification_status.charAt(0).toUpperCase() + file?.verification_status.slice(1).toLowerCase() : "";
  const isImageFile = IMAGE_FILE_TYPES.includes(file?.file_type);
  const handleReject = () => {
    rejAppDialog({
      docId: file.id,
      verification_status: VERIFICATION_STATUS.REJECTED,
      category: file?.category ?? ""
    });
  };
  const handleApprove = () => {
    onApprove({
      docId: file?.id,
      verification_status: VERIFICATION_STATUS.APPROVED
    });
  };
  const renderActionButtons = () => {
    if (finalDoc) return null;
    if (!isUser && canApproveReject && !isRejected) {
      return /* @__PURE__ */ jsx(Fragment, { children: !isCurrentStageCompleted && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: BUTTON_CONFIG.REJECT.variant,
            className: BUTTON_CONFIG.REJECT.className,
            onClick: handleReject,
            disabled: ApproveOrRejectDocument,
            children: BUTTON_CONFIG.REJECT.text
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: BUTTON_CONFIG.APPROVE.className,
            onClick: handleApprove,
            disabled: ApproveOrRejectDocument,
            children: BUTTON_CONFIG.APPROVE.text
          }
        )
      ] }) });
    }
    return /* @__PURE__ */ jsx("p", { className: getStatusClass(file?.verification_status), children: statusText });
  };
  const renderFileContent = () => {
    if (isImageFile) {
      return /* @__PURE__ */ jsx(
        "img",
        {
          src: file?.download_url,
          alt: "Full Image",
          className: `w-full h-[${DIALOG_CONFIG.IMAGE_HEIGHT}] object-contain rounded-lg`
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "iframe",
      {
        src: file?.download_url,
        title: "Full Image",
        className: `w-full h-[${DIALOG_CONFIG.IMAGE_HEIGHT}] object-contain rounded-lg`
      }
    );
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "cursor-pointer", children }) }),
    /* @__PURE__ */ jsxs(
      DialogContent,
      {
        className: `w-[${DIALOG_CONFIG.WIDTH_PERCENTAGE}] p-2 gap-0 bg-white`,
        "aria-describedby": void 0,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full pb-2", children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium tracking-normal", children: file?.file_name.replace(/\.[^/.]+$/, "") }) }),
            /* @__PURE__ */ jsx(DialogClose, { className: "[&_svg]:size-5", children: /* @__PURE__ */ jsx(X, { className: "stroke-red-500 cursor-pointer" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: `w-${DIALOG_CONFIG.MAIN_CONTENT_WIDTH} px-2 py-2 border-r border-t border-gray-300 flex flex-col`, children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end w-full mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                renderActionButtons(),
                !finalDoc && !isCurrentStageCompleted && /* @__PURE__ */ jsx("div", { className: "w-[0.5px] h-9 bg-gray-300" }),
                /* @__PURE__ */ jsx(
                  FileDownload,
                  {
                    file: {
                      key: file?.key,
                      file_name: file?.file_name
                    }
                  }
                )
              ] }) }),
              renderFileContent()
            ] }),
            /* @__PURE__ */ jsx("div", { className: `w-${DIALOG_CONFIG.SIDEBAR_WIDTH} h-full flex flex-col space-y-3`, children: /* @__PURE__ */ jsx(DocsCommentsSection, { documentId: file.id }) })
          ] })
        ]
      }
    )
  ] });
};
const FileCard = ({
  file,
  onDeleteFile,
  onDeletePlaceHolder,
  rejAppDialog,
  onApprove,
  getCaseFilesFetcher,
  loading2,
  setLoading2,
  isUser,
  isB2CManager,
  isB2CLegalAdvisor,
  case_sub_stage,
  ApproveOrRejectDocument,
  isPayment,
  isCurrentStageCompleted
}) => {
  const icon = getFileIcon(file.file_type, file.download_url, file.file_name);
  const showUploadOption = file.verification_status === "REJECTED" && file.category;
  const cardHeaderStyle = file.file_type === "application/pdf" || file.file_type === "pdf" ? "bg-[#F3F3F3]" : "bg-gray-100";
  return /* @__PURE__ */ jsxs("div", { className: "w-fit", children: [
    /* @__PURE__ */ jsxs(Card, { className: "w-56 rounded-none border border-gray-300 overflow-hidden ", children: [
      /* @__PURE__ */ jsx(
        FilePreviewDialog,
        {
          file,
          rejAppDialog,
          onApprove,
          getCaseFilesFetcher,
          loading2,
          setLoading2,
          isUser,
          isB2CManager,
          isB2CLegalAdvisor,
          case_sub_stage,
          ApproveOrRejectDocument,
          isCurrentStageCompleted,
          children: /* @__PURE__ */ jsxs(
            CardHeader,
            {
              className: `${cardHeaderStyle} relative flex items-center !p-0 space-y-0 justify-center w-full min-h-28`,
              children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    className: "!p-0 h-fit w-full rounded-none border-none bg-transparent [&_svg]:size-14 cursor-pointer",
                    "aria-label": "View File",
                    children: icon
                  }
                ),
                /* @__PURE__ */ jsxs("span", { className: "text-green-500 absolute top-4 right-3", children: [
                  file?.verification_status === "APPROVED" && /* @__PURE__ */ jsx(ApprovedIcon, {}),
                  file?.verification_status === "REJECTED" && /* @__PURE__ */ jsx(RejectIcon, {})
                ] }),
                isPayment && /* @__PURE__ */ jsx("span", { className: "absolute top-1 left-1", children: /* @__PURE__ */ jsx(PaymentReceipt, {}) })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(CardContent, { className: "flex flex-col px-2 py-1.5 cursor-pointer", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("div", { className: "font-normal text-start text-xs", children: sliceFilename(file.file_name || "", 25) }) }),
        /* @__PURE__ */ jsx(TooltipContent, { className: "bg-white", children: file.file_name })
      ] }) }) }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "w-full p-2 border-none text-left flex justify-between items-center border-t", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-gray-500 text-[10px] smd:text-[10px] flex items-center gap-2", children: [
          formatDateWithTime(file?.updated_at || file?.created_at),
          file.key && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-3 bg-gray-500" }),
            /* @__PURE__ */ jsxs("span", { className: "text-[11px]", children: [
              fileSizeInMB(file.file_size),
              " MB"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FileActions,
          {
            file,
            onDeleteFile,
            onDeletePlaceHolder,
            rejAppDialog,
            getCaseFilesFetcher,
            loading2,
            setLoading2,
            isCurrentStageCompleted
          }
        )
      ] })
    ] }),
    showUploadOption && !isCurrentStageCompleted && /* @__PURE__ */ jsx(
      FileUpload,
      {
        refetch: getCaseFilesFetcher,
        documentId: file.id,
        loading2,
        setLoading2,
        category: file.category,
        children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 text-xs items-center mt-1 justify-self-start [&_svg]:size-4", children: [
          /* @__PURE__ */ jsx(EditIcon, { className: "" }),
          "Replace the Document"
        ] })
      }
    )
  ] });
};
const PlaceholderCard = ({
  file,
  getCaseFilesFetcher,
  loading2,
  setLoading2,
  isCurrentStageCompleted
}) => {
  const UploadContent = /* @__PURE__ */ jsx(Card, { className: "rounded-none border-0 w-56 cursor-pointer", children: /* @__PURE__ */ jsx(CardHeader, { className: "bg-gray-100 border  border-black flex items-center justify-center min-h-44 w-full group p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 items-center transition-all duration-100", children: [
    /* @__PURE__ */ jsx(UploadFileIcon, {}),
    /* @__PURE__ */ jsx("div", { className: "text-sm font-normal", children: "Drop file here or Click to upload" }),
    /* @__PURE__ */ jsx("div", { className: "font-light text-xs", children: "Maximum File Size:50MB" })
  ] }) }) });
  return /* @__PURE__ */ jsx("div", { className: "w-56 cursor-pointer", children: isCurrentStageCompleted ? /* @__PURE__ */ jsx("div", { className: "w-full", children: UploadContent }) : /* @__PURE__ */ jsx(
    FileUpload,
    {
      refetch: getCaseFilesFetcher,
      documentId: file.id,
      loading2,
      setLoading2,
      children: UploadContent
    }
  ) });
};
const FileList = ({
  files,
  onDeleteFile,
  onDeletePlaceHolder,
  rejAppDialog,
  onApprove,
  getCaseFilesFetcher,
  loading2,
  setLoading2,
  isUser,
  isB2CManager,
  isB2CLegalAdvisor,
  case_sub_stage,
  ApproveOrRejectDocument,
  showPlaceholder,
  isCurrentStageCompleted,
  showPlaceholderforLegalNotice,
  noticeDraftKey,
  noticeSentKey
}) => {
  const noticeDraftDocs = files?.filter(
    (file) => file?.case_sub_stage === "DLNT#DFNT" && file?.verification_status === "APPROVED"
  );
  const noticeSendDocs = files?.filter(
    (file) => file?.case_sub_stage === "SLNT#SNNT"
  );
  let finalFiles = [];
  if (noticeDraftKey) {
    finalFiles = noticeDraftDocs || [];
  } else if (noticeSentKey) {
    finalFiles = noticeSendDocs || [];
  } else {
    finalFiles = files || [];
  }
  const userUploadNotice = isUser && noticeSendDocs;
  return /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-0`, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-y-4 2xl:grid-cols-3 3xl:grid-cols-4 gap-3", children: [
    finalFiles.map((file) => /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: file.category || "" }),
      file.download_url ? /* @__PURE__ */ jsx(
        FileCard,
        {
          file,
          onDeleteFile,
          onDeletePlaceHolder,
          rejAppDialog,
          onApprove,
          getCaseFilesFetcher,
          loading2,
          setLoading2,
          isUser,
          isB2CManager,
          isB2CLegalAdvisor,
          case_sub_stage,
          ApproveOrRejectDocument,
          isCurrentStageCompleted
        }
      ) : /* @__PURE__ */ jsx(
        PlaceholderCard,
        {
          file,
          getCaseFilesFetcher,
          loading2,
          setLoading2,
          isCurrentStageCompleted
        }
      )
    ] }, file.id)),
    showPlaceholder && !showPlaceholderforLegalNotice && !noticeDraftKey && !userUploadNotice && /* @__PURE__ */ jsx("div", { className: "w-56 rounded-none overflow-hidden", children: /* @__PURE__ */ jsx(
      FileUpload,
      {
        refetch: getCaseFilesFetcher,
        setLoading2,
        loading2,
        children: /* @__PURE__ */ jsxs("div", { className: "py-11 w-full border border-dashed bg-slate-100 border-gray-400 px-2 flex flex-col gap-2.5 items-center justify-center", children: [
          /* @__PURE__ */ jsx(UploadFileIcon, {}),
          /* @__PURE__ */ jsx("div", { className: "text-[11px]", children: "Drop Files here or Click to upload" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px]", children: "Maximum file size: 50MB" })
        ] })
      }
    ) })
  ] }) });
};
const GetCaseFiles = ({ NoticeDraftKey, NoticeSentKey }) => {
  const { service_id } = useParams({ strict: false });
  const [deleteObj, setDeleteObj] = useState(null);
  const { isUser, isManager, isAdmin } = useUserDetails();
  const onCancelDeleteFile = () => setDeleteObj(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [dialogType, setDialogType] = useState(null);
  const onCancelApproveReject = () => setDialogType(null);
  const [approveRejectReason, setApproveRejectReason] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [appRejError, setAppRejError] = useState("");
  const { caseStagesData, getCaseStagesRefetch, allRecords, allDocsData } = UseContextAPI();
  const { completeSubStage } = useCaseCompletion();
  const location = useLocation();
  const search = useSearch({ strict: false });
  const stage = search.stage;
  const subStage = search.sub_stage;
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const onConfirmDelete = () => {
    if (isDeleteLoading || !deleteObj?.id) return;
    toast.promise(onConfirmDeleteFile(deleteObj.id), {
      loading: TOAST_MESSAGES.DELETE_LOADING,
      success: TOAST_MESSAGES.DELETE_SUCCESS,
      error: TOAST_MESSAGES.DELETE_ERROR,
      action: {
        label: TOAST_MESSAGES.CLOSE_LABEL,
        onClick: () => toast.dismiss()
      }
    });
  };
  const onDeleteFile = (contactTypeObj) => {
    setDeleteObj(contactTypeObj);
  };
  const onDeletePlaceHolder = (contactTypeObj) => {
    setDeleteObj(contactTypeObj);
  };
  const onConfirmDeletePlaceHolder = () => {
    if (isDeleteLoading) return;
    toast.promise(onConfirmDeletePlaceholder(deleteObj.id), {
      loading: TOAST_MESSAGES.DELETE_LOADING,
      success: TOAST_MESSAGES.DELETE_SUCCESS,
      error: TOAST_MESSAGES.DELETE_ERROR,
      action: {
        label: TOAST_MESSAGES.CLOSE_LABEL,
        onClick: () => toast.dismiss()
      }
    });
  };
  const {
    isFetching,
    isLoading,
    data: filesDetails,
    refetch: getCaseFilesFetcher
  } = useQuery({
    queryKey: [
      QUERY_KEYS.FILE_DETAILS,
      service_id,
      stage,
      subStage,
      location.pathname
    ],
    queryFn: async ({ signal }) => {
      try {
        if (!service_id) return { signal };
        let queryParams = {};
        if (subStage === "CSFG#DREV") {
          queryParams = {
            case_stage: "CSFG",
            case_sub_stages: DRAFT_REVIEW_SUB_STAGES.map(encodeURIComponent),
            verification_status: "APPROVED"
          };
        } else if (subStage === "SLNT#SNNT") {
          queryParams = {
            case_stages: LEGAL_NOTICE_STAGES.map(encodeURIComponent),
            case_sub_stages: LEGAL_NOTICE_SUB_STAGES.map(encodeURIComponent)
          };
        } else {
          queryParams = {
            case_stage: stage,
            case_sub_stage: subStage && encodeURIComponent(subStage)
          };
        }
        const response = await getAllManageDocsAPI(
          service_id,
          queryParams,
          { signal }
        );
        if (response?.status === 200 || response?.status === 201) {
          const data = response?.data?.data?.records;
          setTimeout(() => {
            setLoading2(false);
          }, TIMEOUT_DURATION);
          return data;
        } else {
          throw new Error(STATUS_MESSAGES.API_ERROR);
        }
      } catch (err) {
        const error = err;
        if (error.name === "AbortError") return void 0;
        throw new Error(STATUS_MESSAGES.FETCH_ERROR);
      } finally {
        setTimeout(() => {
          setLoading2(false);
        }, TIMEOUT_DURATION);
      }
    },
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    refetchOnMount: "always"
  });
  const { mutateAsync: onConfirmDeleteFile, isPending: isDeleteLoading } = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_FILE],
    mutationFn: async (docId) => {
      docId = filesDetails?.find((item) => item?.id === docId)?.id;
      const response = await deleteSingleDocAPI({
        docId,
        payload: {
          reason: deleteReason,
          case_stage: stage,
          case_sub_stage: subStage
        }
      });
      if (response?.status == 200 || response?.status == 201) {
        const data = response?.data;
        return data;
      } else {
        throw response;
      }
    },
    onSuccess: (data) => {
      setDeleteObj(null);
      getCaseFilesFetcher();
    },
    onError: (error) => {
      setDeleteError(error?.data?.errData?.reason[0]);
      getCaseFilesFetcher();
    }
  });
  const {
    mutateAsync: onConfirmDeletePlaceholder,
    isPending: isDeletePlaceholder
  } = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_PLACEHOLDER],
    mutationFn: async (docId) => {
      docId = filesDetails?.find((item) => item?.id === docId)?.id;
      const response = await deleteDocPlaceHolderAPI({
        docId,
        payload: {
          reason: deleteReason,
          case_stage: stage,
          case_sub_stage: subStage
        }
      });
      if (response?.status == 200 || response?.status == 201) {
        const data = response?.data;
        return data;
      } else {
        throw response;
      }
    },
    onSuccess: (data) => {
      setDeleteObj(null);
      getCaseFilesFetcher();
      setDeleteReason("");
    },
    onError: (error) => {
      setDeleteError(error?.data?.errData?.reason[0]);
      getCaseFilesFetcher();
    }
  });
  const {
    mutate: mutateApproveorRejectDocument,
    isPending: ApproveOrRejectDocument
  } = useMutation({
    mutationKey: [QUERY_KEYS.APPROVE_REJECT_DOCUMENT],
    mutationFn: async ({
      docId,
      verification_status,
      notes,
      category
    }) => {
      docId = filesDetails?.find((item) => item?.id === docId)?.id;
      let payload = {
        verification_status,
        case_stage: stage,
        case_sub_stage: subStage,
        notes: void 0,
        category
      };
      if (approveRejectReason !== "") {
        payload = {
          ...payload,
          notes: approveRejectReason,
          type: verification_status
        };
      }
      const response = await documentApprovalAPI({
        payload,
        doc_id: docId
      });
      return response;
    },
    onSuccess: async (data, variables) => {
      toast.success(data?.data?.message, {
        action: {
          label: TOAST_MESSAGES.CLOSE_LABEL,
          onClick: () => toast.dismiss()
        }
      });
      setDialogType(null);
      setApproveRejectReason("");
      getCaseFilesFetcher();
      if (variables.verification_status === "APPROVED" && (subStage === "CSFG#DRAP" || subStage === "CSFG#DAPT" || subStage === "CSFG#DROC" || subStage === "CSFG#DROP" || subStage === "CSFG#DRCR")) {
        await getCaseStagesRefetch();
        completeSubStage(subStage);
      }
    },
    onError: (error) => {
      setAppRejError(error?.data?.errData?.notes[0]);
    }
  });
  const rejAppDialog = (params) => {
    setDialogType({
      docId: params?.docId,
      verification_status: params?.verification_status,
      category: params?.category ? params?.category : ""
    });
  };
  const onConfirmApproveReject = () => {
    if (dialogType) {
      mutateApproveorRejectDocument({
        ...dialogType,
        notes: dialogType?.notes ?? ""
      });
    }
  };
  const onApprove = (params) => {
    mutateApproveorRejectDocument({
      ...params
    });
  };
  const rejectedFilesCount = Array.isArray(filesDetails) ? filesDetails.filter(
    (file) => file?.verification_status === "REJECTED"
  ).length : 0;
  const validFilesCount = (filesDetails?.length || 0) - rejectedFilesCount;
  const uploadedLegalNotice = filesDetails?.length === 0 || filesDetails?.every(
    (file) => file?.verification_status === "REJECTED"
  );
  const showplaceHolder = [
    "CSFG#DAPT",
    "CSFG#DROC",
    "CSFG#DROP",
    "CSFG#DRCR",
    "CSFG#DRAP",
    "NTCE#DFNT"
  ].includes(subStage) && validFilesCount < 1 && !isCurrentStageCompleted || ![
    "CSFG#DREV",
    "CSFG#DAPT",
    "CSFG#DROC",
    "CSFG#DROP",
    "CSFG#DRCR",
    "CSFG#DRAP",
    "NTCE#DFNT"
  ].includes(subStage) && !isCurrentStageCompleted;
  const showPlaceholderforLegalNotice = ["DLNT#DFNT"].includes(subStage) && !uploadedLegalNotice;
  return /* @__PURE__ */ jsxs("div", { className: `p-1  ${isFetching || loading2 ? "h-full" : ""}`, children: [
    loading2 || isFetching ? /* @__PURE__ */ jsx(
      LoadingComponent,
      {
        loading: isFetching || loading2,
        message: "Files...",
        className: "bg-white"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full", children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "h-full", children: !filesDetails && !isLoading ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        FileList,
        {
          files: filesDetails,
          onDeleteFile,
          onDeletePlaceHolder,
          rejAppDialog,
          onApprove,
          getCaseFilesFetcher,
          loading2,
          setLoading2,
          isUser: isUser(),
          isB2CManager: isManager(),
          isB2CLegalAdvisor: isAdmin(),
          case_sub_stage: subStage,
          ApproveOrRejectDocument,
          showPlaceholder: showplaceHolder,
          isCurrentStageCompleted,
          showPlaceholderforLegalNotice,
          noticeSentKey: NoticeSentKey,
          noticeDraftKey: NoticeDraftKey
        }
      ),
      filesDetails?.some(
        (file) => DRAFT_REVIEW_SUB_STAGES.includes(file?.case_sub_stage)
      ) && filesDetails?.some(
        (file) => file?.verification_status === "APPROVED"
      ) && subStage === "CSFG#DREV" && /* @__PURE__ */ jsx("div", { className: "flex items-start mt-3 gap-2", children: !filesDetails?.some(
        (file) => file?.is_consent_provided === true
      ) ? /* @__PURE__ */ jsxs("div", { className: "p-4 mb-4 border border-orange-300 bg-orange-100 rounded-none flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Clock, { size: 18, color: "orange" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs", children: STATUS_MESSAGES.PENDING_APPROVAL })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "p-4 mb-4 border border-green-300 bg-green-100 rounded-none flex items-center space-x-2 w-full", children: [
        /* @__PURE__ */ jsx(CircleCheck, { size: 18, color: "green" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs", children: STATUS_MESSAGES.USER_APPROVED })
      ] }) }),
      isCurrentStageCompleted && allDocsData?.length === 0 && allRecords?.length === 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center mt-6", children: [
        /* @__PURE__ */ jsx(StageCompleteIcon, {}),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-4 text-sm", children: STATUS_MESSAGES.NO_FILES_COMPLETED })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(
      ApproveDialog,
      {
        icon: /* @__PURE__ */ jsx(ApproveLogo, {}),
        open: !!deleteObj,
        onOpenChange: setDeleteObj,
        title: "Delete File",
        message: "Are you sure want to delete the file",
        onCancel: onCancelDeleteFile,
        isPending: isDeleteLoading || isDeletePlaceholder,
        onConfirm: deleteObj?.category === null ? onConfirmDelete : onConfirmDeletePlaceHolder
      }
    ),
    /* @__PURE__ */ jsx(
      ApproveRejectDialog,
      {
        removeConfirm: !!dialogType,
        setRemoveConfirm: () => setDialogType(null),
        onCancel: onCancelApproveReject,
        onConfirm: onConfirmApproveReject,
        isDeleteLoading: ApproveOrRejectDocument,
        setApproveRejectReason,
        dialogType,
        appRejError,
        setAppRejError
      }
    )
  ] });
};
export {
  GetCaseFiles as G
};
