/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TweetAuthor } from "@/components/elements/tweet-author";
import { CreateTweet } from "@/features/create-tweet";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { useTweet } from "../hooks/useTweet";

import { CommentButton } from "./actions/comment-button";
import { LikeButton } from "./actions/like-button";
import { RetweetButton } from "./actions/retweet-button";
import { ShareButton } from "./actions/share-button";
import { Comments } from "./comments";
import { InspectTweetImageModal } from "./inspect-tweet-image-modal";
import styles from "./styles/tweet-details.module.scss";

export const TweetDetails = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split(`/`)[2] || ``;

  const isTweetImageModalOpen = useInspectTweetImage(
    (state) => state.isTweetImageModalOpen,
  );

  const openTweetImageModal = useInspectTweetImage(
    (state) => state.openTweetImageModal,
  );

  const { data: tweet, isLoading, isError } = useTweet(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      {isTweetImageModalOpen && <InspectTweetImageModal tweet={tweet} />}
      <div className={styles.tweetDetails}>
        <TweetAuthor author={tweet?.author} />

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
          {tweet.text && <div className={styles.text}>{tweet?.text}</div>}
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
              {tweet?.media?.slice(0, 4).map((media) => {
                return (
                  <img
                    onClick={() => openTweetImageModal()}
                    key={media?.id}
                    src={media?.media_url}
                    alt=""
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.tweetDate}>
          <span>{dayjs(tweet?.created_at).format(`h:mm A`)}</span>
          <span>·</span>
          <span>{dayjs(tweet?.created_at).format(`MMM D, YYYY`)}</span>
        </div>

        {tweet.retweet_count! + tweet.reply_count! + tweet?.likes?.length >
          0 && (
          <div className={styles.tweetStatistics}>
            {tweet.retweet_count! > 0 && (
              <div className={styles.statistic}>
                <span className={styles.number}>{tweet.retweet_count}</span>
                <span className={styles.text}>Retweets</span>
              </div>
            )}

            {tweet.quote_count! > 0 && (
              <div className={styles.statistic}>
                <span className={styles.number}>{tweet.quote_count}</span>
                <span className={styles.text}>Quote Tweets</span>
              </div>
            )}

            {tweet?.likes.length && (
              <div className={styles.statistic}>
                <span className={styles.number}>{tweet?.likes?.length}</span>
                <span className={styles.text}>
                  {tweet?.likes?.length === 1 ? `Like` : `Likes`}
                </span>
              </div>
            )}
          </div>
        )}

        <div className={styles.tweetActions}>
          <CommentButton />
          <RetweetButton />
          <LikeButton
            smallIcons={false}
            tweetId={tweet?.id}
            tweetAuthorId={tweet?.author?.id}
            likes={tweet?.likes}
          />
          <ShareButton />
        </div>
      </div>
      <div className={styles.createComment}>
        <CreateTweet
          in_reply_to_user_screen_name={tweet?.author?.email?.split("@")[0]}
          in_reply_to_status_id={tweet?.id}
          placeholder="Tweet your reply"
        />
      </div>
      <div className={styles.comments}>
        <Comments tweetId={tweet?.id} />
      </div>
    </div>
  );
};
