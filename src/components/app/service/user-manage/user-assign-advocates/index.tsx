import { UseContextAPI } from "@/components/context/Provider";
import AdvocateAssignIcon from "@/components/icons/advocate-assign-icon";
import DefaultUserIcon from "@/components/icons/default-user";
import ExperienceIcon from "@/components/icons/experience-icon";
import PhoneIcon from "@/components/icons/phone-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AssignAdvocateProps } from "@/lib/interfaces/getcasefiles";
import ManageCaseHeader from "../../ManageCaseHeader";

const UserAssignAdvocate = ({ stage, subStage }: AssignAdvocateProps) => {
  const { serviceData } = UseContextAPI();

  return (
    <div className="h-full">
      <div className="h-full px-1">
        <div className="h-full relative">
          <ManageCaseHeader
            caseStage={stage}
            caseSubStage={subStage}
            showActionButton={false}
            showUploadButton={false}
          />
          <div className="p-2 w-full h-[calc(100%-60px)] overflow-auto">
            <div className="bg-white relative">
              {/* Cards Grid */}
              {serviceData?.advocate_cases?.length === 0 ||
              !serviceData?.advocate_cases ? (
                <div className="flex flex-col items-center justify-center">
                  <AdvocateAssignIcon />
                  <span className="text-gray-400 font-normal text-base">
                    Advocate not assigned
                  </span>
                </div>
              ) : (
                <div className="pt-2 px-2 pb-6">
                  <div className="grid xl:grid-cols-2 3xl:grid-cols-3 gap-4 max-w-4xl">
                    {serviceData?.advocate_cases
                      ?.filter(
                        (advocateCase) => advocateCase.is_advocate_assigned
                      )
                      .map((advocateCase) => (
                        <div
                          className="bg-white border border-gray-200 rounded-md shadow-md "
                          key={advocateCase.id}
                        >
                          <div className="flex justify-between p-2">
                            {/* Avatar and Name Row */}
                            <div className="flex justify-start gap-2 mb-2">
                              <Avatar className="h-6 w-6 rounded-full bg-[#F7F7F7] border-grey-800 flex items-center justify-center">
                                {advocateCase.advocate?.profile_pic ? (
                                  <AvatarImage
                                    src={advocateCase.advocate.profile_pic}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                ) : (
                                  <DefaultUserIcon className="w-4 h-4" />
                                )}
                              </Avatar>
                              <div>
                                <h3
                                  className="text-xs font-normal text-gray-900 leading-tight pt-1 w-32 overflow-ellipsis whitespace-nowrap overflow-hidden cursor-pointer"
                                  title={`${advocateCase.advocate?.first_name} ${advocateCase.advocate?.last_name}`}
                                >
                                  {advocateCase.advocate?.first_name}{" "}
                                  {advocateCase.advocate?.last_name}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 bg-gray-100 p-2 justify-end rounded-b-md">
                            <div className="flex items-center">
                              <PhoneIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-600 ml-2">
                                {advocateCase.advocate?.phone?.replace(
                                  /^(\+91)(\d{5})(\d{5})$/,
                                  "$1 $2$3"
                                )}
                              </span>
                              <div className="ml-auto flex">
                                <ExperienceIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-600 ml-1">
                                  {advocateCase.advocate?.experience || "5"} Yrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAssignAdvocate;
