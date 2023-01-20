import { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MessageIcon } from "@/assets/message-icon";
import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { BASE_URL } from "@/config";

import { AddToBookmarksIcon } from "../../assets/bookmark-icon";
import { CopyLinkIcon } from "../../assets/copy-link-icon";
import { ShareIcon } from "../../assets/share-icon";
import { ITweet } from "../../types";

import styles from "./styles/actions.module.scss";

export const ShareButton = ({ tweet }: { tweet: ITweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // get url of tweet
  // copy url to clipboard
  // open share modal
  const url = `${BASE_URL}/status/${tweet?.id}`;
  const notify = () => toast("Copied to clipboard");

  return (
    <div className={styles.container}>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        transition={Slide}
        closeButton={false}
        closeOnClick={false}
        className={styles.toastContainer}
        toastClassName={styles.toast}
        bodyClassName={styles.toastBody}
      />

      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(url);
              setIsModalOpen(false);
              notify();
            }}
          >
            <Action icon={<CopyLinkIcon />} text={`Copy link to Tweet`} />
          </button>

          <button>
            <Action icon={<ShareIcon />} text={`Share Tweet via ...`} />
          </button>

          <button>
            <Action icon={<MessageIcon />} text={`Send via Direct Message`} />
          </button>

          <button>
            <Action icon={<AddToBookmarksIcon />} text={`Bookmark`} />
          </button>
        </ActionsModal>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={styles.share}
      >
        <span className={styles.icon}>
          <ShareIcon />
        </span>
      </button>
    </div>
  );
};
