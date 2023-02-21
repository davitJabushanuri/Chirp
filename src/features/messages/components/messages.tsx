import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useGetConversation } from "../hooks/useGetConversation";

import { ConversationHeader } from "./conversation-header";
import styles from "./styles/messages.module.scss";

export const Messages = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  const { data: conversation, isLoading, isError } = useGetConversation(id);

  return (
    <div className={styles.container}>
      <ConversationHeader />

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <TryAgain />
      ) : (
        <div className={styles.conversation}>
          {conversation?.messages.map((message) => {
            return <div key={message?.id}>{message?.text}</div>;
          })}
        </div>
      )}
    </div>
  );
};
