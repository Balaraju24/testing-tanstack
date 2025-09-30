import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { D as DocsCommentsSection } from "./DocsCommentsSection-1v4F6eR1.js";
import { F as FileActions, U as UploadFileIcon } from "./upload-file-icon-D1lM9Y8S.js";
import { F as FileDownload, A as ApproveLogo } from "./approve-logo-BtPutrSX.js";
import { F as FileUpload, A as ApproveRejectDialog } from "./ApproveRejectDialog-CbjX-vD1.js";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { A as ApproveDialog } from "./complete-logo-DwVwh2_J.js";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { A as ApprovedIcon } from "./approved-Icon-D4Mj_64A.js";
import { E as EditIcon } from "./edit-icon-DqCvL3Yg.js";
import { R as RejectIcon } from "./reject-icon-B4PaiBZt.js";
import { B as Button } from "./router-e7zdrxGz.js";
import { C as Card, a as CardHeader, b as CardContent, c as CardFooter } from "./card-CfZVGcIr.js";
import { D as Dialog, d as DialogTrigger, a as DialogContent, c as DialogTitle, e as DialogClose } from "./dialog-CbaK730S.js";
import { S as Separator } from "./separator-BzkEE94Y.js";
import { b as deleteSingleDocAPI, c as deleteDocPlaceHolderAPI, e as documentApprovalAPI } from "./fileUpload-BBm5-XTb.js";
import { f as getAllManageDocsAPI } from "./manage-tW0NLyej.js";
import { i as isSubStageCompleted, g as getSubStageTitle, a as fileSizeInMB } from "./ManageCaseHeader-BFRej4X3.js";
import { s as sliceFilename, f as formatDateWithTime } from "./manage-CWSyPq63.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { U as UserFileIcon } from "./userFileIcon-XAkFxF_N.js";
const UserGetCaseFiles = () => {
  const params = useParams({ strict: false });
  const search = useSearch({ strict: false });
  const [deleteObj, setDeleteObj] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [dialogType, setDialogType] = useState(null);
  const [approveRejectReason, setApproveRejectReason] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [appRejError, setAppRejError] = useState("");
  const { caseStagesData, allRecords } = UseContextAPI();
  const stage = search.stage;
  const subStages = search.sub_stage;
  const onCancelDeleteFile = () => setDeleteObj(null);
  const onCancelApproveReject = () => setDialogType(null);
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStages
  );
  const subStageTitle = getSubStageTitle(caseStagesData?.sub_stages, subStages);
  const isStageIncomplete = !isCurrentStageCompleted;
  const showplaceHolder = (subStages === "CSFG#SGCP" || subStages === "CSFG#UDOC") && isStageIncomplete;
  const {
    isFetching,
    isLoading,
    data: filesDetails,
    refetch: getCaseFilesFetcher
  } = useQuery({
    queryKey: ["user-file-details", params?.service_id, stage, subStages],
    queryFn: async ({ signal }) => {
      try {
        let queryParams = {};
        if (subStages === "ONBD#VKAC" || subStages === "CSFG#SGCP" || subStages === "CSFG#UDOC") {
          queryParams = {
            case_stage: subStages.split("#")[0],
            case_sub_stages: encodeURIComponent(subStages)
          };
        } else {
          queryParams = {
            case_stage: stage,
            case_sub_stage: subStages && encodeURIComponent(subStages),
            verification_status: "APPROVED"
          };
        }
        const response = await getAllManageDocsAPI(
          params?.service_id,
          queryParams,
          { signal }
        );
        if (response.status === 200 || response.status === 201) {
          const data = response.data?.data?.records;
          setLoading2(false);
          return data;
        } else {
          throw new Error("Failed to fetch documents");
        }
      } catch (err) {
        const error = err;
        if (error.name === "AbortError") return void 0;
        throw new Error("Failed to fetch case data");
      }
    },
    enabled: !!params?.service_id,
    refetchOnWindowFocus: false
  });
  const { mutate: onConfirmDeleteFile, isPending: isDeleteLoading } = useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: async (docId) => {
      docId = filesDetails?.find((item) => item.id === docId)?.id;
      const response = await deleteSingleDocAPI({
        docId,
        payload: {
          reason: deleteReason,
          case_stage: stage,
          case_sub_stage: subStages
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
      toast.success(data?.message);
      setDeleteObj(null);
      getCaseFilesFetcher();
    },
    onError: (error) => {
      getCaseFilesFetcher();
    }
  });
  const { mutate: onConfirmDeletePlaceholder, isPending: isDeletePlaceholder } = useMutation({
    mutationKey: ["deletePlaceholder"],
    mutationFn: async (docId) => {
      docId = filesDetails?.find((item) => item.id === docId)?.id;
      const response = await deleteDocPlaceHolderAPI({
        docId,
        payload: {
          reason: deleteReason
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
      toast.success(data?.message);
      setDeleteObj(null);
      getCaseFilesFetcher();
      setDeleteReason("");
    },
    onError: (error) => {
      getCaseFilesFetcher();
    }
  });
  const {
    mutate: mutateApproveorRejectDocument,
    isPending: ApproveOrRejectDocument
  } = useMutation({
    mutationKey: ["approve_reject_document"],
    mutationFn: async ({
      docId,
      verification_status,
      notes
    }) => {
      docId = filesDetails?.find((item) => item.id === docId)?.id;
      let payload = {
        verification_status,
        case_stage: stage,
        case_sub_stage: subStages,
        notes: void 0
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
    onSuccess: (data) => {
      getCaseFilesFetcher();
      toast.success(data?.data?.message);
      setDialogType(null);
    },
    onError: (error) => {
      setAppRejError(error?.data?.errData?.notes[0]);
    }
  });
  const rejAppDialog = (params2) => {
    setDialogType({
      docId: params2.docId,
      verification_status: params2.verification_status
    });
  };
  const onConfirmDelete = () => {
    if (isDeleteLoading) return;
    onConfirmDeleteFile(deleteObj?.id || "");
  };
  const onDeleteFile = (contactTypeObj) => {
    setDeleteObj(contactTypeObj);
  };
  const onDeletePlaceHolder = (contactTypeObj) => {
    setDeleteObj(contactTypeObj);
  };
  const onConfirmDeletePlaceHolder = () => {
    if (isDeleteLoading) return;
    onConfirmDeletePlaceholder(deleteObj?.id || "");
  };
  const onConfirmApproveReject = () => {
    if (dialogType) {
      mutateApproveorRejectDocument({
        ...dialogType,
        notes: dialogType.notes ?? ""
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${allRecords?.length === 0 && filesDetails?.length === 0 && (![
        "CSFG#SGCP",
        "CSFG#UDOC",
        "CSCR#JUGC",
        "CTPG#PYSC",
        "CSCR#ORDC",
        "ONBD#STFE"
      ].includes(subStages) || ["CSFG#SGCP", "CSFG#UDOC"].includes(subStages) && isCurrentStageCompleted) ? "h-[calc(100%-20px)]" : ""}`,
      children: [
        isFetching ? /* @__PURE__ */ jsx(
          LoadingComponent,
          {
            loading: isFetching,
            message: "Files...",
            className: "bg-white"
          }
        ) : !filesDetails || filesDetails?.length === 0 && allRecords?.length === 0 && ![
          "CSFG#SGCP",
          "CSFG#UDOC",
          "CSCR#JUGC",
          "CTPG#PYSC",
          "CSCR#ORDC",
          "ONBD#STFE"
        ].includes(subStages) || ["CSFG#SGCP", "CSFG#UDOC"].includes(subStages) && isCurrentStageCompleted && filesDetails?.length === 0 && allRecords?.length === 0 ? /* @__PURE__ */ jsx("div", { className: "col-span-full text-center text-base text-gray-600 3xl:text-base h-full flex items-center justify-center", children: isCurrentStageCompleted ? `This stage is successfully completed. As the ${subStageTitle} document is optional, it may not be uploaded by your Advocate.` : `${subStageTitle} document will be uploaded by your Advocate.` }) : /* @__PURE__ */ jsx("div", { className: "w-full", children: !filesDetails && !isLoading ? null : /* @__PURE__ */ jsxs(
          "div",
          {
            className: `grid grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-2`,
            children: [
              Array.isArray(filesDetails) && filesDetails.map((file) => {
                const cardHeaderStyle = file.file_type === "application/pdf" || file.file_type === "pdf" ? "bg-[#F3F3F3]" : "bg-gray-100";
                return /* @__PURE__ */ jsxs("div", { className: "w-fit ", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: file.category ? file.category : "" }),
                  file.download_url && /* @__PURE__ */ jsxs(Card, { className: "w-56 rounded-none overflow-hidden border shadow-none border-gray-300", children: [
                    /* @__PURE__ */ jsxs(Dialog, { children: [
                      /* @__PURE__ */ jsx(DialogTrigger, { className: "w-full", children: /* @__PURE__ */ jsxs(
                        CardHeader,
                        {
                          className: `${cardHeaderStyle} relative flex items-center p-0 space-y-0 justify-center min-h-28 w-full`,
                          children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-green-500 absolute top-3 right-3", children: [
                              file?.verification_status === "APPROVED" && /* @__PURE__ */ jsx(ApprovedIcon, {}),
                              file?.verification_status === "REJECTED" && /* @__PURE__ */ jsx(RejectIcon, {})
                            ] }),
                            /* @__PURE__ */ jsx(
                              Button,
                              {
                                className: "flex items-center  cursor-pointer justify-center py-0 px-0 overflow-hidden w-full h-fit rounded-none border-none bg-transparent [&_svg]:size-14",
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
                      /* @__PURE__ */ jsxs(DialogContent, { className: "w-[90%] !p-1 gap-0 bg-white", children: [
                        /* @__PURE__ */ jsx(DialogTitle, {}),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
                          /* @__PURE__ */ jsx("div", { className: "text-sm", children: file.file_name }),
                          /* @__PURE__ */ jsx(DialogClose, { className: "border-0 mt-0 h-fit p-1 [&_svg]:size-6  cursor-pointer", children: /* @__PURE__ */ jsx(X, { className: "stroke-red-500" }) })
                        ] }),
                        /* @__PURE__ */ jsx("hr", { className: "mb-0 border-1 border-gray-300" }),
                        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                          /* @__PURE__ */ jsxs("div", { className: "w-3/5 px-2 py-2 border-r border-gray-300 flex flex-col", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end w-full gap-2", children: [
                              file.category !== "Final Document" && /* @__PURE__ */ jsx(
                                "p",
                                {
                                  className: file.verification_status === "REJECTED" ? "bg-red-500 flex items-center  cursor-pointer hover:bg-red-500 text-xs px-4 py-2 text-white rounded-none font-primary" : file.verification_status === "APPROVED" ? "bg-green-500 h-7 hover:bg-green-500  cursor-pointer text-white-500 text-xs px-4 text-center py-1.5 text-white rounded-none font-primary" : file.verification_status === "PENDING" ? "bg-orange-500 h-7 hover:bg-orange-500  cursor-pointer text-white-500 text-xs px-4 py-1 text-white rounded-none font-primary" : "bg-black h-7 hover:bg-black text-white-500  cursor-pointer text-xs px-4 py-1 text-white rounded-none font-primary",
                                  children: file.verification_status ? file.verification_status.charAt(0).toUpperCase() + file.verification_status.slice(1).toLowerCase() : ""
                                }
                              ),
                              file.category !== "Final Document" && /* @__PURE__ */ jsx("div", { className: "w-[0.5px] h-9 bg-gray-300" }),
                              /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
                                FileDownload,
                                {
                                  file: {
                                    key: file.key,
                                    file_name: file.file_name
                                  }
                                }
                              ) })
                            ] }),
                            /* @__PURE__ */ jsx("div", { className: "flex", children: [
                              "image",
                              "jpg",
                              "jpeg",
                              "image/jpeg",
                              "image/png",
                              "gif",
                              "svg",
                              "png",
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
                          /* @__PURE__ */ jsx("div", { className: "w-2/5 h-full flex flex-col space-y-3", children: /* @__PURE__ */ jsx(DocsCommentsSection, { documentId: file.id }) })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col px-2 py-1", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "font-medium text-start text-xs cursor-pointer truncate w-full",
                          title: file?.file_name,
                          children: file?.file_name ? sliceFilename(file?.file_name, 25) : null
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "text-xs font-light" })
                    ] }),
                    /* @__PURE__ */ jsxs(CardFooter, { className: "w-full p-1.5 text-left flex justify-between items-center mt-0", children: [
                      /* @__PURE__ */ jsxs("div", { className: "text-gray-500 text-[10px] smd:text-[11px] 4xl:text-xs flex items-center gap-2", children: [
                        formatDateWithTime(
                          file?.updated_at || file?.created_at
                        ),
                        file.key && /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx(
                            Separator,
                            {
                              orientation: "vertical",
                              className: "h-3 bg-gray-500"
                            }
                          ),
                          fileSizeInMB(file.file_size),
                          "MB"
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
                  /* @__PURE__ */ jsx("div", { className: "", children: file.category === "Client Document" && file.verification_status === "REJECTED" && !isCurrentStageCompleted && /* @__PURE__ */ jsx(
                    FileUpload,
                    {
                      refetch: getCaseFilesFetcher,
                      documentId: file.id,
                      loading2,
                      setLoading2,
                      category: "Client Document",
                      children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 text-xs items-center mt-1 sm:mt-0 [&_svg]:size-4", children: [
                        /* @__PURE__ */ jsx(EditIcon, { className: "" }),
                        "Replace the Document"
                      ] })
                    }
                  ) })
                ] }, file.id);
              }),
              showplaceHolder && /* @__PURE__ */ jsx("div", { className: "w-fit rounded-none overflow-hidden space-y-1 h-fit", children: /* @__PURE__ */ jsx(
                FileUpload,
                {
                  refetch: getCaseFilesFetcher,
                  setLoading2,
                  loading2,
                  children: /* @__PURE__ */ jsxs("div", { className: "py-10  w-full border border-dashed bg-slate-100 border-gray-400 px-4 flex flex-col gap-2.5 items-center justify-center", children: [
                    /* @__PURE__ */ jsx(UploadFileIcon, {}),
                    /* @__PURE__ */ jsx("div", { className: "text-xs", children: "Drop Files here or Click to upload" }),
                    /* @__PURE__ */ jsx("div", { className: "text-[10px]", children: "Maximum file size:50MB" })
                  ] })
                }
              ) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs(Fragment, { children: [
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
        ] })
      ]
    }
  );
};
export {
  UserGetCaseFiles as U
};
