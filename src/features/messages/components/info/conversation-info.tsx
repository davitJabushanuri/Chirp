/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useGetConversation } from "../../hooks/use-get-conversation";

import { ConversationActions } from "./conversation-actions";
import { ConversationInfoHeader } from "./conversation-info-header";
import { ConversationMember } from "./conversation-member";
import { ConversationNotifications } from "./conversation-notifications";
import styles from "./styles/conversation-info.module.scss";

export const ConversationInfo = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const { data: session } = useSession();

  const { data: conversation, isLoading, isError } = useGetConversation(id);

  const sessionOwner = conversation?.users?.find(
    (user) => user.id === session?.user.id,
  );

  const member = conversation?.users?.filter(
    (user) => user.id !== session?.user.id,
  )[0];

  if (isLoading) {
    return (
      <>
        <ConversationInfoHeader />
        <LoadingSpinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <ConversationInfoHeader />
        <TryAgain />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <ConversationInfoHeader />

      <div className={styles.members}>
        {conversation?.users
          ?.filter((member) => member.id !== session?.user.id)
          ?.map((member) => {
            return (
              <ConversationMember
                member={member}
                sessionOwner={sessionOwner || session?.user}
                key={member?.id}
              />
            );
          })}
      </div>

      <div className={styles.notifications}>
        <ConversationNotifications member={member} />
      </div>

      <div className={styles.actions}>
        <ConversationActions
          member={member}
          conversationId={conversation?.id}
        />
      </div>
    </div>
  );
};
