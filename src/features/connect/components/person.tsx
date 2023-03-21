/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Avatar } from "@/components/designs/avatar";
import { FollowButton } from "@/components/elements/follow-button";
import { IUser } from "@/features/profile";

import styles from "./styles/person.module.scss";

export const Person = ({ person }: { person: IUser }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const isFollowing = person?.followers?.some(
    (follower) => follower.follower_id === session?.user?.id,
  );

  return (
    <div
      onClick={() => router.push(`/${person?.id}`)}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <Avatar userImage={person?.profile_image_url} width={46} height={46} />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{person?.name}</p>
        <p className={styles.username}>@{person?.email?.split("@")[0]}</p>
      </div>
      <div onClick={(e) => e.stopPropagation()} className={styles.follow}>
        <FollowButton
          userId={person?.id}
          followerId={session?.user?.id}
          isFollowing={isFollowing}
          username={person?.email?.split("@")[0]}
        />
      </div>
    </div>
  );
};
