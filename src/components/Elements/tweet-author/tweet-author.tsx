import { VerifiedIcon } from "@/assets/verified-icon";
import { IUser } from "@/features/profile";

import { Options } from "../options";
import { User } from "../user";

import styles from "./styles/tweet-author.module.scss";

export const TweetAuthor = ({ author }: { author: IUser }) => {
  return (
    <div className={styles.container}>
      <User userId={author?.id} userImage={author?.profile_image_url} />
      <div className={styles.userInfo}>
        <p className={styles.name}>
          <span className={styles.text}>{author?.name}</span>
          <span className={styles.icon}>
            {author?.verified && <VerifiedIcon />}
          </span>
        </p>
        <p className={styles.username}>@{author?.email.split("@")[0]}</p>
      </div>

      <div className={styles.options}>
        <Options />
      </div>
    </div>
  );
};
