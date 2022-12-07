import { Footer } from "@/components/layout/footer";
import { Connect } from "@/features/connect";
import { Search } from "@/features/search";
import { Trends } from "@/features/trends";

import styles from "./styles/aside.module.scss";

export const Aside = () => {
  return (
    <aside className={styles.container}>
      <div className={styles.search}>
        <Search />
      </div>
      <Trends />
      <Connect />
      <Footer />
    </aside>
  );
};
