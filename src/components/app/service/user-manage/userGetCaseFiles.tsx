import DocsCommentsSection from "@/components/app/service/get-case-files/DocsCommentsSection";
import FileActions from "@/components/app/service/get-case-files/FileActions";
import FileDownload from "@/components/app/service/get-case-files/FileDownload";
import FileUpload from "@/components/app/service/get-case-files/FileUpload";
import { UseContextAPI } from "@/components/context/Provider";
import ApproveDialog from "@/components/core/ApproveDialog";
import ApproveRejectDialog from "@/components/core/ApproveRejectDialog";
import LoadingComponent from "@/components/core/Loading";
import ApproveLogo from "@/components/icons/approve-logo";
import ApprovedIcon from "@/components/icons/approved-Icon";
import EditIcon from "@/components/icons/edit-icon";
import RejectIcon from "@/components/icons/reject-icon";
import UploadFileIcon from "@/components/icons/upload-file-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  deleteDocPlaceHolderAPI,
  deleteSingleDocAPI,
  documentApprovalAPI,
} from "@/http/services/fileUpload";
import { getAllManageDocsAPI } from "@/http/services/manage";
import { DialogType } from "@/lib/interfaces/files";
import {
  fileSizeInMB,
  getSubStageTitle,
  isSubStageCompleted,
} from "@/utils/helpers/files";
import { formatDateWithTime, sliceFilename } from "@/utils/helpers/manage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserFileIcon } from "./userFileIcon";

