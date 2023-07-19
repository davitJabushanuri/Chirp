"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

import { MessageIcon } from "@/assets/message-icon";
import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { BASE_URL } from "@/config";
import { useJoinTwitter } from "@/features/auth";
import { useToggleBookmark } from "@/features/bookmarks";

import {
  AddToBookmarksIcon,
  RemoveFromBookmarksIcon,
} from "../../assets/bookmark-icon";
import { CopyLinkIcon } from "../../assets/copy-link-icon";
import { ShareIcon } from "../../assets/share-icon";
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

  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const mutation = useToggleBookmark();

  return (
    <div className={styles.container}>
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

          <button
            onClick={() => {
              if (!session) {
                setJoinTwitterData({
                  isModalOpen: true,
                  action: "message",
                  user: tweet?.author?.name,
                });
                setIsModalOpen(false);
              } else {
                console.log("DM");
              }
            }}
          >
            <Action icon={<MessageIcon />} text={`Send via Direct Message`} />
          </button>

          {isBookmarked ? (
            <button
              onClick={() => {
                mutation.mutate({
                  tweetId: tweet?.id,
                  userId: session?.user?.id,
                  action: "remove",
                  bookmarkId: tweet?.bookmarks?.find(
                    (bookmark) => bookmark?.user_id === session?.user?.id,
                  )?.id,
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
          ) : session ? (
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
          ) : null}
        </ActionsModal>
      )}

      <button
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label="Share Tweet"
        data-title="Share"
        tabIndex={0}
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
