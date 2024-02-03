import React, { FC } from "react";

import { cn } from "@/utils/cn";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<IButton> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "grid cursor-pointer place-items-center rounded-full",
        "transition-all duration-200 ease-in-out",
        `fill-secondary-100 p-[0.4em]
         `,
        "ring-secondary-100 focus-visible:ring-2 focus-visible:ring-primary-100",
        "fill-secondary-100 [&>svg]:w-[1.125rem]",
        "disabled-button",
        className,
      )}
    >
      {children}
    </button>
  );
};
