import { ITweet, Tweet } from "@/features/tweets";

import { PinIcon } from "../assets/pin-icon";

import styles from "./styles/pinned-tweet.module.scss";

export const PinnedTweet = ({ pinned_tweet }: { pinned_tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pin}>
        <span className={styles.icon}>
          <PinIcon />
        </span>
        <span className={styles.text}>Pinned Tweet</span>
      </div>
      <Tweet tweet={pinned_tweet} />
    </div>
  );
};
