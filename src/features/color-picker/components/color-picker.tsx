"use client";
import { setCookie } from "cookies-next";
import { useState } from "react";

import Color from "./color";
import styles from "./styles/color-picker.module.scss";

enum IColor {
  BLUE = "color-blue",
  YELLOW = "color-yellow",
  ROSE = "color-rose",
  VIOLET = "color-violet",
  ORANGE = "color-orange",
  GREEN = "color-green",
  DEFAULT = "color-blue",
}

export const ColorPicker = ({
  color = "color-blue",
}: {
  color?: string | undefined;
}) => {
  if (!Object.values(IColor).includes(color as IColor)) {
    color = IColor.DEFAULT;
  }

  const [currentColor, setCurrentColor] = useState(color as IColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Object.values(IColor).includes(e.target.value as IColor)) return;

    document.documentElement.className =
      document.documentElement.className.replace(/\bcolor-\S+/g, "");

    document.documentElement.classList.add(e.target.value);

    setCookie("color", e.target.value, {
      maxAge: 60 * 60 * 24 * 365,
    });

    setCurrentColor(e.target.value as IColor);
  };

  return (
    <fieldset
      aria-label="Color options"
      data-testid={`color-fieldset`}
      className={styles.container}
    >
      <legend>Color</legend>
      <ul className={styles.colors}>
        <Color
          value="color-blue"
          label="Blue"
          checked={currentColor === "color-blue"}
          onChange={handleColorChange}
        />

        <Color
          value="color-yellow"
          label="Yellow"
          checked={currentColor === "color-yellow"}
          onChange={handleColorChange}
        />

        <Color
          value="color-rose"
          label="Rose"
          checked={currentColor === "color-rose"}
          onChange={handleColorChange}
        />

        <Color
          value="color-violet"
          label="Violet"
          checked={currentColor === "color-violet"}
          onChange={handleColorChange}
        />

        <Color
          value="color-orange"
          label="Orange"
          checked={currentColor === "color-orange"}
          onChange={handleColorChange}
        />

        <Color
          value="color-green"
          label="Green"
          checked={currentColor === "color-green"}
          onChange={handleColorChange}
        />
      </ul>
    </fieldset>
  );
};
