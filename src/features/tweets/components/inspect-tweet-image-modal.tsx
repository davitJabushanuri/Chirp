/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { Button } from "@/components/elements/button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { Tooltip } from "@/components/elements/tooltip";
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
          <div className="absolute left-4 top-4">
            <Tooltip text="Close">
              <Button
                aria-label="Close"
                onClick={() => onClose()}
                className="bg-neutral-100/50 hover:bg-neutral-100/60 focus-visible:bg-neutral-100/60 focus-visible:outline-tertiary-100 active:bg-neutral-100/70"
              >
                <CloseIcon />
              </Button>
            </Tooltip>
          </div>

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
          <div className="absolute left-4 top-4">
            <Tooltip text="Close">
              <Button
                aria-label="Close"
                onClick={() => onClose()}
                className="bg-neutral-100/50 hover:bg-neutral-100/60 focus-visible:bg-neutral-100/60 focus-visible:outline-tertiary-100 active:bg-neutral-100/70"
              >
                <CloseIcon />
              </Button>
            </Tooltip>
          </div>
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
            <div className="absolute left-4 top-4">
              <Tooltip text="Close">
                <Button
                  aria-label="Close"
                  onClick={() => onClose()}
                  className="bg-neutral-100/50 hover:bg-neutral-100/60 focus-visible:bg-neutral-100/60 focus-visible:outline-tertiary-100 active:bg-neutral-100/70"
                >
                  <CloseIcon />
                </Button>
              </Tooltip>
            </div>

            <div className="absolute right-4 top-4">
              <Tooltip text={isDetailsOpen ? "Hide" : "Show"}>
                <Button
                  aria-label={
                    isDetailsOpen ? "Hide tweet details" : "Show tweet details"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDetailsOpen((prev) => !prev);
                  }}
                  className="bg-neutral-100/50 hover:bg-neutral-100/60 focus-visible:bg-neutral-100/60 focus-visible:outline-tertiary-100 active:bg-neutral-100/70"
                >
                  {isDetailsOpen ? <ShowArrowsIcon /> : <HideArrowsIcon />}
                </Button>
              </Tooltip>
            </div>

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
