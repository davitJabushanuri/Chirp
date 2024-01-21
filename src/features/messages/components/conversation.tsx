"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { socket } from "@/lib/socket-io";

import { useGetConversation } from "../hooks/use-get-conversation";

import { Chat } from "./chat";
import { ConversationHeader } from "./conversation-header";
import { ConversationMemberDetails } from "./conversation-member-details";
import { MessageInput } from "./message-input";
import styles from "./styles/conversation.module.scss";

export const Conversation = () => {
  const { data: session } = useSession();

  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  const { data: conversation, isLoading, isError } = useGetConversation(id);
  const conversationMember = conversation?.users.filter(
    (user) => user?.id !== session?.user?.id,
  )[0];

  const [displayToast, setDisplayToast] = useState(false);

  useEffect(() => {
    socket.auth = { conversation_id: id };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [id]);

  if (isLoading)
    return (
      <>
        <ConversationHeader />
        <LoadingSpinner />
      </>
    );

  if (isError)
    return (
      <>
        <ConversationHeader />
        <TryAgain />
      </>
    );

  return (
    <div className={styles.container}>
      <ConversationHeader
        user_id={conversationMember?.id}
        user_name={conversationMember?.name}
        user_image={conversationMember?.profile_image_url}
        isVerified={conversationMember?.verified}
      />
      <div id="chat-container" className={styles.conversation}>
        <ConversationMemberDetails user={conversationMember} />
        <Chat conversation_id={conversation?.id} />
        <div id="last-element" />
      </div>
      {displayToast && (
        <button
          className={styles.newMessageNotification}
          onClick={() => {
            setDisplayToast(false);
          }}
        >
          ↓ New messages
        </button>
      )}
      <MessageInput
        conversation_id={conversation?.id}
        sender_id={session?.user?.id}
        receiver_id={conversationMember?.id}
      />
    </div>
  );
};
