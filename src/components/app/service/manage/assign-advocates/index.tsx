import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import AdvocateAssignIcon from "@/components/icons/advocate-assign-icon";
import DefaultUserIcon from "@/components/icons/default-user";
import ExperienceIcon from "@/components/icons/experience-icon";
import PhoneIcon from "@/components/icons/phone-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAllAdvocateAPI } from "@/http/services/advocate";
import { assignAdvocatesAPI } from "@/http/services/service";
import { Advocate, AssignAdvocateProps } from "@/lib/interfaces/getcasefiles";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ManageCaseHeader from "../../ManageCaseHeader";

const AssignAdvocates = ({ stage, subStage }: AssignAdvocateProps) => {
  const { service_id } = useParams({ strict: false });
  const [selectedAdvocateIds, setSelectedAdvocateIds] = useState<number[]>([]);
  const [reassignMode, setReassignMode] = useState(false);
  const { serviceData, setServiceData, caseStagesData } = UseContextAPI();
  const serviceId = service_id;

  const isLegalOpinion = serviceData?.service_type === "Legal opinion";

  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const getAssignedAdvocateIds = () => {
    if (
      serviceData?.advocate_cases &&
      Array.isArray(serviceData.advocate_cases)
    ) {
      return serviceData.advocate_cases
        .filter((advocateCase) => advocateCase.is_advocate_assigned)
        .map((advocateCase) => advocateCase.advocate.id);
    }

    if (serviceData?.advocate_ids && Array.isArray(serviceData.advocate_ids)) {
      return serviceData.advocate_ids;
    } else if (serviceData?.advocate_id) {
      return [serviceData.advocate_id];
    }

    return [];
  };

  const assignedAdvocateIds = getAssignedAdvocateIds();
  const hasAssignedAdvocates = assignedAdvocateIds.length > 0;
  const hasLength = serviceData?.advocate_cases?.length;

  const { isLoading, data: lawyersData } = useQuery({
    queryKey: ["advocate"],
    queryFn: async () => {
      let queryParams = {
        user_type: "ADVOCATE",
        location_id: serviceData?.location_id,
      };
      const response = await getAllAdvocateAPI(queryParams);
      if (response.status === 200 || response.status === 201) {
        const { records } = response?.data?.data;
        return { records: records };
      }
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const displayedAdvocates = hasAssignedAdvocates
    ? serviceData?.advocate_cases?.map((item) => item.advocate) || []
    : lawyersData?.records || [];

  const { mutate: mutateAssignAdvocates, isPending: isAssigning } = useMutation(
    {
      mutationKey: ["assign-advocates", serviceId],
      mutationFn: async () => {
        if (!serviceId || selectedAdvocateIds.length === 0) {
          throw new Error("File ID is missing or no advocates selected");
        }

        const payload = {
          advocate_id: selectedAdvocateIds,
          stage: stage,
          sub_stage: subStage,
        };

        const response = await assignAdvocatesAPI(
          serviceId.toString(),
          payload
        );
        return response?.data;
      },
      onSuccess: (data) => {
        toast.success(data?.message);

        const assignedAdvocateCases = selectedAdvocateIds.map((advocateId) => {
          const advocate = lawyersData?.records?.find(
            (adv) => adv.id === advocateId
          );
          return {
            id: Date.now() + advocateId,
            is_advocate_assigned: true,
            advocate_assigned_at: new Date().toISOString(),
            advocate: advocate,
            assigned_by: null,
          };
        });

        setServiceData({
          ...serviceData,
          advocate_cases: assignedAdvocateCases,
          advocate_ids: selectedAdvocateIds,
          advocate_id: selectedAdvocateIds[0],
        });

        setReassignMode(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.message || "Failed to assign advocates. Please try again."
        );
      },
    }
  );

  const handleAdvocateClick = (advocateId: number) => {
    if (isAssigning) return;

    setSelectedAdvocateIds((prev) => {
      if (isLegalOpinion) {
        return [advocateId];
      } else {
        if (prev.includes(advocateId)) {
          return prev.filter((id) => id !== advocateId);
        } else {
          return [...prev, advocateId];
        }
      }
    });
  };

  const handleAssignAdvocates = () => {
    mutateAssignAdvocates();
  };

  useEffect(() => {
    const assignedIds = getAssignedAdvocateIds();
    setSelectedAdvocateIds(assignedIds);

    if (assignedIds.length === 0) {
      setReassignMode(false);
    }
  }, [
    serviceData?.advocate_cases,
    serviceData?.advocate_ids,
    serviceData?.advocate_id,
  ]);

  return (
    <div className="h-full relative">
      {isLoading ? (
        <LoadingComponent loading={isLoading} message="Loading advocates..." />
      ) : (
        <div className="h-full px-1">
          <div className="h-full relative">
            <ManageCaseHeader
              caseStage={stage}
              caseSubStage={subStage}
              showActionButton={
                lawyersData?.records?.length === 0
                  ? false
                  : hasAssignedAdvocates && !reassignMode
              }
              showUploadButton={false}
              showNoteButton={false}
            />

            {displayedAdvocates?.length !== 0 && !isCurrentStageCompleted && (
              <div className="sticky top-0 z-10 bg-white p-2 flex justify-end">
                {hasAssignedAdvocates && !reassignMode ? (
                  <></>
                ) : (
                  <button
                    className="bg-black text-white px-3 py-1 text-xs font-normal cursor-pointer disabled:bg-gray-400 flex items-center"
                    onClick={handleAssignAdvocates}
                    disabled={selectedAdvocateIds.length === 0 || isAssigning}
                    aria-busy={isAssigning}
                    aria-label={
                      isAssigning ? "Assigning advocates" : "Assign advocates"
                    }
                  >
                    {isAssigning ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        Assigning...
                      </>
                    ) : (
                      "Assign Advocate"
                    )}
                  </button>
                )}
              </div>
            )}

            <div className="p-2 w-full h-[calc(100%-100px)] overflow-auto">
              <div className="bg-white">
                {displayedAdvocates?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <AdvocateAssignIcon />
                    <span className=" text-gray-400 font-normal text-base">
                      No advocates available
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="pt-4 px-2 pb-6">
                      <div className="grid xl:grid-cols-2 3xl:grid-cols-3 gap-4 max-w-4xl">
                        {displayedAdvocates?.map((advocate: Advocate) => {
                          const isSelected = selectedAdvocateIds.includes(
                            advocate.id
                          );

                          return (
                            <div
                              className={`bg-white border border-gray-200 transform transition duration-300
                                ${!hasAssignedAdvocates ? " hover:shadow-xl" : ""} 
                                ${isAssigning ? "opacity-50" : hasAssignedAdvocates ? "" : "cursor-pointer"} 
                                ${isSelected && !hasLength ? "border rounded-none border-gray-500" : ""}
                              `}
                              key={advocate.id}
                              onClick={
                                hasAssignedAdvocates || isAssigning
                                  ? undefined
                                  : () => handleAdvocateClick(advocate.id)
                              }
                              aria-disabled={isAssigning}
                            >
                              <div className="flex justify-between p-2">
                                <div className="flex justify-start gap-2 mb-2">
                                  <Avatar className="h-6 w-6 rounded-full bg-[#F7F7F7] border-grey-800 flex items-center justify-center">
                                    {advocate?.profile_pic ? (
                                      <AvatarImage
                                        src={advocate?.profile_pic}
                                        className="w-6 h-6 rounded-full object-cover"
                                      />
                                    ) : (
                                      <DefaultUserIcon className="w-4 h-4" />
                                    )}
                                  </Avatar>
                                  <div>
                                    <h3
                                      className="text-xs font-normal text-gray-900 leading-tight pt-1 w-40 overflow-ellipsis whitespace-nowrap overflow-hidden cursor-pointer"
                                      title={`${advocate?.first_name} ${advocate?.last_name}`}
                                    >
                                      {advocate?.first_name}{" "}
                                      {advocate?.last_name}
                                    </h3>
                                  </div>
                                </div>
                                <div className="ml-3 flex justify-between"></div>
                              </div>
                              <div
                                className={`space-y-2 bg-gray-100 p-2 justify-end ${
                                  isSelected ? "rounded-b-md" : ""
                                }`}
                              >
                                <div className="flex items-center">
                                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-xs text-gray-600 ml-2">
                                    {advocate?.phone?.replace(
                                      /^(\+91)(\d{5})(\d{5})$/,
                                      "$1 $2$3"
                                    )}
                                  </span>
                                  <div className="ml-auto flex justify-center items-center">
                                    <ExperienceIcon className="w-4 h-4 text-gray-400" />
                                    <div className="text-xs text-gray-600 ml-1 mt-0.5">
                                      {advocate.experience} Yrs
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignAdvocates;
