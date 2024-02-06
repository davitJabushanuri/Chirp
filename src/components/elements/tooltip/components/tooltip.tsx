"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

type Tooltip = {
  children: React.ReactNode;
  text: string;
  delay?: number;
  minWidth?: number;
  maxWidth?: number;
  offset?: number;
};

type TooltipContent = Omit<Tooltip, "children" | "delay"> & {
  parentRef: React.RefObject<HTMLDivElement>;
};

export const Tooltip: FC<Tooltip> = ({ children, delay = 500, ...props }) => {
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
    if (!displayTooltip) setDisplayTooltip(true);
  };

  const handleBlur = () => {
    setDisplayTooltip(false);
  };

  const element = divRef?.current?.querySelector("button");
  const isDisabled = element?.disabled;

  return (
    <div
      ref={divRef}
      onFocusCapture={handleFocus}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayTooltip && !isDisabled && (
        <TooltipContent {...props} parentRef={divRef} />
      )}
      {children}
    </div>
  );
};

const TooltipContent = ({
  text,
  minWidth,
  maxWidth,
  offset = 2,
  parentRef,
}: TooltipContent) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [parentBoundaries, setParentBoundaries] = useState<DOMRect | null>(
    null,
  );
  const [tooltipBoundaries, setTooltipBoundaries] = useState<DOMRect | null>(
    null,
  );

  useEffect(() => {
    if (parentRef?.current) {
      setParentBoundaries(parentRef?.current.getBoundingClientRect());
    }

    if (tooltipRef.current) {
      setTooltipBoundaries(tooltipRef.current.getBoundingClientRect());
    }
  }, [parentRef, tooltipRef]);

  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  if (
    (minWidth && innerWidth < minWidth) ||
    (maxWidth && innerWidth > maxWidth)
  ) {
    return null;
  }

  const styles: React.CSSProperties = {
    position: "fixed",
  };

  if (tooltipBoundaries && parentBoundaries) {
    if (parentBoundaries?.bottom + tooltipBoundaries?.height > innerHeight) {
      styles.top = parentBoundaries?.top - tooltipBoundaries?.height - offset;
    } else {
      styles.top = parentBoundaries?.bottom + offset;
    }

    if (tooltipBoundaries?.width > innerWidth - 16) {
      styles.left = 8;
      styles.right = 8;
    } else if (
      parentBoundaries?.left +
        parentBoundaries?.width / 2 -
        tooltipBoundaries?.width / 2 <=
      8
    ) {
      styles.left = 8;
    } else if (
      parentBoundaries?.right + tooltipBoundaries?.width / 2 >
      innerWidth - 8
    ) {
      styles.right = 8;
    } else {
      styles.left =
        parentBoundaries?.left +
        parentBoundaries?.width / 2 -
        tooltipBoundaries?.width / 2;
    }
  }

  return createPortal(
    <div
      role="tooltip"
      style={styles}
      ref={tooltipRef}
      className={cn(
        "pointer-events-none z-tooltip overflow-hidden text-ellipsis text-nowrap rounded-sm bg-tertiary-200/80 px-[0.2em] py-[0.1em] text-nano ",
      )}
    >
      {text}
    </div>,
    (document.getElementById("tooltip-root") as HTMLElement) || document.body,
  );
};
