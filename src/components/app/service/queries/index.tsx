import { UseContextAPI } from "@/components/context/Provider";
import DeleteStrokeIcon from "@/components/icons/delete-stroke-icon";
import SendIcon from "@/components/icons/send-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteSingleDocAPI } from "@/http/services/fileUpload";
import { raiseQueryAPI, UpdateCategoryAPI } from "@/http/services/legalOpinion";
import { CaseFile, DynamicComponentProps } from "@/lib/interfaces/manage";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Loader2, PenLineIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ManageCaseHeader from "../ManageCaseHeader";
import LoadingComponent from "@/components/core/Loading";

const RaiseQueries = ({ stage, subStage }: DynamicComponentProps) => {
  const { service_id } = useParams({ strict: false });
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { isUser } = useUserDetails();

  const { getAllDocsRefetch, allDocsData, caseStagesData, allDocsIsFetching } =
    UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const isClosingQueryCompleted =
    caseStagesData?.sub_stages?.find((sub: any) => sub.code === "QURI#MDSC")
      ?.status === "completed";

  const { mutate: raiseQuery, isPending } = useMutation({
    mutationKey: ["Adding_lod"],
    mutationFn: async (data: { category: string }) => {
      const payload = {
        case_id: Number(service_id),
        category: data.category,
        is_requested: true,
        case_stage: stage,
        case_sub_stage: subStage,
      };
      const response = await raiseQueryAPI(payload);
      return response?.data;
    },
    onSuccess: (data) => {
      setNewItem("");
      setErrorMsg("");
      getAllDocsRefetch();
      toast.success(data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (response: any) => {
      if (response.status === 422) {
        const errorMessage = response?.data?.errData?.category;
        setErrorMsg(errorMessage);
      } else {
        const errorMessage = response?.data?.message;
        setErrorMsg(errorMessage);
      }
    },
  });

  const { mutate: mutateUpdateCategory, isPending: isPendingUpdateCategory } =
    useMutation({
      mutationFn: async (data: { category: string }) => {
        const response = await UpdateCategoryAPI(categoryIds, {
          category: data.category,
          id: categoryIds[0],
          case_id: Number(service_id),
          case_stage: stage,
          case_sub_stage: subStage,
        });
        return response?.data;
      },
      onSuccess: (data) => {
        toast.success(data?.message || "Category updated successfully", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        setIsEditing(false);
        setEditItem("");
        setNewItem("");
        setErrorMsg("");
        setEditingItemId(null);
        getAllDocsRefetch();
      },
      onError: (response: any) => {
        if (response.status === 422) {
          const errorMessage = response?.data?.errData?.category;
          setErrorMsg(errorMessage);
        } else {
          const errorMessage = response?.data?.message;
          setErrorMsg(errorMessage);
        }
      },
    });

  const { mutate: onConfirmDeleteFile, isPending: isDeleteLoading } =
    useMutation({
      mutationKey: ["deleteFile"],
      mutationFn: async (docId?: number) => {
        docId = allDocsData?.find((item: CaseFile) => item.id === docId)?.id;
        if (!docId) throw new Error("Document ID not found");
        const response = await deleteSingleDocAPI({
          docId,
          payload: {
            case_stage: stage,
            case_sub_stage: subStage,
          },
        });
        if (response?.status === 200 || response?.status === 201) {
          return response.data.data;
        }
        throw new Error("Failed to delete file");
      },
      onSuccess: (data) => {
        toast.success("File deleted successfully", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        getAllDocsRefetch();
      },
      onError: (error: any) => {},
    });

  const getCategoryIds = () => {
    return (
      Array.isArray(allDocsData) &&
      allDocsData
        ?.filter((file) => editItem === file.category && file.is_requested)
        .map((file) => file.id)
    );
  };

  const categoryIds: any = getCategoryIds();

  const handleAddItem = () => {
    setErrorMsg("");

    if (isEditing && editingItemId) {
      mutateUpdateCategory({
        category: newItem.trim(),
      });
    } else {
      raiseQuery({ category: newItem.trim() });
    }
  };

  const handleEditClick = (item: any) => {
    setIsEditing(true);
    setNewItem(item.category);
    setEditItem(item.category);
    setEditingItemId(item.id);
    setErrorMsg("");
  };
  const canDeleteCategory = (category: string, allDocsData: any[]) => {
    return !allDocsData.some(
      (doc) =>
        doc.category === category &&
        !doc.is_requested &&
        (doc.key || doc.file_name)
    );
  };
  const handleDeleteClick = (item: any) => {
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

  return (
    <div className="h-full">
      {allDocsIsFetching ? (
        <div className="relative h-[calc(100%-43px)] flex items-center justify-center">
          <LoadingComponent
            loading={allDocsIsFetching}
            message="Docs loading..."
          />
        </div>
      ) : (
        <div className="h-full justify-center items-center overflow-hidden">
          <ManageCaseHeader
            caseStage={stage}
            caseSubStage={subStage}
            showActionButton={isUser() ? false : !isEditing}
            showNoteButton={false}
            showUploadButton={false}
          />
          {isClosingQueryCompleted && allDocsData?.length === 0 && (
            <div className="h-[calc(100%-100px)] flex justify-center items-center">
              <div className="text-center text-base text-gray-500 flex items-center justify-center">
                This stage is already completed. No queries were raised.
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddItem();
            }}
          >
            {!isClosingQueryCompleted && (
              <div className="flex items-center space-x-4 p-2 rounded-none">
                <Input
                  className="flex-1 border h-9 rounded-none border-gray-200 bg-gray-100 text-sm 3xl:text-base font-normal focus:!outline-none outline-none"
                  placeholder={isEditing ? "Edit query" : "Enter query"}
                  value={
                    newItem
                      ? newItem.charAt(0).toUpperCase() + newItem.slice(1)
                      : ""
                  }
                  onChange={(e) => {
                    setNewItem(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  disabled={isAnyLoading}
                />
                <div className="flex items-center space-x-2">
                  <Button
                    type="submit"
                    size="sm"
                    className={`bg-black hover:bg-black h-9 cursor-pointer text-white text-xs 3xl:text-sm rounded-none font-normal ${
                      isAnyLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isAnyLoading}
                  >
                    <SendIcon className="w-4 h-4" />
                    {isEditing ? "Update" : "Request"}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      size="sm"
                      className={`cursor-pointer text-white text-xs 3xl:text-sm rounded-none ${
                        isAnyLoading
                          ? "bg-gray-500 hover:bg-gray-500 opacity-50 cursor-not-allowed"
                          : "bg-black hover:bg-black"
                      }`}
                      onClick={handleCancel}
                      disabled={isAnyLoading}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            )}
            {errorMsg && (
              <div className="px-2 pb-2">
                <p className="text-red-500 text-xs">{errorMsg}</p>
              </div>
            )}
          </form>
          <div
            className={`p-2 space-y-2 ${!isCurrentStageCompleted ? "overflow-y-auto h-[calc(100vh-100px)] " : " overflow-y-auto h-[calc(100vh-250px)]"}`}
          >
            {Array.isArray(allDocsData) &&
              allDocsData?.map((item: any) => {
                const isCurrentlyEditing = editingItemId === item.id;
                const isCurrentlyDeleting = isDeleteLoading;

                return (
                  <div
                    key={item?.id}
                    className={`flex flex-cols w-full border p-2 gap-4 ${"border-gray-200"}`}
                  >
                    <div className="text-sm flex-1 self-center">
                      {item?.category}
                    </div>
                    <div className="text-xs bg-gray-200 font-normal p-1 flex  self-center">
                      {dayjs(item?.created_at).format("DD MMM YYYY")}
                    </div>
                    {!isClosingQueryCompleted && (
                      <Button
                        onClick={() => !isAnyLoading && handleEditClick(item)}
                        className={`!p-0 !m-0  ${
                          isAnyLoading
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:text-blue-600"
                        } transition-colors`}
                        title="Edit this query"
                        disabled={isCurrentlyEditing}
                      >
                        <PenLineIcon className="w-4 h-4" />
                      </Button>
                    )}
                    {!isClosingQueryCompleted && (
                      <Button
                        onClick={() => {
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
                        }}
                        title="Delete this query"
                        disabled={isCurrentlyEditing}
                        className={` !p-0 !m-0 ${
                          isAnyLoading
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:text-red-600"
                        } transition-colors`}
                      >
                        {deleteId === item.id ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <DeleteStrokeIcon />
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RaiseQueries;
