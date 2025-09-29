import {
  getAllNotificationsAPI,
  getAllNotificationsCountsAPI,
  markAsReadAllAPI,
  markAsReadAPI,
} from "@/http/services/notification";
import { Notification } from "@/lib/interfaces/service";
import { formatDateWithTime } from "@/utils/helpers/manage";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import NoGeneralNotifications from "../icons/no-general-notifications";
import NotesCloseIcon from "../icons/notes-close-icon";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";

const GeneralNotifications = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { isUser } = useUserDetails();

  const { data: notificationCounts, refetch } = useQuery({
    queryKey: ["notificationCounts"],
    queryFn: async () => {
      const response = await getAllNotificationsCountsAPI();

      return response?.data?.data?.count || 0;
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const fetchNotifications = async ({ pageParam = 1 }) => {
    const queryParams = { page: pageParam, page_size: 10 };
    const response = await getAllNotificationsAPI(queryParams);

    return {
      data: response?.data?.data?.records || [],
      nextCursor: response?.data?.data?.pagination_info?.next_page
        ? response?.data?.data?.pagination_info?.current_page + 1
        : null,
      prevCursor:
        response?.data?.data?.pagination_info?.current_page !== 1
          ? response?.data?.data?.pagination_info?.current_page - 1
          : null,
      totalRecords: response?.data?.data?.pagination_info?.total_records,
    };
  };

  const {
    data: notificationsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["getAllNotifications"],
    queryFn: fetchNotifications,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    refetchOnWindowFocus: false,
    enabled: isNotificationOpen,
  });

  const lastNotificationRef = useCallback(
    (node: any) => {
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

  const allNotifications =
    notificationsData?.pages.map((page: any) => page.data).flat() || [];

  const { mutate: notificationReadAll, isPending: isReadAllNotifiPending } =
    useMutation({
      mutationFn: async () => await markAsReadAllAPI(),
      onSuccess: (response) => {
        toast.success(response?.data?.message, {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        setNotificationOpen(false);
        refetch();
      },
    });

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (markID: Number) => {
      const response = await markAsReadAPI(markID);
      return response?.data;
    },
    onSuccess: (data, markID) => {
      if (data) {
        setNotificationOpen(false);
        refetch();
      }
    },
  });
  const handlePopoverToggle = () => {
    setNotificationOpen((prev) => !prev);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.is_marked) {
      markAsRead(notification.id);
    }
    const {
      case_id,
      message,
      case_stage,
      case_sub_stage,
      case: Case,
    } = notification;

    const isUserPath = isUser() ? "/user/manage" : "/manage";
    let path = "";
    let basePath = "";

    if (Case.service_type === "Litigation") {
      basePath = `/litigations/service/${case_id}`;
    } else if (Case.service_type === "Legal opinion") {
      basePath = `/legal-opinion/service/${case_id}`;
    }

    if (message?.includes("NOTE")) {
      path = `${basePath}/notes`;
    } else if (case_stage === "chat" && case_sub_stage === "case-chat") {
      path = `${basePath}/chat`;
    } else if (
      message?.includes("SUMMARY") ||
      message?.includes("next hearing date")
    ) {
      path = `${basePath}/case-history`;
    } else {
      const encodedStage = encodeURIComponent(case_stage);
      const encodedSubStage = encodeURIComponent(case_sub_stage);

      path = `${basePath}${isUserPath}?stage=${encodedStage}&sub_stage=${encodedSubStage}`;
    }

    setNotificationOpen(false);
    navigate({ to: path });
  };

  return (
    <Sheet open={isNotificationOpen} onOpenChange={setNotificationOpen}>
      <SheetTrigger asChild>
        <Button
          className="relative cursor-pointer h-7  w-7 rounded-full py-1 pl-1 px-0 bg-white hover:bg-white flex items-center justify-center border border-gray-300 [&_svg]:size-4"
          onClick={handlePopoverToggle}
        >
          <Bell />
          {notificationCounts > 0 && (
            <span className="absolute -top-2 -right-1 text-xs bg-red-500 text-white rounded-full text-[10px] h-fit w-fit px-1.5 flex items-center justify-center">
              {notificationCounts < 999 ? notificationCounts : "999+"}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-2/6 max-w-md  bottom-0 bg-white p-0 font-primary shadow-md rounded-md space-y-1 border border-gray-200">
        <SheetHeader className="flex flex-row justify-between px-2 !pt-3  !pb-0 items-center space-y-0">
          <SheetTitle className="!text-md !3xl:text-base font-light leading-none text-[#141414] ">
            General Notifications
          </SheetTitle>
          <div className="flex gap-1 items-center">
            {allNotifications?.length > 0 && notificationCounts > 0 && (
              <Button
                className="text-blue-500 bg-transparent hover:bg-transparent h-fit px-2 py-0 text-xs 3xl:text-sm font-medium hover:underline"
                onClick={() => {
                  notificationReadAll();
                }}
                disabled={isReadAllNotifiPending}
              >
                Mark all as read
              </Button>
            )}

            <SheetClose>
              <NotesCloseIcon className="w-5 h-5 cursor-pointer" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="h-[calc(100vh-80px)]">
          {isLoading && !isFetchingNextPage ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-20 mb-1 px-3 py-2 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-3  w-32 bg-gray-200 " />
                    <Skeleton className="h-3 w-20 bg-gray-200" />
                  </div>
                  <div className="py-2 px-2 border border-gray-200 space-y-4">
                    <Skeleton className="h-3  w-40 bg-gray-200 " />
                    <Skeleton className="h-3  w-52 bg-gray-200 " />
                  </div>
                </div>
              ))}
            </div>
          ) : allNotifications?.length ? (
            <div className="h-full">
              <ul className="h-full overflow-auto  ">
                {allNotifications.map(
                  (notification: Notification, index: number) => {
                    const isLastNotification =
                      index === allNotifications.length - 1;
                    return (
                      <li
                        key={notification.id}
                        ref={isLastNotification ? lastNotificationRef : null}
                        className={`py-2 border-b border-b-gray-300  px-2  last:border-none hover:bg-slate-200 transition-all duration-300 ease-in-out space-y-1 cursor-pointer ${notification.is_marked ? "!font-normal bg-white " : "bg-blue-100  "}  `}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex gap-2">
                          {!notification?.is_marked && (
                            <div>
                              <div className="h-1.5 w-1.5 mt-2 bg-sky-500 rounded-full"></div>
                            </div>
                          )}

                          <div className="space-y-2 grow">
                            <div className="flex justify-between">
                              <div className="text-sm px-1  border border-gray-300 bg-gray-100">
                                {notification?.case?.cnr_number ||
                                  notification?.case?.cmp_number ||
                                  notification?.case?.ref_id ||
                                  notification?.case?.temp_id ||
                                  "--"}
                              </div>
                              <div className="text-xs font-light 3xl:text-sm text-gray-500">
                                {formatDateWithTime(notification.created_at)}
                              </div>
                            </div>
                            <p
                              className={`text-sm 3xl:text-base text-gray-500  leading-snug  `}
                            >
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>

              {isFetchingNextPage && (
                <div className="text-center text-xs text-gray-500 mt-2">
                  Loading more notifications...
                </div>
              )}
            </div>
          ) : isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="h-20 mb-2 px-3 py-4 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-3  w-32 bg-gray-200 " />
                    <Skeleton className="h-3 w-20 bg-gray-200" />
                  </div>
                  <Skeleton className="h-10 my-4 rounded-none  w-full bg-gray-200 " />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <NoGeneralNotifications />
              <div className="text-lg">No Notifications</div>
              <div className="text-center">
                You're all caught up! Check back later for any new updates.
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default GeneralNotifications;
