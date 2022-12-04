import styles from "./styles/tweet-button.module.scss";

const TweetButton = () => {
  return (
    <button disabled className={styles.container}>
      Tweet
    </button>
  );
};

export default TweetButton;
