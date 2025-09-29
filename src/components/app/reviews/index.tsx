import TanStackTable from "@/components/core/TanstackTable";
import NoReviewsData from "@/components/icons/no-reviews-data";
import { getAllReviewsAPI } from "@/http/services/reviews";
import { DEFAULT_HEIGHT_CLASS } from "@/lib/constants/advocate";
import { heightClassProps } from "@/lib/interfaces/advocate";
import { addSerial } from "@/utils/helpers/app";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import SearchFilter from "../../core/SearchFilter";
import ReviewColumns from "./ReviewColumns";
import ReviewSheet from "./ReviewSheet";

const ReviewsList = ({
  heightClass = DEFAULT_HEIGHT_CLASS,
}: heightClassProps) => {
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchString, setSearchString] = useState<string>(
    searchParams.get("search_string") || ""
  );
  const [debounceSearchString, setDebounceSearchString] = useState<string>(
    searchParams.get("search_string") || ""
  );

  const [pagination, setPagination] = useState<any>({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15,
  });

  const handleClick = (id: number | null) => {
    setSelectedId(id);
  };

  const reviewColumns = ReviewColumns({ onViewClick: handleClick });

  const { isLoading, data: reviewData } = useQuery({
    queryKey: ["Review", pagination, debounceSearchString],
    queryFn: async () => {
      let queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        ...(debounceSearchString && { search_string: debounceSearchString }),
      };
      try {
        const response = await getAllReviewsAPI(queryParams);
        if (response.status === 200 || response.status === 201) {
          const { records, pagination_info } = response?.data?.data;
          let responseAfterSerial =
            addSerial(
              records,
              pagination_info.current_page,
              pagination_info.page_size
            ) || [];

          return { records: responseAfterSerial, pagination_info };
        } else {
          throw new Error(`API returned status: ${response.status}`);
        }
      } catch (error) {
        throw new Error(`Failed to fetch reviews: ${(error as Error).message}`);
      }
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const getAllReviews = async ({
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
      if (searchString !== debounceSearchString) {
        setPagination((prev) => ({
          ...prev,
          current_page: 1,
        }));
      }

      setDebounceSearchString(searchString);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchString, debounceSearchString]);

  useEffect(() => {
    const queryParams: any = {
      page: pagination.current_page,
      page_size: pagination.page_size,
    };

    if (debounceSearchString) {
      queryParams.search_string = debounceSearchString;
    }

    router.navigate({
      to: "/reviews",
      search: queryParams,
      replace: true,
    });
  }, [pagination, debounceSearchString, router]);

  return (
    <div className="overflow-hidden h-full relative">
      <div className="flex justify-end gap-x-8 mb-2">
        <SearchFilter
          searchString={searchString}
          setSearchString={setSearchString}
          title="Search by Point of Contact"
        />
      </div>

      <div className="">
        {!isLoading && !reviewData?.records?.length ? (
          <div className="h-[calc(100vh-180px)] flex flex-col items-center justify-center w-full relative">
            <NoReviewsData className="w-1/4" />
            <div className="mt-4 text-gray-500">No Reviews Found</div>
          </div>
        ) : (
          <div className="">
            <TanStackTable
              data={reviewData?.records || []}
              columns={reviewColumns}
              paginationDetails={reviewData?.pagination_info || {}}
              getData={getAllReviews}
              loading={isLoading}
              removeSortingForColumnIds={[
                "full_name",
                "case_id",
                "updated_at",
                "actions",
                "advisor",
                "advocate",
                "case_organisation_name",
              ]}
              heightClass={heightClass}
              noDataLabel="reviews"
              noDataDescription={
                debounceSearchString
                  ? "Try adjusting your search criteria"
                  : "No reviews have been submitted yet"
              }
              showNoDataIcon={true}
              noDataHeight={heightClass || "h-[calc(100vh-170px)]"}
            />

            {selectedId !== null && (
              <ReviewSheet
                selectedID={selectedId}
                onClose={() => setSelectedId(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
