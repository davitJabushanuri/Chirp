"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { RetweetIcon } from "@/assets/retweet-icon";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { useJoinTwitter } from "@/features/auth";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { QuoteTweetIcon } from "../../assets/quote-tweet-icon";
import { useRetweet } from "../../hooks/use-retweet";
import { ITweet } from "../../types";

import styles from "./styles/actions.module.scss";

export const RetweetButton = ({
  tweet,
  showStats,
}: {
  tweet: ITweet;
  showStats: boolean;
}) => {
  const { data: session } = useSession();
  const hasRetweeted = tweet?.retweets?.some(
    (retweet) => retweet?.user_id === session?.user?.id,
  );

  const setData = useCreateTweetModal((state) => state.setData);
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const retweetMutation = useRetweet(setIsModalOpen);

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label={hasRetweeted ? "Undo retweet" : "Retweet"}
        data-title={hasRetweeted ? "Undo retweet" : "Retweet"}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!session) {
            setJoinTwitterData({
              isModalOpen: true,
              action: "retweet",
              user: tweet?.author?.name,
            });
          } else setIsModalOpen(true);
        }}
        className={`${styles.retweet} ${hasRetweeted ? styles.retweeted : ""}`}
      >
        <span className={styles.icon}>
          <RetweetIcon />
        </span>
        {showStats && tweet && tweet?.retweets?.length > 0 && (
          <span className={styles.stats}>{tweet?.retweets?.length}</span>
        )}
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            background="none"
            onClose={() => {
              setIsModalOpen(false);
            }}
          >
            <Menu
              onClose={() => setIsModalOpen(false)}
              ref={buttonRef}
              trackScroll={true}
            >
              <MenuItem
                onClick={() => {
                  retweetMutation.mutate({
                    tweetId: tweet?.id,
                    userId: session?.user?.id,
                  });
                }}
              >
                <RetweetIcon /> {hasRetweeted ? `Undo retweet` : `Retweet`}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setData({
                    in_reply_to_screen_name: null,
                    in_reply_to_status_id: null,
                    parent_tweet: null,
                    quoted_tweet: tweet,
                    placeholder: "Add a comment!",
                  });
                  setIsModalOpen(false);
                }}
              >
                <QuoteTweetIcon /> Quote Tweet
              </MenuItem>
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
