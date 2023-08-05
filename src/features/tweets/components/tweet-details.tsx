"use client";

import { CreateTweetWrapper, ReplyingTo } from "@/features/create-tweet";

import { ITweet } from "../types";

import { Comments } from "./comments";
import { QuotedTweet } from "./quoted-tweet";
import styles from "./styles/tweet-details.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetAuthor } from "./tweet-author";
import { TweetCreationDate } from "./tweet-creation-date";
import { TweetMedia } from "./tweet-media";
import { TweetStatistics } from "./tweet-statistics";

export const TweetDetails = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tweetDetails}>
        <TweetAuthor tweet={tweet} />
        {tweet?.in_reply_to_status_id && (
          <ReplyingTo screen_name={tweet?.in_reply_to_screen_name} />
        )}

        <div className={styles.tweet}>
          {tweet?.text && (
            <div className={styles.text}>{decodeURIComponent(tweet?.text)}</div>
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

        <TweetCreationDate date={tweet?.created_at} link={tweet?.id} />
        <TweetStatistics
          retweet_count={tweet?.retweets?.length}
          quote_count={tweet?.quotes?.length}
          likes={tweet?.likes}
          retweets={tweet?.retweets}
        />
        <div className={styles.tweetActions}>
          <TweetActions tweet={tweet} />
        </div>
      </div>
      <CreateTweetWrapper
        in_reply_to_screen_name={tweet?.author?.email?.split(`@`)[0]}
        in_reply_to_status_id={tweet?.id}
      />
      <div className={styles.comments}>
        <Comments tweetId={tweet?.id} />
      </div>
    </div>
  );
};
