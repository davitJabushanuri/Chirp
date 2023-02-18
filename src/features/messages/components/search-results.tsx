import { StartNewConversation } from "./start-new-conversation";
import styles from "./styles/search-results.module.scss";

export const SearchResults = ({ searchTerm }: { searchTerm: string }) => {
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
