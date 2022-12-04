import Image from "next/image";

import Avatar from "@/assets/user_placeholder.png";
import { useHamburger } from "@/stores/useHamburger";

import styles from "./styles/hamburger-button.module.scss";

export const HamburgerButton = () => {
  const openHamburger = useHamburger((state) => state.openHamburger);

  return (
    <button onClick={() => openHamburger()} className={styles.container}>
      <Image className={styles.image} src={Avatar} alt="avatar" />
    </button>
  );
};
