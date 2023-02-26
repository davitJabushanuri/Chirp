/* eslint-disable @next/next/no-img-element */
import { IUser } from "@/features/profile";

import { UserIcon } from "../../assets/user-icon";

import styles from "./styles/contact.module.scss";

export const Contact = ({ user }: { user: IUser }) => {
  return (
    <div className={styles.container}>
      <div className={styles.following}>
        <span className={styles.icon}>
          <UserIcon />
        </span>
        <span className={styles.text}>Following</span>
      </div>
      <div className={styles.user}>
        <div className={styles.avatar}>
          {user?.profile_image_url ? (
            <img src={user?.profile_image_url} alt="avatar" />
          ) : (
            <img src="/user_placeholder.png" alt="" />
          )}
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{user?.name}</p>
          <span className={styles.username}>@{user?.screen_name}</span>
        </div>
      </div>
    </div>
  );
};
