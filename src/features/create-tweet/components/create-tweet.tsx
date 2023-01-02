/* eslint-disable @next/next/no-img-element */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { LocationIcon } from "@/assets/location-icon";
import { useTweetModal } from "@/stores/useTweetModal";

import { postTweet } from "../api/post-tweet";
import { EmojiIcon } from "../assets/emoji-icon";
import { GifIcon } from "../assets/gif-icon";
import { ImageIcon } from "../assets/image-icon";
import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";

import Action from "./action";
import styles from "./styles/create-tweet.module.scss";
import User from "./user";

interface IChosenImages {
  url: string | ArrayBuffer | null;
  id: number;
  file: File;
}

export const CreateTweet = ({
  in_reply_to_status_id,
  in_reply_to_user_screen_name,
  placeholder = `What's happening?`,
}: {
  in_reply_to_status_id?: string;
  in_reply_to_user_screen_name?: string;
  placeholder?: string;
}) => {
  const { data: session } = useSession();
  const closeModal = useTweetModal((state) => state.closeModal);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({
      text,
      userId,
      files,
      in_reply_to_user_screen_name,
      in_reply_to_status_id,
    }: {
      text: string;
      userId: string;
      files: File[];
      in_reply_to_user_screen_name?: string | null;
      in_reply_to_status_id?: string | null;
    }) => {
      return postTweet({
        text,
        userId,
        files,
        in_reply_to_user_screen_name,
        in_reply_to_status_id,
      });
    },

    {
      onSuccess: async () => {
        console.log("success");
        queryClient.invalidateQueries(["tweets"]);
        queryClient.invalidateQueries(["users", session?.user.id]);
        in_reply_to_user_screen_name &&
          queryClient.invalidateQueries(["comments"]);
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        setText("");
        setChosenImages([]);
        closeModal();
      },
    },
  );

  const [text, setText] = useState("");
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);

  const chooseImage = async () => {
    imageUploadRef.current?.click();
    const file = imageUploadRef.current?.files?.[0];

    // reset file input
    if (imageUploadRef.current) imageUploadRef.current.value = "";

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setChosenImages([
          ...chosenImages,
          {
            url: reader.result,
            id: Math.random(),
            file: file,
          },
        ]);
      };
    }
  };

  return (
    <>
      {in_reply_to_user_screen_name && (
        <div className={styles.replying}>
          <span className={styles.replyingTo}>Replying to</span>
          <span className={styles.replyingToUsername}>
            @{in_reply_to_user_screen_name}
          </span>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.user}>
          <User />
        </div>
        <div className={styles.tweet}>
          <div className={styles.text}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
            />
            <input
              className={styles.fileInput}
              type="file"
              onChange={chooseImage}
              ref={imageUploadRef}
            />
            <div
              className={`${styles.chosenImages} ${
                chosenImages.length === 1
                  ? styles.one
                  : chosenImages.length === 2
                  ? styles.two
                  : chosenImages.length === 3
                  ? styles.three
                  : chosenImages.length === 4
                  ? styles.four
                  : ""
              }`}
            >
              {chosenImages.map((image) => {
                return (
                  <div key={image.id} className={styles.imageContainer}>
                    <button
                      onClick={() => {
                        setChosenImages(
                          chosenImages.filter((img) => img.id !== image.id),
                        );
                      }}
                      className={styles.close}
                    >
                      <CloseIcon />
                    </button>
                    <img src={image.url as string} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.media}>
              <button
                disabled={chosenImages.length >= 4}
                onClick={() => imageUploadRef.current?.click()}
              >
                <Action icon={<ImageIcon />} />
              </button>
              <Action icon={<GifIcon />} />
              <span className={styles.hide}>
                <Action icon={<PollIcon />} />
              </span>
              <Action icon={<EmojiIcon />} />
              <span className={styles.hide}>
                <Action icon={<ScheduleIcon />} />
              </span>
              <Action icon={<LocationIcon />} />
            </div>
            <div className={styles.tweetButton}>
              <button
                onClick={() =>
                  mutation.mutate({
                    text: text,
                    userId: session?.user?.id,
                    files: chosenImages.map((img) => img.file),
                    in_reply_to_user_screen_name: in_reply_to_user_screen_name
                      ? in_reply_to_user_screen_name
                      : null,
                    in_reply_to_status_id: in_reply_to_status_id
                      ? in_reply_to_status_id
                      : null,
                  })
                }
                disabled={text.length === 0}
                className={styles.button}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
