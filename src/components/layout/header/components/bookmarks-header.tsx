/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSession } from "next-auth/react";
import { useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { BackButton } from "@/components/elements/back-button";

import styles from "./styles/bookmarks-header.module.scss";

export const BookmarksHeader = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <BackButton />
      </div>

      <div className={styles.user}>
        <h2 className={styles.title}>Bookmarks</h2>
        {session?.user?.email && <p>@{session?.user?.email?.split("@")[0]}</p>}
      </div>

      <div className={styles.optionsContainer}>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className={styles.options}
        >
          <DotIcon />
        </button>
        {isModalOpen && (
          <ActionsModal setIsModalOpen={setIsModalOpen}>
            <button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setIsModalOpen(false);
              }}
            >
              <Action icon={""} text={`Clear all Bookmarks`} />
            </button>
          </ActionsModal>
        )}

        {isDeleteModalOpen && (
          <div
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
            className={styles.deleteModal}
          >
            <div className={styles.modal}>
              <h1>Clear all Bookmarks?</h1>
              <p>
                This can’t be undone and you’ll remove all Tweets you’ve added
                to your Bookmarks.
              </p>
              <button className={styles.clear}>Clear</button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
                className={styles.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
