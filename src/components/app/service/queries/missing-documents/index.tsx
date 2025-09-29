import { UseContextAPI } from "@/components/context/Provider";
import ApproveDialog from "@/components/core/ApproveDialog";
import ApproveRejectDialog from "@/components/core/ApproveRejectDialog";
import LoadingComponent from "@/components/core/Loading";
import ApproveLogo from "@/components/icons/approve-logo";
import PlusIcon from "@/components/icons/plus-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  deleteSingleDocAPI,
  documentApprovalAPI,
} from "@/http/services/fileUpload";
import { MESSAGES, UI_CONFIG } from "@/lib/constants/missingDocument";
import { DialogType } from "@/lib/interfaces/files";
import {
  CaseFile,
  DynamicComponentProps,
  GroupedFiles,
} from "@/lib/interfaces/manage";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import FileUpload from "../../get-case-files/FileUpload";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import ManageCaseHeader from "../../ManageCaseHeader";
import FileItem from "./FileItem";

export default function MissingDocuments({
  stage,
  subStage,
}: DynamicComponentProps) {
  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const [deleteObj, setDeleteObj] = useState<any>(null);
  const [openCategory, setOpenCategory] = useState<string[]>([]);
  const [approveRejectReason, setApproveRejectReason] = useState<string>("");
  const [loading2, setLoading2] = useState<boolean | undefined>(false);
  const [appRejError, setAppRejError] = useState<string>("");

  const { isUser } = useUserDetails();
  const { allDocsIsFetching, getAllDocsRefetch, allDocsData, caseStagesData } =
    UseContextAPI();
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const onCancelDeleteFile = () => setDeleteObj(null);
  const onCancelApproveReject = () => setDialogType(null);

  const { mutate: onConfirmDeleteFile, isPending: isDeleteLoading } =
    useMutation({
      mutationKey: ["deleteFile"],
      mutationFn: async (docId?: number) => {
        const doc = allDocsData?.find((item: CaseFile) => item.id === docId);
        if (!doc?.id) throw new Error("Document ID not found");

        const response = await deleteSingleDocAPI({
          docId: doc.id,
          payload: {
            case_stage: stage,
            case_sub_stage: subStage,
          },
        });

        if (response?.status === 200 || response?.status === 201) {
          return response.data.data;
        }
        throw new Error(MESSAGES.ERROR_DELETE_DEFAULT);
      },
      onSuccess: () => {
        toast.success(MESSAGES.SUCCESS_DELETE, {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        setDeleteObj(null);
        getAllDocsRefetch();
      },
      onError: (error: any) => {},
    });

  const {
    mutate: mutateApproveorRejectDocument,
    isPending: ApproveOrRejectDocument,
  } = useMutation({
    mutationKey: ["approve_reject_document"],
    mutationFn: async ({
      docId,
      verification_status,
    }: {
      docId: number | undefined;
      verification_status: string;
    }) => {
      const doc = allDocsData?.find((item: any) => item.id === docId);
      if (!doc?.id) throw new Error("Document ID not found");

      let payload: any = {
        verification_status,
        case_stage: stage,
        case_sub_stage: subStage,
        notes: undefined,
      };

      if (approveRejectReason !== "") {
        payload = {
          ...payload,
          notes: approveRejectReason,
          type: verification_status,
        };
      }

      const response = await documentApprovalAPI({
        payload,
        doc_id: doc.id,
      });
      return response;
    },
    onSuccess: (data) => {
      getAllDocsRefetch();
      toast.success(data?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      setDialogType(null);
      setApproveRejectReason("");
    },
    onError: (error: any) => {
      setAppRejError(error?.data?.errData?.notes?.[0]);
    },
  });

  const onConfirmApproveReject = () => {
    if (dialogType) {
      mutateApproveorRejectDocument(dialogType);
    }
  };

  const onConfirmDelete = () => {
    if (isDeleteLoading) return;
    onConfirmDeleteFile(deleteObj?.id);
  };

  const onDeleteFile = (contactTypeObj: CaseFile) => {
    setDeleteObj(contactTypeObj);
  };

  const groupedByCategory: GroupedFiles = useMemo(() => {
    return (
      (Array.isArray(allDocsData) &&
        allDocsData?.reduce((acc: GroupedFiles, file: CaseFile) => {
          if (file.is_requested) {
            const category = file.category || "Uncategorized";
            if (!acc[category]) acc[category] = [];
            const falseFiles = allDocsData.filter(
              (f) => f.category === category && !f.is_requested
            );
            acc[category] = falseFiles;
          }
          return acc;
        }, {} as GroupedFiles)) ||
      {}
    );
  }, [allDocsData]);

  useEffect(() => {
    if (allDocsData && groupedByCategory) {
      const itemsWithValidFiles = Object.entries(groupedByCategory)
        .filter(([_, files]) => files.some((file) => file?.file_name))
        .map(([category]) => category);

      setOpenCategory((prev) => {
        const updatedCategories = prev.filter((cat) =>
          itemsWithValidFiles.includes(cat)
        );
        const newCategories = itemsWithValidFiles.filter(
          (cat) => !updatedCategories.includes(cat)
        );
        return [...updatedCategories, ...newCategories];
      });
    }
  }, [allDocsData, groupedByCategory]);

  useEffect(() => {
    if (allDocsIsFetching) {
      setTimeout(() => {
        setLoading2(false);
      }, UI_CONFIG.LOADING_TIMEOUT);
    }
  }, [allDocsIsFetching]);

  const renderEmptyState = () => {
    if (isCurrentStageCompleted) {
      return (
        <div className="h-96 flex justify-center items-center">
          <div className="text-center text-base text-gray-500 flex items-center justify-center">
            {isUser()
              ? MESSAGES.NO_MISSING_DOCS_USER
              : MESSAGES.NO_MISSING_DOCS_ADVOCATE}
          </div>
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-200px)] flex justify-center items-center">
        <div className="text-center text-base text-gray-500 flex items-center justify-center">
          {isUser()
            ? MESSAGES.NO_MISSING_DOCS_FOUND
            : MESSAGES.RAISE_QUERY_MESSAGE}
        </div>
      </div>
    );
  };

  const renderFileGrid = (files: CaseFile[]) => (
    <div className={UI_CONFIG.GRID_CLASSES}>
      {files.map((file: CaseFile, index: number) => (
        <FileItem
          key={index}
          file={file}
          index={index}
          stage={stage}
          subStage={subStage}
          isReportingStageCompleted={isCurrentStageCompleted}
          onDeleteFile={onDeleteFile}
          getAllDocsRefetch={getAllDocsRefetch}
          setDialogType={setDialogType}
          isCurrentStageCompleted={isCurrentStageCompleted}
        />
      ))}
    </div>
  );

  const renderUploadButton = (category: string, hasValidFiles: boolean) => {
    if (isCurrentStageCompleted) return null;

    const shouldShowButton = !hasValidFiles || hasValidFiles;
    if (!shouldShowButton) return null;

    return (
      <Button className="bg-black hover:bg-black text-white h-fit rounded-none py-1 px-2">
        <FileUpload
          refetch={getAllDocsRefetch}
          category={category}
          loading2={loading2}
          setLoading2={setLoading2}
        >
          <div className="flex gap-1 items-center text-sm">
            <PlusIcon className="!h-4 !w-4" /> Upload
          </div>
        </FileUpload>
      </Button>
    );
  };

  return (
    <div className="h-full overflow-hidden">
      <ManageCaseHeader
        caseStage={stage}
        caseSubStage={subStage}
        showUploadButton={false}
        showActionButton={!isUser()}
        showNoteButton={false}
      />

      <div className="p-4 relative h-[calc(100%-30px)] overflow-y-auto">
        <div>
          {loading2 || allDocsIsFetching ? (
            <LoadingComponent
              loading={loading2 || allDocsIsFetching}
              message={MESSAGES.LOADING_MESSAGE}
            />
          ) : allDocsData?.length === 0 ? (
            renderEmptyState()
          ) : (
            <Accordion
              type="multiple"
              className="space-y-2 w-full"
              value={openCategory}
              onValueChange={setOpenCategory}
            >
              {Object.entries(groupedByCategory).map(([category, files]) => {
                const hasValidFiles = files.some((file) => file?.file_name);

                return (
                  <AccordionItem
                    value={category}
                    key={category}
                    className="border border-gray-300 rounded-none p-3"
                  >
                    <AccordionTrigger className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 w-full cursor-pointer">
                        <div className="text-xs font-normal">{category}</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        {!hasValidFiles && !isCurrentStageCompleted && (
                          <div onClick={(e) => e.stopPropagation()}>
                            {renderUploadButton(category, hasValidFiles)}
                          </div>
                        )}
                        <ChevronDown className="cursor-pointer" />
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="p-2">
                      {hasValidFiles ? (
                        renderFileGrid(files)
                      ) : (
                        <p className="text-sm text-gray-500">
                          {MESSAGES.NO_FILES_CATEGORY}
                        </p>
                      )}

                      {!isCurrentStageCompleted && hasValidFiles && (
                        <div className="mt-2">
                          {renderUploadButton(category, hasValidFiles)}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>

        <ApproveDialog
          icon={<ApproveLogo />}
          open={!!deleteObj}
          onOpenChange={setDeleteObj}
          title="Delete File"
          message={MESSAGES.DELETE_CONFIRMATION}
          onCancel={onCancelDeleteFile}
          isPending={isDeleteLoading}
          onConfirm={onConfirmDelete}
        />

        <ApproveRejectDialog
          removeConfirm={!!dialogType}
          setRemoveConfirm={() => setDialogType(null)}
          onCancel={onCancelApproveReject}
          onConfirm={onConfirmApproveReject}
          isDeleteLoading={ApproveOrRejectDocument}
          setApproveRejectReason={setApproveRejectReason}
          dialogType={dialogType}
          appRejError={appRejError}
          setAppRejError={setAppRejError}
          isPending={ApproveOrRejectDocument}
        />

        <GetCaseNotes />
      </div>
    </div>
  );
}
