"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { forwardRef } from "react";

import { Button } from "@/components/elements/button";
import { useTrackPosition } from "@/components/elements/modal";

import { useAuthFlow } from "../hooks/use-auth-flow";

import styles from "./styles/session-owner-modal.module.scss";

export const SessionOwnerModal = forwardRef<HTMLButtonElement>((ref) => {
  const { data: session } = useSession();

  const { openLogInModal, openLogOutModal } = useAuthFlow();

  const buttonBoundaries = useTrackPosition({
    buttonRef: ref as React.RefObject<HTMLButtonElement>,
    trackScroll: false,
  });

  const style: React.CSSProperties = {
    position: "fixed",
    top: buttonBoundaries?.top
      ? buttonBoundaries?.top - buttonBoundaries?.height - 50
      : "50%",
    left: buttonBoundaries?.left ? buttonBoundaries?.left : "50%",
    transform: buttonBoundaries?.top
      ? "translate(0, 0)"
      : "translate(-50%, -50%)",
  };

  if (!session) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{
        ease: "easeInOut",
        duration: 0.2,
      }}
      className={styles.container}
      style={style}
      role="group"
    >
      <Button
        className="w-full justify-start rounded-none py-[0.8em] -outline-offset-2 hover:bg-neutral-400 focus-visible:bg-neutral-400 active:bg-neutral-500"
        onClick={() => {
          openLogInModal();
        }}
        role="menuitem"
      >
        Add an existing account
      </Button>

      <Button
        className="w-full justify-start rounded-none py-[0.8em] -outline-offset-2 hover:bg-neutral-400 focus-visible:bg-neutral-400 active:bg-neutral-500"
        onClick={() => {
          openLogOutModal();
        }}
        role="menuitem"
      >
        Log out @{session?.user?.email.split("@")[0]}
      </Button>
    </motion.div>
  );
});

SessionOwnerModal.displayName = "SessionOwnerModal";
