import {
  UserAvatar,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";
import { TweetOptions } from "@/features/tweets";
import { ITweet } from "@/features/tweets";

import styles from "./styles/tweet-author.module.scss";

export const TweetAuthor = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <UserModalWrapper userId={tweet?.author?.id}>
        <UserAvatar
          userId={tweet?.author?.id}
          userImage={tweet?.author?.profile_image_url}
        />
      </UserModalWrapper>

      <div className={styles.userInfo}>
        <UserModalWrapper userId={tweet?.author?.id}>
          <UserName
            userId={tweet?.author?.id}
            name={tweet?.author?.name}
            isVerified={tweet?.author?.verified}
          />
        </UserModalWrapper>

        <UserModalWrapper userId={tweet?.author?.id}>
          <UserScreenName
            userId={tweet?.author?.id}
            screenName={tweet?.author?.email?.split("@")[0]}
          />
        </UserModalWrapper>
      </div>

      <div className={styles.options}>
        <TweetOptions tweet={tweet} />
      </div>
    </div>
  );
};
