import { useRouter } from "next/navigation";

import { PinIcon } from "@/assets/pin-icon";
import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { ReplyingTo } from "@/features/create-tweet";
import {
  Avatar,
  LinkToProfile,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";

import { ITweet } from "../types";

import { TweetOptions } from "./options/tweet-options";
import { QuotedTweet } from "./quoted-tweet";
import styles from "./styles/tweet.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetMedia } from "./tweet-media";

export const Tweet = ({
  tweet,
  pinned,
}: {
  tweet: ITweet;
  pinned?: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/status/${tweet.id}`)}
      tabIndex={0}
      role="link"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/status/${tweet.id}`);
        }
      }}
      className={styles.container}
    >
      {pinned && (
        <div className={styles.pin}>
          <PinIcon />
          Pinned
        </div>
      )}

      <div className={styles.tweetContainer}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            <UserModalWrapper userId={tweet?.author?.id}>
              <LinkToProfile userId={tweet?.author?.id}>
                <Avatar userImage={tweet?.author?.profile_image_url} />
              </LinkToProfile>
            </UserModalWrapper>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.user_details}>
            <UserModalWrapper userId={tweet?.author?.id}>
              <LinkToProfile userId={tweet?.author?.id}>
                <EllipsisWrapper>
                  <UserName
                    name={tweet?.author?.name}
                    isVerified={tweet?.author?.verified}
                    hover={true}
                  />
                </EllipsisWrapper>
              </LinkToProfile>
            </UserModalWrapper>

            <div className={styles.username_time}>
              <UserModalWrapper userId={tweet?.author?.id}>
                <LinkToProfile userId={tweet?.author?.id} tabIndex={-1}>
                  <EllipsisWrapper>
                    <UserScreenName
                      screenName={tweet?.author?.email?.split("@")[0]}
                    />
                  </EllipsisWrapper>
                </LinkToProfile>
              </UserModalWrapper>

              <span className={styles.dot}>·</span>

              <div className={styles.date}>
                <CreateDate date={tweet?.created_at} />
              </div>
            </div>
          </div>

          <div className={styles.options}>
            <TweetOptions tweet={tweet} />
          </div>

          {tweet?.in_reply_to_status_id && (
            <div className={styles.replyingTo}>
              <ReplyingTo
                screen_name={tweet?.in_reply_to_screen_name}
                id={tweet?.author?.id}
              />
            </div>
          )}
          <div className={styles.tweet}>
            {tweet?.text && (
              <div className={styles.text}>
                <p>{decodeURIComponent(tweet?.text)}</p>
              </div>
            )}
            {tweet?.media?.length > 0 && (
              <TweetMedia media={tweet?.media} tweetId={tweet?.id} />
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
      </div>
    </div>
  );
};
