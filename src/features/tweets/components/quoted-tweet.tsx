import { useRouter } from "next/navigation";

import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import {
  Avatar,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";

import { ITweet } from "../types";

import styles from "./styles/quoted-tweet.module.scss";
import { TweetMedia } from "./tweet-media";

export const QuotedTweet = ({ tweet }: { tweet: ITweet }) => {
  const router = useRouter();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/status/${tweet?.id}`);
      }}
      tabIndex={0}
      role="link"
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
          router.push(`/status/${tweet?.id}`);
        }
      }}
      className={styles.container}
    >
      <div className={styles.userDetails}>
        <UserModalWrapper userId={tweet?.author?.id}>
          <div className={styles.avatar}>
            <Avatar userImage={tweet?.author?.profile_image_url} />
          </div>
        </UserModalWrapper>

        <UserModalWrapper userId={tweet?.author?.id}>
          <EllipsisWrapper>
            <UserName
              name={tweet?.author?.name}
              isVerified={tweet?.author.verified}
            />
          </EllipsisWrapper>
        </UserModalWrapper>

        <UserModalWrapper userId={tweet?.author?.id}>
          <EllipsisWrapper>
            <UserScreenName screenName={tweet?.author?.email?.split("@")[0]} />
          </EllipsisWrapper>
        </UserModalWrapper>
        <span className={styles.dot}>·</span>
        <CreateDate date={tweet?.created_at} focus={false} hover={false} />
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
