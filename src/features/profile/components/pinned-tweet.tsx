import { PinIcon } from "@/assets/pin-icon";
import { Tweet } from "@/features/tweets";

import { usePinnedTweet } from "../hooks/use-pinned-tweet";

import styles from "./styles/pinned-tweet.module.scss";

export const PinnedTweet = ({ userId }: { userId: string | undefined }) => {
  const { data: pinnedTweet } = usePinnedTweet(userId);

  if (!pinnedTweet) return null;

  return (
    <div className={styles.container}>
      <div className={styles.pin}>
        <span className={styles.icon}>
          <PinIcon />
        </span>
        <span className={styles.text}>Pinned Tweet</span>
      </div>
      <Tweet tweet={pinnedTweet} />
    </div>
  );
};
