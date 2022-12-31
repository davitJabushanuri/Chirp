import styles from "./styles/try-again.module.scss";

export const TryAgain = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>Something went wrong. Try reloading</h2>
      <button>
        <span className={styles.icon}></span>
        <span className={styles.text}>Reload</span>
      </button>
    </div>
  );
};
