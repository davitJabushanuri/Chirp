import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { PinIcon } from "@/assets/pin-icon";
import { ReportIcon } from "@/assets/report-icon";
import { TrashIcon } from "@/assets/trash-icon";
import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import {
  Avatar,
  LinkToProfile,
  UserName,
  UserScreenName,
} from "@/features/profile";

import { SnoozeNotificationsIcon } from "../assets/snooze-notifications-icon";
import { useDeleteConversation } from "../hooks/use-delete-conversation";
import { IConversation } from "../types";

import styles from "./styles/conversation-card.module.scss";

export const ConversationCard = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const user = conversation?.users.filter(
    (user) => user.id !== session?.user?.id,
  )[0];
  const lastMessage = conversation?.messages[conversation?.messages.length - 1];

  const mutation = useDeleteConversation();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router?.push(`/messages/${conversation?.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") router?.push(`/messages/${conversation?.id}`);
      }}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <LinkToProfile userId={user?.id} tabIndex={-1}>
          <Avatar userImage={user?.profile_image_url} />
        </LinkToProfile>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.user}>
            <LinkToProfile userId={user?.id}>
              <EllipsisWrapper>
                <UserName name={user?.name} isVerified={user?.verified} />
              </EllipsisWrapper>
            </LinkToProfile>

            <LinkToProfile userId={user?.id} tabIndex={-1}>
              <EllipsisWrapper>
                <UserScreenName screenName={user?.email?.split("@")[0]} />
              </EllipsisWrapper>
            </LinkToProfile>
            <span className={styles.dot}>·</span>
            <span className={styles.date}>
              <CreateDate
                focus={false}
                hover={false}
                date={lastMessage?.created_at}
              />
            </span>
          </div>
          <div className={styles.options}>
            <button
              aria-expanded={isModalOpen}
              aria-haspopup="menu"
              aria-label="More"
              data-title="More"
              ref={buttonRef}
              className={styles.optionsButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            >
              <DotIcon />
            </button>

            <AnimatePresence>
              {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} background="none">
                  <Menu
                    onClose={() => setIsModalOpen}
                    trackScroll={true}
                    ref={buttonRef}
                  >
                    <MenuItem onClick={() => setIsModalOpen(false)}>
                      <PinIcon /> Pin conversation
                    </MenuItem>

                    <MenuItem onClick={() => setIsModalOpen(false)}>
                      <SnoozeNotificationsIcon /> Snooze conversation
                    </MenuItem>

                    <MenuItem onClick={() => setIsModalOpen(false)}>
                      <ReportIcon /> Report conversation
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        mutation.mutate({ conversationId: conversation?.id });
                        setIsModalOpen(false);
                      }}
                      color="red"
                    >
                      <TrashIcon /> Delete conversation
                    </MenuItem>
                  </Menu>
                </Modal>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.messageContainer}>
          {lastMessage?.media?.length > 0 &&
          lastMessage?.sender_id === session?.user?.id ? (
            <span className={styles.message}>You sent a photo</span>
          ) : lastMessage?.media?.length > 0 &&
            lastMessage?.receiver_id === session?.user?.id ? (
            <span className={`${styles.message} ${styles.photo}`}>
              Sent a photo
            </span>
          ) : (
            <span className={styles.message}>{lastMessage?.text}</span>
          )}
        </div>
      </div>
    </div>
  );
};
