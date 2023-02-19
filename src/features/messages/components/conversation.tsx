import dayjs from "dayjs";
import { useSession } from "next-auth/react";

import { UserAvatar, UserName, UserScreenName } from "@/features/profile";

import { IConversation } from "../types";

import styles from "./styles/conversation.module.scss";

export const Conversation = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  const { data: session } = useSession();
  const user = conversation?.users.filter(
    (user) => user.id !== session?.user?.id,
  )[0];
  const lastMessage = conversation?.messages[conversation?.messages.length - 1];

  return (
    <div className={styles.container}>
      <UserAvatar userId={user?.id} userImage={user?.profile_image_url} />

      <div className={styles.info}>
        <UserName
          name={user?.name}
          userId={user?.id}
          isVerified={user?.verified}
        />
        <UserScreenName screenName={user?.screen_name} userId={user?.id} />
        <span className={styles.dot}>·</span>
        <span className={styles.date}>
          {dayjs(lastMessage?.created_at).format("MMM D")}
        </span>
      </div>
    </div>
  );
};
