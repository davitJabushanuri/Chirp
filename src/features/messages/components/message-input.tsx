import Image from "next/image";
import { useRef, useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { EmojiIcon } from "@/assets/emoji-icon";
import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { CloseButton } from "@/components/elements/close-button";
import { IChosenImages } from "@/features/create-tweet";

import { SendIcon } from "../assets/send-icon";
import { useCreateMessage } from "../hooks/use-create-message";

import styles from "./styles/message-input.module.scss";

export const MessageInput = ({
  conversationId,
  senderId,
  receiverId,
}: {
  conversationId: string | undefined;
  senderId: string | undefined;
  receiverId: string | undefined;
}) => {
  const [text, setText] = useState("");
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);

  const mutation = useCreateMessage({
    setText,
    setChosenImages,
  });

  const chooseImage = async (event: any) => {
    const file = event.target.files[0];

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
    <div className={styles.container}>
      {chosenImages?.length > 0 && (
        <div className={styles.mediaPreview}>
          {chosenImages.map((image) => {
            return (
              <div key={image.id} className={styles.imageContainer}>
                <CloseButton
                  onClick={() => {
                    setChosenImages(
                      chosenImages.filter((img) => img.id !== image.id),
                    );
                  }}
                  ariaLabel="Remove media"
                  title="Remove"
                >
                  <CloseIcon />
                </CloseButton>
                <Image
                  src={image.url as string}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            );
          })}
        </div>
      )}

      <div
        className={`${styles.inputContainer} ${
          chosenImages?.length > 0 ? styles.active : ""
        }`}
      >
        {chosenImages?.length <= 0 && (
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => imageUploadRef.current?.click()}
              className={styles.icon}
            >
              <input
                className={styles.fileInput}
                type="file"
                onChange={chooseImage}
                ref={imageUploadRef}
              />
              <ImageIcon />
            </button>

            <button type="button" className={styles.icon}>
              <GifIcon />
            </button>

            <button type="button" className={styles.icon}>
              <EmojiIcon />
            </button>
          </div>
        )}

        <div className={styles.input}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start a new message"
          />
        </div>

        <div className={styles.send}>
          <button
            type="submit"
            onClick={() => {
              mutation.mutate({
                text: text,
                files: chosenImages.map((img) => img.file),
                conversationId: conversationId,
                senderId: senderId,
                receiverId: receiverId,
              });
            }}
            disabled={
              (text === "" && chosenImages.length <= 0) ||
              mutation.status === "pending"
            }
            className={styles.icon}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
