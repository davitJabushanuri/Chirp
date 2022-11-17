import { BellActive, Bell } from "../assets/bell";
import { Bookmark, BookmarkActive } from "../assets/bookmark";
import { Envelope, EnvelopeActive } from "../assets/envelope";
import { Gear } from "../assets/gear";
import { Hashtag, HashtagActive } from "../assets/hashtag";
import { HomeActive, Home } from "../assets/home";
import { User, UserActive } from "../assets/user";

import styles from "./styles/Navbar.module.scss";

export const Navbar = () => {
  return (
    <div style={{ color: "white" }} className={styles.container}>
      <User color="#ccc" />
      <UserActive color="#ccc" />
    </div>
  );
};
