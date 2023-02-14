/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";

import {
  UserAvatar,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { ITweet } from "../types";

import { QuotedTweet } from "./quoted-tweet";
import styles from "./styles/tweet.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetOptions } from "./tweet-options";

dayjs.extend(relativeTime);

export const Tweet = ({ tweet }: { tweet: ITweet }) => {
  const router = useRouter();

  const setImageIndex = useInspectTweetImage((state) => state.setImageIndex);
  const openTweetImageModal = useInspectTweetImage(
    (state) => state.openTweetImageModal,
  );
  const setTweetId = useInspectTweetImage((state) => state.setTweetId);

  return (
    <div
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
          <div className={styles.user}>
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
          </div>

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
          {tweet?.media && tweet?.media.length > 0 && (
            <div
              className={`${styles.images} ${
                tweet?.media?.length === 1
                  ? styles.one
                  : tweet?.media?.length === 2
                  ? styles.two
                  : tweet?.media?.length === 3
                  ? styles.three
                  : tweet?.media?.length === 4
                  ? styles.four
                  : ""
              }`}
            >
              {tweet?.media?.slice(0, 4).map((media, index) => {
                return (
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageIndex(index);
                      setTweetId(tweet?.id);
                      openTweetImageModal();
                    }}
                    key={media?.id}
                    src={media?.media_url}
                    alt=""
                  />
                );
              })}
            </div>
          )}

          {tweet?.quoted_tweet && <QuotedTweet tweet={tweet?.quoted_tweet} />}
        </div>

        <div className={styles.actions}>
          <TweetActions
            tweet={tweet}
            tweetId={tweet?.id}
            tweetAuthorId={tweet?.author?.id}
            likes={tweet?.likes}
            showStats={true}
          />
        </div>
      </div>
    </div>
  );
};
