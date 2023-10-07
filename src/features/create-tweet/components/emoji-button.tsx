import { EmojiClickData } from "emoji-picker-react";
import { AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { EmojiIcon } from "@/assets/emoji-icon";
import { Modal } from "@/components/elements/modal";

import Action from "./action";
import { EmojiPickerModal } from "./emoji-picker-modal";
import styles from "./styles/emoji-button.module.scss";

export const EmojiButton = ({
  setText,
}: {
  setText: Dispatch<SetStateAction<string>>;
}) => {
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <>
      <button
        ref={emojiButtonRef}
        type="button"
        className={styles.container}
        aria-label="Add emoji"
        data-title="Emoji"
        aria-haspopup="menu"
        aria-expanded={isEmojiPickerOpen}
        onClick={() => setIsEmojiPickerOpen(true)}
      >
        <Action icon={<EmojiIcon />} />
      </button>

      <AnimatePresence>
        {isEmojiPickerOpen && (
          <Modal
            onClose={() => setIsEmojiPickerOpen(false)}
            background="none"
            focusAfterClose={`#tweet-text`}
          >
            <EmojiPickerModal onClick={onEmojiClick} ref={emojiButtonRef} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
