/* eslint-disable jsx-a11y/mouse-events-have-key-events */
"use client";
import { AnimatePresence } from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   let interval: any;
  //   console.log("isHovering", isHovering);
  //   console.log("timer", timer);

  //   if (isHovering && timer <= delay) {
  //     interval = setInterval(() => {
  //       setTimer((timer) => timer + 500);
  //     }, 500);
  //   } else {
  //     if (timer >= 0)
  //       interval = setInterval(() => {
  //         setTimer((timer) => {
  //           if (timer <= 0) {
  //             clearInterval(interval);
  //           }
  //           return timer - 500;
  //         });
  //       }, 500);
  //   }

  //   return () => clearInterval(interval);
  // }, [isHovering, timer]);

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.childrenWrapper}>
        {children}
      </div>

      <AnimatePresence>
        {showUserModal && <UserModal ref={ref} userId={userId} />}
      </AnimatePresence>
    </div>
  );
};
