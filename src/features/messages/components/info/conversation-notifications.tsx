"use client";

import { useState } from "react";

import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { IUser } from "@/features/profile";

import styles from "./styles/conversation-notifications.module.scss";

export const ConversationNotifications = ({
  member,
}: {
  member: IUser | undefined;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snooze, setSnooze] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Notifications</h1>
      <div className={styles.checkboxContainer}>
        <span>Snooze notifications from {member?.name}</span>
        <div className={styles.checkbox}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              onChange={() => {
                snooze ? setSnooze(false) : setIsModalOpen(true);
              }}
              checked={snooze}
              id="cbx-3"
            />
            <label htmlFor="cbx-3" className={styles["toggle"]}>
              <span></span>
            </label>
          </div>

          {isModalOpen && (
            <ActionsModal setIsModalOpen={setIsModalOpen}>
              <button
                onClick={() => {
                  setSnooze(true);
                  setIsModalOpen(false);
                }}
              >
                <Action icon={``} text={`1 hour`} />
              </button>

              <button
                onClick={() => {
                  setSnooze(true);
                  setIsModalOpen(false);
                }}
              >
                <Action icon={``} text={`8 hours`} />
              </button>

              <button
                onClick={() => {
                  setSnooze(true);
                  setIsModalOpen(false);
                }}
              >
                <Action icon={``} text={`1 week`} />
              </button>

              <button
                onClick={() => {
                  setSnooze(true);
                  setIsModalOpen(false);
                }}
              >
                <Action icon={``} text={`Forever`} />
              </button>
            </ActionsModal>
          )}
        </div>
      </div>
    </div>
  );
};
