/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import Image from "next/image";

import { CloseButton } from "@/components/designs/close-button";
import { useDisableBodyScroll } from "@/hooks";
import { useInspectImage } from "@/stores/use-inspect-profile-image";

import styles from "./styles/inspect-image-modal.module.scss";

export const InspectImageModal = () => {
  useDisableBodyScroll();

  const closeInspectModal = useInspectImage((state) => state.closeInspectModal);
  const source = useInspectImage((state) => state.source);
  const sourceType = useInspectImage((state) => state.sourceType);

  return (
    <div onClick={() => closeInspectModal()} className={styles.container}>
      <button className={styles.close}>
        <CloseButton />
      </button>
      <div className={sourceType === "banner" ? styles.banner : styles.avatar}>
        {source && (
          <Image
            onClick={(e) => e.stopPropagation()}
            src={source}
            alt="avatar"
            width={2000}
            height={2000}
          />
        )}
      </div>
    </div>
  );
};
