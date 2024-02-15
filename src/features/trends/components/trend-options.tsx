import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { SadFaceIcon } from "@/assets/sad-face-icon";
import { Button } from "@/components/elements/button";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";

export const TrendOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <Tooltip text="More">
        <Button
          ref={buttonRef}
          aria-expanded={isModalOpen}
          aria-haspopup="menu"
          aria-label="More"
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="aspect-square fill-tertiary-100 hover:bg-primary-100/10 hover:fill-primary-100 focus-visible:bg-primary-100/10 active:bg-primary-100/15 [&>svg]:size-h3"
        >
          <DotIcon />
        </Button>
      </Tooltip>

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
