import { Navbar } from "@/features/navbar";

import styles from "./landingPage.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Hello World</h1>
    </div>
  );
}
