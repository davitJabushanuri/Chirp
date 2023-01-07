import styles from "./styles/trends.module.scss";
import Trend from "./trend";

export const Trends = () => {
  return (
    <div className={styles.container}>
      <h1>Trends</h1>

      <div className={styles.trends}>
        <Trend ranking={1} title="#FIFAWorldCup" tweets="861K" />
        <Trend ranking={2} title="#Qatar2022" tweets="213K" />
        <Trend ranking={3} title="#Elon" tweets="826K" />
        <Trend ranking={4} title="#casino" tweets="66.8K" />
        <Trend ranking={5} title="#Mastodon" tweets="45.8K" />
      </div>

      <button>Show more</button>
    </div>
  );
};
