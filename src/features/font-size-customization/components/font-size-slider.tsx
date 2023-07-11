"use client";
import { setCookie } from "cookies-next";
import { useState } from "react";

import { SliderDot } from "./slider-dot";
import styles from "./styles/font-size-slider.module.scss";

enum IFontSizes {
  "font-size-xs",
  "font-size-sm",
  "font-size-md",
  "font-size-lg",
  "font-size-xl",
}

const FONT_SIZES = [
  "font-size-xs",
  "font-size-sm",
  "font-size-md",
  "font-size-lg",
  "font-size-xl",
] as const;

export const FontSizeSlider = ({
  fontSize = "font-size-md",
}: {
  fontSize?: string | undefined;
}) => {
  if (!Object.values(IFontSizes).includes(fontSize)) {
    fontSize = "font-size-md";
  }

  const [fontSizeIndex, setFontSizeIndex] = useState<number>(
    FONT_SIZES.indexOf((fontSize as any) ?? 2),
  );

  const handleFontSizeChange = (fs: number) => {
    document.documentElement.className =
      document.documentElement.className.replace(/\bfont-size-\S+/g, "");

    document.documentElement.classList.add(FONT_SIZES[fs]);

    setCookie("font-size", FONT_SIZES[fs], {
      maxAge: 60 * 60 * 24 * 365,
    });

    setFontSizeIndex(fs);
  };

  return (
    <div className={styles.container}>
      <input
        aria-label="Font size"
        type="range"
        min={0}
        max={4}
        value={fontSizeIndex}
        onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--clr-primary) ${
            (fontSizeIndex / 4) * 100
          }%, var(--clr-primary-disabled) ${(fontSizeIndex / 4) * 100}%)`,
        }}
      />

      <SliderDot
        value={0}
        fontSize={fontSizeIndex}
        title={`Extra small`}
        onClick={handleFontSizeChange}
      />
      <SliderDot
        value={1}
        fontSize={fontSizeIndex}
        title={`Small`}
        onClick={handleFontSizeChange}
      />
      <SliderDot
        value={2}
        fontSize={fontSizeIndex}
        title={`Default`}
        onClick={handleFontSizeChange}
      />
      <SliderDot
        value={3}
        fontSize={fontSizeIndex}
        title={`Large`}
        onClick={handleFontSizeChange}
      />
      <SliderDot
        value={4}
        fontSize={fontSizeIndex}
        title={`Extra large`}
        onClick={handleFontSizeChange}
      />
    </div>
  );
};
