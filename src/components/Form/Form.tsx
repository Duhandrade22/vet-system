import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";
import type { ValidationResult } from "../../utils/validators";
import { validateRequired } from "../../utils/validators";
import styles from "./Form.module.css";

interface BaseFormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  validator?: (value: string) => ValidationResult;
}

interface InputFieldProps
  extends
    BaseFormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  type?: string;
  children?: React.ReactNode;
  onIconClick?: () => void;
}

interface TextareaFieldProps
  extends
    BaseFormFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  rows?: number;
}

interface SelectFieldProps
  extends
    BaseFormFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "name"> {
  options: { value: string; label: string }[];
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  required = false,
  hint,
  validator,
  className = "",
  children,
  onIconClick,
  ...props
}) => {
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState(false);

  const validate = (value: string) => {
    if (required) {
      const result = validateRequired(value, label);
      if (!result.isValid) {
        setError(result.message!);
        return false;
      }
    }

    if (validator) {
      const result = validator(value);
      if (!result.isValid) {
        setError(result.message!);
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    validate(e.target.value);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (touched && error) {
      validate(e.target.value);
    }
    props.onChange?.(e);
  };

  return (
    <div className={styles.group}>
      <label
        htmlFor={name}
        className={`${styles.label} ${required ? styles.labelRequired : ""}`}
      >
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={name}
          name={name}
          type={type}
          className={`${styles.input} ${error ? styles.inputError : ""} ${className}`}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        {children && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onIconClick}
          >
            {children}
          </button>
        )}
      </div>
      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  required = false,
  hint,
  validator,
  rows = 4,
  className = "",
  ...props
}) => {
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState(false);

  const validate = (value: string) => {
    if (required) {
      const result = validateRequired(value, label);
      if (!result.isValid) {
        setError(result.message!);
        return false;
      }
    }

    if (validator) {
      const result = validator(value);
      if (!result.isValid) {
        setError(result.message!);
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setTouched(true);
    validate(e.target.value);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (touched && error) {
      validate(e.target.value);
    }
    props.onChange?.(e);
  };

  return (
    <div className={styles.group}>
      <label
        htmlFor={name}
        className={`${styles.label} ${required ? styles.labelRequired : ""}`}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={`${styles.textarea} ${error ? styles.textareaError : ""} ${className}`}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  required = false,
  hint,
  validator,
  className = "",
  ...props
}) => {
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState(false);

  const validate = (value: string) => {
    if (required) {
      const result = validateRequired(value, label);
      if (!result.isValid) {
        setError(result.message!);
        return false;
      }
    }

    if (validator) {
      const result = validator(value);
      if (!result.isValid) {
        setError(result.message!);
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setTouched(true);
    validate(e.target.value);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (touched && error) {
      validate(e.target.value);
    }
    props.onChange?.(e);
  };

  return (
    <div className={styles.group}>
      <label
        htmlFor={name}
        className={`${styles.label} ${required ? styles.labelRequired : ""}`}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`${styles.select} ${error ? styles.selectError : ""} ${className}`}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
