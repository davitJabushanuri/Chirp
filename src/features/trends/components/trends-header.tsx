"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { Gear } from "@/assets/gear-icon";
import { CloseButton } from "@/components/elements/close-button";

import styles from "./styles/trends-header.module.scss";

export const TrendsHeader = () => {
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

      <h1 className={styles.title}>Trends</h1>
      <button className={styles.settings}>
        <Gear />
      </button>
    </div>
  );
};
