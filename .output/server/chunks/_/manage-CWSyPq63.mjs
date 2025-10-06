import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);
dayjs.extend(tz);
const formatDate = (dateString) => {
  if (!dateString) return "--";
  const date = dayjs.utc(dateString).tz("Asia/Kolkata");
  return date.format("DD MMM YYYY");
};
const formatDateWithTime = (dateString) => {
  if (!dateString) return "--";
  const date = dayjs.utc(dateString).tz("Asia/Kolkata");
  return date.format("DD MMM YYYY  hh:mm A");
};
const sliceFilename = (filename, maxLength) => {
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
function getSubStageStatuses({
  stage,
  subStage,
  mappedCaseStagesData
}) {
  const stageData = stage && (mappedCaseStagesData == null ? void 0 : mappedCaseStagesData[stage]);
  if (!stageData || !Array.isArray(stageData.sub_stages)) {
    return {
      isPrevSubStageCompleted: false,
      isCurrentSubStageCompleted: false
    };
  }
  const subStages = stageData.sub_stages;
  const sub_stage = subStage == null ? void 0 : subStage.split("#")[1];
  const currentIndex = subStages.findIndex(
    (value) => Object.keys(value)[0] === sub_stage
  );
  if (currentIndex === -1) {
    return {
      isPrevSubStageCompleted: false,
      isCurrentSubStageCompleted: false
    };
  }
  let subStageKey = "";
  let subStageValue = void 0;
  if (currentIndex > 0) {
    [subStageKey, subStageValue] = Object.entries(
      subStages[currentIndex - 1]
    )[0];
  }
  const [currentSubStageKey, currentSubStageValue] = Object.entries(
    subStages[currentIndex]
  )[0];
  const isPrevSubStageCompleted = currentIndex === 0 || subStageValue && subStageValue.status === "completed";
  const isCurrentSubStageCompleted = currentSubStageValue.status === "completed";
  return {
    isPrevSubStageCompleted,
    isCurrentSubStageCompleted,
    subStageLabel: `${stage}#${subStageKey}`
  };
}
const SKIPPABLE_SUB_STAGES = /* @__PURE__ */ new Set(["ONBD#UIDA"]);
const findNextPendingSubStage = (currentSubStage, subStages, allSubStages, routes) => {
  if (!allSubStages.length) return null;
  const findFirstNonSkippable = () => {
    var _a;
    return (_a = allSubStages.find(({ subStage }) => !SKIPPABLE_SUB_STAGES.has(subStage))) != null ? _a : null;
  };
  if (!currentSubStage) {
    const firstPending = allSubStages.find(
      ({ subStage }) => !SKIPPABLE_SUB_STAGES.has(subStage) && subStages[subStage] !== "completed"
    );
    return firstPending ? { stage: firstPending.stage, sub_stage: firstPending.subStage } : findFirstNonSkippable() ? {
      stage: findFirstNonSkippable().stage,
      sub_stage: findFirstNonSkippable().subStage
    } : null;
  }
  const currentIndex = allSubStages.findIndex(
    ({ subStage }) => subStage === currentSubStage
  );
  if (currentIndex === -1) {
    const firstNonSkippable = findFirstNonSkippable();
    return firstNonSkippable ? {
      stage: firstNonSkippable.stage,
      sub_stage: firstNonSkippable.subStage
    } : null;
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
    (s) => SKIPPABLE_SUB_STAGES.has(s.subStage) || subStages[s.subStage] === "completed"
  );
  if (isStageComplete) {
    const nextStageIndex = routes.findIndex((r) => r.value === currentStage) + 1;
    const nextStage = routes[nextStageIndex];
    if (nextStage) {
      const nextSubStage = nextStage.subSteps.find(
        (s) => !SKIPPABLE_SUB_STAGES.has(s.name)
      );
      if (nextSubStage)
        return { stage: nextStage.value, sub_stage: nextSubStage.name };
    }
  }
  const lastNonSkippable = allSubStages.slice().reverse().find(({ subStage }) => !SKIPPABLE_SUB_STAGES.has(subStage));
  return lastNonSkippable ? { stage: lastNonSkippable.stage, sub_stage: lastNonSkippable.subStage } : null;
};
const isSubStageAccessible = (stage, routes, stages) => {
  const routeIndex = routes.findIndex((r) => r.value === stage);
  if (routeIndex <= 0) return true;
  return routes.slice(0, routeIndex).every((r) => stages[r.value] === "completed");
};
const getNextStageSubStage = (currentStage, routes) => {
  const currentIndex = routes.findIndex((r) => r.value === currentStage);
  const nextStage = routes[currentIndex + 1];
  return (nextStage == null ? void 0 : nextStage.subSteps[0]) ? { stage: nextStage.value, sub_stage: nextStage.subSteps[0].name } : null;
};
const navigateTo = (navigate, caseId, isUser, stage, subStage, isLegalOpinion, isLitigation) => {
  let basePath = "";
  if (isLegalOpinion) {
    basePath = "/legal-opinion/service";
  } else {
    basePath = "/litigations/service";
  }
  const fullPath = isUser() ? `${basePath}/${caseId}/user/manage` : `${basePath}/${caseId}/manage`;
  navigate({
    to: fullPath,
    search: { stage, sub_stage: subStage },
    replace: true
  });
};

export { formatDate as a, findNextPendingSubStage as b, getSubStageStatuses as c, formatDateWithTime as f, getNextStageSubStage as g, isSubStageAccessible as i, navigateTo as n, sliceFilename as s };
//# sourceMappingURL=manage-CWSyPq63.mjs.map
