"use client";
import { setCookie } from "cookies-next";
import { useState } from "react";

import styles from "./styles/theme-picker.module.scss";
import { Theme } from "./theme";

enum ITheme {
  LIGHT = "theme-light",
  DIM = "theme-dim",
  DARK = "theme-dark",
}

export const ThemePicker = ({
  theme = "theme-light",
}: {
  theme?: string | undefined;
}) => {
  if (!Object.values(ITheme).includes(theme as ITheme)) {
    theme = ITheme.LIGHT;
  }

  const [currentTheme, setCurrentTheme] = useState(theme as ITheme);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Object.values(ITheme).includes(e.target.value as ITheme)) return;

    document.documentElement.className =
      document.documentElement.className.replace(/\btheme-\S+/g, "");

    document.documentElement.classList.add(e.target.value);

    setCookie("theme", e.target.value, {
      maxAge: 60 * 60 * 24 * 365,
    });

    setCurrentTheme(e.target.value as ITheme);
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
