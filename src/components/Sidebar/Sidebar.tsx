import { Logo } from "@/components/Elements/Logo";
import { TweetButton } from "@/components/Elements/TweetButton";
import { Navbar } from "@/features/navbar";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <Logo />
      <Navbar />
      <TweetButton />
    </aside>
  );
};

export default Sidebar;
