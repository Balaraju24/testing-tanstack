import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import DefaultUserIcon from "@/components/icons/default-user";
import NoSummaryData from "@/components/icons/summary-no-data";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { caseViewNotesAPI } from "@/http/services/manage";
import { summaryViewAPI } from "@/http/services/service";
import { Note, NotesReadStatus } from "@/lib/interfaces/service";
import { userStore } from "@/store/userDetails";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import dayjs from "dayjs";
import { useCallback, useRef, useState } from "react";
import TabValuesForViewCase from "./TabValuesForViewCase";

const ServiceCaseHistory = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const { service_id } = useParams({ strict: false });
  const [selectedSummaryId, setSelectedSummaryId] = useState<number | null>(
    null
  );
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const userType = userDetails?.id;
  const isViewPanelOpen = !!selectedSummaryId;
  const { caseStagesData } = UseContextAPI();

  const fetchCaseSummary = async ({ pageParam = 1 }) => {
    try {
      if (!service_id) return;
      const queryParams = { page: pageParam, page_size: 10, types: "SUMMARY" };
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
      throw new Error("Failed to fetch case history");
    }
  };

  const {
    data: caseSummary,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-history", "summary", service_id],
    queryFn: fetchCaseSummary,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor ?? null,
    refetchOnWindowFocus: false,
  });

  const allRecords = caseSummary?.pages.map((e: any) => e.data).flat() || [];
  const selectedSummary = allRecords.find(
    (record: Note) => record.id === selectedSummaryId
  );

  const lastSummaryRef = useCallback(
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

  const { mutate: mutateSummaryView } = useMutation({
    mutationFn: async (summaryId: number) => {
      const payload = {
        summary_ids: [Number(summaryId)],
      };
      const response = await summaryViewAPI(payload);
      return response?.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleViewClick = (summaryId: number) => {
    setSelectedSummaryId(summaryId === selectedSummaryId ? null : summaryId);

    const isRecordUnread = allRecords?.some(
      (record: Note) =>
        record.id === summaryId &&
        record?.notes_read_status?.some(
          (item: NotesReadStatus) => !item.is_seen && item.user_id === userType
        )
    );

    if (isRecordUnread) {
      mutateSummaryView(summaryId);
    }
  };

  const renderTableRows = allRecords.map((record: Note, index: number) => {
    const isRecordUnread = record.notes_read_status?.some(
      (item: NotesReadStatus) => !item.is_seen && item.user_id === userType
    );

    const fullUsername = `${record?.created_by?.first_name} ${record?.created_by?.last_name}`;
    const fullTitle = record?.title || "No Title";
    return (
      <TableRow
        key={index}
        className={`border-t border-gray-200 hover:bg-gray-50 transition-colors ${
          selectedSummaryId === record.id ? "bg-blue-50" : "bg-white"
        }`}
        ref={index === allRecords.length - 1 ? lastSummaryRef : null}
      >
        {/* User Cell */}
        <TableCell className="px-4 py-1 border-r border-gray-200 relative">
          {isRecordUnread && (
            <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 flex items-center justify-center">
              {record?.created_by?.profile_pic ? (
                <AvatarImage src={record.created_by?.profile_pic} />
              ) : (
                <DefaultUserIcon className="w-4 2xl:w-5 2xl:h-5 h-4" />
              )}
            </Avatar>
            <div>
              <div className="2xl:text-sm text-xs capitalize font-normal text-gray-900 truncate max-w-[80px]">
                {fullUsername}
              </div>
              <div className="text-[10px] 2xl:text-xs text-gray-500">
                {dayjs(record.created_at).format("DD MMM YYYY")}
              </div>
            </div>
          </div>
        </TableCell>

        {/* Title Cell */}
        <TableCell className="px-4 py-1 border-r border-gray-200 font-normal break-words">
          <div
            className={`line-clamp-2 text-gray-900 truncate ${
              isViewPanelOpen ? "w-12" : "w-32"
            }`}
            title={fullTitle}
          >
            {fullTitle}
          </div>
        </TableCell>

        {/* Stage Cell */}
        <TableCell className="px-4 py-1 border-r border-gray-200 font-normal">
          <div className="text-xs text-gray-900">
            {caseStagesData?.stages?.find(
              (sub: any) => sub.code === record?.case_stage
            )?.title ||
              record?.case_stage ||
              "--"}
          </div>
          <div className="text-xs text-gray-500">
            {caseStagesData?.sub_stages?.find(
              (sub: any) => sub.code === record?.case_sub_stage
            )?.title ||
              record?.case_sub_stage ||
              "--"}
          </div>
        </TableCell>

        {/* Notes Preview */}
        <TableCell className="px-4 py-1 border-r border-gray-200 2xl:text-sm text-xs font-normal">
          <div className="text-gray-700 break-words whitespace-pre-wrap line-clamp-2">
            {record?.note}
          </div>
        </TableCell>

        {/* Actions */}
        {!isViewPanelOpen && (
          <TableCell className="px-4 py-1">
            <Button
              className="2xl:text-sm text-xs h-fit py-1 px-2 !shadow-none cursor-pointer bg-blue-50 text-black hover:bg-blue-100 border border-gray-200 rounded-md"
              onClick={() => handleViewClick(record.id)}
            >
              View
            </Button>
          </TableCell>
        )}
      </TableRow>
    );
  });

  const notesTableContent =
    isLoading && !isFetchingNextPage ? (
      <div className="flex items-center justify-center h-full">
        <LoadingComponent loading={isLoading} message="Loading Notes..." />
      </div>
    ) : allRecords?.length > 0 ? (
      <div className="bg-white border border-gray-200 overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="text-left w-32 font-normal px-4 py-2 border-r border-gray-200">
                User Name
              </TableHead>
              <TableHead className="text-left font-normal px-4 py-2 border-r border-gray-200">
                Title
              </TableHead>
              <TableHead className="text-left font-normal px-4 py-2 border-r border-gray-200">
                Stage
              </TableHead>
              <TableHead className="text-left font-normal px-4 py-2 border-r border-gray-200">
                Notes
              </TableHead>
              {!isViewPanelOpen && (
                <TableHead className="text-left w-20 font-normal px-4 py-2">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableRows}</TableBody>
        </Table>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <NoSummaryData className="w-60 h-60 text-gray-400" />
        <span>No Case History Available</span>
      </div>
    );

  return (
    <div className="border border-gray-300 flex flex-col h-[calc(100vh-132px)]">
      <TabValuesForViewCase />
      <div className="flex flex-1 p-4 gap-2 overflow-hidden">
        {/* Table Section */}
        <div className="flex-1 relative overflow-auto">
          {notesTableContent}
          {isFetchingNextPage && (
            <div className="flex justify-center py-2">
              <div>Loading Notes...</div>
            </div>
          )}
        </div>

        {/* Slide-in Panel */}
        {selectedSummaryId && (
          <div
            className={`bg-gray-100 flex-shrink-0 overflow-auto transition-all duration-1500 ease-in-out ${
              isViewPanelOpen ? "w-2/5 border-l border-gray-200" : "w-0"
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-normal">
                  {selectedSummary?.created_by?.first_name}{" "}
                  {selectedSummary?.created_by?.last_name}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSummaryId(null)}
                  className="h-fit bg-red-200 text-red-400 text-sm rounded-none"
                >
                  Close
                </Button>
              </div>
              <div className="mt-2">
                <h2 className="text-base font-medium mb-2">
                  {selectedSummary?.title}
                </h2>
                <div className="text-gray-700">
                  {selectedSummary?.note
                    .split("\n")
                    .map((item: string, index: number) => (
                      <div
                        key={index}
                        className="text-black text-opacity-60 text-sm"
                      >
                        {item.trim()}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCaseHistory;
