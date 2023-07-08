import { TickIcon } from "@/assets/tick-svg";

import styles from "./styles/theme.module.scss";

export const Theme = ({
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
    <li className={styles.container}>
      <input
        aria-label={label}
        type="radio"
        id={value}
        value={value}
        name="theme"
        onChange={onChange}
        aria-checked={checked}
        defaultChecked={checked}
        tabIndex={checked ? 0 : -1}
      />

      <label className={styles[value]} htmlFor={value}>
        <span className={styles.circle}>
          <span className={styles.tick}>
            <TickIcon />
          </span>
        </span>
        <span aria-hidden="true" className={styles.text}>
          {label}
        </span>
      </label>
    </li>
  );
};
