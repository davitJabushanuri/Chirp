"use client";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import { StarIcon } from "@/assets/star-icon";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";

import { Button } from "../button";
import { Tooltip } from "../tooltip";

export const SortTweets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <Tooltip text="Sort Tweets">
        <Button
          ref={buttonRef}
          aria-expanded={isModalOpen}
          aria-haspopup="menu"
          aria-label="Sort Tweets"
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
        >
          <StarIcon />
        </Button>
      </Tooltip>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} background="none">
            <Menu onClose={() => setIsModalOpen(false)} ref={buttonRef}>
              <MenuItem onClick={() => setIsModalOpen(false)}>For you</MenuItem>
              <MenuItem onClick={() => setIsModalOpen(false)}>
                Following
              </MenuItem>
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
