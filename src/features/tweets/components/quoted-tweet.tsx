import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { VerifiedIcon } from "@/assets/verified-icon";
import { UserAvatar } from "@/features/profile";

import { ITweet } from "../types";

import styles from "./styles/quoted-tweet.module.scss";
import { TweetMedia } from "./tweet-media";

export const QuotedTweet = ({ tweet }: { tweet: ITweet }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/status/${tweet?.id}`)}
      tabIndex={0}
      role="link"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/status/${tweet?.id}`);
        }
      }}
      className={styles.container}
    >
      <div className={styles.userDetails}>
        <span className={styles.avatar}>
          <UserAvatar
            userId={tweet?.author?.id}
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
          <div className={styles.text}>{decodeURIComponent(tweet?.text)}</div>
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
