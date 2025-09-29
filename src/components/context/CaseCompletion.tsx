import { CaseCompletionContextType } from "@/lib/interfaces/context";
import { createContext, useCallback, useContext } from "react";

const CaseCompletionContext = createContext<
  CaseCompletionContextType | undefined
>(undefined);

export const CaseCompletionProvider = ({
  children,
  onSubStageComplete,
  onStageComplete,
  onCaseClose,
}: {
  children: React.ReactNode;
  onSubStageComplete: (subStage: string) => void;
  onStageComplete: (stage: string) => void;
  onCaseClose?: () => void;
}) => {
  const completeSubStage = useCallback(
    (subStage: string) => {
      onSubStageComplete(subStage);
    },
    [onSubStageComplete]
  );

  const completeStage = useCallback(
    (stage: string) => {
      onStageComplete(stage);
    },
    [onStageComplete]
  );

  const completeCase = useCallback(() => {
    if (onCaseClose) {
      onCaseClose();
    }
  }, [onCaseClose]);

  return (
    <CaseCompletionContext.Provider
      value={{ completeSubStage, completeStage, completeCase }}
    >
      {children}
    </CaseCompletionContext.Provider>
  );
};

export const useCaseCompletion = () => {
  const context = useContext(CaseCompletionContext);
  if (!context) {
    throw new Error(
      "useCaseCompletion must be used within a CaseCompletionProvider"
    );
  }
  return context;
};
