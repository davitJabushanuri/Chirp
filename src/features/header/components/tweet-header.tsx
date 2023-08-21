import { BackButton } from "@/components/elements/back-button";

import styles from "./styles/tweet-header.module.scss";

export const TweetHeader = ({ heading = "Tweet" }: { heading?: string }) => {
  return (
    <div className={styles.container}>
      <BackButton />
      <h2 className={styles.title}>{heading}</h2>
    </div>
  );
};
