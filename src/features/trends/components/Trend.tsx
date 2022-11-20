import { iTrendProps } from "../types";

import { Dots } from "./assets/dots";
import styles from "./styles/Trend.module.scss";

const Trend = ({ ranking, title, tweets }: iTrendProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.trend}>
        <div className={styles.stats}>
          <span>{ranking ?? `1`}</span> <span className={styles.dot}></span>
          <span>Trending</span>
        </div>
        <div className={styles.title}>{title ?? `#WorldCup`}</div>
        <div className={styles.stats}>{tweets ?? `1.2M`} Tweets</div>
      </div>
      <div className={styles.options}>
        <Dots />
      </div>
    </div>
  );
};

export default Trend;
