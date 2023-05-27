/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Avatar } from "@/components/designs/avatar";
import { FollowButton } from "@/components/elements/follow-button";
import { IUser } from "@/features/profile";

import styles from "./styles/person-details.module.scss";

export const PersonDetails = ({ author }: { author: IUser }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const isFollowing = author?.followers?.some(
    (follower) => follower?.follower_id === session?.user?.id,
  );

  return (
    <div
      onClick={() => {
        router.push(`/${author?.id}`);
      }}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <Avatar userImage={author?.profile_image_url} width={46} height={46} />
      </div>

      <div className={styles.info}>
        <div className={styles.primary}>
          <div className={styles.name}>
            <span className={styles.fullName}>{author.name}</span>
            <span className={styles.username}>
              @{author?.email?.split("@")[0]}
            </span>
          </div>

          <div onClick={(e) => e.stopPropagation()} className={styles.follow}>
            <FollowButton
              followerId={session?.user?.id}
              userId={author?.id}
              isFollowing={isFollowing}
              username={author?.email?.split("@")[0]}
            />
          </div>
        </div>

        {author?.description && (
          <div className={styles.secondary}>
            <span className={styles.description}>{author?.description}</span>
          </div>
        )}
      </div>
    </div>
  );
};
