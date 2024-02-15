import { useSession } from "next-auth/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/elements/button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { ArrowDownIcon } from "../assets/arrow-down-icon";
import { useChat } from "../hooks/use-get-chat";
import { useSocketEvents } from "../hooks/use-socket-events";
import { scrollIntoView } from "../utils/scroll-into-view";

import { Message } from "./message";

export type status = "sending" | "sent" | "seen" | "failed";

export const Chat = ({
  conversation_id,
}: {
  conversation_id: string | undefined;
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [displayNewMessageToast, setDisplayNewMessageToast] = useState(false);

  const { data: session } = useSession();
  const { data: chat, isLoading, isError } = useChat(conversation_id);

  useSocketEvents(conversation_id);

  useEffect(() => {
    if (inView) {
      setScrolledToBottom(true);
    } else {
      setScrolledToBottom(false);
    }
  }, [inView]);

  useLayoutEffect(() => {
    if (!scrolledToBottom) {
      scrollIntoView({
        element: anchorRef.current,
        behavior: "instant",
      });
    } else {
      if (
        chat &&
        chat?.length > 0 &&
        chat[chat.length - 1]?.sender_id !== session?.user?.id
      )
        setDisplayNewMessageToast(true);
    }
  }, [chat]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <TryAgain />;

  return (
    <div className="p-[1em_1em_0]">
      {chat?.map((message, index) => {
        return (
          <div key={message?.id} ref={index === chat.length - 1 ? ref : null}>
            <Message
              message={message}
              show_status={
                index === chat.length - 1 &&
                message.sender_id === session?.user?.id
              }
            />
          </div>
        );
      })}
      <div id="anchor" ref={anchorRef} />
      {!scrolledToBottom && !displayNewMessageToast && (
        <Button
          onClick={() => {
            scrollIntoView({
              element: anchorRef.current,
              behavior: "smooth",
            });
          }}
          className="shadow-main absolute bottom-[5rem] right-[1.6rem] bg-background fill-primary-100 px-[1em] py-[0.5em] hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100/50 active:bg-neutral-600"
        >
          <ArrowDownIcon />
        </Button>
      )}

      {displayNewMessageToast && (
        <Button
          className="shadow-main absolute bottom-[5rem] left-[50%] translate-x-[-50%] bg-background px-[1em] py-[0.5em] text-milli font-bold text-primary-100 hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100/50 active:bg-neutral-600"
          onClick={() => {
            scrollIntoView({
              element: anchorRef.current,
            });
            setDisplayNewMessageToast(false);
          }}
        >
          ↓ New messages
        </Button>
      )}
    </div>
  );
};
