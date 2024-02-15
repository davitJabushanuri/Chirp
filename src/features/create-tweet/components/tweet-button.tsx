"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

import { Button } from "@/components/elements/button";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { PenIcon } from "../assets/pen-icon";

import { CreateTweetModal } from "./create-tweet-modal";

export const TweetButton = () => {
  const { data: session } = useSession();

  const isModalOpen = useCreateTweetModal((state) => state.isModalOpen);
  const openModal = useCreateTweetModal((state) => state.openModal);
  const closeModal = useCreateTweetModal((state) => state.closeModal);

  if (!session) return null;

  return (
    <>
      <Tooltip
        maxWidth={1300}
        text="Tweet"
        className="mt-4 max-w-[234px] xxl:w-full"
      >
        <Button
          aria-label="Tweet"
          onClick={() => {
            openModal();
          }}
          className="w-full bg-primary-100 p-[0.9em] hover:bg-primary-200 focus-visible:outline-secondary-100 active:bg-primary-300"
        >
          <span className="fill-white-100 xxl:hidden [&>svg]:size-h1">
            <PenIcon />
          </span>
          <span className="hidden text-base font-bold text-white-100 xxl:inline">
            Tweet
          </span>
        </Button>
      </Tooltip>

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
