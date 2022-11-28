import { HamburgerButton } from "@/components/elements/hamburger-button";

import { Star } from "../assets/star";

import styles from "./styles/Header.module.scss";

export const Header = () => {
  return (
    <div id="home" className={styles.container}>
      <HamburgerButton />

      <a href="#home" className={styles.home}>
        Home
      </a>

      <div className={styles.star}>
        <Star />
      </div>
    </div>
  );
};
