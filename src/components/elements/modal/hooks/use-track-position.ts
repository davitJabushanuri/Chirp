"use client";
import { useState, useLayoutEffect } from "react";

export const useTrackPosition = ({
  buttonRef,
  trackScroll = false,
}: {
  buttonRef: React.RefObject<HTMLButtonElement>;
  trackScroll?: boolean;
}) => {
  const [buttonBoundaries, setButtonBoundaries] = useState<DOMRect | null>(
    buttonRef?.current?.getBoundingClientRect() ?? null,
  );

  useLayoutEffect(() => {
    const handleResize = () => {
      if (buttonRef?.current) {
        setButtonBoundaries(buttonRef.current.getBoundingClientRect());
      }
    };

    window.addEventListener("resize", handleResize);
    if (trackScroll) {
      window.addEventListener("scroll", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (trackScroll) {
        window.removeEventListener("scroll", handleResize);
      }
    };
  }, [
    buttonRef,
    buttonRef.current?.getBoundingClientRect,
    trackScroll,
    setButtonBoundaries,
  ]);

  useLayoutEffect(() => {
    setButtonBoundaries(buttonRef.current?.getBoundingClientRect() ?? null);
  }, [
    buttonRef,
    buttonRef.current?.getBoundingClientRect,
    setButtonBoundaries,
  ]);

  return buttonBoundaries;
};
