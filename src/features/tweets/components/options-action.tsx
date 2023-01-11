import { BlockIcon } from "../assets/block-icon";
import { EmbedIcon } from "../assets/embed-icon";
import { UnfollowIcon } from "../assets/follow-icon";
import { MuteIcon } from "../assets/mute-icon";
import { ReportIcon } from "../assets/report-icon";
import { SadFaceIcon } from "../assets/sad-face-icon";
import { ITweet } from "../types";

import styles from "./styles/options-actions.module.scss";

export const OptionsAction = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <SadFaceIcon />
        </span>
        <span className={styles.text}>Not interested in this Tweet</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <UnfollowIcon />
        </span>
        <span className={styles.text}>Unfollow @ThePrimeagen</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <MuteIcon />
        </span>
        <span className={styles.text}>Mute @ThePrimeagen</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <BlockIcon />
        </span>
        <span className={styles.text}>Block @ThePrimeagen</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <EmbedIcon />
        </span>
        <span className={styles.text}>Embed Tweet</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <ReportIcon />
        </span>
        <span className={styles.text}>Report tweet</span>
      </button>
    </div>
  );
};
