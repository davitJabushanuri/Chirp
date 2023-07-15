import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { FollowButton } from "@/components/elements/follow-button";
import {
  Avatar,
  following,
  IUser,
  LinkToProfile,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";

import styles from "./styles/person.module.scss";

export const Person = ({ person }: { person: IUser }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const isFollowing = following({
    user: person,
    session_owner_id: session?.user?.id,
  });

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/${person?.id}`);
        }
      }}
      onClick={() => router.push(`/${person?.id}`)}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <UserModalWrapper userId={person?.id}>
          <Avatar userImage={person?.profile_image_url} />
        </UserModalWrapper>
      </div>

      <div className={styles.info}>
        <UserModalWrapper userId={person?.id}>
          <LinkToProfile userId={person?.id}>
            <EllipsisWrapper>
              <UserName
                name={person?.name}
                isVerified={person?.verified}
                hover={true}
              />
            </EllipsisWrapper>
          </LinkToProfile>
        </UserModalWrapper>

        <UserModalWrapper userId={person?.id}>
          <EllipsisWrapper>
            <UserScreenName screenName={person?.email?.split("@")[0]} />
          </EllipsisWrapper>
        </UserModalWrapper>
      </div>

      <FollowButton
        user_id={person?.id}
        session_owner_id={session?.user?.id}
        isFollowing={isFollowing}
        username={person?.email?.split("@")[0]}
      />
    </div>
  );
};
