import { UseContextAPI } from "@/components/context/Provider";
import LawyerIcon from "@/components/icons/lawyer-icon";
import Litigation from "@/components/icons/litigation-icon";
import UserIcon from "@/components/icons/user-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { issueIcons } from "@/lib/constants/litigation";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import dayjs from "dayjs";
import { useState } from "react";
import { LitigationAdvocatesList } from "./manage/LitigationAdvocatesList";
import { UserCardMini } from "./UserCardMini";
const DetailsCard = ({ details }: any) => {
  const [selectedAdvocateIndex, setSelectedAdvocateIndex] = useState(0);
  const { isManager, isAdvocate, isUser, isAdmin } = useUserDetails();
  const { serviceData } = UseContextAPI();
  const isLitigation = serviceData?.service_type === "Litigation";

  const assignedAdvocates =
    details?.advocate_cases?.filter(
      (advocateCase: any) => advocateCase.is_advocate_assigned
    ) || [];
  const selectedAdvocate =
    assignedAdvocates[selectedAdvocateIndex]?.advocate || null;

  const createIcon = (iconKey) =>
    issueIcons[iconKey]?.({ className: "h-5 w-5 text-black mx-1" }) ?? (
      <span role="img" aria-label="icon">
        📄
      </span>
    );

  const icon = createIcon(details?.service?.issue);
  const SubIssueicon = createIcon(details?.service?.sub_issue);
  const IssueTypeIcon = createIcon(details?.service?.issue_type);

  const handleAdvocateSelect = (advocate: any, index: number) => {
    setSelectedAdvocateIndex(index);
  };

  return (
    <div className="border border-gray-300 rounded-none bg-white overflow-hidden text-sm">
      <div className="bg-[#F0F4FA] p-3 space-y-1 border border-gray-300 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-800 font-normal">
            <Litigation className="w-4 h-4 text-gray-700" />
            {details?.service?.category || "--"}
          </div>
          <div className="text-xs text-gray-500">
            {details?.created_at
              ? dayjs(details?.created_at).format("DD MMM YYYY")
              : null}
          </div>
        </div>
        {isLitigation && (
          <div className="grid grid-cols-1">
            {[
              { icon, value: details?.service?.issue },
              { icon: IssueTypeIcon, value: details?.service?.issue_type },
              { icon: SubIssueicon, value: details?.service?.sub_issue },
            ]
              .filter(({ value }) => value)
              .map(({ icon, value }, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-700 font-normal mt-2"
                >
                  <div className="text-black">{icon}</div>
                  <div className="mt-0.5 font-light">{value || "--"}</div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex w-full p-1 mt-2">
        <Tabs
          defaultValue={
            isManager() || isAdmin()
              ? "client"
              : isUser()
                ? "lawyer"
                : isAdvocate()
                  ? "client"
                  : undefined
          }
          className="w-full flex"
        >
          {isLitigation ? (
            <div className="w-full">
              <TabsList className="flex w-full h-auto rounded-none bg-gray-50 p-0 mb-4">
                {(isManager() || isUser() || isAdmin()) && (
                  <TabsTrigger
                    value="lawyer"
                    className="flex-1 px-4 py-1 border-none border-gray-200 cursor-pointer bg-white 
                    data-[state=active]:bg-gray-100 
                    data-[state=active]:border-gray-300 
                    shadow-none text-black text-opacity-60 
                    data-[state=active]:text-opacity-100 
                    text-xs 3xl:text-sm font-normal 
                    flex justify-center items-center gap-2 rounded-none"
                  >
                    <span className="p-1 bg-gray-200 rounded-full">
                      <LawyerIcon className="w-4 h-4" />
                    </span>
                    Advocate
                    {isLitigation
                      ? assignedAdvocates.length > 1
                        ? `(${assignedAdvocates.length})`
                        : ""
                      : ""}
                  </TabsTrigger>
                )}

                {(isManager() || isAdvocate() || isAdmin()) && (
                  <TabsTrigger
                    value="client"
                    className="flex-1 px-4 py-1 border-none border-gray-200 cursor-pointer bg-white 
                    data-[state=active]:bg-gray-100 
                    data-[state=active]:border-gray-300 
                    shadow-none text-black text-opacity-60 
                    data-[state=active]:text-opacity-100 
                    text-xs 3xl:text-sm font-normal 
                    flex justify-center items-center gap-2 rounded-none"
                  >
                    <span className="p-1 bg-gray-200 rounded-full">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    POC
                  </TabsTrigger>
                )}
              </TabsList>

              {(isManager() || isUser() || isAdmin()) && (
                <TabsContent value="lawyer" className="mt-0">
                  <div className="space-y-3">
                    <LitigationAdvocatesList
                      advocateCases={details?.advocate_cases || []}
                      onAdvocateSelect={handleAdvocateSelect}
                      selectedAdvocateIndex={selectedAdvocateIndex}
                    />
                  </div>
                </TabsContent>
              )}
              {(isManager() || isAdvocate() || isAdmin()) && (
                <TabsContent value="client" className="mt-0">
                  <UserCardMini
                    name={
                      (details?.user?.first_name ?? "") +
                      (details?.user?.last_name
                        ? " " + details?.user?.last_name
                        : "")
                    }
                    phone={details?.user?.phone || "--"}
                    avatar={details?.user?.profile_pic ?? null}
                    email={details?.user?.email || "--"}
                  />
                </TabsContent>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <div>
                <TabsList className="flex flex-col items-start gap-0 pt-1 h-auto rounded-none transition-all duration-500 ease-in-out py-0">
                  {(isManager() || isUser() || isAdmin()) && (
                    <TabsTrigger
                      value="lawyer"
                      className="w-28 px-2 group border cursor-pointer bg-white border-white 
                data-[state=active]:bg-gray-100 
                data-[state=active]:border-gray-100 
                shadow-none text-black text-opacity-60 
                data-[state=active]:text-opacity-100 
                text-xs 3xl:text-sm font-normal 
                flex justify-start items-center gap-2 rounded-none"
                    >
                      <span
                        className="p-1 bg-gray-200 rounded-full 
                data-[state=active]:bg-white 
                data-[state=active]:text-black"
                      >
                        <LawyerIcon className="w-4 h-4" />
                      </span>
                      Advocate
                    </TabsTrigger>
                  )}

                  {(isManager() || isAdvocate() || isAdmin()) && (
                    <TabsTrigger
                      value="client"
                      className="w-28 px-2 group border  cursor-pointer bg-white border-white 
                data-[state=active]:bg-gray-100 
                data-[state=active]:border-gray-100 
                shadow-none text-black text-opacity-60 
                data-[state=active]:text-opacity-100 
                text-xs 3xl:text-sm font-normal 
                flex justify-start items-center gap-2 rounded-none"
                    >
                      <span
                        className="p-1 bg-gray-200 rounded-full 
                data-[state=active]:bg-white 
                data-[state=active]:text-black"
                      >
                        <UserIcon className="w-4 h-4" />
                      </span>
                      POC
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              <div className="flex-1">
                {(isManager() || isUser() || isAdmin()) && (
                  <TabsContent value="lawyer" className="">
                    <div className="space-y-3 text-sm text-gray-800">
                      <UserCardMini
                        name={
                          selectedAdvocate
                            ? `${selectedAdvocate?.first_name ?? ""} ${selectedAdvocate?.last_name ?? ""}`.trim() ||
                              "--"
                            : "Not assigned"
                        }
                        phone={selectedAdvocate?.phone || "--"}
                        email={selectedAdvocate?.email || "--"}
                        avatar={selectedAdvocate?.profile_pic ?? null}
                      />
                    </div>
                  </TabsContent>
                )}
                {(isManager() || isAdvocate() || isAdmin()) && (
                  <TabsContent value="client" className="space-y-1">
                    <UserCardMini
                      name={
                        (details?.user?.first_name ?? "") +
                        (details?.user?.last_name
                          ? " " + details?.user?.last_name
                          : "")
                      }
                      phone={details?.user?.phone || "--"}
                      avatar={details?.user?.profile_pic ?? null}
                      email={details?.user?.email || "--"}
                    />
                  </TabsContent>
                )}
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default DetailsCard;
