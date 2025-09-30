import { jsxs, jsx } from "react/jsx-runtime";
import { U as UseContextAPI } from "./Provider-DRuE0d-A.js";
import { L as LoadingComponent } from "./Loading-CtQhAIXf.js";
import { D as DefaultUserIcon } from "./default-user-EV710LEP.js";
import { N as NotesDeleteIcon } from "./notes-delete-icon-CyozBLV8.js";
import { N as NotesEditIcon } from "./notes-edit-icon-B2gT4vHe.js";
import { P as PlusIcon } from "./plus-icon-DkC55LLp.js";
import { A as Avatar, a as AvatarImage } from "./avatar-DZ-dXD0g.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { I as Input } from "./input-G3xZAzeG.js";
import { T as TableRow, a as TableCell, b as Table, c as TableHeader, d as TableHead, e as TableBody } from "./table-BGLbMthS.js";
import { T as Textarea } from "./textarea-Bgbbi7bt.js";
import { h as caseViewAddNoteAPI, i as caseViewNoteDeleteAPI, j as caseUpdateNoteAPI, c as caseViewNotesAPI } from "./manage-tW0NLyej.js";
import { n as notesViewAPI } from "./service-1g9dZr4o.js";
import { u as userStore } from "./userDetails-Dbr9T6uw.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import dayjs from "dayjs";
import { useRef, useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { T as TabValuesForViewCase } from "./TabValuesForViewCase-CyAukXxK.js";
const NoNoteData = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "301",
      height: "200",
      viewBox: "0 0 301 200",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_11913_24284)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M137.309 156.119C171.215 156.119 198.701 128.632 198.701 94.7259C198.701 60.8197 171.215 33.3333 137.309 33.3333C103.402 33.3333 75.916 60.8197 75.916 94.7259C75.916 128.632 103.402 156.119 137.309 156.119Z",
              fill: "url(#paint0_linear_11913_24284)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M78.5371 127.25H212.481C217.597 127.25 221.744 123.487 221.744 118.846V113.849C221.744 109.208 217.597 105.445 212.481 105.445H78.5371C84.6638 111.522 84.7704 120.807 78.7834 126.997L78.5371 127.25Z",
              fill: "#C9C9C9"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M80.4152 107.943H147.818C152.459 107.943 156.222 111.706 156.222 116.347C156.222 120.988 152.459 124.751 147.818 124.751H80.4102C83.5585 119.595 83.5515 113.085 80.4152 107.943Z",
              fill: "url(#paint1_linear_11913_24284)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M84.5675 81.6056C84.2732 81.1009 84.7192 80.5176 85.3975 80.5176H192.071C200.432 80.5176 207.209 86.1102 207.209 93.0116C207.209 99.9109 200.432 105.504 192.071 105.504H85.3699C84.6882 105.504 84.2422 104.917 84.5385 104.411C88.7609 97.1892 88.7505 88.7939 84.5675 81.6056Z",
              fill: "#52555A"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M85.4192 83.2063H156.992C162.278 83.2063 166.565 87.4926 166.565 92.779V93.497C166.565 98.7833 162.278 103.07 156.992 103.07H85.2676C88.4746 96.704 88.5089 89.5686 85.4192 83.2063Z",
              fill: "url(#paint2_linear_11913_24284)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M214.388 79.4073H145.547C139.443 79.4073 134.494 74.071 134.494 67.4883C134.494 60.9057 139.443 55.5693 145.547 55.5693H214.388C209.126 62.1777 208.921 71.871 213.897 78.731L214.388 79.4073Z",
              fill: "url(#paint3_linear_11913_24284)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M135.403 67.4883C135.403 60.9056 140.409 55.5692 146.583 55.5692H215.643C215.965 55.5692 216.225 55.2886 216.223 54.9459C216.22 54.6053 215.96 54.3333 215.643 54.3333H106.089C99.274 54.3333 93.75 60.2223 93.75 67.4883C93.75 74.7543 99.274 80.6433 106.089 80.6433H215.643C215.961 80.6433 216.22 80.3696 216.223 80.0323C216.226 79.6896 215.966 79.4089 215.643 79.4089H146.583C140.409 79.4073 135.403 74.0709 135.403 67.4883Z",
              fill: "#C9C9C9"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M124.871 93.645C124.871 92.265 126.618 91.146 128.772 91.146H137.357C135.722 91.146 134.398 91.9947 134.398 93.0417L134.439 119.827L129.696 116.383L124.861 119.827L124.871 93.645Z",
              fill: "#3F3F3F"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M45.25 127.206H244.279C250.459 127.206 255.47 132.217 255.47 138.396V147.809C255.47 153.989 250.459 159 244.279 159H45.25L45.355 158.892C53.869 150.03 53.8227 136.012 45.25 127.206Z",
              fill: "#52555A"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M48.7734 131.912H155.17C161.35 131.912 166.361 136.923 166.361 143.103C166.361 149.283 161.35 154.294 155.17 154.294H48.7751C52.6864 147.363 52.6811 138.835 48.7734 131.912Z",
              fill: "url(#paint4_linear_11913_24284)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M80.4154 49.0002C81.4279 49.0002 82.2487 48.1794 82.2487 47.1668C82.2487 46.1543 81.4279 45.3335 80.4154 45.3335C79.4028 45.3335 78.582 46.1543 78.582 47.1668C78.582 48.1794 79.4028 49.0002 80.4154 49.0002Z",
              stroke: "#E1E4E5",
              strokeWidth: "1.104",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M217.857 92.5479C218.745 92.5479 219.465 91.8283 219.465 90.9406C219.465 90.0529 218.745 89.3333 217.857 89.3333C216.97 89.3333 216.25 90.0529 216.25 90.9406C216.25 91.8283 216.97 92.5479 217.857 92.5479Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M194.726 43.5358L189.861 45.4378L190.169 40.2234L195.033 38.3228L194.726 43.5358Z",
              stroke: "#E1E4E5",
              strokeWidth: "1.402",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M67.0553 115.957C68.3533 114.822 68.7239 112.543 68.7239 112.543C68.7239 112.543 66.2083 112.371 64.9106 113.506C63.6126 114.641 63.0396 116.11 63.6323 116.788C64.2249 117.465 65.7569 117.093 67.0553 115.957ZM234.29 118.508C232.325 116.789 231.763 113.337 231.763 113.337C231.763 113.337 235.573 113.076 237.539 114.795C239.504 116.514 240.372 118.74 239.475 119.765C238.577 120.791 236.257 120.229 234.29 118.508Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M53.8539 92.7179C52.5739 93.9488 52.5341 95.9842 53.765 97.2642C54.9958 98.5442 57.0313 98.584 58.3113 97.3532C59.5913 96.1223 59.6311 94.0869 58.4002 92.8069C57.1694 91.5269 55.1339 91.4871 53.8539 92.7179Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M235.98 100.556C236.874 101.415 236.902 102.837 236.043 103.73C235.183 104.624 233.762 104.652 232.868 103.792C231.974 102.933 231.947 101.512 232.806 100.618C233.666 99.7244 235.087 99.6966 235.98 100.556Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M65.653 72.1393L62.25 68.7363L65.653 65.3333L69.056 68.7363L65.653 72.1393ZM228.653 70.806L232.056 67.403L228.653 64L225.25 67.403L228.653 70.806Z",
              stroke: "#E1E4E5",
              strokeWidth: "1.80667",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint0_linear_11913_24284",
              x1: "139.927",
              y1: "224.959",
              x2: "136.14",
              y2: "-100.236",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint1_linear_11913_24284",
              x1: "116.7",
              y1: "134.174",
              x2: "116.815",
              y2: "89.6532",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint2_linear_11913_24284",
              x1: "124.183",
              y1: "114.206",
              x2: "124.332",
              y2: "61.5916",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint3_linear_11913_24284",
              x1: "172.738",
              y1: "92.7723",
              x2: "172.957",
              y2: "29.6297",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint4_linear_11913_24284",
              x1: "105.06",
              y1: "166.842",
              x2: "105.191",
              y2: "107.557",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("clipPath", { id: "clip0_11913_24284", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "300",
              height: "200",
              fill: "white",
              transform: "translate(0.25)"
            }
          ) })
        ] })
      ]
    }
  );
};
const ServiceNotes = () => {
  const observer = useRef(null);
  const { service_id } = useParams({ strict: false });
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addNotes, setAddNotes] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [noteError, setNoteError] = useState("");
  const { isUser } = useUserDetails();
  const userDetails = useStore(userStore, (state) => state["user"]);
  const userType = userDetails?.id;
  const { caseStagesData } = UseContextAPI();
  const isViewPanelOpen = selectedNoteId || addNotes || isEditMode;
  const fetchCaseNotes = async ({ pageParam = 1 }) => {
    try {
      if (!service_id) return;
      const queryParams = {
        page: pageParam,
        page_size: 10,
        types: ["NOTE", "CASE_BRIEF", "CASE_REMARKS", "CASE_DRAFT_REMARKS"]
      };
      const response = await caseViewNotesAPI(service_id, queryParams);
      return {
        data: response?.data?.data?.records,
        nextCursor: response?.data?.data?.pagination_info?.next_page ? response?.data?.data?.pagination_info?.current_page + 1 : null,
        prevCursor: response?.data?.data?.pagination_info?.current_page !== 1 ? response?.data?.data?.pagination_info?.current_page - 1 : null,
        totalRecords: response?.data?.data?.pagination_info?.total_records
      };
    } catch (err) {
      throw new Error("Failed to fetch case notes");
    }
  };
  const {
    data: caseNotes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-notes", "notes", service_id],
    queryFn: fetchCaseNotes,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor ?? null,
    refetchOnWindowFocus: false
  });
  const allRecords = caseNotes?.pages.map((e) => e.data).flat() || [];
  const selectedNote = allRecords.find(
    (note) => note.id === selectedNoteId
  );
  const lastNoteRef = useCallback(
    (node) => {
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
    mutationFn: async (data) => {
      const payload = {
        ...data,
        case_id: Number(service_id),
        type: "NOTE"
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
          onClick: () => toast.dismiss()
        }
      });
    },
    onError: (error) => {
      if (error?.status == 422) {
        setTitleError(error?.data?.errData?.title?.[0]);
        setNoteError(error?.data?.errData?.note?.[0]);
      }
      toast.error(
        error?.data?.message || error?.message || error?.data?.data?.error,
        {
          action: {
            label: "✕",
            onClick: () => toast.dismiss()
          }
        }
      );
    }
  });
  const { mutate: mutateNotesView } = useMutation({
    mutationFn: async ({ noteId, noteType }) => {
      const payload = {
        note_ids: [noteId],
        note_type: noteType
      };
      const response = await notesViewAPI(payload);
      return response?.data;
    },
    onSuccess: () => {
      refetch();
    }
  });
  const { mutate: mutateDeleteNote, isPending: isLoadingDeleteNote } = useMutation({
    mutationKey: ["delete-note", service_id],
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
      setSelectedNoteId(null);
      refetch();
    },
    onError: (error) => {
      if (error?.status == 422) {
        setNoteError(error?.data?.errData?.note?.[0]);
      }
    }
  });
  const { mutate: mutateUpdateNote, isPending: isLoadingUpdateNote } = useMutation({
    mutationKey: ["update-note", service_id],
    mutationFn: async (data) => {
      const response = await caseUpdateNoteAPI({
        ...data,
        noteId: data.noteId,
        payload: {
          case_id: Number(service_id),
          type: "NOTE",
          title: data.title,
          note: data.note
        }
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
          onClick: () => toast.dismiss()
        }
      });
      setIsEditMode(false);
      setSelectedNoteId(null);
      refetch();
    },
    onError: (error) => {
      if (error?.status == 422) {
        setNoteError(error?.data?.errData?.note?.[0]);
        setTitleError(error?.data?.errData?.title?.[0]);
      }
      toast.error(
        error?.data?.message || error?.message || error?.data?.data?.error,
        {
          action: {
            label: "✕",
            onClick: () => toast.dismiss()
          }
        }
      );
    }
  });
  const handleViewClick = (noteId, noteType) => {
    setSelectedNoteId(noteId === selectedNoteId ? null : noteId);
    setAddNotes(false);
    setNoteContent("");
    setNoteTitle("");
    const isRecordUnread = allRecords?.some(
      (record) => record.id === noteId && record?.notes_read_status?.some(
        (item) => !item.is_seen && item.user_id === userType
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
  const handleKeyDown = (e) => {
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
        note: noteContent
      });
    } else {
      mutateAddNote({
        title: noteTitle,
        note: noteContent
      });
    }
  };
  const handleEditNote = (note) => {
    setIsEditMode(true);
    setSelectedNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.note);
  };
  const handleDeleteNote = (noteId) => {
    mutateDeleteNote(noteId);
  };
  useEffect(() => {
    if (isEditMode && selectedNote) {
      setNoteTitle(selectedNote.title || "");
      setNoteContent(selectedNote.note || "");
    }
  }, [isEditMode, selectedNote, userType]);
  const renderTableRows = allRecords.map((record, index) => {
    const isRecordUnread = record.notes_read_status?.some(
      (item) => !item.is_seen && item.user_id === userType
    );
    const fullUsername = `${record?.created_by?.first_name} ${record?.created_by?.last_name}`;
    const fullTitle = record?.title || "No Title";
    return /* @__PURE__ */ jsxs(
      TableRow,
      {
        className: `border-t border-gray-200 hover:bg-gray-50 transition-colors ${selectedNoteId === record.id ? "bg-blue-50" : "bg-white"}`,
        ref: index === allRecords.length - 1 ? lastNoteRef : null,
        children: [
          /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-1 border-r border-gray-200 relative", children: [
            isRecordUnread && /* @__PURE__ */ jsx("div", { className: "absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Avatar, { className: "w-8 h-8 flex items-center justify-center", children: record?.created_by?.profile_pic ? /* @__PURE__ */ jsx(AvatarImage, { src: record.created_by?.profile_pic }) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "w-4 2xl:w-5 2xl:h-5 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "2xl:text-sm text-xs capitalize font-normal text-gray-900 truncate max-w-[80px]", children: fullUsername }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] 2xl:text-xs text-gray-500", children: dayjs(record.created_at).format("DD MMM YYYY") })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-1 border-r border-gray-200 font-normal break-words", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `line-clamp-2 text-gray-900 truncate ${isViewPanelOpen ? "w-12" : "w-32"}`,
              title: fullTitle,
              children: fullTitle
            }
          ) }),
          /* @__PURE__ */ jsxs(TableCell, { className: "px-4 py-1 border-r border-gray-200 font-normal", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-900", children: caseStagesData?.stages?.find(
              (sub) => sub.code === record?.case_stage
            )?.title || record?.case_stage || "--" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: caseStagesData?.sub_stages?.find(
              (sub) => sub.code === record?.case_sub_stage
            )?.title || record?.case_sub_stage || "--" })
          ] }),
          /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-1 border-r border-gray-200 2xl:text-sm text-xs font-normal", children: /* @__PURE__ */ jsx("div", { className: "text-gray-700 break-words whitespace-pre-wrap line-clamp-2", children: record?.note }) }),
          !isViewPanelOpen && /* @__PURE__ */ jsx(TableCell, { className: "px-4 py-1", children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "2xl:text-sm text-xs h-fit py-1 px-2 !shadow-none cursor-pointer bg-blue-50 text-black hover:bg-blue-100 border border-gray-200 rounded-md",
              onClick: () => handleViewClick(record.id, record.type),
              children: "View"
            }
          ) })
        ]
      },
      index
    );
  });
  const notesTableContent = isLoading && !isFetchingNextPage ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsx(LoadingComponent, { loading: isLoading, message: "Loading Notes..." }) }) : allRecords?.length > 0 ? /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { className: "w-full", children: [
    /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-50 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx(TableHead, { className: "text-left w-32 font-normal px-4 py-2 border-r border-gray-200", children: "User Name" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-normal px-4 py-2 border-r border-gray-200", children: "Title" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-normal px-4 py-2 border-r border-gray-200", children: "Stage" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-normal px-4 py-2 border-r border-gray-200", children: "Notes" }),
      !isViewPanelOpen && /* @__PURE__ */ jsx(TableHead, { className: "text-left w-20 font-normal px-4 py-2", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsx(TableBody, { children: renderTableRows })
  ] }) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-gray-400 items-center justify-center h-full", children: [
    /* @__PURE__ */ jsx(NoNoteData, { className: "w-60 h-60 text-gray-400" }),
    /* @__PURE__ */ jsx("div", { children: "No Notes Available" })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 flex flex-col h-[calc(100vh-106px)]", children: [
    /* @__PURE__ */ jsx(TabValuesForViewCase, {}),
    /* @__PURE__ */ jsx("div", { className: "self-end", children: /* @__PURE__ */ jsxs(
      Button,
      {
        className: "bg-gray-300 cursor-pointer rounded-none pb-1 hover:bg-gray-300 h-fit font-normal py-1 px-3 mt-2 mx-3 text-black text-sm",
        onClick: () => {
          setAddNotes(!addNotes);
          setSelectedNoteId(null);
          setTitleError("");
          setNoteError("");
        },
        disabled: isEditMode,
        children: [
          /* @__PURE__ */ jsx(PlusIcon, {}),
          "Add"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex flex-1 ${isUser() ? "p-1" : "p-2"} ${isViewPanelOpen ? "gap-2" : ""} overflow-hidden`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 relative overflow-auto", children: [
            notesTableContent,
            isFetchingNextPage && /* @__PURE__ */ jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsx("div", { children: "Loading Notes..." }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `bg-gray-100 flex-shrink-0 overflow-auto transition-all duration-150 ease-in-out ${isViewPanelOpen ? "w-2/5 shadow-sm" : "w-0"}`,
              children: [
                selectedNoteId && !isEditMode && /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxs("h2", { className: "text-sm font-normal capitalize", children: [
                      selectedNote?.created_by?.first_name,
                      " ",
                      selectedNote?.created_by?.last_name
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      userType === selectedNote?.created_by?.id && selectedNote?.type === "NOTE" && /* @__PURE__ */ jsx(
                        Button,
                        {
                          className: "bg-transparent px-2 h-fit py-1 cursor-pointer",
                          onClick: () => handleEditNote(selectedNote),
                          children: /* @__PURE__ */ jsx(NotesEditIcon, { className: "w-4 h-4" })
                        }
                      ),
                      userType === selectedNote?.created_by?.id && selectedNote?.type === "NOTE" && /* @__PURE__ */ jsx(
                        Button,
                        {
                          className: "bg-transparent px-2 h-fit py-1 cursor-pointer",
                          onClick: () => handleDeleteNote(selectedNoteId),
                          disabled: isLoadingDeleteNote,
                          children: /* @__PURE__ */ jsx(NotesDeleteIcon, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          onClick: () => setSelectedNoteId(null),
                          className: "h-fit bg-red-200 text-red-400 cursor-pointer text-sm rounded-none",
                          children: "Close"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-base font-normal mb-2", children: selectedNote?.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-700 whitespace-pre-wrap", children: selectedNote?.note.split("\n").map((note, index) => /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "text-black text-opacity-60 text-sm",
                        children: note.trim()
                      },
                      index
                    )) })
                  ] })
                ] }),
                (addNotes || isEditMode) && /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-5 flex flex-col", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        className: "border border-gray-500 bg-slate-100 rounded-none",
                        placeholder: "Title",
                        value: noteTitle.charAt(0).toUpperCase() + noteTitle.slice(1),
                        onChange: (e) => setNoteTitle(e.target.value)
                      }
                    ),
                    titleError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: titleError })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        className: "border h-72 border-gray-500 resize-none bg-slate-100 rounded-none",
                        placeholder: "Note",
                        value: noteContent.charAt(0).toUpperCase() + noteContent.slice(1),
                        onChange: (e) => setNoteContent(e.target.value),
                        onKeyDown: handleKeyDown
                      }
                    ),
                    noteError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: noteError })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        className: "bg-black text-white hover:bg-black h-fit py-1 px-6 rounded-none w-fit self-end cursor-pointer",
                        onClick: handleClose,
                        disabled: isLoadingUpdateNote || isPending,
                        children: "Close"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        className: "bg-black text-white hover:bg-black h-fit py-1 px-6 rounded-none w-fit self-end cursor-pointer",
                        onClick: handleSaveNote,
                        disabled: isPending || isLoadingUpdateNote,
                        children: isPending || isLoadingUpdateNote ? "Saving..." : selectedNoteId ? "Update" : "Save"
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
};
export {
  ServiceNotes as S
};
