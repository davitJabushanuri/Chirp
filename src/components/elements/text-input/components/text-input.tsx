import { ChangeEventHandler } from "react";

import styles from "./styles/text-input.module.scss";

export const TextInput = ({
  onChange,
  value,
  name,
  id,
  placeholder,
  maxLength,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  id: string;
  placeholder: string;
  maxLength?: number;
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        <input
          type="text"
          value={value ?? null}
          onChange={onChange}
          name={name}
          id={id}
          placeholder={placeholder}
          maxLength={maxLength}
          autoCapitalize="sentences"
          autoComplete={name}
          autoCorrect="on"
          spellCheck="true"
          dir="auto"
        />
        <span>{placeholder}</span>
      </label>
    </div>
  );
};
