"use client";
import { useState } from "react";

import styles from "./styles/font-size-slider.module.scss";

export const FontSizeSlider = () => {
  const [fontSize, setFontSize] = useState(2);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  return (
    <div className={styles.container}>
      <input
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
      <div className={styles.dots}>
        {[0, 1, 2, 3, 4].map((value, index) => (
          <button
            aria-hidden="true"
            key={value}
            className={`${styles.dot}`}
            onClick={() => setFontSize(value)}
            tabIndex={-1}
          >
            <span
              className={
                fontSize >= index ? styles.primaryColor : styles.secondaryColor
              }
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
};
