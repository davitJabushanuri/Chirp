import styles from "./styles/TweetButton.module.scss";

const TweetButton = () => {
  return (
    <button disabled className={styles.container}>
      Tweet
    </button>
  );
};

export default TweetButton;
