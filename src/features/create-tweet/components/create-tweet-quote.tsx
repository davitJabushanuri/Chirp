import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Avatar, UserName, UserScreenName } from "@/features/profile";
import { TweetMedia } from "@/features/tweets";
import { ITweet } from "@/features/tweets";

import styles from "./styles/create-tweet-quote.module.scss";

export const CreateTweetQuote = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <span className={styles.avatar}>
          <Avatar userImage={tweet?.author?.profile_image_url} />
        </span>

        <EllipsisWrapper>
          <UserName
            name={tweet?.author?.name}
            isVerified={tweet?.author?.verified}
          />
        </EllipsisWrapper>

        <EllipsisWrapper>
          <UserScreenName screenName={tweet?.author?.email?.split("@")[0]} />
        </EllipsisWrapper>

        <span className={styles.dot}>·</span>
        <CreateDate date={tweet?.created_at} focus={false} hover={false} />
      </div>

      <div className={styles.tweet}>
        {tweet?.text && (
          <p className={styles.text}>
            {decodeURIComponent(tweet?.text)}{" "}
            {tweet?.quoted_tweet && (
              <span>{`chirp.com/${
                tweet.author?.email?.split("@")[0]
              }/s...`}</span>
            )}
          </p>
        )}

        {tweet?.media?.length > 0 && (
          <div className={styles.media}>
            <TweetMedia media={tweet?.media} tweetId={tweet?.id} />
          </div>
        )}
      </div>
    </div>
  );
};
