import { useState } from "react";

import dayjs from "dayjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import DefaultUserIcon from "@/components/icons/default-user";
import { caseComment } from "@/lib/interfaces/files";

function CommentItem({
  comment,
  commentReplies,
  setReplyTo,
}: {
  comment: caseComment;
  commentReplies: Map<number, caseComment[]>;
  setReplyTo: (comment: caseComment) => void;
}) {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const replies = commentReplies.get(comment.id) || [];

  return (
    <div className="space-y-2">
      {(comment.type === "REJECTED" || comment.type === "APPROVED") && (
        <div
          className={`flex flex-col p-3 rounded-lg border border-[#dbdbdb] ${comment.type === "APPROVED" ? "bg-green-50" : "bg-red-50"}`}
        >
          {comment.type ? (
            <h3
              className={`text-sm 3xl:text-base  mb-2 font-medium ${comment.type === "APPROVED" ? "text-green-500" : "text-red-500"}`}
            >
              {comment.type === "APPROVED" ? "Approval Note" : "Rejection Note"}
            </h3>
          ) : (
            ""
          )}

          <div className="flex gap-3 items-start mb-2">
            <Avatar className="w-7 h-7 flex items-center justify-center">
              {comment?.created_by?.profile_pic ? (
                <AvatarImage src={comment.created_by?.profile_pic} />
              ) : (
                <DefaultUserIcon className={"w-4 h-4"} />
              )}
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-start gap-2">
                <div className="font-normal text-primaryblack text-sm 3xl:text-base">
                  {comment.created_by?.first_name}{" "}
                  {comment.created_by?.last_name}
                </div>
                <div className="text-[10px] 3xl:text-xs font-normal text-[#828282]">
                  {dayjs(comment.created_at).format("hh:mm A")}
                </div>
              </div>
              <div className="text-xs 3xl:text-sm text-[#444] leading-relaxed">
                <ul className="text-black text-opacity-60 space-y-1">
                  {comment.comment
                    ?.split("\n")
                    .map((text: string, index: number) => (
                      <li key={index} className="text-black text-opacity-60">
                        {text.trim()}{" "}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="flex gap-4">
                {!(
                  comment.type === "REJECTED" || comment.type === "APPROVED"
                ) && (
                  <Button
                    onClick={() => setReplyTo(comment)}
                    className="text-[#2F80ED] text-xs h-fit py-0 3xl:text-sm mt-1 bg-transparent px-0 cursor-pointer"
                  >
                    Reply
                  </Button>
                )}

                {replies.length > 0 && (
                  <Button
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-[#2F80ED] text-xs h-fit py-0 3xl:text-sm mt-1 bg-transparent px-0 cursor-pointer"
                  >
                    {showReplies
                      ? `Hide Repl `
                      : `Show Replies (${replies.length})`}
                  </Button>
                )}
              </div>
            </div>
          </div>
          {showReplies && replies.length > 0 && (
            <div className="ml-10 space-y-2">
              {replies.reverse().map((reply: caseComment) => (
                <div key={reply.id} className="flex gap-3 items-start">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={reply.created_by?.profile_pic} />
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-start gap-2">
                      <div className="font-normal text-primaryblack text-sm 3xl:text-base">
                        {reply.created_by?.first_name}{" "}
                        {reply.created_by?.last_name}
                      </div>
                      <div className="text-[10px] 3xl:text-xs font-normal text-[#828282]">
                        {dayjs(reply.created_at).format("hh:mm A")}
                      </div>
                    </div>
                    <div className="text-xs 3xl:text-sm text-[#444] leading-relaxed">
                      <ul className="text-black text-opacity-60 space-y-1">
                        {reply.comment
                          ?.split("\n")
                          .map((text: string, index: number) => (
                            <li
                              key={index}
                              className="text-black text-opacity-60"
                            >
                              {text.trim()}{" "}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {comment.type === null && (
        <div className="  flex flex-col">
          <div className="flex gap-3 items-start mb-2">
            <Avatar className="w-7 h-7 flex items-center justify-center">
              {comment?.created_by?.profile_pic ? (
                <AvatarImage src={comment.created_by?.profile_pic} />
              ) : (
                <DefaultUserIcon className={"w-4 h-4"} />
              )}
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-start gap-2">
                <div className="font-normal text-primaryblack text-sm 3xl:text-base">
                  {comment.created_by?.first_name}{" "}
                  {comment.created_by?.last_name}
                </div>
                <div className="text-[10px] 3xl:text-xs font-normal text-[#828282]">
                  {dayjs(comment.created_at).format("hh:mm A")}
                </div>
              </div>
              <div className="text-xs 3xl:text-sm text-[#444] leading-relaxed">
                <ul className="text-black text-opacity-60 space-y-1">
                  {comment.comment
                    ?.split("\n")
                    .map((text: string, index: number) => (
                      <li key={index} className="text-black text-opacity-60">
                        {text.trim()}{" "}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => setReplyTo(comment)}
                  className="text-[#2F80ED] text-xs h-fit py-0 3xl:text-sm mt-1 bg-transparent px-0 cursor-pointer"
                >
                  Reply
                </Button>

                {replies.length > 0 && (
                  <Button
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-[#2F80ED] text-xs h-fit py-0 3xl:text-sm mt-1 bg-transparent px-0 cursor-pointer"
                  >
                    {showReplies
                      ? `Hide Replies`
                      : `Show Replies (${replies.length})`}
                  </Button>
                )}
              </div>
            </div>
          </div>
          {showReplies && replies.length > 0 && (
            <div className="ml-10 space-y-2">
              {replies.reverse().map((reply: caseComment) => (
                <div key={reply.id} className="flex gap-3 items-start">
                  <Avatar className="w-7 h-7 flex items-center justify-center">
                    {comment?.created_by?.profile_pic ? (
                      <AvatarImage src={comment.created_by?.profile_pic} />
                    ) : (
                      <DefaultUserIcon className={"w-4 h-4"} />
                    )}
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-start gap-2">
                      <div className="font-normal text-primaryblack text-sm 3xl:text-base">
                        {reply.created_by?.first_name}{" "}
                        {reply.created_by?.last_name}
                      </div>
                      <div className="text-[10px] 3xl:text-xs font-normal text-[#828282]">
                        {dayjs(reply.created_at).format("hh:mm A")}
                      </div>
                    </div>
                    <div className="text-xs 3xl:text-sm text-[#444] leading-relaxed">
                      <ul className="text-black text-opacity-60 space-y-1">
                        {reply.comment
                          ?.split("\n")
                          .map((text: string, index: number) => (
                            <li
                              key={index}
                              className="text-black text-opacity-60"
                            >
                              {text.trim()}{" "}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
