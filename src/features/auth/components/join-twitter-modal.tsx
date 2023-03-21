"use client";
import { useRouter } from "next/navigation";

import { CommentIconFill } from "@/assets/comment-icon";
import { FollowIcon } from "@/assets/follow-icon";
import { HeartIconActive } from "@/assets/heart-icon";
import { MessageIcon } from "@/assets/message-icon";
import { RetweetIcon } from "@/assets/retweet-icon";
import { TwitterLogo } from "@/assets/twitter-logo";
import { CloseButton } from "@/components/designs/close-button";

import { useJoinTwitter } from "../stores/useJoinTwitter";

import styles from "./styles/join-twitter-modal.module.scss";

export const JoinTwitterModal = () => {
  const router = useRouter();
  const data = useJoinTwitter((state) => state.data);
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  return (
    <div className={styles.container}>
      <button
        onClick={() =>
          setJoinTwitterData({
            isModalOpen: false,
            action: "",
            user: "",
          })
        }
        className={styles.overlay}
      />
      <div className={styles.modal}>
        <div className={styles.close}>
          <button
            onClick={() =>
              setJoinTwitterData({
                isModalOpen: false,
                action: "",
                user: "",
              })
            }
          >
            <CloseButton />
          </button>
        </div>

        <div className={styles.wrapper}>
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
            ) : (
              <span className={styles.comment}>
                <TwitterLogo />
              </span>
            )}
          </div>

          <div className={styles.contentWrapper}>
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
                  onClick={() => {
                    setJoinTwitterData({
                      isModalOpen: false,
                      action: "",
                      user: "",
                    });
                    router.push(`/auth/signup`);
                  }}
                  className={styles.signup}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
