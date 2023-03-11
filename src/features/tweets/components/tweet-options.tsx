/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { CommentIcon } from "@/assets/comment-icon";
import { DotIcon } from "@/assets/dot-icon";
import { ReportIcon } from "@/assets/report-icon";
import { SadFaceIcon } from "@/assets/sad-face-icon";
import { TrashIcon } from "@/assets/trash-icon";
import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { useUser } from "@/features/profile";
import { ITweet } from "@/features/tweets";

import { BlockIcon } from "../assets/block-icon";
import { EmbedIcon } from "../assets/embed-icon";
import { UnfollowIcon } from "../assets/follow-icon";
import { MuteIcon } from "../assets/mute-icon";
import { PinIcon } from "../assets/pin-icon";
import { usePinTweet } from "../hooks/use-pin-tweet";

import { DeleteTweetModal } from "./delete-tweet-modal";
import styles from "./styles/tweet-options.module.scss";

export const TweetOptions = ({ tweet }: { tweet: ITweet }) => {
  const { data: session } = useSession();
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.container}
    >
      {isActionsModalOpen && (
        <ActionsModal setIsModalOpen={setIsActionsModalOpen}>
          {tweet?.author?.id === session?.user?.id ? (
            <TweetAuthorActions
              tweet={tweet}
              setIsActionsModalOpen={setIsActionsModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          ) : (
            <TweetVisitorActions tweet={tweet} />
          )}
        </ActionsModal>
      )}
      <button
        onClick={() => setIsActionsModalOpen(true)}
        className={styles.optionsButton}
      >
        <DotIcon />
      </button>

      {isDeleteModalOpen && (
        <DeleteTweetModal
          tweet={tweet}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsActionsModalOpen={setIsActionsModalOpen}
        />
      )}
    </div>
  );
};

const TweetAuthorActions = ({
  tweet,
  setIsActionsModalOpen,
  setIsDeleteModalOpen,
}: {
  tweet: ITweet;
  setIsActionsModalOpen: (value: boolean) => void;
  setIsDeleteModalOpen: (value: boolean) => void;
}) => {
  const { data: session } = useSession();
  const { data: user } = useUser(session?.user?.id);
  const pinMutation = usePinTweet();

  return (
    <>
      <button
        onClick={() => {
          setIsActionsModalOpen(false);
          setIsDeleteModalOpen(true);
        }}
        className={styles.delete}
      >
        <Action icon={<TrashIcon />} text={`Delete`} />
      </button>

      {tweet?.id === user?.pinned_tweet?.id ? (
        <button
          onClick={() => {
            pinMutation.mutate({
              tweetId: tweet.id,
              userId: session?.user?.id,
              action: "unpin",
            });
            setIsActionsModalOpen(false);
          }}
        >
          <Action icon={<PinIcon />} text={`Unpin to your profile`} />
        </button>
      ) : (
        <button
          onClick={() => {
            pinMutation.mutate({
              tweetId: tweet.id,
              userId: session?.user?.id,
              action: "pin",
            });
            setIsActionsModalOpen(false);
          }}
        >
          <Action icon={<PinIcon />} text={`Pin to your profile`} />
        </button>
      )}

      <button>
        <Action icon={<CommentIcon />} text={`Change who can reply`} />
      </button>

      <button>
        <Action icon={<EmbedIcon />} text={`Embed Tweet`} />
      </button>
    </>
  );
};

const TweetVisitorActions = ({ tweet }: { tweet: ITweet }) => {
  return (
    <>
      <button>
        <Action icon={<SadFaceIcon />} text={`Not interested in this Tweet`} />
      </button>

      <button>
        <Action
          icon={<UnfollowIcon />}
          text={`Unfollow @${tweet?.author?.email?.split("@")[0]}`}
        />
      </button>

      <button>
        <Action
          icon={<MuteIcon />}
          text={`Mute @${tweet?.author?.email?.split("@")[0]}`}
        />
      </button>

      <button>
        <Action
          icon={<BlockIcon />}
          text={`Block @${tweet?.author?.email?.split("@")[0]}`}
        />
      </button>

      <button>
        <Action icon={<EmbedIcon />} text={`Embed Tweet`} />
      </button>

      <button>
        <Action icon={<ReportIcon />} text={`Report Tweet`} />
      </button>
    </>
  );
};
