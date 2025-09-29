import { UseContextAPI } from "@/components/context/Provider";
import {
  HEADER_CONFIG,
  LOAN_DATA_FIELDS,
} from "@/lib/constants/loanDetailsConstants";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import ManageCaseHeader from "../ManageCaseHeader";

export default function LoanDetails({ stage, subStage }: any) {
  const { serviceData } = UseContextAPI();
  const { isUser } = useUserDetails();

  const loanData = LOAN_DATA_FIELDS.map((field) => ({
    label: field.label,
    value: field.getValueFn(serviceData),
  }));

  return (
    <div className="h-full relative">
      <ManageCaseHeader
        caseStage={stage}
        caseSubStage={subStage}
        showActionButton={HEADER_CONFIG.SHOW_ACTION_BUTTON(isUser())}
        showUploadButton={HEADER_CONFIG.SHOW_UPLOAD_BUTTON}
        showNoteButton={HEADER_CONFIG.SHOW_NOTE_BUTTON}
      />
      <div className="p-4 w-full h-[calc(100%-60px)] overflow-auto">
        <div className="bg-white p-1 max-w-lg">
          <div className="space-y-3">
            {loanData.map((item, index) => (
              <div key={index} className="flex">
                <div className="w-48 flex-shrink-0">
                  <span className="text-xs 2xl:text-sm text-black font-normal">
                    {item.label}
                  </span>
                </div>
                <div className="flex-shrink-0 mx-4">
                  <span className="text-sm text-gray-800">:</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-900 font-light capitalize">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
