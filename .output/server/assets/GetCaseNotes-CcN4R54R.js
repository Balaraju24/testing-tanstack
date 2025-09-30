import { jsxs, jsx } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { N as NotesDeleteIcon } from "./notes-delete-icon-CyozBLV8.js";
import { N as NotesEditIcon } from "./notes-edit-icon-B2gT4vHe.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { i as caseViewNoteDeleteAPI } from "./manage-tW0NLyej.js";
import { u as userStore } from "./userDetails-Dbr9T6uw.js";
import { i as isSubStageCompleted, f as formatDate } from "./ManageCaseHeader-B1x76cDH.js";
import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { Loader2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
const GetCaseNotes = () => {
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchCaseNotes,
    allRecords,
    setNotes,
    caseStagesData,
    notesId,
    setNotesId
  } = UseContextAPI();
  const search = useSearch({ strict: false });
  const subStage = search.sub_stage;
  const userDetails = useStore(userStore, (state) => state["user"]);
  const userType = userDetails?.id;
  const { mutate: mutateDeleteNote } = useMutation({
    mutationKey: ["delete-note", notesId],
    mutationFn: async (noteId) => {
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
          onClick: () => toast.dismiss()
        }
      });
      refetchCaseNotes();
      setNotes(null);
    }
  });
  const observer = useRef(null);
  const lastNoteRef = useCallback(
    (node) => {
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
  const handleDeleteNote = (noteId) => {
    setDeletingNoteId(noteId);
    mutateDeleteNote(noteId, {
      onSettled: () => {
        setDeletingNoteId(null);
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-4 bg-gray-100 divide-y-2 divide-gray-200", children: [
    allRecords?.map((note, index) => {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref: index === allRecords.length - 1 ? lastNoteRef : null,
          className: "space-y-1   p-2",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: " text-sm  text-gray-600 ", children: [
                  "-",
                  note?.created_by?.first_name,
                  " ",
                  note?.created_by?.last_name,
                  ","
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: note?.created_at && formatDate(note?.created_at) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end", children: note?.created_by?.id === userType && !isCurrentStageCompleted && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    className: "bg-transparent px-2 h-fit py-1 cursor-pointer",
                    onClick: () => {
                      setNotesId(note?.id);
                    },
                    children: /* @__PURE__ */ jsx(NotesEditIcon, { className: "w-4 h-4 cursor-pointer" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    className: "bg-transparent px-2 h-fit py-1 cursor-pointer",
                    onClick: () => handleDeleteNote(note?.id),
                    disabled: deletingNoteId === note?.id,
                    children: /* @__PURE__ */ jsx(NotesDeleteIcon, { className: "w-4 h-4 cursor-pointer" })
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "font-normal text-md ", children: note?.title }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-800", children: note?.note.split("\n").map((item, index2) => /* @__PURE__ */ jsx("p", { className: "", children: item })) })
          ]
        },
        index
      );
    }),
    allRecords.length > 0 && isFetchingNextPage && /* @__PURE__ */ jsx("div", { className: "text-center  flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) })
  ] });
};
export {
  GetCaseNotes as G
};
