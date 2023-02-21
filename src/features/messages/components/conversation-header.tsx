import { usePathname, useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";

import { InfoIcon } from "../assets/info-icon";

import styles from "./styles/conversation-header.module.scss";

export const ConversationHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  return (
    <div className={styles.container}>
      <button
        onClick={() => router.push(`/messages`)}
        className={styles.backButton}
      >
        <BackArrowIcon />
      </button>

      <button
        onClick={() => router.push(`/messages/${id}/info`)}
        className={styles.details}
      >
        <InfoIcon />
      </button>
    </div>
  );
};
