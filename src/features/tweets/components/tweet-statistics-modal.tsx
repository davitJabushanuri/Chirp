"use client";
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { CloseButton } from "@/components/elements/close-button";
import { PersonDetails } from "@/features/connect";
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
  const innerWidth = window.innerWidth;
  return (
    <div
      onClick={() => {
        setIsModalOpen(false);
      }}
      className={styles.container}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <header>
          <CloseButton
            onClick={() => {
              setIsModalOpen(false);
            }}
            ariaLabel={innerWidth < 700 ? `Close` : `Back`}
            title={innerWidth < 700 ? `Close` : `Back`}
          >
            {innerWidth < 700 ? <BackArrowIcon /> : <CloseIcon />}
          </CloseButton>

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
