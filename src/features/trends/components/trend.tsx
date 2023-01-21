import { DotIcon } from "@/assets/dot-icon";

import { iTrendProps } from "../types";

import styles from "./styles/trend.module.scss";

const Trend = ({ ranking = 1, title, tweets = 1 }: iTrendProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.trend}>
        <div className={styles.stats}>
          <span>{ranking}</span> <span className={styles.dot}></span>
          <span>Trending</span>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.stats}>
          {tweets} {tweets === 1 ? "tweet" : "tweets"}
        </div>
      </div>
      <div className={styles.options}>
        <DotIcon />
      </div>
    </div>
  );
};

export default Trend;
