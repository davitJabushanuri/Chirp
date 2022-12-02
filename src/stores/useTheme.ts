"use client";

import { CookieValueTypes, getCookie } from "cookies-next";
import create from "zustand";

interface ITheme {
  theme: CookieValueTypes;
  setTheme: (theme: string) => void;
}

// TODO: refactor this to get class from html before hydration
const theme = typeof window !== "undefined" ? getCookie("theme") : "";

export const useTheme = create<ITheme>((set) => ({
  theme: theme,
  setTheme: (theme: string) =>
    set({
      theme,
    }),
}));
