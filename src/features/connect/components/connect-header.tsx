"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseButton } from "@/components/elements/close-button";

import styles from "./styles/connect-header.module.scss";

export const ConnectHeader = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <CloseButton
        onClick={() => {
          router.back();
        }}
        ariaLabel="Back"
        title="Back"
      >
        <BackArrowIcon />
      </CloseButton>
      <h1>Connect</h1>
    </div>
  );
};
