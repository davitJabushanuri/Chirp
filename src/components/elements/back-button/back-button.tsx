"use client";

import { useRouter } from "next/navigation";

import { LeftArrowIcon } from "@/assets/left-arrow-icon";

import styles from "./styles/back-button.module.scss";
export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className={styles.container}
      onClick={() => router.back()}
      title="Back"
    >
      <LeftArrowIcon />
    </button>
  );
};
