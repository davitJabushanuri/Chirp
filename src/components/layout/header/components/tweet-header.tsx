import styles from "./styles/tweet-header.module.scss";

export const TweetHeader = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tweet</h2>
    </div>
  );
};
