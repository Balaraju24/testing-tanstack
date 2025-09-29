import LoadingComponent from "@/components/core/Loading";
import DefaultUserIcon from "@/components/icons/default-user";
import NoChatData from "@/components/icons/no-chat-data";
import { Avatar } from "@/components/ui/avatar";
import {
  chatViewMessageAPI,
  createChatAPI,
  getSingleCaseChatDetailsAPI,
  updateChatAPI,
} from "@/http/services/service";
import { colors } from "@/lib/constants/statusConstants";
import { sliceFilename } from "@/utils/helpers/manage";
import { ChatData } from "@/lib/interfaces/chat";
import { ChatMessageData, NotesReadStatus } from "@/lib/interfaces/service";
import { userStore } from "@/store/userDetails";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Linkify from "linkify-react";
import { File } from "lucide-react";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ChatMessage from "./ChatMessage";
import ChatSend from "./ChatSend";
import TabValuesForViewCase from "./TabValuesForViewCase";

dayjs.extend(customParseFormat);

const ServiceChat = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { service_id } = useParams({ strict: false });
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const userType = userDetails?.id;
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [createAt, setCreatedAt] = useState<Date>();
  const [fileName, setFileName] = useState<string>("");
  const [attachmentKey, setAttachementKey] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  let hasShownUnreadTag = false;

  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    if (editingChatId) {
      setEditingMessage(newMessage);
    }
  };

  const createNewMessage = () => {
    createNewChatItem({
      type: "MESSAGES",
      message: message || "",
      fileName: null,
      attachmentKey: null,
      file_type: null,
      file_size: null,
    });
  };

  const createNewAttachment = (
    attachmentKey: string,
    fileName: string,
    file_type: string,
    file_size: number
  ) => {
    createNewChatItem({
      type: "ATTACHMENT",
      message: null,
      fileName: fileName,
      attachmentKey: attachmentKey,
      file_type: file_type,
      file_size: file_size,
    });
  };

  const createNewChatItem = ({
    type,
    message,
    fileName,
    attachmentKey,
    file_type,
    file_size,
  }: {
    type: "MESSAGES" | "ATTACHMENT";
    message: string | null;
    fileName: string | null;
    attachmentKey: string | null;
    file_type: string | null;
    file_size: number | null;
  }) => {
    const case_id = service_id as string;

    if (type === "MESSAGES" && (!message || message.trim().length === 0)) {
      toast("Message cannot be empty or whitespace.", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }

    if (type === "ATTACHMENT" && !attachmentKey) {
      toast("Attachment is required.", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }

    const tempMessage: any = {
      id: `temp-${Date.now()}`,
      user_id: userType,
      created_at: new Date().toISOString(),
      user_read_status: [],
      user: {
        first_name: userDetails?.first_name,
        last_name: userDetails?.last_name,
        profile_pic: userDetails?.profile_pic,
      },
      status: "sending",
      type: type,
    };

    if (type === "MESSAGES") {
      tempMessage.message = message;
    } else {
      tempMessage.attachment_key = attachmentKey;
      tempMessage.attachment_name = fileName;
      tempMessage.message = "";
      tempMessage.file_type = file_type;
      tempMessage.file_size = file_size;
    }

    queryClient.setQueryData(
      ["getSingleCaseChatDetails", service_id],
      (oldData: any) => {
        if (!oldData) {
          return {
            pages: [{ data: [tempMessage], nextCursor: null }],
          };
        }

        const newPages = oldData.pages.map((page: any, index: number) => {
          if (index === 0) {
            return {
              ...page,
              data: [tempMessage, ...page.data],
            };
          }
          return page;
        });

        return {
          ...oldData,
          pages: newPages,
        };
      }
    );

    setMessage("");
    setFileName("");
    setAttachementKey("");
    setFileType("");
    setFileSize(0);

    const payload: any = {
      case_id: case_id ? Number(case_id) : 0,
      type: type,
    };

    if (type === "MESSAGES") {
      payload.message = message;
    } else {
      payload.attachment_key = attachmentKey;
      payload.attachment_name = fileName;
      payload.file_type = file_type;
      payload.file_size = file_size;
    }

    mutateCreateChat(payload);
  };

  const updateMessage = () => {
    let case_id = service_id as string;
    if (!message || message?.trim()?.length === 0) {
      toast("Message cannot be empty or whitespace.", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }
    if (editingChatId && createAt) {
      const tempUpdatedMessage = {
        id: editingChatId,
        user_id: userType,
        message,
        created_at: createAt,
        user_read_status: [],
        user: {
          first_name: userDetails?.first_name,
          last_name: userDetails?.last_name,
          profile_pic: userDetails?.profile_pic,
        },
        status: "updating",
        type: "MESSAGES",
      };

      queryClient.setQueryData(
        ["getSingleCaseChatDetails", service_id],
        (oldData: any) => {
          if (!oldData) return oldData;

          const newPages = oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((msg: any) =>
              msg.id === editingChatId ? tempUpdatedMessage : msg
            ),
          }));

          return { ...oldData, pages: newPages };
        }
      );

      const payload = {
        case_id: case_id ? Number(case_id) : 0,
        message: message || "",
        type: "MESSAGES",
      };

      if (!updateChatPending) {
        mutateUpdateChat({ chatId: editingChatId, payload });
        setMessage("");
        setEditingChatId(null);
        setEditingMessage(null);
      }
    }
  };

  const { mutate: mutateCreateChat, isPending: isPendingCreateMessage } =
    useMutation({
      mutationKey: ["create-new-chat"],
      mutationFn: async (data: any) => {
        const response = await createChatAPI(data);
        return response?.data;
      },
      onMutate: async (newMessage) => {
        await queryClient.cancelQueries({
          queryKey: ["getSingleCaseChatDetails", service_id],
        });

        const previousMessages = queryClient.getQueryData([
          "getSingleCaseChatDetails",
          service_id,
        ]);

        return { previousMessages };
      },
      onError: (err, newMessage, context) => {
        queryClient.setQueryData(
          ["getSingleCaseChatDetails", service_id],
          context?.previousMessages
        );
        toast.error("Failed to send message", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["getSingleCaseChatDetails", service_id],
        });
      },
      onSuccess: (data) => {
        setEditingChatId(null);
        setEditingMessage(null);
      },
    });

  const { mutate: mutateUpdateChat, isPending: updateChatPending } =
    useMutation({
      mutationKey: ["update-chat-message"],
      mutationFn: async ({
        chatId,
        payload,
      }: {
        chatId: string;
        payload: { case_id: number; message: string; type: string };
      }) => {
        const response = await updateChatAPI({ chatId, payload });
        return response?.data;
      },
      onSuccess: async (data) => {
        setEditingChatId(null);
        setEditingMessage(null);
        refetch();
      },
      onError: (error: any) => {
        toast.error("Failed to update message", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
      },
    });

  //   const { data: chatCounts, refetch: getallChatCounts } = useQuery({
  //     queryKey: ["chatCounts"],
  //     queryFn: async () => {
  //       const response = await getChatCountsAPI();
  //       return response?.data?.data?.count || 0;
  //     },
  //     enabled: true,
  //     refetchOnWindowFocus: false,
  //   });

  const { mutate: chatViewMessage, isPending: chatViewMessageLoading } =
    useMutation({
      mutationFn: async (payload: any) => {
        const response = await chatViewMessageAPI(payload);
        return response?.data;
      },
      onSuccess: () => {
        // getallChatCounts();
      },
      onError: () => {},
    });

  const fetchChatMessages = async ({ pageParam = 1 }) => {
    if (!service_id) return { data: [], nextCursor: null };

    try {
      const response = await getSingleCaseChatDetailsAPI(service_id, {
        page: pageParam,
        page_size: 15,
      });

      if (response.status === 200 || response.status === 201) {
        const { data } = response?.data;

        const unreadMessages = data.records
          ?.filter((msg: any) =>
            msg.user_read_status?.some(
              (status: any) => status.user_id === userType && !status.is_seen
            )
          )
          .map((msg: any) => msg.id);

        if (unreadMessages?.length > 0) {
          const payload = { case_id: service_id, chat_ids: unreadMessages };
          chatViewMessage(payload);
          //   getallChatCounts();
        }

        return {
          data: data.records || [],
          nextCursor: data?.pagination_info?.next_page || null,
          prevCursor: pageParam > 1 ? pageParam - 1 : null,
        };
      }
      throw new Error("Failed to fetch messages");
    } catch (err) {
      throw err;
    }
  };

  const {
    isLoading,
    data: chatPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["getSingleCaseChatDetails", service_id],
    queryFn: fetchChatMessages,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    enabled: !!service_id,
    refetchOnWindowFocus: false,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const firstChatRef = useCallback(
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

  const handleSendOrUpdate = () => {
    if (editingChatId) {
      updateMessage();
    } else {
      createNewMessage();
    }
    setShouldScrollToBottom(true);
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
    setEditingMessage(null);
    setMessage(null);
  };

  const allMessages = chatPages?.pages?.flatMap((page) => page.data) || [];
  const filteredMessages = allMessages.filter((message: ChatMessageData) => {
    if (message.user_id === userType) return true;

    return message.user_read_status?.some(
      (status: any) => status.user_id === userType
    );
  });

  const groupedMessages = filteredMessages.reduce(
    (acc: { [key: string]: ChatData }, message: ChatMessageData) => {
      const messageDate = dayjs(message?.created_at).format("DD-MM-YYYY");

      if (!acc[messageDate]) {
        acc[messageDate] = { date: messageDate, messages: [] };
      }

      acc[messageDate].messages.push(message);
      return acc;
    },
    {}
  );

  const sortedGroupedMessages = Object.values(groupedMessages || {})
    ?.sort((a: any, b: any) => {
      const dateFormat = "DD-MM-YYYY";
      const parsedDateA = dayjs(a.date.trim(), dateFormat, true);
      const parsedDateB = dayjs(b.date.trim(), dateFormat, true);

      const dateA = parsedDateA.isValid() ? parsedDateA.valueOf() : 0;
      const dateB = parsedDateB.isValid() ? parsedDateB.valueOf() : 0;

      return dateA - dateB;
    })
    ?.map((group: any) => {
      const messageDate = dayjs(group.date, "DD-MM-YYYY");
      const today = dayjs().format("DD-MM-YYYY");
      const yesterday = dayjs().subtract(1, "day").format("DD-MM-YYYY");

      const formattedDate =
        group.date === today
          ? "Today"
          : group.date === yesterday
            ? "Yesterday"
            : messageDate.format("DD MMM YYYY");

      return {
        ...group,
        date: formattedDate,
        messages: group.messages.sort((a: any, b: any) => {
          const timeA = new Date(a.created_at).getTime();
          const timeB = new Date(b.created_at).getTime();
          return timeA - timeB;
        }),
      };
    })
    .filter((group: any) => group.messages.length > 0);

  const getColor = (name: string): string => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };
  useEffect(() => {
    if (chatContainerRef.current && isFetchingNextPage) {
      const scrollContainer = chatContainerRef.current;
      const scrollHeightBefore = scrollContainer.scrollHeight;

      return () => {
        if (scrollContainer) {
          const scrollHeightAfter = scrollContainer.scrollHeight;
          scrollContainer.scrollTop = scrollHeightAfter - scrollHeightBefore;
        }
      };
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (chatContainerRef.current && shouldScrollToBottom) {
      const scrollContainer = chatContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      setShouldScrollToBottom(false);
    }
  }, [chatPages, shouldScrollToBottom]);

  useEffect(() => {
    if (!isLoading) setShouldScrollToBottom(true);
  }, [isLoading]);

  return (
    <div className="border border-gray-300 ">
      <TabValuesForViewCase />
      <div className="h-[calc(100vh-155px)] relative bg-indigo-50 bg-opacity-50">
        {isLoading ? (
          <LoadingComponent
            loading={isLoading}
            message="Loading Chats..."
            className="bg-white"
          />
        ) : (
          <>
            {isFetchingNextPage && (
              <div className="text-center text-xs text-gray-500 mt-2">
                Loading more Chats...
              </div>
            )}

            <div
              ref={chatContainerRef}
              className="h-[calc(100%-60px)] overflow-y-auto"
            >
              {sortedGroupedMessages?.length > 0 ? (
                <>
                  {sortedGroupedMessages?.map((group: ChatData, groupIndex) => {
                    return (
                      <div key={group.date} className="px-8 py-4">
                        <p className="text-center mb-6 text-sm text-zinc-400 font-medium tracking-wide">
                          {group.date}
                        </p>
                        <div className="flex flex-col gap-4">
                          {group.messages?.map((data: any, index: any) => {
                            const fullName = `${data?.user?.first_name || ""} ${
                              data?.user?.last_name || ""
                            }`?.trim();
                            const isUnread = data.user_read_status?.some(
                              (item: NotesReadStatus) =>
                                item.is_seen === false &&
                                item.user_id === userType
                            );

                            let unreadTag: JSX.Element | null = null;
                            if (!hasShownUnreadTag && isUnread) {
                              hasShownUnreadTag = true;
                              unreadTag = (
                                <div className="relative flex items-center">
                                  <div className="flex-1 border-t border-gray-300"></div>
                                  <span className="px-3 text-red-500 text-xs animate-bounce">
                                    New
                                  </span>
                                  <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                              );
                            }

                            return (
                              <div key={data.id || index}>
                                {unreadTag}
                                <div
                                  ref={
                                    groupIndex === 0 && index === 0
                                      ? firstChatRef
                                      : null
                                  }
                                >
                                  {data.user_id !== userType ? (
                                    <div>
                                      {data.user_read_status
                                        ?.filter(
                                          (item: any) =>
                                            item.user_id === userType
                                        )
                                        ?.map(
                                          (filteredItem: any, idx: string) => (
                                            <div
                                              key={filteredItem || idx}
                                              className="justify-self-start flex items-start justify-start w-4/5 gap-x-2 text-sm text-gray-800"
                                            >
                                              <Avatar className="w-8 h-8 bg-white flex items-center justify-center">
                                                {data?.user?.profile_pic ? (
                                                  <img
                                                    src={
                                                      data?.user?.profile_pic
                                                    }
                                                    alt="Profile"
                                                    className="object-cover"
                                                  />
                                                ) : (
                                                  <DefaultUserIcon className="w-4 h-4" />
                                                )}
                                              </Avatar>
                                              <div className="p-2 relative bg-white border-[1px] max-w-[50%]  min-w-28 space-y-0.5 border-zinc-300">
                                                <div className="text-xs font-semibold">
                                                  ~{" "}
                                                  <span
                                                    style={{
                                                      color: getColor(fullName),
                                                    }}
                                                  >
                                                    {data?.user?.first_name}{" "}
                                                    {data?.user?.last_name}
                                                  </span>
                                                </div>

                                                {data.message && (
                                                  <div className="flex gap-2 justify-between">
                                                    <div className="text-md mb-2">
                                                      <ul className="">
                                                        {data.message
                                                          .split("\n")
                                                          .map(
                                                            (
                                                              line: string,
                                                              index: number
                                                            ) => (
                                                              <li
                                                                key={index}
                                                                className="break-words"
                                                              >
                                                                <Linkify
                                                                  options={{
                                                                    target:
                                                                      "_blank",
                                                                    className:
                                                                      "text-blue-600 hover:underline",
                                                                  }}
                                                                >
                                                                  {line.trim()}
                                                                </Linkify>
                                                              </li>
                                                            )
                                                          )}
                                                      </ul>
                                                    </div>
                                                  </div>
                                                )}

                                                {data.attachment_key && (
                                                  <div className="rounded-md pb-2">
                                                    <a
                                                      href={data.download_url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center bg-gray-200 p-1 gap-2  text-sm"
                                                    >
                                                      <File className="size-4" />
                                                      {sliceFilename(
                                                        data.attachment_name,
                                                        25
                                                      )}
                                                    </a>
                                                  </div>
                                                )}

                                                <div className="text-[10px] absolute right-1 -bottom-1 pb-1  text-gray-500">
                                                  {dayjs(
                                                    data.created_at
                                                  ).format("hh:mm a")}
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                    </div>
                                  ) : (
                                    <ChatMessage
                                      messageData={data}
                                      refetch={refetch}
                                      onEdit={(
                                        chatId: string,
                                        message: string,
                                        created_at: Date
                                      ) => {
                                        setEditingChatId(chatId);
                                        setEditingMessage(message);
                                        setCreatedAt(created_at);
                                        setMessage(message);
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <NoChatData className="w-1/3" />
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            <ChatSend
              message={message}
              onMessageChange={handleMessageChange}
              sendMessage={handleSendOrUpdate}
              sendAttachment={(
                attachmentKey,
                fileName,
                file_type,
                file_size
              ) => {
                setFileName(fileName);
                createNewAttachment(
                  attachmentKey,
                  fileName,
                  file_type,
                  file_size
                );
              }}
              isPending={isPendingCreateMessage || updateChatPending}
              isEditing={!!editingChatId}
              onCancelEdit={handleCancelEdit}
              disabled={isPendingCreateMessage || updateChatPending}
              refetch={refetch}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceChat;
