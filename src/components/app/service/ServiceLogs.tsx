import LoadingComponent from "@/components/core/Loading";
import { caseViewLogAPI } from "@/http/services/service";
import { Log } from "@/lib/interfaces/service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useCallback, useRef } from "react";
import TabValuesForViewCase from "./TabValuesForViewCase";

const ServiceLogs = () => {
  const { service_id } = useParams({ strict: false });
  const fetchLogs = async ({ pageParam = 1 }) => {
    let queryParams = { page: pageParam, page_size: 15 };
    let response = await caseViewLogAPI(service_id as string, queryParams);
    return {
      data: response?.data?.data?.records,
      nextCursor: response?.data?.data?.pagination_info?.next_page
        ? response?.data?.data?.pagination_info?.current_page + 1
        : null,
      prevCursor:
        response?.data?.data?.pagination_info?.current_page != 1
          ? response?.data?.data?.pagination_info?.current_page - 1
          : null,
      totalRecords: response?.data?.data?.pagination_info?.total_records,
    };
  };
  const {
    data: caseLogs,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-logs"],
    queryFn: fetchLogs,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });
  const observer = useRef<IntersectionObserver | null>(null);
  const lastLogRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const allRecords = caseLogs?.pages.map((e: any) => e.data).flat() || [];
  return (
    <div className="border border-gray-300">
      <TabValuesForViewCase />
      <div className="h-[calc(100vh-155px)] overflow-auto relative p-4">
        {isLoading && !isFetchingNextPage ? (
          <LoadingComponent loading={isLoading} message="Logs" />
        ) : allRecords?.length > 0 ? (
          allRecords?.map((record: Log, index: number) => {
            const isLastLog = index === allRecords.length - 1;
            return (
              <div
                key={record.id}
                ref={isLastLog ? lastLogRef : null}
                className="flex items-center gap-2 justify-start mb-1 hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded-md py-1 px-2"
              >
                <div className="flex items-center justify-center w-3 h-3  bg-black text-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-2 justify-start">
                  <span className="space-x-1 shrink-0">
                    <span className="font-medium text-black text-xs 3xl:text-sm">
                      {dayjs(record.created_at).format("MMM DD")}
                    </span>
                    <span className="font-medium text-black text-xs 3xl:text-sm before:content-['['] space-x-0 after:content-[']']">
                      {dayjs(record.created_at).format("hh:mm A")}
                    </span>
                  </span>
                  <span className="text-gray-600 text-sm mt-1 3xl:text-base font-light">
                    {record.description}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          !isLoading && (
            <div className=" max-w-full mx-auto">
              <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex items-center gap-4 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Log Title
                  </h4>
                  <p className="text-xs text-gray-600">
                    Log description goes here.
                  </p>
                </div>
              </div>
            </div>
          )
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ServiceLogs;
