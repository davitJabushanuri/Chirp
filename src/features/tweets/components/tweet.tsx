/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div
      role={"button"}
      tabIndex={0}
      onClick={() => router.push(`/status/${tweet.id}`)}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <UserModalWrapper userId={tweet?.author?.id}>
          <UserAvatar
            userId={tweet?.author?.id}
            userImage={tweet?.author?.profile_image_url}
          />
        </UserModalWrapper>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
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

          <span className={styles.dot}>·</span>
          <span className={styles.date}>
            {dayjs(tweet?.created_at).format("MMM D")}
          </span>

          <div className={styles.options}>
            <TweetOptions tweet={tweet} />
          </div>
        </div>

        {tweet?.in_reply_to_status_id && (
          <div className={styles.replying}>
            <span className={styles.replyingTo}>Replying to</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/${tweet?.in_reply_to_screen_name}`);
              }}
              className={styles.replyingToUsername}
            >
              @{tweet?.in_reply_to_screen_name}
            </button>
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

          {tweet?.quoted_tweet && <QuotedTweet tweet={tweet?.quoted_tweet} />}
        </div>

        <div className={styles.actions}>
          <TweetActions tweet={tweet} showStats={true} />
        </div>
      </div>
    </div>
  );
};
