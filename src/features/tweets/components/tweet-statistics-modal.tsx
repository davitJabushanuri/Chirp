/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { FollowButton } from "@/components/elements/follow-button";
import { IUser } from "@/features/profile";

import styles from "./styles/tweet-statistics-modal.module.scss";

export const TweetStatisticsModal = ({
  authors,
  title,
  setIsModalOpen,
}: {
  authors: IUser[] | undefined;
  title: string;
  setIsModalOpen: (value: boolean) => void;
}) => {
  return (
    <div
      onClick={() => {
        setIsModalOpen(false);
      }}
      className={styles.container}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <header>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className={styles.close}
          >
            <span className={styles.arrow}>
              <BackArrowIcon />
            </span>

            <span className={styles.x}>
              <CloseIcon />
            </span>
          </button>

          <h2 className={styles.title}>
            {title === `likes` ? `Liked By` : `Retweeted By`}
          </h2>
        </header>

        <div className={styles.people}>
          {authors?.map((author: IUser) => {
            return <Author key={author?.id} author={author} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Author = ({ author }: { author: IUser }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const isFollowing = author?.followers.some(
    (follower) => follower?.follower_id === session?.user?.id,
  );

  return (
    <div
      onClick={() => router.push(`/${author?.id}`)}
      className={styles.author}
    >
      <div className={styles.avatar}>
        <img src={author.profile_image_url} alt="avatar" />
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
