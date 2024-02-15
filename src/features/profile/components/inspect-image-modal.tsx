import Image from "next/image";

import { CloseIcon } from "@/assets/close-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";

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
        <Tooltip text="Close">
          <Button
            aria-label="Close"
            onClick={() => {
              closeModal();
            }}
            className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
          >
            <CloseIcon />
          </Button>
        </Tooltip>
      </div>

      {source && <Image src={source} alt="avatar" fill={true} />}
    </dialog>
  );
};
