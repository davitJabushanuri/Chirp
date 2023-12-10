"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { CommentIconFill } from "@/assets/comment-icon";
import { FollowIcon } from "@/assets/follow-icon";
import { HeartIconActive } from "@/assets/heart-icon";
import { MessageIcon } from "@/assets/message-icon";
import { RetweetIcon } from "@/assets/retweet-icon";
import { CloseButton } from "@/components/elements/close-button";

import { useJoinTwitter } from "../stores/useJoinTwitter";

import styles from "./styles/join-twitter-modal.module.scss";

export const JoinTwitterModal = () => {
  const router = useRouter();
  const data = useJoinTwitter((state) => state.data);
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const innerWidth = window.innerWidth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.2,
      }}
      className={styles.container}
    >
      <div className={styles.close}>
        <CloseButton
          onClick={() => {
            setJoinTwitterData({
              isModalOpen: false,
              action: "",
              user: "",
            });
          }}
          ariaLabel={innerWidth < 700 ? "Back" : "Close"}
          title={innerWidth < 700 ? "Back" : "Close"}
        >
          {innerWidth < 700 ? <BackArrowIcon /> : <CloseIcon />}
        </CloseButton>
      </div>

      <div className={styles.icon}>
        {data.action === `comment` ? (
          <span className={styles.comment}>
            <CommentIconFill />
          </span>
        ) : data.action === `retweet` ? (
          <span className={styles.retweet}>
            <RetweetIcon />
          </span>
        ) : data.action === `like` ? (
          <span className={styles.like}>
            <HeartIconActive />
          </span>
        ) : data.action === `follow` ? (
          <span className={styles.follow}>
            <FollowIcon />
          </span>
        ) : data.action === `message` ? (
          <span className={styles.comment}>
            <MessageIcon />
          </span>
        ) : null}
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          {data.action === `comment`
            ? `Reply to join the conversation.`
            : data.action === `retweet`
              ? `Retweet to spread the word.`
              : data.action === `like`
                ? `Like a Tweet to share the love.`
                : data.action === `follow`
                  ? `Follow ${data.user} to see what they share on Twitter.`
                  : data.action === `message`
                    ? `Join Twitter now so you can share The New European - Think Without Borders’s Tweet privately.`
                    : `Don’t miss what’s happening`}
        </h1>
        <p className={styles.subtitle}>
          {data.action === `comment`
            ? `Once you join Twitter, you can respond to ${data.user}’s Tweet.`
            : data.action === `retweet`
              ? `When you join Twitter, you can share ${data.user}’s Tweet with your followers.`
              : data.action === `like`
                ? `Join Twitter now to let ${data.user} know you like their Tweet.`
                : data.action === `follow`
                  ? `Sign up so you never miss their Tweets.`
                  : `People on Twitter are the first to know.`}
        </p>

        <div className={styles.buttons}>
          <button
            role="link"
            onClick={() => {
              setJoinTwitterData({
                isModalOpen: false,
                action: "",
                user: "",
              });
              router.push(`/auth/signin`);
            }}
            className={styles.signin}
          >
            Log in
          </button>
          <button
            role="link"
            onClick={() => {
              setJoinTwitterData({
                isModalOpen: false,
                action: "",
                user: "",
              });
              router.push(`/auth/signin`);
            }}
            className={styles.signup}
          >
            Sign up
          </button>
        </div>
      </div>
    </motion.div>
  );
};
