import styles from "./styles/search-header.module.scss";

export const SearchHeader = () => {
  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.navItem}>
          <span className={styles.placeholder} />
          <span className={styles.text}>Top</span>
          <span className={styles.border} />
        </div>

        <div className={styles.navItem}>
          <span className={styles.placeholder} />
          <span className={styles.text}>Latest</span>
          <span className={styles.border} />
        </div>

        <div className={styles.navItem}>
          <span className={styles.placeholder} />
          <span className={styles.text}>People</span>
          <span className={styles.border} />
        </div>

        <div className={styles.navItem}>
          <span className={styles.placeholder} />
          <span className={styles.text}>Photos</span>
          <span className={styles.border} />
        </div>

        <div className={styles.navItem}>
          <span className={styles.placeholder} />
          <span className={styles.text}>Videos</span>
          <span className={styles.border} />
        </div>
      </nav>
    </div>
  );
};
