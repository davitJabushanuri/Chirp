"use client";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { DotIcon } from "@/assets/dot-icon";
import { Button } from "@/components/elements/button";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Menu, MenuItem } from "@/components/elements/menu";
import { ConfirmationModal, Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";
import { Header } from "@/features/header";
import { UserScreenName } from "@/features/profile";

import { useDeleteAllBookmarks } from "../hooks/use-delete-all-bookmarks";

export const BookmarksHeader = ({
  hasBookmarks = false,
  username,
  userId,
}: {
  hasBookmarks: boolean;
  username: string | undefined;
  userId: string | undefined;
}) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const mutation = useDeleteAllBookmarks();

  return (
    <Header>
      <Tooltip text="Back">
        <Button
          onClick={() => {
            router.back();
          }}
          aria-label="Back"
          className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600 sm:hidden"
        >
          <BackArrowIcon />
        </Button>
      </Tooltip>

      <div>
        <h2 className="text-h2 font-bold text-secondary-100">Bookmarks</h2>
        {username && (
          <EllipsisWrapper>
            <UserScreenName screenName={username} />
          </EllipsisWrapper>
        )}
      </div>

      {hasBookmarks && (
        <div className="relative ml-auto">
          <Tooltip text="More">
            <Button
              ref={buttonRef}
              aria-expanded={isModalOpen}
              aria-haspopup="menu"
              aria-label="More"
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
            >
              <DotIcon />
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
                  ref={buttonRef}
                  onClose={() => setIsModalOpen(false)}
                  trackScroll={true}
                >
                  <MenuItem
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setIsModalOpen(false);
                    }}
                  >
                    <span className="text-red-100">Clear all Bookmarks</span>
                  </MenuItem>
                </Menu>
              </Modal>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isDeleteModalOpen && (
              <Modal
                background="var(--clr-modal-background)"
                onClose={() => {
                  setIsDeleteModalOpen(false);
                }}
              >
                <ConfirmationModal
                  heading="Clear all Bookmarks?"
                  paragraph="This can’t be undone and you’ll remove all Tweets you’ve added to your Bookmarks."
                  confirmButtonText="Clear"
                  confirmButtonClick={() => {
                    mutation.mutate({ userId });
                    setIsDeleteModalOpen(false);
                  }}
                  confirmButtonStyle="delete"
                  cancelButtonText="Cancel"
                  cancelButtonClick={() => {
                    setIsDeleteModalOpen(false);
                  }}
                />
              </Modal>
            )}
          </AnimatePresence>
        </div>
      )}
    </Header>
  );
};
