import React from "react";

import { TickIcon } from "@/assets/tick-svg";
import { cn } from "@/utils/cn";

interface ITheme extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

export const Theme = ({
  children,
  className,
  checked,
  value,
  onChange,
  ...props
}: ITheme) => {
  return (
    <label
      htmlFor={value as string}
      className={cn(
        "group relative m-1 flex cursor-pointer items-center rounded-[4px] border border-neutral-600 p-3 font-bold text-secondary-100",
        checked && "border-2 border-primary-100",
        className,
      )}
    >
      <input
        {...props}
        value={value}
        onChange={onChange}
        checked={checked}
        type="radio"
        name="theme"
        id={value as string}
        className="peer absolute left-0 top-0 z-[-1] size-full cursor-pointer"
      />

      <span
        className={cn(
          "grid size-10 place-items-center rounded-full",
          "[&>svg]:size-h2 [&>svg]:rounded-full [&>svg]:border-2 [&>svg]:border-tertiary-200 [&>svg]:fill-transparent",
          "transition-colors duration-200 ease-in-out",
          checked &&
            "[&>svg]:border-primary-100 [&>svg]:bg-primary-100 [&>svg]:fill-white-100",
          "group-hover:bg-primary-100/10",
          "group-active:bg-primary-100/20",
          "peer-focus-visible:border-2 peer-focus-visible:border-primary-100 peer-focus-visible:bg-primary-100/10",
        )}
      >
        <TickIcon />
      </span>

      <span aria-hidden="true" className="m-auto translate-x-[-10px] text-base">
        {children}
      </span>
    </label>
  );
};
