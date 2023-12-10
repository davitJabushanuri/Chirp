"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

import { Modal } from "@/components/elements/modal";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { PenIcon } from "../assets/pen-icon";

import { CreateTweetModal } from "./create-tweet-modal";
import styles from "./styles/tweet-button.module.scss";

export const TweetButton = () => {
  const { data: session } = useSession();

  const isModalOpen = useCreateTweetModal((state) => state.isModalOpen);
  const openModal = useCreateTweetModal((state) => state.openModal);
  const closeModal = useCreateTweetModal((state) => state.closeModal);

  if (!session) return null;

  return (
    <>
      <button
        aria-label="Tweet"
        data-title="Tweet"
        onClick={() => {
          openModal();
        }}
        className={styles.container}
      >
        <span className={styles.icon}>
          <PenIcon />
        </span>
        <span className={styles.text}>Tweet</span>
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={closeModal}
            disableScroll={true}
            background="var(--clr-modal-background)"
            focusOnElement={`textarea`}
          >
            <CreateTweetModal />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
