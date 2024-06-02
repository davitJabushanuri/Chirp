import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { socket } from "@/lib/socket-io";

import { IMessage } from "../types";
import { removeMessageFromQueryData } from "../utils/remove-message-from-query";
import { resendMessage } from "../utils/resend-message";

import styles from "./styles/message.module.scss";

export const Message = ({
  message,
  show_status = false,
}: {
  message: IMessage;
  show_status?: boolean;
}) => {
  const { data: session } = useSession();
  const isSender = session?.user?.id === message.sender_id;

  const queryClient = useQueryClient();

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
          <button
            onClick={() => resendMessage({ message, socket, queryClient })}
            className={styles.tryAgain}
          >
            Try again
          </button>
          <span>·</span>
          <button
            onClick={() =>
              removeMessageFromQueryData(
                message.id,
                message.conversation_id,
                queryClient,
              )
            }
            className={styles.delete}
          >
            Delete for you
          </button>
        </div>
      )}
    </div>
  );
};
