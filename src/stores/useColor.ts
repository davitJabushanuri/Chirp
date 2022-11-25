import create from "zustand";

interface IColor {
  color: string;
  setColor: (theme: string) => void;
}

export const useColor = create<IColor>((set) => ({
  color: "color-blue",
  setColor: (color: string) =>
    set({
      color,
    }),
}));
