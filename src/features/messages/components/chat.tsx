import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/elements/button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { ArrowDownIcon } from "../assets/arrow-down-icon";
import { useChat } from "../hooks/use-get-chat";
import { useSocketEvents } from "../hooks/use-socket-events";
import { scrollIntoView } from "../utils/scroll-into-view";

import { Message } from "./message";

export const Chat = memo(() => {
  const pathname = usePathname();
  const conversation_id = pathname?.split("/")[2];

  const { data: session } = useSession();
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useChat(conversation_id);

  const isLastMessageSender = useMemo(
    () => data?.pages.at(-1)?.chat?.at(-1)?.sender_id === session?.user?.id,
    [data, session],
  );

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [toast, setToast] = useState<
    "new message" | "scroll to bottom" | "none"
  >("none");

  const { ref: firstMessageRef } = useInView({
    initialInView: false,
    onChange(inView) {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
        setToast("scroll to bottom");
      }
    },
  });

  const { ref: lastMessageRef, inView: lastMessageInView } = useInView({
    initialInView: true,
  });

  const handleToastClick = useCallback(() => {
    scrollIntoView({
      element: anchorRef.current,
    });
    setToast("none");
  }, []);

  useSocketEvents(conversation_id);

  useEffect(() => {
    if (lastMessageInView) {
      setToast("none");
    } else setToast("scroll to bottom");
  }, [lastMessageInView]);

  useEffect(() => {
    if (lastMessageInView) {
      scrollIntoView({
        element: anchorRef.current,
      });
    } else if (!isLastMessageSender) {
      setToast("new message");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <TryAgain />;

  return (
    <div className="relative">
      <div className="p-[1em_1em_0]">
        {isFetchingNextPage && <LoadingSpinner />}

        {data?.pages?.map((page, pageIndex) => {
          return page?.chat?.map((message, messageIndex) => {
            return (
              <div
                ref={
                  messageIndex === 0 && pageIndex === 0
                    ? firstMessageRef
                    : messageIndex === page.chat.length - 1 &&
                        pageIndex === data.pages.length - 1
                      ? lastMessageRef
                      : null
                }
                key={message.id}
              >
                <Message
                  show_status={
                    message.sender_id === session?.user?.id &&
                    messageIndex === page.chat.length - 1 &&
                    pageIndex === data.pages.length - 1
                  }
                  message={message}
                />
              </div>
            );
          });
        })}
        <div id="anchor" ref={anchorRef} />
      </div>

      {toast === "new message" && (
        <Button
          className="shadow-main absolute bottom-20 left-1/2 translate-x-1/2 bg-background px-[1em] py-[0.5em] text-milli font-bold text-primary-100 hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100/50 active:bg-neutral-600"
          onClick={handleToastClick}
        >
          ↓ New messages
        </Button>
      )}

      {toast === "scroll to bottom" && (
        <Button
          onClick={() => {
            scrollIntoView({
              element: anchorRef.current,
              behavior: "smooth",
            });
          }}
          className="shadow-main absolute bottom-20 right-[1.6rem] bg-background fill-primary-100 px-[1em] py-[0.5em] hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100/50 active:bg-neutral-600"
        >
          <ArrowDownIcon />
        </Button>
      )}
    </div>
  );
});

Chat.displayName = "Chat";
