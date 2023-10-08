import { EmojiClickData } from "emoji-picker-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { EmojiIcon } from "@/assets/emoji-icon";
import { Modal } from "@/components/elements/modal";

import Action from "./action";
import { EmojiPickerModal } from "./emoji-picker-modal";
import styles from "./styles/emoji-button.module.scss";

export const EmojiButton = ({
  setText,
  inputId,
}: {
  setText: Dispatch<SetStateAction<string>>;
  inputId: string;
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

      {isEmojiPickerOpen && (
        <Modal
          onClose={() => setIsEmojiPickerOpen(false)}
          background="none"
          focusAfterClose={`#${inputId}`}
        >
          <EmojiPickerModal onClick={onEmojiClick} ref={emojiButtonRef} />
        </Modal>
      )}
    </>
  );
};
