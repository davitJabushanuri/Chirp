"use client";
import { useEffect } from "react";

import { TwitterLogo } from "@/assets/twitter-logo";

export const LoadingScreen = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "11px";

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-fixed flex items-center justify-center bg-background">
      <div className="size-16 animate-pulse fill-primary-100">
        <TwitterLogo />
      </div>
    </div>
  );
};
