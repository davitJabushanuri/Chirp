import { useSession } from "next-auth/react";
import { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MessageIcon } from "@/assets/message-icon";
import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { BASE_URL } from "@/config";

import {
  AddToBookmarksIcon,
  RemoveFromBookmarksIcon,
} from "../../assets/bookmark-icon";
import { CopyLinkIcon } from "../../assets/copy-link-icon";
import { ShareIcon } from "../../assets/share-icon";
import { useBookmark } from "../../hooks/useBookmark";
import { ITweet } from "../../types";

import styles from "./styles/actions.module.scss";

export const ShareButton = ({ tweet }: { tweet: ITweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const url = `${BASE_URL}/status/${tweet?.id}`;
  const notify = () => toast("Copied to clipboard");
  const addedToBookmarks = () => toast("Tweet added to your Bookmarks");
  const removedFromBookmarks = () => toast("Tweet removed from your bookmarks");

  const isBookmarked = tweet?.bookmarks?.some(
    (bookmark) => bookmark?.user_id === session?.user?.id,
  );

  const mutation = useBookmark({
    tweetAuthorId: tweet?.author?.id,
    sessionOwnerId: session?.user?.id,
  });

  return (
    <div className={styles.container}>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        transition={Slide}
        closeButton={false}
        closeOnClick={false}
        className={styles.toastContainer}
        toastClassName={styles.toast}
        bodyClassName={styles.toastBody}
      />

      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(url);
              setIsModalOpen(false);
              notify();
            }}
          >
            <Action icon={<CopyLinkIcon />} text={`Copy link to Tweet`} />
          </button>

          <button>
            <Action icon={<ShareIcon />} text={`Share Tweet via ...`} />
          </button>

          <button>
            <Action icon={<MessageIcon />} text={`Send via Direct Message`} />
          </button>

          {isBookmarked ? (
            <button
              onClick={() => {
                mutation.mutate({
                  tweetId: tweet?.id,
                  userId: session?.user?.id,
                  action: "remove",
                });
                setIsModalOpen(false);
                removedFromBookmarks();
              }}
            >
              <Action
                icon={<RemoveFromBookmarksIcon />}
                text={`Remove Tweet from Bookmarks`}
              />
            </button>
          ) : (
            <button
              onClick={() => {
                mutation.mutate({
                  tweetId: tweet?.id,
                  userId: session?.user?.id,
                  action: "add",
                });
                setIsModalOpen(false);
                addedToBookmarks();
              }}
            >
              <Action icon={<AddToBookmarksIcon />} text={`Bookmark`} />
            </button>
          )}
        </ActionsModal>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={styles.share}
      >
        <span className={styles.icon}>
          <ShareIcon />
        </span>
      </button>
    </div>
  );
};
