export interface Stage {
  code: string;
  order: number;
  title: string;
  status: string;
}

export interface StepperProps {
  currentStage: string;
  stages?: { stages: Stage[] } | null;
  caseId: string;
  user_id: number;
  className?: string;
  service_type: string;
}

export interface CaseStageResponse {
  data: {
    sub_stages: Stage[];
  };
}
