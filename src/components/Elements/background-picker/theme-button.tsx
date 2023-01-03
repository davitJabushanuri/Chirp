"use client";

import { setCookie } from "cookies-next";
import { useEffect } from "react";

import { TickIcon } from "@/assets/tick-svg";
import { useTheme } from "@/stores/use-theme";

import styles from "./styles/theme-button.module.scss";

interface IThemeButton {
  activeTheme: string | undefined;
  theme: string;
}

const ThemeButton = ({ activeTheme, theme }: IThemeButton) => {
  const title = theme ? theme?.charAt(0).toUpperCase() + theme?.slice(1) : "";
  const setTheme = useTheme((state) => state.setTheme);
  const currentTheme = useTheme((state) => state.theme);

  useEffect(() => {
    setTheme(activeTheme || "theme-light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        setCookie("theme", `theme-${theme}`, {
          maxAge: 60 * 60 * 24 * 365,
        });
      }}
    >
      <div className={styles.tickContainer}>
        <span className={styles.tick}>
          <TickIcon />
        </span>
      </div>
      <span className={styles.text}>{title}</span>
    </button>
  );
};

export default ThemeButton;
