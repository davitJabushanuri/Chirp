"use client";
import { AnimatePresence } from "framer-motion";

import { Modal } from "@/components/elements/modal";
import { JoinTwitterModal, useJoinTwitter } from "@/features/auth";

export const JoinTwitter = () => {
  const isJoinTwitterModalOpen = useJoinTwitter(
    (state) => state.data.isModalOpen,
  );
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  return (
    <div>
      <AnimatePresence>
        {isJoinTwitterModalOpen && (
          <Modal
            onClose={() => {
              setJoinTwitterData({
                isModalOpen: false,
                action: "",
                user: "",
              });
            }}
            disableScroll={true}
          >
            <JoinTwitterModal />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
