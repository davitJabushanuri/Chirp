"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { Menu } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { ITweet } from "@/features/tweets";

import { DeleteTweetModal } from "../delete-tweet-modal";

import styles from "./styles/tweet-options.module.scss";
import { TweetOwnerMenu } from "./tweet-owner-menu";
import { TweetVisitorMenu } from "./tweet-visitor-menu";

export const TweetOptions = ({ tweet }: { tweet: ITweet }) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label="More"
        data-title="More"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(true);
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        className={styles.optionsButton}
      >
        <DotIcon />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <Modal
            background="none"
            onClose={() => {
              setIsMenuOpen(false);
            }}
          >
            <Menu
              ref={buttonRef}
              onClose={() => setIsMenuOpen(false)}
              trackScroll={true}
            >
              {tweet?.author?.id === session?.user?.id ? (
                <TweetOwnerMenu
                  tweet={tweet}
                  setIsMenuOpen={setIsMenuOpen}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
              ) : (
                <TweetVisitorMenu setIsMenuOpen={setIsMenuOpen} tweet={tweet} />
              )}
            </Menu>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <Modal
            background="var(--clr-modal-background)"
            onClose={() => {
              setIsDeleteModalOpen(false);
              setIsMenuOpen(true);
            }}
          >
            <DeleteTweetModal
              tweet={tweet}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
