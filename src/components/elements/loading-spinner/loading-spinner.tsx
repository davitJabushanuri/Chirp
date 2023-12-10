import styles from "./styles/loading-spinner.module.scss";

export const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loading}></span>
    </div>
  );
};
