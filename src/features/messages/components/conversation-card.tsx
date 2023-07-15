/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { PinIcon } from "@/assets/pin-icon";
import { ReportIcon } from "@/assets/report-icon";
import { TrashIcon } from "@/assets/trash-icon";
import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import {
  Avatar,
  LinkToProfile,
  UserName,
  UserScreenName,
} from "@/features/profile";

import { SnoozeNotificationsIon } from "../assets/snooze-notifications-ion";
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

  const user = conversation?.users.filter(
    (user) => user.id !== session?.user?.id,
  )[0];
  const lastMessage = conversation?.messages[conversation?.messages.length - 1];

  const mutation = useDeleteConversation();

  return (
    <div
      onClick={() => router?.push(`/messages/${conversation?.id}`)}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <LinkToProfile userId={user?.id}>
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

            <LinkToProfile userId={user?.id}>
              <EllipsisWrapper>
                <UserScreenName screenName={user?.email?.split("@")[0]} />
              </EllipsisWrapper>
            </LinkToProfile>
            <span className={styles.dot}>·</span>
            <span className={styles.date}>
              {dayjs(lastMessage?.created_at).format("MMM D")}
            </span>
          </div>
          <div onClick={(e) => e.stopPropagation()} className={styles.options}>
            <button
              className={styles.optionsButton}
              onClick={() => setIsModalOpen(true)}
            >
              <DotIcon />
            </button>

            {isModalOpen && (
              <ActionsModal setIsModalOpen={setIsModalOpen}>
                <button>
                  <Action icon={<PinIcon />} text={`Pin conversation`} />
                </button>

                <button>
                  <Action
                    icon={<SnoozeNotificationsIon />}
                    text={`Snooze conversation`}
                  />
                </button>

                <button>
                  <Action icon={<ReportIcon />} text={`Report conversation`} />
                </button>

                <button
                  onClick={() => {
                    mutation.mutate({ conversationId: conversation?.id });
                  }}
                  className={styles.delete}
                >
                  <Action icon={<TrashIcon />} text={`Delete conversation`} />
                </button>
              </ActionsModal>
            )}
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
