import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { docsComments, getAllDocsComments } from "@/http/services/fileUpload";
import { caseComment, CommentProps } from "@/lib/interfaces/files";
import { Loader2, SendHorizontal } from "lucide-react";
import CommentItem from "./CommentItem";
import NoComments from "@/components/icons/no-comments";
import { capitalizeFirstLetter } from "@/utils/helpers/capitalFirstLetter";

const DocsCommentsSection: React.FC<CommentProps> = ({ documentId }) => {
  const [comment, setComment] = useState<string>("");
  const [displayComment, setDisplayComment] = useState<string>("");
  const [replyTo, setReplyTo] = useState<caseComment | null>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const path = location.pathname;
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const stage = search.stage;
  const subStage = search.sub_stage;

  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["comments", documentId],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const queryParams = {
          page: pageParam,
          pageSize: 10,
        };
        const response = await getAllDocsComments(documentId, queryParams);

        if (response?.status === 200 || response?.status === 201) {
          return response?.data?.data;
        }
        throw new Error("Failed to fetch comments");
      } catch (error) {
        toast.error("Error fetching comments", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        return { records: [], pagination_info: {} };
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.pagination_info?.next_page ?? undefined,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateComments, isPending: addCommentPending } = useMutation({
    mutationKey: ["comment", documentId],
    mutationFn: async (data: { comment: string; reply_to?: number }) => {
      const payload = {
        case_stage: stage,
        case_sub_stage: subStage,
        comment: data.comment,
        reply_to: data?.reply_to,
      };

      const response = await docsComments(payload, documentId);
      return response;
    },
    onSuccess: () => {
      refetch();
      setComment("");
      setDisplayComment("");
      setReplyTo(null);
    },
    onError: () => {
      toast.error("Failed to post a comment", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Comment cannot be empty", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }
    mutateComments({ comment: comment, reply_to: replyTo?.id });
  };

  const handleReplyClick = (comment: caseComment) => {
    setReplyTo(comment);
    setDisplayComment(`@${comment.created_by?.first_name} `);
    setComment("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (replyTo && value.startsWith(`@${replyTo.created_by?.first_name} `)) {
      const mentionedText = `@${replyTo.created_by?.first_name} `;
      const restOfText = value.slice(mentionedText.length);

      setDisplayComment(mentionedText + capitalizeFirstLetter(restOfText));
      setComment(capitalizeFirstLetter(restOfText.trim()));
    } else {
      setDisplayComment(capitalizeFirstLetter(value));
      setComment(value.trim());
    }
  };

  const commentsList =
    commentsData?.pages?.flatMap((page: any) => page?.records ?? []) ?? [];

  const { Comments, CommentReplies } = commentsList.reduce(
    (
      acc: {
        Comments: caseComment[];
        CommentReplies: Map<number, caseComment[]>;
      },
      comment: caseComment
    ) => {
      if (!comment) return acc;
      if (comment.reply_to) {
        if (!acc.CommentReplies.has(comment.reply_to)) {
          acc.CommentReplies.set(comment.reply_to, []);
        }
        acc.CommentReplies.get(comment.reply_to)?.push(comment);
      } else {
        acc.Comments.push(comment);
      }
      return acc;
    },
    { Comments: [], CommentReplies: new Map<number, caseComment[]>() }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (commentsContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          commentsContainerRef.current;
        if (
          scrollHeight - scrollTop <= clientHeight + 50 &&
          hasNextPage &&
          !isFetching
        ) {
          fetchNextPage();
        }
      }
    };

    const commentsContainer = commentsContainerRef.current;
    if (commentsContainer) {
      commentsContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (commentsContainer) {
        commentsContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    if (isError && error instanceof Error) {
      toast.error(error.message || "Error fetching comments", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    }
  }, [isError, error]);

  useEffect(() => {
    setTimeout(() => {
      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTop =
          commentsContainerRef.current.scrollHeight;
      }
    }, 100);
  }, [commentsList.length]);

  return (
    <Card className="w-full h-full mx-auto relative rounded-none border-gray-200 border-0.5 ">
      <div className="flex justify-between items-center mb-4 px-2 pt-4">
        <h6 className="text-[#444] text-md 3xl:text-lg font-normal">
          Comments{" "}
          <span className="bg-black px-3 rounded-full py-[1px] text-xs 3xl:text-sm text-white">
            {Comments.length}
          </span>
        </h6>
      </div>

      <div>
        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-270px)]">
            <span>Loading Comments...</span>
          </div>
        ) : (
          <div className="h-[calc(100vh-270px)]">
            {!Comments?.length ? (
              <div className="flex items-center justify-center h-full">
                <NoComments className="size-56" />
              </div>
            ) : (
              <div
                className="space-y-4 h-full overflow-x-auto px-3"
                ref={commentsContainerRef}
              >
                {[...Comments].reverse().map((comment: caseComment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    commentReplies={CommentReplies}
                    setReplyTo={handleReplyClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {!path.includes("files") && (
        <div className="absolute bottom-0 w-full">
          <div className=" relative flex items-center border rounded-none  border-gray-200 p-2 gap-2 bg-gray-100">
            <Textarea
              value={displayComment}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!addCommentPending) {
                    addComment(e as React.FormEvent);
                  }
                }
              }}
              placeholder="Add comment"
              className="border-none h-10 resize-none px-2 py-1 bg-transparent focus:ring-0 flex-1 outline-none text-xs 3xl:text-sm text-[#444] placeholder:text-[#444] placeholder:text-xs 3xl:placeholder:text-sm"
            />
            <Button
              onClick={addComment}
              variant="ghost"
              size="icon"
              className="text-white shadow-none bg-black h-9 w-9 rounded-none cursor-pointer"
              disabled={addCommentPending}
            >
              {!addCommentPending ? (
                <SendHorizontal className="w-5 h-5" />
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DocsCommentsSection;
