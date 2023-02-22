/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from "next/navigation";

import { FollowButton } from "@/components/elements/follow-button";
import {
  IUser,
  UserAvatar,
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
        <UserAvatar userId={member?.id} userImage={member?.profile_image_url} />
      </UserModalWrapper>

      <div className={styles.name}>
        <UserModalWrapper userId={member?.id}>
          <UserName
            userId={member?.id}
            name={member?.name}
            isVerified={member?.verified}
          />
        </UserModalWrapper>
        <div className={styles.username}>
          <UserModalWrapper userId={member?.id}>
            <UserScreenName
              userId={member?.id}
              screenName={member?.screen_name}
            />
          </UserModalWrapper>
          {sessionOwner?.followers?.some(
            (follower) => follower.follower_id === member?.id,
          ) && <span className={styles.followsYou}>Follows you</span>}
        </div>
      </div>
      <FollowButton
        followerId={sessionOwner?.id}
        userId={member?.id}
        username={member?.screen_name}
        isFollowing={member?.followers?.some(
          (follower) => follower.follower_id === sessionOwner?.id,
        )}
      />
    </div>
  );
};
