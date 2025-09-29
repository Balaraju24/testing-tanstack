import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import NotesCloseIcon from "@/components/icons/notes-close-icon";
import NotesHeadIcon from "@/components/icons/notes-head-icon";
import NotesIconCard from "@/components/icons/notes-icon-card";
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
  caseViewNoteAPI,
} from "@/http/services/manage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

const CaseNotes = () => {
  const { service_id } = useParams({ strict: false });
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [noteError, setNoteError] = useState<string>("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);
  const [editNoteRecord, setEditNoteRecord] = useState<any>(null);

  const stage = search.stage;
  const subStage = search.sub_stage;

  const { refetchCaseNotes, setNotes, notesId, setNotesId } = UseContextAPI();

  const { isFetching } = useQuery({
    queryKey: ["case-note", notesId],
    enabled: !!notesId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!notesId) return;
      const response = await caseViewNoteAPI(notesId);

      if (response?.status === 200 || response?.status === 201) {
        setNoteTitle(response?.data?.data?.title);
        setNoteContent(response?.data?.data?.note);
        setEditNoteRecord(response?.data?.data);
        return response?.data?.data;
      }
    },
  });

  const { mutate: mutateAddNote, isPending: isLoadingAddNote } = useMutation({
    mutationKey: ["add-note", service_id],
    mutationFn: async (data: any) => {
      let title = data.title;

      if (subStage === "ONBD#ADEC") {
        title = "Case Facts and Opinion";
      } else if (subStage === "TRPH#JUDG") {
        title = "Judgement & Further Process";
      }
      const payload = {
        ...data,
        title,
        case_stage: stage,
        case_sub_stage: subStage && subStage,
        case_id: Number(service_id),
        type: "NOTE",
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
      setIsNotesOpen(false);
      refetchCaseNotes();
      // refetch();
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

  // Update Note
  const { mutate: mutateUpdateNote, isPending: isLoadingUpdateNote } =
    useMutation({
      mutationKey: ["update-note", service_id],
      mutationFn: async (data: {
        noteId: number;
        title?: string;
        note: string;
        case_stage: string;
        case_sub_stage: string;
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
        setNotesId(null);
        toast.success(data?.data?.message, {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        refetchCaseNotes();
        setNotes(null);
        // refetch();
      },
      onError: (error: any) => {
        if (error?.status == 422) {
          setNoteError(error?.data?.errData?.note?.[0]);
          setTitleError(error?.data?.errData?.title?.[0]);
        } else if (error?.status === 409) {
          const message = error?.data?.message;
        }
        toast.error(
          error?.data?.message || error?.message || error?.data?.data?.error
        );
      },
    });

  const handleSaveNote = () => {
    if (!!notesId) {
      mutateUpdateNote({
        noteId: editNoteRecord.id,
        title: noteTitle,
        note: noteContent,
        case_stage: editNoteRecord.case_stage,
        case_sub_stage: editNoteRecord.case_sub_stage,
      });
    } else {
      mutateAddNote({
        title: noteTitle,
        note: noteContent,
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
      open={isNotesOpen || !!notesId}
      onOpenChange={(isOpen) => {
        setIsNotesOpen(isOpen);
        setIsAddNotesOpen(!!!notesId && isOpen);
        setNoteContent("");
        setNoteTitle("");
        setNoteError("");
        setTitleError("");

        setNotesId(null);
      }}
    >
      <SheetTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span
                className={`border-gray-200 px-1 bg-gray-100 [&_svg]:size-6 hover:bg-gray-200 border-x py-1 flex items-center justify-center cursor-pointer`}
                onClick={() => setIsAddNotesOpen(true)}
              >
                <NotesIconCard />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white text-xs rounded-none">
              Notes
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>
      <SheetContent className="bg-white w-4/12 p-2 font-primary">
        <SheetHeader className="flex flex-row p-2 pb-4 items-center justify-between border-b border-gray-300">
          <SheetTitle className="flex items-center gap-2">
            <NotesHeadIcon className="w-7 h-7" />
            <span className="font-normal text-smd 3xl:text-base text-black ">
              Notes
            </span>
          </SheetTitle>
          <div className="flex items-center gap-6 cursor-pointer">
            <SheetClose
              onClick={() => {
                setIsAddNotesOpen(false);
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
                value={
                  subStage === "ONBD#ADEC"
                    ? "Case Facts and Opinion"
                    : subStage === "TRPH#JUDG"
                      ? "Judgement & Further Process"
                      : noteTitle?.charAt(0)?.toUpperCase() +
                        noteTitle?.slice(1)
                }
                disabled={subStage === "ONBD#ADEC" || subStage === "TRPH#JUDG"}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="border border-gray-300 rounded-none text-md font-normal focus:!outline-none"
              />
              {titleError && (
                <p className="text-red-500 text-xs">{titleError}</p>
              )}

              <Textarea
                placeholder="Write your notes here..."
                className="w-full h-44 p-2 border border-gray-300 rounded-none text-md resize-none focus:!outline-none"
                value={
                  noteContent.charAt(0).toUpperCase() + noteContent.slice(1)
                }
                onChange={(e) => setNoteContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {noteError && <p className="text-red-500 text-xs">{noteError}</p>}

              {/* {selectedOption && ( */}
              <div className="flex justify-end">
                <Button
                  className="text-xs bg-black text-white cursor-pointer px-8 rounded-none h-8 hover:bg-black"
                  onClick={handleSaveNote}
                  disabled={isLoadingAddNote}
                >
                  {isLoadingAddNote ? "Saving..." : "Save"}
                </Button>
              </div>
              {/* )} */}
            </div>
          )}

          {!!notesId && (
            <div className="relative h-full">
              {isFetching ? (
                <LoadingComponent loading={isFetching} />
              ) : (
                <div className="space-y-3">
                  <Input
                    className="border border-gray-300 rounded-none text-md font-normal focus:!outline-none"
                    placeholder="Title"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                  />
                  {titleError && (
                    <p className="text-red-500 text-xs">{titleError}</p>
                  )}
                  <Textarea
                    className="w-full h-44 p-2 border border-gray-300 rounded-none text-md resize-none focus:!outline-none"
                    placeholder="Write your notes here..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  {noteError && (
                    <p className="text-red-500 text-xs">{noteError}</p>
                  )}
                  <div className="flex justify-end">
                    <Button
                      className="text-xs bg-black text-white px-8 rounded-none h-8 hover:bg-black"
                      onClick={handleSaveNote}
                      disabled={isLoadingUpdateNote}
                    >
                      {isLoadingUpdateNote ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CaseNotes;
