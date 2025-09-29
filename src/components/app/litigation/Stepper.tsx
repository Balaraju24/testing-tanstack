import ActiveStatus from "@/components/icons/active-status";
import ApprovedIcon from "@/components/icons/approved-Icon";
import CurrentIcon from "@/components/icons/current-icon";
import PendingIcon from "@/components/icons/pending-icon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCaseStagesAPI } from "@/http/services/litigations";
import { labelStage } from "@/lib/constants/statusConstants";
import { CaseStageResponse, StepperProps } from "@/lib/interfaces/stepper";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { X } from "lucide-react";
import React, { useState } from "react";

const Stepper = ({
  currentStage,
  stages,
  caseId,
  className,
  service_type,
}: StepperProps) => {
  const navigate = useNavigate();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);

  const fetchSubStages = async (
    stageId: number
  ): Promise<CaseStageResponse> => {
    const queryParams = { case_id: caseId };
    const response = await getCaseStagesAPI(queryParams);
    if (response.status === 200 || response.status === 201) {
      return response?.data;
    }
    throw new Error("Failed to fetch sub-stages");
  };

  const {
    isLoading,
    data: caseStages,
    error,
  } = useQuery({
    queryKey: ["subStages", caseId, selectedStageId],
    queryFn: () => fetchSubStages(selectedStageId!),
    enabled: !!selectedStageId,
    refetchOnWindowFocus: false,
  });

  const generateRoutes = React.useMemo(() => {
    if (
      !stages ||
      !Array.isArray(stages.stages) ||
      stages.stages.length === 0
    ) {
      return [];
    }

    const stageList = [...stages.stages].sort((a, b) => a.order - b.order);
    const subStagesArray = caseStages?.data?.sub_stages || [];

    const getSubStagesForStage = (stageCode: string) =>
      Array.isArray(subStagesArray)
        ? subStagesArray
            .filter((sub) => sub.code.startsWith(`${stageCode}#`))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((sub) => ({
              name: sub.code,
              label: sub.title,
              path: `/cases/${caseId}/manage`,
              user_path: `/cases/${caseId}/user/manage`,
              status: sub.status || "pending",
            }))
        : [];

    return stageList.map((stage) => {
      const stageTitle =
        labelStage[stage.code as keyof typeof labelStage] || stage.title;
      const subSteps = getSubStagesForStage(stage.code);
      return {
        title: stageTitle,
        value: stage.code,
        status: stage.status,
        subSteps,
      };
    });
  }, [stages, caseStages, caseId]);

  const routes = generateRoutes;
  const currentStep = routes.findIndex((route) => route.value === currentStage);
  const isActive = (index: number) => index <= currentStep;
  const isFinalStep = (index: number) => index === routes.length - 1;
  const isFirst = (index: number) => index === 0;
  const isNext = (index: number) => index === currentStep;

  const handleStageClick = (index: number) => {
    setSelectedStageId(index + 1);
    setOpenPopoverIndex(index);
  };

  const handleRouteClick = (route: any) => {
    const [stage, subStage] = route.name.split("#");
    if (service_type === "Legal opinion") {
      sessionStorage.setItem("case-origin", "legal-opinion");
      navigate({
        to: `/legal-opinion/service/${caseId}/manage`,
        search: { stage, sub_stage: route.name },
      });
    } else {
      sessionStorage.setItem("case-origin", "litigation");
      navigate({
        to: `/litigations/service/${caseId}/manage`,
        search: { stage, sub_stage: route.name },
      });
    }

    setOpenPopoverIndex(null);
  };

  if (!stages || !Array.isArray(stages.stages) || stages.stages.length === 0) {
    return null;
  }
  if (error) {
    return null;
  }

  return (
    <div className={`flex items-center w-full px-2 ${className || ""}`}>
      {routes.map((route, index) => {
        const stageStatus = route.status;
        const isRouteActive = isActive(index);
        const isRouteNext = isNext(index);

        return (
          <React.Fragment key={route.value}>
            <Tooltip
              open={openPopoverIndex === index}
              onOpenChange={(isOpen) => {
                setOpenPopoverIndex(isOpen ? index : null);
                if (isOpen) {
                  setSelectedStageId(index + 1);
                }
              }}
            >
              <div className="relative">
                {isRouteActive || isRouteNext ? (
                  <TooltipTrigger asChild>
                    <Button
                      aria-label={`Stage ${index + 1}: ${route.title}, status: ${stageStatus}`}
                      className={clsx(
                        "w-5 h-5 3xl:h-7 3xl:w-7 relative z-30 !px-0 !py-0 shrink-0 text-xs 3xl:text-sm flex items-center justify-center rounded-full",
                        !isFirst(index) && "-ml-2",
                        stageStatus === "completed" &&
                          "bg-green-600 hover:bg-green-600 rounded-full text-xs text-white cursor-pointer",
                        stageStatus === "progress" &&
                          "bg-white border-2  border-orange-400 text-orange-400 hover:bg-white cursor-pointer",
                        !isRouteActive &&
                          !isRouteNext &&
                          "bg-gray-300 hover:bg-gray-300 text-gray-400 cursor-not-allowed"
                      )}
                      disabled={!isRouteActive && !isRouteNext}
                      onClick={() => handleStageClick(index)}
                    >
                      {stageStatus === "completed" ? (
                        <ActiveStatus className="text-white" />
                      ) : stageStatus === "progress" ? (
                        <div className="text-orange-400">{index + 1}</div>
                      ) : (
                        <div className="text-white">{index + 1}</div>
                      )}
                    </Button>
                  </TooltipTrigger>
                ) : (
                  <Button
                    aria-label={`Stage ${index + 1}: ${route.title}, status: ${stageStatus}`}
                    className={clsx(
                      "w-5 h-5 3xl:h-7 3xl:w-7 px-0 py-0 shrink-0 text-xs 3xl:text-sm relative z-20 flex items-center justify-center rounded-full",
                      !isFirst(index) && "-ml-2",
                      "bg-gray-300 hover:bg-gray-300 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    <div>{index + 1}</div>
                  </Button>
                )}
                {(isRouteActive || isRouteNext) && (
                  <TooltipContent
                    className="bg-white rounded-none p-2 ml-6 w-64 font-primary space-y-1"
                    onMouseEnter={() => setOpenPopoverIndex(index)}
                    onMouseLeave={() => setOpenPopoverIndex(null)}
                  >
                    <div className="flex justify-between gap-4 w-full items-center">
                      <div className="text-sm font-medium">{route.title}</div>
                      {isLoading ? (
                        <div className="animate-spin rounded-full border-2 border-gray-300 border-t-transparent h-4 w-4" />
                      ) : (
                        <Button
                          className="bg-transparent hover:bg-transparent h-fit w-fit px-1 py-1 cursor-pointer"
                          onClick={() => setOpenPopoverIndex(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {route.subSteps.length === 0
                        ? null
                        : route.subSteps.map((subStep, subIndex) => (
                            <div
                              key={subIndex}
                              className="flex gap-1 group p-1 cursor-pointer hover:bg-gray-100 items-center"
                              onClick={() => handleRouteClick(subStep)}
                            >
                              <div className="[&_svg]:size-3 text-green-600">
                                {subStep.status === "completed" ? (
                                  <ApprovedIcon />
                                ) : subStep.status === "progress" ? (
                                  <CurrentIcon />
                                ) : (
                                  <PendingIcon />
                                )}
                              </div>
                              <div className="text-xs">{subStep.label}</div>
                            </div>
                          ))}
                    </div>
                  </TooltipContent>
                )}
              </div>
            </Tooltip>
            {!isFinalStep(index) && (
              <div
                className={clsx(
                  "z-10 -ml-2 h-1.5 grow relative",
                  stageStatus === "completed" && "bg-green-600",
                  (stageStatus === "progress" || !isActive(index + 1)) &&
                    "bg-gray-300"
                )}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
