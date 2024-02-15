"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { RetweetIcon } from "@/assets/retweet-icon";
import { Button } from "@/components/elements/button";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";
import { useJoinTwitter } from "@/features/auth";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";
import { cn } from "@/utils/cn";

import { QuoteTweetIcon } from "../../assets/quote-tweet-icon";
import { useRetweet } from "../../hooks/use-retweet";
import { ITweet } from "../../types";

export const RetweetButton = ({
  tweet,
  showStats,
}: {
  tweet: ITweet;
  showStats: boolean;
}) => {
  const { data: session } = useSession();
  const hasRetweeted = tweet?.retweets?.some(
    (retweet) => retweet?.user_id === session?.user?.id,
  );

  const setData = useCreateTweetModal((state) => state.setData);
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const retweetMutation = useRetweet(setIsModalOpen);

  return (
    <div>
      <Tooltip text={hasRetweeted ? "Undo retweet" : "Retweet"}>
        <Button
          ref={buttonRef}
          aria-expanded={isModalOpen}
          aria-haspopup="menu"
          aria-label={hasRetweeted ? "Undo retweet" : "Retweet"}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!session) {
              setJoinTwitterData({
                isModalOpen: true,
                action: "retweet",
                user: tweet?.author?.name,
              });
            } else setIsModalOpen(true);
          }}
          className="group flex gap-[2px] p-0 focus-visible:outline-0"
        >
          <span
            className={cn(
              "rounded-full fill-tertiary-100 p-2 group-hover:bg-green-100/20 group-hover:fill-green-100  group-active:bg-green-100/25 group-active:fill-green-100",
              "outline-offset-[-2px] group-focus-visible:bg-green-100/20 group-focus-visible:fill-green-100 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-green-100",
              "transition-colors duration-200 ease-in-out",
            )}
          >
            <RetweetIcon />
          </span>
          {tweet?._count?.retweets > 0 && (
            <span className="text-nano text-tertiary-100 group-hover:text-green-100 group-focus-visible:text-green-100 group-active:text-green-100">
              {tweet?._count?.retweets}
            </span>
          )}
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
                  retweetMutation.mutate({
                    tweetId: tweet?.id,
                    userId: session?.user?.id,
                  });
                }}
              >
                <RetweetIcon /> {hasRetweeted ? `Undo retweet` : `Retweet`}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setData({
                    in_reply_to_screen_name: null,
                    in_reply_to_status_id: null,
                    parent_tweet: null,
                    quoted_tweet: tweet,
                    placeholder: "Add a comment!",
                  });
                  setIsModalOpen(false);
                }}
              >
                <QuoteTweetIcon /> Quote Tweet
              </MenuItem>
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
