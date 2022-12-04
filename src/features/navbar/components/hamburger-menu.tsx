/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from "next/image";
import Link from "next/link";

import { CloseIcon } from "@/assets/close-icon";
import Avatar from "@/assets/user_placeholder.png";
import { useHamburger } from "@/stores/useHamburger";

import { Bookmark } from "../assets/bookmark-icon";
import { Gear } from "../assets/gear-icon";
import { PlusIcon } from "../assets/plus-icon";
import { User } from "../assets/user-icon";

import styles from "./styles/hamburger-menu.module.scss";

export const HamburgerMenu = () => {
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);
  const closeHamburger = useHamburger((state) => state.closeHamburger);

  return (
    <div
      onClick={() => closeHamburger()}
      className={`${styles.container} 
    ${isHamburgerOpen ? styles.visible : styles.hidden}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.hamburger}>
        <div className={styles.actions}>
          <h1>Account info</h1>
          <button className={styles.close} onClick={() => closeHamburger()}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.profile}>
          <button className={styles.image}>
            <Image src={Avatar} alt="user avatar" />
          </button>
          <p className={styles.name}>John</p>
          <span className={styles.username}>@JohnDoe</span>
          <div className={styles.stats}>
            <span className={styles.following}>
              <strong>155</strong> Following
            </span>
            <span className={styles.followers}>
              <strong>40</strong> Followers
            </span>
            <button className={styles.switchAccount}>
              <PlusIcon />
            </button>
          </div>
        </div>

        <nav>
          <HamburgerLink title="Profile" icon={<User />} />
          <HamburgerLink title="Bookmarks" icon={<Bookmark />} />
          <HamburgerLink title="Settings" icon={<Gear />} />
        </nav>
      </div>
    </div>
  );
};

const HamburgerLink = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  const closeHamburger = useHamburger((state) => state.closeHamburger);

  return (
    <Link href={`/${title.toLowerCase()}`}>
      <div onClick={() => closeHamburger()} className={styles.link}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.text}>{title}</span>
      </div>
    </Link>
  );
};
