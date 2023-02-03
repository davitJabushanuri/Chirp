/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDisableBodyScroll } from "@/hooks";

import { deleteMedia } from "../api/delete-media";
import { useDeleteTweet } from "../hooks/use-delete-tweet";
import { ITweet } from "../types";

import styles from "./styles/delete-tweet-modal.module.scss";

export const DeleteTweetModal = ({
  tweet,
  setIsDeleteModalOpen,
  setIsActionsModalOpen,
}: {
  tweet: ITweet;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsActionsModalOpen: (value: boolean) => void;
}) => {
  useDisableBodyScroll();

  const mutation = useDeleteTweet();

  return (
    <div
      onClick={() => {
        setIsDeleteModalOpen(false);
        setIsActionsModalOpen(true);
      }}
      className={styles.container}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h1>Delete tweet?</h1>
        <p>
          This can’t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from Twitter search
          results.
        </p>

        <button
          onClick={() => {
            mutation.mutate({
              tweetId: tweet?.id,
            });
            setIsDeleteModalOpen(false);
            if (tweet?.media?.length)
              deleteMedia(tweet?.media?.map((m) => m.media_path));
          }}
          className={styles.delete}
        >
          Delete
        </button>
        <button
          className={styles.cancel}
          onClick={() => {
            setIsDeleteModalOpen(false);
            setIsActionsModalOpen(true);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
