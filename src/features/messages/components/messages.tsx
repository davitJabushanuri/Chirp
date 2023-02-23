import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useGetConversation } from "../hooks/use-get-conversation";

import { ConversationHeader } from "./conversation-header";
import { ConversationMemberDetails } from "./conversation-member-details";
import { Message } from "./message";
import styles from "./styles/messages.module.scss";

export const Messages = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const { data: session } = useSession();
  const { data: conversation, isLoading, isError } = useGetConversation(id);
  const conversationMember = conversation?.users.filter(
    (user) => user?.id !== session?.user?.id,
  )[0];

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
      <ConversationHeader />
      <div className={styles.conversation}>
        <ConversationMemberDetails user={conversationMember} />
        <div className={styles.messages}>
          {conversation?.messages.map((message) => {
            return <Message message={message} key={message?.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
