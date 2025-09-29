import { UseContextAPI } from "@/components/context/Provider";
import NotesDeleteIcon from "@/components/icons/notes-delete-icon";
import NotesEditIcon from "@/components/icons/notes-edit-icon";
import { Button } from "@/components/ui/button";
import { caseViewNoteDeleteAPI } from "@/http/services/manage";
import { userStore } from "@/store/userDetails";
import { isSubStageCompleted } from "@/utils/helpers/files";
import { formatDate } from "@/utils/helpers/formatDate";
import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const GetCaseNotes = () => {
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchCaseNotes,
    allRecords,
    setNotes,
    caseStagesData,
    notesId,
    setNotesId,
  } = UseContextAPI();

  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const subStage = search.sub_stage;
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const userType = userDetails?.id;

  const { mutate: mutateDeleteNote } = useMutation({
    mutationKey: ["delete-note", notesId],
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
      refetchCaseNotes();
      setNotes(null);
    },
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastNoteRef = useCallback(
    (node: any) => {
      if (isFetchingNextPage || !hasNextPage) return;
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

  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData?.sub_stages,
    subStage
  );

  const handleDeleteNote = (noteId: number) => {
    setDeletingNoteId(noteId);
    mutateDeleteNote(noteId, {
      onSettled: () => {
        setDeletingNoteId(null);
      },
    });
  };

  return (
    <div className="space-y-3 mt-4 bg-gray-100 divide-y-2 divide-gray-200">
      {allRecords?.map((note, index) => {
        return (
          <div
            key={index}
            ref={index === allRecords.length - 1 ? lastNoteRef : null}
            className="space-y-1   p-2"
          >
            <div className="flex justify-between gap-8">
              <div className="flex items-center gap-2">
                <div className=" text-sm  text-gray-600 ">
                  -{note?.created_by?.first_name} {note?.created_by?.last_name},
                </div>
                <div className="text-sm text-gray-600">
                  {note?.created_at && formatDate(note?.created_at)}
                </div>
              </div>

              <div className="flex items-center justify-end">
                {note?.created_by?.id === userType &&
                  !isCurrentStageCompleted && (
                    <div>
                      <Button
                        className="bg-transparent px-2 h-fit py-1 cursor-pointer"
                        onClick={() => {
                          setNotesId(note?.id);
                        }}
                      >
                        <NotesEditIcon className="w-4 h-4 cursor-pointer" />
                      </Button>
                      <Button
                        className="bg-transparent px-2 h-fit py-1 cursor-pointer"
                        onClick={() => handleDeleteNote(note?.id)}
                        disabled={deletingNoteId === note?.id}
                      >
                        <NotesDeleteIcon className="w-4 h-4 cursor-pointer" />
                      </Button>
                    </div>
                  )}
              </div>
            </div>
            <div className="font-normal text-md ">{note?.title}</div>
            <div className="text-sm text-gray-800">
              {note?.note.split("\n").map((item: string, index: number) => (
                <p className="">{item}</p>
              ))}
            </div>
          </div>
        );
      })}
      {allRecords.length > 0 && isFetchingNextPage && (
        <div className="text-center  flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default GetCaseNotes;