const UserGetCaseFiles = () => {
  const params = useParams({ strict: false });
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string | undefined;
  };
  const [deleteObj, setDeleteObj] = useState<any>(null);
  const [deleteReason, setDeleteReason] = useState<string>("");
  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const [approveRejectReason, setApproveRejectReason] = useState<string>("");
  const [loading2, setLoading2] = useState<boolean>(false);
  const [appRejError, setAppRejError] = useState<string>("");
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

  const showplaceHolder =
    (subStages === "CSFG#SGCP" || subStages === "CSFG#UDOC") &&
    isStageIncomplete;

  const {
    isFetching,
    isLoading,
    data: filesDetails,
    refetch: getCaseFilesFetcher,
  } = useQuery({
    queryKey: ["user-file-details", params?.service_id, stage, subStages],
    queryFn: async ({ signal }) => {
      try {
        let queryParams: any = {};

        if (
          subStages === "ONBD#VKAC" ||
          subStages === "CSFG#SGCP" ||
          subStages === "CSFG#UDOC"
        ) {
          queryParams = {
            case_stage: subStages.split("#")[0],
            case_sub_stages: encodeURIComponent(subStages),
          };
        } else {
          queryParams = {
            case_stage: stage,
            case_sub_stage: subStages && encodeURIComponent(subStages),
            verification_status: "APPROVED",
          };
        }

        const response = await getAllManageDocsAPI(
          params?.service_id as string,
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
        const error = err as Error;
        if (error.name === "AbortError") return undefined;
        throw new Error("Failed to fetch case data");
      }
    },

    enabled: !!params?.service_id,
    refetchOnWindowFocus: false,
  });

  const { mutate: onConfirmDeleteFile, isPending: isDeleteLoading } =
    useMutation({
      mutationKey: ["deleteFile"],
      mutationFn: async (docId: number) => {
        docId = filesDetails?.find((item: any) => item.id === docId)?.id;
        const response = await deleteSingleDocAPI({
          docId,
          payload: {
            reason: deleteReason,
            case_stage: stage,
            case_sub_stage: subStages,
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
        toast.success(data?.message);
        setDeleteObj(null);
        getCaseFilesFetcher();
      },
      onError: (error: any) => {
        getCaseFilesFetcher();
      },
    });

  const { mutate: onConfirmDeletePlaceholder, isPending: isDeletePlaceholder } =
    useMutation({
      mutationKey: ["deletePlaceholder"],
      mutationFn: async (docId: any) => {
        docId = filesDetails?.find((item: any) => item.id === docId)?.id;
        const response = await deleteDocPlaceHolderAPI({
          docId,
          payload: {
            reason: deleteReason,
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
        toast.success(data?.message);
        setDeleteObj(null);
        getCaseFilesFetcher();
        setDeleteReason("");
      },
      onError: (error: any) => {
        getCaseFilesFetcher();
      },
    });

  const {
    mutate: mutateApproveorRejectDocument,
    isPending: ApproveOrRejectDocument,
  } = useMutation({
    mutationKey: ["approve_reject_document"],
    mutationFn: async ({
      docId,
      verification_status,
      notes,
    }: {
      docId: number;
      verification_status: string;
      notes?: string | null;
    }) => {
      docId = filesDetails?.find((item: any) => item.id === docId)?.id;
      let payload: {
        verification_status: string;
        case_stage: string | undefined;
        case_sub_stage: string | undefined;
        notes?: string;
        type?: string;
      } = {
        verification_status,
        case_stage: stage,
        case_sub_stage: subStages,
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
        doc_id: docId,
      });
      return response;
    },
    onSuccess: (data) => {
      getCaseFilesFetcher();
      toast.success(data?.data?.message);
      setDialogType(null);
    },
    onError: (error: any) => {
      setAppRejError(error?.data?.errData?.notes[0]);
    },
  });

  const rejAppDialog = (params: {
    docId: number;
    verification_status: string;
  }) => {
    setDialogType({
      docId: params.docId,
      verification_status: params.verification_status,
    });
  };

  const onConfirmDelete = () => {
    if (isDeleteLoading) return;
    onConfirmDeleteFile(deleteObj?.id || "");
  };

  const onDeleteFile = (contactTypeObj: any) => {
    setDeleteObj(contactTypeObj);
  };

  const onDeletePlaceHolder = (contactTypeObj: any) => {
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
        notes: dialogType.notes ?? "",
      });
    }
  };

  return (
    <div
      className={`${
        allRecords?.length === 0 &&
        filesDetails?.length === 0 &&
        (![
          "CSFG#SGCP",
          "CSFG#UDOC",
          "CSCR#JUGC",
          "CTPG#PYSC",
          "CSCR#ORDC",
          "ONBD#STFE",
        ].includes(subStages!) ||
          (["CSFG#SGCP", "CSFG#UDOC"].includes(subStages!) &&
            isCurrentStageCompleted))
          ? "h-[calc(100%-20px)]"
          : ""
      }`}
    >
      {isFetching ? (
        <LoadingComponent
          loading={isFetching}
          message="Files..."
          className="bg-white"
        />
      ) : !filesDetails ||
        (filesDetails?.length === 0 &&
          allRecords?.length === 0 &&
          ![
            "CSFG#SGCP",
            "CSFG#UDOC",
            "CSCR#JUGC",
            "CTPG#PYSC",
            "CSCR#ORDC",
            "ONBD#STFE",
          ].includes(subStages!)) ||
        (["CSFG#SGCP", "CSFG#UDOC"].includes(subStages!) &&
          isCurrentStageCompleted &&
          filesDetails?.length === 0 &&
          allRecords?.length === 0) ? (
        <div className="col-span-full text-center text-base text-gray-600 3xl:text-base h-full flex items-center justify-center">
          {isCurrentStageCompleted
            ? `This stage is successfully completed. As the ${subStageTitle} document is optional, it may not be uploaded by your Advocate.`
            : `${subStageTitle} document will be uploaded by your Advocate.`}
        </div>
      ) : (
        <div className="w-full">
          {!filesDetails && !isLoading ? null : (
            <div
              className={`grid grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-2`}
            >
              {Array.isArray(filesDetails) &&
                filesDetails.map((file: any) => {
                  const cardHeaderStyle =
                    file.file_type === "application/pdf" ||
                    file.file_type === "pdf"
                      ? "bg-[#F3F3F3]"
                      : "bg-gray-100";

                  return (
                    <div className="w-fit " key={file.id}>
                      <div className="text-sm text-gray-600">
                        {file.category ? file.category : ""}
                      </div>
                      {file.download_url && (
                        <Card className="w-56 rounded-none overflow-hidden border shadow-none border-gray-300">
                          <Dialog>
                            <DialogTrigger className="w-full">
                              <CardHeader
                                className={`${cardHeaderStyle} relative flex items-center p-0 space-y-0 justify-center min-h-28 w-full`}
                              >
                                <span className="text-green-500 absolute top-3 right-3">
                                  {file?.verification_status === "APPROVED" && (
                                    <ApprovedIcon />
                                  )}
                                  {file?.verification_status === "REJECTED" && (
                                    <RejectIcon />
                                  )}
                                </span>
                                <Button
                                  className="flex items-center  cursor-pointer justify-center py-0 px-0 overflow-hidden w-full h-fit rounded-none border-none bg-transparent [&_svg]:size-14"
                                  aria-label="View Image"
                                >
                                  <UserFileIcon
                                    fileType={file.file_type}
                                    downloadUrl={file.download_url}
                                    fileName={file.file_name}
                                  />
                                </Button>
                              </CardHeader>
                            </DialogTrigger>
                            <DialogContent className="w-[90%] !p-1 gap-0 bg-white">
                              <DialogTitle />
                              <div className="flex items-center justify-between w-full">
                                <div className="text-sm">{file.file_name}</div>
                                <DialogClose className="border-0 mt-0 h-fit p-1 [&_svg]:size-6  cursor-pointer">
                                  <X className="stroke-red-500" />
                                </DialogClose>
                              </div>
                              <hr className="mb-0 border-1 border-gray-300" />
                              <div className="flex gap-4">
                                <div className="w-3/5 px-2 py-2 border-r border-gray-300 flex flex-col">
                                  <div className="flex items-center justify-end w-full gap-2">
                                    {file.category !== "Final Document" && (
                                      <p
                                        className={
                                          file.verification_status ===
                                          "REJECTED"
                                            ? "bg-red-500 flex items-center  cursor-pointer hover:bg-red-500 text-xs px-4 py-2 text-white rounded-none font-primary"
                                            : file.verification_status ===
                                                "APPROVED"
                                              ? "bg-green-500 h-7 hover:bg-green-500  cursor-pointer text-white-500 text-xs px-4 text-center py-1.5 text-white rounded-none font-primary"
                                              : file.verification_status ===
                                                  "PENDING"
                                                ? "bg-orange-500 h-7 hover:bg-orange-500  cursor-pointer text-white-500 text-xs px-4 py-1 text-white rounded-none font-primary"
                                                : "bg-black h-7 hover:bg-black text-white-500  cursor-pointer text-xs px-4 py-1 text-white rounded-none font-primary"
                                        }
                                      >
                                        {file.verification_status
                                          ? file.verification_status
                                              .charAt(0)
                                              .toUpperCase() +
                                            file.verification_status
                                              .slice(1)
                                              .toLowerCase()
                                          : ""}
                                      </p>
                                    )}
                                    {file.category !== "Final Document" && (
                                      <div className="w-[0.5px] h-9 bg-gray-300"></div>
                                    )}

                                    <div className="">
                                      <FileDownload
                                        file={{
                                          key: file.key,
                                          file_name: file.file_name,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex">
                                    {[
                                      "image",
                                      "jpg",
                                      "jpeg",
                                      "image/jpeg",
                                      "image/png",
                                      "gif",
                                      "svg",
                                      "png",
                                      "webp",
                                    ].includes(file.file_type) ? (
                                      <img
                                        src={file.download_url}
                                        alt="Full Image"
                                        className="w-full h-[70vh] object-contain rounded-lg"
                                      />
                                    ) : (
                                      <iframe
                                        src={file.download_url}
                                        title="Full Image"
                                        className="w-full h-[70vh] object-contain rounded-lg"
                                      />
                                    )}
                                  </div>
                                </div>
                                <div className="w-2/5 h-full flex flex-col space-y-3">
                                  <DocsCommentsSection documentId={file.id} />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <CardContent className="flex flex-col px-2 py-1">
                            <div
                              className="font-medium text-start text-xs cursor-pointer truncate w-full"
                              title={file?.file_name}
                            >
                              {file?.file_name
                                ? sliceFilename(file?.file_name, 25)
                                : null}
                            </div>

                            <div className="text-xs font-light"></div>
                          </CardContent>
                          <CardFooter className="w-full p-1.5 text-left flex justify-between items-center mt-0">
                            <div className="text-gray-500 text-[10px] smd:text-[11px] 4xl:text-xs flex items-center gap-2">
                              {formatDateWithTime(
                                file?.updated_at || file?.created_at
                              )}
                              {file.key && (
                                <div>
                                  <Separator
                                    orientation="vertical"
                                    className="h-3 bg-gray-500"
                                  />
                                  {fileSizeInMB(file.file_size)}
                                  {"MB"}
                                </div>
                              )}
                            </div>
                            <FileActions
                              file={file}
                              onDeleteFile={onDeleteFile}
                              onDeletePlaceHolder={onDeletePlaceHolder}
                              rejAppDialog={rejAppDialog}
                              getCaseFilesFetcher={getCaseFilesFetcher}
                              loading2={loading2}
                              setLoading2={setLoading2}
                              isCurrentStageCompleted={isCurrentStageCompleted}
                            />
                          </CardFooter>
                        </Card>
                      )}
                      <div className="">
                        {file.category === "Client Document" &&
                          file.verification_status === "REJECTED" &&
                          !isCurrentStageCompleted && (
                            <FileUpload
                              refetch={getCaseFilesFetcher}
                              documentId={file.id}
                              loading2={loading2}
                              setLoading2={setLoading2}
                              category={"Client Document"}
                            >
                              <div className="flex gap-2 text-xs items-center mt-1 sm:mt-0 [&_svg]:size-4">
                                <EditIcon className="" />
                                Replace the Document
                              </div>
                            </FileUpload>
                          )}
                      </div>
                    </div>
                  );
                })}

              {showplaceHolder && (
                <div className="w-fit rounded-none overflow-hidden space-y-1 h-fit">
                  <FileUpload
                    refetch={getCaseFilesFetcher}
                    setLoading2={setLoading2}
                    loading2={loading2}
                  >
                    <div className="py-10  w-full border border-dashed bg-slate-100 border-gray-400 px-4 flex flex-col gap-2.5 items-center justify-center">
                      <UploadFileIcon />
                      <div className="text-xs">
                        Drop Files here or Click to upload
                      </div>
                      <div className="text-[10px]">Maximum file size:50MB</div>
                    </div>
                  </FileUpload>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <>
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
      </>
    </div>
  );
};

export default UserGetCaseFiles;
