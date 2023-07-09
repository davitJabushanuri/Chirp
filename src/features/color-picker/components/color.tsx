"use client";

import { TickIcon } from "@/assets/tick-svg";

import styles from "./styles/color.module.scss";

const Color = ({
  value,
  label,
  checked,
  onChange,
}: {
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <li className={`${styles.container} ${styles[value]}`}>
      <label htmlFor={value}>
        <input
          aria-label={label}
          type="radio"
          id={value}
          value={value}
          name="color"
          onChange={onChange}
          aria-checked={checked}
          defaultChecked={checked}
          tabIndex={checked ? 0 : -1}
          data-testid={`${value}`}
        />

        <TickIcon />
      </label>
    </li>
  );
};

export default Color;
