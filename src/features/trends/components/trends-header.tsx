import { Gear } from "@/assets/gear-icon";
import { BackButton } from "@/components/elements/back-button";

import styles from "./styles/trends-header.module.scss";

export const TrendsHeader = () => {
  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>Trends</h1>
      <button className={styles.settings}>
        <Gear />
      </button>
    </div>
  );
};
