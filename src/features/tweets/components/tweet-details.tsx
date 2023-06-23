import { usePathname, useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { NotFound } from "@/components/elements/not-found";
import { TryAgain } from "@/components/elements/try-again";
import { CreateTweetWrapper } from "@/features/create-tweet";

import { useTweet } from "../hooks/use-tweet";

import { Comments } from "./comments";
import { QuotedTweet } from "./quoted-tweet";
import styles from "./styles/tweet-details.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetAuthor } from "./tweet-author";
import { TweetCreationDate } from "./tweet-creation-date";
import { TweetMedia } from "./tweet-media";
import { TweetStatistics } from "./tweet-statistics";

export const TweetDetails = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split(`/`)[2] || ``;

  const { data: tweet, isLoading, isError } = useTweet(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  if (!isLoading && !isError && !tweet) {
    return <NotFound />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tweetDetails}>
        <TweetAuthor tweet={tweet} />
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
          {tweet?.text && <div className={styles.text}>{tweet?.text}</div>}
          {tweet?.media?.length > 0 && (
            <div className={styles.media}>
              <TweetMedia media={tweet?.media} tweetId={tweet?.id} />
            </div>
          )}

          {tweet?.quoted_tweet && <QuotedTweet tweet={tweet?.quoted_tweet} />}
        </div>

        <TweetCreationDate date={tweet?.created_at} />
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
