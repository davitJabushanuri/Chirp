"use client";
import { useEffect } from "react";

export const useDisableBodyScroll = () => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "11px";
    return () => {
      document.body.style.overflowY = "scroll";
      document.body.style.paddingRight = "0px";
    };
  }, []);
};
