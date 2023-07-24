import { NewMessageIcon } from "@/assets/new-message-icon";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { useNewMessageStore } from "@/features/messages";

import { HeaderHeading } from "./header-heading";
import { HeaderSettings } from "./header-settings";
import styles from "./styles/messages-header.module.scss";

export const MessagesHeader = () => {
  const openModal = useNewMessageStore((state) => state.openModal);
  const isModalOpen = useNewMessageStore((state) => state.isModalOpen);

  return (
    <div className={styles.container}>
      <HamburgerButton />
      <HeaderHeading title="Messages" />

      <div className={styles.buttons}>
        <HeaderSettings href="/messages/settings" ariaLabel="Settings" />

        <button
          aria-expanded={isModalOpen}
          aria-haspopup="menu"
          aria-label="Compose a DM"
          data-title="New message"
          onClick={openModal}
          className={styles.newMessage}
        >
          <NewMessageIcon />
        </button>
      </div>
    </div>
  );
};
