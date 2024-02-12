"use client";
import { useRouter } from "next/navigation";

import { Gear } from "@/assets/gear-icon";
import { NewMessageIcon } from "@/assets/new-message-icon";
import { Button } from "@/components/elements/button";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Tooltip } from "@/components/elements/tooltip";
import { Header } from "@/features/header";
import { Conversations, useNewMessageStore } from "@/features/messages";

import styles from "./styles/messages.module.scss";

export const MessagesClientPage = () => {
  const router = useRouter();
  const openModal = useNewMessageStore((state) => state.openModal);
  const isModalOpen = useNewMessageStore((state) => state.isModalOpen);

  return (
    <div className={styles.container}>
      <Header>
        <HamburgerButton />
        <h2>Messages</h2>

        <div className="ml-auto flex">
          <Tooltip text="Settings">
            <Button
              role="link"
              onClick={() => {
                router.push(`/settings/messages`);
              }}
              aria-label="Settings"
              className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100  active:bg-neutral-600"
            >
              <Gear />
            </Button>
          </Tooltip>

          <Tooltip text="New message">
            <Button
              aria-expanded={isModalOpen}
              aria-haspopup="menu"
              role="link"
              onClick={() => {
                openModal();
              }}
              aria-label="Compose a DM"
              className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100  active:bg-neutral-600"
            >
              <NewMessageIcon />
            </Button>
          </Tooltip>
        </div>
      </Header>
      <Conversations />
    </div>
  );
};
