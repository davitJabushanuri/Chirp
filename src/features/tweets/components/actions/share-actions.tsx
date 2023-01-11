import { MessageIcon } from "@/assets/message-icon";

import { AddToBookmarksIcon } from "../../assets/bookmark-icon";
import { CopyLinkIcon } from "../../assets/copy-link-icon";
import { ShareIcon } from "../../assets/share-icon";
import { ITweet } from "../../types";

import styles from "./styles/share-actions.module.scss";

export const ShareActions = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <CopyLinkIcon />
        </span>
        <span className={styles.text}>Copy link to Tweet</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <ShareIcon />
        </span>
        <span className={styles.text}>Share Tweet via ...</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <MessageIcon />
        </span>
        <span className={styles.text}>Send via Direct Message</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <AddToBookmarksIcon />
        </span>
        <span className={styles.text}>Bookmark</span>
      </button>
    </div>
  );
};
