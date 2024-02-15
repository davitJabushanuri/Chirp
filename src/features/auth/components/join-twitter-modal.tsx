"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { CommentIconFill } from "@/assets/comment-icon";
import { FollowIcon } from "@/assets/follow-icon";
import { HeartIconActive } from "@/assets/heart-icon";
import { MessageIcon } from "@/assets/message-icon";
import { RetweetIcon } from "@/assets/retweet-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { cn } from "@/utils/cn";

import { useJoinTwitter } from "../stores/useJoinTwitter";

export const JoinTwitterModal = () => {
  const router = useRouter();
  const data = useJoinTwitter((state) => state.data);
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const innerWidth = window.innerWidth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.2,
      }}
      className="fixed inset-0 rounded-xl bg-background p-2 text-center md:m-auto md:h-fit md:w-[clamp(480px,400px+20vw,600px)]"
    >
      <Tooltip text={innerWidth < 700 ? "Back" : "Close"}>
        <Button
          onClick={() => {
            setJoinTwitterData({
              isModalOpen: false,
              action: "",
              user: "",
            });
          }}
          aria-label="Back"
          className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
        >
          {innerWidth < 700 ? <BackArrowIcon /> : <CloseIcon />}
        </Button>
      </Tooltip>

      <div
        className={cn(
          "flex justify-center py-[1em] [&>svg]:size-[calc(var(--tw-fs-kilo)+var(--tw-fs-base))]",
          data.action === `comment` && "fill-blue-100",
          data.action === `retweet` && "fill-green-100",
          data.action === `like` && "fill-rose-100",
          data.action === `follow` && "fill-blue-100",
        )}
      >
        {data.action === `comment` ? (
          <CommentIconFill />
        ) : data.action === `retweet` ? (
          <RetweetIcon />
        ) : data.action === `like` ? (
          <HeartIconActive />
        ) : data.action === `follow` ? (
          <FollowIcon />
        ) : data.action === `message` ? (
          <MessageIcon />
        ) : null}
      </div>

      <div className="mx-auto my-[2em] max-w-[400px]">
        <h2 className="mb-[0.5em] text-h1 font-bold">
          {data.action === `comment`
            ? `Reply to join the conversation.`
            : data.action === `retweet`
              ? `Retweet to spread the word.`
              : data.action === `like`
                ? `Like a Tweet to share the love.`
                : data.action === `follow`
                  ? `Follow ${data.user} to see what they share on Twitter.`
                  : data.action === `message`
                    ? `Join Twitter now so you can share The New European - Think Without Borders’s Tweet privately.`
                    : `Don’t miss what’s happening`}
        </h2>
        <p className="mb-8 text-milli text-tertiary-100">
          {data.action === `comment`
            ? `Once you join Twitter, you can respond to ${data.user}’s Tweet.`
            : data.action === `retweet`
              ? `When you join Twitter, you can share ${data.user}’s Tweet with your followers.`
              : data.action === `like`
                ? `Join Twitter now to let ${data.user} know you like their Tweet.`
                : data.action === `follow`
                  ? `Sign up so you never miss their Tweets.`
                  : `People on Twitter are the first to know.`}
        </p>

        <Button
          role="link"
          onClick={() => {
            setJoinTwitterData({
              isModalOpen: false,
              action: "",
              user: "",
            });
            router.push(`/auth/signin`);
          }}
          className="mb-4 w-full bg-primary-100 p-[1em] text-base font-bold text-white-100 outline-offset-2 hover:bg-primary-200 focus-visible:bg-primary-200 focus-visible:outline-primary-200 active:bg-primary-300"
        >
          Log in
        </Button>

        <Button
          role="link"
          onClick={() => {
            setJoinTwitterData({
              isModalOpen: false,
              action: "",
              user: "",
            });
            router.push(`/auth/signin`);
          }}
          className="w-full border border-neutral-600 p-[1em] text-base font-bold text-primary-100 hover:bg-neutral-200 focus-visible:bg-neutral-100 active:bg-neutral-300"
        >
          Sign up
        </Button>
      </div>
    </motion.div>
  );
};
