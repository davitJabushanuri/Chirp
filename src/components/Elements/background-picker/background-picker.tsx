import styles from "./styles/background-picker.module.scss";
import ThemeButton from "./theme-button";

export const BackgroundPicker = ({ theme }: { theme: string | undefined }) => {
  return (
    <div className={styles.container}>
      <h2>Background</h2>
      <div className={styles.themes}>
        <ThemeButton activeTheme={theme} theme="light" />
        <ThemeButton activeTheme={theme} theme="dim" />
        <ThemeButton activeTheme={theme} theme="dark" />
      </div>
    </div>
  );
};
