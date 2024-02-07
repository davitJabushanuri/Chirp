"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { Button } from "@/components/elements/button";
import { Menu } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";
import { ITweet } from "@/features/tweets";

import { DeleteTweetModal } from "../delete-tweet-modal";

import { TweetOwnerMenu } from "./tweet-owner-menu";
import { TweetVisitorMenu } from "./tweet-visitor-menu";

export const TweetOptions = ({ tweet }: { tweet: ITweet }) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Tooltip text="More">
        <Button
          ref={buttonRef}
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          aria-label="More"
          data-title="More"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(true);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          className="fill-tertiary-100 hover:bg-primary-100/10 hover:fill-primary-100 focus-visible:bg-primary-100/10 focus-visible:fill-primary-100 focus-visible:outline-primary-100 active:bg-primary-100/20 active:fill-primary-100"
        >
          <DotIcon />
        </Button>
      </Tooltip>

      <AnimatePresence>
        {isMenuOpen && (
          <Modal
            background="none"
            onClose={() => {
              setIsMenuOpen(false);
            }}
          >
            <Menu
              ref={buttonRef}
              onClose={() => setIsMenuOpen(false)}
              trackScroll={true}
            >
              {tweet?.author?.id === session?.user?.id ? (
                <TweetOwnerMenu
                  tweet={tweet}
                  setIsMenuOpen={setIsMenuOpen}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
              ) : (
                <TweetVisitorMenu setIsMenuOpen={setIsMenuOpen} tweet={tweet} />
              )}
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
              setIsMenuOpen(true);
            }}
          >
            <DeleteTweetModal
              tweet={tweet}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
