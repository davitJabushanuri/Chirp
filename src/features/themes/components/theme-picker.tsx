"use client";
import { setCookie } from "cookies-next";

import { TickIcon } from "@/assets/tick-svg";

import styles from "./styles/theme-picker.module.scss";

export const ThemePicker = ({ theme }: { theme: string | undefined }) => {
  return (
    <fieldset className={styles.container}>
      <legend>Background</legend>
      <ul className={styles.themes}>
        <li className={styles.radio_wrapper}>
          <input
            aria-label="Light"
            type="radio"
            id="theme-light"
            value="theme-light"
            name="theme"
            onChange={(e) => {
              document.documentElement.className =
                document.documentElement.className.replace(/\btheme-\S+/g, "");

              document.documentElement.classList.add("theme-light");

              setCookie("theme", e.target.value, {
                maxAge: 60 * 60 * 24 * 365,
              });
            }}
            aria-checked={theme === "theme-light"}
            tabIndex={theme === "theme-light" ? 0 : -1}
            defaultChecked={theme === "theme-light"}
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
            onChange={(e) => {
              document.documentElement.className =
                document.documentElement.className.replace(/\btheme-\S+/g, "");

              document.documentElement.classList.add("theme-dim");

              setCookie("theme", e.target.value, {
                maxAge: 60 * 60 * 24 * 365,
              });
            }}
            aria-checked={theme === "theme-dim"}
            tabIndex={theme === "theme-dim" ? 0 : -1}
            defaultChecked={theme === "theme-dim"}
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
            onChange={(e) => {
              document.documentElement.className =
                document.documentElement.className.replace(/\btheme-\S+/g, "");

              document.documentElement.classList.add("theme-dark");

              setCookie("theme", e.target.value, {
                maxAge: 60 * 60 * 24 * 365,
              });
            }}
            aria-checked={theme === "theme-dark"}
            tabIndex={theme === "theme-dark" ? 0 : -1}
            defaultChecked={theme === "theme-dark"}
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
