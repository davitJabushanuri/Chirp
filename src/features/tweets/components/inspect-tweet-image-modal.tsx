/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { CreateTweetWrapper } from "@/features/create-tweet";

import { ShowArrowsIcon, HideArrowsIcon } from "../assets/double-arrows-icon";
import { useTweet } from "../hooks/use-tweet";

import { Comments } from "./comments";
import { ImageCarousel } from "./image-carousel";
import styles from "./styles/inspect-tweet-image-modal.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetAuthor } from "./tweet-author";
import { TweetCreationDate } from "./tweet-creation-date";
import { TweetStatistics } from "./tweet-statistics";

export const InspectTweetImageModal = ({
  tweetId,
  imageIndex,
  onClose,
}: {
  tweetId: string;
  imageIndex: number;
  onClose: () => void;
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const {
    data: tweet,
    isPending,
    isError,
  } = useTweet({
    id: tweetId,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
      className={styles.container}
    >
      {isPending ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={styles.loading}
        >
          <button
            aria-label="Close"
            data-title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={styles.close}
          >
            <CloseIcon />
          </button>
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={styles.error}
        >
          <button
            aria-label="Close"
            data-title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={styles.close}
          >
            <CloseIcon />
          </button>
          <TryAgain />
        </div>
      ) : (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={styles.images}
          >
            <button
              aria-label="Close"
              data-title="Close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className={styles.close}
            >
              <CloseIcon />
            </button>

            <button
              className={styles.toggleDetails}
              onClick={(e) => {
                e.stopPropagation();
                setIsDetailsOpen((prev) => !prev);
              }}
              aria-label={
                isDetailsOpen ? "Hide tweet details" : "Show tweet details"
              }
              data-title={isDetailsOpen ? "Hide" : "Show"}
            >
              {isDetailsOpen ? <ShowArrowsIcon /> : <HideArrowsIcon />}
            </button>

            <div className={styles.imagesContainer}>
              <ImageCarousel images={tweet?.media} imageIndex={imageIndex} />
            </div>
            <div className={styles.tweetActions}>
              <TweetActions tweet={tweet} showStats={true} />
            </div>
          </div>

          <AnimatePresence>
            {isDetailsOpen && (
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.2 }}
                className={styles.tweetDetails}
              >
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
                    retweet_count={tweet?._count?.retweets}
                    quote_count={tweet?._count?.quotes}
                    likes_count={tweet?._count?.likes}
                    bookmarks_count={tweet?._count?.bookmarks}
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
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};
