/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from "next/navigation";

import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { FollowButton } from "@/components/elements/follow-button";
import {
  Avatar,
  IUser,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";

import styles from "./styles/conversation-member.module.scss";

export const ConversationMember = ({
  member,
  sessionOwner,
}: {
  member: IUser;
  sessionOwner: IUser;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${member?.id}`)}
      className={styles.container}
    >
      <UserModalWrapper userId={member?.id}>
        <Avatar userImage={member?.profile_image_url} />
      </UserModalWrapper>

      <div className={styles.name}>
        <UserModalWrapper userId={member?.id}>
          <EllipsisWrapper>
            <UserName name={member?.name} isVerified={member?.verified} />
          </EllipsisWrapper>
        </UserModalWrapper>
        <div className={styles.username}>
          <UserModalWrapper userId={member?.id}>
            <EllipsisWrapper>
              <UserScreenName screenName={member?.screen_name} />
            </EllipsisWrapper>
          </UserModalWrapper>
          {sessionOwner?.followers?.some(
            (follower) => follower.id === member?.id,
          ) && <span className={styles.followsYou}>Follows you</span>}
        </div>
      </div>
      <FollowButton
        user_id={member?.id}
        session_owner_id={sessionOwner?.id}
        username={member?.screen_name}
        isFollowing={member?.followers?.some(
          (follower) => follower.id === sessionOwner?.id,
        )}
      />
    </div>
  );
};
