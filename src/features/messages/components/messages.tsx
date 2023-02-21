import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useGetConversation } from "../hooks/use-get-conversation";

import { ConversationHeader } from "./conversation-header";
import { ConversationMember } from "./conversation-member";
import styles from "./styles/messages.module.scss";

export const Messages = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const { data: session } = useSession();
  const { data: conversation, isLoading, isError } = useGetConversation(id);
  const conversationMember = conversation?.users.filter(
    (user) => user?.id !== session?.user?.id,
  )[0];

  return (
    <div className={styles.container}>
      <ConversationHeader />

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <TryAgain />
      ) : (
        <div className={styles.conversation}>
          <ConversationMember user={conversationMember} />
          {conversation?.messages.map((message) => {
            return <div key={message?.id}>{message?.text}</div>;
          })}
        </div>
      )}
    </div>
  );
};
