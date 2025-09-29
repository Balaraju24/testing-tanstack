import EyeIcon from "@/components/icons/eye-icon";
import NotesCloseIcon from "@/components/icons/notes-close-icon";
import NotesHeadIcon from "@/components/icons/notes-head-icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useCallback, useRef, useState } from "react";
import HearingHistoryList from "./HearingHistoryList";

const NextHearingDrawer = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  caseNotes,
  isLoadingCaseNote,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);
  const [isEditNotesOpen, setIsEditNotesOpen] = useState(false);

  const lastHearingSummaryRef = useCallback(
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

  return (
    <Sheet
      open={isNotesOpen}
      onOpenChange={(isOpen) => {
        setIsNotesOpen(isOpen);
        setIsAddNotesOpen(false);
        setIsEditNotesOpen(false);
      }}
    >
      <SheetTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="border-gray-200 py-2 bg-transparent hover:bg-transparent border-0 flex items-center justify-center cursor-pointer">
                <EyeIcon />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white text-xs rounded-none">
              Hearing history
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>

      <SheetContent className="bg-white w-4/12 p-2 font-primary">
        <SheetHeader className="flex flex-row p-2 pb-4 items-center justify-between border-b border-b-gray-300">
          <SheetTitle className="flex items-center gap-2">
            <NotesHeadIcon className="w-7 h-7" />
            <span className="font-medium text-smd 3xl:text-base text-black">
              Hearing history
            </span>
          </SheetTitle>
          <div className="flex items-center gap-6 cursor-pointer">
            <SheetClose
              onClick={() => {
                setIsAddNotesOpen(false);
                setIsEditNotesOpen(false);
              }}
            >
              <NotesCloseIcon className="w-7 h-7 cursor-pointer" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-2 h-[calc(100vh-80px)] overflow-y-auto">
          {!isAddNotesOpen && !isEditNotesOpen && (
            <HearingHistoryList
              allRecords={allRecords}
              isLoading={isLoadingCaseNote}
              isFetchingNextPage={isFetchingNextPage}
              lastHearingSummaryRef={lastHearingSummaryRef}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NextHearingDrawer;
