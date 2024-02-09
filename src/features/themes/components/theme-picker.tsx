"use client";
import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";

import { Theme } from "./theme";

type Theme = "default" | "dim" | "dark";

export const ThemePicker = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const theme: Theme =
    (getCookie("theme") as Theme) ?? (prefersDarkMode ? "dark" : "default");

  const [currentTheme, setCurrentTheme] = useState<"default" | "dim" | "dark">(
    theme,
  );

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, currentTheme);
    if (e.target.value === currentTheme) return;
    setCurrentTheme(e.target.value as Theme);
    document.documentElement.dataset.theme = e.target.value;

    setCookie("theme", e.target.value, {
      maxAge: 60 * 60 * 24 * 365,
    });
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby="theme-heading"
      data-testid={`theme-fieldset`}
      className="border-t border-neutral-600"
    >
      <h2
        id="theme-heading"
        className="px-4 py-3 text-h2 font-bold text-secondary-100"
      >
        Background
      </h2>
      <ul className="grid px-4 py-1 md:grid-cols-3">
        <Theme
          value="default"
          checked={currentTheme === "default"}
          aria-checked={currentTheme === "default"}
          tabIndex={currentTheme === "default" ? 0 : -1}
          onChange={handleThemeChange}
          className="bg-white-100 text-black-100"
          aria-label="Light"
        >
          Default
        </Theme>

        <Theme
          value="dim"
          checked={currentTheme === "dim"}
          aria-checked={currentTheme === "dim"}
          tabIndex={currentTheme === "dim" ? 0 : -1}
          onChange={handleThemeChange}
          className="bg-dim-100 text-white-100"
          aria-label="Dim"
        >
          Dim
        </Theme>

        <Theme
          value="dark"
          checked={currentTheme === "dark"}
          aria-checked={currentTheme === "dark"}
          tabIndex={currentTheme === "dark" ? 0 : -1}
          onChange={handleThemeChange}
          className="bg-black-300 text-white-100"
          aria-label="Lights out"
        >
          Lights out
        </Theme>
      </ul>
    </div>
  );
};
