import Image from "next/image";

import Avatar from "@/assets/user_placeholder.png";

import { Options } from "../assets/options";

import styles from "./styles/UserButton.module.scss";

export const UserButton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          className={styles.image}
          src={Avatar}
          alt="avatar"
          placeholder="blur"
        />
      </div>
      <div className={styles.userInfo}>
        <span className={styles.name}>John Doe</span>
        <span className={styles.username}>@johndoe</span>
      </div>
      <div className={styles.options}>
        <Options />
      </div>
    </div>
  );
};