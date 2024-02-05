"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/elements/button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { socket } from "@/lib/socket-io";

import { ArrowDownIcon } from "../assets/arrow-down-icon";
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
      <div id="chat-container" className={`${styles.conversation} relative`}>
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
      <Button className="shadow-main absolute bottom-[5rem] right-[1.6rem] bg-background fill-primary-100 px-[1em] py-[0.5em] hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:ring-secondary-100/80 active:bg-neutral-600">
        <ArrowDownIcon />
      </Button>

      <MessageInput
        conversation_id={conversation?.id}
        sender_id={session?.user?.id}
        receiver_id={conversationMember?.id}
      />
    </div>
  );
};
