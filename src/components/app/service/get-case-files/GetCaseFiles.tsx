import { useCaseCompletion } from "@/components/context/CaseCompletion";
import { UseContextAPI } from "@/components/context/Provider";
import ApproveDialog from "@/components/core/ApproveDialog";
import ApproveRejectDialog from "@/components/core/ApproveRejectDialog";
import LoadingComponent from "@/components/core/Loading";
import ApproveLogo from "@/components/icons/approve-logo";
import StageCompleteIcon from "@/components/icons/stage-complete-icon";
import {
  deleteDocPlaceHolderAPI,
  deleteSingleDocAPI,
  documentApprovalAPI,
} from "@/http/services/fileUpload";
import { getAllManageDocsAPI } from "@/http/services/manage";
import {
  DRAFT_REVIEW_SUB_STAGES,
  LEGAL_NOTICE_STAGES,
  LEGAL_NOTICE_SUB_STAGES,
  QUERY_KEYS,
  STATUS_MESSAGES,
  TIMEOUT_DURATION,
  TOAST_MESSAGES,
} from "@/lib/constants/getCaseFilesConstants";
import { DialogType, GetCaseFilesProps } from "@/lib/interfaces/files";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useParams, useSearch } from "@tanstack/react-router";
import { CircleCheck, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileList from "./FileList";

const GetCaseFiles = ({ NoticeDraftKey, NoticeSentKey }: GetCaseFilesProps) => {
  const { service_id } = useParams({ strict: false });
  const [deleteObj, setDeleteObj] = useState<any>(null);
  const { isUser, isManager, isAdvocate, isAdmin } = useUserDetails();
  const onCancelDeleteFile = () => setDeleteObj(null);
  const [deleteReason, setDeleteReason] = useState<string>("");
  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const onCancelApproveReject = () => setDialogType(null);
  const [approveRejectReason, setApproveRejectReason] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string>("");
  const [loading2, setLoading2] = useState<boolean>(false);
  const [appRejError, setAppRejError] = useState<string>("");
  const { caseStagesData, getCaseStagesRefetch, allRecords, allDocsData } =
    UseContextAPI();
  const { completeSubStage } = useCaseCompletion();
  const location = useLocation();
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
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
        onClick: () => toast.dismiss(),
      },
    });
  };

  const onDeleteFile = (contactTypeObj: any) => {
    setDeleteObj(contactTypeObj);
  };

  const onDeletePlaceHolder = (contactTypeObj: any) => {
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
        onClick: () => toast.dismiss(),
      },
    });
  };

  const {
    isFetching,
    isLoading,
    data: filesDetails,
    refetch: getCaseFilesFetcher,
  } = useQuery({
    queryKey: [
      QUERY_KEYS.FILE_DETAILS,
      service_id,
      stage,
      subStage,
      location.pathname,
    ],
    queryFn: async ({ signal }) => {
      try {
        if (!service_id) return { signal };
        let queryParams: any = {};
        if (subStage === "CSFG#DREV") {
          queryParams = {
            case_stage: "CSFG",
            case_sub_stages: DRAFT_REVIEW_SUB_STAGES.map(encodeURIComponent),
            verification_status: "APPROVED",
          };
        } else if (subStage === "SLNT#SNNT") {
          queryParams = {
            case_stages: LEGAL_NOTICE_STAGES.map(encodeURIComponent),
            case_sub_stages: LEGAL_NOTICE_SUB_STAGES.map(encodeURIComponent),
          };
        } else {
          queryParams = {
            case_stage: stage,
            case_sub_stage: subStage && encodeURIComponent(subStage),
          };
        }

        const response = await getAllManageDocsAPI(
          service_id as string,
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
        const error = err as Error;
        if (error.name === "AbortError") return undefined;
        throw new Error(STATUS_MESSAGES.FETCH_ERROR);
      } finally {
        setTimeout(() => {
          setLoading2(false);
        }, TIMEOUT_DURATION);
      }
    },
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });

  const { mutateAsync: onConfirmDeleteFile, isPending: isDeleteLoading } =
    useMutation({
      mutationKey: [QUERY_KEYS.DELETE_FILE],
      mutationFn: async (docId: number) => {
        docId = filesDetails?.find((item: any) => item?.id === docId)?.id;
        const response = await deleteSingleDocAPI({
          docId,
          payload: {
            reason: deleteReason,
            case_stage: stage,
            case_sub_stage: subStage,
          },
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
      onError: (error: any) => {
        setDeleteError(error?.data?.errData?.reason[0]);
        getCaseFilesFetcher();
      },
    });

  const {
    mutateAsync: onConfirmDeletePlaceholder,
    isPending: isDeletePlaceholder,
  } = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_PLACEHOLDER],
    mutationFn: async (docId: any) => {
      docId = filesDetails?.find((item: any) => item?.id === docId)?.id;
      const response = await deleteDocPlaceHolderAPI({
        docId,
        payload: {
          reason: deleteReason,
          case_stage: stage,
          case_sub_stage: subStage,
        },
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
    onError: (error: any) => {
      setDeleteError(error?.data?.errData?.reason[0]);
      getCaseFilesFetcher();
    },
  });

  const {
    mutate: mutateApproveorRejectDocument,
    isPending: ApproveOrRejectDocument,
  } = useMutation({
    mutationKey: [QUERY_KEYS.APPROVE_REJECT_DOCUMENT],
    mutationFn: async ({
      docId,
      verification_status,
      notes,
      category,
    }: {
      docId: number;
      verification_status: string;
      notes?: string | null;
      category?: string;
    }) => {
      docId = filesDetails?.find((item: any) => item?.id === docId)?.id;

      let payload: {
        verification_status: string;
        case_stage: string | undefined;
        case_sub_stage: string | undefined;
        notes?: string;
        type?: string;
        category?: string;
      } = {
        verification_status,
        case_stage: stage,
        case_sub_stage: subStage,
        notes: undefined,
        category: category,
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
        doc_id: docId,
      });
      return response;
    },

    onSuccess: async (data, variables) => {
      toast.success(data?.data?.message, {
        action: {
          label: TOAST_MESSAGES.CLOSE_LABEL,
          onClick: () => toast.dismiss(),
        },
      });
      setDialogType(null);
      setApproveRejectReason("");
      getCaseFilesFetcher();
      if (
        variables.verification_status === "APPROVED" &&
        (subStage === "CSFG#DRAP" ||
          subStage === "CSFG#DAPT" ||
          subStage === "CSFG#DROC" ||
          subStage === "CSFG#DROP" ||
          subStage === "CSFG#DRCR")
      ) {
        await getCaseStagesRefetch();
        completeSubStage(subStage!);
      }
    },
    onError: (error: any) => {
      setAppRejError(error?.data?.errData?.notes[0]);
    },
  });

  const rejAppDialog = (params: {
    docId: number;
    verification_status: string;
    category?: string;
  }) => {
    setDialogType({
      docId: params?.docId,
      verification_status: params?.verification_status,
      category: params?.category ? params?.category : "",
    });
  };

  const onConfirmApproveReject = () => {
    if (dialogType) {
      mutateApproveorRejectDocument({
        ...dialogType,
        notes: dialogType?.notes ?? "",
      });
    }
  };

  const onApprove = (params: {
    docId: number;
    verification_status: string;
  }) => {
    mutateApproveorRejectDocument({
      ...params,
    });
  };
  const rejectedFilesCount = Array.isArray(filesDetails)
    ? filesDetails.filter(
        (file: any) => file?.verification_status === "REJECTED"
      ).length
    : 0;
  const validFilesCount = (filesDetails?.length || 0) - rejectedFilesCount;

  const uploadedLegalNotice =
    filesDetails?.length === 0 ||
    filesDetails?.every(
      (file: any) => file?.verification_status === "REJECTED"
    );

  const showplaceHolder =
    ([
      "CSFG#DAPT",
      "CSFG#DROC",
      "CSFG#DROP",
      "CSFG#DRCR",
      "CSFG#DRAP",
      "NTCE#DFNT",
    ].includes(subStage!) &&
      validFilesCount < 1 &&
      !isCurrentStageCompleted) ||
    (![
      "CSFG#DREV",
      "CSFG#DAPT",
      "CSFG#DROC",
      "CSFG#DROP",
      "CSFG#DRCR",
      "CSFG#DRAP",
      "NTCE#DFNT",
    ].includes(subStage!) &&
      !isCurrentStageCompleted);

  const showPlaceholderforLegalNotice =
    ["DLNT#DFNT"].includes(subStage!) && !uploadedLegalNotice;

  return (
    <div className={`p-1  ${isFetching || loading2 ? "h-full" : ""}`}>
      {loading2 || isFetching ? (
        <LoadingComponent
          loading={isFetching || loading2}
          message="Files..."
          className="bg-white"
        />
      ) : (
        <div className="w-full h-full">
          <div className={"h-full overflow-auto"}>
            <div className="h-full">
              {!filesDetails && !isLoading ? null : (
                <>
                  <FileList
                    files={filesDetails}
                    onDeleteFile={onDeleteFile}
                    onDeletePlaceHolder={onDeletePlaceHolder}
                    rejAppDialog={rejAppDialog}
                    onApprove={onApprove}
                    getCaseFilesFetcher={getCaseFilesFetcher}
                    loading2={loading2}
                    setLoading2={setLoading2}
                    isUser={isUser()}
                    isB2CManager={isManager()}
                    isB2CLegalAdvisor={isAdmin()}
                    case_sub_stage={subStage}
                    ApproveOrRejectDocument={ApproveOrRejectDocument}
                    showPlaceholder={showplaceHolder}
                    isCurrentStageCompleted={isCurrentStageCompleted}
                    showPlaceholderforLegalNotice={
                      showPlaceholderforLegalNotice
                    }
                    noticeSentKey={NoticeSentKey}
                    noticeDraftKey={NoticeDraftKey}
                  />
                  {filesDetails?.some((file: any) =>
                    DRAFT_REVIEW_SUB_STAGES.includes(file?.case_sub_stage)
                  ) &&
                    filesDetails?.some(
                      (file: any) => file?.verification_status === "APPROVED"
                    ) &&
                    subStage === "CSFG#DREV" && (
                      <div className="flex items-start mt-3 gap-2">
                        {!filesDetails?.some(
                          (file: any) => file?.is_consent_provided === true
                        ) ? (
                          <div className="p-4 mb-4 border border-orange-300 bg-orange-100 rounded-none flex items-center space-x-2">
                            <Clock size={18} color="orange" />
                            <p className="text-xs">
                              {STATUS_MESSAGES.PENDING_APPROVAL}
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 mb-4 border border-green-300 bg-green-100 rounded-none flex items-center space-x-2 w-full">
                            <CircleCheck size={18} color="green" />
                            <p className="text-xs">
                              {STATUS_MESSAGES.USER_APPROVED}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  {isCurrentStageCompleted &&
                    allDocsData?.length === 0 &&
                    allRecords?.length === 0 && (
                      <div className="flex flex-col items-center justify-center mt-6">
                        <StageCompleteIcon />
                        <p className="text-gray-600 mt-4 text-sm">
                          {STATUS_MESSAGES.NO_FILES_COMPLETED}
                        </p>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <ApproveDialog
        icon={<ApproveLogo />}
        open={!!deleteObj}
        onOpenChange={setDeleteObj}
        title="Delete File"
        message="Are you sure want to delete the file"
        onCancel={onCancelDeleteFile}
        isPending={isDeleteLoading || isDeletePlaceholder}
        onConfirm={
          deleteObj?.category === null
            ? onConfirmDelete
            : onConfirmDeletePlaceHolder
        }
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
      />
    </div>
  );
};

export default GetCaseFiles;
