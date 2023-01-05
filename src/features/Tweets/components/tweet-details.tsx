/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */
import { usePathname, useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TweetAuthor } from "@/components/elements/tweet-author";
import { CreateTweet } from "@/features/create-tweet";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { useTweet } from "../hooks/useTweet";

import { Comments } from "./comments";
import { InspectTweetImageModal } from "./inspect-tweet-image-modal";
import styles from "./styles/tweet-details.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetCreationDate } from "./tweet-creation-date";
import { TweetStatistics } from "./tweet-statistics";

export const TweetDetails = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split(`/`)[2] || ``;

  const setImageIndex = useInspectTweetImage((state) => state.setImageIndex);

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
              {tweet?.media?.slice(0, 4).map((media, index) => {
                return (
                  <img
                    onClick={() => {
                      setImageIndex(index);
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

        <TweetCreationDate date={tweet?.created_at} />

        <TweetStatistics
          retweet_count={tweet?.retweet_count}
          quote_count={tweet?.quote_count}
          likes={tweet?.likes}
        />

        <div className={styles.tweetActions}>
          <TweetActions
            tweetId={tweet?.id}
            tweetAuthorId={tweet?.author?.id}
            likes={tweet?.likes}
          />
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
