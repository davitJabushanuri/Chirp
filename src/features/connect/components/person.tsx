import Image from "next/image";

import Avatar from "@/assets/user_placeholder.png";

import { IPersonProps } from "../types";

import styles from "./styles/person.module.scss";

export const Person = ({ name, username, image }: IPersonProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.person}>
        <div className={styles.avatar}>
          <Image className={styles.image} src={image || Avatar} alt={name} />
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <span className={styles.username}>{username}</span>
        </div>
      </div>
      <button className={styles.followButton}>Follow</button>
    </div>
  );
};
