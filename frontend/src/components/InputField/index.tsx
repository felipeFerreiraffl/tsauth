import React, { type HTMLInputTypeAttribute, type JSX } from "react";
import styles from "./styles.module.css";

type InputFieldProps = {
  id: string;
  label: string;
  icon: JSX.Element;
  placeholder: string;
  inputType: HTMLInputTypeAttribute;
  value: string;
  showEye?: JSX.Element;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  onClick?: () => void;
};

export default function InputField(props: InputFieldProps) {
  return (
    <div className={`${styles.container}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className={styles.inputContainer}>
        <span>{props.icon}</span>
        <input
          id={props.id}
          name={props.id}
          type={props.inputType}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required
          disabled={props.disabled}
          minLength={props.minLength}
          tabIndex={0}
        />
        <button
          className={`${styles.eye}`}
          type="button"
          onClick={props.onClick}
        >
          {props.showEye}
        </button>
      </div>
    </div>
  );
}
