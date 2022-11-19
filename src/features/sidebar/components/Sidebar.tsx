import { Navbar } from "@/features/navbar";

import { Logo } from "./Logo";
import styles from "./styles/Sidebar.module.scss";
import { TweetButton } from "./TweetButton";
import { UserButton } from "./UserButton";

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
