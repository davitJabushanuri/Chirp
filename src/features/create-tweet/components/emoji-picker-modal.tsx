import { getCookie } from "cookies-next";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { motion } from "framer-motion";
import { forwardRef } from "react";

import { useTrackPosition } from "@/components/elements/modal";

import styles from "./styles/emoji-picker-modal.module.scss";

export const EmojiPickerModal = forwardRef<
  HTMLButtonElement,
  {
    onClick: (e: EmojiClickData, event: MouseEvent) => void;
  }
>(({ onClick }, ref) => {
  const theme = getCookie("theme") === "theme-light" ? "light" : "dark";

  const boundaries = useTrackPosition({
    buttonRef: ref as React.RefObject<HTMLButtonElement>,
    trackScroll: true,
  });

  const style: React.CSSProperties = {
    position: "fixed",
    top: boundaries?.top ? boundaries?.top + boundaries?.height : "50%",
    left: boundaries?.left ? boundaries?.left + boundaries?.width : "50%",
    transform: boundaries?.top ? "translate(-50%, 0)" : "translate(-50%, -50%)",
  };

  return (
    <motion.div style={style} className={styles.container}>
      <EmojiPicker
        onEmojiClick={onClick}
        theme={theme as Theme}
        emojiStyle={EmojiStyle.TWITTER}
        searchPlaceHolder="Search emojis"
        width={`100%`}
        height={`100%`}
      />
    </motion.div>
  );
});

EmojiPickerModal.displayName = "EmojiPickerModal";
