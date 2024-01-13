"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { PenIcon } from "../assets/pen-icon";

import styles from "./styles/mobile-tweet-button.module.scss";

export const MobileTweetButton = () => {
  const { data: session } = useSession();
  const openModal = useCreateTweetModal((state) => state.openModal);
  const pathname = usePathname();
  const path = pathname.split("/")[1];

  if (!session || path === "messages") return null;

  return (
    <button
      aria-label="Compose a Tweet"
      data-title="Tweet"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
      className={styles.container}
    >
      <PenIcon />
    </button>
  );
};
