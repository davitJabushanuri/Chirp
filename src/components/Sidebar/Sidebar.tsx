import { Navbar } from "@/features/navbar";

import Logo from "../Elements/Logo/Logo";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <Logo />
      <Navbar />
    </aside>
  );
};

export default Sidebar;
