import OverflowContentTooltip from "@/components/core/OverflowContentTooltip";
import CalendarIcon from "@/components/icons/calendar-icon";
import DefaultUserIcon from "@/components/icons/default-user";
import LitigationIconGrid from "@/components/icons/litigation-Icon_grid";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { issueIcons } from "@/lib/constants/litigation";
import dayjs from "dayjs";
import Stepper from "../app/litigation/Stepper";
import { AdvocateGroupAvatars } from "../app/service/manage/AdvocatesList";
import { CaseCardFooter } from "../app/litigation/CaseCardFooter";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { getStatusDisplay } from "@/utils/helpers/statusDisplayHelper";

const CaseCard = ({ record, refetch }) => {
  const { isUser } = useUserDetails();
  const case_id = record?.id;
  const icon = issueIcons[record?.service?.issue]?.({
    className: "h-5 w-5 text-black mx-1",
  }) ?? (
    <span role="img" aria-label="icon">
      📄
    </span>
  );
  const serviceType = record?.service_type;
  const isLitigation = serviceType === "Litigation";

  const statusDisplay = getStatusDisplay(record);

  const getCustomerInfo = () => {
    return {
      name:
        `${record.user?.first_name || ""} ${record.user?.last_name || ""}`.trim() ||
        "Unknown Client",
      profilePic: record.user?.profile_pic,
    };
  };
  const customerInfo = getCustomerInfo();

  return (
    <div className="bg-white border border-gray-200">
      <div className="flex justify-between w-full ">
        <div className="text-sm text-gray-600 w-1/2 bg-gray-100 p-1">
          File ID :{" "}
          <span className="text-black font-normal text-xs 3xl:text-sm">
            {record.temp_id}
          </span>
        </div>
        <div
          className="flex justify-center uppercase text-xs font-normal items-center w-1/2"
          style={{
            backgroundColor: statusDisplay.backgroundColor,
            color: statusDisplay.color,
          }}
        >
          {statusDisplay.label}
        </div>
      </div>
      <div className="mt-2">
        <Stepper
          service_type={record?.service_type}
          currentStage={record?.stage}
          stages={record?.case_stages?.[0]}
          className="w-full"
          caseId={case_id}
          user_id={record?.id}
        />

        <div className="space-y-2 bg-gray-100 p-3 mt-3 mx-2 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="">
                <LitigationIconGrid className="w-5 h-5" />
              </div>
              <span className="text-sm font-normal text-black">
                {record?.organisation_name}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-2 w-2" />
                {serviceType === "Litigation" && (
                  <div>
                    <div className="text-sm font-normal text-gray-900">
                      Next Hearing
                    </div>
                  </div>
                )}
                {serviceType !== "Litigation" && (
                  <div>
                    <div className="text-xs font-normal text-gray-900">
                      Due Date
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs flex justify-center items-center text-gray-600 ">
                {serviceType === "Legal opinion"
                  ? record.due_date
                    ? dayjs(record.due_date).format("DD MMM YYYY")
                    : "--"
                  : record.next_hearing_date
                    ? dayjs(record.next_hearing_date).format("DD MMM YYYY")
                    : "--"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {isUser() && !isLitigation ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-7 w-7 rounded-full bg-[#F7F7F7] flex items-center justify-center">
                  <div className="h-7 w-7 rounded-full bg-[#F7F7F7] border border-grey-800 flex items-center justify-center">
                    <DefaultUserIcon className="w-4 h-4" />
                  </div>
                </Avatar>
                <div className="shrink w-28">
                  <OverflowContentTooltip text={record?.customer_name} />
                  <div className="text-xs text-gray-500">Customer</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Avatar className="h-7 w-7 rounded-full bg-[#F7F7F7] flex items-center justify-center">
                  {customerInfo.profilePic ? (
                    <AvatarImage
                      src={customerInfo.profilePic}
                      alt={customerInfo.name}
                      className="rounded-full h-7 w-7 object-cover object-top"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-[#F7F7F7] border border-grey-800 flex items-center justify-center">
                      <DefaultUserIcon className="w-4 h-4" />
                    </div>
                  )}
                </Avatar>
                <div className="shrink w-28">
                  <OverflowContentTooltip text={customerInfo.name} />
                  <div className="text-xs text-gray-500">Point of Contact</div>
                </div>
              </div>
            )}

            <>
              {record?.advocate_cases && record?.advocate_cases.length > 0 ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {record.advocate_cases.length === 1 ? (
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-none">
                          {record.advocate_cases[0].advocate?.profile_pic ? (
                            <AvatarImage
                              src={
                                record.advocate_cases[0].advocate.profile_pic
                              }
                              alt={`${record.advocate_cases[0].advocate?.first_name || ""} ${
                                record.advocate_cases[0].advocate?.last_name ||
                                ""
                              }`.trim()}
                              className="rounded-full h-7 w-7 object-cover object-top border-none"
                            />
                          ) : (
                            <DefaultUserIcon className="w-4 h-4" />
                          )}
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="max-w-32 truncate text-xs text-black">
                            {`${record.advocate_cases[0].advocate?.first_name || ""} ${
                              record.advocate_cases[0].advocate?.last_name || ""
                            }`.trim() || "Unknown Advocate"}
                          </div>

                          <div className="text-xs text-gray-500">Advocate</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <AdvocateGroupAvatars
                          advocateCases={record.advocate_cases}
                          id={`litigation-${record.id}`}
                        />
                        <div className="text-xs text-gray-500 pt-0.5">
                          Advocates
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Avatar className="h-7 w-7 rounded-full bg-[#F7F7F7] border border-grey-800 flex items-center justify-center">
                    <DefaultUserIcon className="w-4 h-4" />
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-xs max-w-28 truncate">
                      Not Assigned
                    </div>
                    <div className="text-xs text-gray-500">Advocate</div>
                  </div>
                </div>
              )}
            </>
          </div>
          {isLitigation && (
            <div className="flex items-center  font-normal mt-3">
              <div className="text-black">{icon}</div>
              <div className="mt-0.5 font-light text-black text-sm">
                {record?.service?.issue || "--"}
              </div>
            </div>
          )}
        </div>

        <CaseCardFooter record={record} />
      </div>
    </div>
  );
};

export default CaseCard;
