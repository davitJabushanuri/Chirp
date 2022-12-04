import { StarIcon } from "../assets/star-icon";

import styles from "./styles/home-header.module.scss";

export const HomeHeader = () => {
  return (
    <div className={styles.container}>
      <a href="#home" className={styles.home}>
        Home
      </a>

      <div className={styles.star}>
        <StarIcon />
      </div>
    </div>
  );
};
