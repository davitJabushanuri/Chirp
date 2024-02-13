import { EmojiClickData } from "emoji-picker-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { EmojiIcon } from "@/assets/emoji-icon";
import { Button } from "@/components/elements/button";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";

import { EmojiPickerModal } from "./emoji-picker-modal";

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
      <Tooltip text="Emoji">
        <Button
          ref={emojiButtonRef}
          type="button"
          aria-label="Add emoji"
          aria-haspopup="menu"
          aria-expanded={isEmojiPickerOpen}
          onClick={() => setIsEmojiPickerOpen(true)}
          className="fill-primary-100 hover:bg-neutral-500 focus-visible:bg-neutral-500 active:bg-neutral-600"
        >
          <EmojiIcon />
        </Button>
      </Tooltip>

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
