"use client";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/elements/modal";

import styles from "./styles/tweet-statistics.module.scss";
import { TweetStatisticsModal } from "./tweet-statistics-modal";

export const TweetStatistics = ({
  retweet_count = 0,
  quote_count = 0,
  likes_count = 0,
  bookmarks_count = 0,
}: {
  retweet_count: number | undefined;
  quote_count: number | undefined;
  likes_count: number | undefined;
  bookmarks_count: number | undefined;
}) => {
  const pathname = usePathname();
  const tweetId = pathname.split(`/`)[2];

  const [statisticsModal, setStatisticsModal] = useState<{
    isOpen: boolean;
    title: "likes" | "retweets" | null;
  }>({
    isOpen: false,
    title: null,
  });

  const isVisible =
    retweet_count > 0 ||
    quote_count > 0 ||
    likes_count > 0 ||
    bookmarks_count > 0;

  if (!isVisible) return null;

  return (
    <>
      <div
        role="group"
        className={`${styles.container} ${
          isVisible ? styles.show : styles.hide
        }`}
      >
        {retweet_count > 0 && (
          <button
            onClick={() => {
              setStatisticsModal({ isOpen: true, title: `retweets` });
            }}
            className={styles.statistic}
          >
            <strong>{retweet_count}</strong>{" "}
            <span>{retweet_count === 1 ? `Retweet` : `Retweets`}</span>
          </button>
        )}

        {quote_count > 0 && (
          <Link href={`/status/${tweetId}/quotes`} className={styles.statistic}>
            <strong>{quote_count}</strong>{" "}
            <span>{quote_count === 1 ? `Quote Tweet` : `Quote Tweets`}</span>
          </Link>
        )}

        {likes_count > 0 && (
          <button
            onClick={() => {
              setStatisticsModal({ isOpen: true, title: `likes` });
            }}
            className={styles.statistic}
          >
            <strong>{likes_count}</strong>{" "}
            <span>{likes_count === 1 ? `Like` : `Likes`}</span>
          </button>
        )}

        {bookmarks_count > 0 && (
          <div className={styles.statistic}>
            <strong>{bookmarks_count}</strong>{" "}
            <span>{bookmarks_count === 1 ? `Bookmark` : `Bookmarks`}</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {statisticsModal.isOpen && (
          <Modal
            onClose={() => {
              setStatisticsModal({ isOpen: false, title: null });
            }}
            disableScroll={true}
            background="var(--clr-modal-background)"
          >
            <TweetStatisticsModal
              onClose={() => {
                setStatisticsModal({ isOpen: false, title: null });
              }}
              title={statisticsModal.title}
              tweetId={tweetId}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
