"use client";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { DotIcon } from "@/assets/dot-icon";
import { CloseButton } from "@/components/elements/close-button";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Menu, MenuItem } from "@/components/elements/menu";
import { ConfirmationModal, Modal } from "@/components/elements/modal";
import { HeaderHeading } from "@/features/header";

import { useDeleteAllBookmarks } from "../hooks/use-delete-all-bookmarks";

import styles from "./styles/bookmarks-header.module.scss";

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
    <div className={styles.container}>
      <div className={styles.backButton}>
        <CloseButton
          onClick={() => {
            router.back();
          }}
          ariaLabel="Back"
          title="Back"
        >
          <BackArrowIcon />
        </CloseButton>
      </div>

      <div className={styles.user}>
        <HeaderHeading title={"Bookmarks"} />
        {username && (
          <EllipsisWrapper>
            <span>@{username}</span>
          </EllipsisWrapper>
        )}
      </div>

      {hasBookmarks && (
        <div className={styles.optionsContainer}>
          <button
            ref={buttonRef}
            aria-expanded={isModalOpen}
            aria-haspopup="menu"
            aria-label="More"
            data-title="More"
            onClick={() => {
              setIsModalOpen(true);
            }}
            className={styles.options}
          >
            <DotIcon />
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
                    <span className={styles.delete}>Clear all Bookmarks</span>
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
    </div>
  );
};
