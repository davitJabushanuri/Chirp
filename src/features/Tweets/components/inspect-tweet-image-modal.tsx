/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import { CloseIcon } from "@/assets/close-icon";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TweetAuthor } from "@/components/elements/tweet-author";
import { CreateTweet } from "@/features/create-tweet";
import { useDisableBodyScroll } from "@/hooks";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { ShowArrowsIcon, HideArrowsIcon } from "../assets/double-arrows-icon";
import { useTweet } from "../hooks/useTweet";

import { Comments } from "./comments";
import { ImageCarousel } from "./image-carousel";
import styles from "./styles/inspect-tweet-image-modal.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetCreationDate } from "./tweet-creation-date";
import { TweetStatistics } from "./tweet-statistics";

export const InspectTweetImageModal = () => {
  useDisableBodyScroll();

  const closeTweetImageModal = useInspectTweetImage(
    (state) => state.closeTweetImageModal,
  );

  const isTweetDetailsOpen = useInspectTweetImage(
    (state) => state.isTweetDetailsOpen,
  );
  const showTweetDetails = useInspectTweetImage(
    (state) => state.showTweetDetails,
  );
  const hideTweetDetails = useInspectTweetImage(
    (state) => state.hideTweetDetails,
  );

  const tweetId = useInspectTweetImage((state) => state.tweetId);

  const { data: tweet, isLoading, isError } = useTweet(tweetId);

  return (
    <div className={styles.container}>
      <div onClick={() => closeTweetImageModal()} className={styles.images}>
        {isLoading ? null : isError ? null : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTweetImageModal();
              }}
              className={styles.close}
            >
              <CloseIcon />
            </button>

            <div className={styles.toggleTweetDetails}>
              {isTweetDetailsOpen ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hideTweetDetails();
                  }}
                >
                  <ShowArrowsIcon />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showTweetDetails();
                  }}
                >
                  <HideArrowsIcon />
                </button>
              )}
            </div>

            <div className={styles.imagesContainer}>
              <ImageCarousel images={tweet?.media} />
            </div>
            <div className={styles.tweetActions}>
              <TweetActions
                tweetId={tweet?.id}
                tweetAuthorId={tweet?.author?.id}
                likes={tweet?.likes}
                showStats={true}
              />
            </div>
          </>
        )}
      </div>
      {isTweetDetailsOpen && (
        <div className={styles.tweetDetails}>
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? null : (
            <>
              <div className={styles.tweetAuthor}>
                <TweetAuthor author={tweet?.author} />
              </div>
              <div className={styles.tweetText}>{tweet?.text}</div>

              <div className={styles.tweetDate}>
                <TweetCreationDate date={tweet?.created_at} />
              </div>

              <div className={styles.tweetStatistics}>
                <TweetStatistics
                  retweet_count={tweet?.retweet_count}
                  quote_count={tweet?.quote_count}
                  likes={tweet?.likes}
                />
              </div>

              <div className={styles.tweetActions}>
                <TweetActions
                  tweetId={tweet?.id}
                  tweetAuthorId={tweet?.author?.id}
                  likes={tweet?.likes}
                />
              </div>

              <div className={styles.createComment}>
                <CreateTweet
                  in_reply_to_user_screen_name={
                    tweet?.author?.email?.split("@")[0]
                  }
                  in_reply_to_status_id={tweet?.id}
                  placeholder="Tweet your reply"
                />
              </div>

              <div className={styles.comments}>
                <Comments tweetId={tweet?.id} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
