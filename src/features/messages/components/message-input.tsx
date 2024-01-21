import { createId } from "@paralleldrive/cuid2";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { EmojiIcon } from "@/assets/emoji-icon";
import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { CloseButton } from "@/components/elements/close-button";
import { IChosenImages } from "@/features/create-tweet";
import { socket } from "@/lib/socket-io";

import { SendIcon } from "../assets/send-icon";
import { IMessage } from "../types";

import styles from "./styles/message-input.module.scss";

export const MessageInput = ({
  conversation_id,
  sender_id,
  receiver_id,
}: {
  conversation_id: string | undefined;
  sender_id: string | undefined;
  receiver_id: string | undefined;
}) => {
  const [text, setText] = useState("");
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [chosenImage, setChosenImage] = useState<IChosenImages | null>(null);

  const queryClient = useQueryClient();

  const chooseImage = (e: any) => {
    const file = e.target.files[0];

    if (imageUploadRef.current) imageUploadRef.current.value = "";

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setChosenImage({
          url: reader.result,
          id: Math.random(),
          file: file,
        });
      };
    }
  };

  const onFocus = () => {
    // detect if the last message is from the current user
    const chat = queryClient.getQueryData<IMessage[]>([
      "chat",
      conversation_id,
    ]);
    if (!chat) return;
    const lastMessage = chat.at(-1);

    if (lastMessage?.sender_id === sender_id) return;

    socket.emit("status", { status: "seen", message_id: lastMessage?.id });
  };

  const createMessage = ({
    id,
    text,
    conversation_id,
    sender_id,
    receiver_id,
    image,
    file,
    status,
  }: {
    id: string;
    text: string;
    conversation_id: string | undefined;
    sender_id: string | undefined;
    receiver_id: string | undefined;
    image: string | ArrayBuffer | null;
    file: File | null;
    status: "sending" | "sent" | "seen" | "failed";
  }) => {
    return {
      id,
      text,
      conversation_id,
      sender_id,
      receiver_id,
      image,
      file,
      status,
    };
  };

  const onSubmit = async () => {
    const id = createId();

    const message = createMessage({
      id,
      text,
      conversation_id,
      sender_id,
      receiver_id,
      image: chosenImage?.url ?? null,
      file: chosenImage?.file ?? null,
      status: "sending",
    });

    queryClient.setQueryData(["chat", conversation_id], (oldData: any) => {
      return [...oldData, message];
    });

    socket.emit("message", {
      id,
      text,
      image: chosenImage ? chosenImage.file : null,
      conversation_id,
      sender_id,
      receiver_id,
    });

    setText("");
    setChosenImage(null);
  };

  return (
    <aside aria-label="Start a new message" className={styles.container}>
      {chosenImage && (
        <div className={styles.mediaPreview}>
          <div className={styles.imageContainer}>
            <CloseButton
              onClick={() => {
                setChosenImage(null);
              }}
              ariaLabel="Remove media"
              title="Remove"
            >
              <CloseIcon />
            </CloseButton>
            <Image
              src={(chosenImage.url as string) ?? ""}
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
      )}

      <div
        className={`${styles.inputContainer} ${
          chosenImage ? styles.active : ""
        }`}
      >
        {!chosenImage && (
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

        <input
          onFocus={() => {
            onFocus();
          }}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start a new message"
        />

        <button
          aria-label="Send"
          type="submit"
          onClick={onSubmit}
          disabled={text === "" && !chosenImage}
          className={styles.send}
        >
          <SendIcon />
        </button>
      </div>
    </aside>
  );
};
