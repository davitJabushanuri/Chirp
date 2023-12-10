import { useSession } from "next-auth/react";

import { TickIcon } from "@/assets/tick-svg";
import { Avatar, IUser } from "@/features/profile";

import { UserIcon } from "../../assets/user-icon";

import styles from "./styles/contact.module.scss";

export const Contact = ({
  user,
  receiverId,
  setReceiverId,
}: {
  user: IUser;
  receiverId: string | null;
  setReceiverId: (id: string | null) => void;
}) => {
  const { data: session } = useSession();

  return (
    <button
      onClick={() => setReceiverId(receiverId === user?.id ? null : user?.id)}
      className={styles.container}
    >
      {user?.followers?.some(
        (follower) => follower?.id === session?.user?.id,
      ) && (
        <div className={styles.following}>
          <span className={styles.icon}>
            <UserIcon />
          </span>
          <span className={styles.text}>Following</span>
        </div>
      )}
      <div className={styles.user}>
        <div className={styles.avatar}>
          <Avatar userImage={user?.profile_image_url} />
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{user?.name}</p>
          <span className={styles.username}>@{user?.screen_name}</span>
        </div>
        {receiverId === user?.id && (
          <div className={styles.tick}>
            <TickIcon />
          </div>
        )}
      </div>
    </button>
  );
};
