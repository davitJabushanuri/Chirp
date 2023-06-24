import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

import { ReplyingTo } from "@/features/create-tweet";
import {
  UserAvatar,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";

import { ITweet } from "../types";

import { QuotedTweet } from "./quoted-tweet";
import styles from "./styles/tweet.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetMedia } from "./tweet-media";
import { TweetOptions } from "./tweet-options";

dayjs.extend(relativeTime);

export const Tweet = ({ tweet }: { tweet: ITweet }) => {
  return (
    <Link href={`/status/${tweet.id}`} className={styles.container}>
      <div className={styles.avatar}>
        <UserModalWrapper userId={tweet?.author?.id}>
          <UserAvatar
            userId={tweet?.author?.id}
            userImage={tweet?.author?.profile_image_url}
          />
        </UserModalWrapper>
      </div>

      <div className={styles.content}>
        <div className={styles.user_details}>
          <UserModalWrapper userId={tweet?.author?.id}>
            <UserName
              userId={tweet?.author?.id}
              name={tweet?.author?.name}
              isVerified={tweet?.author?.verified}
            />
          </UserModalWrapper>
          <div className={styles.username_time}>
            <UserModalWrapper userId={tweet?.author?.id}>
              <UserScreenName
                userId={tweet?.author?.id}
                screenName={tweet?.author?.email?.split("@")[0]}
              />
            </UserModalWrapper>

            <span className={styles.dot}>·</span>
            <span className={styles.date}>
              {dayjs(tweet?.created_at).format("MMM D")}
            </span>
          </div>
        </div>

        <div className={styles.options}>
          <TweetOptions tweet={tweet} />
        </div>

        {tweet?.in_reply_to_status_id && (
          <div className={styles.replyingTo}>
            <ReplyingTo screen_name={tweet?.in_reply_to_screen_name} />
          </div>
        )}

        <div className={styles.tweet}>
          {tweet?.text && (
            <div className={styles.text}>
              <p>{tweet?.text}</p>
            </div>
          )}
          {tweet?.media?.length > 0 && (
            <div className={styles.media}>
              <TweetMedia media={tweet?.media} tweetId={tweet?.id} />
            </div>
          )}

          {tweet?.quoted_tweet && (
            <div className={styles.quotedTweet}>
              <QuotedTweet tweet={tweet?.quoted_tweet} />
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <TweetActions tweet={tweet} showStats={true} />
        </div>
      </div>
    </Link>
  );
};
