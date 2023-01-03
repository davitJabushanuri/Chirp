"use client";
import { useEffect } from "react";

export const useDisableBodyScroll = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, []);
};
