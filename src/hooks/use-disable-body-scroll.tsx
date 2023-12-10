"use client";
import { useCallback } from "react";

export const useDisableBodyScroll = () => {
  useCallback(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "11px";
    return () => {
      document.body.style.overflowY = "scroll";
      document.body.style.paddingRight = "0px";
    };
  }, []);
};
