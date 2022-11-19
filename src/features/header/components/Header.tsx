import Image from "next/image";

import Avatar from "@/assets/user_placeholder.png";

import { Star } from "../assets/star";

import styles from "./styles/Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.image}
          src={Avatar}
          alt="avatar"
          placeholder="blur"
        />
      </div>

      <div className={styles.home}>Home</div>

      <div className={styles.star}>
        <Star />
      </div>
    </div>
  );
};
