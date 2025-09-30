import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useCaseCompletion } from "./index-Bb_5490h.js";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { A as ApproveDialog } from "./complete-logo-DwVwh2_J.js";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { F as FileDownload, A as ApproveLogo } from "./approve-logo-BtPutrSX.js";
import { A as ApprovedIcon } from "./approved-Icon-D4Mj_64A.js";
import { V as ViewIcon } from "./view-icon-BDRfyII2.js";
import { B as Button } from "./router-e7zdrxGz.js";
import { C as Card, a as CardHeader, b as CardContent, c as CardFooter } from "./card-CfZVGcIr.js";
import { C as Checkbox } from "./checkbox-DwAU5kG6.js";
import { D as Dialog, d as DialogTrigger, a as DialogContent, e as DialogClose } from "./dialog-CbaK730S.js";
import { S as Separator } from "./separator-BzkEE94Y.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-BKF0DBvK.js";
import { l as addCaseBriefNotesAPI, m as draftingConsentAPI } from "./manage-tW0NLyej.js";
import { a as labelSubStages } from "./statusConstants-t7T05Rlh.js";
import { M as ManageCaseHeader, a as fileSizeInMB } from "./ManageCaseHeader-BFRej4X3.js";
import { c as getSubStageStatuses, s as sliceFilename, f as formatDateWithTime } from "./manage-CWSyPq63.js";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { D as DocsCommentsSection } from "./DocsCommentsSection-1v4F6eR1.js";
import { G as GetCaseNotes } from "./GetCaseNotes-DSbNb1Jm.js";
import { P as PendingStepOverlay } from "./PendingStepOverlay-BxgRCvn6.js";
import { U as UserFileIcon } from "./userFileIcon-XAkFxF_N.js";
import "./CaseFilingIcon-Dywh8hPV.js";
import "./legal-notice-icon-ivaufGCR.js";
import "framer-motion";
import "./notes-edit-icon-B2gT4vHe.js";
import "@radix-ui/react-accordion";
import "./useUserPermissions-IrViIWLA.js";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "./pending-icon-C39HKFOC.js";
import "./current-icon-PhyH9fHB.js";
import "./litigations-2Q1m8RsY.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-BfKn0GZN.js";
import "@radix-ui/react-tooltip";
import "./fileUpload-BBm5-XTb.js";
import "./apiHelpers-QKbVsPE7.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "react-error-boundary";
import "@radix-ui/react-checkbox";
import "@radix-ui/react-dialog";
import "@radix-ui/react-separator";
import "vaul";
import "./notification-kzFgGftV.js";
import "./service-1g9dZr4o.js";
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
import "./skeleton-BAyQx-Zm.js";
import "dayjs";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/utc.js";
import "./pdf.worker-CIugw0DL.js";
import "pdfjs-dist";
const DraftReview = ({
  stage,
  subStage,
  mappedCaseStagesData
}) => {
  const { service_id } = useParams({ strict: false });
  const [docsApprove, setDocsApprove] = useState(false);
  const [isConsentProvided, setIsConsentProvided] = useState(false);
  const [subStages, setSubStages] = useState("");
  const [remarks, setRemarks] = useState("");
  const [openRemarkDialog, setOpenRemarkDialog] = useState(false);
  const {
    allDocsIsFetching,
    allDocsData,
    allRecords,
    getAllDocsRefetch,
    getCaseStagesRefetch
  } = UseContextAPI();
  const { completeSubStage } = useCaseCompletion();
  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData
  });
  const prevSubStage = labelSubStages[subStageLabel];
  const { mutate: mutateAddCaseBreifNotes, isPending: isPendingAddCaseBrief } = useMutation({
    mutationFn: async (payload) => {
      const response = await addCaseBriefNotesAPI(payload);
      if (response?.status === 200 || response?.status === 201) {
        return response?.data;
      }
    },
    onSuccess: () => {
    },
    onError: (error) => {
      if (error.status == 422) ;
    }
  });
  const handleConsentChange = (isChecked) => {
    const trimmedRemarks = remarks?.trim();
    if (trimmedRemarks && trimmedRemarks.length < 2) {
      toast.error("Remarks must be at least 2 characters long.");
      return;
    }
    if (trimmedRemarks && trimmedRemarks.length >= 2) {
      const remarksArray = [
        {
          title: "DRAFT REMARKS",
          note: trimmedRemarks,
          type: "CASE_DRAFT_REMARKS",
          case_id: Number(service_id),
          case_sub_stage: subStage,
          case_stage: stage
        }
      ];
      mutateAddCaseBreifNotes(remarksArray);
    }
    const payload = {
      case_stage: "CSFG",
      case_sub_stage: subStages || "CSFG#DAPT",
      is_consent_provided: isChecked
    };
    mutateDraftingConsent({ case_id: String(service_id), payload });
    setIsConsentProvided(isChecked);
  };
  const { mutate: mutateDraftingConsent, isPending } = useMutation({
    mutationKey: ["drafting-consent", service_id],
    mutationFn: async ({
      case_id,
      payload
    }) => {
      const response = await draftingConsentAPI({ case_id, payload });
      return response?.data;
    },
    onSuccess: async (data) => {
      await getCaseStagesRefetch();
      completeSubStage(subStage);
      getAllDocsRefetch();
      toast.success(data?.message);
    }
  });
  useEffect(() => {
    if (allDocsIsFetching || !Array.isArray(allDocsData) || allDocsData.length === 0) {
      setDocsApprove(false);
      setIsConsentProvided(false);
      setSubStages("");
      return;
    }
    const approvedFile = allDocsData.find(
      (file) => file.verification_status === "APPROVED"
    );
    if (approvedFile) {
      setSubStages(approvedFile.case_sub_stage);
    }
    setIsConsentProvided(
      allDocsData.every((record) => record?.is_consent_provided === true)
    );
    setDocsApprove(
      allDocsData.some(
        (record) => record?.verification_status === "APPROVED"
      )
    );
  }, [allDocsData, allDocsIsFetching]);
  return /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
    isPrevSubStageCompleted ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "px-1 h-full ", children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
        ManageCaseHeader,
        {
          caseStage: stage,
          caseSubStage: subStage,
          showNoteButton: false,
          showUploadButton: false
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-auto relative p-2 h-[calc(100%-50px)] w-full", children: allDocsIsFetching ? /* @__PURE__ */ jsx(
        LoadingComponent,
        {
          loading: allDocsIsFetching,
          message: "Files..."
        }
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-full ${allRecords?.length === 0 ? "h-[calc(100%-20px)]" : ""} `,
            children: /* @__PURE__ */ jsx("div", { className: "h-full w-full", children: !Array.isArray(allDocsData) || allDocsData.length === 0 || allDocsData.every((file) => !file.download_url) && !allDocsIsFetching ? /* @__PURE__ */ jsx("div", { className: "col-span-full text-center text-lg h-full  flex items-center justify-center", children: "Draft document will upload by your Advocate" }) : /* @__PURE__ */ jsx("div", { className: "gap-4 h-full overflow-y-auto", children: allDocsData?.filter(
              (file) => file.verification_status === "APPROVED"
            ).length > 0 ? allDocsData?.map((file) => {
              if (file.verification_status !== "APPROVED")
                return null;
              const cardHeaderStyle = file.file_type === "application/pdf" || file.file_type === "pdf" ? "bg-[#F3F3F3]" : "bg-gray-100";
              return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "py-1", children: file?.category }),
                /* @__PURE__ */ jsxs(Card, { className: "w-56 rounded-none overflow-hidden border border-gray-200", children: [
                  /* @__PURE__ */ jsxs(Dialog, { children: [
                    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsxs(
                      CardHeader,
                      {
                        className: `${cardHeaderStyle} relative flex items-center p-0 space-y-0 justify-center min-h-28 w-full`,
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "text-green-600 absolute top-3 right-3", children: file.verification_status === "APPROVED" && /* @__PURE__ */ jsx(ApprovedIcon, {}) }),
                          /* @__PURE__ */ jsx(
                            Button,
                            {
                              className: "flex items-center justify-center w-full p-0 border-none bg-transparent [&_svg]:size-12",
                              "aria-label": "View Image",
                              children: /* @__PURE__ */ jsx(
                                UserFileIcon,
                                {
                                  fileType: file.file_type,
                                  downloadUrl: file.download_url,
                                  fileName: file.file_name
                                }
                              )
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxs(
                      DialogContent,
                      {
                        className: "w-[90%] p-2 gap-0 bg-white",
                        "aria-describedby": void 0,
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
                            /* @__PURE__ */ jsx("div", { className: "text-sm", children: file.file_name }),
                            /* @__PURE__ */ jsx(DialogClose, { className: "hover:bg-gray-100 cursor-pointer", children: /* @__PURE__ */ jsx(X, {}) })
                          ] }),
                          /* @__PURE__ */ jsx("hr", { className: "mt-2 mb-0 border-t-[0.5px] border-gray-200 shadow-none" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                            /* @__PURE__ */ jsxs("div", { className: "w-3/5 border-r border-gray-200 px-2 py-2 flex flex-col", children: [
                              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end w-full mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                                /* @__PURE__ */ jsx(
                                  "p",
                                  {
                                    className: file.verification_status === "REJECTED" ? " bg-red-500 hover:bg-red-500 text-xs px-4 py-2 text-white rounded-none font-primary" : file.verification_status === "APPROVED" ? " bg-green-500 hover:bg-green-500 text-xs px-2 py-1 text-white rounded-none font-primary" : file.verification_status === "PENDING" ? " bg-orange-500 hover:bg-orange-500 text-xs px-4 py-1 text-white rounded-none font-primary" : " bg-black hover:bg-black text-xs px-4 py-1 text-white rounded-none font-primary",
                                    children: file.verification_status ? file.verification_status.charAt(0).toUpperCase() + file.verification_status.slice(1).toLowerCase() : ""
                                  }
                                ),
                                /* @__PURE__ */ jsx(
                                  FileDownload,
                                  {
                                    file: {
                                      key: file.key,
                                      file_name: file.file_name
                                    }
                                  }
                                )
                              ] }) }),
                              /* @__PURE__ */ jsx("div", { className: "flex", children: [
                                "image",
                                "jpg",
                                "image/jpeg",
                                "image/png",
                                "gif",
                                "svg",
                                "webp"
                              ].includes(file.file_type) ? /* @__PURE__ */ jsx(
                                "img",
                                {
                                  src: file.download_url,
                                  alt: "Full Image",
                                  className: "w-full h-[70vh] object-contain rounded-lg"
                                }
                              ) : /* @__PURE__ */ jsx(
                                "iframe",
                                {
                                  src: file.download_url,
                                  title: "Full Image",
                                  className: "w-full h-[70vh] object-contain rounded-lg"
                                }
                              ) })
                            ] }),
                            /* @__PURE__ */ jsx("div", { className: "w-2/5 flex flex-col", children: /* @__PURE__ */ jsx(
                              DocsCommentsSection,
                              {
                                documentId: file.id
                              }
                            ) })
                          ] })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col px-2 py-2", children: [
                    /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("div", { className: "font-medium text-start text-xs", children: file?.file_name ? sliceFilename(
                        file?.file_name,
                        25
                      ) : null }) }),
                      /* @__PURE__ */ jsx(TooltipContent, { className: "bg-white border border-gray-200 p-1 ml-10 w-3/4", children: file?.file_name })
                    ] }) }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs font-light" })
                  ] }),
                  /* @__PURE__ */ jsxs(CardFooter, { className: "w-full p-2 text-left flex justify-between items-center y", children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-gray-500 hover:text-gray-700 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[11px]", children: file.updated_at ? /* @__PURE__ */ jsx(Fragment, { children: formatDateWithTime(
                        file.updated_at
                      ) }) : /* @__PURE__ */ jsx(Fragment, { children: formatDateWithTime(
                        file.created_at
                      ) }) }),
                      file.key ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(
                          Separator,
                          {
                            orientation: "vertical",
                            className: "h-3 bg-gray-500"
                          }
                        ),
                        /* @__PURE__ */ jsxs("span", { className: "text-[11px]", children: [
                          fileSizeInMB(file.file_size),
                          "MB"
                        ] })
                      ] }) : ""
                    ] }),
                    file.key ? /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: file.download_url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: /* @__PURE__ */ jsx(ViewIcon, { className: "w-4 h-4" })
                      }
                    ) : null
                  ] })
                ] }),
                docsApprove && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                    isConsentProvided && !isPending && /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        className: "gap-2 cursor-not-allowed",
                        id: `consent-checkbox-${file.id}`,
                        checked: isConsentProvided
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "label",
                      {
                        htmlFor: `consent-checkbox-${file.id}`,
                        className: "text-sm text-gray-700",
                        children: isConsentProvided ? "Consent received. The petition will be filed accordingly" : "Provide your consent to proceed with filing the petition."
                      }
                    )
                  ] }),
                  !isConsentProvided && !isPending && /* @__PURE__ */ jsxs(
                    Button,
                    {
                      onClick: () => setOpenRemarkDialog(
                        !isConsentProvided
                      ),
                      className: `flex items-center font-normal cursor-pointer text-sm w-20 p-2 justify-center gap-2 ${blur} active:scale-95 ease-in-out transition-all duration-300 text-white h-6 rounded-none ${file.is_consent_provided ? "bg-green-700 pointer-events-none" : "bg-black hover:bg-black/80"}`,
                      children: [
                        file.is_consent_provided ? "Accepted" : "Accept",
                        file.is_consent_provided && /* @__PURE__ */ jsx(ApprovedIcon, {})
                      ]
                    }
                  ),
                  isPending && /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" })
                ] })
              ] }, file?.id);
            }) : /* @__PURE__ */ jsx("div", { className: "col-span-full text-center text-lg h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full h-[calc(100%-70px)]", children: "Draft document will upload by your Advocate" }) }) }) })
          }
        ),
        /* @__PURE__ */ jsx(GetCaseNotes, {})
      ] }) })
    ] }) }) : /* @__PURE__ */ jsx(PendingStepOverlay, { title: prevSubStage }),
    /* @__PURE__ */ jsx(
      ApproveDialog,
      {
        icon: /* @__PURE__ */ jsx(ApproveLogo, {}),
        open: openRemarkDialog,
        onOpenChange: setOpenRemarkDialog,
        remarks,
        setRemarks,
        title: "Accept Draft Review",
        message: "Please review the draft and confirm to proceed. If you have any remarks enter below.",
        onCancel: () => {
          setOpenRemarkDialog(false), setRemarks("");
        },
        isPending: isPendingAddCaseBrief,
        onConfirm: () => handleConsentChange(true),
        requireRemarks: true,
        disabled: isPendingAddCaseBrief || isPending
      }
    )
  ] });
};
export {
  DraftReview as default
};
