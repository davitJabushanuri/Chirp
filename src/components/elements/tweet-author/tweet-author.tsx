import { VerifiedIcon } from "@/assets/verified-icon";
import { TweetOptions } from "@/features/tweets";
import { ITweet } from "@/features/tweets";

import { User } from "../user";

import styles from "./styles/tweet-author.module.scss";

export const TweetAuthor = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <User
        userId={tweet?.author?.id}
        userImage={tweet?.author?.profile_image_url}
      />
      <div className={styles.userInfo}>
        <p className={styles.name}>
          <span className={styles.text}>{tweet?.author?.name}</span>
          <span className={styles.icon}>
            {tweet?.author?.verified && <VerifiedIcon />}
          </span>
        </p>
        <p className={styles.username}>@{tweet?.author?.email.split("@")[0]}</p>
      </div>

      <div className={styles.options}>
        <TweetOptions tweet={tweet} />
      </div>
    </div>
  );
};
