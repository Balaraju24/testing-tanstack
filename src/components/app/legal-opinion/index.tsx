import Pagination from "@/components/core/Pagination";
import TanStackTable from "@/components/core/TanstackTable";
import GridViewIcon from "@/components/icons/Dashboard/grid-view-icon";
import TableViewIcon from "@/components/icons/Dashboard/table-view-icon";
import { Button } from "@/components/ui/button";
import { getAllLegalOpinionAPI } from "@/http/services/litigations";
import { DEFAULT_HEIGHT_CLASS } from "@/lib/constants/advocate";
import { heightClassProps } from "@/lib/interfaces/advocate";
import { PaginationType } from "@/lib/interfaces/pagination";
import { userStore } from "@/store/userDetails";
import { addSerial } from "@/utils/helpers/app";
import { getInitialView } from "@/utils/helpers/getInitialView";
import {
  VIEW_KEYS,
  viewStateHelper,
  ViewType,
} from "@/utils/helpers/navigateHelper";
import NoDataDisplay from "@/components/core/NoDataBlock";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRouter } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CaseCard from "../../core/CaseCard";
import SearchFilter from "../../core/SearchFilter";
import EmptyCaseCard from "../litigation/EmptyCaseCard";
import LegalOpinionColumns from "./LegalOpinionColumns";
import SearchDropdown from "@/components/core/SearchDropdown";
import { caseStatusConstants } from "@/lib/constants/statusConstants";

