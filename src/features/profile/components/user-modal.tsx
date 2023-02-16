/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { FollowButton } from "@/components/elements/follow-button";

import { useUser } from "../hooks/use-user";

import styles from "./styles/user-modal.module.scss";

export const UserModal = ({ userId }: { userId: string }) => {
  const { data: session } = useSession();
  const { data: user } = useUser(userId);

  const isFollowing = user?.followers?.some(
    (follower) => follower.id === session?.user?.id,
  );

  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.container}
    >
      <div className={styles.userInfo}>
        <div className={styles.userImage}>
          {user?.profile_image_url ? (
            <img src={user?.profile_image_url} alt="" />
          ) : (
            <img src="/user_placeholder.png" alt="" />
          )}
        </div>

        <h2 className={styles.name}>{user?.name}</h2>
        <p className={styles.username}>@{user?.email?.split("@")[0]}</p>
      </div>

      <div className={styles.follow}>
        <FollowButton
          followerId={session?.user?.id}
          isFollowing={isFollowing}
          userId={user?.id}
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

        <div className={styles.followedBy}>
          <p className={styles.followedByTitle}>Followed by</p>
        </div>
      </div>
    </div>
  );
};
