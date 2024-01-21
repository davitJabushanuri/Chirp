import { useSession } from "next-auth/react";
import React, { useLayoutEffect } from "react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useChat } from "../hooks/use-get-chat";
import { useSocketEvents } from "../hooks/use-socket-events";
import { scrollToBottom } from "../utils/scroll-to-bottom";

import { Message } from "./message";
import styles from "./styles/chat.module.scss";

export type status = "sending" | "sent" | "seen" | "failed";

export const Chat = ({
  conversation_id,
}: {
  conversation_id: string | undefined;
}) => {
  const { data: session } = useSession();
  const { data: chat, isLoading, isError } = useChat(conversation_id);

  useSocketEvents(conversation_id);

  useLayoutEffect(() => {
    const lastElement = document.getElementById("last-element");
    scrollToBottom(lastElement);

    return () => {
      scrollToBottom(lastElement);
    };
  }, [chat]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      {chat?.map((message, index) => {
        return (
          <Message
            key={message?.id}
            message={message}
            show_status={
              index === chat.length - 1 &&
              message.sender_id === session?.user?.id
            }
          />
        );
      })}
    </div>
  );
};
