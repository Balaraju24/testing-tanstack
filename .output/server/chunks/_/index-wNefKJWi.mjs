import { jsx, jsxs } from 'react/jsx-runtime';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { D as DeleteStrokeIcon } from './delete-stroke-icon-mn8-8d5M.mjs';
import { S as SendIcon } from './send-icon-CzKPEiSG.mjs';
import { B as Button } from './router-e7zdrxGz.mjs';
import { I as Input } from './input-CcfBn-WR.mjs';
import { b as deleteSingleDocAPI } from './fileUpload-BBm5-XTb.mjs';
import { e as raiseQueryAPI, U as UpdateCategoryAPI } from './legalOpinion-qNiAW4Gj.mjs';
import { i as isSubStageCompleted, M as ManageCaseHeader } from './ManageCaseHeader-BFRej4X3.mjs';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { PenLineIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import './litigations-2Q1m8RsY.mjs';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './manage-tW0NLyej.mjs';
import 'framer-motion';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'react-error-boundary';
import './index-Bb_5490h.mjs';
import './CaseFilingIcon-Dywh8hPV.mjs';
import './legal-notice-icon-ivaufGCR.mjs';
import './notes-edit-icon-B2gT4vHe.mjs';
import '@radix-ui/react-accordion';
import './tooltip-BKF0DBvK.mjs';
import '@radix-ui/react-tooltip';
import './manage-CWSyPq63.mjs';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/utc.js';
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
import 'axios';
import '@radix-ui/react-progress';
import 'react-dropzone';
import './default-user-EV710LEP.mjs';
import './notes-delete-icon-CyozBLV8.mjs';
import './notes-head-icon-BuoOTi3l.mjs';
import './summary-icon-card-CWzIqgof.mjs';
import './avatar-xL-W5RbG.mjs';
import '@radix-ui/react-avatar';
import './sheet-vrO17VYZ.mjs';
import '@radix-ui/react-dialog';
import './skeleton-BAyQx-Zm.mjs';
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';

const RaiseQueries = ({ stage, subStage }) => {
  var _a, _b;
  const { service_id } = useParams({ strict: false });
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { isUser } = useUserDetails();
  const { getAllDocsRefetch, allDocsData, caseStagesData, allDocsIsFetching } = UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData == null ? void 0 : caseStagesData.sub_stages,
    subStage
  );
  const isClosingQueryCompleted = ((_b = (_a = caseStagesData == null ? void 0 : caseStagesData.sub_stages) == null ? void 0 : _a.find((sub) => sub.code === "QURI#MDSC")) == null ? void 0 : _b.status) === "completed";
  const { mutate: raiseQuery, isPending } = useMutation({
    mutationKey: ["Adding_lod"],
    mutationFn: async (data) => {
      const payload = {
        case_id: Number(service_id),
        category: data.category,
        is_requested: true,
        case_stage: stage,
        case_sub_stage: subStage
      };
      const response = await raiseQueryAPI(payload);
      return response == null ? void 0 : response.data;
    },
    onSuccess: (data) => {
      setNewItem("");
      setErrorMsg("");
      getAllDocsRefetch();
      toast.success(data == null ? void 0 : data.message, {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
    },
    onError: (response) => {
      var _a2, _b2, _c;
      if (response.status === 422) {
        const errorMessage = (_b2 = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.errData) == null ? void 0 : _b2.category;
        setErrorMsg(errorMessage);
      } else {
        const errorMessage = (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.message;
        setErrorMsg(errorMessage);
      }
    }
  });
  const { mutate: mutateUpdateCategory, isPending: isPendingUpdateCategory } = useMutation({
    mutationFn: async (data) => {
      const response = await UpdateCategoryAPI(categoryIds, {
        category: data.category,
        id: categoryIds[0],
        case_id: Number(service_id),
        case_stage: stage,
        case_sub_stage: subStage
      });
      return response == null ? void 0 : response.data;
    },
    onSuccess: (data) => {
      toast.success((data == null ? void 0 : data.message) || "Category updated successfully", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      setIsEditing(false);
      setEditItem("");
      setNewItem("");
      setErrorMsg("");
      setEditingItemId(null);
      getAllDocsRefetch();
    },
    onError: (response) => {
      var _a2, _b2, _c;
      if (response.status === 422) {
        const errorMessage = (_b2 = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.errData) == null ? void 0 : _b2.category;
        setErrorMsg(errorMessage);
      } else {
        const errorMessage = (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.message;
        setErrorMsg(errorMessage);
      }
    }
  });
  const { mutate: onConfirmDeleteFile, isPending: isDeleteLoading } = useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: async (docId) => {
      var _a2;
      docId = (_a2 = allDocsData == null ? void 0 : allDocsData.find((item) => item.id === docId)) == null ? void 0 : _a2.id;
      if (!docId) throw new Error("Document ID not found");
      const response = await deleteSingleDocAPI({
        docId,
        payload: {
          case_stage: stage,
          case_sub_stage: subStage
        }
      });
      if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201) {
        return response.data.data;
      }
      throw new Error("Failed to delete file");
    },
    onSuccess: (data) => {
      toast.success("File deleted successfully", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      getAllDocsRefetch();
    },
    onError: (error) => {
    }
  });
  const getCategoryIds = () => {
    return Array.isArray(allDocsData) && (allDocsData == null ? void 0 : allDocsData.filter((file) => editItem === file.category && file.is_requested).map((file) => file.id));
  };
  const categoryIds = getCategoryIds();
  const handleAddItem = () => {
    setErrorMsg("");
    if (isEditing && editingItemId) {
      mutateUpdateCategory({
        category: newItem.trim()
      });
    } else {
      raiseQuery({ category: newItem.trim() });
    }
  };
  const handleEditClick = (item) => {
    setIsEditing(true);
    setNewItem(item.category);
    setEditItem(item.category);
    setEditingItemId(item.id);
    setErrorMsg("");
  };
  const canDeleteCategory = (category, allDocsData2) => {
    return !allDocsData2.some(
      (doc) => doc.category === category && !doc.is_requested && (doc.key || doc.file_name)
    );
  };
  const handleDeleteClick = (item) => {
    setDeleteId(item.id);
    onConfirmDeleteFile(item.id);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setNewItem("");
    setEditItem("");
    setErrorMsg("");
    setEditingItemId(null);
  };
  const isAnyLoading = isPending || isPendingUpdateCategory || isDeleteLoading;
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: allDocsIsFetching ? /* @__PURE__ */ jsx("div", { className: "relative h-[calc(100%-43px)] flex items-center justify-center", children: /* @__PURE__ */ jsx(
    LoadingComponent,
    {
      loading: allDocsIsFetching,
      message: "Docs loading..."
    }
  ) }) : /* @__PURE__ */ jsxs("div", { className: "h-full justify-center items-center overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      ManageCaseHeader,
      {
        caseStage: stage,
        caseSubStage: subStage,
        showActionButton: isUser() ? false : !isEditing,
        showNoteButton: false,
        showUploadButton: false
      }
    ),
    isClosingQueryCompleted && (allDocsData == null ? void 0 : allDocsData.length) === 0 && /* @__PURE__ */ jsx("div", { className: "h-[calc(100%-100px)] flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "text-center text-base text-gray-500 flex items-center justify-center", children: "This stage is already completed. No queries were raised." }) }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          handleAddItem();
        },
        children: [
          !isClosingQueryCompleted && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 p-2 rounded-none", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                className: "flex-1 border h-9 rounded-none border-gray-200 bg-gray-100 text-sm 3xl:text-base font-normal focus:!outline-none outline-none",
                placeholder: isEditing ? "Edit query" : "Enter query",
                value: newItem ? newItem.charAt(0).toUpperCase() + newItem.slice(1) : "",
                onChange: (e) => {
                  setNewItem(e.target.value);
                  if (errorMsg) setErrorMsg("");
                },
                disabled: isAnyLoading
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "submit",
                  size: "sm",
                  className: `bg-black hover:bg-black h-9 cursor-pointer text-white text-xs 3xl:text-sm rounded-none font-normal ${isAnyLoading ? "opacity-50 cursor-not-allowed" : ""}`,
                  disabled: isAnyLoading,
                  children: [
                    /* @__PURE__ */ jsx(SendIcon, { className: "w-4 h-4" }),
                    isEditing ? "Update" : "Request"
                  ]
                }
              ),
              isEditing && /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: `cursor-pointer text-white text-xs 3xl:text-sm rounded-none ${isAnyLoading ? "bg-gray-500 hover:bg-gray-500 opacity-50 cursor-not-allowed" : "bg-black hover:bg-black"}`,
                  onClick: handleCancel,
                  disabled: isAnyLoading,
                  children: "Cancel"
                }
              )
            ] })
          ] }),
          errorMsg && /* @__PURE__ */ jsx("div", { className: "px-2 pb-2", children: /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errorMsg }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `p-2 space-y-2 ${!isCurrentStageCompleted ? "overflow-y-auto h-[calc(100vh-100px)] " : " overflow-y-auto h-[calc(100vh-250px)]"}`,
        children: Array.isArray(allDocsData) && (allDocsData == null ? void 0 : allDocsData.map((item) => {
          const isCurrentlyEditing = editingItemId === item.id;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `flex flex-cols w-full border p-2 gap-4 ${"border-gray-200"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm flex-1 self-center", children: item == null ? void 0 : item.category }),
                /* @__PURE__ */ jsx("div", { className: "text-xs bg-gray-200 font-normal p-1 flex  self-center", children: dayjs(item == null ? void 0 : item.created_at).format("DD MMM YYYY") }),
                !isClosingQueryCompleted && /* @__PURE__ */ jsx(
                  Button,
                  {
                    onClick: () => !isAnyLoading && handleEditClick(item),
                    className: `!p-0 !m-0  ${isAnyLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-blue-600"} transition-colors`,
                    title: "Edit this query",
                    disabled: isCurrentlyEditing,
                    children: /* @__PURE__ */ jsx(PenLineIcon, { className: "w-4 h-4" })
                  }
                ),
                !isClosingQueryCompleted && /* @__PURE__ */ jsx(
                  Button,
                  {
                    onClick: () => {
                      if (!isAnyLoading) {
                        const canDelete = canDeleteCategory(
                          item.category,
                          allDocsData
                        );
                        if (canDelete) {
                          handleDeleteClick(item);
                        } else {
                          toast.error(
                            "Files exist in this category, cannot delete."
                          );
                        }
                      }
                    },
                    title: "Delete this query",
                    disabled: isCurrentlyEditing,
                    className: ` !p-0 !m-0 ${isAnyLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-red-600"} transition-colors`,
                    children: deleteId === item.id ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsx(DeleteStrokeIcon, {})
                  }
                )
              ]
            },
            item == null ? void 0 : item.id
          );
        }))
      }
    )
  ] }) });
};

export { RaiseQueries as default };
//# sourceMappingURL=index-wNefKJWi.mjs.map
