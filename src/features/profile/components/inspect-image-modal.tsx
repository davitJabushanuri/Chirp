import Image from "next/image";

import { CloseIcon } from "@/assets/close-icon";
import { CloseButton } from "@/components/elements/close-button";

import styles from "./styles/inspect-image-modal.module.scss";

export const InspectImageModal = ({
  source,
  sourceType,
  closeModal,
}: {
  source: string;
  sourceType: string;
  closeModal: () => void;
}) => {
  return (
    <dialog
      open
      className={sourceType === "banner" ? styles.banner : styles.avatar}
    >
      <div className={styles.close}>
        <CloseButton onClick={closeModal} ariaLabel="Close" title="Close">
          <CloseIcon />
        </CloseButton>
      </div>

      {source && <Image src={source} alt="avatar" fill={true} />}
    </dialog>
  );
};
