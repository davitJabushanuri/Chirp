import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { SadFaceIcon } from "@/assets/sad-face-icon";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";

import styles from "./styles/trend-options.module.scss";

export const TrendOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label="More"
        data-title="More"
        className={styles.optionsButton}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        <DotIcon />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={closeModal}
            background="none"
            closeOnBackdropClick={true}
            disableScroll={false}
          >
            <Menu ref={buttonRef} onClose={closeModal} trackScroll={true}>
              <MenuItem onClick={closeModal}>
                <SadFaceIcon /> Not interested in this
              </MenuItem>

              <MenuItem onClick={closeModal}>
                <SadFaceIcon /> This trend is harmful or spammy
              </MenuItem>
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
