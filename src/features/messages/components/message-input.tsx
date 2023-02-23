import { EmojiIcon } from "@/assets/emoji-icon";
import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";

import { SendIcon } from "../assets/send-icon";

import styles from "./styles/message-input.module.scss";

export const MessageInput = () => {
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <button className={styles.icon}>
          <ImageIcon />
        </button>

        <button className={styles.icon}>
          <GifIcon />
        </button>

        <button className={styles.icon}>
          <EmojiIcon />
        </button>
      </div>

      <div className={styles.input}>
        <input type="text" placeholder="Start a new message" />
      </div>

      <div className={styles.send}>
        <button className={styles.icon}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
