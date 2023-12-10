"use client";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { IUser } from "@/features/profile";

import styles from "./styles/conversation-notifications.module.scss";

export const ConversationNotifications = ({
  member,
}: {
  member: IUser | undefined;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snooze, setSnooze] = useState(false);
  const buttonRef = useRef<HTMLLabelElement | null>(null);

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
            <label ref={buttonRef} htmlFor="cbx-3" className={styles["toggle"]}>
              <span></span>
            </label>
          </div>

          <AnimatePresence>
            {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)} background="none">
                <Menu
                  onClose={() => setIsModalOpen(false)}
                  trackScroll={true}
                  ref={buttonRef as any}
                >
                  <MenuItem
                    onClick={() => {
                      setSnooze(true);
                      setIsModalOpen(false);
                    }}
                  >
                    1 hour
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setSnooze(true);
                      setIsModalOpen(false);
                    }}
                  >
                    8 hours
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setSnooze(true);
                      setIsModalOpen(false);
                    }}
                  >
                    1 week
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setSnooze(true);
                      setIsModalOpen(false);
                    }}
                  >
                    Forever
                  </MenuItem>
                </Menu>
              </Modal>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
