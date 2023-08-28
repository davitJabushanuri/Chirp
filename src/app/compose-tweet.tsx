"use client";

import { Modal } from "@/components/elements/modal";
import { CreateTweetModal } from "@/features/create-tweet";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

export const ComposeTweet = () => {
  const isModalOpen = useCreateTweetModal((state) => state.isModalOpen);
  const closeModal = useCreateTweetModal((state) => state.closeModal);

  return (
    <>
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
    </>
  );
};
