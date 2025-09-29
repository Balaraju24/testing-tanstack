import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import DefaultUserIcon from "@/components/icons/default-user";
import NoNoteData from "@/components/icons/note-no-data";
import NotesDeleteIcon from "@/components/icons/notes-delete-icon";
import NotesEditIcon from "@/components/icons/notes-edit-icon";
import PlusIcon from "@/components/icons/plus-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  caseUpdateNoteAPI,
  caseViewAddNoteAPI,
  caseViewNoteDeleteAPI,
  caseViewNotesAPI,
} from "@/http/services/manage";
import { notesViewAPI } from "@/http/services/service";
import {
  Note,
  NotesReadStatus,
  NotesViewPayload,
} from "@/lib/interfaces/service";
import { userStore } from "@/store/userDetails";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import TabValuesForViewCase from "./TabValuesForViewCase";

const ServiceNotes = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const { service_id } = useParams({ strict: false });
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addNotes, setAddNotes] = useState(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [noteError, setNoteError] = useState<string>("");
  const { isUser } = useUserDetails();
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const userType = userDetails?.id;
  const { caseStagesData } = UseContextAPI();
  const isViewPanelOpen = selectedNoteId || addNotes || isEditMode;

  const fetchCaseNotes = async ({ pageParam = 1 }) => {
    try {
      if (!service_id) return;
      const queryParams = {
        page: pageParam,
        page_size: 10,
        types: ["NOTE", "CASE_BRIEF", "CASE_REMARKS", "CASE_DRAFT_REMARKS"],
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

  // Get all notes API
  const {
    data: caseNotes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-notes", "notes", service_id],
    queryFn: fetchCaseNotes,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor ?? null,
    refetchOnWindowFocus: false,
  });

  const allRecords = caseNotes?.pages.map((e: any) => e.data).flat() || [];
  const selectedNote = allRecords.find(
    (note: Note) => note.id === selectedNoteId
  );

  const lastNoteRef = useCallback(
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

  const { mutate: mutateAddNote, isPending } = useMutation({
    mutationKey: ["add-note", service_id],
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        case_id: Number(service_id),
        type: "NOTE",
      };
      const response = await caseViewAddNoteAPI(payload);
      return response;
    },
    onSuccess: async (data) => {
      setAddNotes(false);
      setNoteTitle("");
      setNoteContent("");
      setTitleError("");
      setNoteError("");
      refetch();
      toast.success(data?.data?.message, {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      if (error?.status == 422) {
        setTitleError(error?.data?.errData?.title?.[0]);
        setNoteError(error?.data?.errData?.note?.[0]);
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

  const { mutate: mutateNotesView } = useMutation({
    mutationFn: async ({ noteId, noteType }: any) => {
      const payload: NotesViewPayload = {
        note_ids: [noteId],
        note_type: noteType,
      };
      const response = await notesViewAPI(payload);
      return response?.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Delete Note
  const { mutate: mutateDeleteNote, isPending: isLoadingDeleteNote } =
    useMutation({
      mutationKey: ["delete-note", service_id],
      mutationFn: async (noteId: number) => {
        const response = await caseViewNoteDeleteAPI(noteId);
        if (response.status === 200 || response.status === 204) {
          return response?.data;
        } else {
          throw response;
        }
      },
      onSuccess: async () => {
        toast.success("Note Deleted Successfully", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        setSelectedNoteId(null);
        refetch();
      },
      onError: (error: any) => {
        if (error?.status == 422) {
          setNoteError(error?.data?.errData?.note?.[0]);
        }
      },
    });

  // Update Note
  const { mutate: mutateUpdateNote, isPending: isLoadingUpdateNote } =
    useMutation({
      mutationKey: ["update-note", service_id],
      mutationFn: async (data: {
        noteId: number;
        title: string;
        note: string;
      }) => {
        const response = await caseUpdateNoteAPI({
          ...data,
          noteId: data.noteId,
          payload: {
            case_id: Number(service_id),
            type: "NOTE",
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
        setIsEditMode(false);
        setSelectedNoteId(null);
        refetch();
      },
      onError: (error: any) => {
        if (error?.status == 422) {
          setNoteError(error?.data?.errData?.note?.[0]);
          setTitleError(error?.data?.errData?.title?.[0]);
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

  const handleViewClick = (noteId: number, noteType: any) => {
    setSelectedNoteId(noteId === selectedNoteId ? null : noteId);
    setAddNotes(false);
    setNoteContent("");
    setNoteTitle("");
    const isRecordUnread = allRecords?.some(
      (record: Note) =>
        record.id === noteId &&
        record?.notes_read_status?.some(
          (item: NotesReadStatus) => !item.is_seen && item.user_id === userType
        )
    );

    if (isRecordUnread) {
      mutateNotesView({ noteId, noteType });
    }
  };

  const handleClose = () => {
    setAddNotes(false);
    setIsEditMode(false);
    setSelectedNoteId(null);
    setNoteTitle("");
    setNoteContent("");
    setTitleError("");
    setNoteError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNote();
    }
  };

  const handleSaveNote = () => {
    if (isEditMode && selectedNoteId) {
      mutateUpdateNote({
        noteId: selectedNoteId,
        title: noteTitle,
        note: noteContent,
      });
    } else {
      mutateAddNote({
        title: noteTitle,
        note: noteContent,
      });
    }
  };

  const handleEditNote = (note: Note) => {
    setIsEditMode(true);
    setSelectedNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.note);
  };

  const handleDeleteNote = (noteId: number) => {
    mutateDeleteNote(noteId);
  };

  useEffect(() => {
    if (isEditMode && selectedNote) {
      setNoteTitle(selectedNote.title || "");
      setNoteContent(selectedNote.note || "");
    }
  }, [isEditMode, selectedNote, userType]);

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
          selectedNoteId === record.id ? "bg-blue-50" : "bg-white"
        }`}
        ref={index === allRecords.length - 1 ? lastNoteRef : null}
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
              onClick={() => handleViewClick(record.id, record.type)}
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
      <div className="flex flex-col text-gray-400 items-center justify-center h-full">
        <NoNoteData className="w-60 h-60 text-gray-400" />
        <div>No Notes Available</div>
      </div>
    );

  return (
    <div className="border border-gray-300 flex flex-col h-[calc(100vh-106px)]">
      <TabValuesForViewCase />
      <div className="self-end">
        <Button
          className="bg-gray-300 cursor-pointer rounded-none pb-1 hover:bg-gray-300 h-fit font-normal py-1 px-3 mt-2 mx-3 text-black text-sm"
          onClick={() => {
            setAddNotes(!addNotes);
            setSelectedNoteId(null);
            setTitleError("");
            setNoteError("");
          }}
          disabled={isEditMode}
        >
          <PlusIcon />
          Add
        </Button>
      </div>

      <div
        className={`flex flex-1 ${isUser() ? "p-1" : "p-2"} ${
          isViewPanelOpen ? "gap-2" : ""
        } overflow-hidden`}
      >
        <div className="flex-1 relative overflow-auto">
          {notesTableContent}
          {isFetchingNextPage && (
            <div className="flex justify-center py-2">
              <div>Loading Notes...</div>
            </div>
          )}
        </div>

        {/* Side Panel (right of table) */}
        <div
          className={`bg-gray-100 flex-shrink-0 overflow-auto transition-all duration-150 ease-in-out ${
            isViewPanelOpen ? "w-2/5 shadow-sm" : "w-0"
          }`}
        >
          {selectedNoteId && !isEditMode && (
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-normal capitalize">
                  {selectedNote?.created_by?.first_name}{" "}
                  {selectedNote?.created_by?.last_name}
                </h2>
                <div className="flex gap-2">
                  {userType === selectedNote?.created_by?.id &&
                    selectedNote?.type === "NOTE" && (
                      <Button
                        className="bg-transparent px-2 h-fit py-1 cursor-pointer"
                        onClick={() => handleEditNote(selectedNote)}
                      >
                        <NotesEditIcon className="w-4 h-4" />
                      </Button>
                    )}
                  {userType === selectedNote?.created_by?.id &&
                    selectedNote?.type === "NOTE" && (
                      <Button
                        className="bg-transparent px-2 h-fit py-1 cursor-pointer"
                        onClick={() => handleDeleteNote(selectedNoteId)}
                        disabled={isLoadingDeleteNote}
                      >
                        <NotesDeleteIcon className="w-4 h-4" />
                      </Button>
                    )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedNoteId(null)}
                    className="h-fit bg-red-200 text-red-400 cursor-pointer text-sm rounded-none"
                  >
                    Close
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <h2 className="text-base font-normal mb-2">
                  {selectedNote?.title}
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedNote?.note
                    .split("\n")
                    .map((note: string, index: number) => (
                      <div
                        key={index}
                        className="text-black text-opacity-60 text-sm"
                      >
                        {note.trim()}
                      </div>
                    ))}
                </p>
              </div>
            </div>
          )}

          {(addNotes || isEditMode) && (
            <div className="p-4 space-y-5 flex flex-col">
              <div className="space-y-1">
                <Input
                  className="border border-gray-500 bg-slate-100 rounded-none"
                  placeholder="Title"
                  value={noteTitle.charAt(0).toUpperCase() + noteTitle.slice(1)}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
                {titleError && (
                  <p className="text-red-500 text-xs">{titleError}</p>
                )}
              </div>
              <div className="space-y-1">
                <Textarea
                  className="border h-72 border-gray-500 resize-none bg-slate-100 rounded-none"
                  placeholder="Note"
                  value={
                    noteContent.charAt(0).toUpperCase() + noteContent.slice(1)
                  }
                  onChange={(e) => setNoteContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {noteError && (
                  <p className="text-red-500 text-xs">{noteError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  className="bg-black text-white hover:bg-black h-fit py-1 px-6 rounded-none w-fit self-end cursor-pointer"
                  onClick={handleClose}
                  disabled={isLoadingUpdateNote || isPending}
                >
                  Close
                </Button>
                <Button
                  className="bg-black text-white hover:bg-black h-fit py-1 px-6 rounded-none w-fit self-end cursor-pointer"
                  onClick={handleSaveNote}
                  disabled={isPending || isLoadingUpdateNote}
                >
                  {isPending || isLoadingUpdateNote
                    ? "Saving..."
                    : selectedNoteId
                      ? "Update"
                      : "Save"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceNotes;
