import { retrieveHashtagsFromTweet } from "../api/retrieve-hashtags-from-tweet";

import styles from "./styles/explore.module.scss";

export const Explore = () => {
  return (
    <div className={styles.container}>
      <button
        onClick={() =>
          retrieveHashtagsFromTweet("#hashtag #and #mes si sadf sdf    fsadf")
        }
      >
        check hashtags
      </button>
    </div>
  );
};
