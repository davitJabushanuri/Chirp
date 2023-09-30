import { ChangeEventHandler } from "react";

import styles from "./styles/text-input.module.scss";

export const TextInput = ({
  onChange,
  value,
  name,
  id,
  placeholder,
  isError,
  errorMessage,
  maxLength,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  id: string;
  placeholder: string;
  maxLength?: number;
  isError?: boolean;
  errorMessage?: string;
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={isError ? styles.isError : ""}>
        <input
          type="text"
          value={value ?? null}
          onChange={onChange}
          name={name}
          id={id}
          placeholder={placeholder}
          maxLength={maxLength}
          autoCapitalize="sentences"
          autoComplete="off"
          autoCorrect="on"
          spellCheck="true"
          dir="auto"
        />
        <span>{placeholder}</span>
      </label>

      <span className={`${styles.error} ${isError ? styles.displayError : ""}`}>
        {errorMessage}
      </span>

      {maxLength && (
        <span className={styles.maxLength}>
          {value?.length + " / " + maxLength}
        </span>
      )}
    </div>
  );
};
