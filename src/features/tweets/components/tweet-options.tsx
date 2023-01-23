/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSession } from "next-auth/react";
import { useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { ITweet } from "@/features/tweets";

import { BlockIcon } from "../assets/block-icon";
import { CommentIcon } from "../assets/comment-icon";
import { EmbedIcon } from "../assets/embed-icon";
import { UnfollowIcon } from "../assets/follow-icon";
import { MuteIcon } from "../assets/mute-icon";
import { PinIcon } from "../assets/pin-icon";
import { ReportIcon } from "../assets/report-icon";
import { SadFaceIcon } from "../assets/sad-face-icon";
import { TrashIcon } from "../assets/trash-icon";

import styles from "./styles/tweet-options.module.scss";

export const TweetOptions = ({ tweet }: { tweet: ITweet }) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.container}
    >
      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          {tweet?.author?.id === session?.user?.id ? (
            <TweetAuthorActions tweet={tweet} />
          ) : (
            <TweetVisitorActions tweet={tweet} />
          )}
        </ActionsModal>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.optionsButton}
      >
        <DotIcon />
      </button>
    </div>
  );
};

const TweetAuthorActions = ({ tweet }: { tweet: ITweet }) => {
  return (
    <>
      <button className={styles.delete}>
        <Action icon={<TrashIcon />} text={`Delete`} />
      </button>

      <button>
        <Action icon={<PinIcon />} text={`Pin to your profile`} />
      </button>

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
