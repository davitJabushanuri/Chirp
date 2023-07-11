"use client";
import { useState } from "react";

import { SliderDot } from "./slider-dot";
import styles from "./styles/font-size-slider.module.scss";

export const FontSizeSlider = () => {
  const [fontSize, setFontSize] = useState(2);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  return (
    <div className={styles.container}>
      <input
        aria-label="Font size"
        type="range"
        min={0}
        max={4}
        value={fontSize}
        onChange={handleFontSizeChange}
        style={{
          background: `linear-gradient(to right, var(--clr-primary) ${
            (fontSize / 4) * 100
          }%, var(--clr-primary-disabled) ${(fontSize / 4) * 100}%)`,
        }}
      />

      <SliderDot
        value={0}
        fontSize={fontSize}
        setFontSize={setFontSize}
        title={`Extra small`}
      />
      <SliderDot
        value={1}
        fontSize={fontSize}
        setFontSize={setFontSize}
        title={`Small`}
      />
      <SliderDot
        value={2}
        fontSize={fontSize}
        setFontSize={setFontSize}
        title={`Default`}
      />
      <SliderDot
        value={3}
        fontSize={fontSize}
        setFontSize={setFontSize}
        title={`Large`}
      />
      <SliderDot
        value={4}
        fontSize={fontSize}
        setFontSize={setFontSize}
        title={`Extra large`}
      />
    </div>
  );
};
