/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { Options } from "@/components/elements/options";

import getTweet from "../api/get-tweet";
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
            <Link href={`/profile/${tweet?.author?.id}`}>
              {tweet?.author?.profile_image_url ? (
                <img src={tweet?.author?.profile_image_url} alt="" />
              ) : (
                <img src="/user_placeholder.png" alt="" />
              )}
            </Link>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.name}>
              <span className={styles.text}>{tweet?.author?.name}</span>
              <span className={styles.icon}>
                {tweet?.author?.verified && <VerifiedIcon />}
              </span>
            </div>
            <div className={styles.username}>
              @{tweet?.author?.email.split("@")[0]}
            </div>
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
          <span>{dayjs(tweet?.created_at).format(`h:mm A`)}</span>
          <span>·</span>
          <span>{dayjs(tweet?.created_at).format(`MMM D, YYYY`)}</span>
        </div>

        {tweet.retweet_count! + tweet.reply_count! + tweet?.likes?.length >
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

            {tweet?.likes.length && (
              <div className={styles.statistic}>
                <span className={styles.number}>{tweet?.likes?.length}</span>
                <span className={styles.text}>
                  {tweet?.likes?.length === 1 ? `Like` : `Likes`}
                </span>
              </div>
            )}
          </div>
        )}

        <div className={styles.tweetActions}>
          <CommentButton />
          <RetweetButton />
          <LikeButton
            smallIcons={false}
            tweetId={tweet?.id}
            likes={tweet?.likes}
          />
          <ShareButton />
        </div>
      </div>
      <div className={styles.createComment}></div>
      <div className={styles.comments}></div>
    </div>
  );
};
