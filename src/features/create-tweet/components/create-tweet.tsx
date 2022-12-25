/* eslint-disable @next/next/no-img-element */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { LocationIcon } from "@/assets/location-icon";
import supabase from "@/utils/supabaseClient";

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
}

export const CreateTweet = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ text, userId }: { text: string; userId: string }) =>
      postTweet({ text, userId }),

    {
      onSuccess: () => {
        setText("");
        queryClient.invalidateQueries(["tweets"]);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const [text, setText] = useState("");
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);
  console.log(chosenImages);

  const chooseImage = async () => {
    imageUploadRef.current?.click();
    const file = imageUploadRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setChosenImages([
          ...chosenImages,
          {
            url: reader.result,
            id: Math.random(),
          },
        ]);
      };
    }

    // if (file) {
    //   const { data, error } = await supabase.storage
    //     .from("twitter-v2")
    //     .upload(`image`, file, {
    //       cacheControl: "3600",
    //       upsert: false,
    //     });

    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log(data);
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <User />
      </div>

      <div className={styles.tweet}>
        <div className={styles.text}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
          />
          <input
            className={styles.fileInput}
            type="file"
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
              onClick={() => chooseImage()}
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
                mutation.mutate({ text: text, userId: session?.user?.id })
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
  );
};
