import LoadingComponent from "@/components/core/Loading";
import AdvocatePlaceholder from "@/components/icons/advocate-placeholder";
import EditProfileIcon from "@/components/icons/edit-profile-icon";
import EmailIcon from "@/components/icons/email-icon";
import PhoneIcon from "@/components/icons/phone-icon";
import { Card, CardContent } from "@/components/ui/card";
import { singleAdvocateAPI, singleManagerAPI } from "@/http/services/advocate";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, useRouter } from "@tanstack/react-router";
import AdvisorBasedCases from "./AdvocateBasedCases";
import CasesViewTrends from "./CaseViewTrends";
import StatsCards from "./StatsCards";

const ViewAdvocateComponent = () => {
  const router = useRouter();
  const location = useLocation();
  const params = useParams({ strict: false });
  const advocate_id = params.advocate_id;
  const manager_id = params.manager_id;

  const isManagerRoute = location.pathname.includes("/view-manager");

  const { isAdmin } = useUserDetails();

  const { isLoading, data: associateData } = useQuery({
    queryKey: isManagerRoute ? ["manager-details"] : ["associate-details"],
    queryFn: async () => {
      const apiCall = isManagerRoute ? singleManagerAPI : singleAdvocateAPI;
      const associateResponse = await apiCall(
        isManagerRoute ? manager_id : advocate_id
      );
      if (
        associateResponse.status !== 200 &&
        associateResponse.status !== 201
      ) {
        throw new Error(
          `Failed to fetch ${isManagerRoute ? "manager" : "associate"} details`
        );
      }
      return associateResponse.data.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!advocate_id || !!manager_id,
  });

  return (
    <div className=" overflow-hidden scrollbar-hidden">
      {isLoading ? (
        <LoadingComponent
          loading={isLoading}
          message={`${isManagerRoute ? "Manager" : "Legal advisor"} details...`}
        />
      ) : (
        <>
          <div className="w-full bg-gray-100 grid grid-cols-[35%_65%] !gap-0 h-[calc(100vh-74px)] !p-0 overflow-hidden">
            <div className="overflow-auto p-2 ">
              <div className="h-[calc(100vh-90px)] overflow-y-auto scrollbar-hide bg-white">
                <Card className="w-full border-0 shadow-none rounded-none p-2 ">
                  <CardContent className="p-0 w-full">
                    <div className="flex flex-col space-y-3 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className=" shrink-0 flex items-center justify-center  size-24 overflow-hidden shadow">
                            {associateData?.profile_pic_url ? (
                              <img
                                src={associateData?.profile_pic_url}
                                alt={`${associateData?.first_name} ${associateData?.last_name}`}
                                className="object-fill size-24 object-center "
                              />
                            ) : (
                              <AdvocatePlaceholder />
                            )}
                          </div>
                          <div className="flex-1  space-y-1">
                            <div className="flex gap-1">
                              <h1
                                className="text-base font-normal text-gray-900 truncate max-w-56 cursor-pointer"
                                title={`${associateData?.first_name} ${associateData?.last_name ? associateData?.last_name : ""} `}
                              >
                                {`${associateData?.first_name} ${associateData?.last_name ? associateData?.last_name : ""}`}
                              </h1>
                              <p className="text-[10px] text-gray-500 mt-2">
                                {associateData?.qualification}
                              </p>
                            </div>
                            <div className="text-xs text-gray-600">
                              {associateData?.area_of_interest?.join(", ")}
                            </div>
                            {associateData?.experience && (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-gray-900 flex items-center justify-center rounded-full">
                                  <span className="text-[10px] font-normal text-center  text-white">
                                    {associateData?.experience}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-600">
                                  Years Of Experience
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {!isAdmin() && (
                          <button
                            className="bg-gray-900 flex hover:bg-gray-800 text-white py-1.5 text-center self-center cursor-pointer px-3 text-xs font-normal rounded-none"
                            onClick={() => {
                              const editRoute = isManagerRoute
                                ? `/edit-manager/${associateData?.id}`
                                : `/edit-advocate/${associateData?.id}`;
                              router.navigate({
                                to: editRoute,
                              });
                            }}
                          >
                            <EditProfileIcon className="w-5 h-3 mr-1 mt-0.5" />
                            <span className="text-xs !py-0">Edit</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <PhoneIcon className="w-4 h-4" />
                        <span>
                          {associateData?.phone &&
                            associateData.phone.replace(
                              /^(\+91)(\d{5})(\d{5})$/,
                              "$1 $2$3"
                            )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <EmailIcon className="w-3 h-3" />
                        <span>{associateData?.email}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                        <span className="text-xs font-normal text-gray-800">
                          Aadhaar:
                        </span>
                        <span className="text-xs text-gray-600">
                          {associateData?.aadhaar}
                        </span>
                      </div>

                      <>
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                          <span className="text-xs font-normal text-gray-800">
                            Advocate code:
                          </span>
                          <span className="text-xs text-gray-600">
                            {associateData?.advocate_code}
                          </span>
                        </div>
                        <div className="flex  gap-2 items-start">
                          <span className="text-xs font-normal text-gray-800">
                            Enrollment Number:
                          </span>
                          <span className="text-xs text-gray-600">
                            {associateData?.bar_council_enrollment_id}
                          </span>
                        </div>
                      </>
                    </div>

                    <div className="mb-4 ">
                      <h3 className="text-xs font-normal text-gray-800 mb-2">
                        Bar Affiliations:
                      </h3>
                      <div className="mx-1">
                        <span className="space-y-1 ">
                          {associateData?.bar_affiliations
                            ?.split("\n")
                            .map((bar_affliation: string, index: number) => (
                              <span
                                key={index}
                                className="text-xs text-gray-600 flex items-center"
                              >
                                {bar_affliation?.trim()}
                              </span>
                            ))}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-900 mb-2">
                        Achievements:
                      </h3>
                      {associateData?.achievements ? (
                        <ul className="space-y-1">
                          {associateData.achievements
                            ?.split("\n")
                            .map((achievement: string, index: number) => (
                              <li
                                key={index}
                                className="text-xs text-gray-600 flex items-center"
                              >
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                {achievement.trim()}
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <span className="text-xs text-gray-600 flex items-center">
                          --
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-900 mb-2">
                        Bio:
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {associateData?.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="overflow-auto bg-gray-100 p-2 px-0">
              <div className=" space-y-1 bg-white px-1">
                <StatsCards />

                <div className="h-[250px]">
                  <CasesViewTrends />
                </div>

                <div>
                  <AdvisorBasedCases />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewAdvocateComponent;
