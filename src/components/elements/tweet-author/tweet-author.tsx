import { UserAvatar, UserName, UserScreenName } from "@/features/profile";
import { TweetOptions } from "@/features/tweets";
import { ITweet } from "@/features/tweets";

import styles from "./styles/tweet-author.module.scss";

export const TweetAuthor = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <UserAvatar
        userId={tweet?.author?.id}
        userImage={tweet?.author?.profile_image_url}
      />
      <div className={styles.userInfo}>
        <UserName
          name={tweet?.author?.name}
          isVerified={tweet?.author?.verified}
        />

        <UserScreenName screenName={tweet?.author?.email?.split("@")[0]} />
      </div>

      <div className={styles.options}>
        <TweetOptions tweet={tweet} />
      </div>
    </div>
  );
};
