import {
  DynamicComponentProps,
  LazyComponentType,
} from "@/lib/interfaces/manage";
import { lazy, Suspense, useMemo } from "react";

export const DynamicComponent = ({
  stage,
  subStage,
  mappedCaseStagesData,
}: DynamicComponentProps) => {
  const Component: any = useMemo(() => {
    switch (subStage) {
      //Case Filing
      case "CSFG#UDOC":
        return lazy(
          () =>
            import("@/components/app/service/manage/mandatory-upload-component")
        );
      case "CSFG#DAPT":
        return lazy(
          () =>
            import("@/components/app/service/manage/mandatory-upload-component")
        );
      case "CSFG#DREV":
        return lazy(
          () =>
            import("@/components/app/service/manage/mandatory-upload-component")
        );

      case "CSFG#SGCP":
        return lazy(
          () =>
            import("@/components/app/service/manage/optional-upload-component")
        );
      case "CSFG#CFSP":
        return lazy(
          () =>
            import("@/components/app/service/manage/optional-upload-component")
        );
      case "CSFG#FBCT":
        return lazy(
          () =>
            import("@/components/app/service/manage/optional-upload-component")
        );
      case "CSFG#CMPA":
        return lazy(
          () => import("@/components/app/service/manage/cmp-number-allotment")
        );

      // Court Proceedings
      case "CTPG#CNRA":
        return lazy(
          () => import("@/components/app/service/manage/cnr-number-allotment")
        );
      case "CTPG#CTSN":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "CTPG#JDRA":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "CTPG#MDTN":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "CTPG#RSAP":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "CTPG#COFL":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-mandatory-upload-document"
            )
        );

      // Trail Phase
      case "TRPH#DHAF":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "TRPH#JRAF":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "TRPH#DHAR":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "TRPH#JRAR":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "TRPH#ORDR":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-mandatory-upload-document"
            )
        );
      case "TRPH#PTAR":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "TRPH#APAF":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "TRPH#RSPF":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-mandatory-upload-document"
            )
        );
      case "TRPH#APAR":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "TRPH#RSPR":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );

      //Process of Execution
      case "PSEX#ATSP":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "PSEX#DLVP":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "PSEX#ARDE":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
      case "PSEX#APRV":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );

      //Case Closure
      case "CSCR#NOCC":
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-mandatory-upload-document"
            )
        );
      case "CSCR#DSCL":
        return lazy(
          () =>
            import("@/components/app/service/manage/disposal-call-component")
        );

      case "ONBD#CUDE":
        return lazy(() => import("@/components/app/service/on-boarding"));

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

      case "VEFI#AVAG":
        return lazy(
          () => import("@/components/app/service/manage/assign-advocates")
        );

      case "VEFI#FICV":
        return lazy(
          () =>
            import(
              "@/components/app/service/verification/filechecklist-verification"
            )
        );
      case "QURI#RQMD":
        return lazy(() => import("@/components/app/service/queries"));

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

      //Conciliation
      case "NTCE#DFNT":
        return lazy(
          () =>
            import("@/components/app/service/manage/mandatory-upload-component")
        );

      case "NTCE#SNPT":
        return lazy(
          () =>
            import("@/components/app/service/manage/optional-upload-component")
        );

      //Legal Notice DLNT%23DFNT
      case "DLNT#DFNT":
        return lazy(
          () =>
            import("@/components/app/service/manage/mandatory-upload-component")
        );

      case "SLNT#SNNT":
        return lazy(
          () => import("@/components/app/service/manage/sending-notice")
        );

      //Advocate Assign for Legal Notice
      case "DLNT#AVAG":
        return lazy(
          () => import("@/components/app/service/manage/assign-advocates")
        );
      case "NTCE#AVAG":
        return lazy(
          () => import("@/components/app/service/manage/assign-advocates")
        );
      case "CSFG#AVAG":
        return lazy(
          () => import("@/components/app/service/manage/assign-advocates")
        );
      case "REPO#DSCL":
        return lazy(
          () =>
            import("@/components/app/service/manage/disposal-call-component")
        );

      default:
        return lazy(
          () =>
            import(
              "@/components/app/service/manage/unorder-optinal-upload-component"
            )
        );
    }
  }, [subStage]);

  return (
    <Suspense>
      <Component
        stage={stage}
        subStage={subStage}
        mappedCaseStagesData={mappedCaseStagesData}
      />
    </Suspense>
  );
};
