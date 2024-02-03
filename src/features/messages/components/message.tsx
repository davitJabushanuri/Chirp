import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { socket } from "@/lib/socket-io";

import { IMessage } from "../types";

import styles from "./styles/message.module.scss";

export const Message = ({
  message,
  show_status,
}: {
  message: IMessage;
  show_status: boolean;
}) => {
  const { data: session } = useSession();
  const isSender = session?.user?.id === message.sender_id;

  const queryClient = useQueryClient();

  const resendMessage = () => {
    const newMessage = {
      id: message.id,
      text: message.text,
      conversation_id: message.conversation_id,
      sender_id: message.sender_id,
      receiver_id: message.receiver_id,
      image: message.file,
    };

    socket.emit("message", newMessage);
  };

  const deleteMessage = () => {
    queryClient.setQueryData(
      ["chat", message.conversation_id],
      (oldData: IMessage[]) => {
        const newData = oldData.filter((msg) => msg.id !== message.id);
        return newData;
      },
    );
  };

  return (
    <div className={`${styles.container} ${isSender ? styles.isSender : ""} `}>
      {message.image && (
        <div className={styles.media}>
          <Image
            src={message.image}
            alt=""
            width={message.image_width ?? 0}
            height={message.image_height ?? 0}
          />
        </div>
      )}

      {message.text && (
        <div
          className={`${styles.text} ${message.status === "failed" ? styles.failed : ""}`}
        >
          <p>{message?.text}</p>
        </div>
      )}

      <div className={styles.info}>
        {message.status !== "failed" && (
          <div className={styles.time}>
            {dayjs(message?.created_at).format("h:mm A")}
          </div>
        )}
        {message.status === "failed" ? (
          <div className={styles.delivered}>Message failed to send</div>
        ) : (
          show_status && (
            <div className={styles.delivered}>
              {message.status === "sending" ? "sending..." : message.status}
            </div>
          )
        )}
      </div>
      {message.status === "failed" && (
        <div className={styles.failedActions}>
          <button onClick={resendMessage} className={styles.tryAgain}>
            Try again
          </button>
          <span>·</span>
          <button onClick={deleteMessage} className={styles.delete}>
            Delete for you
          </button>
        </div>
      )}
    </div>
  );
};
