import { UseContextAPI } from "@/components/context/Provider";
import { DatePicker } from "@/components/core/DatePicker";
import LoadingComponent from "@/components/core/Loading";
import NextHearingDialog from "@/components/core/NextHearingDialog";
import CalendarIcon from "@/components/icons/calendar-icon";
import ManageCaseIcon from "@/components/icons/manage-case";
import Todo from "@/components/layout/Todo";
import { Button } from "@/components/ui/button";
import { caseViewNotesAPI } from "@/http/services/manage";
import {
  caseNextHearingDateAPI,
  singleServiceAPI,
} from "@/http/services/service";
import { formatDate } from "@/utils/helpers/manage";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DetailsCard from "./DetailsCard";
import NextHearingDrawer from "./next-hearing-drawer";
import { NoteWithShowMore } from "./NoteWithShowMore";
import RecordPayment from "./RecordPayment";

dayjs.extend(isSameOrBefore);

const ServiceViewComponent = () => {
  const { service_id } = useParams({ strict: false });
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isManage = pathname.includes("/manage");

  const [date, setDate] = useState<Date>();
  const [unAuthorized, setUnAuthorized] = useState<boolean>(false);

  const [showNextHearingDialog, setShowNextHearingDialog] = useState(false);
  const [nextHearingReason, setNextHearingReason] = useState("");
  const [nextHearingError, setNextHearingError] = useState("");
  const [selectedNextHearingDate, setSelectedNextHearingDate] =
    useState<Date | null>(null);

  const { isUser } = useUserDetails();
  const { caseStagesData, serviceData, setServiceData } = UseContextAPI();
  const isLegalOpinion = serviceData?.service_type === "Legal opinion";

  const activateFinalHearing =
    caseStagesData?.stages?.find((sub: any) => sub.code === "CSFG") &&
    caseStagesData?.stages?.find((sub: any) => sub.code === "CSFG")?.status ===
      "completed";

  const deactivatedFinalHearing = caseStagesData?.stages?.find(
    (sub: any) => sub.code === "TRPH"
  )
    ? caseStagesData?.stages?.find((sub: any) => sub.code === "TRPH")
        ?.status === "completed"
    : caseStagesData?.stages?.find((sub: any) => sub.code === "CTPG")
        ?.status === "completed";

  const {
    isLoading,
    data: singleServiceDetails,
    refetch,
  } = useQuery({
    queryKey: ["single-service-details", service_id],
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await singleServiceAPI(service_id as string);
        if (response.status === 200 || response.status === 201) {
          const { data } = response?.data;

          setServiceData(data);

          sessionStorage.setItem(`${service_id}_created_at`, data?.created_at);
          return data;
        }
        if (response.status === 403) {
          setUnAuthorized(true);
          toast.error(response?.data?.message, { duration: 4000 });
        }
      } catch {
        throw new Error("Failed to fetch case data");
      }
    },
  });

  const fetchCaseNotes = async ({ pageParam = 1 }) => {
    try {
      if (!service_id) return;
      let queryParams: any = {};
      queryParams = {
        page: pageParam,
        page_size: 15,
        types: "HEARING_DATE_REASON",
      };
      const response = await caseViewNotesAPI(service_id, queryParams);
      return {
        data: response?.data?.data?.records,
        nextCursor: response?.data?.data?.pagination_info?.next_page
          ? response?.data?.data?.pagination_info?.current_page + 1
          : null,
        prevCursor:
          response?.data?.data?.pagination_info?.current_page !== 1
            ? response?.data?.data?.pagination_info?.current_page - 1
            : null,
        totalRecords: response?.data?.data?.pagination_info?.total_records,
      };
    } catch (err) {
      throw new Error("Failed to fetch case notes");
    }
  };

  const {
    data: nextHearingNotes,
    fetchNextPage,
    hasNextPage,
    isFetching: isLoadingCaseNote,
    isFetchingNextPage,
    refetch: refetchCaseSummary,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-hearing-summary", service_id],
    queryFn: fetchCaseNotes,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor ?? null,
    refetchOnWindowFocus: false,
  });

  const {
    mutate: mutateUpdateNextHearingDate,
    isPending: isPendingHearingDate,
  } = useMutation({
    mutationKey: ["update_next_hearing_date"],
    mutationFn: async (data: {
      next_hearing_date: string;
      note: string;
      case_stage: string;
      case_sub_stage: string;
    }) => {
      const response = await caseNextHearingDateAPI(data, service_id);
      return response;
    },
    onSuccess: () => {
      refetch();
      if (selectedNextHearingDate) {
        setDate(selectedNextHearingDate);
      }
      refetchCaseSummary();
      toast.success("Hearing date Updated Successfully", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: () => {
      toast.error("Failed to update hearing date", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

  const handleConfirmNextHearing = () => {
    if (!nextHearingReason.trim()) {
      setNextHearingError("Please enter a reason");
      return;
    }

    if (selectedNextHearingDate) {
      const formattedDate = dayjs(selectedNextHearingDate)
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DDTHH:mm:ssZ");
      mutateUpdateNextHearingDate({
        next_hearing_date: formattedDate,
        note: nextHearingReason,
        case_stage: singleServiceDetails?.stage,
        case_sub_stage: "Summons",
      });
    }

    setShowNextHearingDialog(false);
  };

  const handleDateChange = (value: Date | undefined) => {
    if (value) {
      setSelectedNextHearingDate(value);
      setShowNextHearingDialog(true);
    }
  };

  const handleManage = () => {
    const basePath = isLegalOpinion
      ? `/legal-opinion/service/${service_id}${isUser() ? "/user/manage" : "/manage"}`
      : `/litigations/service/${service_id}${isUser() ? "/user/manage" : "/manage"}`;

    navigate({ to: basePath });
  };

  const handleManageClose = () => {
    if (isLegalOpinion) {
      navigate({
        to: `/legal-opinion/service/${service_id}/notes`,
      });
    } else {
      navigate({
        to: `/litigations/service/${service_id}/case-history`,
      });
    }
  };

  const handleBack = () => {
    const origin = sessionStorage.getItem("case-origin");

    if (origin === "legal-opinion") {
      navigate({ to: "/legal-opinion" });
    } else if (origin === "litigation") {
      navigate({ to: "/litigations" });
    } else {
      navigate({ to: "/dashboard" }); // Fallback
    }
  };

  useEffect(() => {
    if (singleServiceDetails?.next_hearing_date) {
      setDate(dayjs(singleServiceDetails.next_hearing_date).toDate());
    }
  }, [singleServiceDetails]);

  return (
    <>
      {isLoading || unAuthorized ? (
        <LoadingComponent
          loading={isLoading || unAuthorized}
          message="Case details..."
        />
      ) : (
        <>
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <Button
                className="hover:bg-gray-100 px-0 !shadow-none cursor-pointer border h-7 w-8 bg-gray-50 border-gray-300 rounded-none hover:border-gray-400"
                onClick={handleBack}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex flex-wrap items-center gap-2 max-w-full overflow-hidden">
                <p className="hidden lg:flex items-center m-0">
                  <span className="text-black text-opacity-80 font-normal text-[11px] 3xl:text-sm">
                    File ID :
                  </span>{" "}
                  <span className="text-black font-normal bg-[#F2F2F2] px-1.5 mx-1 text-xs 3xl:text-base ">
                    {singleServiceDetails?.temp_id}
                  </span>
                </p>
                {serviceData?.cnr_number && (
                  <p className="hidden lg:flex items-center m-0">
                    <span className="text-black pr-1 text-opacity-80 font-normal text-[11px] 3xl:text-sm">
                      CNR Number :
                    </span>{" "}
                    <span className="text-black font-normal  bg-[#F2F2F2] px-2  text-xs 3xl:text-base">
                      {serviceData?.cnr_number}
                    </span>
                  </p>
                )}

                {serviceData?.cmp_number && (
                  <p className="hidden lg:flex items-center m-0">
                    <span className="text-black pr-1 text-opacity-80 font-normal text-[11px] 3xl:text-sm">
                      CMP Number :
                    </span>{" "}
                    <span className="text-black font-normal  bg-[#F2F2F2] px-2  text-xs 3xl:text-base">
                      {serviceData?.cmp_number}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* // Record Payment Section need to clarify with online or offline and both */}
              <RecordPayment />
              <Todo case_id={service_id} iconType="alternate" />
              {!isManage ? (
                <Button
                  className="flex items-center gap-2 h-7 py-1 bg-gray-200 cursor-pointer border border-black rounded-none font-normal text-smd 3xl:text-base"
                  onClick={handleManage}
                >
                  <ManageCaseIcon />
                  <span>Manage Case</span>
                </Button>
              ) : (
                <Button
                  className="flex items-center gap-2 h-7 border-red-500 cursor-pointer bg-white border  hover:bg-gray-100 rounded-none font-normal text-sm 3xl:text-base"
                  onClick={handleManageClose}
                >
                  <span className="text-red-500 font-medium">Close</span>
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[25%_75%] space-x-4 h-[calc(100vh-135px)] relative">
            <>
              {/* Left Panel */}
              <div className="flex flex-col gap-4 h-full overflow-y-auto relative hearingdate">
                <DetailsCard details={serviceData} />
                {serviceData?.service_type === "Legal opinion" && (
                  <div className="bg-gray-100 border rounded-none border-gray-400 p-2 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-normal text-gray-800">
                      Due Date :{" "}
                      <span className="text-gray-600 font-normal">
                        {serviceData?.due_date
                          ? dayjs(serviceData?.due_date).format("DD MMM YYYY")
                          : "--"}
                      </span>
                    </span>
                  </div>
                )}

                {serviceData?.service_type === "Litigation" && (
                  <div>
                    {activateFinalHearing && (
                      <div className="p-2 bg-[#F0F4FA] font-normal space-y-2">
                        {/* Row 1: Date + Icon */}
                        <div className="flex flex-wrap justify-between items-center gap-y-2">
                          {/* Left Side: Date/Picker */}
                          <div className="flex items-center gap-1 lg:text-xs xl:text-base 2xl:text-lg 3xl:text-xl">
                            {isUser() || deactivatedFinalHearing ? (
                              <div className="flex items-center gap-2 flex-wrap">
                                <div className="text-gray-600 text-xs 2xl:text-sm shrink-0">
                                  Next Hearing Date
                                </div>
                                <div className="text-xs 2xl:text-sm truncate max-w-[180px]">
                                  {singleServiceDetails?.next_hearing_date
                                    ? dayjs(
                                        singleServiceDetails.next_hearing_date
                                      ).format("DD MMM YYYY h:mm a")
                                    : "--"}
                                </div>
                              </div>
                            ) : (
                              <>
                                <DatePicker
                                  onDateSelect={handleDateChange}
                                  caseDetails={singleServiceDetails}
                                />
                                {!isPendingHearingDate ? (
                                  <div className="text-xs sm:text-sm">
                                    {date ? (
                                      <div className="flex items-center gap-1 flex-wrap">
                                        <div className="text-xs truncate max-w-[120px]">
                                          {formatDate(String(date))}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {dayjs(date).format("h:mm a")}
                                        </div>
                                      </div>
                                    ) : (
                                      "--"
                                    )}
                                  </div>
                                ) : (
                                  <Loader2 className="animate-spin h-4 w-4" />
                                )}
                              </>
                            )}
                          </div>

                          {/* Right Side: Eye Icon */}
                          <div className="shrink-0 self-start">
                            <NextHearingDrawer
                              isFetchingNextPage={isFetchingNextPage}
                              hasNextPage={hasNextPage}
                              fetchNextPage={fetchNextPage}
                              caseNotes={nextHearingNotes}
                              isLoadingCaseNote={isLoadingCaseNote}
                            />
                          </div>
                        </div>

                        {/* Row 2: Notes shown below date */}
                        {nextHearingNotes?.pages?.[0]?.data?.[0]?.note && (
                          <div className="w-full text-xs 3xl:text-sm text-gray-600 font-normal">
                            <NoteWithShowMore
                              notes={
                                nextHearingNotes?.pages?.[0]?.data?.[0]?.note ||
                                ""
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Current Tabs Layout */}
              <div className="h-full ">
                <Outlet />
              </div>
            </>
            <NextHearingDialog
              removeConfirm={showNextHearingDialog}
              setRemoveConfirm={setShowNextHearingDialog}
              onCancel={() => setShowNextHearingDialog(false)}
              onConfirm={handleConfirmNextHearing}
              isDeleteLoading={isPendingHearingDate}
              setApproveRejectReason={setNextHearingReason}
              dialogType="approve"
              appRejError={nextHearingError}
              setAppRejError={setNextHearingError}
              isPending={isPendingHearingDate}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ServiceViewComponent;
