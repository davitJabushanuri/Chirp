import dayjs from "dayjs";

import { VerifiedIcon } from "@/assets/verified-icon";
import { Avatar } from "@/components/designs/avatar";
import { TweetMedia } from "@/features/tweets";
import { ITweet } from "@/features/tweets";

import styles from "./styles/create-tweet-quote.module.scss";

export const CreateTweetQuote = ({ tweet }: { tweet: ITweet }) => {
  console.log(tweet);

  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <span className={styles.avatar}>
          <Avatar
            userImage={tweet?.author?.profile_image_url}
            height={19}
            width={19}
          />
        </span>

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
        {tweet?.text && (
          <p className={styles.text}>
            {tweet?.text}{" "}
            {tweet?.quoted_tweet && (
              <span>{`chirp.com/${
                tweet.author?.email?.split("@")[0]
              }/s...`}</span>
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
