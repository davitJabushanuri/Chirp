import { ITweet } from "../types";

import styles from "./styles/comments.module.scss";
import { Tweet } from "./tweet";

export const Comments = ({ tweet }: { tweet: ITweet[] | undefined }) => {
  return (
    <div className={styles.container}>
      {tweet?.map((tweet) => {
        return (
          <div className={styles.tweetContainer} key={tweet?.id}>
            <Tweet tweet={tweet} />
          </div>
        );
      })}
    </div>
  );
};
