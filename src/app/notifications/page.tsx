"use client";

import { NotificationsHeader } from "@/components/layout/header";

import styles from "./styles/notifications.module.scss";

const Notifications = () => {
  return (
    <div className={styles.container}>
      <NotificationsHeader />
    </div>
  );
};

export default Notifications;
