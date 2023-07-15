/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from "next/navigation";

import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import {
  Avatar,
  IUser,
  LinkToProfile,
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
        <LinkToProfile userId={user?.id}>
          <Avatar userImage={user?.profile_image_url ?? ""} />
        </LinkToProfile>
      </div>
      <LinkToProfile userId={user?.id}>
        <UserName name={user?.name} isVerified={user?.verified} />
      </LinkToProfile>
      <div className={styles.username}>
        <LinkToProfile userId={user?.id}>
          <EllipsisWrapper>
            <UserScreenName screenName={user?.email?.split("@")[0]} />
          </EllipsisWrapper>
        </LinkToProfile>
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
