import {
  getAllTodoAPI,
  getAllTodoCountsAPI,
  todoMarkAsReadAPI,
} from "@/http/services/notification";
import { labelStage, labelSubStages } from "@/lib/constants/statusConstants";
import { TodoProps } from "@/lib/interfaces/nav";
import { formatDateWithTime } from "@/utils/helpers/manage";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import NoTasks from "../icons/No-tasks-icon";
import NotesCloseIcon from "../icons/notes-close-icon";
import RedirectionIcon from "../icons/redirecting-icon";
import TodoCaseIcon from "../icons/todo-case-icon";
import TodoIcon from "../icons/todo-icon";
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

const Todo: React.FC<TodoProps> = ({ case_id, iconType }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todo");
  const { isUser } = useUserDetails();

  const fetchTodo = async ({ pageParam = 1 }) => {
    const queryParams = {
      page: pageParam,
      page_size: 10,
      ...(activeTab === "completed" && { is_completed: true }),
      ...(case_id && { case_id: case_id }),
    };
    const response = await getAllTodoAPI(queryParams);

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
    data: TodoData,
    refetch: refetchTodoData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["getAllTodo", activeTab, case_id || "all"],
    queryFn: fetchTodo,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    refetchOnWindowFocus: false,
    enabled: isTodoOpen,
  });

  const lastTodoRef = useCallback(
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

  //  TODO Unread count
  const { data: TodoCounts, refetch: refetchTodoCount } = useQuery({
    queryKey: ["TodoCounts", case_id],
    queryFn: async () => {
      const response = await getAllTodoCountsAPI({ case_id });

      return response?.data?.data?.count || 0;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: markAsReadTodo, isPending: markasRead } = useMutation({
    mutationFn: async (markID: any) => {
      const response = await todoMarkAsReadAPI(markID);
      return response?.data;
    },
    onSuccess: (data, todoID) => {
      if (data) {
        setIsTodoOpen(false);
        setActiveTab("todo");
        refetchTodoData();
        refetchTodoCount();
      }
    },
    onError: (error) => {},
  });

  const allTodo = TodoData?.pages.map((page: any) => page.data).flat() || [];

  useEffect(() => {
    const isOnSummaryPage =
      location.pathname.includes("/service/") &&
      (location.pathname.endsWith("/case-history") ||
        location.pathname.endsWith("/notes"));
    const shouldOpenTodo = sessionStorage.getItem("openTodoSheet") === "true";
    if (isOnSummaryPage && shouldOpenTodo && case_id) {
      setIsTodoOpen(true);
      sessionStorage.removeItem("openTodoSheet");
    }
  }, [location.pathname, case_id, allTodo]);

  const handlePopoverToggle = () => {
    setIsTodoOpen((prev) => !prev);
  };

  const handleTodoClick = (todo: any) => {
    if (!todo?.is_marked) {
      markAsReadTodo(todo?.id);
    }
    const encodedStage = encodeURIComponent(todo?.case_stage);
    const encodedSubStage = encodeURIComponent(todo?.case_sub_stage);

    setIsTodoOpen(false);
    setActiveTab("todo");

    const base = isUser() ? "user/manage" : "manage";

    let serviceType =
      todo?.case?.service_type?.toLowerCase().replace(/\s+/g, "-") || "";

    if (serviceType === "litigation") {
      serviceType = "litigations";
    }

    navigate({
      to: `/${serviceType}/service/${todo?.case_id}/${base}?stage=${encodedStage}&sub_stage=${encodedSubStage}`,
    });
  };

  return (
    <Sheet
      open={isTodoOpen}
      onOpenChange={(open) => {
        setIsTodoOpen(open);
        if (open) {
          setActiveTab("todo");
        }
      }}
    >
      <SheetTrigger asChild>
        <Button
          className={`relative  px-1  ${iconType === "alternate" ? "[&_svg]:size-5 h-8 w-8 " : "[&_svg]:size-4 h-7 w-7  py-1 "} rounded-full border border-gray-300 cursor-pointer bg-white hover:bg-white`}
          onClick={handlePopoverToggle}
        >
          {iconType === "alternate" ? <TodoCaseIcon /> : <TodoIcon />}
          {TodoCounts > 0 && (
            <span className="absolute -top-2 -right-1 text-xs bg-red-500 text-white rounded-full text-[10px] w-fit h-fit px-1.5 flex items-center justify-center">
              {TodoCounts < 999 ? TodoCounts : "999+"}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-3/12  font-primary gap-1 space-y-1  bg-white p-0 shadow-md rounded-md border border-gray-200">
        <SheetHeader className="flex flex-row justify-between items-center space-y-0 px-2 pt-3">
          <SheetTitle className="text-md font-normal leading-none">
            To do Notifications
          </SheetTitle>
          <SheetClose>
            <NotesCloseIcon className="w-5 h-5 cursor-pointer" />
          </SheetClose>
        </SheetHeader>

        <div className="flex border-b border-b-gray-200">
          <button
            className={`px-4 cursor-pointer py-2 ${activeTab === "todo" ? "border-b-2 border-black" : ""}`}
            onClick={() => setActiveTab("todo")}
          >
            To do
          </button>
          <button
            className={`px-4 cursor-pointer py-2 ${activeTab === "completed" ? "border-b-2 border-black" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>
        <div className=" h-[calc(100vh-95px)] overflow-y-auto">
          {isLoading && !isFetchingNextPage ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-20 my-1 px-3 py-2 space-y-4">
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-3  w-32 bg-gray-200 " />
                    <Skeleton className="h-3 w-20 bg-gray-200" />
                  </div>
                  <div className="py-2 px-2 mt-2 border border-gray-200 space-y-4">
                    <Skeleton className="h-3  w-40 bg-gray-200 " />
                    <Skeleton className="h-3  w-52 bg-gray-200 " />
                  </div>
                </div>
              ))}
            </div>
          ) : allTodo?.length ? (
            <>
              <ul className="">
                {allTodo.map((todo: any, index: number) => {
                  const isLastTodo = index === allTodo.length - 1;
                  return (
                    <li
                      key={index}
                      ref={isLastTodo ? lastTodoRef : null}
                      className=" border-b border-white border-b-gray-200 last:border-none cursor-pointer bg-white "
                      onClick={() => handleTodoClick(todo)}
                    >
                      <div
                        className={`py-3 px-2 flex gap-2 ${!todo?.is_marked && "bg-blue-100"} `}
                      >
                        {!todo?.is_marked && (
                          <div>
                            <div className="h-1.5 w-1.5 mt-2 bg-sky-500 rounded-full"></div>
                          </div>
                        )}

                        <div className="space-y-2 grow">
                          <div className="flex justify-between items-center">
                            <div className="text-sm 3xl:md px-1  border border-gray-300 bg-gray-100">
                              {todo?.case?.cnr_number ||
                                todo?.case?.cmp_number ||
                                todo?.case?.ref_id ||
                                todo?.case?.temp_id ||
                                "--"}
                            </div>
                            <div className="text-xs font-light 3xl:text-sm text-gray-500">
                              {formatDateWithTime(todo.created_at)}
                            </div>
                          </div>
                          <div className="p-2 border border-gray-200 bg-white flex justify-between">
                            <div>
                              <div className="font-normal text-sm 3xl:text-md">
                                {
                                  labelStage[
                                    todo.case_stage as keyof typeof labelStage
                                  ]
                                }
                              </div>

                              <div className="text-sm text-gray-500 3xl:text-md">
                                {
                                  labelSubStages[
                                    todo.case_sub_stage as keyof typeof labelSubStages
                                  ]
                                }
                              </div>
                            </div>
                            <div className="self-end [&_svg]:size-4">
                              <RedirectionIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {isFetchingNextPage && (
                <div className="text-center text-xs text-gray-500 mt-2">
                  Loading more Todos...
                </div>
              )}
            </>
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
              <NoTasks />
              <div className="text-base">No Tasks Available</div>
              <div className="text-center text-sm text-gray-500">
                You have no tasks at the moment. Stay organized and check back
                later!
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Todo;
