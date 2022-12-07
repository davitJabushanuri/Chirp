/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

import Avatar from "@/assets/user_placeholder.png";
import { Options } from "@/components/elements/options";

import { VerifiedIcon } from "../assets/verified-icon";
import { ITweet } from "../types";

import { CommentButton } from "./actions/comment-button";
import { LikeButton } from "./actions/like-button";
import { RetweetButton } from "./actions/retweet-button";
import { ShareButton } from "./actions/share-button";
import styles from "./styles/tweet.module.scss";

const Tweet = ({ tweet }: { tweet: ITweet }) => {
  return (
    <Link href={`/status/${tweet.id}`} className={styles.container}>
      <div className={styles.avatar}>
        <Image src={Avatar} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.user}>
            <span className={styles.name}>John Doe</span>

            <span className={styles.verified}>
              <VerifiedIcon />
            </span>

            <span className={styles.username}>@johndoe</span>
            <span className={styles.dot}>·</span>
            <span className={styles.date}>1h</span>
          </div>

          <button className={styles.options}>
            <Options />
          </button>
        </div>

        <div className={styles.tweet}>
          {tweet.text && (
            <div className={styles.text}>
              <p>{tweet.text}</p>
            </div>
          )}
          {tweet.image && (
            <div className={styles.image}>
              <img src={tweet.image || ""} alt="" />
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <CommentButton stats={tweet?.reply_count} />
          <RetweetButton stats={tweet?.retweet_count} />
          <LikeButton stats={tweet?.favorite_count} />
          <ShareButton />
        </div>
      </div>
    </Link>
  );
};

export default Tweet;
