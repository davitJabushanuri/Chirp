"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { MessageIcon } from "@/assets/message-icon";
import { Button } from "@/components/elements/button";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";
import { BASE_URL } from "@/config";
import { useJoinTwitter } from "@/features/auth";
import { useToggleBookmark } from "@/features/bookmarks";
import { cn } from "@/utils/cn";

import {
  AddToBookmarksIcon,
  RemoveFromBookmarksIcon,
} from "../../assets/bookmark-icon";
import { CopyLinkIcon } from "../../assets/copy-link-icon";
import { ShareIcon } from "../../assets/share-icon";
import { ITweet } from "../../types";

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
    <div>
      <Tooltip text="Share">
        <Button
          ref={buttonRef}
          aria-expanded={isModalOpen}
          aria-haspopup="menu"
          aria-label="Share Tweet"
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="group flex gap-[2px] p-0 focus-visible:outline-0"
        >
          <span
            className={cn(
              "rounded-full fill-tertiary-100 p-2 group-hover:bg-blue-100/20 group-hover:fill-blue-100  group-active:bg-blue-100/25 group-active:fill-blue-100",
              "outline-offset-[-2px] group-focus-visible:bg-blue-100/20 group-focus-visible:fill-blue-100 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-blue-100",
              "transition-colors duration-200 ease-in-out",
            )}
          >
            <ShareIcon />
          </span>
        </Button>
      </Tooltip>

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
