/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRouter } from "next/navigation";

import {
  IUser,
  UserAvatar,
  UserJoinDate,
  UserName,
  UserScreenName,
} from "@/features/profile";

import styles from "./styles/conversation-member-details.module.scss";

export const ConversationMemberDetails = ({
  user,
}: {
  user: IUser | undefined;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${user?.id}`)}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <UserAvatar userId={user?.id} userImage={user?.profile_image_url} />
      </div>
      <UserName
        userId={user?.id}
        name={user?.name}
        isVerified={user?.verified}
      />
      <div className={styles.username}>
        <UserScreenName userId={user?.id} screenName={user?.screen_name} />
      </div>
      {user?.description && (
        <div className={styles.bio}>
          <p>{user?.description}</p>
        </div>
      )}

      <div className={styles.stats}>
        <UserJoinDate showIcon={false} date={user?.created_at} />
        <span className={styles.dot}>·</span>
        <span className={styles.followers}>
          {user?.followers?.length ?? 0} Followers
        </span>
      </div>

      <p className={styles.followersInfo}>
        Not followed by anyone you&apos;re following
      </p>
    </div>
  );
};
