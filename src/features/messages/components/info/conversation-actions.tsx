import { IUser } from "@/features/profile";

import { useDeleteConversation } from "../../hooks/use-delete-conversation";

import styles from "./styles/conversation-actions.module.scss";

export const ConversationActions = ({
  member,
  conversationId,
}: {
  member: IUser | undefined;
  conversationId: string | undefined;
}) => {
  const mutation = useDeleteConversation();

  return (
    <div className={styles.container}>
      <button className={styles.block}>Block @{member?.screen_name}</button>
      <button className={styles.report}>Report @{member?.screen_name}</button>
      <button
        onClick={() =>
          mutation.mutate({
            conversationId: conversationId,
          })
        }
        className={styles.leave}
      >
        Leave conversation
      </button>
    </div>
  );
};
