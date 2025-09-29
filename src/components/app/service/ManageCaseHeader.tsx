import { useCaseCompletion } from "@/components/context/CaseCompletion";
import { UseContextAPI } from "@/components/context/Provider";
import ApproveDialog from "@/components/core/ApproveDialog";
import SuccessAnimation from "@/components/core/SuccessAnimation";
import ApprovedIcon from "@/components/icons/approved-Icon";
import CompleteLogo from "@/components/icons/complete-logo";
import NotesCloseIcon from "@/components/icons/notes-close-icon";
import UploadIcon from "@/components/icons/upload-icon";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CaseStageStatus } from "@/http/services/manage";
import { getAllTodoCountsAPI } from "@/http/services/notification";
import { singleServiceAPI } from "@/http/services/service";
import { ManageCaseHeaderProps } from "@/lib/interfaces/service";
import { cn } from "@/lib/utils";
import { getSubStageTitle, isSubStageCompleted } from "@/utils/helpers/files";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import MultiPartUploadComponent from "./manage/multipart-upload";
import ServiceCaseHistory from "./manage/ServiceCaseHistory";
import CaseNotes from "./manage/ServiceCaseNotes";

const ManageCaseHeader: React.FC<ManageCaseHeaderProps> = ({
  showActionButton,
  caseStage,
  caseSubStage,
  blur,
  showUploadButton = true,
  showNoteButton = true,
  showSummaryButton = true,
}) => {
  const { service_id } = useParams({ strict: false });
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const [showDemoSuccess, setShowDemoSuccess] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isUser } = useUserDetails();
  const { completeSubStage } = useCaseCompletion();
  const {
    caseStagesData,
    caseStagesIsLoading,
    getCaseStagesRefetch,
    getAllDocsRefetch,
    serviceData,
  } = UseContextAPI();

  const subStage = search.sub_stage;
  const isLegalOpinion = serviceData?.service_type === "Legal opinion";
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );
  const subStageTitle = getSubStageTitle(caseStagesData?.sub_stages, subStage);

  const shouldShowCaseSummary =
    !isCurrentStageCompleted &&
    showSummaryButton &&
    !isUser() &&
    !isLegalOpinion;

  // single case Details
  const { data: singleCaseDetails, refetch: refetchSingleCaseDetails } =
    useQuery({
      queryKey: ["single-service-details", service_id],
      enabled: false,
      refetchOnWindowFocus: false,
      queryFn: async () => {
        try {
          if (!service_id) return;
          const response = await singleServiceAPI(service_id as string);
          if (response.status === 200 || response.status === 201) {
            const { data } = response?.data;
            return data;
          }
        } catch {
          throw new Error("Failed to fetch case data");
        }
      },
    });

  //  TODO Unread count
  const { refetch: refetchTodoCount } = useQuery({
    queryKey: ["TodoCounts", service_id],
    queryFn: async () => {
      const response = await getAllTodoCountsAPI({ case_id: service_id });

      return response?.data?.data?.count || 0;
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: mutateCaseStageStatus, isPending: isUpdateCaseStage } =
    useMutation({
      mutationFn: async () => {
        const payload = {
          case_stage: caseStage,
          case_sub_stage: caseSubStage,
        };
        const response = await CaseStageStatus(service_id, payload);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        }
      },
      onSuccess: async () => {
        const updatedStages = await getCaseStagesRefetch();
        refetchSingleCaseDetails();
        refetchTodoCount();
        completeSubStage(subStage!);

        if (
          updatedStages?.data?.stages?.every(
            (s: any) => s.status === "completed"
          )
        ) {
          setShowDemoSuccess(true);
        }
      },
    });

  const handleCompleted = () => {
    toast.promise(mutateCaseStageStatus(), {
      loading: "Stage mark as complete...",
      success: "Stage marked as completed",
      error: "Stage marked as incomplete",
      action: {
        label: "✕",
        onClick: () => toast.dismiss(),
      },
    });
    setOpenComplete(false);
  };

  const handleUploadSuccess = () => {
    setIsDrawerOpen(false);
    getAllDocsRefetch();
  };

  return (
    <div className="flex justify-between items-center p-2  border-b border-gray-200">
      <h6
        className={`text-black text-md 3xl:text-lg font-normal capitalize ${blur} `}
      >
        {subStageTitle}
      </h6>
      <div className="flex  items-center gap-2 pl-2  ">
        {showActionButton && (
          <>
            <Button
              onClick={() => setOpenComplete(true)}
              className={`flex items-center text-xs w-36 justify-center gap-2 ${blur} active:scale-95 ease-in-out transition-all duration-300 text-white h-7 rounded-none ${
                isCurrentStageCompleted
                  ? "bg-green-700 pointer-events-none"
                  : "bg-black hover:bg-black/60"
              }`}
              disabled={isUpdateCaseStage}
            >
              {isCurrentStageCompleted ? "Completed" : "Mark as complete"}
              {isCurrentStageCompleted && <ApprovedIcon />}
            </Button>
            <ApproveDialog
              icon={<CompleteLogo />}
              open={openComplete}
              onOpenChange={setOpenComplete}
              title="Complete"
              message="Ensure all details are reviewed before marking this step as
                    completed."
              onCancel={() => setOpenComplete(false)}
              onConfirm={handleCompleted}
              disabled={caseStagesIsLoading}
            />
          </>
        )}

        {/* Upload Docs Drawer */}
        {!isCurrentStageCompleted &&
          showUploadButton &&
          search.sub_stage !== "FIUP#UPAF" && (
            <Drawer
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              direction="right"
            >
              <DrawerTrigger>
                <span
                  className={` px-1 py-1 -mt-0.5 ml-3  ${blur}  bg-gray-100 hover:bg-gray-200  flex items-center group justify-center cursor-pointer`}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-pointer">
                        <UploadIcon className="w-6 h-6 " />
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-xs text-white rounded-none">
                        Upload a file
                        <TooltipArrow />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </DrawerTrigger>
              <DrawerContent
                className={cn(
                  "fixed inset-y-0  inset-x-[auto_0] right-0 w-4/12 h-full  shadow-lg bg-white mt-0 rounded-none font-primary [>div]:none "
                )}
              >
                <DrawerHeader className="flex  ">
                  <DrawerTitle className="flex gap-2  "></DrawerTitle>
                  <div className="flex !justify-between gap-6">
                    <div className="flex  gap-1"></div>
                    <div className="">
                      <DrawerClose>
                        <NotesCloseIcon className="w-7 h-7 cursor-pointer" />
                      </DrawerClose>
                    </div>
                  </div>
                </DrawerHeader>
                <MultiPartUploadComponent
                  onUploadSuccess={handleUploadSuccess}
                />
              </DrawerContent>
            </Drawer>
          )}

        {!isCurrentStageCompleted && showNoteButton && !isUser() && (
          <CaseNotes />
        )}
        {shouldShowCaseSummary && <ServiceCaseHistory />}
      </div>
      <AnimatePresence>
        <SuccessAnimation
          isVisible={showDemoSuccess}
          title="Case Completed Successfully!"
          message={`All stages for case ${singleCaseDetails?.temp_id} are now completed.`}
          caseNumber={singleCaseDetails?.temp_id}
          onComplete={() =>
            navigate({ to: isLegalOpinion ? `/legal-opinion` : `/litigations` })
          }
        />
      </AnimatePresence>
    </div>
  );
};

export default ManageCaseHeader;
