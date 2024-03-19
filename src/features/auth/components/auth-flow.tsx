"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

import { LoadingScreen } from "@/components/elements/loading-screen";
import { Modal } from "@/components/elements/modal";

import { useAuthFlow } from "../hooks/use-auth-flow";

import { SignInModal } from "./sign-in-modal";
import { SignOutModal } from "./signout-modal";
import styles from "./styles/auth-modal-trigger.module.scss";

export const AuthFlow = () => {
  const { data: session, status } = useSession();

  const {
    isLogInModalOpen,
    isLogOutModalOpen,
    openLogInModal,
    closeLogInModal,
    openLogOutModal,
    closeLogOutModal,
  } = useAuthFlow();

  if (status === "loading") return <LoadingScreen />;

  return (
    <>
      <AnimatePresence>
        {isLogInModalOpen && (
          <Modal onClose={closeLogInModal}>
            <SignInModal onClose={closeLogInModal} />
          </Modal>
        )}

        {isLogOutModalOpen && (
          <Modal onClose={closeLogOutModal}>
            <SignOutModal onClose={closeLogOutModal} />
          </Modal>
        )}
      </AnimatePresence>

      {!session && (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>Don’t miss what’s happening</h1>
              <p>People on Twitter are the first to know.</p>
            </div>
            <div className={styles.buttons}>
              <button onClick={openLogInModal} className={styles.signIn}>
                Log in
              </button>
              <button onClick={openLogOutModal} className={styles.signUp}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
