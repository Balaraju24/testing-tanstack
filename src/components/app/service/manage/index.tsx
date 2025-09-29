import { CaseCompletionProvider } from "@/components/context/CaseCompletion";
import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import CaseClosureIcon from "@/components/icons/CaseClosureIcon";
import CaseFilingIcon from "@/components/icons/CaseFilingIcon";
import NoticeIcon from "@/components/icons/NoticeIcon";
import CourtProceedingsIcon from "@/components/icons/court-proceedings-icon";
import DefaultAppereance from "@/components/icons/default-appereance-icon";
import DraftLegalNoticeIcon from "@/components/icons/draft-legal-notice-icon";
import EnforcementIcon from "@/components/icons/enforcement-icon";
import FileUploadIcon from "@/components/icons/file-upload-icon";
import LegalNoticeIcon from "@/components/icons/legal-notice-icon";
import LockIcon from "@/components/icons/lock-icon";
import MediationIcon from "@/components/icons/mediation-icon";
import NotesEditIcon from "@/components/icons/notes-edit-icon";
import OnBoardingIcon from "@/components/icons/on-boarding-icon";
import PreBoardingIcon from "@/components/icons/pre-boarding-icon";
import ProcessOfExcutionIcon from "@/components/icons/process-of-excution-icon";
import QueriesIcon from "@/components/icons/queries-icon";
import ReportingIcon from "@/components/icons/reporting-icon";
import SendLegalNoticeIcon from "@/components/icons/send-legal-notice-icon";
import SettlementProposalIcon from "@/components/icons/settlement-proposal-icon";
import SubmissionOfStatementIcon from "@/components/icons/submission-of-statements";
import TrailPhaseIcon from "@/components/icons/trail-phase-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SubStepRoute } from "@/lib/interfaces/manage";
import {
  findNextPendingSubStage,
  getNextStageSubStage,
  isSubStageAccessible,
  navigateTo,
} from "@/utils/helpers/manage";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { UserDynamicComponent } from "../user-manage/UserDynamicComponent";
import { DynamicComponent } from "./DynamicComponent";
import StageIcon from "./StageIcon";
import SubStepButton from "./SubStepButton";

const SKIPPABLE_SUB_STAGES = new Set(["ONBD#UIDA"]);
const STAGE_ICONS: Record<string, JSX.Element> = {
  PRBD: <PreBoardingIcon className="xl:size-7 2xl:size-6" />,
  ONBD: <OnBoardingIcon className="xl:size-7 2xl:size-6" />,
  CSFG: <CaseFilingIcon className="xl:size-7 2xl:size-6" />,
  CTPG: <CourtProceedingsIcon className="xl:size-7 2xl:size-6" />,
  TRPH: <TrailPhaseIcon className="xl:size-7 2xl:size-6" />,
  CSCR: <CaseClosureIcon className="xl:size-7 2xl:size-6" />,
  ENFR: <EnforcementIcon className="xl:size-7 2xl:size-6" />,
  PSEX: <ProcessOfExcutionIcon className="xl:size-7 2xl:size-6" />,
  NTCE: <NoticeIcon className="xl:size-7 2xl:size-6" />,
  DFAP: <DefaultAppereance className="xl:size-7 2xl:size-6" />,
  MDTN: <MediationIcon className="xl:size-7 2xl:size-6" />,
  SMST: <SubmissionOfStatementIcon className="xl:size-7 2xl:size-6" />,
  STPR: <SettlementProposalIcon className="xl:size-7 2xl:size-6" />,
  FIUP: <FileUploadIcon className="xl:size-7 2xl:size-6" />,
  VEFI: <PreBoardingIcon className="xl:size-7 2xl:size-6" />,
  QURI: <QueriesIcon className="xl:size-7 2xl:size-6" />,
  REPO: <ReportingIcon className="xl:size-7 2xl:size-6" />,
  LGNT: <LegalNoticeIcon className="xl:size-7 2xl:size-6" />,
  SLNT: <SendLegalNoticeIcon className="xl:size-7 2xl:size-6" />,
  DLNT: <DraftLegalNoticeIcon className="xl:size-7 2xl:size-6" />,
};

