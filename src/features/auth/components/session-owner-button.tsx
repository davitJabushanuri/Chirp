"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Modal } from "@/components/elements/modal";
import { Avatar, UserName, UserScreenName } from "@/features/profile";

import { SessionOwnerModal } from "./session-owner-modal";
import styles from "./styles/session-owner-button.module.scss";

export const SessionOwnerButton = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [buttonBoundaries, setButtonBoundaries] = useState<DOMRect | null>(
    buttonRef.current?.getBoundingClientRect() ?? null,
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (buttonRef.current) {
        setButtonBoundaries(buttonRef.current.getBoundingClientRect());
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [buttonRef]);

  useEffect(() => {
    setButtonBoundaries(buttonRef.current?.getBoundingClientRect() ?? null);
  }, []);

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

  return (
    <>
      <button
        aria-label="Account menu"
        tabIndex={0}
        onClick={openModal}
        className={styles.container}
        data-title="Accounts"
        ref={buttonRef}
      >
        <div className={styles.avatar}>
          <Avatar userImage={session?.user?.profile_image_url} />
        </div>
        <div className={styles.userInfo}>
          <EllipsisWrapper>
            <UserName
              name={session?.user?.name}
              isVerified={session?.user?.verified}
            />
          </EllipsisWrapper>

          <EllipsisWrapper>
            <UserScreenName screenName={session?.user?.email?.split("@")[0]} />
          </EllipsisWrapper>
        </div>
        <div className={styles.options}>
          <DotIcon />
        </div>
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            background="none"
            minViewportWidth={500}
          >
            <SessionOwnerModal style={style} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
