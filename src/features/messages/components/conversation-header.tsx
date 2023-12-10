import { usePathname, useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseButton } from "@/components/elements/close-button";

import { InfoIcon } from "../assets/info-icon";

import styles from "./styles/conversation-header.module.scss";

export const ConversationHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  return (
    <div className={styles.container}>
      <CloseButton
        onClick={() => {
          router.push(`/messages`);
        }}
        ariaLabel="Back"
        title="Back"
      >
        <BackArrowIcon />
      </CloseButton>

      <button
        onClick={() => router.push(`/messages/${id}/info`)}
        className={styles.details}
      >
        <InfoIcon />
      </button>
    </div>
  );
};
