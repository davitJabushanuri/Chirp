import styles from "./styles/background-picker.module.scss";
import ThemeButton from "./theme-button";

export const BackgroundPicker = () => {
  return (
    <div className={styles.container}>
      <h2>Background</h2>
      <div className={styles.themes}>
        <ThemeButton theme="light" />
        <ThemeButton theme="dim" />
        <ThemeButton theme="dark" />
      </div>
    </div>
  );
};
