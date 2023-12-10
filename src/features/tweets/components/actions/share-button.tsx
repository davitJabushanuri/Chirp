"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { MessageIcon } from "@/assets/message-icon";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
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
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      <button
        ref={buttonRef}
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label="Share Tweet"
        data-title="Share"
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
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

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            background="none"
            onClose={() => {
              setIsModalOpen(false);
            }}
          >
            <Menu
              onClose={() => setIsModalOpen(false)}
              ref={buttonRef}
              trackScroll={true}
            >
              <MenuItem
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  setIsModalOpen(false);
                  notify();
                }}
              >
                <CopyLinkIcon /> Copy link to Tweet
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                <ShareIcon /> Share Tweet via ...
              </MenuItem>

              <MenuItem
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
                <MessageIcon /> Send via Direct Message
              </MenuItem>

              {isBookmarked ? (
                <MenuItem
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
                  <RemoveFromBookmarksIcon /> Remove Tweet from Bookmarks
                </MenuItem>
              ) : session ? (
                <MenuItem
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
                  <AddToBookmarksIcon /> Add Tweet to Bookmarks
                </MenuItem>
              ) : null}
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
