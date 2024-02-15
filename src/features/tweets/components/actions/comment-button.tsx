"use client";
import { useSession } from "next-auth/react";

import { CommentIcon } from "@/assets/comment-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { useJoinTwitter } from "@/features/auth";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";
import { cn } from "@/utils/cn";

import { ITweet } from "../../types";

export const CommentButton = ({
  tweet,
  showStats = false,
}: {
  tweet: ITweet;
  showStats: boolean;
}) => {
  const { data: session } = useSession();

  const setData = useCreateTweetModal((state) => state.setData);
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  return (
    <Tooltip text="Reply">
      <Button
        aria-label="Reply"
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();

          if (!session) {
            setJoinTwitterData({
              isModalOpen: true,
              action: "comment",
              user: tweet?.author?.name,
            });
          } else {
            setData({
              quoted_tweet: null,
              parent_tweet: tweet,
              in_reply_to_screen_name:
                tweet?.author?.email?.split("@")[0] ?? null,
              in_reply_to_status_id: tweet?.id,
              placeholder: `Tweet your reply`,
            });
          }
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
          <CommentIcon />
        </span>
        {tweet?._count?.comments > 0 && (
          <span className="text-nano text-tertiary-100 group-hover:text-blue-100 group-focus-visible:text-blue-100 group-active:text-blue-100">
            {tweet?._count?.comments}
          </span>
        )}
      </Button>
    </Tooltip>
  );
};
