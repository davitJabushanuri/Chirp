/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BackButton } from "@/components/designs/back-button";
import { CloseButton } from "@/components/designs/close-button";
import { PersonDetails } from "@/features/connect";
import { IUser } from "@/features/profile";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

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
  const closeTweetImageModal = useInspectTweetImage(
    (state) => state.closeTweetImageModal,
  );

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
              <BackButton />
            </span>

            <span className={styles.x}>
              <CloseButton />
            </span>
          </button>

          <h2 className={styles.title}>
            {title === `likes` ? `Liked By` : `Retweeted By`}
          </h2>
        </header>

        <div className={styles.people}>
          {authors?.map((author: IUser) => {
            return (
              <div
                onClick={() => {
                  setIsModalOpen(false);
                  closeTweetImageModal();
                }}
                key={author?.id}
              >
                <PersonDetails author={author} />;
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
