import TanStackTable from "@/components/core/TanstackTable";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearch } from "@tanstack/react-router";
import SearchFilter from "@/components/core/SearchFilter";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DEFAULT_HEIGHT_CLASS } from "@/lib/constants/advocate";
import { heightClassProps } from "@/lib/interfaces/advocate";
import { PaginationType } from "@/lib/interfaces/pagination";
import { addSerial } from "@/utils/helpers/app";
import { getAllAdvocateAPI } from "@/http/services/advocate";
import ManagerColumns from "./ManagerColumns";

const ManagerList = ({
  heightClass = DEFAULT_HEIGHT_CLASS,
}: heightClassProps) => {
  const router = useRouter();
  const search = useSearch({ strict: false }) as {
    page: string;
    page_size: string;
    search_string: string;
  };
  const [searchString, setSearchString] = useState<string>(
    search.search_string || ""
  );
  const [debounceSearchString, setDebounceSearchString] = useState<string>(
    search.search_string || ""
  );
  console.log("searchString", searchString);

  const [pagination, setPagination] = useState<PaginationType>({
    current_page: Number(search.page) || 1,
    page_size: Number(search.page_size) || 15,
  });

  const lawyerColumns = ManagerColumns();

  const { isLoading, data: lawyersData } = useQuery({
    queryKey: ["manager", pagination, debounceSearchString],
    queryFn: async () => {
      let queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        user_type: "MANAGER",
        ...(debounceSearchString && { search_string: debounceSearchString }),
      };

      const response = await getAllAdvocateAPI(queryParams);
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
        to: "/managers",
        search: {
          page: queryParams.page,
          page_size: queryParams.page_size,
          ...(debounceSearchString && { search_string: debounceSearchString }),
        },
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

  useEffect(() => {
    const newPage = Number(search.page) || 1;
    const newPageSize = Number(search.page_size) || 15;
    const newSearch = search.search_string || "";
    setPagination({ current_page: newPage, page_size: newPageSize });
    setSearchString(newSearch);
    setDebounceSearchString(newSearch);
  }, [search.page, search.page_size, search.search_string]);

  useEffect(() => {
    const searchParams = {
      page: pagination.current_page,
      page_size: pagination.page_size,
      ...(debounceSearchString && { search_string: debounceSearchString }),
    };

    router.navigate({
      search: searchParams as any,
      replace: true,
    });
  }, [
    pagination.current_page,
    pagination.page_size,
    debounceSearchString,
    router,
  ]);

  return (
    <div className="overflow-hidden h-full relative">
      <>
        <div className="flex justify-end items-center gap-x-8 mb-2">
          <div className="flex gap-x-3">
            <SearchFilter
              searchString={searchString}
              setSearchString={setSearchString}
              title="Search by name"
            />
            <Button
              className="bg-black !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-none h-9 px-6 py-0 transition duration-300 text-sm  3xl:text-base font-normal"
              onClick={() => router.navigate({ to: "/create-manager" })}
            >
              <span className="flex items-center space-x-2">
                <PlusIcon className="font-extralight w-6 h-6 group-hover:rotate-90 duration-300 " />
                <span className="font-extralight">Add Manager</span>
              </span>
            </Button>
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
              "location",
            ]}
            heightClass={heightClass}
            noDataLabel="advocates"
            noDataDescription={"Get started by creating your first advocate"}
            showNoDataIcon={true}
            noDataHeight={"h-[calc(100vh-170px)]"}
          />
        </div>
      </>
    </div>
  );
};

export default ManagerList;
