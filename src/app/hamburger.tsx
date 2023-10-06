"use client";
import { AnimatePresence } from "framer-motion";

import { Modal } from "@/components/elements/modal";
import { HamburgerMenu } from "@/features/navbar";
import { useHamburger } from "@/stores/use-hamburger";

export const Hamburger = () => {
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);
  const closeHamburger = useHamburger((state) => state.closeHamburger);

  return (
    <AnimatePresence>
      {isHamburgerOpen && (
        <Modal onClose={() => closeHamburger()} closeOnBackdropClick={true}>
          <HamburgerMenu />
        </Modal>
      )}
    </AnimatePresence>
  );
};
