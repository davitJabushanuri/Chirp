import { Tweets } from "@/features/Tweets";

import styles from "./landingPage.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Tweets />
    </div>
  );
}
