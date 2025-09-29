import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  DynamicComponentProps,
  ManageSubStage,
  StageRoute,
} from "../../lib/interfaces/manage";

dayjs.extend(utc);
dayjs.extend(tz);

export const formatDate = (dateString?: string | Date) => {
  if (!dateString) return "--";

  const date = dayjs.utc(dateString).tz("Asia/Kolkata");
  return date.format("DD MMM YYYY");
};

export const formatDateWithTime = (dateString?: string) => {
  if (!dateString) return "--";

  const date = dayjs.utc(dateString).tz("Asia/Kolkata");
  return date.format("DD MMM YYYY  hh:mm A");
};

export const sliceFilename = (filename: string, maxLength: number): string => {
  if (filename.length <= maxLength) {
    return filename;
  }

  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1 || dotIndex === 0) {
    return filename.slice(0, maxLength) + "...";
  }

  const name = filename.slice(0, dotIndex);
  const ext = filename.slice(dotIndex);

  const allowedNameLength = maxLength - ext.length;

  if (allowedNameLength <= 0) {
    return filename.slice(0, maxLength) + "...";
  }

  return name.slice(0, allowedNameLength) + "..." + ext;
};

export default function getSubStageStatuses({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) {
  const stageData = stage && mappedCaseStagesData?.[stage];
  if (!stageData || !Array.isArray(stageData.sub_stages)) {
    return {
      isPrevSubStageCompleted: false,
      isCurrentSubStageCompleted: false,
    };
  }

  const subStages = stageData.sub_stages;
  const sub_stage = subStage?.split("#")[1];

  const currentIndex = subStages.findIndex(
    (value: any) => Object.keys(value)[0] === sub_stage
  );

  if (currentIndex === -1) {
    return {
      isPrevSubStageCompleted: false,
      isCurrentSubStageCompleted: false,
    };
  }

  let subStageKey = "";
  let subStageValue: { title: string; status: string } | undefined = undefined;
  if (currentIndex > 0) {
    [subStageKey, subStageValue] = Object.entries(
      subStages[currentIndex - 1]
    )[0] as [string, { title: string; status: string }];
  }

  const [currentSubStageKey, currentSubStageValue] = Object.entries(
    subStages[currentIndex]
  )[0] as [string, { title: string; status: string }];

  const isPrevSubStageCompleted =
    currentIndex === 0 ||
    (subStageValue && subStageValue.status === "completed");

  const isCurrentSubStageCompleted =
    currentSubStageValue.status === "completed";

  return {
    isPrevSubStageCompleted,
    isCurrentSubStageCompleted,
    subStageLabel: `${stage}#${subStageKey}`,
  };
}

const SKIPPABLE_SUB_STAGES = new Set(["ONBD#UIDA"]);

export const findNextPendingSubStage = (
  currentSubStage: string | undefined,
  subStages: Record<string, string | null>,
  allSubStages: ManageSubStage[],
  routes: StageRoute[]
): { stage: string; sub_stage: string } | null => {
  if (!allSubStages.length) return null;

  const findFirstNonSkippable = () =>
    allSubStages.find(({ subStage }) => !SKIPPABLE_SUB_STAGES.has(subStage)) ??
    null;

  if (!currentSubStage) {
    const firstPending = allSubStages.find(
      ({ subStage }) =>
        !SKIPPABLE_SUB_STAGES.has(subStage) &&
        subStages[subStage] !== "completed"
    );
    return firstPending
      ? { stage: firstPending.stage, sub_stage: firstPending.subStage }
      : findFirstNonSkippable()
        ? {
            stage: findFirstNonSkippable()!.stage,
            sub_stage: findFirstNonSkippable()!.subStage,
          }
        : null;
  }

  const currentIndex = allSubStages.findIndex(
    ({ subStage }) => subStage === currentSubStage
  );
  if (currentIndex === -1) {
    const firstNonSkippable = findFirstNonSkippable();
    return firstNonSkippable
      ? {
          stage: firstNonSkippable.stage,
          sub_stage: firstNonSkippable.subStage,
        }
      : null;
  }

  for (let i = currentIndex + 1; i < allSubStages.length; i++) {
    const { stage, subStage } = allSubStages[i];
    if (SKIPPABLE_SUB_STAGES.has(subStage)) continue;
    if (subStages[subStage] !== "completed")
      return { stage, sub_stage: subStage };
  }

  const currentStage = allSubStages[currentIndex].stage;
  const stageSubStages = allSubStages.filter((s) => s.stage === currentStage);
  const isStageComplete = stageSubStages.every(
    (s) =>
      SKIPPABLE_SUB_STAGES.has(s.subStage) ||
      subStages[s.subStage] === "completed"
  );

  if (isStageComplete) {
    const nextStageIndex =
      routes.findIndex((r) => r.value === currentStage) + 1;
    const nextStage = routes[nextStageIndex];
    if (nextStage) {
      const nextSubStage = nextStage.subSteps.find(
        (s) => !SKIPPABLE_SUB_STAGES.has(s.name)
      );
      if (nextSubStage)
        return { stage: nextStage.value, sub_stage: nextSubStage.name };
    }
  }

  const lastNonSkippable = allSubStages
    .slice()
    .reverse()
    .find(({ subStage }) => !SKIPPABLE_SUB_STAGES.has(subStage));
  return lastNonSkippable
    ? { stage: lastNonSkippable.stage, sub_stage: lastNonSkippable.subStage }
    : null;
};

export const isSubStageAccessible = (
  stage: string,
  routes: StageRoute[],
  stages: Record<string, string | null>
) => {
  const routeIndex = routes.findIndex((r) => r.value === stage);
  if (routeIndex <= 0) return true;
  return routes
    .slice(0, routeIndex)
    .every((r) => stages[r.value] === "completed");
};

export const getNextStageSubStage = (
  currentStage: string,
  routes: StageRoute[]
) => {
  const currentIndex = routes.findIndex((r) => r.value === currentStage);
  const nextStage = routes[currentIndex + 1];
  return nextStage?.subSteps[0]
    ? { stage: nextStage.value, sub_stage: nextStage.subSteps[0].name }
    : null;
};

export const navigateTo = (
  navigate: ReturnType<typeof useNavigate>,
  caseId: string,
  isUser: () => boolean,
  stage: string,
  subStage: string,
  isLegalOpinion: boolean,
  isLitigation: boolean
) => {
  let basePath = "";

  if (isLegalOpinion) {
    basePath = "/legal-opinion/service";
  } else {
    basePath = "/litigations/service";
  }

  const fullPath = isUser()
    ? `${basePath}/${caseId}/user/manage`
    : `${basePath}/${caseId}/manage`;

  navigate({
    to: fullPath,
    search: { stage, sub_stage: subStage },
    replace: true,
  });
};
