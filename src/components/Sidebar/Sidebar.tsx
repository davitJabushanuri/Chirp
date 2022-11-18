import { Navbar } from "@/features/navbar";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <Navbar />
    </aside>
  );
};

export default Sidebar;
