"use client";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

import { Theme } from "./theme";

type ThemeType = "default" | "dim" | "dark";

export const ThemePicker = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prefersDarkMode =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;

  const theme =
    typeof window !== "undefined"
      ? document.documentElement.dataset.theme
      : undefined;

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(
    theme === "default" || theme === "dim" || theme === "dark"
      ? theme
      : prefersDarkMode
        ? "dark"
        : "default",
  );

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === currentTheme) return;
    setCurrentTheme(e.target.value as ThemeType);
    document.documentElement.dataset.theme = e.target.value;

    setCookie("theme", e.target.value, {
      maxAge: 60 * 60 * 24 * 365,
    });
  };

  if (!mounted) return null;

  return (
    <section className="border-t border-neutral-600">
      <h2
        id="theme-heading"
        className="px-4 py-3 text-h2 font-bold text-secondary-100"
      >
        Background
      </h2>
      <div
        aria-labelledby="theme-heading"
        role="radiogroup"
        className="grid px-4 py-1 md:grid-cols-3"
      >
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
      </div>
    </section>
  );
};
