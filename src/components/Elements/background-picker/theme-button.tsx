import { setCookie } from "cookies-next";

import { Tick } from "@/assets/tick";
import { useTheme } from "@/stores/useTheme";

import styles from "./styles/theme-button.module.scss";

interface IThemeButton {
  theme: string;
}

const ThemeButton = ({ theme }: IThemeButton) => {
  const title = theme.charAt(0).toUpperCase() + theme.slice(1);
  const currentTheme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);

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
      onClick={() => {
        setTheme(`theme-${theme}`);
        setCookie("theme", `theme-${theme}`);
      }}
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