const getStageIcon = (stageValue: string) => STAGE_ICONS[stageValue] ?? null;

const ManageComponent = () => {
  const { service_id } = useParams({ strict: false });
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const hasNavigatedRef = useRef(false);
  const pendingNavigationRef = useRef<{
    stage: string;
    sub_stage: string;
  } | null>(null);

  const [openAccordion, setOpenAccordion] = useState<string>(
    search.stage || ""
  );
  const { isUser, isManager, isAdvocate, isAdmin } = useUserDetails();
  const { caseStagesIsLoading, caseStagesData, serviceData } = UseContextAPI();
  const isLegalOpinion = serviceData?.service_type === "Legal opinion";
  const isLitigation = serviceData?.service_type === "Litigation";

  const stages: any[] = Array.isArray(caseStagesData?.stages)
    ? caseStagesData.stages
    : caseStagesData?.stages && typeof caseStagesData.stages === "object"
      ? Object.entries(caseStagesData.stages).map(([code, status]) => ({
          code,
          status,
        }))
      : [];

  const sub_stages: any[] = Array.isArray(caseStagesData?.sub_stages)
    ? caseStagesData.sub_stages
    : caseStagesData?.sub_stages &&
        typeof caseStagesData.sub_stages === "object"
      ? Object.entries(caseStagesData.sub_stages).map(
          ([code, value]: [string, any]) => ({
            code,
            ...(typeof value === "object" ? value : { status: value }),
          })
        )
      : [];
  const subStagesObj = useMemo(
    () =>
      Object.fromEntries(sub_stages.map((sub: any) => [sub.code, sub.status])),
    [sub_stages]
  );

  const stagesObj = useMemo(
    () =>
      Object.fromEntries(
        stages.map((stage: any) => [stage.code, stage.status])
      ),
    [stages]
  );

  const newmappedData = useMemo(() => {
    return stages?.reduce(
      (acc, stage) => {
        const subStagesForStage = sub_stages
          .filter((sub) => sub.code.startsWith(`${stage.code}#`))
          .sort((a, b) => a.order - b.order)
          .map((sub) => ({
            [sub.code.split("#")[1]]: {
              title: sub?.title,
              status: sub?.status,
            },
          }));

        acc[stage.code] = {
          status: stage?.status,
          title: stage?.title,
          sub_stages: subStagesForStage,
        };

        return acc;
      },
      {} as Record<
        string,
        {
          status: string;
          title: string;
          sub_stages: Record<string, { title: string; status: string }>[];
        }
      >
    );
  }, [stages, sub_stages]);

  const newRoutes = useMemo(() => {
    return stages.map((stage: any) => ({
      title: stage.title,
      value: stage.code,
      icon: getStageIcon,
      status: stage.status,
      subSteps: sub_stages
        .filter((sub: any) => sub.code.startsWith(`${stage.code}#`))
        .sort((a: any, b: any) => a.order - b.order)
        .map((sub: any) => ({
          name: sub.code,
          label: sub.title,
          status: sub.status,
          order: sub.order,
        })),
    }));
  }, [stages, sub_stages]);

  const allSubStages = useMemo(
    () =>
      newRoutes.flatMap((route) =>
        route.subSteps.map((subStep: any) => ({
          stage: route.value,
          subStage: subStep.name,
          status: subStep.status,
        }))
      ),
    [newRoutes]
  );

  const handleRouteClick = (route: SubStepRoute) => {
    const [stage] = route.name.split("#");
    setOpenAccordion(stage);
    hasNavigatedRef.current = true;
    navigateTo(
      navigate,
      service_id!,
      isUser,
      stage,
      route.name,
      isLegalOpinion,
      isLitigation
    );
  };
  const handleSubStageComplete = (completedSubStage: string) => {
    const updatedSubStages = sub_stages.map((sub: any) =>
      sub.code === completedSubStage ? { ...sub, status: "completed" } : sub
    );
    const currentIndex = allSubStages.findIndex(
      (s) => s.subStage === completedSubStage
    );

    const currentStage = allSubStages[currentIndex]?.stage;

    if (!currentStage) return;

    const stageSubStages = allSubStages.filter((s) => s.stage === currentStage);

    const isStageComplete = stageSubStages.every(
      (s) =>
        SKIPPABLE_SUB_STAGES.has(s.subStage) ||
        updatedSubStages.find((sub: any) => sub.code === s.subStage)?.status ===
          "completed"
    );

    let next: { stage: string; sub_stage: string } | null = null;

    // First, check for incomplete sub-stages in the current stage
    const nextPendingInCurrentStage = stageSubStages.find(
      (s) =>
        !SKIPPABLE_SUB_STAGES.has(s.subStage) &&
        updatedSubStages.find((sub: any) => sub.code === s.subStage)?.status !==
          "completed"
    );

    if (nextPendingInCurrentStage) {
      next = {
        stage: currentStage,
        sub_stage: nextPendingInCurrentStage.subStage,
      };
    }
    // If the current stage is complete, move to the next stage
    else if (isStageComplete) {
      next = getNextStageSubStage(currentStage, newRoutes);
    }
    // Fallback: Find the next pending sub-stage across all stages
    if (!next) {
      next = findNextPendingSubStage(
        completedSubStage,
        // updatedSubStages,
        Object.fromEntries(
          updatedSubStages.map((sub: any) => [sub.code, sub.status])
        ),
        allSubStages,
        newRoutes
      );
    }
    // Final fallback: Navigate to the last non-skippable sub-stage
    if (!next) {
      const lastRoute = newRoutes[newRoutes.length - 1];
      const lastSubStage = lastRoute.subSteps.find(
        (s: any) => !SKIPPABLE_SUB_STAGES.has(s.name)
      );
      if (lastSubStage) {
        next = { stage: lastRoute.value, sub_stage: lastSubStage.name };
      }
    }

    if (next) {
      setOpenAccordion(next.stage);
      pendingNavigationRef.current = next;
      hasNavigatedRef.current = true;
    }
  };

  const handleStageComplete = (completedStage: string) => {
    const updatedSubStages = { ...sub_stages };
    const stageSubStages = allSubStages.filter(
      (s) => s.stage === completedStage
    );
    stageSubStages.forEach((s) => {
      updatedSubStages[s.subStage] = "completed";
    });

    const next = getNextStageSubStage(completedStage, newRoutes);

    if (next) {
      setOpenAccordion(next.stage);
      pendingNavigationRef.current = next;
      hasNavigatedRef.current = true;
    } else {
      const currentRoute = newRoutes.find((r) => r.value === completedStage);

      if (currentRoute) {
        const lastSubStage = currentRoute.subSteps.find(
          (s: any) => !SKIPPABLE_SUB_STAGES.has(s.name)
        );
        if (lastSubStage) {
          setOpenAccordion(completedStage);
          pendingNavigationRef.current = {
            stage: completedStage,
            sub_stage: lastSubStage.name,
          };
          hasNavigatedRef.current = true;
        }
      }
    }
  };

  const handleCaseClose = () => {
    const lastRoute = newRoutes[newRoutes.length - 1];
    const lastSubStage = lastRoute?.subSteps
      .slice()
      .reverse()
      .find((s: any) => !SKIPPABLE_SUB_STAGES.has(s.name));

    if (!lastRoute || !lastSubStage) return;

    const updatedStages = { ...stages };
    const updatedSubStages = { ...sub_stages };

    newRoutes.forEach((route) => {
      updatedStages[route.value] = "completed";
    });

    allSubStages.forEach((s) => {
      if (s.stage !== lastRoute.value || s.subStage !== lastSubStage.name) {
        updatedSubStages[s.subStage] = "completed";
      }
    });

    setOpenAccordion(lastRoute.value);
    pendingNavigationRef.current = {
      stage: lastRoute.value,
      sub_stage: lastSubStage.name,
    };
    hasNavigatedRef.current = true;
  };

  useEffect(() => {
    if (pendingNavigationRef.current) {
      const { stage, sub_stage } = pendingNavigationRef.current;
      navigateTo(
        navigate,
        service_id!,
        isUser,
        stage,
        sub_stage,
        isLegalOpinion,
        isLitigation
      );
      pendingNavigationRef.current = null;
    }
  }, [openAccordion, service_id, isUser, navigate]);

  const isActiveSubstep = (subStepName: string) =>
    search.sub_stage === subStepName;

  const isPreviousStageCompleted = (index: number) =>
    index === 0 || newRoutes[index - 1].status === "completed";

  useEffect(() => {
    if (
      hasNavigatedRef.current ||
      !caseStagesData ||
      !Object.keys(sub_stages).length
    )
      return;

    const allSubStagesCompleted = allSubStages.every(
      ({ subStage }) =>
        SKIPPABLE_SUB_STAGES.has(subStage) ||
        sub_stages[subStage] === "completed"
    );

    if (allSubStagesCompleted) {
      const lastSubStage = allSubStages
        .slice()
        .reverse()
        .find(({ subStage }) => !SKIPPABLE_SUB_STAGES.has(subStage));
      if (lastSubStage) {
        setOpenAccordion(lastSubStage.stage);
        hasNavigatedRef.current = true;
        navigateTo(
          navigate,
          service_id!,
          isUser,
          lastSubStage.stage,
          lastSubStage.subStage,
          isLegalOpinion,
          isLitigation
        );
      }
      return;
    }

    if (
      search.stage &&
      search.sub_stage &&
      allSubStages.some((s) => s.subStage === search.sub_stage)
    ) {
      if (isSubStageAccessible(search.stage, newRoutes, stagesObj)) {
        setOpenAccordion(search.stage);
        hasNavigatedRef.current = true;
        return;
      }
    }

    const next = findNextPendingSubStage(
      undefined,
      subStagesObj,
      allSubStages,
      newRoutes
    );
    if (next) {
      setOpenAccordion(next.stage);
      hasNavigatedRef.current = true;
      navigateTo(
        navigate,
        service_id!,
        isUser,
        next.stage,
        next.sub_stage,
        isLegalOpinion,
        isLitigation
      );
    }
  }, [
    caseStagesData,
    service_id,
    isUser,
    navigate,
    search.stage,
    search.sub_stage,
    allSubStages,
    stages,
    newRoutes,
  ]);

  useEffect(() => {
    if (search.stage) {
      setOpenAccordion(search.stage);
    }
  }, [search.stage]);

  return (
    <CaseCompletionProvider
      onSubStageComplete={handleSubStageComplete}
      onStageComplete={handleStageComplete}
      onCaseClose={handleCaseClose}
    >
      {caseStagesIsLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingComponent
            loading={caseStagesIsLoading}
            message="Loading Case Stages..."
            className="bg-opacity-100"
          />
        </div>
      ) : (
        <div className="flex gap-x-2 h-full items-start overflow-auto">
          <Accordion
            type="single"
            value={openAccordion}
            onValueChange={setOpenAccordion}
            collapsible
            className="xl:w-[30%] shrink-0 2xl:w-1/4 h-[calc(100vh-135px)] px-1 py-0 overflow-x-hidden overflow-y-auto"
          >
            {newRoutes.map((route, index) => {
              const isPreviousCompleted = isPreviousStageCompleted(index);
              const stageStatus =
                newmappedData[route.value]?.status || "pending";
              const currentPendingSubStage = route.subSteps?.find(
                (subStep: any) => subStep.status === "pending"
              );
              return (
                <div key={route.value}>
                  <AccordionItem
                    value={route.value}
                    disabled={!isPreviousCompleted}
                    className="w-full data-[state=closed]:bg-white data-[state=open]:bg-gray-100 p-1.5 border border-gray-300 "
                  >
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger className="w-full" asChild>
                          <AccordionTrigger className="flex items-center w-full justify-between cursor-pointer">
                            <div className="text-sm font-normal flex items-center gap-2">
                              <StageIcon
                                status={stageStatus}
                                icon={getStageIcon(route.value)}
                                name={route.value}
                                currentPendingSubStage={
                                  currentPendingSubStage?.name
                                }
                              />
                              <div className="xl:text-xs 2xl:text-md">
                                {route.title}
                              </div>
                            </div>
                            {isPreviousCompleted ? (
                              <>
                                {(route.value === "TRPH" ||
                                  route.value === "CTPG" ||
                                  route.value === "PSEX" ||
                                  route.value === "NTCE" ||
                                  route.value === "DFAP" ||
                                  route.value === "MDTN" ||
                                  route.value === "SMST" ||
                                  route.value === "STPR" ||
                                  route.value === "PSEX" ||
                                  route.value === "LGNT" ||
                                  route.value === "ENFR") &&
                                (isAdvocate() || isManager() || isAdmin()) ? (
                                  openAccordion === route.value ? (
                                    route.status !== "completed" ? (
                                      <Button
                                        asChild
                                        type="button"
                                        className="w-5 rounded bg-transparent !shadow-none cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate({
                                            to: `/litigations/add-sub-stage?case_id=${service_id}&stage=${route.value}`,
                                          });
                                        }}
                                      >
                                        <NotesEditIcon className="w-4 h-4 cursor-pointer" />
                                      </Button>
                                    ) : (
                                      <></>
                                    )
                                  ) : (
                                    <ChevronDown />
                                  )
                                ) : (
                                  <ChevronDown />
                                )}
                              </>
                            ) : (
                              <LockIcon />
                            )}
                          </AccordionTrigger>
                        </TooltipTrigger>
                        {!isPreviousCompleted && (
                          <TooltipContent className="bg-white w-64">
                            <p>
                              This step cannot be accessed until the previous
                              step is successfully completed.
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                    <AccordionContent>
                      {route.subSteps.map((subStep: any, subIndex: any) => {
                        const subStageObj = newmappedData[
                          route.value
                        ]?.sub_stages.find(
                          (item: any) => item[subStep.name.split("#")[1]]
                        )?.[subStep.name.split("#")[1]];

                        const subStageStatus = subStageObj?.status || "pending";

                        return (
                          <div key={subStep.name}>
                            <SubStepButton
                              subStep={subStep}
                              isActive={isActiveSubstep(subStep.name)}
                              status={subStageStatus}
                              disabled={!isPreviousCompleted}
                              onClick={() => handleRouteClick(subStep)}
                            />
                            {subIndex < route.subSteps.length - 1 && (
                              <div className="h-4 w-1 border-l ml-4 border-dashed border-gray-300 "></div>
                            )}
                          </div>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                  {index < newRoutes.length - 1 && (
                    <div className="h-6 w-1 border-l ml-4 border-dashed border-gray-300 "></div>
                  )}
                </div>
              );
            })}
          </Accordion>
          <div className="h-[calc(100vh-135px)] overflow-x-hidden overflow-y-auto grow border border-gray-200">
            {isUser() ? (
              <UserDynamicComponent
                stage={search.stage}
                subStage={search.sub_stage}
                mappedCaseStagesData={newmappedData}
              />
            ) : (
              <DynamicComponent
                stage={search.stage}
                subStage={search.sub_stage}
                mappedCaseStagesData={newmappedData}
              />
            )}
          </div>
        </div>
      )}
    </CaseCompletionProvider>
  );
};

export default ManageComponent;
