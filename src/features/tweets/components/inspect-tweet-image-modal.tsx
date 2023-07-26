"use client";
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CloseIcon } from "@/assets/close-icon";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { CreateTweetWrapper } from "@/features/create-tweet";
import { useDisableBodyScroll } from "@/hooks";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { ShowArrowsIcon, HideArrowsIcon } from "../assets/double-arrows-icon";
import { useTweet } from "../hooks/use-tweet";

import { Comments } from "./comments";
import { ImageCarousel } from "./image-carousel";
import styles from "./styles/inspect-tweet-image-modal.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetAuthor } from "./tweet-author";
import { TweetCreationDate } from "./tweet-creation-date";
import { TweetStatistics } from "./tweet-statistics";

export const InspectTweetImageModal = () => {
  const isTweetImageModalOpen = useInspectTweetImage(
    (state) => state.isTweetImageModalOpen,
  );

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

  useDisableBodyScroll();

  if (!isTweetImageModalOpen) return null;

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <div className={styles.error}>
          <TryAgain />
        </div>
      ) : (
        <>
          <div onClick={() => closeTweetImageModal()} className={styles.images}>
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
              <TweetActions tweet={tweet} showStats={true} />
            </div>
          </div>
          {isTweetDetailsOpen && (
            <div className={styles.tweetDetails}>
              <div className={styles.tweetAuthor}>
                <TweetAuthor tweet={tweet} />
              </div>
              {tweet?.text && (
                <div className={styles.text}>
                  {decodeURIComponent(tweet?.text)}
                </div>
              )}

              <div className={styles.tweetDate}>
                <TweetCreationDate date={tweet?.created_at} />
              </div>

              <div className={styles.tweetStatistics}>
                <TweetStatistics
                  retweet_count={tweet?.retweets?.length}
                  quote_count={tweet?.quotes?.length}
                  likes={tweet?.likes}
                  retweets={tweet?.retweets}
                />
              </div>

              <div className={styles.tweetActions}>
                <TweetActions tweet={tweet} />
              </div>

              <CreateTweetWrapper
                in_reply_to_screen_name={tweet?.author?.email?.split("@")[0]}
                in_reply_to_status_id={tweet?.id}
                isInspectModal={true}
              />

              <div className={styles.comments}>
                <Comments tweetId={tweet?.id} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
