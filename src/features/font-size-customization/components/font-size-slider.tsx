"use client";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { cn } from "@/utils/cn";

const FONT_SIZES = [
  "extra-small",
  "small",
  "default",
  "large",
  "extra-large",
] as const;

export const FontSizeSlider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fontSize =
    typeof window !== "undefined"
      ? document.documentElement.dataset.fontsize
      : undefined;

  const [fontSizeIndex, setFontSizeIndex] = useState<number>(
    fontSize ? FONT_SIZES.indexOf(fontSize) : 2,
  );

  const handleFontSizeChange = (index: number) => {
    setFontSizeIndex(index);
    document.documentElement.dataset.fontsize = FONT_SIZES[index];

    setCookie("font-size", FONT_SIZES[index], {
      maxAge: 60 * 60 * 24 * 365,
    });
  };

  if (!mounted) return null;

  return (
    <div className="relative grid items-center">
      <input
        aria-label="Font size"
        type="range"
        aria-valuenow={fontSizeIndex}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuetext={FONT_SIZES[fontSizeIndex]}
        min={0}
        max={4}
        value={fontSizeIndex}
        onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
        className={cn(
          "h-1 rounded-full bg-primary-100/50 transition-all duration-300",
          "appearance-none  [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-100 [&::-webkit-slider-thumb]:outline-2 [&::-webkit-slider-thumb]:outline-offset-[6px] [&::-webkit-slider-thumb]:focus-visible:size-5 [&::-webkit-slider-thumb]:focus-visible:outline [&::-webkit-slider-thumb]:focus-visible:outline-primary-100",
          "[&::-moz-range-thumb] [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-100 [&::-moz-range-thumb]:outline-2 [&::-moz-range-thumb]:outline-offset-[6px] [&::-moz-range-thumb]:focus-visible:size-5 [&::-moz-range-thumb]:focus-visible:outline [&::-moz-range-thumb]:focus-visible:outline-primary-100",
        )}
      />
      <span
        aria-hidden="true"
        style={{
          width: `${(fontSizeIndex / 4) * 100}%`,
        }}
        className="absolute h-1 w-full rounded-full bg-primary-100"
      ></span>
      <div className="absolute inset-0 flex w-[calc(100%+16px)] translate-x-[-8px] items-center justify-between">
        <Tooltip text="Extra small">
          <Button
            tabIndex={-1}
            aria-hidden="true"
            className="size-8 hover:bg-primary-100/10 active:bg-primary-100/15"
            onClick={() => handleFontSizeChange(0)}
          >
            <span
              className={cn(
                "size-3 rounded-full bg-primary-100",
                fontSizeIndex < 0 && "bg-primary-100/50",
              )}
            ></span>
          </Button>
        </Tooltip>

        <Tooltip text="Small">
          <Button
            tabIndex={-1}
            aria-hidden="true"
            className="size-8 hover:bg-primary-100/10 active:bg-primary-100/15"
            onClick={() => handleFontSizeChange(1)}
          >
            <span
              className={cn(
                "size-3 rounded-full bg-primary-100",
                fontSizeIndex < 1 && "bg-primary-100/50",
              )}
            ></span>
          </Button>
        </Tooltip>

        <Tooltip text="Default">
          <Button
            tabIndex={-1}
            aria-hidden="true"
            className="size-8 hover:bg-primary-100/10 active:bg-primary-100/15"
            onClick={() => handleFontSizeChange(2)}
          >
            <span
              className={cn(
                "size-3 rounded-full bg-primary-100",
                fontSizeIndex < 2 && "bg-primary-100/50",
              )}
            ></span>
          </Button>
        </Tooltip>

        <Tooltip text="Large">
          <Button
            tabIndex={-1}
            aria-hidden="true"
            className="size-8 hover:bg-primary-100/10 active:bg-primary-100/15"
            onClick={() => handleFontSizeChange(3)}
          >
            <span
              className={cn(
                "size-3 rounded-full bg-primary-100",
                fontSizeIndex < 3 && "bg-primary-100/50",
              )}
            ></span>
          </Button>
        </Tooltip>

        <Tooltip text="Extra large">
          <Button
            tabIndex={-1}
            aria-hidden="true"
            className="size-8 hover:bg-primary-100/10 active:bg-primary-100/15"
            onClick={() => handleFontSizeChange(4)}
          >
            <span
              className={cn(
                "size-3 rounded-full bg-primary-100",
                fontSizeIndex < 4 && "bg-primary-100/50",
              )}
            ></span>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
