import TanStackTable from "@/components/core/TanstackTable";
import { Button } from "@/components/ui/button";
import { getAllOganizationAPI } from "@/http/services/organization";
import { DEFAULT_HEIGHT_CLASS } from "@/lib/constants/advocate";
import { heightClassProps } from "@/lib/interfaces/advocate";
import { PaginationType } from "@/lib/interfaces/pagination";
import { addSerial } from "@/utils/helpers/app";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRouter } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SearchFilter from "../../core/SearchFilter";
import OrganizationColumns from "./organizationColumns";

const OrganizationList = ({
  heightClass = DEFAULT_HEIGHT_CLASS,
}: heightClassProps) => {
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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
  const { isAdmin } = useUserDetails();

  const lawyerColumns = OrganizationColumns();

  const { isLoading, data: lawyersData } = useQuery({
    queryKey: ["organization", pagination, debounceSearchString],
    queryFn: async () => {
      let queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        user_type: "CUSTOMER",
        ...(debounceSearchString && { search_string: debounceSearchString }),
      };
      const response = await getAllOganizationAPI(queryParams);

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
      router.navigate({
        to: "/organizations",
        search: queryParams,
      });
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const getAllLawyers = async ({
    page,
    page_size,
  }: {
    page: number;
    page_size: number;
  }) => {
    setPagination({ current_page: page, page_size });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setPagination((prev) => ({
        ...prev,
        current_page: searchString ? prev.current_page : 1,
      }));

      setDebounceSearchString(searchString);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchString]);

  return (
    <div className="overflow-hidden h-full relative">
      <>
        <div className="flex justify-end items-center gap-x-8 mb-2">
          <div className="flex gap-x-3">
            <SearchFilter
              searchString={searchString}
              setSearchString={setSearchString}
              title="Search by Employee"
            />
            {!isAdmin() && (
              <Button
                className="bg-black !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-none h-9 px-6 py-0 transition duration-300 text-sm  3xl:text-base font-normal"
                onClick={() => router.navigate({ to: "/create-organization" })}
              >
                <span className="flex items-center space-x-2">
                  <PlusIcon className="font-extralight w-6 h-6 group-hover:rotate-90 duration-300" />
                  <span className="font-extralight">Add Organization</span>
                </span>
              </Button>
            )}
          </div>
        </div>
        <div className="">
          <TanStackTable
            data={lawyersData?.records || []}
            columns={lawyerColumns}
            paginationDetails={lawyersData?.pagination_info || {}}
            getData={getAllLawyers}
            loading={isLoading}
            removeSortingForColumnIds={[
              "serial",
              "actions",
              "first_name",
              "gender",
              "designation",
              "email",
              "phone",
              "customer_id",
              "organisation_name",
              "employee_id",
              "location",
              "branch_name",
              "branch_code",
            ]}
            heightClass={heightClass}
            noDataLabel="organizations"
            noDataDescription={
              debounceSearchString
                ? "Try adjusting your search criteria"
                : "Get started by creating your first organization"
            }
            showNoDataIcon={true}
            noDataHeight={heightClass || "h-[calc(100vh-170px)]"}
          />
        </div>
      </>
    </div>
  );
};

export default OrganizationList;
