/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { FollowButton } from "@/components/elements/follow-button";

import { useUser } from "../hooks/use-user";
import { following } from "../utils/following";

import { Avatar } from "./avatar";
import styles from "./styles/user-modal.module.scss";

export const UserModal = ({ userId }: { userId: string }) => {
  const { data: session } = useSession();
  const { data: user } = useUser({ id: userId });

  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  const isFollowing = following({
    user,
    session_owner_id: session?.user?.id,
  });

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.container}
    >
      <div className={styles.userInfo}>
        <div className={styles.userImage}>
          <Avatar userImage={user?.profile_image_url} />
        </div>

        <h2 className={styles.name}>{user?.name}</h2>
        <p className={styles.username}>@{user?.email?.split("@")[0]}</p>
      </div>

      <div className={styles.follow}>
        <FollowButton
          user_id={user?.id}
          session_owner_id={session?.user?.id}
          isFollowing={isFollowing}
          username={user?.email?.split("@")[0]}
        />
      </div>

      <div className={styles.userDetails}>
        {user?.description && (
          <p className={styles.description}>{user?.description}</p>
        )}

        <div className={styles.stats}>
          <button
            onClick={() => router.push(`${pathname}/following`)}
            className={styles.stat}
          >
            <span className={styles.number}>
              {user?.following?.length || 0}
            </span>
            <span className={styles.text}>Following</span>
          </button>
          <button
            onClick={() => router.push(`${pathname}/followers`)}
            className={styles.stat}
          >
            <span className={styles.number}>
              {user?.followers?.length || 0}
            </span>
            <span className={styles.text}>Followers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
