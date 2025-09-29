import { statusConstants } from "@/lib/constants/statusConstants";

export const isLastStageCompleted = (record: any): boolean => {
  const stages = record?.case_stages?.[0]?.stages;
  if (!stages || stages.length === 0) return false;

  const lastStage = stages.reduce((prev, current) =>
    current.order > prev.order ? current : prev
  );

  return lastStage.status === "completed";
};

export const getStatusDisplay = (record: any) => {
  if (isLastStageCompleted(record)) {
    return {
      label: "Closed",
      color: "#219653",
      backgroundColor: "#d5f6e3",
    };
  }

  const currentStageStatus = statusConstants.find(
    (status) => status.value === record?.stage
  );

  return {
    label: currentStageStatus?.label || "Unknown",
    color: currentStageStatus?.color || "#3B3B3B",
    backgroundColor: `${currentStageStatus?.color || "#3B3B3B"}50`,
  };
};