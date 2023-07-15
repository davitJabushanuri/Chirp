import dayjs from "dayjs";

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
          <p className={styles.text}>
            {decodeURIComponent(tweet?.text)}{" "}
            {tweet?.quoted_tweet && (
              <span>{`chirp.com/${tweet.author?.email?.split(
                "@",
              )[0]}/s...`}</span>
            )}
          </p>
        )}

        {tweet?.media?.length > 0 && (
          <div className={styles.media}>
            <TweetMedia
              media={tweet?.media}
              tweetId={tweet?.id}
              links={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
