/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
"use client";
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */

import { CloseIcon } from "@/assets/close-icon";
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
        <CloseIcon />
      </button>
      <div className={sourceType === "banner" ? styles.banner : styles.avatar}>
        {source && (
          <img onClick={(e) => e.stopPropagation()} src={source} alt="" />
        )}
      </div>
    </div>
  );
};
