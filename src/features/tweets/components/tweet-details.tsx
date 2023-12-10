"use client";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { CreateTweetWrapper, ReplyingTo } from "@/features/create-tweet";
import {
  ITweet,
  Comments,
  QuotedTweet,
  TweetActions,
  TweetAuthor,
  TweetCreationDate,
  TweetMedia,
  TweetStatistics,
  useTweet,
} from "@/features/tweets";

import styles from "./styles/tweet-details.module.scss";

export const TweetDetails = ({
  initialTweet,
}: {
  initialTweet: ITweet | undefined;
}) => {
  const pathname = usePathname();
  const tweetId = pathname.split(`/`)[2];

  const {
    data: tweet,
    isPending,
    isError,
  } = useTweet({
    id: tweetId,
    initialData: initialTweet,
  });

  if (isPending) return <LoadingSpinner />;

  if (isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      <div className={styles.tweetDetails}>
        <TweetAuthor tweet={tweet} />
        {tweet?.in_reply_to_status_id && (
          <ReplyingTo
            screen_name={tweet?.in_reply_to_screen_name}
            id={tweet?.author?.id}
          />
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
          retweet_count={tweet?._count?.retweets}
          quote_count={tweet?._count?.quotes}
          likes_count={tweet?._count?.likes}
          bookmarks_count={tweet?._count?.bookmarks}
        />
        <div className={styles.tweetActions}>
          <TweetActions tweet={tweet} />
        </div>
      </div>
      <CreateTweetWrapper
        in_reply_to_screen_name={tweet?.author?.email?.split(`@`)[0]}
        in_reply_to_status_id={tweet?.id}
      />
      <Comments tweetId={tweet?.id} />
    </div>
  );
};
