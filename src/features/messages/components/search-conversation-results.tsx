import { useSession } from "next-auth/react";

import { useGetConversations } from "../hooks/use-get-conversations";

import { StartNewConversation } from "./start-new-conversation";
import styles from "./styles/search-results.module.scss";

export const SearchConversationResults = ({
  searchTerm,
}: {
  searchTerm: string;
}) => {
  const { data: session } = useSession();

  const {
    data: conversations,
    isLoading,
    isError,
  } = useGetConversations(session?.user?.id);

  if (isLoading) return null;

  if (isError) return null;

  return (
    <div className={styles.container}>
      {!searchTerm ? (
        <div className={styles.noResults}>
          Try searching for people, groups, or messages
        </div>
      ) : (
        <StartNewConversation
          title={`No results for "${searchTerm}"`}
          subtitle={`The term you entered did not bring up any results`}
          buttonText={`Start new message`}
        />
      )}
    </div>
  );
};
