/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Avatar from "@/assets/user_placeholder.png";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { Options } from "@/components/elements/options";

import getTweet from "../api/getTweet";
import { VerifiedIcon } from "../assets/verified-icon";
import { ITweet } from "../types";

import { CommentButton } from "./actions/comment-button";
import { LikeButton } from "./actions/like-button";
import { RetweetButton } from "./actions/retweet-button";
import { ShareButton } from "./actions/share-button";
import styles from "./styles/tweet-details.module.scss";

export const TweetDetails = () => {
  const pathname = usePathname();
  const id = pathname?.split(`/`)[2] || ``;

  const {
    data: tweet,
    isLoading,
    isError,
  } = useQuery<ITweet>(["tweets", id], () => getTweet({ id }));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tweetDetails}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            <Image src={Avatar} alt="" />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.name}>
              <span className={styles.text}>John Doe</span>
              <span className={styles.icon}>
                <VerifiedIcon />
              </span>
            </div>
            <div className={styles.username}>@johndoe</div>
          </div>
          <div className={styles.option}>
            <Options />
          </div>
        </div>
        <div className={styles.tweet}>
          {tweet.text && <div className={styles.text}>{tweet?.text}</div>}
          {tweet.image && (
            <div className={styles.image}>
              <img src={tweet.image} alt="" />
            </div>
          )}
        </div>
        <div className={styles.tweetDate}>
          <span>{dayjs(tweet?.createdAt).format(`h:mm A`)}</span>
          <span>·</span>
          <span>{dayjs(tweet?.createdAt).format(`MMM D, YYYY`)}</span>
        </div>

        {tweet.retweet_count! + tweet.reply_count! + tweet.favorite_count! >
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

            {tweet?.favorite_count > 0 && (
              <div className={styles.statistic}>
                <span className={styles.number}>{tweet.favorite_count}</span>
                <span className={styles.text}>Likes</span>
              </div>
            )}
          </div>
        )}

        <div className={styles.tweetActions}>
          <CommentButton />
          <RetweetButton />
          <LikeButton />
          <ShareButton />
        </div>
      </div>
      <div className={styles.createComment}></div>
      <div className={styles.comments}></div>
    </div>
  );
};