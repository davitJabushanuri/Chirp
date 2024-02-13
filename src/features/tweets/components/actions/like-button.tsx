import { useSession } from "next-auth/react";

import { HeartIcon, HeartIconActive } from "@/assets/heart-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { useJoinTwitter } from "@/features/auth";
import { cn } from "@/utils/cn";

import { useLike } from "../../hooks/use-like";
import { ITweet } from "../../types";

export const LikeButton = ({
  tweet,
  smallIcons = true,
  showStats = false,
}: {
  tweet?: ITweet;
  smallIcons?: boolean;
  showStats?: boolean;
}) => {
  const { data: session } = useSession();
  const hasLiked = tweet?.likes?.some(
    (like) => like.user_id === session?.user?.id,
  );

  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const mutation = useLike();

  return (
    <Tooltip text={hasLiked ? "Unlike" : "Like"}>
      <Button
        aria-label={hasLiked ? "Unlike" : "Like"}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!session) {
            setJoinTwitterData({
              isModalOpen: true,
              action: "like",
              user: tweet?.author?.name || "user",
            });
          }
          mutation.mutate({ tweetId: tweet?.id, userId: session?.user?.id });
        }}
        className="group flex gap-[2px] p-0 text-nano focus-visible:outline-0"
      >
        <span
          className={cn(
            "rounded-full fill-tertiary-100 p-2 group-hover:bg-rose-100/20 group-hover:fill-rose-100  group-active:bg-rose-100/25 group-active:fill-rose-100",
            "outline-offset-[-2px] group-focus-visible:bg-rose-100/20 group-focus-visible:fill-rose-100 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-rose-100",
            "transition-colors duration-200 ease-in-out",
            hasLiked && "fill-rose-100",
          )}
        >
          {hasLiked ? <HeartIconActive /> : <HeartIcon />}
        </span>
        {tweet && tweet?._count?.likes > 0 && (
          <span
            className={cn(
              "text-tertiary-100 group-hover:text-rose-100 group-focus-visible:text-rose-100 group-active:text-rose-100",
              hasLiked && "text-rose-100",
            )}
          >
            {tweet?._count?.likes}
          </span>
        )}
      </Button>
    </Tooltip>
  );
};
