"use client";
import React from "react";

import { TickIcon } from "@/assets/tick-svg";
import { cn } from "@/utils/cn";

interface IColor extends React.InputHTMLAttributes<HTMLInputElement> {}

const Color = ({ className, value, checked, onChange, ...props }: IColor) => {
  return (
    <label
      htmlFor={value as string}
      className={cn(
        "relative my-2 grid size-10 cursor-pointer place-items-center rounded-full",
        "[&>svg]:size-[calc(var(--tw-fs-h1)+2px)] [&>svg]:fill-white-100",
        "transition-colors duration-200 ease-in-out",
        "outline-offset-2 has-[:focus-visible]:outline has-[:focus]:outline-2 has-[:focus-visible]:outline-primary-100",
        className,
      )}
    >
      <input
        {...props}
        value={value}
        type="radio"
        checked={checked}
        onChange={onChange}
        id={value as string}
        name="color"
        className="absolute left-0 top-0 z-[-1] size-full"
      />

      {checked && <TickIcon />}
    </label>
  );
};

export default Color;
