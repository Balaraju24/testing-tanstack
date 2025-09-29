import {
  DynamicComponentProps,
  LazyComponentType,
} from "@/lib/interfaces/manage";
import { lazy, Suspense, useMemo } from "react";

export const UserDynamicComponent = ({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) => {
  const UserComponent: any = useMemo(() => {
    switch (subStage) {
      //Case Filing
      case "CSFG#UDOC":
        return lazy(
          () => import("@/components/app/service/user-manage/upload-documents")
        );
      case "CSFG#DAPT":
        return lazy(
          () => import("@/components/app/service/user-manage/upload-documents")
        );
      case "CSFG#DREV":
        return lazy(
          () => import("@/components/app/service/user-manage/draft-review")
        );
      case "CSFG#SGCP":
        return lazy(
          () => import("@/components/app/service/user-manage/upload-documents")
        );
      case "CSFG#CFSP":
        return lazy(
          () => import("@/components/app/service/user-manage/upload-documents")
        );
      case "CSFG#FBCT":
        return lazy(
          () => import("@/components/app/service/user-manage/upload-documents")
        );
      case "CSFG#CMPA":
        return lazy(
          () =>
            import("@/components/app/service/user-manage/cmp-number-allotment")
        );

      case "CTPG#CNRA":
        return lazy(
          () =>
            import("@/components/app/service/user-manage/cnr-number-allotment")
        );

      case "CSCR#DSCL":
        return lazy(
          () => import("@/components/app/service/user-manage/disposal-call")
        );

      case "REPO#DSCL":
        return lazy(
          () => import("@/components/app/service/user-manage/disposal-call")
        );

      case "ONBD#CUDE":
        return lazy(() => import("@/components/app/service/on-boarding"));

      case "VEFI#AVAG":
        return lazy(
          () =>
            import("@/components/app/service/user-manage/user-assign-advocates")
        );

      case "FIUP#UPAF":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/file-upload/uploading-of-documents"
            )
        );

      case "FIUP#PRIC":
        return lazy(
          () => import("@/components/app/service/manage/file-upload/pricings")
        );
      case "VEFI#FICV":
        return lazy(
          () =>
            import(
              "@/components/app/service/verification/user-filechecklist-verification"
            )
        );

      case "QURI#RQMD":
        return lazy(
          () => import("@/components/app/service/queries/user-raise-queries")
        );

      case "QURI#MDSC":
        return lazy(
          () => import("@/components/app/service/queries/missing-documents")
        );
      case "QURI#ASDD":
        return lazy(
          () => import("@/components/app/service/queries/set-due-date")
        );
      case "REPO#SUBM":
        return lazy(() => import("@/components/app/service/report-submission"));

      //Legal notice sending
      case "SLNT#SNNT":
        return lazy(
          () => import("@/components/app/service/manage/sending-notice")
        );

      case "DLNT#AVAG":
        return lazy(
          () =>
            import("@/components/app/service/user-manage/user-assign-advocates")
        );
      case "NTCE#AVAG":
        return lazy(
          () =>
            import("@/components/app/service/user-manage/user-assign-advocates")
        );
      case "CSFG#AVAG":
        return lazy(
          () =>
            import("@/components/app/service/user-manage/user-assign-advocates")
        );

      default:
        return lazy(
          () =>
            import("@/components/app/service/manage/added-sub-stages-component")
        );
    }
  }, [subStage]);

  return (
    <Suspense>
      <UserComponent
        stage={stage}
        subStage={subStage}
        mappedCaseStagesData={mappedCaseStagesData}
      />
    </Suspense>
  );
};
