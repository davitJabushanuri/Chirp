/* eslint-disable jsx-a11y/mouse-events-have-key-events */
"use client";

import { useRef, useState } from "react";

import styles from "./styles/user-modal-wrapper.module.scss";
import { UserModal } from "./user-modal";

export const UserModalWrapper = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const [showUserModal, setShowUserModal] = useState(false);
  const timerRef = useRef<any>(null);

  // TODO: refactor this method to show the modal only when the mouse is over the name for more than 1 second
  const handleNameMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setShowUserModal(true);
    }, 1000);
  };

  // TODO: refactor this method to hide the modal only when the mouse is not over the name for more than 1 second
  const handleNameMouseLeave = () => {
    setShowUserModal(false);
    clearTimeout(timerRef.current);
  };

  return (
    <div tabIndex={-1} className={styles.container}>
      <div
        onMouseEnter={handleNameMouseEnter}
        onMouseLeave={handleNameMouseLeave}
        className={styles.childrenWrapper}
      >
        {children}
      </div>

      {showUserModal && <UserModal userId={userId} />}
    </div>
  );
};
