import DefaultUserIcon from "@/components/icons/default-user";
import NotesCloseIcon from "@/components/icons/notes-close-icon";
import NotesDeleteIcon from "@/components/icons/notes-delete-icon";
import NotesEditIcon from "@/components/icons/notes-edit-icon";
import NotesHeadIcon from "@/components/icons/notes-head-icon";
import NotesPlusIcon from "@/components/icons/notes-plus-icon";
import SummaryIconCard from "@/components/icons/summary-icon-card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  caseUpdateNoteAPI,
  caseViewAddNoteAPI,
  caseViewNoteDeleteAPI,
  caseViewNotesAPI,
} from "@/http/services/manage";
import { userStore } from "@/store/userDetails";
import { formatDate } from "@/utils/helpers/formatDate";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const ServiceCaseHistory = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const { service_id } = useParams({ strict: false });
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [noteError, setNoteError] = useState<string>("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);
  const [isEditNotesOpen, setIsEditNotesOpen] = useState(false);
  const [editNoteRecord, setEditNoteRecord] = useState<any>(null);
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const userType = userDetails?.id;

  const stage = search.stage;
  const subStage = search.sub_stage;

  const fetchCaseNotes = async ({ pageParam = 1 }) => {
    try {
      if (!service_id) return;
      let queryParams: any = {};
      queryParams = {
        case_stage: stage,
        case_sub_stage: subStage && encodeURIComponent(subStage),
        types: "SUMMARY",
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
    data: caseNotes,
    fetchNextPage,
    hasNextPage,
    isFetching: isLoadingCaseNote,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-summary", service_id],
    queryFn: fetchCaseNotes,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor ?? null,
    refetchOnWindowFocus: false,
  });

  const lastNoteRef = useCallback(
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
  const allRecords = caseNotes?.pages.map((e: any) => e.data).flat() || [];
  const { mutate: mutateAddNote, isPending: isLoadingAddNote } = useMutation({
    mutationKey: ["add-summary", service_id],
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        case_stage: stage,
        case_sub_stage: subStage,
        case_id: Number(service_id),
        type: "SUMMARY",
      };
      const response = await caseViewAddNoteAPI(payload);
      return response;
    },
    onSuccess: async (data) => {
      setNoteTitle("");
      setNoteContent("");
      setNoteError("");
      setTitleError("");
      setIsAddNotesOpen(false);
      toast.success(data?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      refetch();
    },
    onError: (error: any) => {
      if (error?.status == 422) {
        setNoteError(error?.data?.errData?.note?.[0]);
        setTitleError(error?.data?.errData?.title?.[0]);
      } else if (error?.status === 409) {
        const message = error?.data?.message;
      }
      toast.error(
        error?.data?.message || error?.message || error?.data?.data?.error,
        {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        }
      );
    },
  });

  // Delete Note

  const { mutate: mutateDeleteNote, isPending: isLoadingDeleteNote } =
    useMutation({
      mutationKey: ["delete-summary", service_id],
      mutationFn: async (noteId: number) => {
        const response = await caseViewNoteDeleteAPI(noteId);
        if (response.status === 200 || response.status === 204) {
          return response?.data;
        } else {
          throw response;
        }
      },
      onSuccess: async () => {
        toast.success("Summary Deleted Successfully", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        refetch();
      },
      onError: (error: any) => {
        if (error?.status == 422) {
          setNoteError(error?.data?.errData?.note?.[0]);
          const { details } = error?.data?.errors;
        } else if (error?.status === 409) {
          const message = error?.data?.message;
        }
      },
    });

  // Update Note

  const { mutate: mutateUpdateNote, isPending: isLoadingUpdateNote } =
    useMutation({
      mutationKey: ["update-summary", service_id],
      mutationFn: async (data: {
        noteId: number;
        title: string;
        note: string;
        case_stage: string;
        case_sub_stage: string;
      }) => {
        const response = await caseUpdateNoteAPI({
          ...data,
          noteId: data.noteId,
          payload: {
            case_id: Number(service_id),
            type: "SUMMARY",
            title: data.title,
            note: data.note,
          },
        });
        return response;
      },
      onSuccess: async (data) => {
        setNoteTitle("");
        setNoteContent("");
        setNoteError("");
        setTitleError("");
        toast.success(data?.data?.message, {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        setIsEditNotesOpen(false);
        refetch();
      },
      onError: (error: any) => {
        if (error?.status == 422) {
          setNoteError(error?.data?.errData?.note?.[0]);
          setTitleError(error?.data?.errData?.title?.[0]);
          const { details } = error?.data?.errors;
        } else if (error?.status === 409) {
          const message = error?.data?.message;
        }
        toast.error(
          error?.data?.message || error?.message || error?.data?.data?.error,
          {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          }
        );
      },
    });

  const resetNoteFields = () => {
    setNoteError("");
    setTitleError("");
    setNoteTitle("");
    setNoteContent("");
  };

  const closeNoteForms = () => {
    setIsAddNotesOpen(false);
    setIsEditNotesOpen(false);
    resetNoteFields();
    setNoteError("");
    setTitleError("");
  };

  const handleEditClick = (record: any) => {
    setIsEditNotesOpen(true);
    setEditNoteRecord(record);
    setNoteTitle(record.title);
    setNoteContent(record.note);
  };
  const handleDeleteNote = (noteId: number) => {
    mutateDeleteNote(noteId);
  };

  const handleSaveNote = () => {
    if (isAddNotesOpen) {
      mutateAddNote({
        title: noteTitle,
        note: noteContent,
      });
    } else if (isEditNotesOpen && editNoteRecord) {
      mutateUpdateNote({
        noteId: editNoteRecord?.id,
        title: noteTitle,
        note: noteContent,
        case_stage: editNoteRecord?.case_stage,
        case_sub_stage: editNoteRecord?.case_sub_stage,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNote();
    }
  };

  return (
    <Sheet
      open={isNotesOpen}
      onOpenChange={(isOpen) => {
        setIsNotesOpen(isOpen);
        setIsAddNotesOpen(false);
        setIsEditNotesOpen(false);
        setNoteContent("");
        setNoteTitle("");
        setNoteError("");
        setTitleError("");
      }}
    >
      <SheetTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span
                className={`border-gray-200 px-1 ${blur} bg-gray-100 hover:bg-gray-200   border-x py-1 flex items-center justify-center cursor-pointer`}
              >
                <SummaryIconCard className="w-6 h-6" />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white text-xs rounded-none">
              Case History
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>
      <SheetContent className="bg-white w-4/12 p-2 font-primary ">
        <SheetHeader className="flex flex-row p-2 pb-4 items-center justify-between border-b border-b-gray-300">
          <SheetTitle className="flex   items-center gap-2  ">
            <NotesHeadIcon className="w-7 h-7" />
            <span className="font-medium text-smd 3xl:text-base text-black">
              Case History
            </span>
          </SheetTitle>
          <div className="flex items-center gap-6">
            {isAddNotesOpen || isEditNotesOpen ? (
              <>
                <button
                  className="text-xs text-gray-600 hover:text-black cursor-pointer"
                  onClick={closeNoteForms}
                >
                  Cancel
                </button>
                <span className="text-xs text-gray-600 hover:text-black">
                  <NotesPlusIcon className="w-3 h-3" />
                </span>
              </>
            ) : (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setIsAddNotesOpen(true)}
              >
                <NotesPlusIcon className="w-3 h-3" />
                <span className="text-xs 3xl:text-sm text-[#444] font-medium">
                  New
                </span>
              </div>
            )}
            <SheetClose
              onClick={() => {
                setIsAddNotesOpen(false);
                setIsEditNotesOpen(false);
                setNoteContent("");
                setNoteTitle("");
                setNoteError("");
                setTitleError("");
              }}
            >
              <NotesCloseIcon className="w-7 h-7 cursor-pointer" />
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="p-4 space-y-2 h-[calc(100vh-70px)] overflow-y-auto">
          {isAddNotesOpen && (
            <div className="space-y-3">
              <Input
                placeholder="Title"
                value={noteTitle.charAt(0).toUpperCase() + noteTitle.slice(1)}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="border border-black rounded-none text-md font-normal focus:!outline-none"
              />
              {titleError && (
                <p className="text-red-500 text-xs">{titleError}</p>
              )}

              <Textarea
                placeholder="Write your summary here..."
                className="w-full h-44 p-2 border border-black rounded-none text-md resize-none focus:!outline-none "
                value={
                  noteContent.charAt(0).toUpperCase() + noteContent.slice(1)
                }
                onChange={(e) => setNoteContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {noteError && <p className="text-red-500 text-xs">{noteError}</p>}

              <div className="flex justify-end ">
                <Button
                  className="text-xs bg-black text-white px-8 rounded-none h-8 hover:bg-black cursor-pointer"
                  onClick={handleSaveNote}
                  disabled={isLoadingAddNote}
                >
                  {isLoadingAddNote ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}

          {isEditNotesOpen && editNoteRecord && (
            <div className="space-y-3">
              <Input
                className="border border-black rounded-none text-md font-normal focus:!outline-none"
                placeholder="Title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
              {titleError && (
                <p className="text-red-500 text-xs">{titleError}</p>
              )}
              <Textarea
                className="w-full h-44 p-2 border border-black rounded-none text-md resize-none focus:!outline-none "
                placeholder="Write your notes here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {noteError && <p className="text-red-500 text-xs">{noteError}</p>}
              <div className="flex justify-end">
                <Button
                  className="text-xs bg-black text-white px-8 rounded-none h-8 hover:bg-black cursor-pointer"
                  onClick={handleSaveNote}
                  disabled={isLoadingUpdateNote}
                >
                  {isLoadingUpdateNote ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          )}

          {!isAddNotesOpen && !isEditNotesOpen && (
            <>
              {isLoadingCaseNote ? (
                // Skeleton Loader when data is loading
                <div className="space-y-4">
                  {[...Array(10)].map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-4 w-3/4 bg-gray-200" />
                      <Skeleton className="h-3 w-full bg-gray-200" />
                      <div className="flex justify-end space-x-2">
                        <Skeleton className="h-6 w-6 bg-gray-200" />
                        <Skeleton className="h-6 w-6 bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : allRecords.length > 0 ? (
                allRecords.map((record: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-x-2">
                        <Avatar className="flex items-center justify-center h-8 w-8">
                          {record?.created_by?.profile_pic ? (
                            <AvatarImage
                              src={record?.created_by?.profile_pic}
                            ></AvatarImage>
                          ) : (
                            <DefaultUserIcon className={"h-4 w-4"} />
                          )}
                        </Avatar>
                        <div>
                          {record?.created_by?.first_name}{" "}
                          {record?.created_by?.last_name}
                          <div className="text-xs text-gray-500">
                            {record?.updated_at === null
                              ? formatDate(record?.created_at)
                              : formatDate(record?.updated_at)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        {record?.created_by?.id === userType && (
                          <Button
                            className="bg-transparent px-2 h-fit py-1 cursor-pointer"
                            onClick={() => handleEditClick(record)}
                            disabled={isLoadingDeleteNote}
                          >
                            <NotesEditIcon className="w-4 h-4 cursor-pointer" />
                          </Button>
                        )}
                        {record?.created_by?.id === userType && (
                          <Button
                            className="bg-transparent px-2 h-fit py-1 cursor-pointer"
                            onClick={() => handleDeleteNote(record?.id)}
                            disabled={isLoadingDeleteNote}
                          >
                            <NotesDeleteIcon className="w-4 h-4 cursor-pointer" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 mt-3">
                      <div className="text-sm 3xl:text-base text-black opacity-90  font-medium">
                        {record?.title}
                      </div>
                      <div className="text-xs 3xl:text-sm text-[#444] list-none opacity-80 font-normal ">
                        {record?.note
                          .split("\n")
                          .map((note: any, index: any) => (
                            <div
                              key={index}
                              className="text-black capitalize text-opacity-90"
                            >
                              {note.trim()}{" "}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 text-sm h-full flex items-center justify-center">
                  No Case History available
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ServiceCaseHistory;
