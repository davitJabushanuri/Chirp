"use client";
import { useRouter } from "next/navigation";

import { TwitterLogo } from "@/assets/twitter-logo";
import { CloseButton } from "@/components/designs/close-button";

import styles from "./styles/auth-modal.module.scss";

export const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.actions}>
          <button onClick={() => router.back()}>
            <CloseButton />
          </button>
          <div className={styles.logo}>
            <TwitterLogo />
          </div>
          <div className={styles.placeholder}></div>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
