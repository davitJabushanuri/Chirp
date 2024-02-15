import React, { FC } from "react";

import { cn } from "@/utils/cn";

interface IHeader extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Header: FC<IHeader> = ({ children, className }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-sticky flex h-[calc(var(--tw-fs-kilo)+22px)]  items-center gap-2 bg-background/90 px-4 font-bold text-secondary-100 backdrop-blur-sm [&>h2]:text-h2",
        className,
      )}
    >
      {children}
    </header>
  );
};
