import dayjs from "dayjs";

import { VerifiedIcon } from "@/assets/verified-icon";
import { UserAvatar } from "@/features/profile";
import { ITweet } from "@/features/tweets";

import { CreateTweetQuote } from "./create-tweet-quote";
import { ReplyingTo } from "./replying-to";
import styles from "./styles/create-tweet-comment.module.scss";

export const CreateTweetComment = ({ tweet }: { tweet: ITweet | null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <UserAvatar
          userId={tweet?.author?.id}
          userImage={tweet?.author?.profile_image_url as string}
        />
        <div className={styles.divider}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.userDetails}>
          <span className={styles.name}>{tweet?.author?.name}</span>

          <span className={styles.verified}>
            {tweet?.author?.verified && <VerifiedIcon />}
          </span>

          <span className={styles.username}>
            @{tweet?.author?.email?.split("@")[0]}
          </span>
          <span className={styles.dot}>·</span>
          <span className={styles.date}>
            {dayjs(tweet?.created_at).format("MMM D")}
          </span>
        </div>
        <div className={styles.tweet}>
          {tweet?.text && <div className={styles.text}>{tweet?.text}</div>}
        </div>

        {tweet?.quoted_tweet && (
          <div className={styles.quoted_tweet}>
            <CreateTweetQuote tweet={tweet?.quoted_tweet} />
          </div>
        )}

        {tweet?.author?.email && (
          <div className={styles.replyingTo}>
            <ReplyingTo screen_name={tweet?.author?.email?.split("@")[0]} />
          </div>
        )}
      </div>
    </div>
  );
};
