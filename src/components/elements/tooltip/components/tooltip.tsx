"use client";
import React, { FC, forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

import { useTrackPosition } from "../../modal";

interface ITooltip {
  children: React.ReactNode;
  text: string;
  delay?: number;
}

export const TooltipProvider: FC<ITooltip> = ({
  children,
  text,
  delay = 500,
}) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hovering) setDisplayTooltip(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [hovering, delay]);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setDisplayTooltip(false);
  };

  const handleFocus = () => {
    setDisplayTooltip(true);
  };

  const handleBlur = () => {
    setDisplayTooltip(false);
  };

  const button = divRef?.current?.querySelector("button");
  const isDisabled = button?.disabled;

  return (
    <div
      ref={divRef}
      onFocusCapture={handleFocus}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {displayTooltip && !isDisabled && <Tooltip text={text} ref={divRef} />}
      {children}
    </div>
  );
};

const Tooltip = forwardRef<
  HTMLDivElement,
  {
    text: string;
  }
>(({ text }, ref) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const parentBoundaries = useTrackPosition({ buttonRef: ref as any });
  const tooltipBoundaries = tooltipRef.current?.getBoundingClientRect();

  if (!parentBoundaries) return null;

  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  console.log(innerHeight, parentBoundaries);

  const tooltipStyles: React.CSSProperties = {
    position: "fixed",
    top:
      tooltipBoundaries &&
      parentBoundaries?.bottom + tooltipBoundaries?.height > innerHeight
        ? parentBoundaries?.top - tooltipBoundaries?.height - 2
        : parentBoundaries?.bottom + 2,
    left:
      tooltipBoundaries &&
      parentBoundaries?.left +
        parentBoundaries?.width -
        tooltipBoundaries?.width / 2,
    // transform: "translateX(-50%)",
  };

  return createPortal(
    <div
      role="tooltip"
      style={tooltipStyles}
      ref={tooltipRef}
      className={cn(
        "pointer-events-none z-tooltip text-nowrap rounded-sm bg-tertiary-200 px-[0.3em] py-[0.1em] text-nano",
      )}
    >
      {text}
    </div>,
    document.body,
  );
});

Tooltip.displayName = "Tooltip";
