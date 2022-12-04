import Image from "next/image";
import Link from "next/link";

import Avatar from "@/assets/user_placeholder.png";
import { Options } from "@/components/elements/options";

import { CommentIcon } from "../assets/comment-icon";
import { HeartIcon } from "../assets/heart-icon";
import { RetweetIcon } from "../assets/retweet-icon";
import { ShareIcon } from "../assets/share-icon";
import { VerifiedIcon } from "../assets/verified-icon";
import { ITweet } from "../types";

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
              <Image src={tweet.image} alt="" />
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <div className={`${styles.comment} color-blue`}>
            <button>
              <span className={styles.icon}>
                <CommentIcon />
              </span>
              <span>24</span>
            </button>
          </div>

          <div className={`${styles.retweet} color-green`}>
            <button>
              <span className={`${styles.icon} ${styles.retweetIcon}`}>
                <RetweetIcon />
              </span>
              <span>7</span>
            </button>
          </div>

          <div className={`${styles.heart} color-rose`}>
            <button>
              <span className={`${styles.icon} ${styles.heartIcon}`}>
                <HeartIcon />
              </span>
              <span>92</span>
            </button>
          </div>

          <div className={`${styles.share} color-blue`}>
            <button>
              <span className={styles.icon}>
                <ShareIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Tweet;
