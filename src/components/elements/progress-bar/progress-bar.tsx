import styles from "./styles/progressbar.module.scss";

export const ProgressBar = () => {
  return (
    <div className={styles.progressbar} role={`progressbar`}>
      <span></span>
    </div>
  );
};
