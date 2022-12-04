import { Navbar } from "@/features/navbar";

import { Logo } from "./logo";
import styles from "./styles/sidebar.module.scss";
import { TweetButton } from "./tweet-button";
import { UserButton } from "./user-button";

export const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <Logo />
      <Navbar />
      <TweetButton />
      <UserButton />
    </aside>
  );
};
