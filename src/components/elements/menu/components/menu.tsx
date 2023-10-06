import { motion } from "framer-motion";
import { forwardRef } from "react";

import { useTrackPosition } from "../../modal";

import styles from "./styles/menu.module.scss";

export const Menu = forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    onClose: () => void;
    trackScroll?: boolean;
  }
>(({ children, onClose, trackScroll = false }, ref) => {
  const innerWidth = window.innerWidth;

  const buttonBoundaries = useTrackPosition({
    buttonRef: ref as React.RefObject<HTMLButtonElement>,
    trackScroll,
  });

  const style: React.CSSProperties = {
    position: "fixed",
    top: buttonBoundaries?.top,
    left: buttonBoundaries?.left,
    transform: `translateX(calc(-${100}% + ${buttonBoundaries?.width}px))`,
  };

  const modalStyle: React.CSSProperties = {
    ...(innerWidth < 500
      ? {
          position: "fixed",
          bottom: 0,
        }
      : style),
  };

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.2 }}
      style={modalStyle}
      className={styles.container}
      role="menu"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
      {innerWidth < 500 && (
        <button onClick={onClose} className={styles.cancel}>
          Cancel
        </button>
      )}
    </motion.div>
  );
});

Menu.displayName = "Menu";
