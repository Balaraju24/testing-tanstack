import PaginationComponent from "@/components/core/Pagination";
import TanStackTable from "@/components/core/TanstackTable";
import GridViewIcon from "@/components/icons/Dashboard/grid-view-icon";
import TableViewIcon from "@/components/icons/Dashboard/table-view-icon";
import { Button } from "@/components/ui/button";
import { getAllLitigationAPI } from "@/http/services/litigations";
import { DEFAULT_HEIGHT_CLASS } from "@/lib/constants/advocate";
import { heightClassProps } from "@/lib/interfaces/advocate";
import { PaginationType } from "@/lib/interfaces/pagination";
import { userStore } from "@/store/userDetails";
import { getInitialView } from "@/utils/helpers/getInitialView";
import {
  VIEW_KEYS,
  viewStateHelper,
  ViewType,
} from "@/utils/helpers/navigateHelper";
import NoDataDisplay from "@/components/core/NoDataBlock";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useRouter } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import CaseCard from "../../core/CaseCard";
import SearchFilter from "../../core/SearchFilter";
import EmptyCaseCard from "./EmptyCaseCard";
import LitigationsColumns from "./LitigationsColumns";
import SearchDropdown from "@/components/core/SearchDropdown";
import { caseStatusConstants } from "@/lib/constants/statusConstants";

const Litigations = ({
  heightClass = DEFAULT_HEIGHT_CLASS,
}: heightClassProps) => {
  const router = useRouter();
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstLoad = useRef(true);
  const searchParams = new URLSearchParams(location.search);
  const [isClient, setIsClient] = useState(false);
  const [tabsValue, setTabsValue] = useState<ViewType>(getInitialView());
  const [searchString, setSearchString] = useState<string>(
    searchParams.get("search_string") || ""
  );
  const [debounceSearchString, setDebounceSearchString] = useState<string>(
    searchParams.get("search_string") || ""
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    searchParams.get("status") || ""
  );

  const statusLabel =
    caseStatusConstants.find((s) => s.value === selectedStatus)?.label || "";
  const [searchStatus, setSearchStatus] = useState<string>(statusLabel);
  const [pagination, setPagination] = useState<PaginationType>({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15,
  });
  const { isAdvocate, isAdmin, isUser } = useUserDetails();
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const litigationsColumns = LitigationsColumns();

  const {
    isLoading,
    data: litigationsData,
    refetch,
  } = useQuery({
    queryKey: [
      "getLitigation",
      pagination,
      userDetails?.id,
      debounceSearchString,
      tabsValue,
      selectedStatus,
    ],
    queryFn: async () => {
      const queryParams = {
        page: Number(pagination.current_page),
        page_size: Number(pagination.page_size),
        ...(debounceSearchString && { search_string: debounceSearchString }),
        ...(selectedStatus && { status: selectedStatus }),
        view: tabsValue,
      };

      router.navigate({
        to: "/litigations",
        search: queryParams,
      });

      const response = await getAllLitigationAPI(queryParams);

      if (response?.status === 200 || response?.status === 201) {
        return response.data?.data;
      }
    },
    enabled: !!pagination.current_page,
    refetchOnWindowFocus: false,
  });

  const showLitigationPagination =
    !isLoading &&
    litigationsData?.pagination_info &&
    litigationsData?.records &&
    litigationsData?.records?.length > 0;

  const getCases = async ({
    page,
    page_size,
  }: {
    page: number;
    page_size: number;
  }) => {
    setPagination({ current_page: page, page_size });
    router.navigate({
      to: "/litigations",
      search: {
        ...Object.fromEntries(searchParams),
        page,
        page_size,
        view: tabsValue,
      },
    });
  };

  const capturePageNum = (current_page: number) => {
    setPagination((prev) => ({ ...prev, current_page }));
    router.navigate({
      to: "/litigations",
      search: {
        ...Object.fromEntries(searchParams),
        page: current_page,
        view: tabsValue,
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
      to: "/litigations",
      search: {
        ...Object.fromEntries(searchParams),
        page_size: pageSize,
        page: 1,
        view: tabsValue,
      },
    });
  };

  const handleViewModeChange = (value: ViewType) => {
    setTabsValue(value);
    viewStateHelper.setViewState(VIEW_KEYS.LITIGATION, value);
    router.navigate({
      to: "/litigations",
      search: {
        ...Object.fromEntries(searchParams),
        view: value,
        page: pagination.current_page,
        page_size: pagination.page_size,
      },
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchString(searchString);
      if (!isFirstLoad.current) {
        setPagination((prev) => ({ ...prev, current_page: 1 }));
        router.navigate({
          to: "/litigations",
          search: {
            ...Object.fromEntries(searchParams),
            search_string: searchString,
            page: 1,
            page_size: pagination.page_size,
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

  const filteredStatusConstants = caseStatusConstants.filter((s) =>
    s.label.includes(searchStatus)
  );
  return (
    <div className="overflow-hidden h-full relative">
      {isClient && (
        <>
          <div className="flex justify-between items-center gap-x-8 mb-2">
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
            <div className="flex gap-x-3">
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
                  className="bg-black !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-none h-9 px-6 py-0 transition duration-300 text-sm  3xl:text-base font-normal"
                  onClick={() => navigate({ to: "/create-litigation" })}
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
            <div className="">
              <TanStackTable
                data={litigationsData?.records || []}
                columns={litigationsColumns}
                paginationDetails={litigationsData?.pagination_info}
                getData={getCases}
                loading={isLoading}
                removeSortingForColumnIds={[
                  "case_reference",
                  "service_type",
                  "customer_name",
                  "advocate_name",
                  "priority",
                  "organization_name",
                  "next_hearing",
                  "advocates",
                  "actions",
                ]}
                heightClass={heightClass}
                noDataLabel="litigations"
                noDataDescription={
                  "Get started by creating your first litigations"
                }
                showNoDataIcon={true}
                noDataHeight={heightClass || "h-[calc(100vh-170px)]"}
              />
            </div>
          ) : (
            <div className="flex flex-col h-[calc(100vh-115px)]">
              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <EmptyCaseCard />
                ) : litigationsData?.records &&
                  litigationsData?.records?.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xll:grid-cols-4  2xl:gap-4">
                    {litigationsData?.records?.map((record: any) => (
                      <CaseCard
                        key={record.id}
                        record={record}
                        refetch={refetch}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-120">
                    <NoDataDisplay
                      title="litigations"
                      description={
                        debounceSearchString
                          ? "Try adjusting your search criteria"
                          : "Get started by creating your first litigation"
                      }
                      hasSearch={!!debounceSearchString}
                      height="h-full"
                    />
                  </div>
                )}
              </div>

              {showLitigationPagination && (
                <div className="flex justify-center items-center gap-4 border-gray-200">
                  <PaginationComponent
                    paginationDetails={litigationsData?.pagination_info}
                    capturePageNum={capturePageNum}
                    captureRowPerItems={captureRowPerItems}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Litigations;
