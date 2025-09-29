import { useCaseCompletion } from "@/components/context/CaseCompletion";
import { UseContextAPI } from "@/components/context/Provider";
import ApproveDialog from "@/components/core/ApproveDialog";
import LoadingComponent from "@/components/core/Loading";
import ApproveLogo from "@/components/icons/approve-logo";
import ApprovedIcon from "@/components/icons/approved-Icon";
import ViewIcon from "@/components/icons/view-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  addCaseBriefNotesAPI,
  draftingConsentAPI,
} from "@/http/services/manage";
import { labelSubStages } from "@/lib/constants/statusConstants";
import { DynamicComponentProps } from "@/lib/interfaces/manage";
import { fileSizeInMB } from "@/utils/helpers/files";
import getSubStageStatuses, {
  formatDateWithTime,
  sliceFilename,
} from "@/utils/helpers/manage";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DocsCommentsSection from "../../get-case-files/DocsCommentsSection";
import FileDownload from "../../get-case-files/FileDownload";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";
import PendingStepOverlay from "../../manage/PendingStepOverlay";
import ManageCaseHeader from "../../ManageCaseHeader";
import { UserFileIcon } from "../userFileIcon";

const DraftReview = ({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) => {
  const { service_id } = useParams({ strict: false });
  const [docsApprove, setDocsApprove] = useState<boolean>(false);
  const [isConsentProvided, setIsConsentProvided] = useState<boolean>(false);
  const [subStages, setSubStages] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [openRemarkDialog, setOpenRemarkDialog] = useState<boolean>(false);

  const {
    allDocsIsFetching,
    allDocsData,
    allRecords,
    getAllDocsRefetch,
    getCaseStagesRefetch,
  } = UseContextAPI();
  const { completeSubStage } = useCaseCompletion();

  const { isPrevSubStageCompleted, subStageLabel } = getSubStageStatuses({
    stage,
    subStage,
    mappedCaseStagesData,
  });

  const prevSubStage =
    labelSubStages[subStageLabel as keyof typeof labelSubStages];

  const { mutate: mutateAddCaseBreifNotes, isPending: isPendingAddCaseBrief } =
    useMutation({
      mutationFn: async (payload: any) => {
        const response = await addCaseBriefNotesAPI(payload);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        }
      },
      onSuccess: () => {},
      onError: (error: any) => {
        if (error.status == 422) {
        }
      },
    });

  const handleConsentChange = (isChecked: boolean) => {
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
          case_stage: stage,
        },
      ];
      mutateAddCaseBreifNotes(remarksArray);
    }

    const payload = {
      case_stage: "CSFG",
      case_sub_stage: subStages || "CSFG#DAPT",
      is_consent_provided: isChecked,
    };

    mutateDraftingConsent({ case_id: String(service_id), payload });
    setIsConsentProvided(isChecked);
  };

  const { mutate: mutateDraftingConsent, isPending } = useMutation({
    mutationKey: ["drafting-consent", service_id],
    mutationFn: async ({
      case_id,
      payload,
    }: {
      case_id: string;
      payload: any;
    }) => {
      const response = await draftingConsentAPI({ case_id, payload });
      return response?.data;
    },
    onSuccess: async (data) => {
      await getCaseStagesRefetch();
      completeSubStage(subStage!);
      getAllDocsRefetch();
      toast.success(data?.message);
    },
  });

  useEffect(() => {
    if (
      allDocsIsFetching ||
      !Array.isArray(allDocsData) ||
      allDocsData.length === 0
    ) {
      setDocsApprove(false);
      setIsConsentProvided(false);
      setSubStages("");
      return;
    }

    // Set subStage based on the first APPROVED file
    const approvedFile = allDocsData.find(
      (file: any) => file.verification_status === "APPROVED"
    );
    if (approvedFile) {
      setSubStages(approvedFile.case_sub_stage);
    }

    setIsConsentProvided(
      allDocsData.every((record: any) => record?.is_consent_provided === true)
    );
    setDocsApprove(
      allDocsData.some(
        (record: any) => record?.verification_status === "APPROVED"
      )
    );
  }, [allDocsData, allDocsIsFetching]);

  return (
    <div className="h-full">
      {isPrevSubStageCompleted ? (
        <>
          <div className="px-1 h-full ">
            <div className="">
              <ManageCaseHeader
                caseStage={stage}
                caseSubStage={subStage}
                showNoteButton={false}
                showUploadButton={false}
              />
            </div>
            <div className="overflow-auto relative p-2 h-[calc(100%-50px)] w-full">
              {allDocsIsFetching ? (
                <LoadingComponent
                  loading={allDocsIsFetching}
                  message="Files..."
                />
              ) : (
                <>
                  <div
                    className={`w-full ${allRecords?.length === 0 ? "h-[calc(100%-20px)]" : ""} `}
                  >
                    <div className="h-full w-full">
                      {!Array.isArray(allDocsData) ||
                      allDocsData.length === 0 ||
                      (allDocsData.every((file: any) => !file.download_url) &&
                        !allDocsIsFetching) ? (
                        <div className="col-span-full text-center text-lg h-full  flex items-center justify-center">
                          Draft document will upload by your Advocate
                        </div>
                      ) : (
                        <div className="gap-4 h-full overflow-y-auto">
                          {allDocsData?.filter(
                            (file: any) =>
                              file.verification_status === "APPROVED"
                          ).length > 0 ? (
                            allDocsData?.map((file: any) => {
                              if (file.verification_status !== "APPROVED")
                                return null;

                              const cardHeaderStyle =
                                file.file_type === "application/pdf" ||
                                file.file_type === "pdf"
                                  ? "bg-[#F3F3F3]"
                                  : "bg-gray-100";

                              return (
                                <div key={file?.id} className="mb-4">
                                  <div className="py-1">{file?.category}</div>
                                  <Card className="w-56 rounded-none overflow-hidden border border-gray-200">
                                    <Dialog>
                                      <DialogTrigger asChild className="w-full">
                                        <CardHeader
                                          className={`${cardHeaderStyle} relative flex items-center p-0 space-y-0 justify-center min-h-28 w-full`}
                                        >
                                          <span className="text-green-600 absolute top-3 right-3">
                                            {file.verification_status ===
                                              "APPROVED" && <ApprovedIcon />}
                                          </span>
                                          <Button
                                            className="flex items-center justify-center w-full p-0 border-none bg-transparent [&_svg]:size-12"
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
                                      <DialogContent
                                        className="w-[90%] p-2 gap-0 bg-white"
                                        aria-describedby={undefined}
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          <div className="text-sm">
                                            {file.file_name}
                                          </div>
                                          <DialogClose className="hover:bg-gray-100 cursor-pointer">
                                            <X />
                                          </DialogClose>
                                        </div>
                                        <hr className="mt-2 mb-0 border-t-[0.5px] border-gray-200 shadow-none" />

                                        <div className="flex gap-4">
                                          <div className="w-3/5 border-r border-gray-200 px-2 py-2 flex flex-col">
                                            <div className="flex items-center justify-end w-full mb-4">
                                              <div className="flex items-center gap-2">
                                                <p
                                                  className={
                                                    file.verification_status ===
                                                    "REJECTED"
                                                      ? " bg-red-500 hover:bg-red-500 text-xs px-4 py-2 text-white rounded-none font-primary"
                                                      : file.verification_status ===
                                                          "APPROVED"
                                                        ? " bg-green-500 hover:bg-green-500 text-xs px-2 py-1 text-white rounded-none font-primary"
                                                        : file.verification_status ===
                                                            "PENDING"
                                                          ? " bg-orange-500 hover:bg-orange-500 text-xs px-4 py-1 text-white rounded-none font-primary"
                                                          : " bg-black hover:bg-black text-xs px-4 py-1 text-white rounded-none font-primary"
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
                                                "image/jpeg",
                                                "image/png",
                                                "gif",
                                                "svg",
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
                                          <div className="w-2/5 flex flex-col">
                                            <DocsCommentsSection
                                              documentId={file.id}
                                            />
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>

                                    <CardContent className="flex flex-col px-2 py-2">
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <div className="font-medium text-start text-xs">
                                              {file?.file_name
                                                ? sliceFilename(
                                                    file?.file_name,
                                                    25
                                                  )
                                                : null}
                                            </div>
                                          </TooltipTrigger>
                                          <TooltipContent className="bg-white border border-gray-200 p-1 ml-10 w-3/4">
                                            {file?.file_name}
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <div className="text-xs font-light"></div>
                                    </CardContent>
                                    <CardFooter className="w-full p-2 text-left flex justify-between items-center y">
                                      <div className="text-gray-500 hover:text-gray-700 flex items-center gap-2">
                                        <span className="text-[11px]">
                                          {file.updated_at ? (
                                            <>
                                              {formatDateWithTime(
                                                file.updated_at
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {formatDateWithTime(
                                                file.created_at
                                              )}
                                            </>
                                          )}
                                        </span>
                                        {file.key ? (
                                          <>
                                            <Separator
                                              orientation="vertical"
                                              className="h-3 bg-gray-500"
                                            />
                                            <span className="text-[11px]">
                                              {fileSizeInMB(file.file_size)}
                                              {"MB"}
                                            </span>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      {file.key ? (
                                        <a
                                          href={file.download_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <ViewIcon className="w-4 h-4" />
                                        </a>
                                      ) : null}
                                    </CardFooter>
                                  </Card>
                                  {docsApprove && (
                                    <div className="mt-4 flex flex-col gap-2">
                                      <div className="flex gap-2">
                                        {isConsentProvided && !isPending && (
                                          <Checkbox
                                            className="gap-2 cursor-not-allowed"
                                            id={`consent-checkbox-${file.id}`}
                                            checked={isConsentProvided}
                                          />
                                        )}
                                        <label
                                          htmlFor={`consent-checkbox-${file.id}`}
                                          className="text-sm text-gray-700"
                                        >
                                          {isConsentProvided
                                            ? "Consent received. The petition will be filed accordingly"
                                            : "Provide your consent to proceed with filing the petition."}
                                        </label>
                                      </div>

                                      {!isConsentProvided && !isPending && (
                                        <Button
                                          onClick={() =>
                                            setOpenRemarkDialog(
                                              !isConsentProvided
                                            )
                                          }
                                          className={`flex items-center font-normal cursor-pointer text-sm w-20 p-2 justify-center gap-2 ${blur} active:scale-95 ease-in-out transition-all duration-300 text-white h-6 rounded-none ${
                                            file.is_consent_provided
                                              ? "bg-green-700 pointer-events-none"
                                              : "bg-black hover:bg-black/80"
                                          }`}
                                        >
                                          {file.is_consent_provided
                                            ? "Accepted"
                                            : "Accept"}
                                          {file.is_consent_provided && (
                                            <ApprovedIcon />
                                          )}
                                        </Button>
                                      )}
                                      {isPending && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <div className="col-span-full text-center text-lg h-full flex items-center justify-center">
                              <div className="flex items-center justify-center w-full h-[calc(100%-70px)]">
                                Draft document will upload by your Advocate
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <GetCaseNotes />
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <PendingStepOverlay title={prevSubStage} />
      )}
      <ApproveDialog
        icon={<ApproveLogo />}
        open={openRemarkDialog}
        onOpenChange={setOpenRemarkDialog}
        remarks={remarks}
        setRemarks={setRemarks}
        title="Accept Draft Review"
        message="Please review the draft and confirm to proceed. If you have any remarks enter below."
        onCancel={() => {
          (setOpenRemarkDialog(false), setRemarks(""));
        }}
        isPending={isPendingAddCaseBrief}
        onConfirm={() => handleConsentChange(true)}
        requireRemarks={true}
        disabled={isPendingAddCaseBrief || isPending}
      />
    </div>
  );
};

export default DraftReview;
