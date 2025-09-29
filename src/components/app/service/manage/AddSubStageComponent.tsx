import ApproveDialog from "@/components/core/ApproveDialog";
import LoadingComponent from "@/components/core/Loading";
import ApprovedIcon from "@/components/icons/approved-Icon";
import BackArrow from "@/components/icons/back-arrow";
import CompleteLogo from "@/components/icons/complete-logo";
import CurrentIcon from "@/components/icons/current-icon";
import EditIcon from "@/components/icons/edit-icon";
import NotesDeleteIcon from "@/components/icons/notes-delete-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCaseStagesAPI } from "@/http/services/litigations";
import {
  addSubStage,
  deleteSubStage,
  editSubStage,
  reorderSubStage,
} from "@/http/services/manage";
import { labelStage } from "@/lib/constants/statusConstants";
import { SubStage } from "@/lib/interfaces/manage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Sortable from "react-sortablejs";
import { toast } from "sonner";

export default function AddSubStageComponent() {
  const navigate = useNavigate({});
  const search = useSearch({ strict: false }) as {
    stage: string;
    case_id: string;
  };
  const [newStep, setNewStep] = useState("");
  const [subStageError, setSubStageError] = useState("");
  const [subStagesList, setSubStagesList] = useState<SubStage[]>([]);
  const [originalSubStages, setOriginalSubStages] = useState<SubStage[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingCode, setDeletingCode] = useState<string | null>(null);
  const [openDeleteSubStageDialog, setOpenDeleteSubStageDialog] =
    useState(false);

  const { ReactSortable } = Sortable;

  function getSubStagesForStage(
    subStages: SubStage[],
    stageCode: string
  ): SubStage[] {
    return subStages
      .filter((item) => item.code.split("#")[0] === stageCode)
      .sort((a, b) => a.order - b.order); // Sort by order
  }

  const {
    isLoading: caseStagesIsLoading,
    data: caseStagesData,
    isError,
    refetch: getCaseStagesRefetch,
  } = useQuery({
    queryKey: ["caseStages", search?.case_id],
    queryFn: async () => {
      const payload = {
        case_id: search?.case_id,
      };
      const response = await getCaseStagesAPI(payload);
      if (response.status === 200 || response.status === 201) {
        return response?.data?.data;
      }
      throw new Error("Failed to fetch case stages");
    },
    enabled: !!search?.case_id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (caseStagesData?.sub_stages) {
      const filteredSubStages = getSubStagesForStage(
        caseStagesData.sub_stages,
        search?.stage
      );
      const mappedSubStages: SubStage[] = filteredSubStages.map(
        (item, index) => ({
          id: item.code || `substage-${index}`,
          code: item.code,
          order: item.order || index + 1,
          title: item.title,
          status: item.status || "pending",
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
    mutationFn: async (payload: { stage: string; sub_stage_title: string }) => {
      const response = await addSubStage(Number(search?.case_id), payload);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      setNewStep("");
      setSubStageError("");
      getCaseStagesRefetch();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.errData?.sub_stage_title[0] || error?.message;
      setSubStageError(errorMessage);
    },
  });

  const { mutate: mutateEditSubStage, isPending: EditSubstage } = useMutation({
    mutationFn: async (payload: {
      stage: string;
      sub_stage_title: string;
      previous_code: string;
    }) => {
      const response = await editSubStage(Number(search?.case_id), payload);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      setNewStep("");
      setSubStageError("");
      getCaseStagesRefetch();
      setEditingIndex(null);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.errData?.sub_stage_title[0] || error?.message;
      setSubStageError(errorMessage);
    },
  });

  const { mutate: mutateDeleteSubStage, isPending: DeletingSubstage } =
    useMutation({
      mutationKey: ["delete-substage"],
      mutationFn: async (code: string) => {
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
            onClick: () => toast.dismiss(),
          },
        });
        setSubStagesList((prev) =>
          prev.filter((item) => item.code !== deletingCode)
        );
        setOriginalSubStages((prev) =>
          prev.filter((item) => item.code !== deletingCode)
        );
        getCaseStagesRefetch();
      },
      onError: (error: any) => {
        const errorMessage =
          error?.data?.errData?.sub_stage[0] || error?.message;
        setSubStageError(errorMessage);
      },
      onSettled: () => setDeletingCode(null),
    });

  const { mutate: mutateReorderSubStage, isPending: ReorderSubStage } =
    useMutation({
      mutationFn: async (payload: { sub_stages: SubStage[] }) => {
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
            onClick: () => toast.dismiss(),
          },
        });
        setSubStageError("");
        setOriginalSubStages(subStagesList);
        getCaseStagesRefetch();
      },
      onError: (error: any) => {
        const errorMessage =
          error?.data?.errData?.sub_stage[0] || error?.message;
        setSubStageError(errorMessage);
      },
    });

  const handleAddSubStage = () => {
    const payload = {
      stage: search?.stage,
      sub_stage_title: newStep,
    };
    mutateAddSubStage(payload);
  };

  const handleEditSubStage = (index: number) => {
    const payload = {
      stage: search?.stage,
      sub_stage_title: newStep,
      previous_code: subStagesList[index].code,
    };
    mutateEditSubStage(payload);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleDeleteSubStage = (code: string) => {
    setDeletingCode(code);
    mutateDeleteSubStage(code, {
      onSettled: () => setDeletingCode(null),
    });
  };

  const handleReorder = (newList: SubStage[]) => {
    setSubStagesList(newList);
  };

  const handleSave = () => {
    const minOrder = Math.min(...subStagesList.map((item) => item.order));
    const payload: any = {
      sub_stages: subStagesList.map((item, idx) => ({
        code: item.code,
        order: minOrder + idx,
        title: item.title,
        status: item.status,
      })),
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
  const moveSubStage = (index: number, direction: "up" | "down") => {
    setSubStagesList((prev) => {
      const newList = [...prev];
      if (direction === "up" && index > 0) {
        [newList[index - 1], newList[index]] = [
          newList[index],
          newList[index - 1],
        ];
      }
      if (direction === "down" && index < newList.length - 1) {
        [newList[index], newList[index + 1]] = [
          newList[index + 1],
          newList[index],
        ];
      }
      return newList;
    });
  };

  const handleBack = () => {
    navigate({ to: `/litigations/service/${search?.case_id}/manage` });
  };

  return (
    <>
      {caseStagesIsLoading ? (
        <LoadingComponent
          loading={caseStagesIsLoading}
          message="Loading Case Stages..."
          className="bg-opacity-100"
        />
      ) : (
        <>
          <div className="flex items-start gap-2 p-0">
            <Button
              onClick={handleBack}
              className="hover:bg-gray-100 px-0 !shadow-none cursor-pointer border h-7 w-8 bg-gray-50 border-gray-300 rounded-none hover:border-gray-400"
            >
              <BackArrow className="w-5 h-5" />
            </Button>
            <div className="w-full px-4 py-0 max-w-[1600px] mx-auto ">
              <div className="max-w-full bg-white rounded shadow-sm border p-4  border-gray-300">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {labelStage?.[search?.stage as keyof typeof labelStage]}
                  </h2>
                </div>

                <hr className="my-2 border-gray-300" />

                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Left side: substage list */}
                  <div className="bg-gray-50 p-4 rounded space-y-2 max-h-[70vh] overflow-y-auto w-full lg:w-1/2">
                    {Array.isArray(subStagesList) &&
                    subStagesList.length > 0 ? (
                      <ReactSortable
                        list={subStagesList}
                        setList={handleReorder}
                        animation={200}
                      >
                        {subStagesList.map((sub, index) => {
                          const codeAfterHash = sub.code.split("#")[1] || "";
                          const showActions =
                            codeAfterHash.startsWith("Z") &&
                            sub?.status !== "completed";
                          return (
                            <div
                              key={sub.id}
                              className="bg-white p-1 rounded flex justify-between items-center border border-gray-300 mb-2 cursor-pointer handle"
                            >
                              <div className="flex gap-2 items-center">
                                <div className="[&_svg]:size-4 2xl:[&_svg]:size-3">
                                  {sub.status === "completed" ? (
                                    <div className="text-green-700">
                                      <ApprovedIcon />
                                    </div>
                                  ) : (
                                    <CurrentIcon />
                                  )}
                                </div>
                                <span className="text-sm capitalize handle">
                                  {sub.title}
                                </span>
                              </div>
                              <div className="flex gap-2 items-center">
                                {showActions && (
                                  <>
                                    <Button
                                      onClick={() => {
                                        setEditingIndex(index);
                                        setNewStep(sub.title);
                                      }}
                                      disabled={editingIndex !== null}
                                      className="hover:text-red-700 w-5 h-5 hover:bg-transparent bg-transparent cursor-pointer"
                                    >
                                      <EditIcon />
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        setDeletingCode(sub.code);
                                        setOpenDeleteSubStageDialog(true);
                                      }}
                                      disabled={
                                        deletingCode === sub.code ||
                                        editingIndex !== null
                                      }
                                      className="bg-transparent px-2 h-fit py-1 cursor-pointer"
                                    >
                                      <NotesDeleteIcon className="w-4 h-4 cursor-pointer" />
                                    </Button>
                                  </>
                                )}
                                <span className="handle flex flex-col items-center justify-center text-white bg-black rounded px-1">
                                  <button
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => moveSubStage(index, "up")}
                                    className="focus:outline-none disabled:opacity-40 cursor-pointer"
                                    tabIndex={-1}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 15l7-7 7 7"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    disabled={
                                      index === subStagesList.length - 1
                                    }
                                    onClick={() => moveSubStage(index, "down")}
                                    className="focus:outline-none disabled:opacity-40 cursor-pointer"
                                    tabIndex={-1}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </button>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </ReactSortable>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No substages available
                      </div>
                    )}
                  </div>

                  {/* Right side: substage form */}
                  <div className="w-full lg:w-1/2">
                    <p className="font-medium mb-2">Add New Sub Stage</p>
                    <div className="mb-3">
                      <Input
                        placeholder="Please Enter Title"
                        value={
                          newStep.charAt(0).toUpperCase() + newStep.slice(1)
                        }
                        onChange={(e) => setNewStep(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border border-gray-300 focus:outline-none focus:ring-0"
                      />
                    </div>
                    {subStageError && (
                      <div className="text-red-600 text-xs mb-2">
                        {subStageError}
                      </div>
                    )}
                    <div className="flex gap-2 justify-end">
                      {newStep && (
                        <Button
                          variant="ghost"
                          onClick={handleCancel}
                          className="text-xs bg-white text-black rounded-none border h-8 hover:bg-gray-200 cursor-pointer"
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          if (editingIndex !== null) {
                            handleEditSubStage(editingIndex);
                          } else {
                            handleAddSubStage();
                          }
                        }}
                        className="text-xs bg-black text-white rounded-none h-8 hover:bg-gray-800 cursor-pointer"
                        disabled={AddingSubStage || EditSubstage}
                      >
                        {AddingSubStage || EditSubstage
                          ? "Saving..."
                          : editingIndex !== null
                            ? "Save"
                            : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex w-full justify-start mt-4">
                  {isOrderChanged() ? (
                    <>
                      <Button
                        onClick={handleSave}
                        disabled={ReorderSubStage}
                        className="text-xs bg-black text-white rounded-none h-8 hover:bg-gray-800 cursor-pointer"
                      >
                        {ReorderSubStage ? "Saving..." : "Save the Order"}
                      </Button>
                      <Button
                        onClick={handleReset}
                        disabled={ReorderSubStage}
                        className="text-xs bg-white text-black rounded-none border border-gray-200 h-8 hover:bg-gray-200 ml-2 cursor-pointer"
                      >
                        Discard changes
                      </Button>
                    </>
                  ) : (
                    <div className="text-xs text-gray-500 ml-2 mt-2">
                      Adjust the sub stage order by dragging items.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <ApproveDialog
        icon={<CompleteLogo />}
        open={openDeleteSubStageDialog}
        onOpenChange={setOpenDeleteSubStageDialog}
        title="Delete Sub Stage"
        message="If this Sub Stage contains any files or notes, they will be deleted. Are you sure you want to delete this Sub Stage?"
        onCancel={() => {
          setDeletingCode(null);
          setOpenDeleteSubStageDialog(false);
        }}
        onConfirm={() => {
          if (deletingCode) handleDeleteSubStage(deletingCode);
        }}
        disabled={DeletingSubstage}
      />
    </>
  );
}
