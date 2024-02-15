import { motion } from "framer-motion";
import { forwardRef } from "react";

import { Button } from "@/components/elements/button";
import { cn } from "@/utils/cn";

import { useTrackPosition } from "../../modal";

export const Menu = forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    onClose: () => void;
    trackScroll?: boolean;
  }
>(({ children, onClose, trackScroll = false }, ref) => {
  const innerWidth = window.innerWidth;

  const buttonBoundaries = useTrackPosition({
    buttonRef: ref as React.RefObject<HTMLButtonElement>,
    trackScroll,
  });

  const style: React.CSSProperties = {
    position: "fixed",
    top: buttonBoundaries?.top,
    left: buttonBoundaries?.left,
    transform: `translateX(calc(-${100}% + ${buttonBoundaries?.width}px))`,
  };

  const modalStyle: React.CSSProperties = {
    ...(innerWidth < 500
      ? {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }
      : style),
  };

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.2 }}
      style={modalStyle}
      className={cn(
        "shadow-secondary grid overflow-hidden text-nowrap rounded-t-[0.8em] bg-background",
        "sm:shadow-main sm:rounded-[0.8em]",
      )}
      role="menu"
    >
      {children}
      {innerWidth < 500 && (
        <Button
          onClick={onClose}
          className={cn(
            "mx-[0.6rem] my-[1rem]  px-[1rem] py-[0.7rem] text-milli font-bold",
            "border-[1px] border-solid border-tertiary-100",
            "hover:bg-neutral-500",
            "focus-visible:bg-neutral-500 focus-visible:outline-secondary-100",
            "active:bg-neutral-600",
          )}
        >
          Cancel
        </Button>
      )}
    </motion.div>
  );
});

Menu.displayName = "Menu";
