"use client";
import { useRouter } from "next/navigation";

import { LeftArrowIcon } from "@/assets/left-arrow-icon";

import styles from "./styles/back-button.module.scss";
export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      aria-label="Back"
      data-title="Back"
      className={styles.container}
      onClick={() => router.back()}
    >
      <LeftArrowIcon />
    </button>
  );
};
