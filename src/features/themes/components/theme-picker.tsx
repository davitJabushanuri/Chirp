"use client";
import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";

import styles from "./styles/theme-picker.module.scss";
import { Theme } from "./theme";

enum ITheme {
  LIGHT = "theme-light",
  DIM = "theme-dim",
  DARK = "theme-dark",
}

export const ThemePicker = () => {
  const theme = getCookie("theme");

  const prefersDarkMode =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;

  const [currentTheme, setCurrentTheme] = useState(
    theme ?? (prefersDarkMode ? "theme-dark" : "theme-light"),
  );

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Object.values(ITheme).includes(e.target.value as ITheme)) return;

    document.documentElement.className =
      document.documentElement.className.replace(/\btheme-\S+/g, "");

    document.documentElement.classList.add(e.target.value);

    setCookie("theme", e.target.value, {
      maxAge: 60 * 60 * 24 * 365,
    });

    setCurrentTheme(e.target.value);
  };

  return (
    <fieldset
      aria-label="Theme Options"
      data-testid={`theme-fieldset`}
      className={styles.container}
    >
      <legend>Background</legend>
      <ul className={styles.themes}>
        <Theme
          value="theme-light"
          label="Default"
          checked={currentTheme === "theme-light"}
          onChange={handleThemeChange}
        />

        <Theme
          value="theme-dim"
          label="Dim"
          checked={currentTheme === "theme-dim"}
          onChange={handleThemeChange}
        />

        <Theme
          value="theme-dark"
          label="Lights out"
          checked={currentTheme === "theme-dark"}
          onChange={handleThemeChange}
        />
      </ul>
    </fieldset>
  );
};
