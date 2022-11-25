import { setCookie } from "cookies-next";

import { Tick } from "@/assets/tick";
import { useTheme } from "@/stores/useTheme";

import styles from "./ThemeButton.module.scss";

interface IThemeButton {
  theme: string;
}

const ThemeButton = ({ theme }: IThemeButton) => {
  const title = theme.charAt(0).toUpperCase() + theme.slice(1);
  const currentTheme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);
  const SaveTheme = (theme: string) => {
    setCookie("theme", theme);
    setTheme(theme);
  };

  return (
    <button
      id={
        theme === "light"
          ? styles.light
          : theme === "dim"
          ? styles.dim
          : styles.dark
      }
      className={`${styles.container} ${
        `theme-${theme}` === currentTheme ? styles.active : ""
      }`}
      onClick={() => SaveTheme(`theme-${theme}`)}
    >
      <div className={styles.tickContainer}>
        <span className={styles.tick}>
          <Tick />
        </span>
      </div>
      <span className={styles.text}>{title}</span>
    </button>
  );
};

export default ThemeButton;
