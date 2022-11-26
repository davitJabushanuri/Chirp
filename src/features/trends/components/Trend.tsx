import { Options } from "@/components/elements/options";

import { iTrendProps } from "../types";

import styles from "./styles/Trend.module.scss";

const Trend = ({
  ranking = 1,
  title = "loading",
  tweets = "0",
}: iTrendProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.trend}>
        <div className={styles.stats}>
          <span>{ranking}</span> <span className={styles.dot}></span>
          <span>Trending</span>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.stats}>{tweets} Tweets</div>
      </div>
      <div className={styles.options}>
        <Options />
      </div>
    </div>
  );
};

export default Trend;
