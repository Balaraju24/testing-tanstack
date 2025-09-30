import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { A as ApproveDialog, C as CompleteLogo } from "./complete-logo-BunEj7SL.js";
import { L as LoadingComponent } from "./Loading-CtQhAIXf.js";
import { A as ApprovedIcon } from "./approved-Icon-D4Mj_64A.js";
import { C as CurrentIcon } from "./current-icon-PhyH9fHB.js";
import { E as EditIcon } from "./edit-icon-DqCvL3Yg.js";
import { N as NotesDeleteIcon } from "./notes-delete-icon-CyozBLV8.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { I as Input } from "./input-G3xZAzeG.js";
import { b as getCaseStagesAPI } from "./litigations-2Q1m8RsY.js";
import { b as addSubStage, e as editSubStage, d as deleteSubStage, r as reorderSubStage } from "./manage-tW0NLyej.js";
import { l as labelStage } from "./statusConstants-t7T05Rlh.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Sortable from "react-sortablejs";
import { toast } from "sonner";
import "lucide-react";
import "./notes-close-icon-FqM48RJz.js";
import "@radix-ui/react-alert-dialog";
import "./textarea-Bgbbi7bt.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "js-cookie";
import "react-error-boundary";
import "./fetch-Cpm1bFFM.js";
const BackArrow = ({ className }) => {
  return /* @__PURE__ */ jsx("svg", { className, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.21934 12.2984C3.07889 12.1578 3 11.9672 3 11.7684C3 11.5697 3.07889 11.379 3.21934 11.2384L9.21934 5.2384C9.288 5.16471 9.3708 5.10561 9.4628 5.06462C9.5548 5.02363 9.65412 5.00159 9.75482 4.99981C9.85552 4.99803 9.95555 5.01656 10.0489 5.05428C10.1423 5.092 10.2272 5.14814 10.2984 5.21936C10.3696 5.29058 10.4257 5.37542 10.4635 5.4688C10.5012 5.56219 10.5197 5.66222 10.5179 5.76292C10.5162 5.86363 10.4941 5.96294 10.4531 6.05494C10.4121 6.14694 10.353 6.22974 10.2793 6.2984L5.55934 11.0184H19.7493C19.9483 11.0184 20.139 11.0974 20.2797 11.2381C20.4203 11.3787 20.4993 11.5695 20.4993 11.7684C20.4993 11.9673 20.4203 12.1581 20.2797 12.2987C20.139 12.4394 19.9483 12.5184 19.7493 12.5184H5.55934L10.2793 17.2384C10.353 17.3071 10.4121 17.3899 10.4531 17.4819C10.4941 17.5739 10.5162 17.6732 10.5179 17.7739C10.5197 17.8746 10.5012 17.9746 10.4635 18.068C10.4257 18.1614 10.3696 18.2462 10.2984 18.3174C10.2272 18.3887 10.1423 18.4448 10.0489 18.4825C9.95555 18.5202 9.85552 18.5388 9.75482 18.537C9.65412 18.5352 9.5548 18.5132 9.4628 18.4722C9.3708 18.4312 9.288 18.3721 9.21934 18.2984L3.21934 12.2984Z", fill: "black" }) });
};
function AddSubStageComponent() {
  const navigate = useNavigate({});
  const search = useSearch({ strict: false });
  const [newStep, setNewStep] = useState("");
  const [subStageError, setSubStageError] = useState("");
  const [subStagesList, setSubStagesList] = useState([]);
  const [originalSubStages, setOriginalSubStages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingCode, setDeletingCode] = useState(null);
  const [openDeleteSubStageDialog, setOpenDeleteSubStageDialog] = useState(false);
  const { ReactSortable } = Sortable;
  function getSubStagesForStage(subStages, stageCode) {
    return subStages.filter((item) => item.code.split("#")[0] === stageCode).sort((a, b) => a.order - b.order);
  }
  const {
    isLoading: caseStagesIsLoading,
    data: caseStagesData,
    isError,
    refetch: getCaseStagesRefetch
  } = useQuery({
    queryKey: ["caseStages", search?.case_id],
    queryFn: async () => {
      const payload = {
        case_id: search?.case_id
      };
      const response = await getCaseStagesAPI(payload);
      if (response.status === 200 || response.status === 201) {
        return response?.data?.data;
      }
      throw new Error("Failed to fetch case stages");
    },
    enabled: !!search?.case_id,
    refetchOnWindowFocus: false
  });
  useEffect(() => {
    if (caseStagesData?.sub_stages) {
      const filteredSubStages = getSubStagesForStage(
        caseStagesData.sub_stages,
        search?.stage
      );
      const mappedSubStages = filteredSubStages.map(
        (item, index) => ({
          id: item.code || `substage-${index}`,
          code: item.code,
          order: item.order || index + 1,
          title: item.title,
          status: item.status || "pending"
        })
      );
      setSubStagesList(mappedSubStages);
      setOriginalSubStages(mappedSubStages);
    } else {
      setSubStagesList([]);
      setOriginalSubStages([]);
    }
  }, [caseStagesData, search?.stage]);
  const { mutate: mutateAddSubStage, isPending: AddingSubStage } = useMutation({
    mutationFn: async (payload) => {
      const response = await addSubStage(Number(search?.case_id), payload);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
      setNewStep("");
      setSubStageError("");
      getCaseStagesRefetch();
    },
    onError: (error) => {
      const errorMessage = error?.data?.errData?.sub_stage_title[0] || error?.message;
      setSubStageError(errorMessage);
    }
  });
  const { mutate: mutateEditSubStage, isPending: EditSubstage } = useMutation({
    mutationFn: async (payload) => {
      const response = await editSubStage(Number(search?.case_id), payload);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
      setNewStep("");
      setSubStageError("");
      getCaseStagesRefetch();
      setEditingIndex(null);
    },
    onError: (error) => {
      const errorMessage = error?.data?.errData?.sub_stage_title[0] || error?.message;
      setSubStageError(errorMessage);
    }
  });
  const { mutate: mutateDeleteSubStage, isPending: DeletingSubstage } = useMutation({
    mutationKey: ["delete-substage"],
    mutationFn: async (code) => {
      const response = await deleteSubStage(Number(search?.case_id), code);
      if (response.status === 200 || response.status === 204) {
        return response?.data;
      } else {
        throw response;
      }
    },
    onSuccess: (response) => {
      setOpenDeleteSubStageDialog(false);
      toast.success(response?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
      setSubStagesList(
        (prev) => prev.filter((item) => item.code !== deletingCode)
      );
      setOriginalSubStages(
        (prev) => prev.filter((item) => item.code !== deletingCode)
      );
      getCaseStagesRefetch();
    },
    onError: (error) => {
      const errorMessage = error?.data?.errData?.sub_stage[0] || error?.message;
      setSubStageError(errorMessage);
    },
    onSettled: () => setDeletingCode(null)
  });
  const { mutate: mutateReorderSubStage, isPending: ReorderSubStage } = useMutation({
    mutationFn: async (payload) => {
      const response = await reorderSubStage(
        Number(search?.case_id),
        payload
      );
      return response;
    },
    onSuccess: () => {
      toast.success("SubStages Reordered Successfully", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss()
        }
      });
      setSubStageError("");
      setOriginalSubStages(subStagesList);
      getCaseStagesRefetch();
    },
    onError: (error) => {
      const errorMessage = error?.data?.errData?.sub_stage[0] || error?.message;
      setSubStageError(errorMessage);
    }
  });
  const handleAddSubStage = () => {
    const payload = {
      stage: search?.stage,
      sub_stage_title: newStep
    };
    mutateAddSubStage(payload);
  };
  const handleEditSubStage = (index) => {
    const payload = {
      stage: search?.stage,
      sub_stage_title: newStep,
      previous_code: subStagesList[index].code
    };
    mutateEditSubStage(payload);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (editingIndex !== null) {
        handleEditSubStage(editingIndex);
      } else {
        handleAddSubStage();
      }
    }
  };
  const handleCancel = () => {
    setSubStageError("");
    setNewStep("");
    setEditingIndex(null);
    setOriginalSubStages(subStagesList);
    setSubStagesList(originalSubStages);
  };
  const handleDeleteSubStage = (code) => {
    setDeletingCode(code);
    mutateDeleteSubStage(code, {
      onSettled: () => setDeletingCode(null)
    });
  };
  const handleReorder = (newList) => {
    setSubStagesList(newList);
  };
  const handleSave = () => {
    const minOrder = Math.min(...subStagesList.map((item) => item.order));
    const payload = {
      sub_stages: subStagesList.map((item, idx) => ({
        code: item.code,
        order: minOrder + idx,
        title: item.title,
        status: item.status
      }))
    };
    mutateReorderSubStage(payload);
  };
  const handleReset = () => {
    setSubStagesList(originalSubStages);
  };
  const isOrderChanged = () => {
    if (subStagesList.length !== originalSubStages.length) return true;
    for (let i = 0; i < subStagesList.length; i++) {
      if (subStagesList[i].code !== originalSubStages[i].code) return true;
    }
    return false;
  };
  const moveSubStage = (index, direction) => {
    setSubStagesList((prev) => {
      const newList = [...prev];
      if (direction === "up" && index > 0) {
        [newList[index - 1], newList[index]] = [
          newList[index],
          newList[index - 1]
        ];
      }
      if (direction === "down" && index < newList.length - 1) {
        [newList[index], newList[index + 1]] = [
          newList[index + 1],
          newList[index]
        ];
      }
      return newList;
    });
  };
  const handleBack = () => {
    navigate({ to: `/litigations/service/${search?.case_id}/manage` });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    caseStagesIsLoading ? /* @__PURE__ */ jsx(
      LoadingComponent,
      {
        loading: caseStagesIsLoading,
        message: "Loading Case Stages...",
        className: "bg-opacity-100"
      }
    ) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 p-0", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleBack,
          className: "hover:bg-gray-100 px-0 !shadow-none cursor-pointer border h-7 w-8 bg-gray-50 border-gray-300 rounded-none hover:border-gray-400",
          children: /* @__PURE__ */ jsx(BackArrow, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-full px-4 py-0 max-w-[1600px] mx-auto ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-full bg-white rounded shadow-sm border p-4  border-gray-300", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: labelStage?.[search?.stage] }) }),
        /* @__PURE__ */ jsx("hr", { className: "my-2 border-gray-300" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 rounded space-y-2 max-h-[70vh] overflow-y-auto w-full lg:w-1/2", children: Array.isArray(subStagesList) && subStagesList.length > 0 ? /* @__PURE__ */ jsx(
            ReactSortable,
            {
              list: subStagesList,
              setList: handleReorder,
              animation: 200,
              children: subStagesList.map((sub, index) => {
                const codeAfterHash = sub.code.split("#")[1] || "";
                const showActions = codeAfterHash.startsWith("Z") && sub?.status !== "completed";
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "bg-white p-1 rounded flex justify-between items-center border border-gray-300 mb-2 cursor-pointer handle",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "[&_svg]:size-4 2xl:[&_svg]:size-3", children: sub.status === "completed" ? /* @__PURE__ */ jsx("div", { className: "text-green-700", children: /* @__PURE__ */ jsx(ApprovedIcon, {}) }) : /* @__PURE__ */ jsx(CurrentIcon, {}) }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm capitalize handle", children: sub.title })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                        showActions && /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(
                            Button,
                            {
                              onClick: () => {
                                setEditingIndex(index);
                                setNewStep(sub.title);
                              },
                              disabled: editingIndex !== null,
                              className: "hover:text-red-700 w-5 h-5 hover:bg-transparent bg-transparent cursor-pointer",
                              children: /* @__PURE__ */ jsx(EditIcon, {})
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            Button,
                            {
                              onClick: () => {
                                setDeletingCode(sub.code);
                                setOpenDeleteSubStageDialog(true);
                              },
                              disabled: deletingCode === sub.code || editingIndex !== null,
                              className: "bg-transparent px-2 h-fit py-1 cursor-pointer",
                              children: /* @__PURE__ */ jsx(NotesDeleteIcon, { className: "w-4 h-4 cursor-pointer" })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs("span", { className: "handle flex flex-col items-center justify-center text-white bg-black rounded px-1", children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              disabled: index === 0,
                              onClick: () => moveSubStage(index, "up"),
                              className: "focus:outline-none disabled:opacity-40 cursor-pointer",
                              tabIndex: -1,
                              children: /* @__PURE__ */ jsx(
                                "svg",
                                {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  className: "w-4 h-4",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  children: /* @__PURE__ */ jsx(
                                    "path",
                                    {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: "2",
                                      d: "M5 15l7-7 7 7"
                                    }
                                  )
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              disabled: index === subStagesList.length - 1,
                              onClick: () => moveSubStage(index, "down"),
                              className: "focus:outline-none disabled:opacity-40 cursor-pointer",
                              tabIndex: -1,
                              children: /* @__PURE__ */ jsx(
                                "svg",
                                {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  className: "w-4 h-4",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  children: /* @__PURE__ */ jsx(
                                    "path",
                                    {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: "2",
                                      d: "M19 9l-7 7-7-7"
                                    }
                                  )
                                }
                              )
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  sub.id
                );
              })
            }
          ) : /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "No substages available" }) }),
          /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium mb-2", children: "Add New Sub Stage" }),
            /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Please Enter Title",
                value: newStep.charAt(0).toUpperCase() + newStep.slice(1),
                onChange: (e) => setNewStep(e.target.value),
                onKeyDown: handleKeyDown,
                className: "border border-gray-300 focus:outline-none focus:ring-0"
              }
            ) }),
            subStageError && /* @__PURE__ */ jsx("div", { className: "text-red-600 text-xs mb-2", children: subStageError }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
              newStep && /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  onClick: handleCancel,
                  className: "text-xs bg-white text-black rounded-none border h-8 hover:bg-gray-200 cursor-pointer",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => {
                    if (editingIndex !== null) {
                      handleEditSubStage(editingIndex);
                    } else {
                      handleAddSubStage();
                    }
                  },
                  className: "text-xs bg-black text-white rounded-none h-8 hover:bg-gray-800 cursor-pointer",
                  disabled: AddingSubStage || EditSubstage,
                  children: AddingSubStage || EditSubstage ? "Saving..." : editingIndex !== null ? "Save" : "Add"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start mt-4", children: isOrderChanged() ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleSave,
              disabled: ReorderSubStage,
              className: "text-xs bg-black text-white rounded-none h-8 hover:bg-gray-800 cursor-pointer",
              children: ReorderSubStage ? "Saving..." : "Save the Order"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleReset,
              disabled: ReorderSubStage,
              className: "text-xs bg-white text-black rounded-none border border-gray-200 h-8 hover:bg-gray-200 ml-2 cursor-pointer",
              children: "Discard changes"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 ml-2 mt-2", children: "Adjust the sub stage order by dragging items." }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      ApproveDialog,
      {
        icon: /* @__PURE__ */ jsx(CompleteLogo, {}),
        open: openDeleteSubStageDialog,
        onOpenChange: setOpenDeleteSubStageDialog,
        title: "Delete Sub Stage",
        message: "If this Sub Stage contains any files or notes, they will be deleted. Are you sure you want to delete this Sub Stage?",
        onCancel: () => {
          setDeletingCode(null);
          setOpenDeleteSubStageDialog(false);
        },
        onConfirm: () => {
          if (deletingCode) handleDeleteSubStage(deletingCode);
        },
        disabled: DeletingSubstage
      }
    )
  ] });
}
const SplitComponent = AddSubStageComponent;
export {
  SplitComponent as component
};
