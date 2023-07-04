"use client";
import { setCookie } from "cookies-next";
import { useState } from "react";

import { TickIcon } from "@/assets/tick-svg";

import styles from "./styles/theme-picker.module.scss";

enum ITheme {
  LIGHT = "theme-light",
  DIM = "theme-dim",
  DARK = "theme-dark",
  DEFAULT = "theme-light",
}

export const ThemePicker = ({
  theme = "theme-light",
}: {
  theme?: string | undefined;
}) => {
  if (!Object.values(ITheme).includes(theme as ITheme)) {
    theme = ITheme.DEFAULT;
  }

  const [currentTheme, setCurrentTheme] = useState(theme as ITheme);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.documentElement.className =
      document.documentElement.className.replace(/\btheme-\S+/g, "");

    document.documentElement.classList.add(e.target.value);

    setCookie("theme", e.target.value, {
      maxAge: 60 * 60 * 24 * 365,
    });

    setCurrentTheme(e.target.value as ITheme);
  };

  return (
    <fieldset data-testid={`fieldset`} className={styles.container}>
      <legend>Background</legend>
      <ul role="radiogroup" className={styles.themes}>
        <li className={styles.radio_wrapper}>
          <input
            aria-label="Light"
            type="radio"
            id="theme-light"
            value="theme-light"
            name="theme"
            onChange={handleThemeChange}
            aria-checked={currentTheme === "theme-light"}
            defaultChecked={currentTheme === "theme-light"}
            tabIndex={currentTheme === "theme-light" ? 0 : -1}
          />

          <label className={styles.theme_light} htmlFor="theme-light">
            <span className={styles.circle}>
              <span className={styles.tick}>
                <TickIcon />
              </span>
            </span>
            <span aria-hidden="true" className={styles.text}>
              Default
            </span>
          </label>
        </li>

        <li className={styles.radio_wrapper}>
          <input
            aria-label="Dim"
            type="radio"
            id="theme-dim"
            value="theme-dim"
            name="theme"
            onChange={handleThemeChange}
            aria-checked={currentTheme === "theme-dim"}
            defaultChecked={currentTheme === "theme-dim"}
            tabIndex={currentTheme === "theme-dim" ? 0 : -1}
          />

          <label className={styles.theme_dim} htmlFor="theme-dim">
            <span className={styles.circle}>
              <span className={styles.tick}>
                <TickIcon />
              </span>
            </span>
            <span aria-hidden="true" className={styles.text}>
              Dim
            </span>
          </label>
        </li>

        <li className={styles.radio_wrapper}>
          <input
            aria-label="Lights out"
            type="radio"
            id="theme-dark"
            value="theme-dark"
            name="theme"
            onChange={handleThemeChange}
            aria-checked={currentTheme === "theme-dark"}
            defaultChecked={currentTheme === "theme-dark"}
            tabIndex={currentTheme === "theme-dark" ? 0 : -1}
          />

          <label className={styles.theme_dark} htmlFor="theme-dark">
            <span className={styles.circle}>
              <span className={styles.tick}>
                <TickIcon />
              </span>
            </span>
            <span aria-hidden="true" className={styles.text}>
              Lights out
            </span>
          </label>
        </li>
      </ul>
    </fieldset>
  );
};