const LegalOpinion = ({
  heightClass = DEFAULT_HEIGHT_CLASS,
}: heightClassProps) => {
  const router = useRouter();
  const location = useLocation();
  const isFirstLoad = useRef(true);
  const searchParams = new URLSearchParams(location.search);
  const [tabsValue, setTabsValue] = useState<ViewType>(getInitialView());
  const [isClient, setIsClient] = useState(false);
  const [searchString, setSearchString] = useState<string>(
    searchParams.get("search_string") || ""
  );
  const [debounceSearchString, setDebounceSearchString] = useState<string>(
    searchParams.get("search_string") || ""
  );
  const [pagination, setPagination] = useState<PaginationType>({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15,
  });
  const { isAdvocate, isAdmin, isUser } = useUserDetails();
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    searchParams.get("status") || ""
  );

  const statusLabel =
    caseStatusConstants.find((s) => s.value === selectedStatus)?.label || "";
  const [searchStatus, setSearchStatus] = useState<string>(statusLabel);

  const lawyerColumns = LegalOpinionColumns();

  const {
    isLoading,
    data: lawyersData,
    refetch,
  } = useQuery({
    queryKey: [
      "legalOpinion",
      pagination,
      debounceSearchString,
      userDetails?.id,
      tabsValue,
      selectedStatus,
    ],
    queryFn: async () => {
      let queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        service_type: "Legal opinion",
        view: tabsValue,
        ...(debounceSearchString && { search_string: debounceSearchString }),
        ...(selectedStatus && { status: selectedStatus }),
      };

      router.navigate({
        to: "/legal-opinion",
        search: queryParams,
      });

      const response = await getAllLegalOpinionAPI(queryParams);

      if (response.status === 200 || response.status === 201) {
        const { records, pagination_info } = response?.data?.data;
        let responseAfterSerial =
          addSerial(
            records,
            pagination_info.current_page,
            pagination_info.page_size
          ) || [];
        return { records: responseAfterSerial, pagination_info };
      }
    },
    enabled: !!pagination.current_page,
    refetchOnWindowFocus: false,
  });

  const handleViewModeChange = (value: ViewType) => {
    setTabsValue(value);

    viewStateHelper.setViewState(VIEW_KEYS.LEGAL_OPINION, value);

    router.navigate({
      to: "/legal-opinion",
      search: {
        ...Object.fromEntries(searchParams),
        view: value,
        page: pagination.current_page,
        page_size: pagination.page_size,
        service_type: "Legal opinion",
      },
    });
  };

  const getCases = async ({
    page,
    page_size,
  }: {
    page: number;
    page_size: number;
  }) => {
    setPagination({ current_page: page, page_size });
    router.navigate({
      to: "/legal-opinion",
      search: {
        ...Object.fromEntries(searchParams),
        page,
        page_size,
        view: tabsValue,
        service_type: "Legal opinion",
      },
    });
  };

  const capturePageNum = (current_page: number) => {
    setPagination((prev) => ({ ...prev, current_page }));
    router.navigate({
      to: "/legal-opinion",
      search: {
        ...Object.fromEntries(searchParams),
        page: current_page,
        view: tabsValue,
        service_type: "Legal opinion",
      },
    });
  };

  const captureRowPerItems = (pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      page_size: pageSize,
      current_page: 1,
    }));
    router.navigate({
      to: "/legal-opinion",
      search: {
        ...Object.fromEntries(searchParams),
        page_size: pageSize,
        page: 1,
        view: tabsValue,
        service_type: "Legal opinion",
      },
    });
  };

  const filteredStatusConstants = caseStatusConstants.filter((s) =>
    s.label.includes(searchStatus)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchString(searchString);
      if (!isFirstLoad.current) {
        setPagination((prev) => ({ ...prev, current_page: 1 }));
        router.navigate({
          to: "/legal-opinion",
          search: {
            ...Object.fromEntries(searchParams),
            search_string: searchString,
            page: 1,
            page_size: pagination.page_size,
            service_type: "Legal opinion",
          },
        });
      } else {
        isFirstLoad.current = false;
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchString]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="overflow-hidden h-full relative">
      {isClient && (
        <>
          <div className="flex justify-between items-center gap-x-8 mb-2 mx-0">
            <div className="flex items-center border border-gray-200">
              <Button
                variant={tabsValue === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => handleViewModeChange("table")}
                className={`h-8 px-3 !rounded-none  cursor-pointer ${
                  tabsValue === "table"
                    ? "bg-gray-200 text-white"
                    : "bg-white-300 text-white hover:bg-gray-50 "
                }`}
              >
                <TableViewIcon className="w-5 h-5" />
              </Button>
              <Button
                variant={tabsValue === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => handleViewModeChange("grid")}
                className={`h-8 !rounded-none px-3 cursor-pointer ${
                  tabsValue === "grid"
                    ? "bg-gray-200 text-white"
                    : "bg-white-300 text-white hover:bg-gray-50 "
                }`}
              >
                <GridViewIcon className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex gap-x-3 ">
              {!isUser() && (
                <SearchFilter
                  searchString={searchString}
                  setSearchString={setSearchString}
                  title="Search by Point of Contact"
                />
              )}
              {(isAdmin() || isUser()) && (
                <SearchDropdown
                  options={filteredStatusConstants}
                  value={selectedStatus}
                  onSelect={(option: any) => {
                    setSelectedStatus(option.value);
                    setSearchStatus(option.label);
                  }}
                  onClear={() => {
                    setSelectedStatus("");
                    setSearchStatus("");
                  }}
                  placeholder="Filter by Status"
                  getOptionLabel={(option: any) => option.label}
                  getOptionKey={(option: any) => option.value}
                  isSelected={(option: any) => option.value === selectedStatus}
                  width="w-44"
                  className="h-9"
                  searchValue={searchStatus}
                  onSearchChange={setSearchStatus}
                />
              )}

              {!isAdvocate() && !isAdmin() && (
                <Button
                  onClick={() =>
                    router.navigate({ to: "/create-legal-opinion" })
                  }
                  className="bg-black !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-none h-9 px-6 py-0 transition duration-300 text-sm  3xl:text-base font-normal"
                >
                  <div className="flex flex-row space-x-1 justify-center items-center  ">
                    <PlusIcon className="font-extralight w-6 h-6 group-hover:rotate-90 duration-300" />
                    <div className="font-extralight"> New Service</div>
                  </div>
                </Button>
              )}
            </div>
          </div>

          {tabsValue === "table" ? (
            <div>
              <TanStackTable
                data={lawyersData?.records || []}
                columns={lawyerColumns}
                paginationDetails={lawyersData?.pagination_info || {}}
                getData={getCases}
                loading={isLoading}
                removeSortingForColumnIds={[
                  "service_id",
                  "status",
                  "due_date",
                  "actions",
                  "advocate_name",
                  "customer_name",
                  "organization_name",
                  "phone",
                ]}
                heightClass={heightClass}
                noDataLabel="legal opinions"
                noDataDescription={
                  debounceSearchString
                    ? "Try adjusting your search criteria"
                    : "Get started by creating your first legal opinion"
                }
                showNoDataIcon={true}
                noDataHeight={heightClass || "h-[calc(100vh-170px)]"}
              />
            </div>
          ) : (
            <div className={`flex flex-col h-[calc(100vh-115px)]`}>
              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <EmptyCaseCard />
                ) : lawyersData?.records && lawyersData?.records.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4  p-0">
                    {lawyersData?.records?.map((record: any) => (
                      <CaseCard key={record.id} record={record} />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-120">
                    <NoDataDisplay
                      title="legal opinions"
                      description={
                        debounceSearchString
                          ? "Try adjusting your search criteria"
                          : "Get started by creating your first legal opinion"
                      }
                      hasSearch={!!debounceSearchString}
                      height="h-full"
                    />
                  </div>
                )}
              </div>
              {lawyersData?.records &&
                lawyersData?.records.length > 0 &&
                lawyersData?.pagination_info && (
                  <div className="sticky bottom-0 bg-white">
                    <div className="flex justify-center items-center gap-4">
                      <Pagination
                        paginationDetails={lawyersData?.pagination_info}
                        capturePageNum={capturePageNum}
                        captureRowPerItems={captureRowPerItems}
                      />
                    </div>
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LegalOpinion;
