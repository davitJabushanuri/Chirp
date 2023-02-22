import { IUser } from "@/features/profile";

import styles from "./styles/conversation-actions.module.scss";

export const ConversationActions = ({
  member,
}: {
  member: IUser | undefined;
}) => {
  return (
    <div className={styles.container}>
      <button className={styles.block}>Block @{member?.screen_name}</button>
      <button className={styles.report}>Report @{member?.screen_name}</button>
      <button className={styles.leave}>Leave conversation</button>
    </div>
  );
};
