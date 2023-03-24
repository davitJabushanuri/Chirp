import styles from "./styles/search-results-modal.module.scss";

export const SearchResultsModal = ({ query }: { query: string }) => {
  return (
    <div className={styles.container}>
      {!query ? (
        <div className={styles.placeholder}>
          Try searching for people, topics, or keywords
        </div>
      ) : (
        <div>results</div>
      )}
    </div>
  );
};
