"use client";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

import Color from "./color";

type ColorType = "blue" | "yellow" | "rose" | "violet" | "orange" | "green";

export const ColorPicker = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const color =
    typeof window !== "undefined"
      ? document.documentElement.dataset.color
      : undefined;

  const [currentColor, setCurrentColor] = useState(
    color === "blue" ||
      color === "yellow" ||
      color === "rose" ||
      color === "violet" ||
      color === "orange" ||
      color === "green"
      ? color
      : "blue",
  );

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === currentColor) return;
    setCurrentColor(e.target.value as ColorType);

    document.documentElement.dataset.color = e.target.value;

    setCookie("color", e.target.value, {
      maxAge: 60 * 60 * 24 * 365,
    });
  };

  if (!mounted) return null;

  return (
    <section className="border-t border-neutral-600">
      <h2
        id="color-heading"
        className="px-4 py-3 text-h2 font-bold text-secondary-100"
      >
        Color
      </h2>
      <div
        aria-labelledby="color-heading"
        role="radiogroup"
        className="grid grid-cols-3 place-items-center px-4 py-3 md:flex md:justify-between"
      >
        <Color
          value="blue"
          checked={currentColor === "blue"}
          aria-checked={currentColor === "blue"}
          tabIndex={currentColor === "blue" ? 0 : -1}
          onChange={handleColorChange}
          aria-label="Blue"
          className="bg-blue-100"
        />

        <Color
          value="yellow"
          checked={currentColor === "yellow"}
          aria-checked={currentColor === "yellow"}
          tabIndex={currentColor === "yellow" ? 0 : -1}
          onChange={handleColorChange}
          aria-label="Yellow"
          className="bg-yellow-100"
        />

        <Color
          value="rose"
          checked={currentColor === "rose"}
          aria-checked={currentColor === "rose"}
          tabIndex={currentColor === "rose" ? 0 : -1}
          onChange={handleColorChange}
          aria-label="Rose"
          className="bg-rose-100"
        />

        <Color
          value="violet"
          checked={currentColor === "violet"}
          aria-checked={currentColor === "violet"}
          tabIndex={currentColor === "violet" ? 0 : -1}
          onChange={handleColorChange}
          aria-label="Violet"
          className="bg-violet-100"
        />

        <Color
          value="orange"
          checked={currentColor === "orange"}
          aria-checked={currentColor === "orange"}
          tabIndex={currentColor === "orange" ? 0 : -1}
          onChange={handleColorChange}
          aria-label="Orange"
          className="bg-orange-100"
        />

        <Color
          value="green"
          checked={currentColor === "green"}
          aria-checked={currentColor === "green"}
          tabIndex={currentColor === "green" ? 0 : -1}
          onChange={handleColorChange}
          aria-label="Green"
          className="bg-green-100"
        />
      </div>
    </section>
  );
};
