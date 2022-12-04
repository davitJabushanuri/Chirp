import { Footer } from "@/components/layout/footer";
import { Connect } from "@/features/connect";
import { Search } from "@/features/search";
import { Trends } from "@/features/trends";

import styles from "./styles/aside.module.scss";

export const Aside = () => {
  return (
    <aside className={styles.container}>
      <Search />
      <Trends />
      <Connect />
      <Footer />
    </aside>
  );
};
