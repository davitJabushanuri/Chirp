import dayjs from "dayjs";

import { Avatar, UserName, UserScreenName } from "@/features/profile";
import { ITweet } from "@/features/tweets";

import { CreateTweetQuote } from "./create-tweet-quote";
import { ReplyingTo } from "./replying-to";
import styles from "./styles/create-tweet-comment.module.scss";

export const CreateTweetComment = ({ tweet }: { tweet: ITweet | null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar userImage={tweet?.author?.profile_image_url as string} />
        <div className={styles.divider}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.userDetails}>
          <UserName
            name={tweet?.author?.name}
            isVerified={tweet?.author?.verified}
          />

          <UserScreenName screenName={tweet?.author?.email?.split("@")[0]} />

          <span className={styles.dot}>·</span>
          <span className={styles.date}>
            {dayjs(tweet?.created_at).format("MMM D")}
          </span>
        </div>
        <div className={styles.tweet}>
          {tweet?.text && (
            <p className={styles.text}>{decodeURIComponent(tweet?.text)}</p>
          )}
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
