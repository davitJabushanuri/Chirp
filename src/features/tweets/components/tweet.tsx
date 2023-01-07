/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Options } from "@/components/elements/options";
import { User } from "@/components/elements/user";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { VerifiedIcon } from "../../../assets/verified-icon";
import { ITweet } from "../types";

import { CommentButton } from "./actions/comment-button";
import { LikeButton } from "./actions/like-button";
import { RetweetButton } from "./actions/retweet-button";
import { ShareButton } from "./actions/share-button";
import styles from "./styles/tweet.module.scss";

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
      <div onClick={(e) => e.stopPropagation()} className={styles.avatar}>
        <User
          userId={tweet?.author?.id}
          userImage={tweet?.author?.profile_image_url}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.user}>
            <span onClick={(e) => e.stopPropagation()} className={styles.name}>
              <Link href={`/${tweet?.author?.id}`}>{tweet?.author?.name}</Link>
            </span>

            <span className={styles.verified}>
              {tweet?.author?.verified && <VerifiedIcon />}
            </span>

            <span
              onClick={(e) => e.stopPropagation()}
              className={styles.username}
            >
              <Link href={`/${tweet?.author?.id}`}>
                @{tweet?.author?.email?.split("@")[0]}
              </Link>
            </span>
            <span className={styles.dot}>·</span>
            <span className={styles.date}>
              {dayjs(tweet?.created_at).format("MMM D")}
            </span>
          </div>

          <button className={styles.options}>
            <Options />
          </button>
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
          {tweet.text && (
            <div className={styles.text}>
              <p>{tweet.text}</p>
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
        </div>

        <div className={styles.actions}>
          <CommentButton stats={tweet?.reply_count} />
          <RetweetButton stats={tweet?.retweet_count} />
          <LikeButton
            tweetId={tweet?.id}
            tweetAuthorId={tweet?.author?.id}
            likes={tweet?.likes}
          />
          <ShareButton />
        </div>
      </div>
    </div>
  );
};
