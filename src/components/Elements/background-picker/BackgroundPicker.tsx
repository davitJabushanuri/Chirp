import styles from "./BackgroundPicker.module.scss";
import ThemeButton from "./ThemeButton";

export const BackgroundPicker = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h2>Background</h2>
        <div className={styles.themes}>
          <ThemeButton theme="light" />
          <ThemeButton theme="dim" />
          <ThemeButton theme="dark" />
        </div>
      </div>
    </div>
  );
};
